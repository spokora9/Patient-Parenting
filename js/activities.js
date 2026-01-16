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
