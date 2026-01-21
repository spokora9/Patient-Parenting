# WASM Audio Engine

This directory contains the compiled WebAssembly audio engine built from the Rust source code in `audio-engine/`.

## Files

- **parent_architect_audio.js** - JavaScript glue code for loading and interfacing with the WASM module
- **parent_architect_audio_bg.wasm** - The compiled WebAssembly binary containing the audio synthesis engine
- **parent_architect_audio.d.ts** - TypeScript type definitions
- **package.json** - NPM package metadata

## Rebuilding

To rebuild the WASM module after making changes to the Rust source:

```bash
cd audio-engine
wasm-pack build --target web
cp pkg/* ../wasm/
```

## Usage

The WASM module is automatically loaded via `js/wasmbridge.js` when the page loads. The bridge provides:

- `initWasmAudio()` - Initialize the WASM audio engine
- `generateWasmBirds(audioContext, intensity)` - Generate bird sounds using physical modeling
- `generateWasmBreeze(audioContext, duration, intensity)` - Generate gentle breeze sounds
- `isWasmAudioAvailable()` - Check if WASM engine is loaded and ready

The slow wake timer (`js/slowwake.js`) will automatically use WASM audio if available, falling back to:
1. Real bird sound samples (if downloaded)
2. JavaScript synthesis (final fallback)

## Size

- **parent_architect_audio_bg.wasm**: ~120KB
- **parent_architect_audio.js**: ~23KB
- **Total**: ~143KB (comparable to a few bird sound samples)

## Performance

The WASM audio engine offers:
- More realistic bird sounds through physical modeling
- Lower CPU usage compared to JavaScript synthesis
- Professional-quality orchestra instruments for melodies
- Native code performance
