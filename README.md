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
This project follows a phased development approach.

### Phase 1: Rapid Prototyping (Current)
* **Frontend:** HTML5, CSS3 (CSS Variables for theming), Vanilla JavaScript (ES6+).
* **Audio Engine:** Mock JavaScript engine (mimicking Rust architecture).
* **Platform:** Mobile Web / PWA.

### Phase 2: Production
* **Core:** React Native or Flutter (for 60fps animations and native gestures).
* **Audio:** **Rust** compiled to **WebAssembly (Wasm)** for low-latency sound synthesis.
* **Backend:** Firebase or Supabase (Real-time sync for multiplayer Quest Board).

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

### The Rust Audio Engine (Future)
To build the Wasm audio module (requires Rust toolchain):

```bash
# Install wasm-pack
curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh

# Build the project
wasm-pack build --target web
```

## 📂 Project Structure

```
Parent-Architect/
├── index.html          # Main application interface
├── manifest.json       # PWA manifest
├── sw.js              # Service worker for offline support
├── package.json        # Project configuration
├── README.md          # This file
├── PRD.md            # Product Requirements Document
├── js/               # Modular JavaScript
│   ├── app.js         # Main initialization
│   ├── audio.js       # Audio engine
│   ├── storage.js     # localStorage manager
│   ├── state.js       # State management
│   ├── activities.js  # Activity library (10+ activities)
│   ├── scripts.js     # Script Designer library (10+ scripts)
│   ├── views.js       # UI components
│   ├── actions.js     # User actions & routing
│   ├── effects.js     # Visual effects (confetti)
│   └── gestures.js    # Touch gesture handling
├── docs/             # Additional documentation
└── assets/           # Future: images, icons, fonts
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

### Next Priorities (v0.2.0)
- [ ] Custom quest creation interface
- [ ] Player profile customization (names, avatars)
- [ ] Additional activity categories (nutrition, outdoor play)
- [ ] Script favorites and quick-access board
- [ ] Village Mode (multi-device collaboration)

### Future Enhancements
- [ ] Rust/WASM audio engine integration
- [ ] React Native mobile app
- [ ] Backend sync (Firebase/Supabase)
- [ ] Journal feature for reflective parenting
- [ ] Multi-language support

## 🤝 Contributing
This project is in active development. Contributions are welcome! Check the PRD for detailed requirements.

## 📄 License
MIT License (pending)

---

**Built with intention. Designed for growth.**

*Version 0.1.0 - January 2026*
