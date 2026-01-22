# Android Build Fix

## Problem Fixed ✅

The error you encountered:
```
Could not read script 'capacitor-cordova-android-plugins\cordova.variables.gradle'
as it does not exist.
```

This happened because the `capacitor-cordova-android-plugins` directory wasn't synced to your local clone.

## Solution

I've run `npx cap sync android` which created the missing directory with all required files:
- ✅ `android/capacitor-cordova-android-plugins/build.gradle`
- ✅ `android/capacitor-cordova-android-plugins/cordova.variables.gradle`
- ✅ `android/capacitor-cordova-android-plugins/src/`

## Try Building Again

### In Android Studio:
1. **File → Sync Project with Gradle Files**
2. **Build → Clean Project**
3. **Build → Rebuild Project**
4. Click **Run** (green play button)

### Or via Command Line:
```bash
cd android
./gradlew clean
./gradlew assembleDebug
```

---

## If Still Having Issues

### Issue 1: Gradle Sync Failed

**Error:** `Plugin with id 'com.android.application' not found`

**Fix:**
```bash
cd android
./gradlew wrapper --gradle-version 8.2
```

### Issue 2: SDK Location Not Found

**Error:** `SDK location not found`

**Fix:** Create `android/local.properties`:
```
sdk.dir=C:\\Users\\YOUR_USERNAME\\AppData\\Local\\Android\\Sdk
```
(Replace with your actual Android SDK path)

### Issue 3: Build Tools Version

**Error:** `Failed to find Build Tools revision X.X.X`

**Fix:** In Android Studio:
1. Tools → SDK Manager
2. SDK Tools tab
3. Install latest "Android SDK Build-Tools"

### Issue 4: Java Version

**Error:** `Unsupported class file major version`

**Fix:** Make sure you're using Java 17:
1. File → Project Structure → SDK Location
2. Set JDK to Java 17
3. Or download from: https://adoptium.net/

---

## Verify It's Working

Once the build succeeds, you should see:
```
BUILD SUCCESSFUL in Xs Xs
```

And the app will launch on your connected device/emulator!

---

## Test Native Brightness

1. Open the app on your Android device
2. Navigate to Slow Wake Timer
3. Start the timer
4. **Watch your screen brightness maximize!**
5. Check Android Studio Logcat for:
   ```
   [Brightness] Native: 0.50 → 1.0 (max)
   [Wake] Native brightness control activated
   ```

---

## Alternative: Run from Command Line

If Android Studio continues to have issues:

```bash
# From project root
npm run sync:android

# Connect Android device with USB debugging enabled
# Or start Android emulator

npm run run:android
```

This will build and install the app directly!

---

## Need More Help?

If you still encounter errors:
1. Share the full error message
2. Check Android Studio → View → Tool Windows → Build
3. Look at Logcat for detailed logs
4. Make sure Android SDK is properly installed

The native brightness control is ready and waiting! 📱💡
