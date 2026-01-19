# Slow Wake Timer - v0.6.0 Comprehensive Plan

## Vision
Create a gentle, science-backed wake experience that reduces morning cortisol spikes and helps children transition from sleep to wakefulness with calm and joy.

---

## Core Principles

1. **Gradual, Not Jarring** - No sudden changes in light or sound
2. **Customizable** - Every child is different; parents know what works best
3. **Scientifically Sound** - Based on circadian rhythm and cortisol research
4. **Child-Delightful** - Make waking up something kids look forward to
5. **Parent-Friendly** - Simple setup, reliable operation

---

## Feature Set

### Duration Options
- **5 minutes** - Quick wake for older kids
- **10 minutes** - Standard gentle wake
- **15 minutes** - Ultra-gentle for sensitive sleepers
- **Custom** - Parent can set any duration (1-30 minutes)

### Sound Categories

#### 1. **Nature Sounds** (Scientifically Calming)
- Morning birds chirping (starts with 1-2 birds, builds to chorus)
- Ocean waves (gentle rhythm matching resting heart rate ~60 BPM)
- Rain on leaves (pink noise, naturally soothing)
- Forest ambience (birds + wind + rustling)
- Morning creek/stream

#### 2. **Musical Options**
- Gentle piano (procedurally generated using Web Audio API)
- Soft guitar plucks
- Harp arpeggios
- Music box melody
- Kalimba (thumb piano) - child-friendly tone

#### 3. **Playful Wake** (For Kids Who Need Energy)
- "Rise and Shine" original upbeat tune
- Happy ukulele
- Bouncy xylophone
- Cheerful whistling melody

#### 4. **Custom Audio**
- Allow parents to upload MP3/audio file
- Could be child's favorite song, parent's voice, etc.

#### 5. **Silent Mode**
- Light only (for hearing sensitivities or shared rooms)

### Volume Curves

**Exponential Curve** (Recommended - feels most natural):
```
0min:  0% →
25%:   5% →
50%:  20% →
75%:  50% →
100%: 100%
```

**Linear Curve** (Alternative for testing):
```
Steady increase from 0% to 100%
```

**Parent Control**:
- Max volume cap (default 70% to avoid startle)
- Starting volume (default 0%, but could start at 5% for very deep sleepers)

### Visual/Light Features

#### Brightness Curves
- **Sunrise Simulation** (Recommended):
  - Starts with deep purple/indigo (mimics pre-dawn)
  - Transitions through pink, orange, yellow
  - Ends in bright white/daylight

- **Simple Fade** (Alternative):
  - Starts black, fades to white

- **Rainbow Gentle** (Kid-friendly):
  - Cycles through calming colors slowly
  - Purple → Blue → Teal → Yellow → Orange → White

#### Screen Features
- Fullscreen mode (max light coverage)
- Landscape or portrait orientation
- Brightness from 0% to 100% using CSS filters and overlays
- Optional: Wake Lock API to prevent screen dimming

#### Visual Enhancements
- **Animated Elements** (optional, can be toggled off):
  - Slowly growing sun in center
  - Floating clouds drifting across
  - Stars fading out as light increases
  - Birds flying across (synced with bird sounds)
  - Gentle pulsing glow (breathing rhythm)

- **Time Display**:
  - Large clock showing current time
  - Shows "Wake time: 7:00 AM"
  - Countdown or progress indicator

### User Experience Flow

#### Setup Screen (Parent)
```
┌─────────────────────────────┐
│   🌅 Slow Wake Timer        │
├─────────────────────────────┤
│                             │
│ Wake Time:  [7:00 AM  ▼]   │
│                             │
│ Duration:   [● 10 min]      │
│             [  5 min ]      │
│             [ 15 min ]      │
│             [ Custom ]      │
│                             │
│ Sound:      [Morning Birds ▼]│
│ Max Volume: [━━━━━━━━─] 70% │
│                             │
│ Visual:     [Sunrise Sim. ▼]│
│                             │
│ [Preview 30s] [Start Timer] │
└─────────────────────────────┘
```

#### During Wake (Child View)
```
┌─────────────────────────────┐
│        🌄                   │
│   (Animated sunrise)        │
│                             │
│      7:00 AM                │
│                             │
│   (Gentle animations)       │
│                             │
│                             │
│  [I'm Awake!] [Snooze 5min] │
└─────────────────────────────┘
```

#### Preview Mode
- 30-second compressed version of full wake
- Lets parents test sound/visual combo before use
- Helps kids familiarize with the experience

### Technical Implementation

#### Audio System
```javascript
// Use Web Audio API for precise control
class SlowWakeAudio {
  - generateBirdChirps() - procedural bird sounds
  - generateOceanWaves() - rhythmic wave sounds
  - generatePiano() - gentle piano notes
  - setVolume(percentage) - smooth volume ramping
  - fadeIn(duration, curve) - volume curve control
}
```

**Key Features**:
- Use `GainNode` for precise volume control
- `OscillatorNode` for pure tones (birds, piano)
- `BiquadFilterNode` for natural sound filtering
- `StereoPannerNode` for spatial effects (birds moving L-R)

#### Visual System
```javascript
class SlowWakeVisual {
  - sunriseGradient(progress) - color interpolation
  - animateSun(progress) - growing sun element
  - updateBrightness(progress) - screen brightness
  - renderAnimations(progress) - optional animations
}
```

**Key Features**:
- CSS gradients for background transitions
- Canvas for animated elements (optional)
- CSS filters for brightness: `filter: brightness(X%)`
- Fullscreen API for immersive experience
- Wake Lock API to prevent screen sleep

#### Timer Core
```javascript
class SlowWakeTimer {
  - start(duration, config)
  - pause()
  - resume()
  - stop()
  - getProgress() - returns 0-100%
  - onTick(callback) - fires every 100ms
}
```

**Progress Calculation**:
```javascript
progress = (elapsedTime / totalDuration) * 100
audioVolume = applyVolumeCurve(progress)
visualBrightness = applyBrightnessCurve(progress)
```

### Safety & Accessibility

#### Safety Features
- **Maximum Volume Cap**: Default 70%, never exceeds 85% (hearing protection)
- **Brightness Limit**: Option to cap at 80% for photosensitivity
- **Emergency Stop**: Large "Stop" button always visible
- **Parent PIN**: Optional 4-digit PIN to prevent kids from stopping early
- **No Strobe Effects**: All transitions smooth (> 1 second) to avoid seizure triggers

#### Accessibility
- **Visual-Only Mode**: For deaf/hard-of-hearing children
- **Audio-Only Mode**: For blind/visually impaired children (screen off to save battery)
- **High Contrast Option**: For visual impairments
- **Large Touch Targets**: All buttons minimum 44x44px
- **Screen Reader Support**: Proper ARIA labels

### Integration with Existing Features

#### Reminders Integration
- Option to set "Slow Wake Reminder" instead of regular reminder
- Shows in reminders list with 🌅 icon
- Recurring wake times (school days vs weekends)

#### Quest Integration
- "Woke up on time" could be a daily quest (+10 XP)
- "Used slow wake 5 days in a row" achievement

#### Notes Integration
- "Morning notes" - What did you dream about?
- Quick mood check - How do you feel this morning?

### Parent Customization Dashboard

```
┌─────────────────────────────────┐
│  Slow Wake Settings             │
├─────────────────────────────────┤
│                                 │
│ Presets:                        │
│ [School Days]  [Weekends]       │
│ [Gentle Mode]  [Energy Mode]    │
│                                 │
│ School Days Preset:             │
│   Mon-Fri: 6:45 AM              │
│   Duration: 15 min              │
│   Sound: Morning Birds          │
│   Visual: Sunrise Simulation    │
│   [Edit] [Test] [Activate]      │
│                                 │
│ Advanced:                       │
│ [✓] Vibrate at end (if avail)  │
│ [✓] Show motivational quote    │
│ [ ] Require quiz to dismiss    │
│ [ ] Parent PIN protection      │
│                                 │
└─────────────────────────────────┘
```

### Child Experience Enhancements

#### Make It Fun
1. **Character Guide**: Optional animated character (sun, bird, cloud) that "wakes up" with them
2. **Morning Affirmations**: Display positive messages as light increases
   - "Today is going to be amazing!"
   - "You are loved and capable!"
   - "Good morning, sunshine!"
3. **Weather Integration**: Show today's weather with animations
4. **Streak Counter**: "You've woken up gently 7 days in a row! 🌟"

#### Gamification
- **Wake Score**: Rate based on how quickly they dismiss vs snooze
- **Morning Mood**: Choose emoji for how they feel (tracks patterns)
- **Unlock Rewards**: New wake sounds/visuals after using feature X times

### Scientific Backing

#### Why This Works
1. **Cortisol Awakening Response (CAR)**:
   - Natural cortisol spike occurs 30-45 min after waking
   - Jarring alarms cause additional cortisol spike (double stress)
   - Gradual wake reduces this secondary spike

2. **Light & Circadian Rhythm**:
   - Blue light suppresses melatonin
   - Gradual light (especially warm tones) signals natural wake
   - Mimics sunrise, which our bodies evolved with

3. **Sound Frequency**:
   - Nature sounds (pink noise, birdsong) are processing-friendly
   - Frequencies between 200-2000 Hz are most naturally waking
   - Gradual volume allows auditory cortex to activate smoothly

4. **Reduced Amygdala Activation**:
   - Sudden alarms trigger fight-or-flight
   - Gradual wake keeps amygdala calm
   - Child wakes in parasympathetic (rest) state, not sympathetic (stress)

### Development Phases

#### Phase 1: Core Functionality
- Basic timer with duration selection
- Simple audio (one procedural sound - piano)
- Simple visual (black to white fade)
- Start/Stop controls

#### Phase 2: Sound Library
- Add 5 procedural sounds (birds, ocean, piano, xylophone, rain)
- Implement volume curves
- Add preview mode

#### Phase 3: Visual Enhancements
- Sunrise gradient colors
- Animated sun element
- Fullscreen mode
- Wake Lock API

#### Phase 4: Customization
- Presets (school days, weekends)
- Max volume control
- Visual options
- Save preferences

#### Phase 5: Integration & Polish
- Reminder integration
- Quest integration
- Gamification (streaks, mood tracking)
- Advanced features (PIN, quotes, character)

---

## Technical Challenges & Solutions

### Challenge 1: Browser Background Behavior
**Problem**: Browsers may throttle JavaScript when app is in background
**Solution**:
- Use Wake Lock API to keep app active
- Fallback to Web Worker for timer precision
- Notification API to show wake notification

### Challenge 2: Audio Permission
**Problem**: iOS/browsers block autoplay
**Solution**:
- Require user interaction to start timer (button press)
- Show clear permission prompts
- Graceful fallback to visual-only if audio blocked

### Challenge 3: Battery Drain
**Problem**: Fullscreen + audio for 15 min = significant battery use
**Solution**:
- Recommend keeping device plugged in (show reminder)
- Reduce animation complexity on low battery
- Option for "low power mode" (static gradient, no animations)

### Challenge 4: Accidental Dismissal
**Problem**: Kids might tap "stop" while half-asleep
**Solution**:
- "Are you sure?" confirmation
- Optional parent PIN
- Snooze button more prominent than stop
- Swipe gesture to dismiss (intentional action)

---

## Success Metrics

### For Parents:
- Child wakes up calmer (subjective feedback)
- Reduced morning resistance/tantrums
- Consistent wake times
- Feature used 5+ times per week

### For Children:
- Report liking the wake experience
- Choose to use it voluntarily
- Feel more rested upon waking
- Morning mood improves

---

## Future Enhancements (v0.7+)

- Smart wake: Analyze sleep cycle, wake during light sleep window
- Apple Health / sleep tracker integration
- Multiple child profiles (different preferences per kid)
- Seasonal variations (longer winter wakes with warmer tones)
- Story mode: Gentle story narration that builds to "time to wake up!"
- Parent voice recording: "Good morning sweetie" in parent's voice
- Smart home integration: Trigger real sunrise lamps, smart blinds
- Bedtime counterpart: Slow sleep timer (reverse - fade to dark)

---

## Questions for Parent User Testing

1. What time does your child usually wake up?
2. How difficult is it to wake them currently? (1-10 scale)
3. What sounds does your child find most calming?
4. What's your child's favorite color?
5. Does your child sleep with door open or closed?
6. Would you keep device in room or nearby?
7. What would make this feature feel trustworthy to you?
8. What would make your child excited to use this?

---

## Development Timeline Estimate

- **Planning & Design**: ✓ Complete
- **Phase 1 (Core)**: 2-3 hours
- **Phase 2 (Audio)**: 3-4 hours
- **Phase 3 (Visual)**: 2-3 hours
- **Phase 4 (Customization)**: 2-3 hours
- **Phase 5 (Integration)**: 2-3 hours
- **Testing & Polish**: 2 hours

**Total**: ~15-20 hours of development

---

## Let's Build! 🌅

Ready to implement when you are. We'll start with Phase 1 to get a working prototype, then iterate based on your feedback.
