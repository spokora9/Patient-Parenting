// --- ACTIVITY LIBRARY ---
const activityLibrary = [
    {
        id: 1,
        type: 'modern',
        category: 'Sensory',
        title: 'Heavy Work',
        description: 'Regulate the nervous system. Have them push a laundry basket filled with books across the room.'
    },
    {
        id: 2,
        type: 'wisdom',
        category: 'Nature',
        title: 'Cloud Watching',
        description: 'Go outside. Lie on the grass. Find animals in the sky. No agenda, just observation.'
    },
    {
        id: 3,
        type: 'modern',
        category: 'Development • 3-5 Years',
        title: 'The "Choice" Trick',
        description: 'Instead of "Put on your shoes," try "Do you want to put on the left shoe or the right shoe first?"'
    },
    {
        id: 4,
        type: 'wisdom',
        category: 'Storytelling',
        title: 'The Magic Story Thread',
        description: 'Start a story, let them add one sentence, you add one. No rules, just imagination.'
    },
    {
        id: 5,
        type: 'modern',
        category: 'Emotional Regulation',
        title: 'Color Your Feelings',
        description: 'Ask: "What color is your mad/sad/happy today?" Let them draw it. No judgment, just expression.'
    },
    {
        id: 6,
        type: 'wisdom',
        category: 'Connection',
        title: 'The 10-Minute Everything',
        description: 'Set a timer. For 10 minutes, do EXACTLY what they want. Follow their lead completely.'
    },
    {
        id: 7,
        type: 'modern',
        category: 'Proprioception',
        title: 'The Sandwich Hug',
        description: 'Place child between couch cushions and give gentle pressure. Deep pressure calms the nervous system.'
    },
    {
        id: 8,
        type: 'wisdom',
        category: 'Ritual',
        title: 'The Worry Stone',
        description: 'Find a smooth stone together. At bedtime, let them tell it one worry. Leave it outside their door.'
    },
    {
        id: 9,
        type: 'modern',
        category: 'Executive Function',
        title: 'Backward Planning',
        description: 'Getting ready is hard. Try: "What\'s the LAST thing before we leave? Now what comes before that?"'
    },
    {
        id: 10,
        type: 'wisdom',
        category: 'Play',
        title: 'Nonsense Songs',
        description: 'Make up a song about literally anything. Socks, broccoli, the ceiling. Silly = connection.'
    },
    {
        id: 11,
        type: 'modern',
        category: 'Nutrition',
        title: 'Deconstructed Dinner',
        description: 'Serve all meal components separately. Let them build their own plate. Control = less resistance.'
    },
    {
        id: 12,
        type: 'wisdom',
        category: 'Outdoor Play',
        title: 'Puddle Jumping Permission',
        description: 'Next rainy day, say YES to puddles. Bring towels. Mess = memories. Cortisol down, oxytocin up.'
    },
    {
        id: 13,
        type: 'modern',
        category: 'Sleep Routine',
        title: 'The Body Scan',
        description: '"Let\'s relax our toes...now our legs..." Guides them out of fight-or-flight into rest mode.'
    },
    {
        id: 14,
        type: 'wisdom',
        category: 'Connection',
        title: 'Secret Handshake',
        description: 'Create one together. Use it when they\'re brave, scared, or proud. Your special language.'
    },
    {
        id: 15,
        type: 'modern',
        category: 'Attention Span',
        title: 'The 2-Minute Rule',
        description: 'Before asking for focus: 2 mins of wild movement. Jump, spin, dance. Then ask for sitting still.'
    },
    {
        id: 16,
        type: 'wisdom',
        category: 'Creativity',
        title: 'The Loose Parts Basket',
        description: 'Box of random stuff: sticks, fabric, cardboard. No instructions. Watch them build worlds.'
    },
    {
        id: 17,
        type: 'modern',
        category: 'Social Skills',
        title: 'Emotion Charades',
        description: 'Act out feelings without words. Builds emotional literacy + theory of mind.'
    },
    {
        id: 18,
        type: 'wisdom',
        category: 'Gratitude',
        title: 'Rose, Bud, Thorn',
        description: 'At dinner: What was good today (rose)? What are you looking forward to (bud)? What was hard (thorn)?'
    },
    {
        id: 19,
        type: 'modern',
        category: 'Transitions',
        title: 'The 5-4-3-2-1 Countdown',
        description: 'Give concrete time marker before transitions. "In 5 minutes..." then count down. Predictability = cooperation.'
    },
    {
        id: 20,
        type: 'wisdom',
        category: 'Bedtime',
        title: 'Flashlight Stories',
        description: 'Lights off, flashlight on. Tell a story on the ceiling. Makes bedtime magical, not a battle.'
    }
];

// Get daily cards (3 random cards)
function getDailyCards() {
    const saved = storage.load('daily_cards', null);
    const today = new Date().toDateString();

    if (saved && saved.date === today) {
        return saved.cards;
    }

    // Generate new daily cards
    const shuffled = [...activityLibrary].sort(() => Math.random() - 0.5);
    const cards = shuffled.slice(0, 3);
    storage.save('daily_cards', { date: today, cards });
    return cards;
}
