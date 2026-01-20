# Bird Sound Sample Integration Plan

## Phase 2: Real Bird Recordings

### Sources for License-Free Bird Sounds

We'll use multiple sources to ensure quality and legal compliance:

#### 1. **Primary Source: Xeno-canto.org**
- [Xeno-canto Bird Sounds Database](https://xeno-canto.org)
- Largest collection of bird recordings worldwide
- Creative Commons licensed (CC BY-NC-SA, CC BY-NC, CC0)
- Search by species name
- High-quality field recordings

**Specific Birds We Need:**
- [American Robin morning song](https://xeno-canto.org/species/Turdus-migratorius)
- [Northern Cardinal calls](https://xeno-canto.org/species/Cardinalis-cardinalis)
- [Black-capped Chickadee](https://xeno-canto.org/species/Poecile-atricapillus)
- [Yellow Warbler](https://xeno-canto.org/species/Setophaga-petechia)

#### 2. **Alternative Sources:**
- [Freesound.org Bird Sounds](https://freesound.org/search/?q=bird%20morning)
- [Bird-sounds.net](https://www.bird-sounds.net/) - Completely free
- [Pixabay Bird Sound Effects](https://pixabay.com/sound-effects/search/birds/) - Royalty-free
- [Internet Archive Bird Sounds](https://archive.org/details/various-bird-sounds) - Public domain
- [Mixkit Free Bird SFX](https://mixkit.co/free-sound-effects/bird/)

### File Format Strategy

According to Web Audio API best practices:

**Recommended Formats (in priority order):**
1. **MP3** - Universal browser support, good compression
2. **OGG Vorbis** - Better compression than MP3, good support
3. **Opus** - Modern, most efficient (future-proof)

**Fallback Strategy:**
```javascript
const audioSources = {
    robin: ['/audio/robin.opus', '/audio/robin.ogg', '/audio/robin.mp3'],
    cardinal: ['/audio/cardinal.opus', '/audio/cardinal.ogg', '/audio/cardinal.mp3']
};
```

### File Size Optimization

**Target:** < 50KB per bird sample

**Optimization Steps:**
1. Trim silence from beginning/end
2. Normalize audio levels
3. Resample to 44.1kHz (or 22.05kHz for smaller size)
4. Mono channel (birds don't need stereo)
5. Bitrate: 64-96 kbps (quality vs size trade-off)

**Tools:**
- FFmpeg for conversion
- Audacity for editing
- Web-based: Audio editing tools

### Implementation Architecture

```javascript
// Audio sample manager
class BirdSamplePlayer {
    constructor(audioContext) {
        this.audioContext = audioContext;
        this.samples = {};
        this.loaded = false;
    }

    // Load bird samples
    async loadSamples() {
        const birds = ['robin', 'cardinal', 'chickadee', 'warbler'];

        for (const bird of birds) {
            const response = await fetch(`/audio/birds/${bird}.mp3`);
            const arrayBuffer = await response.arrayBuffer();
            this.samples[bird] = await this.audioContext.decodeAudioData(arrayBuffer);
        }

        this.loaded = true;
    }

    // Play a bird sample
    play(birdName, delay = 0, volume = 1.0) {
        if (!this.loaded || !this.samples[birdName]) return;

        const source = this.audioContext.createBufferSource();
        const gainNode = this.audioContext.createGain();

        source.buffer = this.samples[birdName];
        source.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        gainNode.gain.value = volume;

        const now = this.audioContext.currentTime;
        source.start(now + delay);

        return source;
    }

    // Play random bird from collection
    playRandom(delay = 0, volume = 1.0) {
        const birds = Object.keys(this.samples);
        const randomBird = birds[Math.floor(Math.random() * birds.length)];
        return this.play(randomBird, delay, volume);
    }
}
```

### Integration with Existing System

**Replace synthesized birds with samples:**

```javascript
// In generateMorningBirds function
function generateMorningBirds(audioContext, intensity) {
    if (!birdSamplePlayer.loaded) {
        // Fallback to synthesized birds
        generateSynthesizedBirds(audioContext, intensity);
        return;
    }

    // Realistic sample-based birds
    const numBirds = Math.floor(1 + intensity * 8);
    const species = ['robin', 'cardinal', 'chickadee', 'warbler'];

    for (let i = 0; i < numBirds; i++) {
        const bird = species[Math.floor(Math.random() * species.length)];
        const delay = Math.random() * 5;
        const volume = 0.2 + (intensity * 0.5); // Volume increases with intensity

        birdSamplePlayer.play(bird, delay, volume);
    }
}
```

### Advantages of Sample-Based Approach

✅ **Realism**: Authentic bird recordings
✅ **Variety**: Each playback sounds slightly different (multiple samples per species)
✅ **Quality**: Professional field recordings
✅ **Performance**: Less CPU-intensive than synthesis
✅ **File Size**: Optimized < 50KB per bird = < 200KB total

### Implementation Steps

1. **Download & Prepare Samples:**
   - Find 2-3 variations per species from Xeno-canto
   - Trim to 2-4 seconds each
   - Normalize and optimize

2. **Create Audio Directory:**
   ```
   /audio/
     /birds/
       robin-1.mp3
       robin-2.mp3
       cardinal-1.mp3
       cardinal-2.mp3
       chickadee-1.mp3
       warbler-1.mp3
   ```

3. **Update Service Worker:**
   - Add audio files to cache

4. **Implement BirdSamplePlayer Class:**
   - Async loading on app init
   - Random playback system
   - Volume control

5. **Update slowwake.js:**
   - Use samples instead of synthesis
   - Keep synthesis as fallback

### Fallback Strategy

If samples fail to load:
1. Show warning to user: "Using synthetic birds (samples failed to load)"
2. Fall back to existing synthesized bird sounds
3. Log error for debugging

---

## Next: Rust/WASM Architecture (Part C)

Once samples are integrated, we can plan the Rust/WASM architecture for professional-quality synthesis...

## Sources
- [Xeno-canto Bird Sounds Database](https://xeno-canto.org)
- [Freesound.org](https://freesound.org)
- [Bird-sounds.net](https://www.bird-sounds.net/)
- [Pixabay Sound Effects](https://pixabay.com/sound-effects/search/birds/)
- [Web Audio API Best Practices - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Best_practices)
- [Audio File Optimization - Cloudinary](https://cloudinary.com/documentation/audio_optimization)
