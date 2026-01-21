/**
 * WASM Audio Bridge
 *
 * Loads and manages the Rust/WASM audio engine
 */

let wasmModule = null;
let wasmAudioEngine = null;
let wasmLoaded = false;
let wasmLoading = false;

/**
 * Initialize and load the WASM module
 * @returns {Promise<boolean>} True if loaded successfully, false otherwise
 */
async function initWasmAudio() {
    if (wasmLoaded) {
        return true;
    }

    if (wasmLoading) {
        // Wait for existing load to complete
        while (wasmLoading) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        return wasmLoaded;
    }

    wasmLoading = true;

    try {
        console.log('[WASM] Loading audio engine module...');

        // Dynamically import the WASM module
        wasmModule = await import('/wasm/parent_architect_audio.js');

        // Initialize the module
        await wasmModule.default();

        console.log('[WASM] Module loaded successfully');

        // Create audio engine instance
        // Use the current audio context's sample rate
        const sampleRate = slowWakeAudioContext ? slowWakeAudioContext.sampleRate : 48000;
        wasmAudioEngine = new wasmModule.AudioEngine(sampleRate);

        console.log(`[WASM] Audio engine initialized at ${sampleRate} Hz`);

        wasmLoaded = true;
        wasmLoading = false;
        return true;

    } catch (error) {
        console.error('[WASM] Failed to load audio engine:', error);
        wasmLoaded = false;
        wasmLoading = false;
        return false;
    }
}

/**
 * Generate bird sounds using WASM engine
 * @param {AudioContext} audioContext - Web Audio context
 * @param {number} intensity - Bird intensity (0.0 to 1.0)
 * @returns {AudioBufferSourceNode|null} - Audio source node or null if WASM not available
 */
function generateWasmBirds(audioContext, intensity) {
    if (!wasmLoaded || !wasmAudioEngine || !wasmModule) {
        console.warn('[WASM] Engine not loaded, falling back to synthesis');
        return null;
    }

    try {
        // Add birds to the scene based on intensity
        const numBirds = Math.floor(1 + intensity * 4);

        // Clear existing birds and add new ones
        wasmAudioEngine.reset();

        const species = ['robin', 'cardinal', 'chickadee', 'warbler'];
        for (let i = 0; i < numBirds; i++) {
            const birdType = species[Math.floor(Math.random() * species.length)];
            const posX = (Math.random() - 0.5) * 2; // -1 to 1
            const posY = (Math.random() - 0.5) * 2;

            wasmAudioEngine.add_bird(birdType, posX, posY);
        }

        // Generate 5 seconds of bird audio
        const duration = 5.0;
        const audioData = wasmAudioEngine.generate_bird_buffer(duration, intensity);

        // Create AudioBuffer from the generated data
        const audioBuffer = audioContext.createBuffer(
            1, // mono
            audioData.length,
            audioContext.sampleRate
        );

        // Copy the WASM-generated samples into the AudioBuffer
        const channelData = audioBuffer.getChannelData(0);
        for (let i = 0; i < audioData.length; i++) {
            channelData[i] = audioData[i];
        }

        // Create and configure source node
        const source = audioContext.createBufferSource();
        source.buffer = audioBuffer;

        console.log(`[WASM] Generated ${duration}s of bird audio with ${numBirds} birds`);

        return source;

    } catch (error) {
        console.error('[WASM] Error generating birds:', error);
        return null;
    }
}

/**
 * Generate gentle breeze using WASM engine
 * @param {AudioContext} audioContext - Web Audio context
 * @param {number} duration - Duration in seconds
 * @param {number} intensity - Breeze intensity (0.0 to 1.0)
 * @returns {AudioBufferSourceNode|null} - Audio source node or null if WASM not available
 */
function generateWasmBreeze(audioContext, duration, intensity) {
    if (!wasmLoaded || !wasmAudioEngine || !wasmModule) {
        console.warn('[WASM] Engine not loaded, using JS breeze');
        return null;
    }

    try {
        const audioData = wasmAudioEngine.generate_breeze(duration, intensity);

        // Create AudioBuffer
        const audioBuffer = audioContext.createBuffer(
            1, // mono
            audioData.length,
            audioContext.sampleRate
        );

        // Copy samples
        const channelData = audioBuffer.getChannelData(0);
        for (let i = 0; i < audioData.length; i++) {
            channelData[i] = audioData[i];
        }

        // Create source
        const source = audioContext.createBufferSource();
        source.buffer = audioBuffer;

        console.log(`[WASM] Generated ${duration}s of breeze audio`);

        return source;

    } catch (error) {
        console.error('[WASM] Error generating breeze:', error);
        return null;
    }
}

/**
 * Check if WASM audio is available
 * @returns {boolean}
 */
function isWasmAudioAvailable() {
    return wasmLoaded && wasmAudioEngine !== null;
}

/**
 * Preload WASM module in the background
 * Call this early to have WASM ready when needed
 */
function preloadWasmAudio() {
    if (!wasmLoaded && !wasmLoading) {
        initWasmAudio().catch(err => {
            console.warn('[WASM] Background preload failed:', err);
        });
    }
}

// Auto-preload when this script loads (non-blocking)
if (typeof document !== 'undefined' && document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('[WASM] Starting background preload...');
        preloadWasmAudio();
    });
} else {
    // Document already loaded
    console.log('[WASM] Starting immediate preload...');
    preloadWasmAudio();
}
