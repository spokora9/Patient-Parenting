// --- MAIN APP INITIALIZATION ---

// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('ServiceWorker registration successful:', registration.scope);
            })
            .catch((error) => {
                console.log('ServiceWorker registration failed:', error);
            });
    });
}

// Check for due reminders
function checkReminders() {
    if (!state.reminders || state.reminders.length === 0) return;

    const now = new Date();
    const notifiedKey = 'notified_reminders';
    const notified = JSON.parse(localStorage.getItem(notifiedKey) || '[]');
    let needsSave = false;

    state.reminders.forEach((reminder, index) => {
        const reminderTime = new Date(reminder.dateTime);
        const timeDiff = reminderTime - now;

        // Notify if within 5 minutes and not already notified
        if (timeDiff > 0 && timeDiff <= 5 * 60 * 1000 && !notified.includes(reminder.id)) {
            if ('Notification' in window && Notification.permission === 'granted') {
                new Notification('⏰ Reminder: ' + reminder.title, {
                    body: `Scheduled for ${reminderTime.toLocaleString()}`,
                    icon: '/manifest.json',
                    badge: '/manifest.json'
                });
                notified.push(reminder.id);
                localStorage.setItem(notifiedKey, JSON.stringify(notified));
            }
        }

        // Handle recurring reminders - create next instance if reminder has passed
        if (reminder.recurrence && timeDiff < 0) {
            const nextDate = new Date(reminderTime);

            // Calculate next occurrence based on recurrence pattern
            if (reminder.recurrence === 'daily') {
                nextDate.setDate(nextDate.getDate() + 1);
            } else if (reminder.recurrence === 'weekly') {
                nextDate.setDate(nextDate.getDate() + 7);
            } else if (reminder.recurrence === 'monthly') {
                nextDate.setMonth(nextDate.getMonth() + 1);
            }

            // Only create next instance if it's in the future
            if (nextDate > now) {
                // Update the reminder with the next occurrence
                reminder.dateTime = nextDate.toISOString().slice(0, 16) + ':00';
                reminder.id = 'rem-' + Date.now() + '-' + index; // New ID for new instance
                // Remove from notified list so it can notify again
                const notifiedIndex = notified.indexOf(reminder.id);
                if (notifiedIndex > -1) {
                    notified.splice(notifiedIndex, 1);
                    localStorage.setItem(notifiedKey, JSON.stringify(notified));
                }
                needsSave = true;
            }
        }
    });

    if (needsSave) {
        saveState();
    }
}

// Check for daily spark notification
function checkSparkNotification() {
    // Initialize if not exists
    if (!state.sparkNotifications) {
        state.sparkNotifications = { enabled: false, time: '09:00', lastNotified: null };
    }

    // Return if notifications are disabled
    if (!state.sparkNotifications.enabled) return;

    const now = new Date();
    const today = now.toDateString();

    // Check if we already notified today
    if (state.sparkNotifications.lastNotified === today) return;

    // Parse the notification time
    const [hours, minutes] = state.sparkNotifications.time.split(':').map(Number);
    const notificationTime = new Date();
    notificationTime.setHours(hours, minutes, 0, 0);

    // Check if current time is past notification time (within 5 minutes window)
    const timeDiff = now - notificationTime;
    if (timeDiff >= 0 && timeDiff <= 5 * 60 * 1000) {
        // Send notification
        if ('Notification' in window && Notification.permission === 'granted') {
            const notification = new Notification('✨ Your Daily Spark Cards Are Ready!', {
                body: '3 new parenting tips and activities await. Tap to explore!',
                icon: '/manifest.json',
                badge: '/manifest.json',
                tag: 'daily-spark-cards',
                requireInteraction: false
            });

            // Track engagement: navigate to spark cards when clicked
            notification.onclick = () => {
                window.focus();
                router.navigate('spark');
                notification.close();
            };

            // Mark as notified today
            state.sparkNotifications.lastNotified = today;
            saveState();
        }
    }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    // Auto-reset daily quests if it's a new day
    checkAndResetDailyQuests();

    // Apply dark mode if enabled
    applyDarkMode();

    // Check for due reminders every minute
    checkReminders();
    setInterval(checkReminders, 60 * 1000);

    // Check for daily spark notification every minute
    checkSparkNotification();
    setInterval(checkSparkNotification, 60 * 1000);

    // Render initial view
    render('spark');
});
