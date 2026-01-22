# Vercel Deployment Guide

This guide explains how to deploy Parent Architect to Vercel while maintaining Capacitor native app development locally.

## The Problem

After adding Capacitor for native iOS/Android apps, Vercel builds were failing because:

1. **Capacitor dependencies** tried to install native tooling (Xcode, Android SDK) not available on Vercel
2. **Build scripts** assumed native directories (`www/`, `ios/`, `android/`) existed
3. **Unnecessary files** were being processed during web deployment

## The Solution

We've separated **web deployment** (Vercel) from **native development** (local):

### 1. Package.json Changes

**Dependencies:**
- `@capacitor/core` stays in `dependencies` (needed for browser runtime checks)
- All other Capacitor packages moved to `devDependencies` (only needed for local native builds)

**Build Scripts:**
```json
{
  "build": "echo 'Web build complete'",           // Vercel uses this
  "vercel-build": "echo 'Vercel build complete'", // Vercel fallback
  "build:native": "mkdir -p www && cp ...",       // Local native builds
  "sync": "npm run build:native && npx cap sync"  // Local native sync
}
```

### 2. New Files

**`.vercelignore`** - Excludes native directories:
- `ios/` - iOS Xcode project
- `android/` - Android Studio project
- `www/` - Capacitor web assets (not needed, Vercel serves root)
- `audio-engine/` - Rust source (WASM already compiled)

**`vercel.json`** - Deployment configuration:
- Static build setup
- Service Worker headers
- WASM content-type headers
- Audio file caching

## Deployment Workflow

### Deploying to Vercel (Web)

```bash
# Vercel automatically runs 'npm run build' or 'npm run vercel-build'
# No manual steps needed - just push to GitHub

git push origin main
```

Vercel will:
1. Clone your repo
2. Install only production dependencies (`@capacitor/core`)
3. Run `npm run build` (which does nothing - static files already in repo)
4. Serve files from root directory
5. Skip all native app stuff

### Building Native Apps Locally

```bash
# iOS
npm run sync:ios      # Build and sync web assets
npm run open:ios      # Open in Xcode

# Android
npm run sync:android  # Build and sync web assets
npm run open:android  # Open in Android Studio

# Or run directly
npm run run:ios
npm run run:android
```

## What Gets Deployed to Vercel

**Included:**
- ✅ `index.html` - Main app
- ✅ `manifest.json` - PWA manifest
- ✅ `sw.js` - Service worker
- ✅ `js/` - All JavaScript files
- ✅ `audio/` - Bird sounds, classical music
- ✅ `wasm/` - Compiled Rust audio engine
- ✅ `assets/` - Images, icons

**Excluded (via `.vercelignore`):**
- ❌ `ios/` - Native iOS project
- ❌ `android/` - Native Android project
- ❌ `www/` - Capacitor build output
- ❌ `audio-engine/` - Rust source code
- ❌ `.capacitor/` - Capacitor cache

## Testing

### Test Web Build Locally

```bash
# Serve from root (simulates Vercel)
python3 -m http.server 8080
# or
npm start

# Visit http://localhost:8080
```

### Test Native Build

```bash
# Build native apps
npm run build:native  # Creates www/ with all assets
npm run sync          # Syncs to iOS and Android

# Open in IDE
npm run open:ios
npm run open:android
```

## Vercel Environment Variables

No environment variables needed! Everything is static.

## Troubleshooting

### Error: "Cannot find module @capacitor/cli"

**Cause:** Vercel is trying to run Capacitor commands.

**Fix:** Check that `sync`, `sync:ios`, `sync:android` are NOT in the `build` script.

### Error: "www/ directory not found"

**Cause:** Build script is trying to copy to `www/`.

**Fix:** Use `build:native` for local development, not `build`.

### Error: "Failed to install dependencies"

**Cause:** Capacitor dependencies are in `dependencies` instead of `devDependencies`.

**Fix:** Already fixed - check package.json shows Capacitor in `devDependencies`.

### Warning: "Service Worker not found"

**Cause:** Vercel might be caching old service worker.

**Fix:**
1. Update `CACHE_NAME` in `sw.js` (currently `v8.0`)
2. Clear browser cache
3. Hard refresh (Cmd+Shift+R or Ctrl+Shift+R)

## File Structure

```
Parent-Architect/
├── index.html              ✅ Deployed to Vercel
├── manifest.json           ✅ Deployed to Vercel
├── sw.js                   ✅ Deployed to Vercel
├── vercel.json             ✅ Vercel configuration
├── .vercelignore           ✅ Vercel exclusions
├── package.json            ✅ Deployed (for build script)
├── js/                     ✅ Deployed to Vercel
├── audio/                  ✅ Deployed to Vercel
├── wasm/                   ✅ Deployed to Vercel
├── assets/                 ✅ Deployed to Vercel
├── capacitor.config.json   ❌ Excluded from Vercel
├── www/                    ❌ Excluded from Vercel (local only)
├── ios/                    ❌ Excluded from Vercel (local only)
├── android/                ❌ Excluded from Vercel (local only)
└── audio-engine/           ❌ Excluded from Vercel (local only)
```

## Summary

- **Vercel** deploys the web PWA from root directory
- **Local development** uses `npm run sync` for native apps
- **No conflicts** between web and native workflows
- **Fast deploys** because Vercel skips native tooling

Your app works perfectly on both:
- 🌐 **Web/PWA** (Vercel) - https://your-app.vercel.app
- 📱 **Native Apps** (Local) - iOS and Android via Capacitor

## Next Steps

1. **Push to GitHub** - Vercel will auto-deploy
2. **Test web version** at your Vercel URL
3. **Build native apps** locally with `npm run sync`
4. **No changes needed** to your workflow!

---

**Need help?** Check the Vercel build logs at https://vercel.com/your-username/parent-architect/deployments
