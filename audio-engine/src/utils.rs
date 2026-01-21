//! Utility functions for WASM and debugging

use wasm_bindgen::prelude::*;

/// Set up better panic messages in the browser console
pub fn set_panic_hook() {
    #[cfg(feature = "console_error_panic_hook")]
    console_error_panic_hook::set_once();
}

/// Log a message to the browser console
#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    pub fn log(s: &str);
}

/// Linear interpolation
#[inline]
pub fn lerp(a: f32, b: f32, t: f32) -> f32 {
    a + (b - a) * t
}

/// Clamp value between min and max
#[inline]
pub fn clamp(value: f32, min: f32, max: f32) -> f32 {
    if value < min {
        min
    } else if value > max {
        max
    } else {
        value
    }
}

/// Convert decibels to linear gain
#[inline]
pub fn db_to_gain(db: f32) -> f32 {
    10.0_f32.powf(db / 20.0)
}

/// Convert linear gain to decibels
#[inline]
pub fn gain_to_db(gain: f32) -> f32 {
    20.0 * gain.log10()
}

/// Apply simple envelope (attack, sustain, release)
pub fn envelope(t: f32, attack: f32, sustain: f32, release: f32, duration: f32) -> f32 {
    if t < attack {
        // Attack phase
        t / attack
    } else if t < duration - release {
        // Sustain phase
        sustain
    } else if t < duration {
        // Release phase
        let rel_t = (duration - t) / release;
        sustain * rel_t
    } else {
        0.0
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_lerp() {
        assert_eq!(lerp(0.0, 10.0, 0.5), 5.0);
        assert_eq!(lerp(0.0, 10.0, 0.0), 0.0);
        assert_eq!(lerp(0.0, 10.0, 1.0), 10.0);
    }

    #[test]
    fn test_clamp() {
        assert_eq!(clamp(5.0, 0.0, 10.0), 5.0);
        assert_eq!(clamp(-5.0, 0.0, 10.0), 0.0);
        assert_eq!(clamp(15.0, 0.0, 10.0), 10.0);
    }
}
