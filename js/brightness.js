/**
 * Brightness Control Module
 *
 * Provides unified interface for controlling screen brightness
 * - Native control on iOS/Android (via Capacitor)
 * - Fallback to Web API (Wake Lock + white screen) on web
 */

let originalBrightness = null;
let isNativeAvailable = false;

// Check if running in Capacitor native app
async function checkNativeAvailability() {
    if (typeof Capacitor !== 'undefined' && Capacitor.isNativePlatform()) {
        // Import the plugin only if in native context
        try {
            await import('@capacitor-community/screen-brightness');
            isNativeAvailable = true;
            console.log('[Brightness] Native brightness control available');
            return true;
        } catch (err) {
            console.log('[Brightness] Failed to load native plugin:', err);
            isNativeAvailable = false;
            return false;
        }
    }
    console.log('[Brightness] Running in web mode');
    return false;
}

/**
 * Set screen brightness to maximum
 * @returns {Promise<boolean>} True if successful
 */
async function setMaxBrightness() {
    // Try native control first
    if (isNativeAvailable || await checkNativeAvailability()) {
        try {
            const { ScreenBrightness } = await import('@capacitor-community/screen-brightness');

            // Save original brightness
            const result = await ScreenBrightness.getBrightness();
            originalBrightness = result.brightness;

            // Set to maximum (1.0)
            await ScreenBrightness.setBrightness({ brightness: 1.0 });

            console.log(`[Brightness] Native: ${originalBrightness.toFixed(2)} → 1.0 (max)`);
            return true;
        } catch (err) {
            console.error('[Brightness] Native brightness control failed:', err);
            isNativeAvailable = false;
        }
    }

    // Fallback: Web API (Wake Lock is already handled in slowwake.js)
    console.log('[Brightness] Using web fallback (white screen + Wake Lock)');
    return false;
}

/**
 * Restore original screen brightness
 * @returns {Promise<boolean>} True if successful
 */
async function restoreBrightness() {
    if (isNativeAvailable && originalBrightness !== null) {
        try {
            const { ScreenBrightness } = await import('@capacitor-community/screen-brightness');
            await ScreenBrightness.setBrightness({ brightness: originalBrightness });

            console.log(`[Brightness] Native: restored to ${originalBrightness.toFixed(2)}`);
            originalBrightness = null;
            return true;
        } catch (err) {
            console.error('[Brightness] Failed to restore brightness:', err);
        }
    }

    console.log('[Brightness] Web mode - brightness controlled by UI');
    return false;
}

/**
 * Get current brightness level
 * @returns {Promise<number|null>} Brightness level (0.0-1.0) or null if unavailable
 */
async function getBrightness() {
    if (isNativeAvailable) {
        try {
            const { ScreenBrightness } = await import('@capacitor-community/screen-brightness');
            const result = await ScreenBrightness.getBrightness();
            return result.brightness;
        } catch (err) {
            console.error('[Brightness] Failed to get brightness:', err);
        }
    }
    return null;
}

/**
 * Check if native brightness control is available
 * @returns {boolean}
 */
function isNative() {
    return isNativeAvailable;
}

// Initialize on load
checkNativeAvailability().catch(() => {
    console.log('[Brightness] Initialization check complete');
});
