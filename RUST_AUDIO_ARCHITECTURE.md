# Rust/WASM Professional Audio Engine Architecture

## Part C: Future Professional Audio System

### Vision

Build a high-performance audio synthesis engine in Rust, compiled to WebAssembly (WASM), providing:
- **Professional-quality bird synthesis** (physical modeling)
- **Multi-instrument orchestra** (piano, strings, flute, harp)
- **Real-time DSP effects** (reverb, EQ, compression)
- **Low latency** (< 10ms)
- **Small bundle size** (< 500KB compressed)

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    JavaScript Layer                          │
│  - UI Controls                                              │
│  - State Management                                         │
│  - Timer Logic                                              │
└──────────────────────────┬──────────────────────────────────┘
                           │
              ┌────────────▼────────────┐
              │   WASM Bridge (JS)      │
              │ - Audio Context Setup   │
              │ - Buffer Management     │
              └────────────┬────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────┐
│               Rust Audio Engine (WASM)                       │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │           Sound Synthesis Modules                    │   │
│  ├──────────────────────────────────────────────────────┤   │
│  │  • BirdSynthesizer (Physical Modeling)              │   │
│  │  • PianoSynthesizer (Karplus-Strong + Harmonics)    │   │
│  │  • StringSynthesizer (Filtered Sawtooth)            │   │
│  │  • FluteSynthesizer (Breath Noise + Formants)       │   │
│  │  • HarpSynthesizer (Plucked String Model)           │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              DSP Effects Chain                        │   │
│  ├──────────────────────────────────────────────────────┤   │
│  │  • Reverb (Schroeder Algorithm)                      │   │
│  │  • EQ (Biquad Filters)                               │   │
│  │  • Compressor (Dynamics Control)                     │   │
│  │  • Spatial Audio (Stereo Widening)                   │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Audio Mixer & Output                     │   │
│  ├──────────────────────────────────────────────────────┤   │
│  │  • Multi-channel Mixing                              │   │
│  │  • Volume Control                                    │   │
│  │  • Master Limiter                                    │   │
│  └──────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────┘
                           │
              ┌────────────▼────────────┐
              │   Web Audio API          │
              │  (Browser AudioContext)  │
              └──────────────────────────┘
```

---

## Technology Stack

### Core Libraries

**Rust Crates:**
- `wasm-bindgen` - JS/Rust interop
- `web-sys` - Web Audio API bindings
- `rodio` or `cpal` - Audio backend (if needed)
- `dasp` - Digital audio signal processing
- `fundsp` - Real-time audio synthesis
- `hound` - WAV file handling
- `serde` - Serialization for presets

**Build Tools:**
- `wasm-pack` - Build pipeline
- `trunk` - Asset bundling
- `wasm-opt` - Size optimization

---

## Implementation Plan

### Phase 1: Foundation (Week 1-2)

**Goal:** Basic Rust → WASM → Web Audio pipeline

**Deliverables:**
```rust
// lib.rs
use wasm_bindgen::prelude::*;
use web_sys::AudioContext;

#[wasm_bindgen]
pub struct AudioEngine {
    sample_rate: f32,
    time: f64,
}

#[wasm_bindgen]
impl AudioEngine {
    #[wasm_bindgen(constructor)]
    pub fn new(sample_rate: f32) -> Self {
        AudioEngine {
            sample_rate,
            time: 0.0,
        }
    }

    /// Generate audio buffer (returns Float32Array for JS)
    pub fn generate_buffer(&mut self, buffer_size: usize) -> Vec<f32> {
        let mut buffer = vec![0.0; buffer_size];
        // Generate samples...
        buffer
    }
}
```

**JavaScript Integration:**
```javascript
import init, { AudioEngine } from './audio_engine.js';

async function initAudioEngine() {
    await init(); // Load WASM
    const engine = new AudioEngine(audioContext.sampleRate);

    // Create ScriptProcessor or AudioWorklet
    const processor = audioContext.createScriptProcessor(4096, 0, 2);
    processor.onaudioprocess = (e) => {
        const buffer = engine.generate_buffer(4096);
        const outputL = e.outputBuffer.getChannelData(0);
        const outputR = e.outputBuffer.getChannelData(1);

        for (let i = 0; i < buffer.length; i++) {
            outputL[i] = buffer[i];
            outputR[i] = buffer[i];
        }
    };
}
```

### Phase 2: Bird Synthesis (Week 3-4)

**Goal:** Realistic bird synthesis using physical modeling

**Approach: Source-Filter Model**

```rust
// bird_synthesizer.rs
pub struct BirdVoice {
    // Source: Excitation signal
    frequency: f32,
    vibrato_rate: f32,
    vibrato_depth: f32,

    // Filter: Formant filters (vocal tract)
    formants: Vec<BiquadFilter>,

    // Envelope
    envelope: ADSREnvelope,
}

impl BirdVoice {
    pub fn generate_sample(&mut self) -> f32 {
        // 1. Generate excitation (pulse train + noise)
        let pulse = self.generate_pulse();
        let noise = self.generate_breath_noise();
        let excitation = pulse * 0.7 + noise * 0.3;

        // 2. Apply formant filters (vocal tract resonances)
        let mut signal = excitation;
        for formant in &mut self.formants {
            signal = formant.process(signal);
        }

        // 3. Apply envelope
        signal * self.envelope.get_amplitude()
    }

    fn generate_pulse(&self) -> f32 {
        // Pulse train with vibrato
        let freq = self.frequency * (1.0 + self.vibrato());
        // ... generate pulse
    }

    fn generate_breath_noise(&self) -> f32 {
        // Filtered white noise
        (rand::random::<f32>() * 2.0 - 1.0) * 0.1
    }
}
```

**Bird Species Presets:**
```rust
pub enum BirdSpecies {
    Robin,
    Cardinal,
    Chickadee,
    Warbler,
}

impl BirdSpecies {
    pub fn get_parameters(&self) -> BirdParameters {
        match self {
            Robin => BirdParameters {
                base_freq: 2200.0,
                formants: vec![
                    FormantFilter::new(2400.0, 200.0), // F1
                    FormantFilter::new(3200.0, 150.0), // F2
                ],
                vibrato_rate: 6.0,
                vibrato_depth: 0.03,
                pattern: ChirpPattern::UpwardSweep,
            },
            Cardinal => BirdParameters {
                base_freq: 3200.0,
                formants: vec![
                    FormantFilter::new(3500.0, 180.0),
                    FormantFilter::new(4200.0, 120.0),
                ],
                vibrato_rate: 5.5,
                vibrato_depth: 0.02,
                pattern: ChirpPattern::ClearWhistle,
            },
            // ... more species
        }
    }
}
```

### Phase 3: Orchestra Instruments (Week 5-6)

**Piano Synthesis (Karplus-Strong + Additive)**
```rust
pub struct PianoVoice {
    // Karplus-Strong delay line
    delay_line: Vec<f32>,
    delay_index: usize,

    // Harmonics (overtone series)
    harmonics: Vec<(f32, f32)>, // (frequency, amplitude)

    // Envelope (realistic piano decay)
    envelope: PianoEnvelope,
}
```

**String Synthesis (Filtered Sawtooth)**
```rust
pub struct StringVoice {
    oscillator: SawtoothOsc,
    filter: LowPassFilter, // Warmth
    vibrato: LFO,
    envelope: ADSREnvelope,
}
```

**Flute Synthesis (Breathy Sine + Noise)**
```rust
pub struct FluteVoice {
    sine_osc: SineOsc,
    noise_gen: NoiseGenerator,
    breath_filter: BandPassFilter,
    vibrato: LFO,
}
```

**Harp Synthesis (Physical String Model)**
```rust
pub struct HarpVoice {
    string_model: WaveguideString,
    pluck_position: f32,
    damping: f32,
}
```

### Phase 4: DSP Effects (Week 7-8)

**Reverb (Schroeder Algorithm)**
```rust
pub struct Reverb {
    comb_filters: Vec<CombFilter>,
    allpass_filters: Vec<AllPassFilter>,
    wet_dry_mix: f32,
}
```

**EQ (Parametric)**
```rust
pub struct ParametricEQ {
    low_shelf: BiquadFilter,
    mid_peak: BiquadFilter,
    high_shelf: BiquadFilter,
}
```

**Compressor (Dynamics)**
```rust
pub struct Compressor {
    threshold: f32,
    ratio: f32,
    attack_time: f32,
    release_time: f32,
    envelope_follower: f32,
}
```

### Phase 5: Composition System (Week 9-10)

**Sequencer for Wake Melody**
```rust
pub struct MelodySequencer {
    tempo: f32,
    time_signature: (u8, u8),
    notes: Vec<Note>,
    current_time: f64,
}

pub struct Note {
    pitch: f32,       // Hz
    duration: f32,    // Beats
    velocity: f32,    // 0.0 - 1.0
    instrument: InstrumentType,
}

// Pre-composed wake melodies
pub enum WakeMelodyPreset {
    MorningGlory,       // Original uplifting composition
    PastoralDawn,       // Gentle, nature-inspired
    SunriseRhapsody,    // More energetic
    TwinkleTwinkle,     // Classic (existing)
}
```

---

## Performance Optimization

### Bundle Size Targets

- **WASM Module**: ~300KB (uncompressed)
- **Compressed (gzip)**: ~80KB
- **Total with JS glue**: ~100KB

**Optimization Techniques:**
- Use `wasm-opt -O3`
- Dead code elimination
- LTO (Link-Time Optimization)
- Strip debug symbols

### CPU Performance

**Target:** < 5% CPU usage on modern devices

**Strategies:**
- SIMD operations where available
- Efficient buffer management
- Minimal allocations in audio thread
- Pre-compute expensive operations

### Latency

**Target:** < 10ms end-to-end latency

**Approach:**
- Use AudioWorklet (not ScriptProcessor)
- Small buffer sizes (128-256 samples)
- Rust's zero-cost abstractions

---

## Development Roadmap

### Milestone 1: Proof of Concept (2 weeks)
- Basic WASM → Web Audio pipeline
- Single synthesizer (sine wave)
- Build system working

### Milestone 2: Bird Synthesis (4 weeks)
- Physical modeling implementation
- 4 bird species with realistic sounds
- Integration with existing slow wake timer

### Milestone 3: Orchestra (6 weeks)
- Piano, strings, flute, harp instruments
- Multi-instrument melody playback
- 3 pre-composed wake melodies

### Milestone 4: Effects & Polish (8 weeks)
- Reverb, EQ, compression
- Preset system
- User-selectable melodies
- Performance optimization

### Milestone 5: Advanced Features (10 weeks)
- Custom melody composer UI
- More instruments (cello, oboe, etc.)
- Binaural audio (3D positioning)
- Export wake sessions as audio files

---

## Integration with Existing App

### Hybrid Approach

**Phase 1-2:** Keep existing JS audio as fallback
```javascript
async function initializeAudio() {
    try {
        // Try to load WASM engine
        await initRustAudioEngine();
        useEngine = 'rust';
    } catch (e) {
        // Fallback to JS synthesis
        console.warn('WASM not available, using JS audio');
        useEngine = 'javascript';
    }
}
```

**Phase 3+:** WASM becomes primary, JS deprecated

### User Settings

Add option to choose audio engine:
```javascript
slowWake: {
    audioEngine: 'auto', // 'auto' | 'wasm' | 'javascript' | 'samples'
    // ...
}
```

---

## Cost-Benefit Analysis

### Pros ✅

1. **Quality**: Professional-grade synthesis
2. **Performance**: Rust's speed + WASM efficiency
3. **Flexibility**: Easy to add new instruments
4. **Maintainability**: Type-safe, well-structured
5. **File Size**: Smaller than large sample libraries
6. **Future-Proof**: Modern technology stack

### Cons ⚠️

1. **Development Time**: 10-12 weeks vs 1 week for samples
2. **Complexity**: Requires Rust expertise
3. **Browser Support**: WASM not on very old browsers
4. **Build Process**: More complex toolchain

### Recommendation

**Short-term (Now):** Implement Part B (bird samples) for immediate quality boost

**Long-term (Future):** Build Rust/WASM engine for ultimate quality and flexibility

---

## Example: Complete Wake Experience

**With Rust/WASM Engine:**

```
0-40%: Synthesized birds (Robin, Cardinal) with subtle reverb
40-70%: Birds intensify, add gentle breeze ambience
70-85%: Full bird chorus, introduce soft strings
85-100%: Custom "Morning Glory" melody:
         - Piano lead (Karplus-Strong synthesis)
         - String accompaniment (filtered sawtooth)
         - Flute harmonies (breathy synthesis)
         - Harp arpeggios (physical string model)
         - Reverb and spatial effects
         All in 432 Hz tuning for calm
```

---

## Next Steps to Start

1. **Set up Rust project:**
   ```bash
   cargo new audio_engine --lib
   cd audio_engine
   cargo add wasm-bindgen web-sys
   ```

2. **Configure for WASM:**
   ```toml
   [lib]
   crate-type = ["cdylib"]

   [dependencies]
   wasm-bindgen = "0.2"
   web-sys = { version = "0.3", features = ["AudioContext"] }
   ```

3. **Build proof of concept:**
   ```bash
   wasm-pack build --target web
   ```

4. **Integrate with existing app:**
   - Import WASM module
   - Create bridge functions
   - Test with simple synthesis

Would you like me to start building the Rust/WASM proof of concept, or should we focus on getting bird samples working first for immediate improvement?

---

## Sources
- [Web Audio API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- [wasm-bindgen Documentation](https://rustwasm.github.io/wasm-bindgen/)
- [fundsp Audio Synthesis Library](https://github.com/SamiPerttu/fundsp)
- [Web Audio API Best Practices](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Best_practices)
