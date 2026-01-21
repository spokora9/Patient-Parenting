//! Parent Architect Audio Engine
//!
//! Professional audio synthesis engine for natural, pleasant wake experiences.
//! Implements physical modeling for bird sounds and multi-instrument synthesis.

use wasm_bindgen::prelude::*;
use serde::{Deserialize, Serialize};

mod bird;
mod synthesis;
mod dsp;
mod utils;

// Re-export main types
pub use bird::BirdVoice;
pub use synthesis::{Piano, Strings, Flute, Harp};

/// Main audio engine state
#[wasm_bindgen]
pub struct AudioEngine {
    sample_rate: f32,
    /// Birds active in the scene
    birds: Vec<BirdVoice>,
    /// Current time in seconds
    time: f64,
}

#[wasm_bindgen]
impl AudioEngine {
    /// Create a new audio engine
    #[wasm_bindgen(constructor)]
    pub fn new(sample_rate: f32) -> Result<AudioEngine, JsValue> {
        utils::set_panic_hook();

        Ok(AudioEngine {
            sample_rate,
            birds: Vec::new(),
            time: 0.0,
        })
    }

    /// Get sample rate
    #[wasm_bindgen(getter)]
    pub fn sample_rate(&self) -> f32 {
        self.sample_rate
    }

    /// Add a bird voice to the scene
    #[wasm_bindgen]
    pub fn add_bird(&mut self, species: &str, position_x: f32, position_y: f32) -> Result<(), JsValue> {
        let bird = BirdVoice::new(species, position_x, position_y, self.sample_rate)?;
        self.birds.push(bird);
        Ok(())
    }

    /// Generate audio buffer for morning birds
    /// Returns a Float32Array containing audio samples
    #[wasm_bindgen]
    pub fn generate_bird_buffer(&mut self, duration_secs: f32, intensity: f32) -> Result<Vec<f32>, JsValue> {
        let num_samples = (duration_secs * self.sample_rate) as usize;
        let mut buffer = vec![0.0; num_samples];

        // Generate bird calls based on intensity
        for bird in &mut self.birds {
            bird.render(&mut buffer, intensity, self.time);
        }

        self.time += duration_secs as f64;
        Ok(buffer)
    }

    /// Generate a gentle breeze sound
    #[wasm_bindgen]
    pub fn generate_breeze(&self, duration_secs: f32, intensity: f32) -> Result<Vec<f32>, JsValue> {
        let num_samples = (duration_secs * self.sample_rate) as usize;
        let mut buffer = vec![0.0; num_samples];

        dsp::generate_breeze(&mut buffer, intensity, self.sample_rate);

        Ok(buffer)
    }

    /// Reset the engine state
    #[wasm_bindgen]
    pub fn reset(&mut self) {
        self.birds.clear();
        self.time = 0.0;
    }
}

/// Configuration for audio engine
#[derive(Debug, Clone, Serialize, Deserialize)]
#[wasm_bindgen]
pub struct AudioConfig {
    pub sample_rate: f32,
    pub buffer_size: usize,
    pub bird_count: usize,
    pub reverb_enabled: bool,
}

#[wasm_bindgen]
impl AudioConfig {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        AudioConfig {
            sample_rate: 48000.0,
            buffer_size: 2048,
            bird_count: 4,
            reverb_enabled: true,
        }
    }
}

impl Default for AudioConfig {
    fn default() -> Self {
        Self::new()
    }
}

/// Initialize the audio engine module
/// Call this once when the WASM module loads
#[wasm_bindgen(start)]
pub fn init() {
    utils::set_panic_hook();
    utils::log("Parent Architect Audio Engine initialized");
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_audio_engine_creation() {
        let engine = AudioEngine::new(48000.0);
        assert!(engine.is_ok());
        let engine = engine.unwrap();
        assert_eq!(engine.sample_rate(), 48000.0);
    }

    #[test]
    fn test_config_default() {
        let config = AudioConfig::default();
        assert_eq!(config.sample_rate, 48000.0);
        assert_eq!(config.bird_count, 4);
    }
}
