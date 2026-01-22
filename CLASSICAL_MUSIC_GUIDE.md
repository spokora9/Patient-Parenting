# Classical Music Recordings Guide

## 🎼 Recommended Sources for Free/CC Classical Music

### **1. Musopen** ⭐ (Best Option)
- **Website:** [musopen.org](https://musopen.org/)
- **License:** Public domain recordings
- **Format:** MP3, FLAC (HD for members)
- **Quality:** Professional orchestra recordings
- **Cost:** Free (standard quality), $55/year for HD

### **2. Classicals.de**
- **Website:** [classicals.de](https://www.classicals.de/)
- **License:** Creative Commons
- **Format:** MP3
- **Quality:** High-quality royalty-free
- **Cost:** Free (donation-based)

### **3. Chosic**
- **Website:** [chosic.com/free-music/mozart](https://www.chosic.com/free-music/mozart/)
- **License:** Royalty-free for YouTube/commercial
- **Format:** MP3
- **Quality:** Various
- **Cost:** Free

### **4. Internet Archive**
- **Website:** [archive.org](https://archive.org/)
- **Collection:** "78rpm and Cylinder Recordings"
- **License:** Public domain
- **Format:** MP3, FLAC
- **Quality:** Historical recordings (excellent sound)

---

## 🌅 Best Pieces for Gentle Morning Wake-Up

### **Mozart - Perfect for Gradual Awakening**

#### **1. Piano Concerto No. 23 in A major, K. 488** ⭐⭐⭐
- **Why:** Gentle grace, lyrical beauty
- **Best Movement:** 2nd movement "Adagio" - tranquil and introspective
- **Download:** [Musopen - K. 488](https://musopen.org/music/2641-piano-concerto-no-23-in-a-major-k-488/)
- **Use:** Start of melody phase (peaceful, uplifting)

#### **2. Piano Concerto No. 21 in C major, K. 467**
- **Why:** Famous "Elvira Madigan" theme - dreamy
- **Best Movement:** 2nd movement "Andante" - floating, serene
- **Download:** [Musopen - K. 467](https://musopen.org/music/2635-piano-concerto-no-21-in-c-major-k-467/)
- **Use:** Mid-wake phase (gentle awakening)

#### **3. Piano Concerto No. 12 in A major, K. 414**
- **Why:** Delicate piano passages, tender theme
- **Best Movement:** 2nd movement - deep emotions, serenity
- **Download:** [Musopen - K. 414](https://musopen.org/music/2626-piano-concerto-no-12-in-a-major-k-414385p/)
- **Use:** Early wake phase (soft introduction)

### **Debussy - Impressionist Calm**

#### **4. Clair de Lune** ⭐⭐⭐
- **Why:** Soft, delicate, moonlit atmosphere
- **Mood:** Ethereal, perfect for relaxation
- **Download:** [Musopen - Suite Bergamasque](https://musopen.org/music/2504-suite-bergamasque/)
- **Alternative:** [Internet Archive](https://archive.org/details/ClairDeLunedebussy)
- **Use:** Deep relaxation, transition phase

### **Satie - Minimalist Peace**

#### **5. Gymnopédie No. 1**
- **Why:** Minimalist, calm, gentle tempo
- **Mood:** Melancholic but soothing
- **Download:** Musopen / Internet Archive
- **Use:** Very gentle wake start

---

## 📥 Download Instructions

### **Method 1: Musopen (Recommended)**

1. **Visit Musopen:** [musopen.org/music](https://musopen.org/music/)
2. **Search for piece:** e.g., "Mozart Piano Concerto 23"
3. **Select recording:** Choose performance you like
4. **Download:** Click "Download" → Select MP3 format
5. **Save to:** `audio/classical/`

### **Method 2: Internet Archive**

1. **Search:** [archive.org/details/ClairDeLunedebussy](https://archive.org/details/ClairDeLunedebussy)
2. **Download options:** Choose MP3 or FLAC
3. **Save to:** `audio/classical/`

### **Method 3: Classicals.de**

1. **Browse:** [classicals.de](https://www.classicals.de/)
2. **Filter:** By composer (Mozart, Debussy, etc.)
3. **Download:** Free download links on each track page
4. **Save to:** `audio/classical/`

---

## 🎵 Recommended Pieces to Download

| Priority | Piece | Composer | Duration | Mood | Use |
|----------|-------|----------|----------|------|-----|
| ⭐⭐⭐ | Piano Concerto 23, 2nd mvt | Mozart | ~7 min | Peaceful, uplifting | Main wake melody |
| ⭐⭐⭐ | Clair de Lune | Debussy | ~5 min | Dreamy, ethereal | Gentle transition |
| ⭐⭐ | Piano Concerto 21, 2nd mvt | Mozart | ~7 min | Serene, floating | Alternative wake |
| ⭐⭐ | Gymnopédie No. 1 | Satie | ~3 min | Calm, minimalist | Very gentle start |
| ⭐ | Piano Concerto 12, 2nd mvt | Mozart | ~6 min | Tender, delicate | Soft awakening |

---

## 🔧 Processing for Mobile

After downloading, optimize for mobile playback:

```bash
cd audio/classical

# Trim to desired length (e.g., 2 minutes for wake cycle)
ffmpeg -i "mozart-k488-adagio.mp3" \
       -ss 0 -t 120 \
       -ac 2 \
       -ar 44100 \
       -b:a 128k \
       -y mozart-peaceful-1.mp3

# For Clair de Lune (stereo, higher quality for piano)
ffmpeg -i "debussy-clair-de-lune.mp3" \
       -ss 0 -t 120 \
       -ac 2 \
       -ar 44100 \
       -b:a 128k \
       -y debussy-peaceful-1.mp3

# Copy to www/
cp *.mp3 ../../www/audio/classical/
```

**Settings explained:**
- `-ss 0 -t 120` = Take first 2 minutes
- `-ac 2` = Stereo (for piano richness)
- `-ar 44100` = CD-quality sample rate
- `-b:a 128k` = Good quality, reasonable file size

---

## 📂 File Organization

```
audio/
├── birds/
│   ├── robin-1.mp3
│   └── gull-1.mp3
└── classical/
    ├── mozart-peaceful-1.mp3      (K. 488, 2nd movement)
    ├── mozart-peaceful-2.mp3      (K. 467, 2nd movement)
    ├── debussy-peaceful-1.mp3     (Clair de Lune)
    ├── satie-peaceful-1.mp3       (Gymnopédie No. 1)
    └── README.md
```

---

## 🎼 Integration Plan

### **Option A: Replace Orchestra Synthesis**

Update `js/orchestra.js` to use real recordings:

```javascript
const COMPOSITIONS = {
    "mozartAdagio": {
        name: "Mozart Piano Concerto 23 - Adagio",
        file: "/audio/classical/mozart-peaceful-1.mp3",
        duration: 120,
        fadeIn: 5,
        volume: 0.4
    },
    "clairDeLune": {
        name: "Debussy - Clair de Lune",
        file: "/audio/classical/debussy-peaceful-1.mp3",
        duration: 120,
        fadeIn: 5,
        volume: 0.35
    }
};
```

### **Option B: Hybrid Approach**

Use recordings for main melody, keep synthesis for ambience:
- **Real recordings:** Main wake melody
- **Synthesis:** Subtle background tones

---

## 📊 File Size Estimate

| Piece | Original | Optimized (2 min, 128kbps) |
|-------|----------|---------------------------|
| Mozart K. 488 | ~7 MB | ~1.9 MB |
| Clair de Lune | ~5 MB | ~1.9 MB |
| Mozart K. 467 | ~7 MB | ~1.9 MB |
| **Total (3 pieces)** | ~19 MB | **~5.7 MB** |

Still very reasonable for mobile!

---

## ✅ Next Steps

1. **Download 2-3 pieces** from Musopen
2. **Process with ffmpeg** (trim, optimize)
3. **Test locally** in browser
4. **Integrate** into orchestra.js
5. **Sync to native apps**

---

## 📝 Copyright Compliance

**Important Notes:**
- ✅ **Compositions:** Mozart, Debussy, Satie = Public Domain
- ✅ **Recordings:** Musopen = Public Domain / CC0
- ✅ **Commercial Use:** Allowed (check specific recording license)
- ⚠️ **Attribution:** Recommended (not required for PD)

**Example Attribution:**
```
Recording: Mozart Piano Concerto No. 23, performed by [Artist Name]
Source: Musopen.org
License: Public Domain
```

---

## 🎯 Recommendation

**Start with these 2 pieces:**
1. **Mozart Piano Concerto 23, 2nd movement** (peaceful, uplifting)
2. **Debussy Clair de Lune** (dreamy, gentle)

Download → Process → Test → Enjoy real classical music for your wake experience! 🌅🎹

---

**Sources:**
- [Musopen - Royalty Free Music](https://musopen.org/music/)
- [Classicals.de - Royalty Free Classical](https://www.classicals.de/)
- [Chosic - Mozart Free Music](https://www.chosic.com/free-music/mozart/)
- [Internet Archive - Classical Music](https://archive.org/)
- [Musopen - Mozart Recordings](https://musopen.org/music/composer/wolfgang-amadeus-mozart/)
- [Musopen - Debussy Recordings](https://musopen.org/music/composer/claude-debussy/)
