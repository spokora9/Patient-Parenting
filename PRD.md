# Product Requirements Document (PRD)
**Project:** Parent Architect
**Version:** 0.6.0
**Status:** In Development

---

## 1. Executive Summary
Most parenting apps are clinical trackers (diapers/sleep) or chaotic forums. Parent Architect fills the gap for **"The Intentional Parent."** It is a lifestyle app that provides actionable tools (Scripts, Activities, Gamification) wrapped in a calming, high-end design aesthetic.

## 2. User Personas

### Primary: "The Architect" (The Parent)
* **Motivation:** Wants to be a better parent but is overwhelmed by information. Loves the aesthetic of design blogs but needs the utility of a tool.
* **Pain Point:** Forgets gentle parenting techniques in the heat of the moment; feels isolated in the daily grind.
* **Needs:** Quick, actionable scripts ("What do I say?") and a way to make discipline fun, not a battle.

### Secondary: "The Player" (The Child)
* **Age Range:** 3–12 years old.
* **Motivation:** Fun, recognition, and contributing to the family.
* **Needs:** Visual progress (bars filling up), fun sounds, and a sense of "team" rather than just obeying orders.

---

## 3. Functional Requirements

### 3.1 Feature: The Daily Spark (Home Feed)
* **Description:** A swipeable deck of 3 daily cards.
* **Logic:**
    * Cards must be tagged as either **[Modern Science]** (e.g., "Vestibular Input") or **[Old Wisdom]** (e.g., "Storytelling").
    * **Content Types:**
        * *Activity:* A 5-minute game (e.g., "The Yes Hour").
        * *Insight:* A developmental fact (e.g., "At age 4, lying is a sign of intelligence").
        * *Check-in:* A prompt for the parent (e.g., "Have you drunk water today?").
* **User Action:** Swipe left (dismiss) or right (save to favorites).

### 3.2 Feature: Family Quest (Multiplayer System)
* **Description:** A gamified task manager supporting up to 4 child profiles.
* **Modes:**
    * **Co-op Mode (Default):** All points earned by any player go into a shared "Family Jar." (Promotes teamwork).
    * **Solo Mode:** Individual XP bars for each child.
* **UI Requirement:**
    * "Smash Bros" style character selector at the top (Tap avatar to make active).
    * Visual feedback is mandatory (e.g., bar fills up, confetti animation).
* **The "Quest" Types:**
    * *Daily:* Recurring (Brush teeth).
    * *Epic:* One-off (Clean the garage).

### 3.3 Feature: The Script Designer
* **Description:** A searchable tool for de-escalating conflict.
* **Workflow:**
    1.  User taps "SOS" or Search.
    2.  User inputs scenario: "Hitting," "Not listening," "Won't sleep."
    3.  App returns a specific script based on books like *How to Talk So Kids Will Listen*.
    4.  **Display:** Shows "Instead of X (Shaming)... Say Y (Empathy)."

### 3.4 Feature: Headspace (Organizer)
* **Description:** A mental load dump.
* **Intelligence:**
    * When adding an event (e.g., "Birthday"), the app automatically suggests age-appropriate party tips or gift ideas based on the child's developmental stage.
    * "Village List": A specific list designed to be shared with grandparents/sitters.

### 3.5 Feature: Slow Wake Timer 🌅
* **Description:** A professional-grade gentle wake system for parents, combining authentic nature sounds with gradual light simulation.
* **User Workflow:**
    1. User selects wake duration (15, 30, 45, or 60 minutes)
    2. User chooses sound mode (nature, silent, or future: custom)
    3. Timer starts with fullscreen overlay showing current time and progress
    4. App gradually transitions through wake phases
    5. User can stop early or let it complete naturally
* **Wake Phases (Customizable Duration):**
    * **Phase 1 (0-40%):** Soft breeze sounds, dark colors (RGB: #0a0a0a → #1a0f0a)
    * **Phase 2 (40-70%):** Birds begin chirping (robin loops), sunrise colors emerge
    * **Phase 3 (70-85%):** Gull joins robin after first loop, colors brighten
    * **Phase 4 (85-100%):** Classical music fades in, full daylight colors, screen brightness maximizes
* **Audio Architecture (Progressive Enhancement):**
    1. **Preferred:** Real recordings from Xeno-canto (birds) and Musopen (classical)
    2. **Fallback 1:** Rust/WASM synthesis engine (physical bird modeling, multi-instrument orchestra)
    3. **Fallback 2:** Simple Web Audio API synthesis
* **Visual Elements:**
    * Real-time progress bar
    * Elapsed/remaining time display
    * Smooth gradient color transitions (dark → orange → yellow → white)
    * Fullscreen mode for immersive experience
* **Native Features (iOS/Android):**
    * Hardware brightness control (maximizes during wake, restores on stop)
    * Wake Lock API (prevents screen sleep)
    * Fullscreen mode
* **Technical Requirements:**
    * No audio interruptions or clicks during transitions
    * Smooth fade-in/fade-out for all audio sources
    * Birds must loop continuously without gaps
    * Classical music must fade in over 5+ seconds
    * Progress must update every second
    * Stop button must cleanly terminate all audio and restore state

---

## 4. Technical Architecture

### 4.1 Frontend (Web/Mobile)
* **Language:** HTML5 / CSS3 / JavaScript (ES6+)
* **State Management:** Simple reactive state (Store pattern) with localStorage persistence
* **Platform:** Progressive Web App (PWA) + Capacitor native apps (iOS/Android)
* **Audio Engine:**
    * **Core:** Rust compiled to WebAssembly (WASM) for professional synthesis
    * **Features:**
        - Physical bird modeling with formant filters (source-filter model)
        - Multi-instrument orchestra (piano, strings, harp, flute)
        - DSP filters (low-pass, band-pass, reverb)
        - 432 Hz tuning for natural resonance
    * **Real Recordings:**
        - Birds: Xeno-canto (robin, gull, cardinal, chickadee, warbler)
        - Classical: Musopen public domain (Mozart, Debussy, Satie)
    * **Processing:** FFmpeg for mobile optimization (mono/stereo, 22-44kHz, 64-128kbps)
* **Native Capabilities (via Capacitor):**
    * Screen brightness control (@capacitor-community/screen-brightness)
    * Wake Lock API for screen persistence
    * Fullscreen mode
    * File system access for audio caching

### 4.2 Data Model (JSON Schema)
```json
{
  "family_settings": {
    "mode": "co_op",
    "theme": "warm_neutral",
    "dark_mode": false
  },
  "wake_timer": {
    "default_duration": 30,
    "default_sound": "nature",
    "default_composition": "mozartAdagio",
    "brightness_control": true
  },
  "players": [
    {
      "id": "p1",
      "name": "Leo",
      "age": 5,
      "avatar": "🦁",
      "avatar_color": "#FF7675",
      "xp": 1500
    }
  ],
  "quests": [
    {
      "id": "q1",
      "title": "Clear Table",
      "xp_value": 50,
      "category": "household",
      "type": "daily",
      "completed": false,
      "sound_effect": "success_major"
    }
  ],
  "rewards": [
    {
      "id": "r1",
      "title": "Extra Screen Time",
      "cost": 500,
      "redeemed": false
    }
  ],
  "templates": {
    "morning_routine": [...],
    "bedtime_routine": [...]
  }
}
```

---

## 5. UI/UX Guidelines

### 5.1 The "Design Blog" Aesthetic
**Color Palette:**
* Backgrounds: Off-whites (#FDFCF8), Cream.
* Text: Dark Grey (#2D3436) instead of Black.
* Accents: Clay (#C49F7D), Sage Green (#A3C9A8), Muted Blue (#74B9FF).

**Typography:**
* Headings: Serif (e.g., Merriweather or Playfair Display) for the "Old Wisdom" feel.
* Body: Clean Sans-Serif (e.g., Inter or Helvetica Neue) for readability.

### 5.2 Interactions
* **No Clutter:** White space is a feature, not empty space.
* **Tactile:** Buttons should feel "pressable" (using CSS transforms on active state).
* **Audio Feedback:** Every significant action (completing a quest, saving a card) must have a subtle, generated sound.

---

## 6. Future Roadmap

### Completed (v0.1.0 - v0.6.0)
* ✅ Script Designer with favorites/pinning
* ✅ Quest templates library (morning, bedtime, chores, homework, kindness, weekend)
* ✅ Reward redemption system
* ✅ Daily quest reset functionality
* ✅ Dark mode support
* ✅ Custom quest creation
* ✅ Player customization (avatars, colors)
* ✅ PWA with offline support
* ✅ Rust/WASM audio engine (physical bird modeling, multi-instrument orchestra)
* ✅ Slow Wake Timer with real bird sounds
* ✅ Classical music integration (Musopen recordings)
* ✅ Capacitor native apps (iOS/Android)
* ✅ Native brightness control

### v0.7.0 - Wake Timer Enhancements
* Download classical music recordings (Mozart K.488, K.467, Debussy, Satie)
* Test native brightness on physical devices
* Additional wake compositions (ocean, rain, forest)
* Customizable wake phase timing
* Wake timer history and statistics

### v0.8.0 - Social Features
* "Village Mode" - Share lists via QR code/link
* Multi-device sync (Firebase/Supabase backend)
* Partner collaboration features

### v0.9.0 - Analytics & Insights
* Weekly progress charts
* Quest completion analytics
* Parenting insights based on activity patterns
* Export data visualizations

### v1.0.0 - Production Release
* Quest scheduling and reminders
* Push notifications
* Multi-language support
* Voice-to-text for script search
* Journal feature for reflective parenting

---

## 7. Success Metrics
* **Engagement:** Daily active usage (opening "The Spark" feed).
* **Completion Rate:** % of quests marked as done.
* **Retention:** 7-day and 30-day retention rates.
* **Qualitative:** Parent feedback on "feeling less overwhelmed" and "more intentional."

---

## 8. Open Questions
1. ~~Should we include a "Journal" feature for reflective parenting?~~ → Deferred to v1.0.0
2. How do we handle multiple languages for global reach? → v1.0.0
3. What is the monetization strategy? (Freemium, one-time purchase, subscription?)
4. Should we add more wake timer soundscapes (ocean, rain, thunderstorm)?
5. How do we handle copyright for classical music recordings in app stores?
6. Should wake timer support custom playlist uploads?
7. Do we need user accounts for cloud sync, or keep it local-first?

---

**Document Owner:** Parent Architect Team
**Last Updated:** 2026-01-22 (v0.6.0 - Slow Wake Timer & Native Apps)
