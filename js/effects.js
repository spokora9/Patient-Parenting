// --- CONFETTI & CELEBRATION ---
function createConfetti() {
    const colors = ['#74B9FF', '#55EFC4', '#C49F7D', '#FF7675', '#A29BFE'];
    const confettiCount = 50;

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-10px';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';

        document.body.appendChild(confetti);

        setTimeout(() => confetti.remove(), 3500);
    }
}

function celebrateGoal() {
    // Create confetti
    createConfetti();

    // Show celebration modal
    const modal = document.createElement('div');
    modal.className = 'goal-celebration';
    modal.innerHTML = `
        <h2 style="font-size: 48px; margin: 0 0 16px 0;">🎉</h2>
        <h3 style="margin: 0 0 12px 0; color: var(--accent-earth);">Goal Reached!</h3>
        <p style="margin: 0 0 24px 0; color: var(--text-sub);">Time to enjoy your reward!</p>
        <button class="spark-btn favorite" onclick="this.parentElement.remove(); actions.resetGoal();" style="margin: 0 auto;">
            Start New Goal
        </button>
    `;

    document.body.appendChild(modal);

    // Play multiple success sounds
    audio.playTone('success');
    setTimeout(() => audio.playTone('success'), 200);
    setTimeout(() => audio.playTone('success'), 400);
}
