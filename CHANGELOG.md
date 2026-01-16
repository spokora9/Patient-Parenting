# Changelog

All notable changes to Parent Architect will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.0] - 2026-01-16

### Added
- **Quest Templates Library**
  - 6 pre-built routine templates (morning, bedtime, chores, homework, kindness, weekend)
  - 29 total quests across all templates
  - Template preview view before adding quests
  - "Templates" button in Quest view for quick access
  - Template categories with icons and quest counts

- **Reward Redemption System**
  - Create custom rewards with XP costs and emoji icons
  - Redeem rewards by spending earned XP
  - Recently redeemed rewards history display
  - Confetti celebration animation on redemption
  - XP balance prominently displayed
  - Delete unwanted rewards
  - Default starter rewards (Movie Night, Screen Time, Choose Dinner)

- **Script Favorites/Pinning**
  - Favorite/unfavorite toggle button (⭐/☆) on each script
  - Favorited scripts shown separately at top of list
  - Special styling for favorited scripts (yellow border, cream background)
  - Persistent favorites saved in state

- **Daily Quest Reset**
  - Automatic reset of recurring quests at midnight
  - Manual "Reset Daily" button in Quest view
  - Last reset date tracking in state
  - Confirmation dialog before manual reset

- **Dark Mode**
  - Beautiful dark color scheme for nighttime use
  - Toggle switch in Settings with smooth animation
  - Persistent dark mode preference
  - Applies automatically on app load
  - All UI components support dark mode

- **New JavaScript Module**
  - js/templates.js with quest template definitions and helpers

### Changed
- **Quest View Enhancements**
  - Added "Templates" button next to "Add Quest"
  - Added "Reset Daily" button alongside "View Rewards"
  - Improved button layout with flex wrapping

- **Settings View**
  - New "Appearance" section with dark mode toggle
  - Beautiful iOS-style toggle switch UI

- **Scripts View**
  - Scripts now separated into "Favorites" and "All Scripts" sections
  - Toggle buttons for favoriting/unfavoriting

- **Service Worker**
  - Updated cache name to v3
  - Added js/templates.js to cached files
  - Added js/scripts.js to cached files

- **State Management**
  - Added `darkMode` boolean field
  - Added `lastQuestReset` date string field
  - Added `scriptFavorites` array
  - Added `rewards` array with default items
  - Added `redeemedRewards` array

### Technical
- App initialization now includes daily quest auto-reset check
- App initialization applies dark mode on load
- `applyDarkMode()` function toggles body class
- `checkAndResetDailyQuests()` function runs on startup
- Enhanced actions.js with 3 new action handlers
- Template preview navigation via router
- Dark mode CSS variables for complete theme support

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

### Planned for v0.4.0
- Village Mode for multi-device collaboration (QR code sharing)
- Weekly progress charts and analytics
- Quest scheduling and push reminders
- Script notes and custom scripts
- Activity history and insights

### Future Enhancements
- Rust/WebAssembly audio engine
- React Native mobile app
- Backend synchronization
- Journal feature
- Multi-language support
