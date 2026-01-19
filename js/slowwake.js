// --- SLOW WAKE TIMER ---

let slowWakeInterval = null;
let slowWakeAudioContext = null;
let slowWakeGainNode = null;
let slowWakeMelodyGain = null;
let slowWakeBirdNodes = [];

// Create pink noise for background forest ambience
function createPinkNoise(audioContext, duration, delay = 0) {
    const bufferSize = audioContext.sampleRate * duration;
    const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
    const output = buffer.getChannelData(0);

    // Pink noise generation using Paul Kellet's algorithm
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
        b6 = white * 0.115926;
    }

    const noise = audioContext.createBufferSource();
    noise.buffer = buffer;

    const noiseGain = audioContext.createGain();
    noiseGain.gain.value = 0.02; // Very subtle background

    const filter = audioContext.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 800;
    filter.Q.value = 0.5;

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(slowWakeGainNode);

    const now = audioContext.currentTime + delay;
    noise.start(now);
    noise.stop(now + duration);

    return noise;
}

// Natural bird chirping sound generator with realistic harmonics
class BirdChirp {
    constructor(audioContext) {
        this.audioContext = audioContext;
    }

    // Generate a single realistic bird chirp with harmonics
    chirp(frequency, duration, delay = 0, species = 'robin') {
        const now = this.audioContext.currentTime + delay;

        // Create multiple oscillators for harmonics (makes it sound more natural)
        const oscillators = [];
        const harmonics = [1, 2, 3]; // Fundamental + 2 harmonics
        const harmonicVolumes = [1, 0.3, 0.15]; // Decreasing volume for harmonics

        const masterGain = this.audioContext.createGain();
        masterGain.connect(slowWakeGainNode);

        harmonics.forEach((harmonic, index) => {
            const osc = this.audioContext.createOscillator();
            const oscGain = this.audioContext.createGain();

            // Mix of sine and triangle for more natural sound
            osc.type = index === 0 ? 'sine' : 'triangle';

            // Add slight detuning for realism
            const detune = (Math.random() - 0.5) * 10;
            osc.detune.value = detune;

            osc.connect(oscGain);
            oscGain.connect(masterGain);

            // Different chirp patterns for different species
            if (species === 'robin') {
                // Quick upward sweep then down
                osc.frequency.setValueAtTime(frequency * harmonic, now);
                osc.frequency.exponentialRampToValueAtTime(frequency * harmonic * 1.4, now + duration * 0.2);
                osc.frequency.exponentialRampToValueAtTime(frequency * harmonic * 0.95, now + duration);
            } else if (species === 'sparrow') {
                // Rapid chattering
                osc.frequency.setValueAtTime(frequency * harmonic, now);
                for (let i = 0; i < 3; i++) {
                    const t = now + (duration / 3) * i;
                    osc.frequency.setValueAtTime(frequency * harmonic * (1 + Math.random() * 0.2), t);
                }
            } else if (species === 'cardinal') {
                // Clear whistle
                osc.frequency.setValueAtTime(frequency * harmonic, now);
                osc.frequency.linearRampToValueAtTime(frequency * harmonic * 1.1, now + duration * 0.5);
                osc.frequency.linearRampToValueAtTime(frequency * harmonic, now + duration);
            } else if (species === 'chickadee') {
                // Two-note call
                osc.frequency.setValueAtTime(frequency * harmonic, now);
                osc.frequency.setValueAtTime(frequency * harmonic * 0.8, now + duration * 0.5);
            } else {
                // Warbler - complex pattern
                osc.frequency.setValueAtTime(frequency * harmonic, now);
                osc.frequency.exponentialRampToValueAtTime(frequency * harmonic * 1.3, now + duration * 0.3);
                osc.frequency.exponentialRampToValueAtTime(frequency * harmonic * 0.9, now + duration * 0.7);
                osc.frequency.exponentialRampToValueAtTime(frequency * harmonic * 1.1, now + duration);
            }

            // Natural envelope with attack, decay, sustain, release
            oscGain.gain.setValueAtTime(0, now);
            oscGain.gain.linearRampToValueAtTime(0.2 * harmonicVolumes[index], now + 0.005);
            oscGain.gain.exponentialRampToValueAtTime(0.1 * harmonicVolumes[index], now + duration * 0.6);
            oscGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

            osc.start(now);
            osc.stop(now + duration);
            oscillators.push(osc);
        });

        // Master envelope for the entire chirp
        masterGain.gain.setValueAtTime(0, now);
        masterGain.gain.linearRampToValueAtTime(0.4, now + 0.01);
        masterGain.gain.exponentialRampToValueAtTime(0.2, now + duration * 0.5);
        masterGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

        return oscillators;
    }

    // Generate a natural bird call sequence
    birdCall(baseFrequency, complexity, delay, species) {
        const chirps = [];
        for (let i = 0; i < complexity; i++) {
            // Natural variation in frequency
            const freq = baseFrequency + (Math.random() * 150 - 75);
            // Varied chirp duration
            const duration = 0.05 + Math.random() * 0.15;
            // More natural timing between chirps
            const chirpDelay = delay + (i * (0.12 + Math.random() * 0.08));
            chirps.push(this.chirp(freq, duration, chirpDelay, species));
        }
        return chirps;
    }
}

// Morning bird chorus - multiple realistic species
function generateMorningBirds(audioContext, intensity) {
    const bird = new BirdChirp(audioContext);

    // Realistic morning bird species with appropriate frequency ranges
    const species = [
        { name: 'robin', freq: 2200, complexity: 3, chance: 0.3 },     // American Robin - cheerful
        { name: 'cardinal', freq: 3500, complexity: 2, chance: 0.25 }, // Cardinal - clear whistle
        { name: 'sparrow', freq: 4000, complexity: 4, chance: 0.2 },   // Song Sparrow - chatty
        { name: 'chickadee', freq: 3200, complexity: 2, chance: 0.15 }, // Chickadee - two-note
        { name: 'warbler', freq: 2800, complexity: 3, chance: 0.1 }    // Yellow Warbler - melodic
    ];

    // Number of birds singing increases with intensity
    const numBirds = Math.floor(1 + intensity * 10);

    for (let i = 0; i < numBirds; i++) {
        // Weighted random selection (some species more common)
        const random = Math.random();
        let cumulative = 0;
        let selectedSpecies = species[0];

        for (const sp of species) {
            cumulative += sp.chance;
            if (random <= cumulative) {
                selectedSpecies = sp;
                break;
            }
        }

        // Stagger bird calls naturally (some overlap, some gaps)
        const delay = Math.random() * 5;
        bird.birdCall(selectedSpecies.freq, selectedSpecies.complexity, delay, selectedSpecies.name);
    }

    // Add subtle background forest ambience
    if (intensity > 0.3) {
        createPinkNoise(audioContext, 5, 0);
    }
}

// Gentle wake melody - plays during final portion of timer
function playWakeMelody(audioContext, progress, melodyStart = 0.85) {
    if (progress < melodyStart || !slowWakeMelodyGain) return;

    // Calculate melody progress (0 to 1 over the final 15%)
    const melodyProgress = (progress - melodyStart) / (1 - melodyStart);

    // Volume fades in exponentially during melody phase
    const melodyVolume = Math.pow(melodyProgress, 1.5) * 0.4;
    slowWakeMelodyGain.gain.value = melodyVolume;

    // Play a gentle note occasionally (pentatonic scale for pleasantness)
    const shouldPlayNote = Math.random() < 0.15; // 15% chance per check

    if (shouldPlayNote) {
        // Pentatonic scale (C major pentatonic): C, D, E, G, A
        const pentatonic = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25]; // C4 to C5
        const note = pentatonic[Math.floor(Math.random() * pentatonic.length)];

        const osc = audioContext.createOscillator();
        const oscGain = audioContext.createGain();

        // Soft piano-like sound
        osc.type = 'sine';
        osc.frequency.value = note;

        osc.connect(oscGain);
        oscGain.connect(slowWakeMelodyGain);

        const now = audioContext.currentTime;
        const duration = 0.8 + Math.random() * 0.4;

        // Gentle envelope
        oscGain.gain.setValueAtTime(0, now);
        oscGain.gain.linearRampToValueAtTime(0.3, now + 0.02);
        oscGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

        osc.start(now);
        osc.stop(now + duration);
    }
}

// Start the slow wake experience
function startSlowWakeExperience() {
    const duration = (state.slowWake?.duration || 10) * 60 * 1000; // Convert to milliseconds
    const sound = state.slowWake?.sound || 'birds';

    // Initialize audio context
    if (sound !== 'silent') {
        slowWakeAudioContext = new (window.AudioContext || window.webkitAudioContext)();

        // Create gain nodes for birds and melody separately
        slowWakeGainNode = slowWakeAudioContext.createGain();
        slowWakeGainNode.connect(slowWakeAudioContext.destination);
        slowWakeGainNode.gain.value = 0; // Start at 0 volume

        // Separate gain for melody (final phase)
        slowWakeMelodyGain = slowWakeAudioContext.createGain();
        slowWakeMelodyGain.connect(slowWakeAudioContext.destination);
        slowWakeMelodyGain.gain.value = 0; // Start at 0 volume
    }

    // Create fullscreen overlay
    const overlay = document.createElement('div');
    overlay.id = 'slow-wake-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(to bottom, #0a0a0a, #1a0f0a);
        z-index: 10000;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        transition: opacity 0.5s;
    `;

    overlay.innerHTML = `
        <div style="text-align: center; color: #666; padding: 20px;">
            <div style="font-size: 80px; margin-bottom: 20px; opacity: 0.3;" id="wake-sun">🌄</div>
            <div style="font-size: 32px; font-weight: 300; margin-bottom: 12px; color: #888;" id="wake-clock">--:--</div>
            <div style="font-size: 16px; margin-bottom: 30px; color: #666;" id="wake-message">Gentle wake beginning...</div>
            <button onclick="actions.stopSlowWake()"
                    style="padding: 14px 28px; background: rgba(255, 255, 255, 0.1); color: #888; border: 2px solid #444; border-radius: 12px; font-weight: 600; cursor: pointer; font-size: 16px;">
                I'm Awake!
            </button>
        </div>
    `;

    document.body.appendChild(overlay);

    // Try to enter fullscreen
    if (overlay.requestFullscreen) {
        overlay.requestFullscreen().catch(err => console.log('Fullscreen error:', err));
    }

    const startTime = Date.now();
    let lastBirdTime = 0;

    // Update loop
    slowWakeInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Update clock
        const now = new Date();
        document.getElementById('wake-clock').textContent =
            now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        // Update message
        const minutesLeft = Math.ceil((duration - elapsed) / 60000);
        if (minutesLeft > 0) {
            document.getElementById('wake-message').textContent =
                `${minutesLeft} minute${minutesLeft !== 1 ? 's' : ''} until wake time`;
        } else {
            document.getElementById('wake-message').textContent = 'Good morning! ☀️';
        }

        // Exponential volume curve (feels more natural)
        const volume = Math.pow(progress, 2) * 0.7; // Max 70% volume

        // Update audio
        if (sound === 'birds' && slowWakeAudioContext) {
            slowWakeGainNode.gain.value = volume;

            // Generate new bird calls periodically (every 4-6 seconds)
            const timeSinceLastBird = elapsed - lastBirdTime;
            if (timeSinceLastBird > 4000 + Math.random() * 2000) {
                generateMorningBirds(slowWakeAudioContext, progress);
                lastBirdTime = elapsed;
            }

            // Play gentle melody during final phase (default: last 15%)
            const melodyStart = state.slowWake?.melodyStart || 0.85;
            playWakeMelody(slowWakeAudioContext, progress, melodyStart);
        }

        // Update visual brightness - exponential curve
        const brightness = Math.pow(progress, 1.5); // Exponential feel

        // Sunrise color gradient
        const colors = [
            { r: 10, g: 10, b: 10 },     // Near black (0%)
            { r: 25, g: 15, b: 35 },     // Deep purple (15%)
            { r: 60, g: 30, b: 50 },     // Purple (30%)
            { r: 120, g: 60, b: 80 },    // Pink-purple (45%)
            { r: 200, g: 100, b: 60 },   // Orange (60%)
            { r: 255, g: 180, b: 100 },  // Light orange (75%)
            { r: 255, g: 240, b: 200 }   // Warm white (100%)
        ];

        const colorIndex = Math.min(Math.floor(brightness * (colors.length - 1)), colors.length - 2);
        const colorProgress = (brightness * (colors.length - 1)) - colorIndex;

        const startColor = colors[colorIndex];
        const endColor = colors[colorIndex + 1];

        const r = Math.round(startColor.r + (endColor.r - startColor.r) * colorProgress);
        const g = Math.round(startColor.g + (endColor.g - startColor.g) * colorProgress);
        const b = Math.round(startColor.b + (endColor.b - startColor.b) * colorProgress);

        overlay.style.background = `rgb(${r}, ${g}, ${b})`;

        // Update sun brightness
        const sun = document.getElementById('wake-sun');
        if (sun) {
            sun.style.opacity = 0.3 + (brightness * 0.7);
            sun.style.fontSize = (80 + brightness * 40) + 'px';
        }

        // Update text colors as it gets brighter
        const textBrightness = Math.min(brightness * 1.5, 1);
        const textColor = `rgb(${100 + textBrightness * 155}, ${100 + textBrightness * 155}, ${100 + textBrightness * 155})`;
        document.getElementById('wake-clock').style.color = textColor;
        document.getElementById('wake-message').style.color = textColor;

        // Finished
        if (progress >= 1) {
            // Auto-stop after 30 more seconds (gentle melody continues until dismissed)
            setTimeout(() => {
                if (state.slowWake?.isActive) {
                    actions.stopSlowWake();
                }
            }, 30000);
        }
    }, 100); // Update every 100ms for smooth transitions
}

// Stop the slow wake experience
function stopSlowWakeExperience() {
    // Clear interval
    if (slowWakeInterval) {
        clearInterval(slowWakeInterval);
        slowWakeInterval = null;
    }

    // Stop all audio
    if (slowWakeAudioContext) {
        slowWakeBirdNodes.forEach(node => {
            try { node.stop(); } catch (e) {}
        });
        slowWakeBirdNodes = [];
        slowWakeAudioContext.close();
        slowWakeAudioContext = null;
        slowWakeGainNode = null;
        slowWakeMelodyGain = null;
    }

    // Remove overlay
    const overlay = document.getElementById('slow-wake-overlay');
    if (overlay) {
        // Exit fullscreen
        if (document.fullscreenElement) {
            document.exitFullscreen().catch(err => console.log('Exit fullscreen error:', err));
        }
        overlay.remove();
    }
}
