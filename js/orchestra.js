/**
 * Orchestra Composition System
 *
 * Multi-instrument arrangements for gentle wake melodies
 * Prioritizes real classical recordings, falls back to synthesis
 *
 * Loading priority:
 * 1. Real classical recordings (when available)
 * 2. WASM synthesis (if loaded)
 * 3. Simple oscillator synthesis (always available)
 */

// Audio buffer cache for loaded recordings
const audioBuffers = {};
let audioBuffersLoaded = false;

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
 * Each composition can have a 'recording' property for real audio files
 */
const COMPOSITIONS = {
    // Vivaldi - Four Seasons (Spring)
    "vivaldiSpring": {
        name: "Vivaldi - Spring",
        composer: "Antonio Vivaldi",
        recording: {
            file: "/audio/classical/Vivaldi Violin Concerto in E major, RV 269 'Spring'.mp3",
            duration: 120,
            fadeIn: 5,
            fadeOut: 8,
            volume: 0.4
        }
    },

    // Chopin - Nocturne
    "chopinNocturne": {
        name: "Chopin Nocturne in E flat major, Op. 9 No. 2",
        composer: "Frédéric Chopin",
        recording: {
            file: "/audio/classical/Chopin Nocturne in E flat major, Op. 9 no. 2.mp3",
            duration: 120,
            fadeIn: 6,
            fadeOut: 10,
            volume: 0.35
        }
    },

    // Mozart Piano Concerto No. 23 in A major, K. 488 - 2nd movement "Adagio"
    "mozartAdagio": {
        name: "Mozart Piano Concerto 23 - Adagio",
        composer: "W.A. Mozart",
        recording: {
            file: "/audio/classical/mozart-peaceful-1.mp3",
            duration: 120, // 2 minutes
            fadeIn: 5,     // Fade in over 5 seconds
            fadeOut: 8,    // Fade out over 8 seconds
            volume: 0.4
        }
    },

    // Debussy - Clair de Lune
    "clairDeLune": {
        name: "Clair de Lune",
        composer: "Claude Debussy",
        recording: {
            file: "/audio/classical/debussy-clair-1.mp3",
            duration: 120,
            fadeIn: 6,
            fadeOut: 10,
            volume: 0.35
        }
    },

    // Mozart Piano Concerto No. 21 in C major, K. 467 - 2nd movement "Andante"
    "mozartAndante": {
        name: "Mozart Piano Concerto 21 - Andante",
        composer: "W.A. Mozart",
        recording: {
            file: "/audio/classical/mozart-dreamy-1.mp3",
            duration: 120,
            fadeIn: 5,
            fadeOut: 8,
            volume: 0.38
        }
    },

    // Satie - Gymnopédie No. 1
    "gymnopedie": {
        name: "Gymnopédie No. 1",
        composer: "Erik Satie",
        recording: {
            file: "/audio/classical/satie-gentle-1.mp3",
            duration: 120,
            fadeIn: 4,
            fadeOut: 10,
            volume: 0.35
        }
    },

    // Original composition inspired by Pachelbel's Canon
    // (Synthesis fallback for all compositions)
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
 * Priority: 1) Real recording, 2) Synthesis fallback
 */
function playComposition(audioContext, compositionId, startTime = 0) {
    const composition = COMPOSITIONS[compositionId];
    if (!composition) {
        console.error(`[Orchestra] Composition ${compositionId} not found`);
        return [];
    }

    // Try to play real recording first
    if (composition.recording && audioBuffers[compositionId]) {
        const recordingSource = playRecording(audioContext, compositionId, startTime);
        if (recordingSource) {
            return [recordingSource];
        }
    }

    // Fall back to synthesis if no recording available
    if (!composition.tracks) {
        console.warn(`[Orchestra] No recording or synthesis tracks for: ${compositionId}`);
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
let currentComposition = "chopinNocturne"; // Default to Chopin Nocturne

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
 * Reads from state.slowWake.composition with fallback to chopinNocturne
 */
function getWakeComposition() {
    if (typeof state !== 'undefined' && state.slowWake && state.slowWake.composition) {
        return state.slowWake.composition;
    }
    return currentComposition;
}

/**
 * Load all classical music recordings
 * Call this during app initialization
 */
async function loadClassicalRecordings(audioContext) {
    if (audioBuffersLoaded) {
        console.log('[Orchestra] Recordings already loaded');
        return true;
    }

    const recordingsToLoad = [];

    // Collect all compositions with recordings
    for (const [id, composition] of Object.entries(COMPOSITIONS)) {
        if (composition.recording && composition.recording.file) {
            recordingsToLoad.push({
                id: id,
                file: composition.recording.file,
                name: composition.name
            });
        }
    }

    if (recordingsToLoad.length === 0) {
        console.log('[Orchestra] No recordings configured');
        return false;
    }

    console.log(`[Orchestra] Loading ${recordingsToLoad.length} classical recordings...`);

    // Load each recording
    const loadPromises = recordingsToLoad.map(async (recording) => {
        try {
            const response = await fetch(recording.file);
            if (!response.ok) {
                console.warn(`[Orchestra] Recording not found: ${recording.file}`);
                return false;
            }

            const arrayBuffer = await response.arrayBuffer();
            const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

            audioBuffers[recording.id] = audioBuffer;
            console.log(`[Orchestra] ✓ Loaded: ${recording.name} (${audioBuffer.duration.toFixed(1)}s)`);
            return true;
        } catch (error) {
            console.warn(`[Orchestra] Failed to load ${recording.name}:`, error.message);
            return false;
        }
    });

    const results = await Promise.all(loadPromises);
    const successCount = results.filter(r => r).length;

    audioBuffersLoaded = successCount > 0;

    if (successCount > 0) {
        console.log(`[Orchestra] Successfully loaded ${successCount}/${recordingsToLoad.length} recordings`);
    } else {
        console.log('[Orchestra] No recordings loaded - will use synthesis fallback');
    }

    return audioBuffersLoaded;
}

/**
 * Play a classical music recording with fade in/out
 */
function playRecording(audioContext, compositionId, startTime = 0) {
    const composition = COMPOSITIONS[compositionId];
    if (!composition || !composition.recording) {
        return null;
    }

    const buffer = audioBuffers[compositionId];
    if (!buffer) {
        console.warn(`[Orchestra] Recording buffer not loaded for: ${compositionId}`);
        return null;
    }

    const recording = composition.recording;
    const source = audioContext.createBufferSource();
    const gainNode = audioContext.createGain();

    source.buffer = buffer;
    source.connect(gainNode);
    gainNode.connect(audioContext.destination);

    const now = audioContext.currentTime + startTime;
    const fadeIn = recording.fadeIn || 3;
    const fadeOut = recording.fadeOut || 5;
    const volume = recording.volume || 0.4;
    const duration = Math.min(recording.duration || buffer.duration, buffer.duration);

    // Fade in
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(volume, now + fadeIn);

    // Sustain
    gainNode.gain.setValueAtTime(volume, now + duration - fadeOut);

    // Fade out
    gainNode.gain.linearRampToValueAtTime(0.001, now + duration);

    source.start(now);
    source.stop(now + duration);

    console.log(`[Orchestra] Playing recording: ${composition.name} (${duration}s with ${fadeIn}s fade-in)`);

    return { source, gainNode };
}
