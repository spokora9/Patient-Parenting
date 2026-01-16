// --- VIEWS & COMPONENTS ---
const views = {
    spark: () => {
        const cards = getDailyCards();
        const currentIndex = state.currentSparkIndex || 0;

        if (currentIndex >= cards.length) {
            return `
                <div class="card" style="text-align: center; padding: 60px 24px;">
                    <h3 style="color: var(--accent-earth); margin-bottom: 16px;">✨ All Done for Today!</h3>
                    <p>You've explored today's sparks. Come back tomorrow for fresh inspiration.</p>
                    <button class="spark-btn favorite" onclick="actions.resetSparkCards()" style="margin: 20px auto;">
                        🔄
                    </button>
                </div>
            `;
        }

        return `
            <div class="spark-container" id="spark-container">
                ${cards.map((card, index) => `
                    <div class="spark-card"
                         id="spark-card-${index}"
                         data-index="${index}"
                         style="z-index: ${cards.length - index}; transform: scale(${1 - (index - currentIndex) * 0.05});">
                        <span class="tag ${card.type}">${card.type === 'modern' ? 'Modern Knowledge' : 'Old Wisdom'} • ${card.category}</span>
                        <h3>${card.title}</h3>
                        <p>${card.description}</p>
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

        <div style="display: flex; justify-content: space-between; align-items: center; margin: 20px 0 12px;">
            <h3 style="margin: 0;">Daily Quests</h3>
            <button onclick="actions.showAddQuestModal()"
                    style="padding: 8px 16px; background: var(--accent-earth); color: white; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; font-size: 14px;">
                + Add Quest
            </button>
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
    `,
    headspace: () => `
        <div class="card" style="border-left: 4px solid var(--accent-earth)">
            <h3>Village List</h3>
            <p>Things to ask others for help with.</p>
            <br>
            <ul style="padding-left: 20px; margin: 0; color: var(--text-sub); font-size: 14px;">
                <li>Ask Grandma for pickup Tues</li>
                <li>Text Sarah re: carpool</li>
            </ul>
        </div>
        <div class="card">
            <h3>Upcoming</h3>
            <p><strong>Leo's Birthday</strong> in 2 weeks.</p>
            <p style="font-size:12px; color: var(--accent-play); margin-top:8px;">
                <em>Tip: At this age, he is ready for cooperative board games.</em>
            </p>
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

            ${results.map(script => `
                <div class="card" style="border-left: 4px solid var(--accent-play);">
                    <h3 style="color: var(--accent-earth);">${script.scenario}</h3>

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

        <div style="text-align: center; margin-top: 20px;">
            <button onclick="router.navigate('quest')"
                    style="padding: 12px 32px; background: var(--accent-earth); color: white; border: none; border-radius: 12px; font-weight: 600; cursor: pointer; font-size: 15px;">
                ← Back to Quests
            </button>
        </div>
    `
};
