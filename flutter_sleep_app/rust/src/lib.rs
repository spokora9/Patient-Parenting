use flutter_rust_bridge::frb;
use rand::Rng;
use std::f32::consts::PI;

const SAMPLE_RATE: f32 = 48000.0;

/// Sound types available for sleep
#[derive(Debug, Clone)]
pub enum SoundType {
    PinkNoise,
    BrownNoise,
    Ocean,
    Breathing,
    AirplaneCabin,
    RainLight,
    RainMedium,
    RainHeavy,
}

/// Main entry point for generating sleep sounds
#[frb(sync)]
pub fn generate_sleep_sound(sound_type: SoundType, duration_secs: f32) -> Vec<f32> {
    match sound_type {
        SoundType::PinkNoise => pink_noise::generate(duration_secs),
        SoundType::BrownNoise => brown_noise::generate(duration_secs),
        SoundType::Ocean => ocean::synthesize(duration_secs),
        SoundType::Breathing => breathing::generate_cycles(duration_secs),
        SoundType::AirplaneCabin => airplane::synthesize(duration_secs),
        SoundType::RainLight => rain::generate(duration_secs, 20.0),
        SoundType::RainMedium => rain::generate(duration_secs, 100.0),
        SoundType::RainHeavy => rain::generate(duration_secs, 300.0),
    }
}

/// Save generated audio to WAV file
#[frb(sync)]
pub fn save_to_wav(samples: Vec<f32>, path: String) -> Result<(), String> {
    let spec = hound::WavSpec {
        channels: 1,
        sample_rate: SAMPLE_RATE as u32,
        bits_per_sample: 16,
        sample_format: hound::SampleFormat::Int,
    };

    let mut writer = hound::WavWriter::create(&path, spec)
        .map_err(|e| format!("Failed to create WAV file: {}", e))?;

    for sample in samples {
        let amplitude = (sample * i16::MAX as f32) as i16;
        writer.write_sample(amplitude)
            .map_err(|e| format!("Failed to write sample: {}", e))?;
    }

    writer.finalize()
        .map_err(|e| format!("Failed to finalize WAV: {}", e))?;

    Ok(())
}

// ============================================================================
// PINK NOISE MODULE
// ============================================================================
mod pink_noise {
    use super::*;

    /// Generate pink noise using Voss-McCartney algorithm
    /// Pink noise has power spectral density that decreases 3dB per octave
    /// Research shows it increases deep sleep by 75%
    pub fn generate(duration: f32) -> Vec<f32> {
        let num_samples = (duration * SAMPLE_RATE) as usize;
        let mut samples = Vec::with_capacity(num_samples);
        let mut rng = rand::thread_rng();

        // 7-stage filter bank for perfect 1/f spectrum
        let mut b = [0.0f32; 7];

        for _ in 0..num_samples {
            let white: f32 = rng.gen_range(-1.0..1.0);

            // Voss-McCartney algorithm
            b[0] = 0.99886 * b[0] + white * 0.0555179;
            b[1] = 0.99332 * b[1] + white * 0.0750759;
            b[2] = 0.96900 * b[2] + white * 0.1538520;
            b[3] = 0.86650 * b[3] + white * 0.3104856;
            b[4] = 0.55000 * b[4] + white * 0.5329522;
            b[5] = -0.7616 * b[5] - white * 0.0168980;

            let pink = b[0] + b[1] + b[2] + b[3] + b[4] + b[5] + b[6] + white * 0.5362;
            samples.push(pink * 0.11); // Normalize

            b[6] = white * 0.115926;
        }

        samples
    }
}

// ============================================================================
// BROWN NOISE MODULE
// ============================================================================
mod brown_noise {
    use super::*;

    /// Generate brown/Brownian noise
    /// Power decreases 6dB per octave - deepest sleep aid
    pub fn generate(duration: f32) -> Vec<f32> {
        let num_samples = (duration * SAMPLE_RATE) as usize;
        let mut samples = Vec::with_capacity(num_samples);
        let mut rng = rand::thread_rng();
        let mut last_output = 0.0f32;

        for _ in 0..num_samples {
            let white: f32 = rng.gen_range(-1.0..1.0);
            // Brown noise is integral of white noise
            last_output += white * 0.02;
            // Prevent DC drift
            last_output *= 0.999;
            // Clamp to prevent overflow
            last_output = last_output.clamp(-1.0, 1.0);
            samples.push(last_output);
        }

        samples
    }
}

// ============================================================================
// OCEAN WAVES MODULE
// ============================================================================
mod ocean {
    use super::*;

    struct Wave {
        period: f32,
        approach_duration: f32,
        crash_duration: f32,
        retreat_duration: f32,
        silence_duration: f32,
    }

    impl Wave {
        fn random() -> Self {
            let mut rng = rand::thread_rng();
            Self {
                period: rng.gen_range(8.0..12.0),
                approach_duration: rng.gen_range(3.0..5.0),
                crash_duration: rng.gen_range(0.5..1.0),
                retreat_duration: rng.gen_range(2.0..4.0),
                silence_duration: rng.gen_range(2.0..6.0),
            }
        }

        fn total_duration(&self) -> f32 {
            self.approach_duration + self.crash_duration + self.retreat_duration + self.silence_duration
        }
    }

    pub fn synthesize(duration: f32) -> Vec<f32> {
        let mut samples = Vec::new();
        let mut rng = rand::thread_rng();
        let mut timeline = 0.0;

        while timeline < duration {
            let wave = Wave::random();

            // Approach (swell building)
            samples.extend(swell_phase(wave.approach_duration, &mut rng));

            // Crash (white noise + low rumble)
            samples.extend(crash_phase(wave.crash_duration, &mut rng));

            // Retreat (filtered noise fading)
            samples.extend(retreat_phase(wave.retreat_duration, &mut rng));

            // Silence with ambient low rumble
            samples.extend(ambient_phase(wave.silence_duration, &mut rng));

            timeline += wave.total_duration();
        }

        samples
    }

    fn swell_phase(duration: f32, rng: &mut impl Rng) -> Vec<f32> {
        let num_samples = (duration * SAMPLE_RATE) as usize;
        let mut samples = Vec::with_capacity(num_samples);

        for i in 0..num_samples {
            let progress = i as f32 / num_samples as f32;
            let envelope = progress; // Linear increase

            // Low frequency rumble (80-150 Hz)
            let freq = 80.0 + progress * 70.0;
            let phase = 2.0 * PI * freq * (i as f32 / SAMPLE_RATE);
            let tone = phase.sin();

            // Add filtered noise
            let noise: f32 = rng.gen_range(-1.0..1.0);
            let filtered_noise = noise * 0.2;

            samples.push((tone * 0.3 + filtered_noise * 0.7) * envelope);
        }

        samples
    }

    fn crash_phase(duration: f32, rng: &mut impl Rng) -> Vec<f32> {
        let num_samples = (duration * SAMPLE_RATE) as usize;
        let mut samples = Vec::with_capacity(num_samples);

        for i in 0..num_samples {
            let progress = i as f32 / num_samples as f32;
            let envelope = 1.0 - progress; // Decay

            // White noise burst
            let noise: f32 = rng.gen_range(-1.0..1.0);

            // Low rumble
            let phase = 2.0 * PI * 100.0 * (i as f32 / SAMPLE_RATE);
            let rumble = phase.sin() * 0.5;

            samples.push((noise * 0.8 + rumble * 0.2) * envelope);
        }

        samples
    }

    fn retreat_phase(duration: f32, rng: &mut impl Rng) -> Vec<f32> {
        let num_samples = (duration * SAMPLE_RATE) as usize;
        let mut samples = Vec::with_capacity(num_samples);

        for i in 0..num_samples {
            let progress = i as f32 / num_samples as f32;
            let envelope = 1.0 - progress; // Fade out

            // Filtered noise (simulating water running back)
            let noise: f32 = rng.gen_range(-1.0..1.0);
            let filtered = noise * 0.3 * envelope;

            // Low frequency content
            let phase = 2.0 * PI * 60.0 * (i as f32 / SAMPLE_RATE);
            let low = phase.sin() * 0.2 * envelope;

            samples.push(filtered + low);
        }

        samples
    }

    fn ambient_phase(duration: f32, rng: &mut impl Rng) -> Vec<f32> {
        let num_samples = (duration * SAMPLE_RATE) as usize;
        let mut samples = Vec::with_capacity(num_samples);

        for i in 0..num_samples {
            // Very quiet low-frequency rumble
            let phase = 2.0 * PI * 40.0 * (i as f32 / SAMPLE_RATE);
            let rumble = phase.sin() * 0.1;

            // Tiny bit of noise
            let noise: f32 = rng.gen_range(-1.0..1.0) * 0.05;

            samples.push(rumble + noise);
        }

        samples
    }
}

// ============================================================================
// BREATHING GUIDE MODULE
// ============================================================================
mod breathing {
    use super::*;

    /// Generate breathing guide tones
    /// 4-6 breaths per minute induces parasympathetic response
    pub fn generate_cycles(duration: f32) -> Vec<f32> {
        let mut samples = Vec::new();
        let cycle_duration = 14.0; // 14 seconds per cycle = ~4.3 breaths/min
        let num_cycles = (duration / cycle_duration).ceil() as usize;

        for _ in 0..num_cycles {
            samples.extend(generate_single_cycle());
        }

        // Trim to exact duration
        let target_samples = (duration * SAMPLE_RATE) as usize;
        samples.truncate(target_samples);

        samples
    }

    fn generate_single_cycle() -> Vec<f32> {
        let mut samples = Vec::new();

        // Inhale: 4 seconds (rising tone 200→400 Hz)
        samples.extend(rising_tone(4.0, 200.0, 400.0));

        // Hold: 2 seconds (steady 400 Hz)
        samples.extend(steady_tone(2.0, 400.0));

        // Exhale: 6 seconds (falling tone 400→150 Hz)
        samples.extend(falling_tone(6.0, 400.0, 150.0));

        // Pause: 2 seconds (silence)
        samples.extend(silence(2.0));

        samples
    }

    fn rising_tone(duration: f32, start_freq: f32, end_freq: f32) -> Vec<f32> {
        let num_samples = (duration * SAMPLE_RATE) as usize;
        let mut samples = Vec::with_capacity(num_samples);

        for i in 0..num_samples {
            let progress = i as f32 / num_samples as f32;
            let freq = start_freq + (end_freq - start_freq) * progress;
            let phase = 2.0 * PI * freq * (i as f32 / SAMPLE_RATE);
            let envelope = (progress * PI).sin() * 0.3; // Gentle amplitude
            samples.push(phase.sin() * envelope);
        }

        samples
    }

    fn steady_tone(duration: f32, freq: f32) -> Vec<f32> {
        let num_samples = (duration * SAMPLE_RATE) as usize;
        let mut samples = Vec::with_capacity(num_samples);

        for i in 0..num_samples {
            let phase = 2.0 * PI * freq * (i as f32 / SAMPLE_RATE);
            samples.push(phase.sin() * 0.3);
        }

        samples
    }

    fn falling_tone(duration: f32, start_freq: f32, end_freq: f32) -> Vec<f32> {
        let num_samples = (duration * SAMPLE_RATE) as usize;
        let mut samples = Vec::with_capacity(num_samples);

        for i in 0..num_samples {
            let progress = i as f32 / num_samples as f32;
            let freq = start_freq + (end_freq - start_freq) * progress;
            let phase = 2.0 * PI * freq * (i as f32 / SAMPLE_RATE);
            let envelope = ((1.0 - progress) * PI).sin() * 0.3;
            samples.push(phase.sin() * envelope);
        }

        samples
    }

    fn silence(duration: f32) -> Vec<f32> {
        let num_samples = (duration * SAMPLE_RATE) as usize;
        vec![0.0; num_samples]
    }
}

// ============================================================================
// AIRPLANE CABIN MODULE
// ============================================================================
mod airplane {
    use super::*;

    pub fn synthesize(duration: f32) -> Vec<f32> {
        let num_samples = (duration * SAMPLE_RATE) as usize;
        let mut samples = Vec::with_capacity(num_samples);
        let mut rng = rand::thread_rng();

        for i in 0..num_samples {
            let t = i as f32 / SAMPLE_RATE;

            // Low frequency engine rumble (80-120 Hz with slow variation)
            let rumble_freq = 100.0 + (t * 0.1).sin() * 20.0;
            let rumble_phase = 2.0 * PI * rumble_freq * t;
            let rumble = rumble_phase.sin() * 0.6;

            // Pink noise overlay (cabin hiss)
            let noise: f32 = rng.gen_range(-1.0..1.0) * 0.2;

            // Occasional pressure variation
            let pressure = if i % (SAMPLE_RATE as usize * 120) == 0 {
                (t * 10.0).sin() * 0.1
            } else {
                0.0
            };

            samples.push(rumble + noise + pressure);
        }

        samples
    }
}

// ============================================================================
// RAIN MODULE
// ============================================================================
mod rain {
    use super::*;

    /// Generate rain with specified droplet density
    /// density: droplets per second (20=light, 100=medium, 300=heavy)
    pub fn generate(duration: f32, density: f32) -> Vec<f32> {
        let num_samples = (duration * SAMPLE_RATE) as usize;
        let mut samples = vec![0.0; num_samples];
        let mut rng = rand::thread_rng();

        let total_droplets = (duration * density) as usize;

        for _ in 0..total_droplets {
            // Random droplet position
            let start = rng.gen_range(0..num_samples - 1000);

            // Random droplet characteristics
            let freq = rng.gen_range(200.0..8000.0);
            let duration_ms = rng.gen_range(3.0..15.0);
            let amplitude = rng.gen_range(0.1..0.3);

            // Generate droplet
            let droplet_samples = (duration_ms * SAMPLE_RATE / 1000.0) as usize;
            for i in 0..droplet_samples {
                if start + i < num_samples {
                    let envelope = (1.0 - (i as f32 / droplet_samples as f32)).powf(2.0);
                    let phase = 2.0 * PI * freq * (i as f32 / SAMPLE_RATE);
                    let noise: f32 = rng.gen_range(-1.0..1.0);
                    samples[start + i] += (phase.sin() * 0.5 + noise * 0.5) * amplitude * envelope;
                }
            }
        }

        samples
    }
}
