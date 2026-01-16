// --- LOGIC & ACTIONS ---
const actions = {
    swipeCard: (direction) => {
        const currentIndex = state.currentSparkIndex || 0;
        const cards = getDailyCards();
        const currentCard = document.getElementById(`spark-card-${currentIndex}`);

        if (!currentCard || currentIndex >= cards.length) return;

        // Add swipe animation
        currentCard.classList.add(`swipe-${direction}`);

        // Save to favorites if swiped right
        if (direction === 'right') {
            const card = cards[currentIndex];
            if (!state.favorites.find(f => f.id === card.id)) {
                state.favorites.push(card);
            }
            audio.playTone('success');
        } else {
            audio.playTone('tap');
        }

        // Update state and re-render
        setTimeout(() => {
            state.currentSparkIndex = currentIndex + 1;
            saveState();
            render('spark');
            initSparkSwipe();
        }, 300);
    },
    resetSparkCards: () => {
        state.currentSparkIndex = 0;
        storage.save('daily_cards', null);
        saveState();
        render('spark');
        initSparkSwipe();
    },
    selectPlayer: (id) => {
        state.activePlayerId = id;
        saveState();
        audio.playTone('tap');
        render('quest');
    },
    completeTask: (xp) => {
        const oldXP = state.teamXP;
        const newXP = Math.min(state.teamXP + xp, state.teamGoal);
        state.teamXP = newXP;

        // Check if goal reached
        const goalReached = oldXP < state.teamGoal && newXP >= state.teamGoal;

        // Audio Reward
        audio.playTone('success');

        // Save progress
        saveState();

        // Re-render to show progress
        render('quest');

        // Celebrate if goal reached
        if (goalReached) {
            setTimeout(celebrateGoal, 300);
        }
    },
    resetGoal: () => {
        state.teamXP = 0;
        saveState();
        render('quest');
    },
    searchScripts: (query) => {
        state.scriptQuery = query;
        saveState();
        render('scripts');
    },
    exportData: () => {
        // Prepare export data
        const exportData = {
            version: '1.0',
            exportDate: new Date().toISOString(),
            state: state,
            activities: activityLibrary,
            dailyCards: storage.load('daily_cards', null)
        };

        // Convert to JSON
        const dataStr = JSON.stringify(exportData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });

        // Create download link
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `parent-architect-backup-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        audio.playTone('success');
    },
    importData: (fileInput) => {
        const file = fileInput.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importData = JSON.parse(e.target.result);

                // Validate data structure
                if (importData.version && importData.state) {
                    // Restore state
                    Object.assign(state, importData.state);
                    saveState();

                    // Restore daily cards if available
                    if (importData.dailyCards) {
                        storage.save('daily_cards', importData.dailyCards);
                    }

                    audio.playTone('success');
                    alert('Data imported successfully!');
                    render('headspace');
                } else {
                    throw new Error('Invalid data format');
                }
            } catch (error) {
                alert('Failed to import data. Please check the file format.');
                console.error('Import error:', error);
            }
        };
        reader.readAsText(file);
    },
    showAddQuestModal: () => {
        const title = prompt('Quest Title:', '');
        if (!title) return;

        const xp = prompt('XP Value:', '10');
        if (!xp) return;

        const quest = {
            id: 'q' + Date.now(),
            title: title.trim(),
            xp: parseInt(xp) || 10,
            recurring: true,
            completed: false
        };

        state.customQuests.push(quest);
        saveState();
        audio.playTone('success');
        render('quest');
    },
    completeQuest: (questId) => {
        const quest = state.customQuests.find(q => q.id === questId);
        if (!quest) return;

        const oldXP = state.teamXP;
        const newXP = Math.min(state.teamXP + quest.xp, state.teamGoal);
        state.teamXP = newXP;

        // Check if goal reached
        const goalReached = oldXP < state.teamGoal && newXP >= state.teamGoal;

        // Mark quest as completed
        quest.completed = true;
        state.completedQuests.push({
            questId: quest.id,
            timestamp: Date.now(),
            playerId: state.activePlayerId
        });

        // Audio Reward
        audio.playTone('success');

        // Save progress
        saveState();

        // Re-render to show progress
        render('quest');

        // Celebrate if goal reached
        if (goalReached) {
            setTimeout(celebrateGoal, 300);
        }
    },
    deleteQuest: (questId) => {
        if (confirm('Delete this quest?')) {
            state.customQuests = state.customQuests.filter(q => q.id !== questId);
            saveState();
            render('quest');
        }
    },
    updatePlayer: (playerId, field, value) => {
        const player = state.players.find(p => p.id === playerId);
        if (player) {
            player[field] = value;
            // Update initials if name changed
            if (field === 'name') {
                player.initials = value.substring(0, 2).toUpperCase();
            }
            saveState();
            audio.playTone('tap');
            render('settings');
        }
    },
    updateTeamGoal: (goal) => {
        state.teamGoal = goal || 100;
        saveState();
        audio.playTone('success');
        render('settings');
    }
};

const router = {
    navigate: (viewName) => {
        // Update Headers
        const titles = {
            'spark': ['The Daily Spark', 'Wisdom & Science.'],
            'quest': ['Family Quest', 'Co-op Mode Active.'],
            'scripts': ['Script Designer', 'What do I say?'],
            'headspace': ['Headspace', 'Clear your mind.'],
            'settings': ['Settings', 'Customize your experience.']
        };
        document.getElementById('page-title').innerText = titles[viewName][0];
        document.getElementById('page-subtitle').innerText = titles[viewName][1];

        // Update Nav Icons
        document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
        if (event && event.currentTarget) {
            event.currentTarget.classList.add('active');
        }

        render(viewName);
    }
};

function render(viewName) {
    const content = typeof views[viewName] === 'function' ? views[viewName]() : views[viewName];
    document.getElementById('app-view').innerHTML = content;

    // Initialize swipe for spark cards
    if (viewName === 'spark') {
        setTimeout(initSparkSwipe, 50);
    }
}
