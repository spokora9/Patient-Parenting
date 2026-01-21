// --- BIRD SAMPLE PLAYER ---
// Loads and plays real bird recordings for authentic morning sounds

class BirdSamplePlayer {
    constructor(audioContext) {
        this.audioContext = audioContext;
        this.samples = {};
        this.loaded = false;
        this.loading = false;
    }

    // Load bird samples from audio files
    async loadSamples() {
        if (this.loading || this.loaded) return;
        this.loading = true;

        try {
            // Bird species to load (with multiple variations)
            const birds = [
                { name: 'robin', variations: 1 },    // XC892933 - loops continuously
                { name: 'gull', variations: 1 },     // XC916971 - 30s trimmed, starts after robin
                { name: 'cardinal', variations: 2 }, // Optional fallback
                { name: 'chickadee', variations: 1 },
                { name: 'warbler', variations: 1 }
            ];

            for (const bird of birds) {
                this.samples[bird.name] = [];

                for (let i = 1; i <= bird.variations; i++) {
                    try {
                        // Try multiple formats (MP3 first, then fallback)
                        let arrayBuffer;
                        try {
                            const response = await fetch(`/audio/birds/${bird.name}-${i}.mp3`);
                            if (!response.ok) throw new Error('MP3 not found');
                            arrayBuffer = await response.arrayBuffer();
                        } catch (e) {
                            // Fallback to OGG
                            const response = await fetch(`/audio/birds/${bird.name}-${i}.ogg`);
                            if (!response.ok) throw new Error('OGG not found');
                            arrayBuffer = await response.arrayBuffer();
                        }

                        const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
                        this.samples[bird.name].push(audioBuffer);
                        console.log(`✓ Loaded ${bird.name}-${i}`);
                    } catch (error) {
                        console.warn(`Failed to load ${bird.name}-${i}:`, error);
                    }
                }
            }

            this.loaded = Object.keys(this.samples).some(key => this.samples[key].length > 0);
            console.log(`Bird samples loaded: ${this.loaded ? 'Success' : 'Failed'}`);
        } catch (error) {
            console.error('Error loading bird samples:', error);
            this.loaded = false;
        } finally {
            this.loading = false;
        }
    }

    // Play a specific bird sample
    play(birdName, delay = 0, volume = 1.0, gainNode = null) {
        if (!this.loaded || !this.samples[birdName] || this.samples[birdName].length === 0) {
            console.warn(`Bird sample not available: ${birdName}`);
            return null;
        }

        // Pick random variation for natural variety
        const variations = this.samples[birdName];
        const buffer = variations[Math.floor(Math.random() * variations.length)];

        const source = this.audioContext.createBufferSource();
        const sourceGain = this.audioContext.createGain();

        source.buffer = buffer;
        source.connect(sourceGain);

        if (gainNode) {
            sourceGain.connect(gainNode);
        } else {
            sourceGain.connect(this.audioContext.destination);
        }

        sourceGain.gain.value = volume;

        const now = this.audioContext.currentTime + delay;
        source.start(now);

        return source;
    }

    // Play a bird sample with looping
    playLooped(birdName, delay = 0, volume = 1.0, gainNode = null) {
        if (!this.loaded || !this.samples[birdName] || this.samples[birdName].length === 0) {
            console.warn(`Bird sample not available for looping: ${birdName}`);
            return null;
        }

        // Pick first variation (or random if multiple)
        const variations = this.samples[birdName];
        const buffer = variations[0]; // Use first variation for consistent looping

        const source = this.audioContext.createBufferSource();
        const sourceGain = this.audioContext.createGain();

        source.buffer = buffer;
        source.loop = true; // Enable looping
        source.connect(sourceGain);

        if (gainNode) {
            sourceGain.connect(gainNode);
        } else {
            sourceGain.connect(this.audioContext.destination);
        }

        sourceGain.gain.value = volume;

        const now = this.audioContext.currentTime + delay;
        source.start(now);

        console.log(`[Birds] Started looping ${birdName} (${buffer.duration.toFixed(1)}s loop)`);

        return source;
    }

    // Play random bird from available species
    playRandom(delay = 0, volume = 1.0, gainNode = null) {
        const availableSpecies = Object.keys(this.samples).filter(
            species => this.samples[species].length > 0
        );

        if (availableSpecies.length === 0) return null;

        const randomSpecies = availableSpecies[Math.floor(Math.random() * availableSpecies.length)];
        return this.play(randomSpecies, delay, volume, gainNode);
    }

    // Get list of loaded species
    getLoadedSpecies() {
        return Object.keys(this.samples).filter(
            species => this.samples[species].length > 0
        );
    }
}

// Global instance (initialized when audio context is created)
let birdSamplePlayer = null;
