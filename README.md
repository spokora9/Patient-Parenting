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

## 🚀 Quick Start (Prototype)

### 1. Run the Interface
Simply open `index.html` in any modern web browser. For the best experience, open it on a mobile device or use Chrome DevTools toggled to "Mobile View."

### 2. The Rust Audio Engine (Future)
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
├── index.html          # Main prototype interface
├── README.md           # This file
├── PRD.md             # Product Requirements Document
├── docs/              # Additional documentation
└── assets/            # Future: images, icons, fonts
```

## 🎯 Core Features

### 1. The Daily Spark
A swipeable deck of 3 daily cards featuring activities and insights tagged as either "Modern Science" or "Old Wisdom."

### 2. Family Quest (Multiplayer System)
Gamified task manager supporting up to 4 child profiles with:
- Co-op Mode (shared Family Jar)
- Solo Mode (individual XP bars)
- Visual feedback and audio rewards

### 3. Script Designer (Coming Soon)
Searchable tool for de-escalating conflict with specific scripts based on gentle parenting books.

### 4. Headspace Organizer
Mental load dump with intelligent suggestions and a "Village List" for sharing with family helpers.

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

## 🤝 Contributing
This project is in active development. Check the PRD for detailed requirements and the roadmap for upcoming features.

## 📄 License
[To be determined]

---

**Built with intention. Designed for growth.**
