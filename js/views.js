// --- VIEWS & COMPONENTS ---
const views = {
    spark: () => {
        const filters = state.activityFilters || { category: null, ageRange: null, keyword: '' };
        const categories = getUniqueCategories();
        const ageRanges = getUniqueAgeRanges();
        const cards = getDailyCards();
        const currentIndex = state.currentSparkIndex || 0;

        const filterUI = `
            <div style="background: var(--card-bg); border-radius: 12px; padding: 16px; margin-bottom: 16px; box-shadow: var(--shadow);">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
                    <h4 style="margin: 0; font-size: 14px; color: var(--text-sub);">🔍 Filter Activities</h4>
                    ${filters.category || filters.ageRange || filters.keyword ? `
                        <button onclick="actions.clearActivityFilters()" style="padding: 4px 12px; background: var(--accent-earth); color: white; border: none; border-radius: 6px; font-size: 12px; cursor: pointer; font-weight: 600;">
                            Clear All
                        </button>
                    ` : ''}
                </div>

                <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 8px;">
                    <select onchange="actions.setActivityFilter('category', this.value)"
                            style="flex: 1; min-width: 140px; padding: 8px; border-radius: 8px; border: 1px solid var(--border-color); background: var(--input-bg); color: var(--text-main); font-size: 13px;">
                        <option value="">All Categories</option>
                        ${categories.map(cat => `
                            <option value="${cat}" ${filters.category === cat ? 'selected' : ''}>${cat}</option>
                        `).join('')}
                    </select>

                    <select onchange="actions.setActivityFilter('ageRange', this.value)"
                            style="flex: 1; min-width: 140px; padding: 8px; border-radius: 8px; border: 1px solid var(--border-color); background: var(--input-bg); color: var(--text-main); font-size: 13px;">
                        <option value="">All Ages</option>
                        ${ageRanges.map(age => `
                            <option value="${age}" ${filters.ageRange === age ? 'selected' : ''}>${age}</option>
                        `).join('')}
                    </select>
                </div>

                <input type="text"
                       placeholder="Search by keyword..."
                       value="${filters.keyword || ''}"
                       oninput="actions.setActivityFilter('keyword', this.value)"
                       style="width: 100%; padding: 8px 12px; border-radius: 8px; border: 1px solid var(--border-color); background: var(--input-bg); color: var(--text-main); font-size: 13px; box-sizing: border-box;">
            </div>
        `;

        if (currentIndex >= cards.length) {
            return filterUI + `
                <div class="card" style="text-align: center; padding: 60px 24px;">
                    <h3 style="color: var(--accent-earth); margin-bottom: 16px;">✨ ${cards.length === 0 ? 'No Activities Found' : 'All Done for Today!'}</h3>
                    <p>${cards.length === 0 ? 'Try adjusting your filters to see more activities.' : 'You\'ve explored today\'s sparks. Come back tomorrow for fresh inspiration.'}</p>
                    <button class="spark-btn favorite" onclick="actions.resetSparkCards()" style="margin: 20px auto;">
                        🔄
                    </button>
                </div>
            `;
        }

        return filterUI + `
            <div class="spark-container" id="spark-container">
                ${cards.map((card, index) => `
                    <div class="spark-card ${index === currentIndex ? 'current' : ''}"
                         id="spark-card-${index}"
                         data-index="${index}"
                         style="z-index: ${cards.length - index}; transform: scale(${1 - (index - currentIndex) * 0.05}); ${index > currentIndex ? 'pointer-events: none; opacity: 0;' : index < currentIndex ? 'display: none;' : ''}">
                        <span class="tag ${card.type}">${card.type === 'modern' ? 'Modern Knowledge' : 'Old Wisdom'} • ${card.category}</span>
                        <h3>${card.title}</h3>
                        <p style="margin-bottom: 16px;">${card.description}</p>
                        ${card.reason ? `
                            <div style="background: rgba(116, 185, 255, 0.1); border-left: 3px solid var(--accent-play); padding: 12px; border-radius: 8px; margin-top: 16px;">
                                <p style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: var(--accent-play); margin: 0 0 6px 0;">💡 Why This Works</p>
                                <p style="font-size: 13px; line-height: 1.5; margin: 0; color: var(--text-sub);">${card.reason}</p>
                            </div>
                        ` : ''}
                        <div class="swipe-indicator left">✕</div>
                        <div class="swipe-indicator right">⭐</div>
                    </div>
                `).join('')}
            </div>
            <div class="spark-actions">
                <button class="spark-btn dismiss" onclick="actions.swipeCard('left')">✕</button>
                <button class="spark-btn favorite" onclick="actions.swipeCard('right')">⭐</button>
            </div>
        `;
    },
    quest: () => `
        <div class="player-selector">
            ${state.players.filter(p => p.id !== 4).map(p => `
                <div class="player-avatar ${p.id === state.activePlayerId ? 'active' : ''}"
                     onclick="actions.selectPlayer(${p.id})"
                     style="background: ${p.color}; border-color: ${p.id === state.activePlayerId ? 'var(--accent-earth)' : 'transparent'};">
                    <span style="font-size: 24px;">${p.avatar}</span>
                </div>
            `).join('')}
            <div class="player-avatar" onclick="router.navigate('settings')" style="background: #f1f2f6;">
                ⚙️
            </div>
        </div>

        <div class="quest-progress-container">
            <div class="progress-label">
                <span>Family Goal: Movie Night</span>
                <span id="xp-display">${state.teamXP} / ${state.teamGoal} XP</span>
            </div>
            <div class="progress-track">
                <div class="progress-fill" style="width: ${(state.teamXP / state.teamGoal) * 100}%"></div>
            </div>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; margin: 20px 0 12px; gap: 8px;">
            <h3 style="margin: 0;">Daily Quests</h3>
            <div style="display: flex; gap: 8px;">
                <button onclick="router.navigate('templates')"
                        style="padding: 8px 12px; background: var(--accent-play); color: white; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; font-size: 13px;">
                    📋 Templates
                </button>
                <button onclick="actions.showAddQuestModal()"
                        style="padding: 8px 16px; background: var(--accent-earth); color: white; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; font-size: 14px;">
                    + Add Quest
                </button>
            </div>
        </div>

        ${state.customQuests.filter(q => !q.completed).map(quest => `
            <div class="quest-item" style="position: relative;">
                <div onclick="actions.completeQuest('${quest.id}')" style="flex: 1; display: flex; align-items: center; cursor: pointer;">
                    <span>${quest.title}</span>
                    <span style="margin-left: auto; margin-right: 12px; color: var(--accent-play); font-weight: 600; font-size: 13px;">+${quest.xp} XP</span>
                    <div class="btn-check ${quest.completed ? 'checked' : ''}"></div>
                </div>
                <button onclick="actions.deleteQuest('${quest.id}')"
                        style="position: absolute; right: -8px; top: 50%; transform: translateY(-50%); width: 28px; height: 28px; border-radius: 50%; border: none; background: #ff7675; color: white; cursor: pointer; font-size: 16px; opacity: 0.7;">
                    ×
                </button>
            </div>
        `).join('')}

        ${state.customQuests.filter(q => !q.completed).length === 0 ? `
            <div style="text-align: center; padding: 40px 20px; color: var(--text-sub);">
                <p style="margin: 0;">No quests yet! Add your first quest above.</p>
            </div>
        ` : ''}

        <div style="display: flex; gap: 12px; margin-top: 20px; flex-wrap: wrap;">
            <button onclick="router.navigate('rewards')"
                    style="flex: 1; min-width: 160px; padding: 12px 32px; background: var(--accent-play); color: white; border: none; border-radius: 12px; font-weight: 600; cursor: pointer; font-size: 15px;">
                🎁 View Rewards
            </button>
            <button onclick="actions.resetDailyQuests()"
                    style="padding: 12px 24px; background: var(--text-sub); color: white; border: none; border-radius: 12px; font-weight: 600; cursor: pointer; font-size: 15px;">
                🔄 Reset Daily
            </button>
        </div>
    `,
    rewards: () => `
        <div class="card" style="background: linear-gradient(135deg, var(--accent-play) 0%, var(--success) 100%); color: white; margin-bottom: 20px;">
            <div style="text-align: center;">
                <h2 style="margin: 0 0 8px 0; font-size: 48px;">💰</h2>
                <p style="margin: 0; font-size: 16px; opacity: 0.9;">Available XP</p>
                <h1 style="margin: 8px 0 0 0; font-size: 48px; font-weight: 700;">${state.teamXP}</h1>
            </div>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; margin: 20px 0 12px;">
            <h3 style="margin: 0;">Available Rewards</h3>
            <button onclick="actions.showAddRewardModal()"
                    style="padding: 8px 16px; background: var(--accent-earth); color: white; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; font-size: 14px;">
                + Add Reward
            </button>
        </div>

        ${state.rewards.filter(r => !r.redeemed).map(reward => `
            <div class="card" style="border: 2px solid ${state.teamXP >= reward.cost ? 'var(--success)' : '#dfe6e9'};">
                <div style="display: flex; align-items: center; gap: 16px;">
                    <div style="font-size: 40px;">${reward.icon}</div>
                    <div style="flex: 1;">
                        <h3 style="margin: 0 0 4px 0;">${reward.title}</h3>
                        <p style="margin: 0; color: var(--accent-play); font-weight: 600; font-size: 16px;">
                            ${reward.cost} XP
                        </p>
                    </div>
                    <button onclick="actions.redeemReward('${reward.id}')"
                            style="padding: 10px 20px; background: ${state.teamXP >= reward.cost ? 'var(--success)' : '#dfe6e9'}; color: white; border: none; border-radius: 8px; font-weight: 600; cursor: ${state.teamXP >= reward.cost ? 'pointer' : 'not-allowed'}; font-size: 14px;"
                            ${state.teamXP < reward.cost ? 'disabled' : ''}>
                        Redeem
                    </button>
                    <button onclick="actions.deleteReward('${reward.id}')"
                            style="width: 32px; height: 32px; border-radius: 50%; border: none; background: #ff7675; color: white; cursor: pointer; font-size: 18px;">
                        ×
                    </button>
                </div>
            </div>
        `).join('')}

        ${state.rewards.filter(r => !r.redeemed).length === 0 ? `
            <div style="text-align: center; padding: 40px 20px; color: var(--text-sub);">
                <p style="margin: 0;">No rewards yet! Add your first reward above.</p>
            </div>
        ` : ''}

        ${state.redeemedRewards.length > 0 ? `
            <h3 style="margin: 30px 0 12px 0;">Recently Redeemed</h3>
            ${state.redeemedRewards.slice(-3).reverse().map(r => `
                <div class="card" style="opacity: 0.6; border-left: 4px solid var(--success);">
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <div style="font-size: 24px;">${r.icon}</div>
                        <div>
                            <p style="margin: 0; font-weight: 600;">${r.title}</p>
                            <p style="margin: 4px 0 0; font-size: 13px; color: var(--text-sub);">
                                Redeemed ${new Date(r.redeemedAt).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                </div>
            `).join('')}
        ` : ''}

        <div style="text-align: center; margin-top: 20px;">
            <button onclick="router.navigate('quest')"
                    style="padding: 12px 32px; background: var(--text-sub); color: white; border: none; border-radius: 12px; font-weight: 600; cursor: pointer; font-size: 15px;">
                ← Back to Quests
            </button>
        </div>
    `,
    headspace: () => `
        <div class="card">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                <h3 style="margin: 0;">⏰ Reminders</h3>
                <button onclick="actions.showAddReminderModal()"
                        style="padding: 8px 16px; background: var(--accent-earth); color: white; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; font-size: 14px;">
                    + Add Reminder
                </button>
            </div>
            ${(state.reminders || []).length === 0 ? `
                <p style="color: var(--text-sub); font-size: 14px; margin: 0;">Set reminders for birthdays, appointments, or important events!</p>
            ` : `
                ${(state.reminders || []).sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime)).map(reminder => {
                    const reminderDate = new Date(reminder.dateTime);
                    const now = new Date();
                    const isPast = reminderDate < now;
                    const recurrenceIcons = { daily: '🔄', weekly: '📆', monthly: '📅' };
                    return `
                        <div style="padding: 12px; background: ${isPast ? 'rgba(255, 118, 117, 0.1)' : 'rgba(116, 185, 255, 0.1)'}; border-left: 3px solid ${isPast ? '#ff7675' : 'var(--accent-play)'}; border-radius: 8px; margin-bottom: 8px;">
                            <div style="display: flex; justify-content: space-between; align-items: start;">
                                <div style="flex: 1;">
                                    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                                        <p style="margin: 0; font-weight: 600; font-size: 15px;">${reminder.title}</p>
                                        ${reminder.recurrence ? `
                                            <span style="background: var(--accent-play); color: white; padding: 2px 8px; border-radius: 12px; font-size: 11px; font-weight: 700; text-transform: uppercase;">
                                                ${recurrenceIcons[reminder.recurrence] || '🔄'} ${reminder.recurrence}
                                            </span>
                                        ` : ''}
                                    </div>
                                    <p style="margin: 0; font-size: 13px; color: var(--text-sub);">
                                        📅 ${reminderDate.toLocaleDateString()} at ${reminderDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                        ${isPast ? '<span style="color: #ff7675; margin-left: 8px;">• Past</span>' : ''}
                                    </p>
                                </div>
                                <div style="display: flex; gap: 8px; flex-shrink: 0;">
                                    <button onclick="actions.snoozeReminder('${reminder.id}')"
                                            style="padding: 6px 12px; border-radius: 6px; border: none; background: var(--accent-play); color: white; cursor: pointer; font-size: 12px; font-weight: 600;">
                                        ⏰ Snooze
                                    </button>
                                    <button onclick="actions.deleteReminder('${reminder.id}')"
                                            style="width: 28px; height: 28px; border-radius: 50%; border: none; background: #ff7675; color: white; cursor: pointer; font-size: 16px;">
                                        ×
                                    </button>
                                </div>
                            </div>
                        </div>
                    `;
                }).join('')}
            `}
        </div>

        <div class="card">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                <h3 style="margin: 0;">✓ Task List</h3>
                <button onclick="actions.showAddTaskModal()"
                        style="padding: 8px 16px; background: var(--accent-play); color: white; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; font-size: 14px;">
                    + Add Task
                </button>
            </div>
            ${(state.tasks || []).filter(t => !t.completed).length === 0 ? `
                <p style="color: var(--text-sub); font-size: 14px; margin: 0;">Add tasks to keep track of what needs to be done!</p>
            ` : (() => {
                const activeTasks = (state.tasks || []).filter(t => !t.completed);
                const categoryOrder = ['urgent', 'important', 'routine', 'general'];
                const categoryLabels = { urgent: '🔴 Urgent', important: '🟡 Important', routine: '🔵 Routine', general: '⚪ General' };
                const categoryColors = { urgent: '#ff7675', important: '#fdcb6e', routine: '#74b9ff', general: '#b2bec3' };

                // Group tasks by category
                const tasksByCategory = {};
                categoryOrder.forEach(cat => { tasksByCategory[cat] = []; });
                activeTasks.forEach(task => {
                    const cat = task.category || 'general';
                    if (tasksByCategory[cat]) {
                        tasksByCategory[cat].push(task);
                    } else {
                        tasksByCategory['general'].push(task);
                    }
                });

                // Render tasks grouped by category
                return categoryOrder.map(category => {
                    const tasks = tasksByCategory[category];
                    if (tasks.length === 0) return '';

                    return `
                        <div style="margin-bottom: 16px;">
                            <h4 style="margin: 0 0 8px 0; font-size: 13px; color: var(--text-sub); text-transform: uppercase; letter-spacing: 0.5px;">
                                ${categoryLabels[category]}
                            </h4>
                            ${tasks.map(task => `
                                <div style="display: flex; align-items: center; padding: 10px; background: var(--card-bg); border-left: 3px solid ${categoryColors[category]}; border-radius: 8px; margin-bottom: 8px;">
                                    <input type="checkbox" onchange="actions.toggleTask('${task.id}')" style="width: 20px; height: 20px; margin-right: 12px; cursor: pointer;">
                                    <span style="flex: 1; font-size: 15px;">${task.title}</span>
                                    <button onclick="actions.deleteTask('${task.id}')"
                                            style="width: 28px; height: 28px; border-radius: 50%; border: none; background: #ff7675; color: white; cursor: pointer; font-size: 16px;">
                                        ×
                                    </button>
                                </div>
                            `).join('')}
                        </div>
                    `;
                }).join('');
            })()}
            ${(state.tasks || []).filter(t => t.completed).length > 0 ? `
                <details style="margin-top: 16px;">
                    <summary style="cursor: pointer; color: var(--text-sub); font-size: 14px; font-weight: 600;">Completed (${(state.tasks || []).filter(t => t.completed).length})</summary>
                    <div style="margin-top: 8px;">
                        ${(state.tasks || []).filter(t => t.completed).map(task => `
                            <div style="display: flex; align-items: center; padding: 10px; background: var(--card-bg); border: 1px solid rgba(0,0,0,0.05); border-radius: 8px; margin-bottom: 8px; opacity: 0.6;">
                                <input type="checkbox" checked onchange="actions.toggleTask('${task.id}')" style="width: 20px; height: 20px; margin-right: 12px; cursor: pointer;">
                                <span style="flex: 1; font-size: 15px; text-decoration: line-through;">${task.title}</span>
                                <button onclick="actions.deleteTask('${task.id}')"
                                        style="width: 28px; height: 28px; border-radius: 50%; border: none; background: #ff7675; color: white; cursor: pointer; font-size: 16px;">
                                    ×
                                </button>
                            </div>
                        `).join('')}
                    </div>
                </details>
            ` : ''}
        </div>

        <div class="card" style="border-left: 4px solid var(--accent-earth)">
            <h3>🤝 Village List</h3>
            <p style="margin-bottom: 12px; color: var(--text-sub); font-size: 14px;">Things to ask others for help with.</p>
            <textarea
                placeholder="Ask Grandma for pickup Tuesday&#10;Text Sarah re: carpool&#10;Schedule playdate with..."
                onchange="actions.updateNotes('village', this.value)"
                style="width: 100%; min-height: 100px; padding: 12px; border: 2px solid rgba(0,0,0,0.1); border-radius: 12px; font-size: 14px; font-family: inherit; resize: vertical; background: var(--bg-color); color: var(--text-main);"
            >${state.notes?.village || ''}</textarea>
        </div>

        <div class="card">
            <h3>📝 General Notes</h3>
            <p style="margin-bottom: 12px; color: var(--text-sub); font-size: 14px;">Thoughts, reflections, or anything on your mind.</p>
            <textarea
                placeholder="This week went well because...&#10;Next time I'll try...&#10;Remember to..."
                onchange="actions.updateNotes('general', this.value)"
                style="width: 100%; min-height: 120px; padding: 12px; border: 2px solid rgba(0,0,0,0.1); border-radius: 12px; font-size: 14px; font-family: inherit; resize: vertical; background: var(--bg-color); color: var(--text-main);"
            >${state.notes?.general || ''}</textarea>
        </div>
        ${state.favorites.length > 0 ? `
        <div class="card">
            <h3>⭐ Saved Activities</h3>
            <ul style="padding-left: 20px; margin-top: 12px; color: var(--text-sub); font-size: 14px;">
                ${state.favorites.map(fav => `<li>${fav.title}</li>`).join('')}
            </ul>
        </div>
        ` : ''}
        <div class="card">
            <h3>📊 Data Management</h3>
            <p style="margin-bottom: 16px; color: var(--text-sub);">Backup your progress and favorites, or restore from a previous backup.</p>
            <div style="display: flex; gap: 12px; flex-wrap: wrap;">
                <button
                    onclick="actions.exportData()"
                    style="flex: 1; min-width: 140px; padding: 12px 20px; background: var(--accent-earth); color: white; border: none; border-radius: 12px; font-weight: 600; cursor: pointer; font-size: 14px;">
                    📥 Export Data
                </button>
                <label
                    style="flex: 1; min-width: 140px; padding: 12px 20px; background: var(--accent-play); color: white; border: none; border-radius: 12px; font-weight: 600; cursor: pointer; text-align: center; font-size: 14px;">
                    📤 Import Data
                    <input type="file" accept=".json" onchange="actions.importData(this)" style="display: none;">
                </label>
            </div>
        </div>
    `,
    scripts: () => {
        const query = state.scriptQuery || '';
        const results = searchScripts(query);
        const favorites = state.scriptFavorites || [];
        const favoritedScripts = results.filter(s => favorites.includes(s.id));
        const otherScripts = results.filter(s => !favorites.includes(s.id));

        return `
            <div style="position: sticky; top: 0; background: var(--bg-color); padding: 10px 0 20px; z-index: 10;">
                <input
                    type="text"
                    id="script-search"
                    placeholder="Search scenarios (e.g., 'hitting', 'bedtime')..."
                    value="${query}"
                    style="width: 100%; padding: 12px 16px; border: 2px solid #dfe6e9; border-radius: 12px; font-size: 15px; background: white;"
                    oninput="actions.searchScripts(this.value)"
                />
            </div>

            ${results.length === 0 ? `
                <div class="card" style="text-align: center; padding: 40px 24px;">
                    <p style="color: var(--text-sub);">No scripts found. Try a different search term.</p>
                </div>
            ` : ''}

            ${favoritedScripts.length > 0 ? `
                <h3 style="margin: 0 0 12px 0;">⭐ Favorites</h3>
            ` : ''}

            ${favoritedScripts.map(script => `
                <div class="card" style="border-left: 4px solid #FFEAA7; background: #fffef5;">
                    <div style="display: flex; justify-content: space-between; align-items: start;">
                        <h3 style="color: var(--accent-earth); margin: 0;">${script.scenario}</h3>
                        <button onclick="actions.toggleScriptFavorite(${script.id})"
                                style="background: none; border: none; cursor: pointer; font-size: 24px; padding: 0;">
                            ⭐
                        </button>
                    </div>

                    <div style="margin-top: 16px;">
                        <p style="font-size: 13px; font-weight: 600; color: #ff7675; margin-bottom: 4px;">❌ Instead of:</p>
                        <p style="font-style: italic; color: var(--text-sub); margin: 0 0 12px 0;">"${script.instead}"</p>
                    </div>

                    <div style="margin-top: 12px;">
                        <p style="font-size: 13px; font-weight: 600; color: #55efc4; margin-bottom: 4px;">✅ Say this:</p>
                        <p style="font-weight: 500; color: var(--text-main); margin: 0 0 12px 0;">${script.say}</p>
                    </div>

                    <div style="background: #f1f2f6; padding: 12px; border-radius: 8px; margin-top: 12px;">
                        <p style="font-size: 13px; font-weight: 600; margin: 0 0 4px 0;">💡 Why this works:</p>
                        <p style="font-size: 13px; margin: 0; color: var(--text-sub);">${script.note}</p>
                    </div>
                </div>
            `).join('')}

            ${otherScripts.length > 0 && favoritedScripts.length > 0 ? `
                <h3 style="margin: 20px 0 12px 0;">📚 All Scripts</h3>
            ` : ''}

            ${otherScripts.map(script => `
                <div class="card">
                    <div style="display: flex; justify-content: space-between; align-items: start;">
                        <h3 style="color: var(--accent-earth); margin: 0;">${script.scenario}</h3>
                        <button onclick="actions.toggleScriptFavorite(${script.id})"
                                style="background: none; border: none; cursor: pointer; font-size: 24px; padding: 0; color: #dfe6e9;">
                            ☆
                        </button>
                    </div>

                    <div style="margin-top: 16px;">
                        <p style="font-size: 13px; font-weight: 600; color: #ff7675; margin-bottom: 4px;">❌ Instead of:</p>
                        <p style="font-style: italic; color: var(--text-sub); margin: 0 0 12px 0;">"${script.instead}"</p>
                    </div>

                    <div style="margin-top: 12px;">
                        <p style="font-size: 13px; font-weight: 600; color: #55efc4; margin-bottom: 4px;">✅ Say this:</p>
                        <p style="font-weight: 500; color: var(--text-main); margin: 0 0 12px 0;">${script.say}</p>
                    </div>

                    <div style="background: #f1f2f6; padding: 12px; border-radius: 8px; margin-top: 12px;">
                        <p style="font-size: 13px; font-weight: 600; margin: 0 0 4px 0;">💡 Why this works:</p>
                        <p style="font-size: 13px; margin: 0; color: var(--text-sub);">${script.note}</p>
                    </div>
                </div>
            `).join('')}
        `;
    },
    templates: () => {
        const categories = getTemplateCategories();

        return `
            <div class="card">
                <h3>📋 Quest Templates</h3>
                <p style="color: var(--text-sub); margin-bottom: 20px;">Choose a template to quickly add multiple quests</p>
            </div>

            ${categories.map(template => `
                <div class="card" style="cursor: pointer; transition: all 0.2s;" onclick="actions.showTemplatePreview('${template.id}')">
                    <div style="display: flex; align-items: center; gap: 16px;">
                        <div style="font-size: 40px;">${template.icon}</div>
                        <div style="flex: 1;">
                            <h3 style="margin: 0 0 4px 0;">${template.name}</h3>
                            <p style="margin: 0; color: var(--text-sub); font-size: 14px;">${template.questCount} quests</p>
                        </div>
                        <div style="color: var(--accent-earth); font-size: 24px;">→</div>
                    </div>
                </div>
            `).join('')}

            <div style="text-align: center; margin-top: 20px;">
                <button onclick="router.navigate('quest')"
                        style="padding: 12px 32px; background: var(--text-sub); color: white; border: none; border-radius: 12px; font-weight: 600; cursor: pointer; font-size: 15px;">
                    ← Back to Quests
                </button>
            </div>
        `;
    },
    templatePreview: (templateId) => {
        const template = questTemplates[templateId];
        if (!template) return '<div>Template not found</div>';

        return `
            <div class="card">
                <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 20px;">
                    <div style="font-size: 48px;">${template.icon}</div>
                    <div>
                        <h2 style="margin: 0 0 4px 0;">${template.name}</h2>
                        <p style="margin: 0; color: var(--text-sub);">${template.quests.length} quests in this template</p>
                    </div>
                </div>
            </div>

            <div class="card">
                <h3 style="margin: 0 0 16px 0;">Preview:</h3>
                ${template.quests.map(quest => `
                    <div style="display: flex; justify-content: space-between; padding: 12px; background: #f9f9f9; border-radius: 8px; margin-bottom: 8px;">
                        <span>${quest.title}</span>
                        <span style="color: var(--accent-play); font-weight: 600;">+${quest.xp} XP</span>
                    </div>
                `).join('')}
            </div>

            <div style="display: flex; gap: 12px; margin-top: 20px;">
                <button onclick="router.navigate('templates')"
                        style="flex: 1; padding: 12px 24px; background: var(--text-sub); color: white; border: none; border-radius: 12px; font-weight: 600; cursor: pointer; font-size: 15px;">
                    ← Back
                </button>
                <button onclick="actions.applyTemplate('${templateId}')"
                        style="flex: 2; padding: 12px 24px; background: var(--accent-earth); color: white; border: none; border-radius: 12px; font-weight: 600; cursor: pointer; font-size: 15px;">
                    ✓ Add All to My Quests
                </button>
            </div>
        `;
    },
    settings: () => `
        <div class="card">
            <h3>⚙️ Player Profiles</h3>
            <p style="color: var(--text-sub); margin-bottom: 20px;">Customize your family members</p>

            ${state.players.filter(p => p.id !== 4).map(player => `
                <div style="background: #f9f9f9; padding: 16px; border-radius: 12px; margin-bottom: 16px;">
                    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                        <div style="width: 50px; height: 50px; border-radius: 50%; background: ${player.color}; display: flex; align-items: center; justify-content: center; font-size: 24px;">
                            ${player.avatar}
                        </div>
                        <div style="flex: 1;">
                            <input type="text" value="${player.name}"
                                   onchange="actions.updatePlayer(${player.id}, 'name', this.value)"
                                   style="width: 100%; padding: 8px; border: 1px solid #dfe6e9; border-radius: 8px; font-size: 15px; font-weight: 600;"/>
                        </div>
                    </div>

                    <div style="margin-top: 12px;">
                        <label style="font-size: 13px; font-weight: 600; color: var(--text-sub); display: block; margin-bottom: 8px;">Choose Avatar:</label>
                        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                            ${['🦁', '🦋', '🌟', '🚀', '🎨', '⚽', '🎵', '🌈', '🦄', '🐢'].map(emoji => `
                                <button onclick="actions.updatePlayer(${player.id}, 'avatar', '${emoji}')"
                                        style="width: 40px; height: 40px; border: 2px solid ${player.avatar === emoji ? 'var(--accent-earth)' : '#dfe6e9'}; background: white; border-radius: 8px; cursor: pointer; font-size: 20px;">
                                    ${emoji}
                                </button>
                            `).join('')}
                        </div>
                    </div>

                    <div style="margin-top: 12px;">
                        <label style="font-size: 13px; font-weight: 600; color: var(--text-sub); display: block; margin-bottom: 8px;">Choose Color:</label>
                        <div style="display: flex; gap: 8px;">
                            ${['#FF7675', '#74B9FF', '#55EFC4', '#A29BFE', '#FFEAA7', '#FD79A8', '#6C5CE7', '#00B894'].map(color => `
                                <button onclick="actions.updatePlayer(${player.id}, 'color', '${color}')"
                                        style="width: 40px; height: 40px; border: 3px solid ${player.color === color ? 'var(--accent-earth)' : 'transparent'}; background: ${color}; border-radius: 50%; cursor: pointer;">
                                </button>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>

        <div class="card">
            <h3>🎯 Quest Settings</h3>
            <div style="margin-top: 16px;">
                <label style="font-size: 15px; font-weight: 600; display: block; margin-bottom: 12px;">Team Goal XP:</label>
                <input type="number" value="${state.teamGoal}"
                       onchange="actions.updateTeamGoal(parseInt(this.value))"
                       style="width: 100%; padding: 12px; border: 1px solid #dfe6e9; border-radius: 8px; font-size: 15px;"/>
            </div>
        </div>

        <div class="card">
            <h3>🎨 Appearance</h3>
            <div style="margin-top: 16px;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <p style="margin: 0; font-weight: 600; font-size: 15px;">Dark Mode</p>
                        <p style="margin: 4px 0 0; font-size: 13px; color: var(--text-sub);">Switch to dark color scheme</p>
                    </div>
                    <button onclick="actions.toggleDarkMode()"
                            style="width: 60px; height: 34px; border-radius: 17px; border: none; background: ${state.darkMode ? 'var(--accent-earth)' : '#dfe6e9'}; cursor: pointer; position: relative; transition: all 0.3s;">
                        <div style="width: 26px; height: 26px; border-radius: 50%; background: white; position: absolute; top: 4px; left: ${state.darkMode ? '30px' : '4px'}; transition: all 0.3s; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">
                        </div>
                    </button>
                </div>
            </div>
        </div>

        <div style="text-align: center; margin-top: 20px;">
            <button onclick="router.navigate('quest')"
                    style="padding: 12px 32px; background: var(--accent-earth); color: white; border: none; border-radius: 12px; font-weight: 600; cursor: pointer; font-size: 15px;">
                ← Back to Quests
            </button>
        </div>
    `
};
