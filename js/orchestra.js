/**
 * Orchestra Composition System
 *
 * Multi-instrument arrangements for gentle wake melodies
 * Uses WASM audio engine instruments when available
 */

// 432 Hz tuning - natural resonance scale
const SCALE_432 = {
    C3: 128.43,
    D3: 144.16,
    E3: 161.82,
    F3: 171.44,
    G3: 192.43,
    A3: 216.00,
    B3: 242.45,
    C4: 256.87,
    D4: 288.33,
    E4: 323.63,
    F4: 342.88,
    G4: 384.87,
    A4: 432.00,
    B4: 485.29,
    C5: 513.74,
    D5: 576.65,
    E5: 647.27,
    F5: 685.76,
    G5: 769.74,
    A5: 864.00
};

/**
 * Classical-style compositions for gentle awakening
 */
const COMPOSITIONS = {
    // Original composition inspired by Pachelbel's Canon
    "pastoralDawn": {
        name: "Pastoral Dawn",
        composer: "Original (Classical Style)",
        tempo: 70, // BPM
        tracks: [
            // Cello bass line (repeating)
            {
                instrument: "strings",
                voice: "cello",
                notes: [
                    { pitch: SCALE_432.C3, start: 0, duration: 2 },
                    { pitch: SCALE_432.G3, start: 2, duration: 2 },
                    { pitch: SCALE_432.A3, start: 4, duration: 2 },
                    { pitch: SCALE_432.E3, start: 6, duration: 2 },
                    { pitch: SCALE_432.F3, start: 8, duration: 2 },
                    { pitch: SCALE_432.C3, start: 10, duration: 2 },
                    { pitch: SCALE_432.F3, start: 12, duration: 2 },
                    { pitch: SCALE_432.G3, start: 14, duration: 2 },
                ],
                volume: 0.3,
                loop: true
            },
            // Violin melody (enters at 8 seconds)
            {
                instrument: "strings",
                voice: "violin",
                notes: [
                    { pitch: SCALE_432.E4, start: 8, duration: 1 },
                    { pitch: SCALE_432.F4, start: 9, duration: 0.5 },
                    { pitch: SCALE_432.G4, start: 9.5, duration: 0.5 },
                    { pitch: SCALE_432.A4, start: 10, duration: 2 },
                    { pitch: SCALE_432.G4, start: 12, duration: 1 },
                    { pitch: SCALE_432.F4, start: 13, duration: 1 },
                    { pitch: SCALE_432.E4, start: 14, duration: 1.5 },
                    { pitch: SCALE_432.D4, start: 15.5, duration: 0.5 },
                    { pitch: SCALE_432.C4, start: 16, duration: 2 },
                ],
                volume: 0.4,
                loop: true
            },
            // Harp arpeggios (light accompaniment)
            {
                instrument: "harp",
                notes: [
                    { pitch: SCALE_432.C4, start: 4, duration: 0.3 },
                    { pitch: SCALE_432.E4, start: 4.2, duration: 0.3 },
                    { pitch: SCALE_432.G4, start: 4.4, duration: 0.3 },
                    { pitch: SCALE_432.C5, start: 4.6, duration: 0.4 },

                    { pitch: SCALE_432.A3, start: 6, duration: 0.3 },
                    { pitch: SCALE_432.C4, start: 6.2, duration: 0.3 },
                    { pitch: SCALE_432.E4, start: 6.4, duration: 0.3 },
                    { pitch: SCALE_432.A4, start: 6.6, duration: 0.4 },
                ],
                volume: 0.25,
                loop: true
            }
        ]
    },

    // Original composition inspired by Mozart's Eine Kleine Nachtmusik
    "morningAllegro": {
        name: "Morning Allegro",
        composer: "Original (Mozart Style)",
        tempo: 80,
        tracks: [
            // Strings - melody
            {
                instrument: "strings",
                voice: "violin",
                notes: [
                    { pitch: SCALE_432.G4, start: 0, duration: 0.4 },
                    { pitch: SCALE_432.D5, start: 0.4, duration: 0.8 },
                    { pitch: SCALE_432.G4, start: 1.2, duration: 0.4 },
                    { pitch: SCALE_432.D5, start: 1.6, duration: 0.8 },

                    { pitch: SCALE_432.E5, start: 2.4, duration: 0.3 },
                    { pitch: SCALE_432.D5, start: 2.7, duration: 0.3 },
                    { pitch: SCALE_432.C5, start: 3.0, duration: 0.3 },
                    { pitch: SCALE_432.B4, start: 3.3, duration: 0.3 },
                    { pitch: SCALE_432.A4, start: 3.6, duration: 1.2 },
                ],
                volume: 0.5,
                loop: true
            },
            // Piano accompaniment
            {
                instrument: "piano",
                notes: [
                    { pitch: SCALE_432.G3, start: 0, duration: 0.4 },
                    { pitch: SCALE_432.B3, start: 0.4, duration: 0.4 },
                    { pitch: SCALE_432.D4, start: 0.8, duration: 0.4 },
                    { pitch: SCALE_432.G3, start: 1.2, duration: 0.4 },
                    { pitch: SCALE_432.B3, start: 1.6, duration: 0.4 },
                    { pitch: SCALE_432.D4, start: 2.0, duration: 0.4 },
                ],
                volume: 0.3,
                loop: true
            }
        ]
    },

    // Gentle flute and harp - inspired by Debussy
    "sunriseReverie": {
        name: "Sunrise Reverie",
        composer: "Original (Impressionist Style)",
        tempo: 60,
        tracks: [
            // Flute melody (ethereal)
            {
                instrument: "flute",
                notes: [
                    { pitch: SCALE_432.E5, start: 0, duration: 2.5 },
                    { pitch: SCALE_432.D5, start: 2.5, duration: 1.5 },
                    { pitch: SCALE_432.C5, start: 4, duration: 2 },
                    { pitch: SCALE_432.B4, start: 6, duration: 1.5 },
                    { pitch: SCALE_432.A4, start: 7.5, duration: 2.5 },
                    { pitch: SCALE_432.G4, start: 10, duration: 2 },
                    { pitch: SCALE_432.A4, start: 12, duration: 3 },
                ],
                volume: 0.35,
                breathiness: 0.15,
                loop: true
            },
            // Harp flowing arpeggios
            {
                instrument: "harp",
                notes: [
                    { pitch: SCALE_432.C4, start: 1, duration: 0.4 },
                    { pitch: SCALE_432.E4, start: 1.3, duration: 0.4 },
                    { pitch: SCALE_432.G4, start: 1.6, duration: 0.4 },
                    { pitch: SCALE_432.C5, start: 1.9, duration: 0.5 },
                    { pitch: SCALE_432.E5, start: 2.3, duration: 0.5 },

                    { pitch: SCALE_432.G3, start: 4, duration: 0.4 },
                    { pitch: SCALE_432.B3, start: 4.3, duration: 0.4 },
                    { pitch: SCALE_432.D4, start: 4.6, duration: 0.4 },
                    { pitch: SCALE_432.G4, start: 4.9, duration: 0.5 },
                    { pitch: SCALE_432.B4, start: 5.3, duration: 0.5 },
                ],
                volume: 0.2,
                loop: true
            }
        ]
    }
};

/**
 * Get available compositions
 */
function getCompositions() {
    return Object.keys(COMPOSITIONS).map(key => ({
        id: key,
        name: COMPOSITIONS[key].name,
        composer: COMPOSITIONS[key].composer
    }));
}

/**
 * Get a specific composition
 */
function getComposition(id) {
    return COMPOSITIONS[id];
}

/**
 * Play a composition using Web Audio API
 * Falls back to simple synthesis if WASM not available
 */
function playComposition(audioContext, compositionId, startTime = 0) {
    const composition = COMPOSITIONS[compositionId];
    if (!composition) {
        console.error(`Composition ${compositionId} not found`);
        return [];
    }

    const sources = [];
    const beatsPerSecond = composition.tempo / 60;

    composition.tracks.forEach(track => {
        track.notes.forEach(note => {
            const actualStartTime = audioContext.currentTime + startTime + (note.start / beatsPerSecond);
            const actualDuration = note.duration / beatsPerSecond;

            // Create oscillator for this note
            const osc = audioContext.createOscillator();
            const gain = audioContext.createGain();

            osc.type = 'sine';
            osc.frequency.value = note.pitch;

            // Apply instrument-specific characteristics
            let envelope;
            switch (track.instrument) {
                case 'piano':
                    envelope = { attack: 0.01, decay: 0.3, sustain: 0.7, release: 0.2 };
                    break;
                case 'strings':
                    envelope = { attack: 0.1, decay: 0.1, sustain: 0.9, release: 0.3 };
                    break;
                case 'harp':
                    envelope = { attack: 0.005, decay: 0.5, sustain: 0.3, release: 0.1 };
                    break;
                case 'flute':
                    envelope = { attack: 0.05, decay: 0.05, sustain: 0.95, release: 0.15 };
                    break;
                default:
                    envelope = { attack: 0.05, decay: 0.1, sustain: 0.8, release: 0.2 };
            }

            // Apply envelope
            const volume = track.volume || 0.3;
            gain.gain.setValueAtTime(0, actualStartTime);
            gain.gain.linearRampToValueAtTime(volume, actualStartTime + envelope.attack);
            gain.gain.linearRampToValueAtTime(volume * envelope.sustain, actualStartTime + envelope.attack + envelope.decay);
            gain.gain.setValueAtTime(volume * envelope.sustain, actualStartTime + actualDuration - envelope.release);
            gain.gain.linearRampToValueAtTime(0.001, actualStartTime + actualDuration);

            osc.connect(gain);
            gain.connect(audioContext.destination);

            osc.start(actualStartTime);
            osc.stop(actualStartTime + actualDuration);

            sources.push({ osc, gain });
        });
    });

    console.log(`[Orchestra] Playing "${composition.name}" (${sources.length} notes)`);

    return sources;
}

/**
 * Current active composition (for slow wake timer)
 */
let currentComposition = "pastoralDawn"; // Default to Pastoral Dawn

/**
 * Set which composition to use for wake timer
 */
function setWakeComposition(compositionId) {
    if (COMPOSITIONS[compositionId]) {
        currentComposition = compositionId;
        console.log(`[Orchestra] Wake composition set to: ${COMPOSITIONS[compositionId].name}`);
        return true;
    }
    return false;
}

/**
 * Get current wake composition ID
 */
function getWakeComposition() {
    return currentComposition;
}
