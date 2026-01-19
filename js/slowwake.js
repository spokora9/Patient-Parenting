// --- SLOW WAKE TIMER ---

let slowWakeInterval = null;
let slowWakeAudioContext = null;
let slowWakeGainNode = null;
let slowWakeBirdNodes = [];

// Natural bird chirping sound generator
class BirdChirp {
    constructor(audioContext) {
        this.audioContext = audioContext;
    }

    // Generate a single bird chirp
    chirp(frequency, duration, delay = 0) {
        const now = this.audioContext.currentTime + delay;

        // Create oscillator for the chirp
        const osc = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        // Connect nodes
        osc.connect(gainNode);
        gainNode.connect(slowWakeGainNode);

        // Bird chirp characteristics
        osc.type = 'sine';
        osc.frequency.setValueAtTime(frequency, now);

        // Natural vibrato/warble
        osc.frequency.exponentialRampToValueAtTime(frequency * 1.3, now + duration * 0.3);
        osc.frequency.exponentialRampToValueAtTime(frequency * 0.9, now + duration * 0.7);
        osc.frequency.exponentialRampToValueAtTime(frequency, now + duration);

        // Natural envelope (attack-decay-sustain-release)
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.exponentialRampToValueAtTime(0.3, now + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.15, now + duration * 0.5);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + duration);

        // Start and stop
        osc.start(now);
        osc.stop(now + duration);

        return osc;
    }

    // Generate a sequence of chirps (like a bird call)
    birdCall(baseFrequency, complexity = 3, delay = 0) {
        const chirps = [];
        for (let i = 0; i < complexity; i++) {
            const freq = baseFrequency + (Math.random() * 200 - 100);
            const duration = 0.08 + Math.random() * 0.12;
            const chirpDelay = delay + (i * 0.15);
            chirps.push(this.chirp(freq, duration, chirpDelay));
        }
        return chirps;
    }
}

// Morning bird chorus - multiple species
function generateMorningBirds(audioContext, intensity) {
    const bird = new BirdChirp(audioContext);

    // Different bird species with different frequency ranges
    const species = [
        { freq: 2000, complexity: 2 }, // High chirper (robin-like)
        { freq: 1200, complexity: 3 }, // Mid chirper (sparrow-like)
        { freq: 800, complexity: 2 },  // Low chirper (dove-like)
        { freq: 1800, complexity: 4 }  // Warbler
    ];

    // Number of birds singing increases with intensity
    const numBirds = Math.floor(1 + intensity * 8);

    for (let i = 0; i < numBirds; i++) {
        const selectedSpecies = species[Math.floor(Math.random() * species.length)];
        const delay = Math.random() * 4; // Stagger the calls
        bird.birdCall(selectedSpecies.freq, selectedSpecies.complexity, delay);
    }
}

// Start the slow wake experience
function startSlowWakeExperience() {
    const duration = (state.slowWake?.duration || 10) * 60 * 1000; // Convert to milliseconds
    const sound = state.slowWake?.sound || 'birds';

    // Initialize audio context
    if (sound !== 'silent') {
        slowWakeAudioContext = new (window.AudioContext || window.webkitAudioContext)();
        slowWakeGainNode = slowWakeAudioContext.createGain();
        slowWakeGainNode.connect(slowWakeAudioContext.destination);
        slowWakeGainNode.gain.value = 0; // Start at 0 volume
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
            // Play completion sound
            audio.playTone('success');

            // Auto-stop after 30 more seconds
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
