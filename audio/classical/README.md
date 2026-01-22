# Classical Music Recordings

This directory contains real classical music recordings for the wake timer orchestra feature.

## Current Status

**No recordings downloaded yet** - The system will gracefully fall back to synthesis.

## Getting Started

Follow the instructions in `/CLASSICAL_MUSIC_GUIDE.md` to:

1. Download recommended recordings from Musopen or other sources
2. Process them with FFmpeg for mobile optimization
3. Place the processed MP3 files in this directory

## Expected Files

Once processed, this directory should contain:

- `mozart-peaceful-1.mp3` - Mozart Piano Concerto 23, 2nd mvt (120s, ~1.8 MB)
- `debussy-clair-1.mp3` - Debussy Clair de Lune (120s, ~1.8 MB)
- `mozart-dreamy-1.mp3` - Mozart Piano Concerto 21, 2nd mvt (120s, ~1.8 MB)
- `satie-gentle-1.mp3` - Satie Gymnopédie No. 1 (120s, ~1.8 MB)

## How It Works

The orchestra system (`js/orchestra.js`) automatically:

1. **Tries to load** recordings from this directory on app startup
2. **Falls back to synthesis** if recordings aren't available
3. **Logs status** so you can verify what's playing

Check the browser console for messages like:
```
[Orchestra] Loading 4 classical recordings...
[Orchestra] ✓ Loaded: Mozart Piano Concerto 23 - Adagio (120.0s)
```

## Integration

Recordings are mapped in `js/orchestra.js`:

```javascript
const COMPOSITIONS = {
    "mozartAdagio": {
        name: "Mozart Piano Concerto 23 - Adagio",
        composer: "W.A. Mozart",
        recording: {
            file: "/audio/classical/mozart-peaceful-1.mp3",
            duration: 120,
            fadeIn: 5,
            fadeOut: 8,
            volume: 0.4
        }
    },
    // ... more compositions
};
```

## Testing

1. Place MP3 files in this directory
2. Copy to `www/audio/classical/` for native apps
3. Reload the app
4. Check console for "[Orchestra] ✓ Loaded" messages
5. Start a wake timer and verify classical music plays

## File Specifications

- **Format:** MP3
- **Channels:** Stereo (2)
- **Sample Rate:** 44100 Hz
- **Bitrate:** 128 kbps
- **Duration:** 120 seconds (2 minutes)
- **Expected Size:** ~1.8 MB each

## Copyright

All recordings must be:
- Public domain, OR
- Licensed under Creative Commons (CC-BY, CC-BY-SA, CC0), OR
- Explicitly royalty-free for personal use

See `CLASSICAL_MUSIC_GUIDE.md` for trusted sources.
