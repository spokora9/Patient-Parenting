//! Digital Signal Processing utilities
//!
//! Filters, effects, and audio processing functions

use rand::Rng;

/// Simple one-pole low-pass filter
pub struct LowPassFilter {
    alpha: f32,
    prev: f32,
}

impl LowPassFilter {
    /// Create new low-pass filter
    /// cutoff_hz: cutoff frequency in Hz
    /// sample_rate: audio sample rate
    pub fn new(cutoff_hz: f32, sample_rate: f32) -> Self {
        let rc = 1.0 / (2.0 * std::f32::consts::PI * cutoff_hz);
        let dt = 1.0 / sample_rate;
        let alpha = dt / (rc + dt);

        LowPassFilter {
            alpha,
            prev: 0.0,
        }
    }

    /// Process a single sample
    #[inline]
    pub fn process(&mut self, input: f32) -> f32 {
        self.prev = self.prev + self.alpha * (input - self.prev);
        self.prev
    }

    /// Reset filter state
    pub fn reset(&mut self) {
        self.prev = 0.0;
    }
}

/// Simple one-pole high-pass filter
pub struct HighPassFilter {
    alpha: f32,
    prev_input: f32,
    prev_output: f32,
}

impl HighPassFilter {
    /// Create new high-pass filter
    pub fn new(cutoff_hz: f32, sample_rate: f32) -> Self {
        let rc = 1.0 / (2.0 * std::f32::consts::PI * cutoff_hz);
        let dt = 1.0 / sample_rate;
        let alpha = rc / (rc + dt);

        HighPassFilter {
            alpha,
            prev_input: 0.0,
            prev_output: 0.0,
        }
    }

    /// Process a single sample
    #[inline]
    pub fn process(&mut self, input: f32) -> f32 {
        let output = self.alpha * (self.prev_output + input - self.prev_input);
        self.prev_input = input;
        self.prev_output = output;
        output
    }

    /// Reset filter state
    pub fn reset(&mut self) {
        self.prev_input = 0.0;
        self.prev_output = 0.0;
    }
}

/// Band-pass filter (formant filter for bird voices)
pub struct BandPassFilter {
    frequency: f32,
    bandwidth: f32,
    r: f32,
    cos_theta: f32,
    a0: f32,
    a1: f32,
    a2: f32,
    x1: f32,
    x2: f32,
    y1: f32,
    y2: f32,
}

impl BandPassFilter {
    /// Create new band-pass filter (formant)
    pub fn new(frequency: f32, bandwidth: f32, sample_rate: f32) -> Self {
        let r = (-std::f32::consts::PI * bandwidth / sample_rate).exp();
        let theta = 2.0 * std::f32::consts::PI * frequency / sample_rate;
        let cos_theta = theta.cos();

        let a0 = 1.0 - r;
        let a1 = 0.0;
        let a2 = 0.0;

        BandPassFilter {
            frequency,
            bandwidth,
            r,
            cos_theta,
            a0,
            a1,
            a2,
            x1: 0.0,
            x2: 0.0,
            y1: 0.0,
            y2: 0.0,
        }
    }

    /// Process a single sample
    #[inline]
    pub fn process(&mut self, input: f32) -> f32 {
        let output = self.a0 * input + 2.0 * self.r * self.cos_theta * self.y1 - self.r * self.r * self.y2;

        self.x2 = self.x1;
        self.x1 = input;
        self.y2 = self.y1;
        self.y1 = output;

        output
    }

    /// Reset filter state
    pub fn reset(&mut self) {
        self.x1 = 0.0;
        self.x2 = 0.0;
        self.y1 = 0.0;
        self.y2 = 0.0;
    }
}

/// Generate gentle breeze sound (filtered noise)
pub fn generate_breeze(buffer: &mut [f32], intensity: f32, sample_rate: f32) {
    let mut rng = rand::thread_rng();
    let mut filter = LowPassFilter::new(300.0, sample_rate);

    let dt = 1.0 / sample_rate;
    for (i, sample) in buffer.iter_mut().enumerate() {
        let t = i as f32 * dt;

        // Slow modulation wave
        let envelope = (t * 0.3).sin() * 0.5 + 0.5;

        // White noise
        let noise: f32 = rng.gen_range(-1.0..1.0);

        // Filter and apply envelope
        let filtered = filter.process(noise);
        *sample = filtered * 0.03 * intensity * envelope;
    }
}

/// Simple reverb effect (Schroeder reverberator)
pub struct SimpleReverb {
    comb_buffers: Vec<Vec<f32>>,
    comb_indices: Vec<usize>,
    allpass_buffers: Vec<Vec<f32>>,
    allpass_indices: Vec<usize>,
}

impl SimpleReverb {
    /// Create new reverb effect
    pub fn new(sample_rate: f32) -> Self {
        // Comb filter delays (in samples)
        let comb_delays = [
            (0.0297 * sample_rate) as usize,
            (0.0371 * sample_rate) as usize,
            (0.0411 * sample_rate) as usize,
            (0.0437 * sample_rate) as usize,
        ];

        // Allpass filter delays
        let allpass_delays = [
            (0.005 * sample_rate) as usize,
            (0.0017 * sample_rate) as usize,
        ];

        let comb_buffers = comb_delays.iter()
            .map(|&size| vec![0.0; size])
            .collect();

        let allpass_buffers = allpass_delays.iter()
            .map(|&size| vec![0.0; size])
            .collect();

        SimpleReverb {
            comb_buffers,
            comb_indices: vec![0; comb_delays.len()],
            allpass_buffers,
            allpass_indices: vec![0; allpass_delays.len()],
        }
    }

    /// Process a single sample through reverb
    pub fn process(&mut self, input: f32, mix: f32) -> f32 {
        let feedback = 0.84;
        let allpass_gain = 0.7;

        // Parallel comb filters
        let mut comb_sum = 0.0;
        for i in 0..self.comb_buffers.len() {
            let buffer = &mut self.comb_buffers[i];
            let idx = self.comb_indices[i];

            let delayed = buffer[idx];
            buffer[idx] = input + delayed * feedback;

            self.comb_indices[i] = (idx + 1) % buffer.len();
            comb_sum += delayed;
        }

        let comb_out = comb_sum / self.comb_buffers.len() as f32;

        // Series allpass filters
        let mut allpass_out = comb_out;
        for i in 0..self.allpass_buffers.len() {
            let buffer = &mut self.allpass_buffers[i];
            let idx = self.allpass_indices[i];

            let delayed = buffer[idx];
            let temp = allpass_out + delayed * allpass_gain;
            buffer[idx] = allpass_out;
            allpass_out = delayed - temp * allpass_gain;

            self.allpass_indices[i] = (idx + 1) % buffer.len();
        }

        // Mix dry and wet
        input * (1.0 - mix) + allpass_out * mix
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_lowpass_filter() {
        let mut filter = LowPassFilter::new(1000.0, 48000.0);
        let output = filter.process(1.0);
        assert!(output > 0.0 && output < 1.0);
    }

    #[test]
    fn test_breeze_generation() {
        let mut buffer = vec![0.0; 1000];
        generate_breeze(&mut buffer, 1.0, 48000.0);

        // Check that some samples are non-zero
        let has_sound = buffer.iter().any(|&s| s.abs() > 0.0);
        assert!(has_sound);
    }
}
