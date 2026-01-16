# Product Requirements Document (PRD)
**Project:** Parent Architect
**Version:** 1.0
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

---

## 4. Technical Architecture

### 4.1 Frontend (Web/Mobile)
* **Language:** HTML5 / CSS3 / JavaScript (ES6+).
* **State Management:** Simple reactive state (Store pattern) for the prototype; Redux/Context API for Production.
* **Audio:**
    * **Logic:** Rust (compiled to Wasm).
    * **Sounds:** Synthesized tones (Sine/Triangle waves) to keep app size small and avoid audio file assets.

### 4.2 Data Model (JSON Schema)
```json
{
  "family_settings": {
    "mode": "co_op",
    "theme": "warm_neutral"
  },
  "players": [
    {
      "id": "p1",
      "name": "Leo",
      "age": 5,
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
      "sound_effect": "success_major"
    }
  ]
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

### v1.1
* Save specific "Scripts" to a quick-access Favorites board.

### v1.2
* "Village Mode" - Allow inviting another adult (partner) to view and edit the board.

### v2.0
* Rust Audio Engine full integration for procedural soundscapes (e.g., "White Noise" generator for sleep).

---

## 7. Success Metrics
* **Engagement:** Daily active usage (opening "The Spark" feed).
* **Completion Rate:** % of quests marked as done.
* **Retention:** 7-day and 30-day retention rates.
* **Qualitative:** Parent feedback on "feeling less overwhelmed" and "more intentional."

---

## 8. Open Questions
1. Should we include a "Journal" feature for reflective parenting?
2. How do we handle multiple languages for global reach?
3. What is the monetization strategy? (Freemium, one-time purchase, subscription?)

---

**Document Owner:** Parent Architect Team
**Last Updated:** 2026-01-16
