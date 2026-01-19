// --- SLOW WAKE TIMER ---

let slowWakeInterval = null;
let slowWakeAudioContext = null;
let slowWakeGainNode = null;
let slowWakeMelodyGain = null;
let slowWakeBirdNodes = [];

// Create gentle breeze sound for pleasant morning ambience
function createGentleBreeze(audioContext, duration, delay = 0) {
    const bufferSize = audioContext.sampleRate * duration;
    const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
    const output = buffer.getChannelData(0);

    // Generate very soft, filtered white noise for breeze effect
    for (let i = 0; i < bufferSize; i++) {
        // Soft, slow-changing noise
        const time = i / audioContext.sampleRate;
        const envelope = Math.sin(time * 0.3) * 0.5 + 0.5; // Slow wave
        output[i] = (Math.random() * 2 - 1) * 0.03 * envelope;
    }

    const breeze = audioContext.createBufferSource();
    breeze.buffer = buffer;

    const breezeGain = audioContext.createGain();
    breezeGain.gain.value = 0.008; // Very subtle

    // Low-pass filter for soft, wind-like quality
    const filter = audioContext.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 300;
    filter.Q.value = 0.3;

    breeze.connect(filter);
    filter.connect(breezeGain);
    breezeGain.connect(slowWakeGainNode);

    const now = audioContext.currentTime + delay;
    breeze.start(now);
    breeze.stop(now + duration);

    return breeze;
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
        // Reduced harmonics for more natural, less digital sound
        const harmonics = [1, 1.5]; // Fundamental + one gentle harmonic
        const harmonicVolumes = [1, 0.12]; // Much lower harmonic volume

        const masterGain = this.audioContext.createGain();
        masterGain.connect(slowWakeGainNode);

        harmonics.forEach((harmonic, index) => {
            const osc = this.audioContext.createOscillator();
            const oscGain = this.audioContext.createGain();

            // Pure sine waves for cleaner, more organic sound
            osc.type = 'sine';

            // More natural detuning variation
            const detune = (Math.random() - 0.5) * 15;
            osc.detune.value = detune;

            osc.connect(oscGain);
            oscGain.connect(masterGain);

            // Different chirp patterns for different species (simplified for natural sound)
            if (species === 'robin') {
                // Gentle upward sweep
                osc.frequency.setValueAtTime(frequency * harmonic, now);
                osc.frequency.exponentialRampToValueAtTime(frequency * harmonic * 1.25, now + duration * 0.4);
                osc.frequency.exponentialRampToValueAtTime(frequency * harmonic * 1.05, now + duration);
            } else if (species === 'cardinal') {
                // Clear, smooth whistle
                osc.frequency.setValueAtTime(frequency * harmonic, now);
                osc.frequency.exponentialRampToValueAtTime(frequency * harmonic * 1.15, now + duration * 0.6);
                osc.frequency.exponentialRampToValueAtTime(frequency * harmonic * 1.1, now + duration);
            } else if (species === 'chickadee') {
                // Simple two-note
                osc.frequency.setValueAtTime(frequency * harmonic, now);
                osc.frequency.exponentialRampToValueAtTime(frequency * harmonic * 0.85, now + duration * 0.5);
                osc.frequency.setValueAtTime(frequency * harmonic * 0.85, now + duration * 0.5);
            } else {
                // Warbler - smooth flowing pattern
                osc.frequency.setValueAtTime(frequency * harmonic, now);
                osc.frequency.exponentialRampToValueAtTime(frequency * harmonic * 1.2, now + duration * 0.5);
                osc.frequency.exponentialRampToValueAtTime(frequency * harmonic * 1.05, now + duration);
            }

            // Softer, more organic envelope
            oscGain.gain.setValueAtTime(0, now);
            oscGain.gain.exponentialRampToValueAtTime(0.15 * harmonicVolumes[index], now + 0.01);
            oscGain.gain.exponentialRampToValueAtTime(0.08 * harmonicVolumes[index], now + duration * 0.7);
            oscGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

            osc.start(now);
            osc.stop(now + duration);
            oscillators.push(osc);
        });

        // Softer master envelope for organic feel
        masterGain.gain.setValueAtTime(0, now);
        masterGain.gain.exponentialRampToValueAtTime(0.25, now + 0.015);
        masterGain.gain.exponentialRampToValueAtTime(0.12, now + duration * 0.6);
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

    // Realistic morning bird species with natural frequency ranges
    const species = [
        { name: 'robin', freq: 2200, complexity: 2, chance: 0.4 },     // American Robin - cheerful and common
        { name: 'cardinal', freq: 3200, complexity: 2, chance: 0.35 }, // Cardinal - clear whistle
        { name: 'chickadee', freq: 3000, complexity: 2, chance: 0.15 }, // Chickadee - two-note
        { name: 'warbler', freq: 2600, complexity: 2, chance: 0.1 }    // Warbler - melodic
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

    // Add gentle morning breeze sound
    if (intensity > 0.4) {
        createGentleBreeze(audioContext, 6, 0);
    }
}

// Mozart-inspired gentle wake melody with calming frequencies
// Based on "Twinkle Twinkle Little Star" pattern using 432 Hz tuning
let melodyNoteIndex = 0;
let lastMelodyNote = 0;

function playWakeMelody(audioContext, progress, melodyStart = 0.85) {
    if (progress < melodyStart || !slowWakeMelodyGain) return;

    // Calculate melody progress (0 to 1 over the final phase)
    const melodyProgress = (progress - melodyStart) / (1 - melodyStart);

    // Volume fades in exponentially during melody phase
    const melodyVolume = Math.pow(melodyProgress, 1.5) * 0.35;
    slowWakeMelodyGain.gain.value = melodyVolume;

    // 432 Hz tuning - more harmonious with nature (calming effect)
    // C major scale tuned to A4 = 432 Hz instead of 440 Hz
    const scale432 = {
        C4: 256.87,  // Grounding, stability
        D4: 288.33,  // Balance
        E4: 323.63,  // Joy, brightness
        F4: 342.88,  // Harmony
        G4: 384.87,  // Openness
        A4: 432.00,  // Natural resonance (tuning reference)
        C5: 513.74   // Uplifting
    };

    // Mozart's "Twinkle Twinkle" pattern (simplified and gentle)
    const melodyPattern = [
        { note: scale432.C4, duration: 0.5 },  // Twin-
        { note: scale432.C4, duration: 0.5 },  // kle
        { note: scale432.G4, duration: 0.5 },  // twin-
        { note: scale432.G4, duration: 0.5 },  // kle
        { note: scale432.A4, duration: 0.5 },  // lit-
        { note: scale432.A4, duration: 0.5 },  // tle
        { note: scale432.G4, duration: 1.0 },  // star

        { note: scale432.F4, duration: 0.5 },  // How
        { note: scale432.F4, duration: 0.5 },  // I
        { note: scale432.E4, duration: 0.5 },  // won-
        { note: scale432.E4, duration: 0.5 },  // der
        { note: scale432.D4, duration: 0.5 },  // what
        { note: scale432.D4, duration: 0.5 },  // you
        { note: scale432.C4, duration: 1.0 },  // are
    ];

    const now = audioContext.currentTime;
    const timeSinceLastNote = (now - lastMelodyNote) * 1000;

    // Play next note in pattern at appropriate timing
    if (timeSinceLastNote > 600 || lastMelodyNote === 0) {
        const currentNote = melodyPattern[melodyNoteIndex % melodyPattern.length];

        // Create gentle bell-like tone
        const osc = audioContext.createOscillator();
        const oscGain = audioContext.createGain();

        // Pure sine wave for soft, calming tone
        osc.type = 'sine';
        osc.frequency.value = currentNote.note;

        // Add subtle vibrato for warmth
        const vibrato = audioContext.createOscillator();
        const vibratoGain = audioContext.createGain();
        vibrato.frequency.value = 5; // 5 Hz vibrato
        vibratoGain.gain.value = 2;  // Very subtle
        vibrato.connect(vibratoGain);
        vibratoGain.connect(osc.frequency);

        osc.connect(oscGain);
        oscGain.connect(slowWakeMelodyGain);

        const duration = currentNote.duration;

        // Gentle bell-like envelope
        oscGain.gain.setValueAtTime(0, now);
        oscGain.gain.exponentialRampToValueAtTime(0.25, now + 0.03);
        oscGain.gain.exponentialRampToValueAtTime(0.15, now + duration * 0.4);
        oscGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

        vibrato.start(now);
        osc.start(now);
        vibrato.stop(now + duration);
        osc.stop(now + duration);

        lastMelodyNote = now;
        melodyNoteIndex++;
    }
}

// Start the slow wake experience
function startSlowWakeExperience() {
    const duration = (state.slowWake?.duration || 10) * 60 * 1000; // Convert to milliseconds
    const sound = state.slowWake?.sound || 'birds';

    // Reset melody state
    melodyNoteIndex = 0;
    lastMelodyNote = 0;

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
        const melodyStart = state.slowWake?.melodyStart || 0.85;

        if (progress >= melodyStart && progress < 1) {
            // Show melody countdown in seconds or minutes
            const melodyElapsed = (progress - melodyStart) / (1 - melodyStart);
            const melodyDuration = duration * (1 - melodyStart);
            const melodyTimeLeft = Math.ceil((melodyDuration - (melodyElapsed * melodyDuration)) / 1000);

            if (melodyTimeLeft >= 60) {
                const mins = Math.ceil(melodyTimeLeft / 60);
                document.getElementById('wake-message').textContent =
                    `🎵 Gentle melody: ${mins} minute${mins !== 1 ? 's' : ''} remaining`;
            } else {
                document.getElementById('wake-message').textContent =
                    `🎵 Gentle melody: ${melodyTimeLeft} second${melodyTimeLeft !== 1 ? 's' : ''} remaining`;
            }
        } else if (progress < 1) {
            const minutesLeft = Math.ceil((duration - elapsed) / 60000);
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

    // Reset melody state
    melodyNoteIndex = 0;
    lastMelodyNote = 0;

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
