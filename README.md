# Parent Architect

**Parenting by Design: Where Modern Neuroscience meets Village Wisdom.**

> *"We don't just fix behavior; we design the environment for growth."*

## 📖 Overview
Parent Architect is a digital tool for parents who want to move beyond "survival mode" to intentional parenting. Inspired by books like *Playful Parenting* and *How to Talk So Kids Will Listen*, as well as high-end design blogs, this app treats parenting as a craft.

It combines a **Multiplayer Gamified System** (up to 4 players) with a curated feed of developmental activities ("The Spark") and a mental load organizer ("Headspace").

## 🌟 Core Philosophy
The app balances two distinct sources of knowledge:
1.  **Modern Knowledge:** Neuroscience, attachment theory, sensory processing, and developmental milestones.
2.  **Old Wisdom:** Intuition, storytelling, nature, patience, and the "village" mentality.

## 🛠 Tech Stack

* **Frontend:** HTML5, CSS3 (CSS Variables for theming), Vanilla JavaScript (ES6+)
* **Audio Engine:** **Rust** compiled to **WebAssembly (WASM)** for professional sound synthesis
* **Native Apps:** Capacitor (iOS & Android) with native brightness control
* **Platform:** Mobile Web PWA + Native iOS/Android Apps
* **Audio Assets:** Real recordings from Xeno-canto (birds) and Musopen (classical music)
* **Future Backend:** Firebase or Supabase (Real-time sync for multiplayer Quest Board)

## 🚀 Quick Start

### Option 1: Direct Open
Simply open `index.html` in any modern web browser. For the best experience, open it on a mobile device or use Chrome DevTools toggled to "Mobile View."

### Option 2: Using Development Server (Recommended)
```bash
# Install dependencies (optional, for future enhancements)
npm install

# Start development server
npm start
# Opens at http://localhost:8080
```

### PWA Installation
Once the app is running, you can install it as a Progressive Web App:
1. Open the app in Chrome/Edge
2. Look for the "Install" icon in the address bar
3. Click to install as a standalone app

### Native App (iOS/Android)
For native features like hardware brightness control:

```bash
# Build and sync web assets
npm run build
npm run sync

# Open in native IDE
npm run open:ios      # Opens in Xcode
npm run open:android  # Opens in Android Studio

# Or build and run directly
npm run run:ios
npm run run:android
```

See [NATIVE_SETUP.md](NATIVE_SETUP.md) for detailed instructions.

### The Rust Audio Engine
The WASM audio module is already built and included. To rebuild (requires Rust toolchain):

```bash
# Install wasm-pack
curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh

# Build the audio engine
cd audio-engine
wasm-pack build --target web

# Copy to project
cp pkg/parent_architect_audio.js ../wasm/
cp pkg/parent_architect_audio_bg.wasm ../wasm/
```

## 📂 Project Structure

```
Parent-Architect/
├── index.html              # Main application interface
├── manifest.json           # PWA manifest
├── sw.js                   # Service worker for offline support
├── package.json            # Project configuration
├── capacitor.config.json   # Capacitor native app config
├── README.md               # This file
├── PRD.md                  # Product Requirements Document
├── CLASSICAL_MUSIC_GUIDE.md # Guide for downloading classical music
├── NATIVE_SETUP.md         # Native app build instructions
├── js/                     # Modular JavaScript
│   ├── app.js              # Main initialization
│   ├── audio.js            # Audio engine
│   ├── slowwake.js         # Slow wake timer logic
│   ├── orchestra.js        # Classical music compositions
│   ├── birdsamples.js      # Real bird sound player
│   ├── brightness.js       # Native brightness control
│   ├── wasmbridge.js       # WASM audio engine bridge
│   ├── storage.js          # localStorage manager
│   ├── state.js            # State management
│   ├── activities.js       # Activity library (20+ activities)
│   ├── scripts.js          # Script Designer library (10+ scripts)
│   ├── templates.js        # Quest templates
│   ├── views.js            # UI components
│   ├── actions.js          # User actions & routing
│   ├── effects.js          # Visual effects (confetti)
│   └── gestures.js         # Touch gesture handling
├── audio/                  # Audio assets
│   ├── birds/              # Real bird recordings (Xeno-canto)
│   │   ├── robin-1.mp3     # American Robin (28s, looping)
│   │   ├── gull-1.mp3      # Western Gull (30s, looping)
│   │   └── README.md       # Bird sound documentation
│   └── classical/          # Classical music recordings
│       └── README.md       # Setup instructions
├── wasm/                   # Rust audio engine (WASM)
│   ├── parent_architect_audio.js
│   └── parent_architect_audio_bg.wasm
├── audio-engine/           # Rust source code
│   ├── Cargo.toml
│   └── src/
│       ├── lib.rs          # Main WASM entry point
│       ├── bird.rs         # Physical bird modeling
│       ├── synthesis.rs    # Multi-instrument synthesis
│       ├── dsp.rs          # Signal processing (filters, reverb)
│       └── utils.rs        # Utilities
├── www/                    # Built web assets for native apps
├── ios/                    # iOS native project (Xcode)
├── android/                # Android native project (Android Studio)
├── docs/                   # Additional documentation
└── assets/                 # Images, icons, fonts
```

## 🎯 Core Features

### 1. The Daily Spark ✨
- **10+ Activity Library:** Curated activities tagged as "Modern Science" or "Old Wisdom"
- **Swipeable Cards:** Intuitive swipe gestures (left to dismiss, right to save)
- **Touch & Mouse Support:** Works on desktop and mobile
- **Daily Rotation:** New set of 3 activities each day
- **Favorites System:** Save activities for later reference

### 2. Family Quest (Multiplayer System) 🎮
Gamified task manager supporting up to 4 child profiles with:
- **Co-op Mode:** Shared Family Jar for teamwork
- **Visual Progress:** Animated progress bars
- **Audio Rewards:** Satisfying sound effects
- **Goal Celebration:** Confetti animation when goals are reached
- **Persistent Progress:** Automatically saves via localStorage

### 3. Script Designer 💬
**NEW!** Searchable database of 10+ conflict resolution scripts:
- Real-time search by scenario ("hitting", "bedtime", etc.)
- **Instead of/Say This** format for clear guidance
- Research-backed explanations ("Why this works")
- Based on books like *How to Talk So Kids Will Listen*

### 4. Headspace Organizer 📝
- **Village List:** Tasks to delegate to family/helpers
- **Upcoming Events:** With age-appropriate tips
- **Saved Activities:** Quick access to favorites
- **Data Management:** Export/Import your progress as JSON

### 5. Slow Wake Timer 🌅
**PROFESSIONAL FEATURE!** A gentle, science-based wake timer for parents:
- **Real Bird Sounds:** Authentic recordings from Xeno-canto (robin + gull sequence)
- **Classical Music:** Real recordings from Musopen (Mozart, Debussy, Satie)
- **Rust/WASM Audio:** Low-latency synthesis engine for smooth soundscapes
- **Natural Light Simulation:** Gradual color transition (dark → sunrise → daylight)
- **Native Brightness Control:** Maximizes screen brightness on iOS/Android
- **Customizable Duration:** 15-60 minute wake cycles
- **Gentle Progression:**
  1. Soft breeze sounds (0-40%)
  2. Birds begin chirping (40-70%)
  3. Gull joins robin after first loop (70-85%)
  4. Classical music fades in (85-100%)
  5. Screen brightness maximizes
- **Graceful Fallbacks:** Real recordings → WASM synthesis → Simple synthesis
- **Wake Lock API:** Prevents screen from sleeping during wake cycle

## ✨ Enhanced Features

### Progressive Web App (PWA)
- **Offline Support:** Works without internet via Service Worker
- **Install as App:** Add to home screen on mobile
- **Fast Loading:** Cached assets for instant startup

### Data Persistence
- **localStorage:** Automatic state saving
- **Export/Import:** Backup and restore your data
- **No Account Required:** All data stays on your device

### Touch Interactions
- **Swipe Gestures:** Natural card swiping with visual feedback
- **Smooth Animations:** 60fps transitions and effects
- **Haptic-style Audio:** Tactile sound feedback

## 🎨 Design Philosophy
The interface follows a "design blog" aesthetic with:
- Warm, neutral color palette
- Serif fonts for "Old Wisdom" elements
- Clean sans-serif for readability
- Generous white space
- Tactile interactions with audio feedback

## 📚 Documentation
- [Product Requirements Document](PRD.md) - Detailed feature specifications
- [Development Roadmap](docs/ROADMAP.md) - Future features and milestones (Coming Soon)

## 📋 Recent Updates

### v0.6.0 - Slow Wake Timer with Rust Audio & Native Apps (Latest)
**✨ PROFESSIONAL FEATURES:**
- **Slow Wake Timer:** Gentle 15-60 minute wake cycle with natural light simulation
- **Rust/WASM Audio Engine:** Professional sound synthesis compiled to WebAssembly
  - Physical bird modeling with formant filters
  - Multi-instrument orchestra (piano, strings, harp, flute)
  - DSP filters, reverb, and breeze generation
- **Real Bird Sounds:** Authentic recordings from Xeno-canto
  - American Robin (28s, continuous loop)
  - Western Gull (30s, joins after first robin loop)
  - Sequential playback for realistic dawn ambience
- **Classical Music Orchestra:** Real recordings support
  - Integration with Musopen public domain recordings
  - Mozart Piano Concertos (K. 488, K. 467)
  - Debussy Clair de Lune
  - Satie Gymnopédie No. 1
  - Graceful fallback to synthesis if recordings unavailable
- **Capacitor Native Apps:** iOS and Android builds
  - Native brightness control (@capacitor-community/screen-brightness)
  - Maximizes screen brightness during wake cycle
  - Restores original brightness on stop
  - Graceful fallback to web APIs (Wake Lock, fullscreen)
- **Progressive Enhancement:** Advanced features degrade gracefully
  - Real recordings → WASM synthesis → Simple synthesis
  - Native brightness → Web brightness (Wake Lock + white screen)

**🎨 UX Improvements:**
- Fullscreen wake overlay with gradient color transitions
- Real-time progress display with elapsed/remaining time
- Smooth fade-in/fade-out for all audio elements
- Console logging for debugging and verification
- Stop button to cancel wake cycle

**🔧 Technical Updates:**
- Service worker updated to v8.0 for classical music caching
- Built Rust audio engine (audio-engine/ directory)
- Compiled WASM modules (wasm/ directory)
- Created comprehensive documentation:
  - CLASSICAL_MUSIC_GUIDE.md
  - NATIVE_SETUP.md
  - audio/birds/README.md
  - audio/classical/README.md
- NPM scripts for native app builds (build, sync, open, run)
- FFmpeg audio processing pipeline for mobile optimization

### v0.3.0 - Templates, Rewards & Enhanced UX
**✨ NEW Features:**
- **Quest Templates Library:** 6 pre-built routine templates (morning, bedtime, chores, homework, kindness, weekend) with 29 total quests
- **Reward Redemption System:** Create custom rewards, spend XP to redeem them, celebration animations on redemption
- **Script Favorites:** Pin important conflict resolution scripts to the top of the list for quick access
- **Daily Quest Reset:** Automatic daily reset of recurring quests + manual reset button
- **Dark Mode:** Beautiful dark color scheme with toggle switch in settings

**🎨 UI Improvements:**
- Quest templates preview before adding
- Reward management interface with XP balance display
- Favorited scripts shown separately with special styling (⭐)
- Dark mode toggle with smooth animations
- Reset daily quests button in Quest view

**🔧 Technical Updates:**
- Service worker updated to cache v0.3.0 files
- Enhanced state management for new features
- Auto-reset logic runs on app initialization

### v0.2.0 - Customization & Quest Management
**✨ NEW Features:**
- **Custom Quest Creation:** Add your own quests with custom XP values
- **Player Customization:** Change names, avatars (10 options), and colors (8 options)
- **Settings Page:** Centralized configuration for players and quest goals
- **Quest Management:** Delete quests, track completion history
- **Expanded Library:** 20+ activities (added nutrition, outdoor play, sleep, social skills categories)
- **Avatar System:** Fun emoji avatars for each child (🦁🦋🌟🚀🎨 and more)
- **Color Themes:** 8 vibrant color options per player

**🎨 UI Improvements:**
- Settings gear icon in Quest view
- "Add Quest" button with XP display
- Colored player avatars in selector
- Delete buttons for quests
- Visual quest completion feedback

### v0.1.0 - Initial Feature Complete Release
**✅ Implemented:**
- localStorage persistence for all user data
- Touch gesture support with swipe animations
- Expanded activity library (10+ activities)
- Confetti celebration for goal completion
- Modularized JavaScript architecture
- PWA support with service worker
- Script Designer with 10+ scenarios
- Favorites system for activities
- Data export/import functionality

**🔧 Technical Improvements:**
- Separated code into 9 modular JS files
- Added package.json for npm scripts
- Implemented offline-first architecture
- Added manifest.json for PWA installation

## 🚧 Roadmap

### Completed in v0.6.0
- [x] Slow Wake Timer with natural light simulation
- [x] Rust/WASM audio engine integration ✅
- [x] Real bird sounds from Xeno-canto
- [x] Classical music orchestra system
- [x] Capacitor native iOS/Android apps ✅
- [x] Native brightness control
- [x] Progressive audio enhancement (recordings → WASM → synthesis)

### Completed in v0.3.0
- [x] Quest templates library (morning routine, bedtime, chores)
- [x] Reward redemption system (trade XP for rewards)
- [x] Script favorites/pinning
- [x] Daily quest reset functionality
- [x] Dark mode support

### Next Priorities (v0.7.0)
- [ ] Download classical music recordings (Mozart, Debussy, Satie)
- [ ] Test native brightness on physical devices
- [ ] Village Mode (share lists via QR code/link)
- [ ] Weekly progress charts/analytics
- [ ] Quest scheduling and reminders

### Future Enhancements
- [ ] Additional wake timer sounds (ocean waves, rain, forest)
- [ ] Customizable wake composition selection
- [ ] Backend sync (Firebase/Supabase)
- [ ] Journal feature for reflective parenting
- [ ] Multi-language support
- [ ] Voice-to-text for script search
- [ ] Push notifications for quest reminders

## 🤝 Contributing
This project is in active development. Contributions are welcome! Check the PRD for detailed requirements.

## 📄 License
MIT License (pending)

---

**Built with intention. Designed for growth.**

*Version 0.6.0 - January 2026*
