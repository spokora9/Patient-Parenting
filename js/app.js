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

    state.reminders.forEach(reminder => {
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
    });
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

    // Render initial view
    render('spark');
});
