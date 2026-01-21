# Native App Setup Guide

Patient Parenting now supports **native iOS and Android apps** with full hardware control!

## 🎯 Native Features

### ✅ Currently Implemented

1. **Screen Brightness Control**
   - Hardware brightness control (0.0 - 1.0)
   - Saves and restores user's brightness
   - Maximizes brightness during wake cycle
   - Auto-fallback to web API if unavailable

2. **Wake Lock**
   - Prevents screen from sleeping
   - Works on both web and native

3. **Fullscreen Mode**
   - Maximizes display area
   - Automatic on wake timer start

### 🔜 Coming Soon

- Push notifications for wake timers
- Background audio (birds continue when app in background)
- Haptic feedback
- System integration (iOS Control Center, Android Quick Settings)

---

## 📱 Building Native Apps

### Prerequisites

**For iOS:**
- macOS with Xcode 15+ installed
- iOS Simulator or physical device
- Apple Developer account (for device testing)

**For Android:**
- Android Studio installed
- Android SDK configured
- Android device or emulator

### Quick Start

```bash
# 1. Build web assets
npm run build

# 2. Sync with native platforms
npm run sync

# 3. Open in Xcode (iOS)
npm run open:ios

# 3. Or open in Android Studio
npm run open:android
```

---

## 🍎 iOS Configuration

### Open Project in Xcode

```bash
npm run open:ios
```

### Required Permissions

The app already includes necessary permissions in `Info.plist`:

- **Camera/Microphone**: Not required currently
- **Background Modes**: Will be added for background audio
- **Notifications**: Will be added for wake reminders

### Building for Device

1. Open `ios/App/App.xcworkspace` in Xcode
2. Select your development team (Xcode → Preferences → Accounts)
3. Change bundle identifier if needed: `com.parentarchitect.app`
4. Select your target device
5. Click "Run" (▶️)

### App Store Preparation

1. Update version in `capacitor.config.json`
2. Build for release: Product → Archive
3. Upload to App Store Connect

---

## 🤖 Android Configuration

### Open Project in Android Studio

```bash
npm run open:android
```

### Required Permissions

Edit `android/app/src/main/AndroidManifest.xml`:

```xml
<!-- Already included -->
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.WRITE_SETTINGS" />

<!-- For future features -->
<uses-permission android:name="android.permission.POST_NOTIFICATIONS" />
<uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
<uses-permission android:name="android.permission.WAKE_LOCK" />
```

### Building APK

```bash
cd android
./gradlew assembleDebug

# APK will be at: android/app/build/outputs/apk/debug/app-debug.apk
```

### Play Store Preparation

```bash
cd android
./gradlew bundleRelease

# AAB will be at: android/app/build/outputs/bundle/release/app-release.aab
```

---

## 🔧 Development Workflow

### 1. Make Changes to Web Code

Edit files in:
- `index.html`
- `js/*.js`
- `css/*.css`
- etc.

### 2. Sync Changes

```bash
# Sync all platforms
npm run sync

# Or sync specific platform
npm run sync:ios
npm run sync:android
```

### 3. Test on Device/Simulator

```bash
# iOS
npm run run:ios

# Android
npm run run:android
```

### 4. Test Native Features

**Brightness Control:**
- Start slow wake timer
- Check console: `[Brightness] Native: 0.50 → 1.0 (max)`
- Device brightness should maximize
- On stop, brightness should restore

**Wake Lock:**
- Screen stays on during entire wake cycle
- No auto-sleep or dim

---

## 🐛 Troubleshooting

### iOS Build Fails

**Error:** "No development team selected"
- **Fix:** Xcode → Preferences → Accounts → Add Apple ID

**Error:** "Could not locate device support files"
- **Fix:** Update Xcode to latest version

### Android Build Fails

**Error:** "SDK location not found"
- **Fix:** Set `ANDROID_HOME` environment variable
  ```bash
  export ANDROID_HOME=$HOME/Android/Sdk
  ```

**Error:** "Gradle version incompatible"
- **Fix:** Update gradle: `cd android && ./gradlew wrapper --gradle-version 8.0`

### Brightness Not Working

**Check Console:**
```
[Brightness] Native brightness control available  ✓ Good
[Brightness] Running in web mode                   ✓ Expected (browser)
[Brightness] Failed to load native plugin         ✗ Check installation
```

**Fix:** Run `npm run sync` to update native apps

---

## 📊 Native vs Web Comparison

| Feature | Web/PWA | iOS Native | Android Native |
|---------|---------|------------|----------------|
| Hardware brightness | ❌ | ✅ | ✅ |
| Wake Lock | ✅ | ✅ | ✅ |
| Background audio | ⚠️ Limited | ✅ | ✅ |
| Push notifications | ⚠️ Limited | ✅ | ✅ |
| Haptics | ❌ | ✅ | ✅ |
| App Store | ❌ | ✅ | ✅ |
| Offline | ✅ | ✅ | ✅ |
| WASM | ✅ | ✅ | ✅ |

---

## 📝 Code Integration

### Using Native Brightness

The brightness module automatically detects native vs web:

```javascript
// In your code
await setMaxBrightness();  // Auto-detects native/web
await restoreBrightness(); // Restores original

// Check if native
if (isNative()) {
    console.log('Running in native app!');
}
```

### Capacitor Platform Detection

```javascript
import { Capacitor } from '@capacitor/core';

if (Capacitor.isNativePlatform()) {
    // Native iOS/Android
    console.log('Platform:', Capacitor.getPlatform());
} else {
    // Web browser
    console.log('Running in browser');
}
```

---

## 🚀 Next Steps

1. **Test native brightness** on physical device
2. **Add background audio** for wake timer
3. **Implement push notifications** for scheduled wakes
4. **Add haptic feedback** for user interactions
5. **Submit to App Store / Play Store**

---

## 📚 Resources

- [Capacitor Documentation](https://capacitorjs.com/docs)
- [iOS Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [Android Design Guidelines](https://developer.android.com/design)
- [Screen Brightness Plugin](https://github.com/capacitor-community/screen-brightness)

---

## 🎉 You're Ready!

Your app now has:
- ✅ Native iOS project ready
- ✅ Native Android project ready
- ✅ Brightness control implemented
- ✅ Build scripts configured
- ✅ Progressive enhancement (works everywhere)

Run `npm run open:ios` or `npm run open:android` to get started!
