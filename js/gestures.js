// --- SWIPE GESTURE HANDLER ---
function initSparkSwipe() {
    const currentIndex = state.currentSparkIndex || 0;
    const card = document.getElementById(`spark-card-${currentIndex}`);

    if (!card) return;

    let startX = 0;
    let startY = 0;
    let currentX = 0;
    let isDragging = false;

    const onStart = (e) => {
        isDragging = true;
        startX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
        startY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;
        card.classList.add('swiping');
    };

    const onMove = (e) => {
        if (!isDragging) return;

        currentX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
        const deltaX = currentX - startX;
        const deltaY = (e.type.includes('mouse') ? e.clientY : e.touches[0].clientY) - startY;

        // Only swipe if horizontal movement is greater
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            e.preventDefault();
            const rotation = deltaX / 20;
            card.style.transform = `translateX(${deltaX}px) rotate(${rotation}deg)`;

            // Show indicators
            const leftIndicator = card.querySelector('.swipe-indicator.left');
            const rightIndicator = card.querySelector('.swipe-indicator.right');

            if (deltaX < -50) {
                leftIndicator.classList.add('visible');
                rightIndicator.classList.remove('visible');
            } else if (deltaX > 50) {
                rightIndicator.classList.add('visible');
                leftIndicator.classList.remove('visible');
            } else {
                leftIndicator.classList.remove('visible');
                rightIndicator.classList.remove('visible');
            }
        }
    };

    const onEnd = (e) => {
        if (!isDragging) return;
        isDragging = false;

        card.classList.remove('swiping');
        const deltaX = currentX - startX;

        // Determine swipe direction
        if (deltaX < -100) {
            actions.swipeCard('left');
        } else if (deltaX > 100) {
            actions.swipeCard('right');
        } else {
            // Reset card position
            card.style.transform = '';
            card.querySelectorAll('.swipe-indicator').forEach(ind => {
                ind.classList.remove('visible');
            });
        }
    };

    // Mouse events
    card.addEventListener('mousedown', onStart);
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onEnd);

    // Touch events
    card.addEventListener('touchstart', onStart, { passive: false });
    card.addEventListener('touchmove', onMove, { passive: false });
    card.addEventListener('touchend', onEnd);
}
