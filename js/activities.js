// --- ACTIVITY LIBRARY ---
const activityLibrary = [
    {
        id: 1,
        type: 'modern',
        category: 'Sensory',
        title: 'Heavy Work',
        description: 'Regulate the nervous system. Have them push a laundry basket filled with books across the room.',
        reason: 'Proprioceptive input (deep pressure from muscles and joints) activates the parasympathetic nervous system, reducing cortisol and promoting calm.'
    },
    {
        id: 2,
        type: 'wisdom',
        category: 'Nature',
        title: 'Cloud Watching',
        description: 'Go outside. Lie on the grass. Find animals in the sky. No agenda, just observation.',
        reason: 'Nature exposure lowers stress hormones and increases serotonin. Unstructured observation builds attention span and imagination without performance pressure.'
    },
    {
        id: 3,
        type: 'modern',
        category: 'Development • 3-5 Years',
        title: 'The "Choice" Trick',
        description: 'Instead of "Put on your shoes," try "Do you want to put on the left shoe or the right shoe first?"',
        reason: 'Giving choices activates the prefrontal cortex (decision-making) rather than the amygdala (resistance). It satisfies their developmental need for autonomy.'
    },
    {
        id: 4,
        type: 'wisdom',
        category: 'Storytelling',
        title: 'The Magic Story Thread',
        description: 'Start a story, let them add one sentence, you add one. No rules, just imagination.',
        reason: 'Collaborative storytelling builds theory of mind, sequencing skills, and shared joy. It creates secure attachment through play.'
    },
    {
        id: 5,
        type: 'modern',
        category: 'Emotional Regulation',
        title: 'Color Your Feelings',
        description: 'Ask: "What color is your mad/sad/happy today?" Let them draw it. No judgment, just expression.',
        reason: 'Externalizing emotions through art engages the prefrontal cortex, which calms the amygdala. Visual expression bypasses language barriers in young children.'
    },
    {
        id: 6,
        type: 'wisdom',
        category: 'Connection',
        title: 'The 10-Minute Everything',
        description: 'Set a timer. For 10 minutes, do EXACTLY what they want. Follow their lead completely.',
        reason: 'Child-led play fills their "connection tank" more than hours of distracted parenting. It builds secure attachment and reduces attention-seeking behavior.'
    },
    {
        id: 7,
        type: 'modern',
        category: 'Proprioception',
        title: 'The Sandwich Hug',
        description: 'Place child between couch cushions and give gentle pressure. Deep pressure calms the nervous system.',
        reason: 'Deep touch pressure releases oxytocin and reduces cortisol. It activates the parasympathetic nervous system, shifting the body from fight-or-flight to rest-and-digest.'
    },
    {
        id: 8,
        type: 'wisdom',
        category: 'Ritual',
        title: 'The Worry Stone',
        description: 'Find a smooth stone together. At bedtime, let them tell it one worry. Leave it outside their door.',
        reason: 'Rituals provide predictability, which soothes anxiety. Externalizing worries prevents rumination and signals to the brain that worries are contained and manageable.'
    },
    {
        id: 9,
        type: 'modern',
        category: 'Executive Function',
        title: 'Backward Planning',
        description: 'Getting ready is hard. Try: "What\'s the LAST thing before we leave? Now what comes before that?"',
        reason: 'Working backward strengthens planning and sequencing in the prefrontal cortex. It makes abstract time concrete for developing brains.'
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
    },
    {
        id: 21,
        type: 'modern',
        category: 'Co-Regulation',
        title: 'Breathing Buddies',
        description: 'Place a stuffed animal on their belly while lying down. Watch it rise and fall. Visual feedback activates the vagus nerve.'
    },
    {
        id: 22,
        type: 'wisdom',
        category: 'Morning',
        title: 'The First Hello',
        description: 'Before asking anything, just say good morning and hug. Tasks can wait 60 seconds. Connection first, demands second.'
    },
    {
        id: 23,
        type: 'modern',
        category: 'Sibling Conflict',
        title: 'The Team Problem',
        description: '"Sounds like we have a problem to solve together." Frame it as team vs. problem, not kid vs. kid.'
    },
    {
        id: 24,
        type: 'wisdom',
        category: 'Cooking',
        title: 'Tiny Chef Station',
        description: 'Give them a real job: washing vegetables, tearing lettuce, stirring. Competence builds confidence.'
    },
    {
        id: 25,
        type: 'modern',
        category: 'Anxiety',
        title: 'Worry Time Box',
        description: 'Write worries on paper, put in box. "We\'ll look at these at 4pm." Externalizing thoughts reduces rumination.'
    },
    {
        id: 26,
        type: 'wisdom',
        category: 'Adventure',
        title: 'The Yes Day',
        description: 'Once a month, they make ALL the decisions (within budget/safety). Breakfast for dinner? Why not.'
    },
    {
        id: 27,
        type: 'modern',
        category: 'Focus • 6-8 Years',
        title: 'Brain Breaks',
        description: 'Every 20 mins of homework: 2-min movement break. The brain needs glucose circulation to concentrate.'
    },
    {
        id: 28,
        type: 'wisdom',
        category: 'Car Rides',
        title: 'High/Low Game',
        description: 'Everyone shares their high and low of the day. No fixing, just listening. Makes the minivan a safe space.'
    },
    {
        id: 29,
        type: 'modern',
        category: 'Frustration Tolerance',
        title: 'The Glitter Jar',
        description: 'Shake jar when upset. Watch glitter settle = watch big feelings settle. Visual metaphor for emotional regulation.'
    },
    {
        id: 30,
        type: 'wisdom',
        category: 'Repair',
        title: 'The Do-Over',
        description: 'After you yell: "I don\'t like how I said that. Can I try again?" Models accountability and growth.'
    },
    {
        id: 31,
        type: 'modern',
        category: 'Meltdown Prevention',
        title: 'HALT Check',
        description: 'Before discipline, check: Hungry? Angry? Lonely? Tired? Meet the need first, then address behavior.'
    },
    {
        id: 32,
        type: 'wisdom',
        category: 'Independence',
        title: 'The Choice Board',
        description: 'Pictures of 3-4 activities they can do alone. Builds autonomy and reduces "I\'m bored" whining.'
    },
    {
        id: 33,
        type: 'modern',
        category: 'Vestibular Input',
        title: 'The Spin Doctor',
        description: 'Let them spin in circles 10x. Vestibular input organizes the sensory system. Dizzy = regulated.'
    },
    {
        id: 34,
        type: 'wisdom',
        category: 'Forgiveness',
        title: 'Clean Slate Phrase',
        description: 'End every hard day with: "Tomorrow is a new day." Let them start fresh. Shame doesn\'t teach.'
    },
    {
        id: 35,
        type: 'modern',
        category: 'Impulse Control • 4-6 Years',
        title: 'Red Light, Green Light Body',
        description: 'Practice stopping and starting on command through play. Strengthens the brain\'s "brake pedal."'
    },
    {
        id: 36,
        type: 'wisdom',
        category: 'Bath Time',
        title: 'Magic Potions',
        description: 'Food coloring + water in bottles = magic lab. Bath becomes adventure, not a chore to resist.'
    },
    {
        id: 37,
        type: 'modern',
        category: 'Working Memory',
        title: 'The Repeat-Back Game',
        description: 'After giving instructions, ask them to repeat. Not testing—supporting. Working memory needs practice.'
    },
    {
        id: 38,
        type: 'wisdom',
        category: 'Weather Days',
        title: 'Blanket Fort Headquarters',
        description: 'Rainy? Sick? Stuck inside? Build HQ together. Cozy spaces = safe spaces for big emotions.'
    },
    {
        id: 39,
        type: 'modern',
        category: 'Self-Soothing',
        title: 'The Calm Corner',
        description: 'Not punishment—a cozy spot with books, stuffed animals, sensory toys. Safe harbor for overwhelm.'
    },
    {
        id: 40,
        type: 'wisdom',
        category: 'Money Skills',
        title: 'Three Jars Method',
        description: 'Save, Spend, Share. Every allowance splits three ways. Financial literacy starts at age 4.'
    },
    {
        id: 41,
        type: 'modern',
        category: 'Disappointment',
        title: 'Name It to Tame It',
        description: '"You\'re feeling disappointed." Labeling emotions activates the prefrontal cortex and calms the amygdala.'
    },
    {
        id: 42,
        type: 'wisdom',
        category: 'Screen Time',
        title: 'Tech Sunset Ritual',
        description: '30 mins before bed: devices "go to sleep" in a basket. Consistency > battles. Make it a family rule.'
    },
    {
        id: 43,
        type: 'modern',
        category: 'Interoception',
        title: 'Body Clues Detective',
        description: '"How does your tummy feel? Your chest?" Teach them to read their body\'s signals before meltdown.'
    },
    {
        id: 44,
        type: 'wisdom',
        category: 'Chores',
        title: 'Work Before Play',
        description: 'Clear rule: bed made, teeth brushed, then screen time. Natural consequences teach responsibility.'
    },
    {
        id: 45,
        type: 'modern',
        category: 'Overstimulation',
        title: 'The Noise-Canceling Headphones',
        description: 'Sensory-sensitive kids? Let them wear headphones at loud events. Accommodate, don\'t force.'
    },
    {
        id: 46,
        type: 'wisdom',
        category: 'Grandparents',
        title: 'The Phone Call Ritual',
        description: 'Sunday mornings = call grandma. Builds relationships across distance. Village doesn\'t require proximity.'
    },
    {
        id: 47,
        type: 'modern',
        category: 'Growth Mindset',
        title: 'The Power of Yet',
        description: '"I can\'t do it... YET." Add one word. Changes fixed mindset to growth mindset instantly.'
    },
    {
        id: 48,
        type: 'wisdom',
        category: 'Seasons',
        title: 'Nature Table',
        description: 'Special shelf for found treasures: pinecones, rocks, leaves. Honors their discoveries and curiosity.'
    },
    {
        id: 49,
        type: 'modern',
        category: 'Perfectionism',
        title: 'Oops Book',
        description: 'Journal of mistakes and what you learned. Normalizes failure as learning. Shame cannot survive exposure.'
    },
    {
        id: 50,
        type: 'wisdom',
        category: 'Cleanup',
        title: 'Beat the Timer',
        description: '"Let\'s see if we can clean up before this song ends!" Race = game = cooperation.'
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
