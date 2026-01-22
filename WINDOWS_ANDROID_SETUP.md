# Android Setup Guide for Windows

This guide helps you set up the Patient Parenting app for Android development on Windows.

## Prerequisites

You need:
1. ✅ Node.js (v16 or higher)
2. ✅ Android Studio
3. ❌ Java Development Kit (JDK) - **MISSING**
4. ❌ Environment variables configured - **MISSING**

## Step 1: Install Dependencies

Open PowerShell in the project root directory and run:

```powershell
# Navigate to project directory
cd C:\Users\Sebastian\StudioProjects\Patient-Parenting

# Install all npm dependencies (including Capacitor)
npm install
```

This will install:
- Capacitor CLI
- Capacitor Android platform
- Capacitor Core
- Screen brightness plugin

## Step 2: Set Up Java (JAVA_HOME)

Android Studio comes with a JDK, but you need to tell Windows where it is.

### Option A: Use Android Studio's JDK (Recommended)

1. **Find Android Studio's JDK location:**
   - Open Android Studio
   - Go to: **File → Settings → Build, Execution, Deployment → Build Tools → Gradle**
   - Look for "Gradle JDK" - it will show a path like:
     ```
     C:\Program Files\Android\Android Studio\jbr
     ```
   - Copy this path

2. **Set JAVA_HOME environment variable:**
   - Press `Windows + R`, type `sysdm.cpl`, press Enter
   - Click **"Environment Variables"** button
   - Under **"System variables"**, click **"New"**
   - Variable name: `JAVA_HOME`
   - Variable value: Paste the JDK path (e.g., `C:\Program Files\Android\Android Studio\jbr`)
   - Click **OK**

3. **Add to PATH:**
   - In the same "System variables" section, find **"Path"**
   - Click **"Edit"**
   - Click **"New"**
   - Add: `%JAVA_HOME%\bin`
   - Click **OK** on all windows

4. **Verify installation:**
   - **Close all PowerShell windows** (important!)
   - Open a new PowerShell window
   - Run:
     ```powershell
     java -version
     ```
   - You should see Java version information

### Option B: Install JDK Separately

If Android Studio's JDK doesn't work, download JDK 17:

1. Download from: https://adoptium.net/temurin/releases/?version=17
2. Install to: `C:\Program Files\Java\jdk-17`
3. Set `JAVA_HOME` to: `C:\Program Files\Java\jdk-17`
4. Add to PATH: `%JAVA_HOME%\bin`

## Step 3: Set Up Android SDK Environment Variables

1. **Find Android SDK location:**
   - Open Android Studio
   - Go to: **File → Settings → Appearance & Behavior → System Settings → Android SDK**
   - Look for "Android SDK Location" - it will show a path like:
     ```
     C:\Users\Sebastian\AppData\Local\Android\Sdk
     ```
   - Copy this path

2. **Set ANDROID_HOME:**
   - Press `Windows + R`, type `sysdm.cpl`, press Enter
   - Click **"Environment Variables"**
   - Under **"System variables"**, click **"New"**
   - Variable name: `ANDROID_HOME`
   - Variable value: Paste the SDK path
   - Click **OK**

3. **Add Android tools to PATH:**
   - Find **"Path"** in System variables
   - Click **"Edit"**
   - Add these entries:
     ```
     %ANDROID_HOME%\platform-tools
     %ANDROID_HOME%\tools
     %ANDROID_HOME%\tools\bin
     ```
   - Click **OK** on all windows

## Step 4: Sync Capacitor

**Close all PowerShell/terminal windows**, then open a new one:

```powershell
# Navigate to project
cd C:\Users\Sebastian\StudioProjects\Patient-Parenting

# Verify npm is working
npm --version

# Sync Capacitor to create Android files
npx cap sync android
```

You should see:
```
✔ Copying web assets...
✔ Creating capacitor.config.json...
✔ copy android
✔ Updating Android plugins
[info] Found 1 Capacitor plugin for android:
       @capacitor-community/screen-brightness@8.0.0
✔ update android
✔ Sync finished
```

## Step 5: Open in Android Studio

**Important:** Open only the `android` folder, not the root project!

```powershell
# Option 1: Use Capacitor CLI
npx cap open android

# Option 2: Manual
# 1. Open Android Studio
# 2. File → Open
# 3. Navigate to: C:\Users\Sebastian\StudioProjects\Patient-Parenting\android
# 4. Click OK
```

## Step 6: Build the App

1. Wait for Android Studio to finish syncing Gradle (bottom status bar)
2. If prompted to "Trust Gradle Project", click **Trust**
3. Click **Build → Make Project** (or press `Ctrl+F9`)
4. Wait for build to complete

## Step 7: Run on Device/Emulator

1. **Option A - Physical Device:**
   - Enable Developer Options on your Android phone
   - Enable USB Debugging
   - Connect via USB
   - Select your device in Android Studio
   - Click Run ▶️

2. **Option B - Emulator:**
   - Click **Device Manager** in Android Studio
   - Create a new virtual device (Pixel 6, Android 13 recommended)
   - Start the emulator
   - Click Run ▶️

## Common Errors and Fixes

### Error: "npx: command not found"
**Cause:** Node.js not installed or not in PATH

**Fix:**
1. Download Node.js from: https://nodejs.org/ (LTS version)
2. Install it
3. Restart PowerShell
4. Verify: `node --version` and `npm --version`

### Error: "JAVA_HOME is not set"
**Cause:** See Step 2 above

**Fix:**
1. Set JAVA_HOME environment variable
2. **Close all PowerShell windows**
3. Open new PowerShell
4. Verify: `java -version`

### Error: "could not determine executable to run"
**Cause:** Capacitor CLI not installed

**Fix:**
```powershell
npm install
```

### Error: "SDK location not found"
**Cause:** ANDROID_HOME not set

**Fix:**
1. Set ANDROID_HOME environment variable (Step 3)
2. Restart Android Studio

### Error: "capacitor-cordova-android-plugins/cordova.variables.gradle does not exist"
**Cause:** Need to run `npx cap sync android`

**Fix:**
```powershell
npx cap sync android
```

### Error: Gradle build fails with plugin errors
**Fix:**
```powershell
cd android
./gradlew clean
cd ..
npx cap sync android
```

## Verification Checklist

Before building, verify all these commands work:

```powershell
# Check Node.js
node --version   # Should show v16 or higher

# Check npm
npm --version    # Should show 8 or higher

# Check Java
java -version    # Should show version 11, 17, or higher

# Check Android tools
adb --version    # Should show Android Debug Bridge version
```

## Quick Reference

**Sync changes to Android:**
```powershell
npm run sync:android
```

**Open Android Studio:**
```powershell
npm run open:android
```

**Build and run:**
```powershell
npm run run:android
```

**Clean build:**
```powershell
cd android
./gradlew clean
cd ..
npm run sync:android
```

## Need More Help?

- Android Studio setup: https://developer.android.com/studio/install
- Capacitor docs: https://capacitorjs.com/docs/android
- JDK installation: https://adoptium.net/

## Summary

The key steps are:
1. ✅ Install Node.js and npm
2. ✅ Run `npm install` in project root
3. ✅ Set JAVA_HOME environment variable
4. ✅ Set ANDROID_HOME environment variable
5. ✅ Close and reopen PowerShell
6. ✅ Run `npx cap sync android`
7. ✅ Open only `android` folder in Android Studio
8. ✅ Build and run!

---

**Last Updated:** 2026-01-22
