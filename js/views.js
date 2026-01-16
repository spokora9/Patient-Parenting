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
            ${state.players.map(p => `
                <div class="player-avatar ${p.id === state.activePlayerId ? 'active' : ''}"
                     onclick="actions.selectPlayer(${p.id})">
                    ${p.initials}
                </div>
            `).join('')}
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

        <h3>Daily Quests</h3>
        <div class="quest-item" onclick="actions.completeTask(10)">
            <span>Clear Dinner Table</span>
            <div class="btn-check" id="btn-1"></div>
        </div>
        <div class="quest-item" onclick="actions.completeTask(20)">
            <span>20 Mins Reading</span>
            <div class="btn-check" id="btn-2"></div>
        </div>
        <div class="quest-item" onclick="actions.completeTask(5)">
            <span>Brush Teeth (No fuss)</span>
            <div class="btn-check" id="btn-3"></div>
        </div>
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
    }
};
