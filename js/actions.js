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
    },
    showTemplatePreview: (templateId) => {
        state.currentTemplate = templateId;
        saveState();
        router.navigate('templatePreview');
    },
    applyTemplate: (templateId) => {
        applyTemplate(templateId);
        alert('Quests added successfully!');
        router.navigate('quest');
    },
    showAddRewardModal: () => {
        const title = prompt('Reward Title:', '');
        if (!title) return;

        const cost = prompt('XP Cost:', '50');
        if (!cost) return;

        const iconOptions = ['🎬', '📱', '🍕', '🎮', '🍦', '🎨', '⚽', '🎵', '📚', '🚴'];
        const icon = iconOptions[Math.floor(Math.random() * iconOptions.length)];

        const reward = {
            id: 'r' + Date.now(),
            title: title.trim(),
            cost: parseInt(cost) || 50,
            redeemed: false,
            icon: icon
        };

        state.rewards.push(reward);
        saveState();
        audio.playTone('success');
        render('rewards');
    },
    redeemReward: (rewardId) => {
        const reward = state.rewards.find(r => r.id === rewardId);
        if (!reward || reward.redeemed) return;

        if (state.teamXP < reward.cost) {
            alert('Not enough XP!');
            return;
        }

        if (confirm(`Redeem "${reward.title}" for ${reward.cost} XP?`)) {
            state.teamXP -= reward.cost;
            reward.redeemed = true;
            state.redeemedRewards.push({
                ...reward,
                redeemedAt: Date.now()
            });

            saveState();
            audio.playTone('success');

            // Show celebration
            createConfetti();

            render('rewards');
        }
    },
    deleteReward: (rewardId) => {
        if (confirm('Delete this reward?')) {
            state.rewards = state.rewards.filter(r => r.id !== rewardId);
            saveState();
            render('rewards');
        }
    },
    toggleScriptFavorite: (scriptId) => {
        if (!state.scriptFavorites) state.scriptFavorites = [];
        const index = state.scriptFavorites.indexOf(scriptId);
        if (index > -1) {
            state.scriptFavorites.splice(index, 1); // Remove from favorites
        } else {
            state.scriptFavorites.push(scriptId); // Add to favorites
        }
        saveState();
        audio.playTone('tap');
        render('scripts');
    },
    resetDailyQuests: () => {
        if (confirm('Reset all recurring quests? This will mark them as incomplete.')) {
            // Reset all recurring quests
            state.customQuests.forEach(quest => {
                if (quest.recurring) {
                    quest.completed = false;
                }
            });

            // Update last reset time
            state.lastQuestReset = new Date().toDateString();
            saveState();
            audio.playTone('success');
            render('quest');
        }
    },
    toggleDarkMode: () => {
        state.darkMode = !state.darkMode;
        saveState();
        applyDarkMode();
        audio.playTone('tap');
        render('settings');
    }
};

// Auto-reset daily quests if it's a new day
function checkAndResetDailyQuests() {
    const today = new Date().toDateString();

    // If lastQuestReset is null (first time) or different from today, reset quests
    if (!state.lastQuestReset || state.lastQuestReset !== today) {
        state.customQuests.forEach(quest => {
            if (quest.recurring) {
                quest.completed = false;
            }
        });
        state.lastQuestReset = today;
        saveState();
    }
};

// Apply dark mode class to body
function applyDarkMode() {
    if (state.darkMode) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
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
            'settings': ['Settings', 'Customize your experience.'],
            'templates': ['Quest Templates', 'Quick start with presets.'],
            'templatePreview': ['Template Preview', 'Review before adding.'],
            'rewards': ['Rewards', 'Redeem your hard-earned XP.']
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
    let content;

    if (viewName === 'templatePreview') {
        content = views.templatePreview(state.currentTemplate);
    } else {
        content = typeof views[viewName] === 'function' ? views[viewName]() : views[viewName];
    }

    document.getElementById('app-view').innerHTML = content;

    // Initialize swipe for spark cards
    if (viewName === 'spark') {
        setTimeout(initSparkSwipe, 50);
    }
}
