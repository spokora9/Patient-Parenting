# Changelog

All notable changes to Parent Architect will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2026-01-16

### Added
- **Custom Quest Creation**
  - "Add Quest" button in Quest view
  - Prompt-based quest creation with title and XP value
  - Custom quest ID generation
  - Quest persistence in state

- **Player Profile Customization**
  - Settings page accessible via gear icon
  - Name editing for each player
  - 10 avatar emoji options (🦁🦋🌟🚀🎨⚽🎵🌈🦄🐢)
  - 8 color theme options per player
  - Auto-update player initials when name changes
  - Visual feedback on selection

- **Quest Management**
  - Delete quest functionality with confirmation
  - XP value display for each quest
  - Completion tracking with timestamp
  - Player ID tracking for quest completion
  - Empty state message when no quests exist

- **Expanded Activity Library**
  - Grew from 10 to 20 activities
  - New categories: Nutrition, Outdoor Play, Sleep Routine, Gratitude, Transitions, Bedtime
  - Activities: Deconstructed Dinner, Puddle Jumping, Body Scan, Secret Handshake, 5-4-3-2-1 Countdown, Flashlight Stories, and more

- **Settings System**
  - Dedicated settings view
  - Team goal XP customization
  - Back to Quests navigation
  - Centralized configuration

### Changed
- **Quest View Overhaul**
  - Dynamic quest rendering from state.customQuests
  - Colored player avatars with emoji display
  - Settings gear icon replaces "Add" player slot
  - Quest items now show XP values
  - Delete buttons appear on hover/tap

- **Player System**
  - Added color and avatar fields to player objects
  - Default avatars and colors for Leo, Mia, Noah
  - Visual player selector with colored backgrounds

- **State Management**
  - Added questMode field ('co-op' or 'solo')
  - scriptFavorites array for future feature
  - customQuests replaces hardcoded quest items
  - Enhanced default state with colors/avatars

### Fixed
- Router now handles settings view navigation
- Event handling improved for programmatic navigation
- Player avatar display properly scales emoji

## [0.1.0] - 2026-01-16

### Added
- **The Daily Spark**
  - Swipeable card interface with touch/mouse gesture support
  - 10+ curated activities from activity library
  - Daily rotation of 3 random activities
  - Favorites system to save activities for later
  - Visual swipe indicators (dismiss left, save right)

- **Family Quest System**
  - Multiplayer support for up to 4 child profiles
  - Co-op mode with shared XP progress
  - Animated progress bars with smooth transitions
  - Confetti celebration animation when goals are reached
  - Audio feedback for task completion
  - Persistent progress via localStorage

- **Script Designer** (NEW)
  - 10+ conflict resolution scripts
  - Real-time searchable database
  - "Instead of/Say this" format
  - Explanations based on parenting research
  - Covers common scenarios: hitting, bedtime, tantrums, etc.

- **Headspace Organizer**
  - Village List for delegating tasks
  - Upcoming events with age-appropriate tips
  - Display of saved favorite activities
  - Data export/import functionality (JSON)

- **Progressive Web App (PWA)**
  - Service worker for offline functionality
  - manifest.json for installable app
  - Add to home screen support
  - Cached assets for fast loading

- **Data Persistence**
  - localStorage integration for all user data
  - Export data as JSON backup
  - Import data from previous backups
  - No account required - all data stays local

### Technical
- Modularized JavaScript into 9 separate files:
  - app.js - initialization
  - audio.js - sound engine
  - storage.js - localStorage manager
  - state.js - state management
  - activities.js - activity library
  - scripts.js - script database
  - views.js - UI components
  - actions.js - user actions & routing
  - effects.js - confetti & celebrations
  - gestures.js - touch handling
- Added package.json with npm scripts
- Implemented service worker (sw.js) for offline support
- Created manifest.json for PWA installation
- Added comprehensive .gitignore

### Design
- Warm, neutral color palette (#F9F8F6 background, #C49F7D accents)
- Responsive mobile-first design
- Smooth animations and transitions
- Tactile button interactions with visual feedback
- Clean, minimal interface with generous white space

## [Unreleased]

### Planned for v0.2.0
- Custom quest creation interface
- Player profile customization (names, avatars, colors)
- Additional activity categories
- Script favorites and quick-access board
- Village Mode for multi-device collaboration

### Future Enhancements
- Rust/WebAssembly audio engine
- React Native mobile app
- Backend synchronization
- Journal feature
- Multi-language support
