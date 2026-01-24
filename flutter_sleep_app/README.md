# Patient Parenting Sleep & Wake System

A science-based Flutter app featuring realistic sleep sounds and a gentle wake alarm system, powered by Rust audio synthesis.

## Features

### 🌙 Sleep Timer
- **8 Science-Based Sounds:**
  - 🌸 Pink Noise - Increases deep sleep by 75%
  - 🟤 Brown Noise - Deepest sleep, masks tinnitus
  - 🌊 Ocean Waves - Matches slow-wave sleep rhythm
  - 🫁 Breathing Guide - 4-6 breaths/min relaxation
  - ✈️ Airplane Cabin - Comforting engine hum
  - 🌧️ Light Rain - Gentle patter
  - 🌧️ Medium Rain - Steady rainfall
  - ⛈️ Heavy Rain - Thunderstorm intensity

- **Sleep Timer Options:** 15, 30, 45, 60, 90 minutes, or no timer
- **Auto-Wake Scheduling:** Automatically set wake alarm when sleep timer starts
- **Realistic Synthesis:** Rust-powered audio generation with natural variations (no loops!)

### ☀️ Gentle Wake Alarm
- **Gradual Wake Process:** Birds start silent, gradually increase over 5-20 minutes
- **Classical Music Fade-in:** Chopin, Vivaldi, Debussy, Satie, or Bach
- **System Integration:**
  - Volume: 0 → 50% gradual increase
  - Brightness: Logarithmic sunrise curve (1% → 100%)
  - Haptic feedback at wake completion
  - Lock screen media controls
- **Survives Phone Restart:** Native alarm system with `rescheduleOnReboot`
- **Works When App Closed:** Background isolate execution

## Architecture

### Technology Stack
- **Flutter** - Cross-platform UI framework
- **Rust** - High-performance audio synthesis engine
- **flutter_rust_bridge** - FFI integration between Flutter & Rust
- **AndroidAlarmManager** - Reliable background alarms
- **AudioService** - Lock screen controls & background playback
- **Hive** - Fast local persistence

### Audio Pipeline
```
User Selection → Rust Synthesis → Variation → Seamless Loop → Flutter Player
```

### Alarm Architecture
```
Schedule → Persist Config → Background Isolate → Audio Service → System Control
```

## Project Structure

```
flutter_sleep_app/
├── lib/
│   ├── main.dart                      # App entry point
│   ├── models/
│   │   └── app_state.dart             # State management with Provider
│   ├── services/
│   │   ├── alarm_service.dart         # Native alarm scheduling
│   │   ├── audio_service.dart         # Sleep sound playback
│   │   └── slow_wake_handler.dart     # Wake sequence controller
│   ├── screens/
│   │   ├── home_screen.dart           # Main navigation
│   │   ├── sleep_timer_screen.dart    # Sleep sound selection & timer
│   │   └── wake_alarm_screen.dart     # Alarm configuration
│   └── bridge_generated.dart          # Auto-generated Rust FFI (after build)
├── rust/
│   ├── src/
│   │   └── lib.rs                     # Complete audio synthesis engine
│   └── Cargo.toml                     # Rust dependencies
├── assets/
│   ├── birds/                         # Bird sound files (robin, sparrow, etc.)
│   └── classical/                     # Classical music files
├── android/
│   └── app/src/main/AndroidManifest.xml  # Android permissions & services
├── ios/
│   └── Runner/Info.plist              # iOS background modes & permissions
└── pubspec.yaml                       # Flutter dependencies

```

## Building & Running

### Prerequisites
1. **Flutter SDK** (3.0+)
2. **Rust** with cargo
3. **Android NDK** (for Android builds)
4. **Xcode** (for iOS builds)

### Setup Instructions

1. **Install Dependencies**
   ```bash
   flutter pub get
   ```

2. **Install Rust Targets**
   ```bash
   # Android
   rustup target add aarch64-linux-android x86_64-linux-android

   # iOS
   rustup target add aarch64-apple-ios
   ```

3. **Install flutter_rust_bridge CLI**
   ```bash
   cargo install flutter_rust_bridge_codegen
   ```

4. **Build Rust Engine & Generate Bindings**
   ```bash
   ./build_rust.sh
   ```

5. **Add Audio Files**
   - Place bird sounds in `assets/birds/`
     - robin.mp3, sparrow.mp3, cardinal.mp3, bluebird.mp3, chickadee.mp3
   - Place classical music in `assets/classical/`
     - chopinNocturne.mp3, vivaldiSpring.mp3, debussyClair.mp3, satiGymnopédie.mp3, bachAir.mp3

6. **Run the App**
   ```bash
   flutter run
   ```

## Rust Audio Synthesis

All sleep sounds are generated in real-time using Rust for maximum realism:

### Pink Noise
- **Algorithm:** Voss-McCartney 7-stage filter bank
- **Science:** Perfect 1/f spectrum, 3dB per octave decrease
- **Research:** Increases deep sleep by 75%

### Brown Noise
- **Algorithm:** Integral of white noise
- **Science:** 6dB per octave decrease
- **Benefits:** Deepest sleep, masks tinnitus

### Ocean Waves
- **Algorithm:** 4-phase synthesis (swell, crash, retreat, silence)
- **Variation:** Random periods (8-12s), crash intensity, silence gaps (2-6s)
- **Science:** 0.1-0.3 Hz rhythm matches slow-wave sleep oscillations

### Breathing Guide
- **Pattern:** 4s inhale + 2s hold + 6s exhale + 2s pause = 14s cycle
- **Frequency:** Rising tone (200→400 Hz), falling (400→150 Hz)
- **Science:** 4-6 breaths/min induces parasympathetic response

### Airplane Cabin
- **Components:** Low-frequency rumble (80-120 Hz) + pink noise overlay
- **Variation:** Slow frequency modulation, occasional pressure changes

### Rain (Light/Medium/Heavy)
- **Algorithm:** Individual droplet synthesis
- **Parameters:**
  - Frequency: 200-8000 Hz per droplet
  - Duration: 3-15ms
  - Density: 20/100/300 droplets per second
- **Realism:** Exponential envelope, random positioning

## Native Features

### Android Permissions
- `SCHEDULE_EXACT_ALARM` - Precise wake timing
- `WAKE_LOCK` - Keep CPU running for alarm
- `FOREGROUND_SERVICE` - Background audio playback
- `RECEIVE_BOOT_COMPLETED` - Reschedule alarms after restart

### iOS Background Modes
- `audio` - Background audio playback
- `processing` - Background alarm execution
- `fetch` - Periodic sync

## State Management

All settings persist automatically using Hive:
- Selected sleep sound
- Sleep timer duration
- Auto-wake alarm setting
- Wake time, duration, bird sound, classical music
- Melody start percentage

## Development Roadmap

See [FLUTTER_ARCHITECTURE.md](../FLUTTER_ARCHITECTURE.md) for complete 6-week development plan.

### Current Status: ✅ Foundation Complete
- ✅ Rust audio engine (all 7 sound types)
- ✅ Flutter UI (Home, Sleep Timer, Wake Alarm)
- ✅ Alarm service with background execution
- ✅ State management with persistence
- ⚠️ Pending: Rust bridge code generation
- ⚠️ Pending: Audio asset files
- ⚠️ Pending: Testing on physical devices

### Next Steps
1. Generate Rust FFI bindings with flutter_rust_bridge
2. Add audio asset files (birds & classical music)
3. Test background alarm reliability
4. Test system volume & brightness control
5. Polish UI/UX based on testing
6. Add onboarding flow

## Testing

### Critical Tests
1. **Background Alarm:** Kill app, verify alarm still triggers
2. **Phone Restart:** Reboot device, verify alarm reschedules
3. **Doze Mode:** Leave phone idle, verify alarm wakes device
4. **Volume Control:** Verify gradual 0→50% increase works
5. **Brightness Control:** Verify logarithmic curve feels like sunrise
6. **Lock Screen:** Verify media controls appear and function

## License

Part of the Patient Parenting project.

## Credits

- **Audio Science:** Based on peer-reviewed sleep research
- **Rust Engine:** Custom synthesis algorithms
- **Classical Music:** Public domain compositions
- **Bird Sounds:** Natural recordings

---

**Version:** 1.0.0
**Flutter:** 3.0+
**Dart:** 3.0+
**Rust:** 2021 Edition
