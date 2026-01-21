//! Multi-instrument synthesis for orchestra
//!
//! Implements physical models and synthesis techniques for musical instruments

use wasm_bindgen::prelude::*;
use rand::Rng;
use crate::dsp::LowPassFilter;
use crate::utils;

/// Piano synthesizer using Karplus-Strong algorithm
#[wasm_bindgen]
pub struct Piano {
    sample_rate: f32,
    buffers: Vec<Vec<f32>>,
    buffer_indices: Vec<usize>,
}

#[wasm_bindgen]
impl Piano {
    /// Create new piano synthesizer
    #[wasm_bindgen(constructor)]
    pub fn new(sample_rate: f32) -> Self {
        Piano {
            sample_rate,
            buffers: Vec::new(),
            buffer_indices: Vec::new(),
        }
    }

    /// Trigger a note
    #[wasm_bindgen]
    pub fn play_note(&mut self, frequency: f32, velocity: f32) {
        let buffer_size = (self.sample_rate / frequency) as usize;
        let mut buffer = vec![0.0; buffer_size];

        // Initialize with noise burst
        let mut rng = rand::thread_rng();
        for sample in buffer.iter_mut() {
            *sample = rng.gen_range(-1.0..1.0) * velocity;
        }

        self.buffers.push(buffer);
        self.buffer_indices.push(0);
    }

    /// Generate audio buffer
    #[wasm_bindgen]
    pub fn process(&mut self, num_samples: usize) -> Vec<f32> {
        let mut output = vec![0.0; num_samples];

        // Karplus-Strong algorithm
        for (buffer, index) in self.buffers.iter_mut().zip(self.buffer_indices.iter_mut()) {
            for i in 0..num_samples {
                if buffer.is_empty() {
                    continue;
                }

                let current = buffer[*index];
                let next_idx = (*index + 1) % buffer.len();
                let next = buffer[next_idx];

                // Average with damping
                buffer[*index] = (current + next) * 0.499;  // Damping < 0.5 for decay

                output[i] += current;
                *index = next_idx;
            }
        }

        output
    }
}

/// String section synthesizer
#[wasm_bindgen]
pub struct Strings {
    sample_rate: f32,
    phase: f32,
}

#[wasm_bindgen]
impl Strings {
    /// Create new string synthesizer
    #[wasm_bindgen(constructor)]
    pub fn new(sample_rate: f32) -> Self {
        Strings {
            sample_rate,
            phase: 0.0,
        }
    }

    /// Generate string ensemble sound
    /// Uses detuned sawtooth waves for rich texture
    #[wasm_bindgen]
    pub fn generate(&mut self, frequency: f32, duration: f32) -> Vec<f32> {
        let num_samples = (duration * self.sample_rate) as usize;
        let mut buffer = vec![0.0; num_samples];

        // Multiple detuned voices
        let voices = [
            frequency * 0.998,
            frequency,
            frequency * 1.002,
        ];

        for voice_freq in &voices {
            let mut phase = self.phase;

            for sample in buffer.iter_mut() {
                // Sawtooth wave
                let saw = 2.0 * (phase / (2.0 * std::f32::consts::PI)) - 1.0;
                *sample += saw * 0.33;

                phase += 2.0 * std::f32::consts::PI * voice_freq / self.sample_rate;
                if phase > 2.0 * std::f32::consts::PI {
                    phase -= 2.0 * std::f32::consts::PI;
                }
            }
        }

        self.phase += 2.0 * std::f32::consts::PI * frequency * duration;
        if self.phase > 2.0 * std::f32::consts::PI {
            self.phase -= 2.0 * std::f32::consts::PI;
        }

        buffer
    }
}

/// Flute synthesizer
#[wasm_bindgen]
pub struct Flute {
    sample_rate: f32,
    phase: f32,
    noise_filter: LowPassFilter,
}

#[wasm_bindgen]
impl Flute {
    /// Create new flute synthesizer
    #[wasm_bindgen(constructor)]
    pub fn new(sample_rate: f32) -> Self {
        Flute {
            sample_rate,
            phase: 0.0,
            noise_filter: LowPassFilter::new(2000.0, sample_rate),
        }
    }

    /// Generate flute sound
    /// Combines sine wave with filtered noise for breath sound
    #[wasm_bindgen]
    pub fn generate(&mut self, frequency: f32, duration: f32, breathiness: f32) -> Vec<f32> {
        let num_samples = (duration * self.sample_rate) as usize;
        let mut buffer = vec![0.0; num_samples];
        let mut rng = rand::thread_rng();

        for sample in buffer.iter_mut() {
            // Pure tone
            let tone = self.phase.sin();

            // Breath noise
            let noise: f32 = rng.gen_range(-1.0..1.0);
            let filtered_noise = self.noise_filter.process(noise);

            // Mix tone and breath
            *sample = utils::lerp(tone, filtered_noise, breathiness) * 0.5;

            self.phase += 2.0 * std::f32::consts::PI * frequency / self.sample_rate;
            if self.phase > 2.0 * std::f32::consts::PI {
                self.phase -= 2.0 * std::f32::consts::PI;
            }
        }

        buffer
    }
}

/// Harp synthesizer
#[wasm_bindgen]
pub struct Harp {
    sample_rate: f32,
}

#[wasm_bindgen]
impl Harp {
    /// Create new harp synthesizer
    #[wasm_bindgen(constructor)]
    pub fn new(sample_rate: f32) -> Self {
        Harp { sample_rate }
    }

    /// Generate harp pluck
    /// Bright attack with quick decay
    #[wasm_bindgen]
    pub fn pluck(&self, frequency: f32, duration: f32) -> Vec<f32> {
        let num_samples = (duration * self.sample_rate) as usize;
        let mut buffer = vec![0.0; num_samples];

        let mut phase: f32 = 0.0;

        for (i, sample) in buffer.iter_mut().enumerate() {
            let t = i as f32 / self.sample_rate;

            // Exponential decay envelope
            let envelope = (-t * 4.0).exp();

            // Harmonic series (1, 2, 3) for brightness
            let fundamental = phase.sin();
            let harmonic2 = (phase * 2.0).sin() * 0.5;
            let harmonic3 = (phase * 3.0).sin() * 0.25;

            *sample = (fundamental + harmonic2 + harmonic3) * envelope * 0.5;

            phase += 2.0 * std::f32::consts::PI * frequency / self.sample_rate;
            if phase > 2.0 * std::f32::consts::PI {
                phase -= 2.0 * std::f32::consts::PI;
            }
        }

        buffer
    }
}

/// 432 Hz tuning scale (natural resonance)
pub const SCALE_432: [(f32, f32); 12] = [
    // Note, Frequency
    (0.0, 256.87),   // C4
    (1.0, 272.14),   // C#4
    (2.0, 288.33),   // D4
    (3.0, 305.47),   // D#4
    (4.0, 323.63),   // E4
    (5.0, 342.88),   // F4
    (6.0, 363.27),   // F#4
    (7.0, 384.87),   // G4
    (8.0, 407.75),   // G#4
    (9.0, 432.00),   // A4 (reference)
    (10.0, 457.69),  // A#4
    (11.0, 484.90),  // B4
];

/// Convert MIDI note to frequency in 432 Hz tuning
pub fn midi_to_freq_432(midi_note: u8) -> f32 {
    let a4 = 432.0;
    let semitones_from_a4 = midi_note as f32 - 69.0;
    a4 * 2.0_f32.powf(semitones_from_a4 / 12.0)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_piano_creation() {
        let piano = Piano::new(48000.0);
        assert_eq!(piano.sample_rate, 48000.0);
    }

    #[test]
    fn test_midi_to_freq() {
        let freq = midi_to_freq_432(69); // A4
        assert!((freq - 432.0).abs() < 0.1);
    }

    #[test]
    fn test_harp_pluck() {
        let harp = Harp::new(48000.0);
        let buffer = harp.pluck(440.0, 1.0);
        assert_eq!(buffer.len(), 48000);

        // Check that some samples are non-zero
        let has_sound = buffer.iter().any(|&s| s.abs() > 0.001);
        assert!(has_sound);
    }
}
