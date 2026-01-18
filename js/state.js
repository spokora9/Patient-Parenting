// --- STATE MANAGEMENT ---
const defaultState = {
    activePlayerId: 1,
    teamXP: 20,
    teamGoal: 100,
    players: [
        { id: 1, name: "Leo", initials: "LE", color: "#FF7675", avatar: "🦁" },
        { id: 2, name: "Mia", initials: "MI", color: "#74B9FF", avatar: "🦋" },
        { id: 3, name: "Noah", initials: "NO", color: "#55EFC4", avatar: "🌟" },
        { id: 4, name: "Add", initials: "+", color: "#dfe6e9", avatar: "➕" }
    ],
    customQuests: [
        { id: 'q1', title: 'Clear Dinner Table', xp: 10, recurring: true, completed: false },
        { id: 'q2', title: '20 Mins Reading', xp: 20, recurring: true, completed: false },
        { id: 'q3', title: 'Brush Teeth (No fuss)', xp: 5, recurring: true, completed: false }
    ],
    completedQuests: [],
    favorites: [],
    scriptFavorites: [],
    currentSparkIndex: 0,
    questMode: 'co-op', // 'co-op' or 'solo'
    rewards: [
        { id: 'r1', title: 'Movie Night', cost: 100, redeemed: false, icon: '🎬' },
        { id: 'r2', title: 'Extra 30 Mins Screen Time', cost: 50, redeemed: false, icon: '📱' },
        { id: 'r3', title: 'Choose Dinner', cost: 75, redeemed: false, icon: '🍕' }
    ],
    redeemedRewards: [],
    lastQuestReset: null, // Track last time daily quests were reset
    darkMode: false, // Dark mode preference
    notes: {
        village: '',
        upcoming: '',
        general: ''
    },
    reminders: [],
    tasks: []
};

// Load state from localStorage or use default
const state = storage.load('state', defaultState);

// Save state helper
function saveState() {
    storage.save('state', state);
}
