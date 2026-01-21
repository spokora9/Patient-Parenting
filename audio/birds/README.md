# Bird Audio Samples

This directory contains real bird sound recordings for the Slow Wake Timer.

## Required Files

The app expects the following bird sound files:

```
/audio/birds/
  ├── robin-1.mp3
  ├── robin-2.mp3
  ├── cardinal-1.mp3
  ├── cardinal-2.mp3
  ├── chickadee-1.mp3
  └── warbler-1.mp3
```

## How to Add Bird Samples

### 1. Download Bird Sounds

**Primary Source: [Xeno-canto.org](https://xeno-canto.org)**

Direct links to species:
- [American Robin](https://xeno-canto.org/species/Turdus-migratorius)
- [Northern Cardinal](https://xeno-canto.org/species/Cardinalis-cardinalis)
- [Black-capped Chickadee](https://xeno-canto.org/species/Poecile-atricapillus)
- [Yellow Warbler](https://xeno-canto.org/species/Setophaga-petechia)

**Look for:**
- Morning songs/calls (not alarm calls)
- High-quality recordings (rating 'A' or 'B')
- Creative Commons licenses (CC BY, CC BY-SA, CC0)
- Clean recordings without background noise

**Alternative Sources:**
- [Freesound.org](https://freesound.org) - Search "robin morning" etc.
- [Bird-sounds.net](https://www.bird-sounds.net/) - Free downloads
- [Pixabay](https://pixabay.com/sound-effects/search/birds/) - Royalty-free

### 2. Optimize Audio Files

**Requirements:**
- Format: MP3 (universal browser support)
- Target size: < 50KB per file
- Duration: 2-4 seconds (trimmed)
- Sample rate: 44.1kHz or 22.05kHz
- Channels: Mono (birds don't need stereo)
- Bitrate: 64-96 kbps

**Using FFmpeg (command line):**

```bash
# Convert to optimized MP3
ffmpeg -i input.wav -ac 1 -ar 22050 -b:a 64k -ss 0 -t 3 robin-1.mp3

# Parameters explained:
# -ac 1      : Mono (1 channel)
# -ar 22050  : 22.05 kHz sample rate
# -b:a 64k   : 64 kbps bitrate
# -ss 0      : Start at 0 seconds
# -t 3       : Duration 3 seconds
```

**Using Audacity (free GUI tool):**

1. Open bird sound file
2. Select best 2-4 second segment
3. Trim to selection (Ctrl+T)
4. Normalize audio (Effect → Normalize)
5. Export as MP3:
   - Channels: Mono
   - Bit Rate: 64 kbps
   - Sample Rate: 22050 Hz

### 3. Naming Convention

Files must be named exactly as shown:
- `{species}-{variation}.mp3`

Examples:
- `robin-1.mp3` (first robin variation)
- `robin-2.mp3` (second robin variation)
- `cardinal-1.mp3`

### 4. Place Files

Copy optimized MP3 files to this directory:
```
/audio/birds/
```

### 5. Test

1. Hard refresh browser (Ctrl+Shift+R)
2. Navigate to Tools → Slow Wake Timer
3. Start timer
4. Check browser console for:
   - `✓ Loaded robin-1`
   - `✓ Loaded cardinal-1`
   - etc.
5. Listen for authentic bird sounds!

## Fallback Behavior

If samples fail to load:
- App automatically falls back to synthesized bird sounds
- No error shown to user
- Check browser console for warnings

## File Size Budget

Current total: ~200KB for all 6 bird samples

Per-species target:
- Robin (2 variations): ~60KB total
- Cardinal (2 variations): ~60KB total
- Chickadee (1 variation): ~40KB
- Warbler (1 variation): ~40KB

## License Compliance

When using bird sounds, ensure:
- ✅ Creative Commons or Public Domain license
- ✅ Commercial use allowed (if applicable)
- ✅ Attribution provided if required

**Attribution Template** (for CC BY licenses):

```
Bird sounds courtesy of:
- American Robin by [Recordist Name] (CC BY) via Xeno-canto.org
- Northern Cardinal by [Recordist Name] (CC BY) via Xeno-canto.org
```

Add attribution to app credits or README if required by license.

## Troubleshooting

**Samples not loading?**
- Check file names match exactly (case-sensitive!)
- Check files are in `/audio/birds/` directory
- Check file format is MP3
- Check browser console for errors
- Try hard refresh (Ctrl+Shift+R)

**Sounds too quiet/loud?**
- Volume is auto-adjusted in code
- Can modify in `js/birdsamples.js` if needed

**Different bird species?**
- Edit `js/birdsamples.js` to add new species
- Add files and update service worker cache

## Next Steps

Once bird samples are working, consider:
- Adding more variations per species (3-4 each)
- Adding more species (sparrow, blue jay, etc.)
- Creating morning-specific vs evening soundscapes
- Recording custom nature ambience

---

**See BIRD_SAMPLES_PLAN.md for complete technical documentation**
