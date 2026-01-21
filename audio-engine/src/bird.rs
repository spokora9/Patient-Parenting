//! Physical modeling for bird vocalizations
//!
//! Uses source-filter model to simulate realistic bird calls

use wasm_bindgen::prelude::*;
use rand::Rng;
use crate::dsp::{BandPassFilter, LowPassFilter};
use crate::utils;

/// Bird species with unique vocal characteristics
#[derive(Debug, Clone, Copy)]
pub enum BirdSpecies {
    Robin,
    Cardinal,
    Chickadee,
    Warbler,
}

impl BirdSpecies {
    /// Parse species from string
    pub fn from_str(s: &str) -> Result<Self, JsValue> {
        match s.to_lowercase().as_str() {
            "robin" => Ok(BirdSpecies::Robin),
            "cardinal" => Ok(BirdSpecies::Cardinal),
            "chickadee" => Ok(BirdSpecies::Chickadee),
            "warbler" => Ok(BirdSpecies::Warbler),
            _ => Err(JsValue::from_str(&format!("Unknown bird species: {}", s))),
        }
    }

    /// Get formant frequencies for this species
    pub fn formants(&self) -> Vec<(f32, f32)> {
        match self {
            // (frequency Hz, bandwidth Hz)
            BirdSpecies::Robin => vec![
                (1800.0, 200.0),  // F1
                (3200.0, 300.0),  // F2
                (5000.0, 400.0),  // F3
            ],
            BirdSpecies::Cardinal => vec![
                (2200.0, 250.0),
                (3800.0, 350.0),
                (6000.0, 500.0),
            ],
            BirdSpecies::Chickadee => vec![
                (2800.0, 300.0),
                (4200.0, 400.0),
                (6500.0, 600.0),
            ],
            BirdSpecies::Warbler => vec![
                (2400.0, 280.0),
                (3500.0, 380.0),
                (5500.0, 450.0),
            ],
        }
    }

    /// Get fundamental frequency range
    pub fn pitch_range(&self) -> (f32, f32) {
        match self {
            BirdSpecies::Robin => (800.0, 1200.0),
            BirdSpecies::Cardinal => (1000.0, 1400.0),
            BirdSpecies::Chickadee => (1200.0, 1800.0),
            BirdSpecies::Warbler => (1100.0, 1600.0),
        }
    }

    /// Get typical call duration in seconds
    pub fn call_duration(&self) -> (f32, f32) {
        match self {
            BirdSpecies::Robin => (0.3, 0.8),
            BirdSpecies::Cardinal => (0.4, 1.0),
            BirdSpecies::Chickadee => (0.2, 0.5),
            BirdSpecies::Warbler => (0.5, 1.2),
        }
    }
}

/// Bird voice synthesizer using source-filter model
pub struct BirdVoice {
    species: BirdSpecies,
    position_x: f32,
    position_y: f32,
    formant_filters: Vec<BandPassFilter>,
    noise_filter: LowPassFilter,
    sample_rate: f32,
    phase: f32,
    next_call_time: f64,
}

impl BirdVoice {
    /// Create a new bird voice
    pub fn new(species: &str, position_x: f32, position_y: f32, sample_rate: f32) -> Result<Self, JsValue> {
        let species = BirdSpecies::from_str(species)?;
        let formants = species.formants();

        let formant_filters: Vec<BandPassFilter> = formants.iter()
            .map(|(freq, bw)| BandPassFilter::new(*freq, *bw, sample_rate))
            .collect();

        let noise_filter = LowPassFilter::new(8000.0, sample_rate);

        Ok(BirdVoice {
            species,
            position_x,
            position_y,
            formant_filters,
            noise_filter,
            sample_rate,
            phase: 0.0,
            next_call_time: 0.0,
        })
    }

    /// Generate source signal (excitation)
    fn generate_source(&mut self, _t: f32, pitch: f32, harmonicity: f32) -> f32 {
        let mut rng = rand::thread_rng();

        // Fundamental frequency oscillation
        self.phase += 2.0 * std::f32::consts::PI * pitch / self.sample_rate;
        if self.phase > 2.0 * std::f32::consts::PI {
            self.phase -= 2.0 * std::f32::consts::PI;
        }

        // Harmonic oscillator (periodic component)
        let periodic = self.phase.sin();

        // Noise component (breathiness)
        let noise: f32 = rng.gen_range(-1.0..1.0);
        let filtered_noise = self.noise_filter.process(noise);

        // Mix periodic and noise based on harmonicity
        // High harmonicity = pure tone, low = breathy
        utils::lerp(filtered_noise, periodic, harmonicity)
    }

    /// Apply formant filters (vocal tract resonances)
    fn apply_formants(&mut self, input: f32) -> f32 {
        let mut output = input;

        for filter in &mut self.formant_filters {
            output = filter.process(output);
        }

        output * 0.3  // Normalize
    }

    /// Generate a single bird call
    fn generate_call(&mut self, buffer: &mut [f32], start_sample: usize) {
        let mut rng = rand::thread_rng();

        let (min_dur, max_dur) = self.species.call_duration();
        let duration = rng.gen_range(min_dur..max_dur);
        let num_samples = (duration * self.sample_rate) as usize;

        let (min_pitch, max_pitch) = self.species.pitch_range();

        for i in 0..num_samples.min(buffer.len() - start_sample) {
            let t = i as f32 / self.sample_rate;
            let progress = t / duration;

            // Pitch modulation (birds often slide pitch)
            let pitch_mod = (progress * std::f32::consts::PI * 2.0).sin() * 0.1 + 1.0;
            let pitch = rng.gen_range(min_pitch..max_pitch) * pitch_mod;

            // Amplitude envelope
            let envelope = if progress < 0.1 {
                // Attack
                progress / 0.1
            } else if progress > 0.8 {
                // Release
                (1.0 - progress) / 0.2
            } else {
                // Sustain
                1.0
            };

            // Generate source signal
            let harmonicity = 0.7 + rng.gen_range(-0.1..0.1);
            let source = self.generate_source(t, pitch, harmonicity);

            // Apply formant filtering
            let output = self.apply_formants(source);

            // Apply envelope and add to buffer
            let sample_idx = start_sample + i;
            if sample_idx < buffer.len() {
                buffer[sample_idx] += output * envelope * 0.25;
            }
        }
    }

    /// Render bird calls into buffer based on intensity
    pub fn render(&mut self, buffer: &mut [f32], intensity: f32, time: f64) {
        let mut rng = rand::thread_rng();

        let duration = buffer.len() as f64 / self.sample_rate as f64;

        // Determine how many calls based on intensity
        let calls_per_minute = 2.0 + intensity * 10.0;
        let avg_call_interval = 60.0 / calls_per_minute as f64;

        let mut current_time = time;
        let end_time = time + duration;

        // Schedule calls
        while current_time < end_time {
            if current_time >= self.next_call_time {
                let offset = (current_time - time) as f32;
                let start_sample = (offset * self.sample_rate) as usize;

                if start_sample < buffer.len() {
                    self.generate_call(buffer, start_sample);
                }

                // Schedule next call with some randomness
                let interval = avg_call_interval * rng.gen_range(0.5..1.5);
                self.next_call_time = current_time + interval;
            }

            current_time += 0.1;
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_bird_species_parsing() {
        assert!(matches!(BirdSpecies::from_str("robin"), Ok(BirdSpecies::Robin)));
        assert!(matches!(BirdSpecies::from_str("cardinal"), Ok(BirdSpecies::Cardinal)));
        assert!(BirdSpecies::from_str("unknown").is_err());
    }

    #[test]
    fn test_bird_voice_creation() {
        let bird = BirdVoice::new("robin", 0.0, 0.0, 48000.0);
        assert!(bird.is_ok());
    }

    #[test]
    fn test_bird_rendering() {
        let mut bird = BirdVoice::new("robin", 0.0, 0.0, 48000.0).unwrap();
        let mut buffer = vec![0.0; 48000]; // 1 second
        bird.render(&mut buffer, 1.0, 0.0);

        // Check that some samples are non-zero (bird made sounds)
        let has_sound = buffer.iter().any(|&s| s.abs() > 0.001);
        assert!(has_sound);
    }
}
