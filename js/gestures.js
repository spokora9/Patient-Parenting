// --- SWIPE GESTURE HANDLER ---
// Store cleanup function globally
let cleanupSparkSwipe = null;

function initSparkSwipe() {
    // Clean up previous event listeners
    if (cleanupSparkSwipe) {
        cleanupSparkSwipe();
        cleanupSparkSwipe = null;
    }

    const currentIndex = state.currentSparkIndex || 0;
    const card = document.getElementById(`spark-card-${currentIndex}`);

    if (!card) {
        console.log('[Swipe] No spark card found for index:', currentIndex);
        return;
    }

    console.log('[Swipe] Initializing swipe for card:', currentIndex);

    let startX = 0;
    let startY = 0;
    let currentX = 0;
    let isDragging = false;

    const onStart = (e) => {
        console.log('[Swipe] Start:', e.type);
        isDragging = true;
        const touch = e.type.includes('mouse') ? e : e.touches[0];
        startX = touch.clientX;
        startY = touch.clientY;
        currentX = startX;
        card.classList.add('swiping');
    };

    const onMove = (e) => {
        if (!isDragging) return;

        const touch = e.type.includes('mouse') ? e : e.touches[0];
        if (!touch) return;

        currentX = touch.clientX;
        const currentY = touch.clientY;
        const deltaX = currentX - startX;
        const deltaY = currentY - startY;

        // Prevent default scrolling on touch devices
        if (Math.abs(deltaX) > 10) {
            e.preventDefault();
        }

        const rotation = deltaX / 20;
        card.style.transform = `translateX(${deltaX}px) rotate(${rotation}deg)`;

        // Show indicators
        const leftIndicator = card.querySelector('.swipe-indicator.left');
        const rightIndicator = card.querySelector('.swipe-indicator.right');

        if (leftIndicator && rightIndicator) {
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
        console.log('[Swipe] End');
        isDragging = false;

        card.classList.remove('swiping');
        const deltaX = currentX - startX;

        // Determine swipe direction
        if (deltaX < -100) {
            console.log('[Swipe] Left swipe detected');
            actions.swipeCard('left');
        } else if (deltaX > 100) {
            console.log('[Swipe] Right swipe detected');
            actions.swipeCard('right');
        } else {
            // Reset card position
            card.style.transform = '';
            const indicators = card.querySelectorAll('.swipe-indicator');
            indicators.forEach(ind => {
                ind.classList.remove('visible');
            });
        }
    };

    // Mouse events
    card.addEventListener('mousedown', onStart, { passive: false });
    document.addEventListener('mousemove', onMove, { passive: false });
    document.addEventListener('mouseup', onEnd, { passive: false });

    // Touch events
    card.addEventListener('touchstart', onStart, { passive: false });
    card.addEventListener('touchmove', onMove, { passive: false });
    card.addEventListener('touchend', onEnd, { passive: false });

    console.log('[Swipe] Event listeners attached successfully');

    // Store cleanup function
    cleanupSparkSwipe = () => {
        console.log('[Swipe] Cleaning up event listeners');
        card.removeEventListener('mousedown', onStart);
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onEnd);
        card.removeEventListener('touchstart', onStart);
        card.removeEventListener('touchmove', onMove);
        card.removeEventListener('touchend', onEnd);
    };
}
