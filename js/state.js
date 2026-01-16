// --- STATE MANAGEMENT ---
const defaultState = {
    activePlayerId: 1,
    teamXP: 20,
    teamGoal: 100,
    players: [
        { id: 1, name: "Leo", initials: "LE" },
        { id: 2, name: "Mia", initials: "MI" },
        { id: 3, name: "Noah", initials: "NO" },
        { id: 4, name: "Add", initials: "+" }
    ],
    completedQuests: [],
    favorites: [],
    currentSparkIndex: 0
};

// Load state from localStorage or use default
const state = storage.load('state', defaultState);

// Save state helper
function saveState() {
    storage.save('state', state);
}
