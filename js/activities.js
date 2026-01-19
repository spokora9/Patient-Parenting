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
        description: 'Make up a song about literally anything. Socks, broccoli, the ceiling. Silly = connection.',
        reason: 'Laughter triggers endorphin release and builds social bonds. Absurdity bypasses the critical brain, fostering creativity and joy without judgment.'
    },
    {
        id: 11,
        type: 'modern',
        category: 'Nutrition',
        title: 'Deconstructed Dinner',
        description: 'Serve all meal components separately. Let them build their own plate. Control = less resistance.',
        reason: 'Autonomy reduces food battles by engaging decision-making circuits. Exposure to components builds familiarity without pressure, reducing picky eating over time.'
    },
    {
        id: 12,
        type: 'wisdom',
        category: 'Outdoor Play',
        title: 'Puddle Jumping Permission',
        description: 'Next rainy day, say YES to puddles. Bring towels. Mess = memories. Cortisol down, oxytocin up.',
        reason: 'Sensory play in nature reduces stress hormones. Permission to be messy builds risk assessment and resilience through safe exploration.'
    },
    {
        id: 13,
        type: 'modern',
        category: 'Sleep Routine',
        title: 'The Body Scan',
        description: '"Let\'s relax our toes...now our legs..." Guides them out of fight-or-flight into rest mode.',
        reason: 'Progressive muscle relaxation activates the parasympathetic nervous system. Focusing on body sensations shifts attention from racing thoughts to physical calm.'
    },
    {
        id: 14,
        type: 'wisdom',
        category: 'Connection',
        title: 'Secret Handshake',
        description: 'Create one together. Use it when they\'re brave, scared, or proud. Your special language.',
        reason: 'Shared rituals strengthen attachment bonds and create safety cues. Physical connection activates mirror neurons, building empathy and secure base.'
    },
    {
        id: 15,
        type: 'modern',
        category: 'Attention Span',
        title: 'The 2-Minute Rule',
        description: 'Before asking for focus: 2 mins of wild movement. Jump, spin, dance. Then ask for sitting still.',
        reason: 'Movement primes the cerebellum and increases dopamine, preparing the brain for sustained attention. Physical release prevents fidgeting during focus tasks.'
    },
    {
        id: 16,
        type: 'wisdom',
        category: 'Creativity',
        title: 'The Loose Parts Basket',
        description: 'Box of random stuff: sticks, fabric, cardboard. No instructions. Watch them build worlds.',
        reason: 'Open-ended play develops divergent thinking and problem-solving. Lack of rules engages the default mode network, fostering creativity and executive function.'
    },
    {
        id: 17,
        type: 'modern',
        category: 'Social Skills',
        title: 'Emotion Charades',
        description: 'Act out feelings without words. Builds emotional literacy + theory of mind.',
        reason: 'Embodying emotions activates mirror neurons and builds empathy. Nonverbal expression strengthens the connection between feelings and bodily sensations.'
    },
    {
        id: 18,
        type: 'wisdom',
        category: 'Gratitude',
        title: 'Rose, Bud, Thorn',
        description: 'At dinner: What was good today (rose)? What are you looking forward to (bud)? What was hard (thorn)?',
        reason: 'Structured reflection builds emotional awareness without toxic positivity. Acknowledging both good and bad normalizes the full range of human experience.'
    },
    {
        id: 19,
        type: 'modern',
        category: 'Transitions',
        title: 'The 5-4-3-2-1 Countdown',
        description: 'Give concrete time marker before transitions. "In 5 minutes..." then count down. Predictability = cooperation.',
        reason: 'Time warnings allow the brain to prepare for change, reducing amygdala activation. Predictability creates safety and reduces oppositional behavior.'
    },
    {
        id: 20,
        type: 'wisdom',
        category: 'Bedtime',
        title: 'Flashlight Stories',
        description: 'Lights off, flashlight on. Tell a story on the ceiling. Makes bedtime magical, not a battle.',
        reason: 'Dim lighting triggers melatonin production. Story rituals signal safety to the nervous system, activating the ventral vagal complex for rest.'
    },
    {
        id: 21,
        type: 'modern',
        category: 'Co-Regulation',
        title: 'Breathing Buddies',
        description: 'Place a stuffed animal on their belly while lying down. Watch it rise and fall. Visual feedback activates the vagus nerve.',
        reason: 'Visual biofeedback makes breath awareness concrete for developing brains. Slow breathing activates the parasympathetic nervous system, reducing anxiety.'
    },
    {
        id: 22,
        type: 'wisdom',
        category: 'Morning',
        title: 'The First Hello',
        description: 'Before asking anything, just say good morning and hug. Tasks can wait 60 seconds. Connection first, demands second.',
        reason: 'Morning oxytocin release from physical touch fills the connection tank before making demands. Secure base before expectations reduces resistance all day.'
    },
    {
        id: 23,
        type: 'modern',
        category: 'Sibling Conflict',
        title: 'The Team Problem',
        description: '"Sounds like we have a problem to solve together." Frame it as team vs. problem, not kid vs. kid.',
        reason: 'Reframing conflict as collaborative problem-solving activates the prefrontal cortex instead of threat response. Creates "us vs. problem" instead of "me vs. you."'
    },
    {
        id: 24,
        type: 'wisdom',
        category: 'Cooking',
        title: 'Tiny Chef Station',
        description: 'Give them a real job: washing vegetables, tearing lettuce, stirring. Competence builds confidence.',
        reason: 'Meaningful contribution builds self-efficacy and intrinsic motivation. Mastery experiences strengthen neural pathways for persistence and problem-solving.'
    },
    {
        id: 25,
        type: 'modern',
        category: 'Anxiety',
        title: 'Worry Time Box',
        description: 'Write worries on paper, put in box. "We\'ll look at these at 4pm." Externalizing thoughts reduces rumination.',
        reason: 'Postponing worry contains it in time, preventing catastrophizing. Writing engages the prefrontal cortex, which dampens amygdala hyperactivity.'
    },
    {
        id: 26,
        type: 'wisdom',
        category: 'Adventure',
        title: 'The Yes Day',
        description: 'Once a month, they make ALL the decisions (within budget/safety). Breakfast for dinner? Why not.',
        reason: 'Agency builds executive function and decision-making skills. Controlled autonomy satisfies the developmental need for power without undermining authority.'
    },
    {
        id: 27,
        type: 'modern',
        category: 'Focus • 6-8 Years',
        title: 'Brain Breaks',
        description: 'Every 20 mins of homework: 2-min movement break. The brain needs glucose circulation to concentrate.',
        reason: 'Movement increases blood flow and oxygen to the prefrontal cortex. Short breaks prevent attention fatigue and improve long-term retention.'
    },
    {
        id: 28,
        type: 'wisdom',
        category: 'Car Rides',
        title: 'High/Low Game',
        description: 'Everyone shares their high and low of the day. No fixing, just listening. Makes the minivan a safe space.',
        reason: 'Reflective listening builds emotional intelligence without problem-solving fatigue. Normalizes that every day has both ups and downs.'
    },
    {
        id: 29,
        type: 'modern',
        category: 'Frustration Tolerance',
        title: 'The Glitter Jar',
        description: 'Shake jar when upset. Watch glitter settle = watch big feelings settle. Visual metaphor for emotional regulation.',
        reason: 'Visual metaphors make abstract concepts concrete for young brains. Watching external chaos settle mirrors internal regulation process.'
    },
    {
        id: 30,
        type: 'wisdom',
        category: 'Repair',
        title: 'The Do-Over',
        description: 'After you yell: "I don\'t like how I said that. Can I try again?" Models accountability and growth.',
        reason: 'Modeling repair builds secure attachment. Shows that mistakes don\'t break relationships and teaches conflict resolution through action, not lectures.'
    },
    {
        id: 31,
        type: 'modern',
        category: 'Meltdown Prevention',
        title: 'HALT Check',
        description: 'Before discipline, check: Hungry? Angry? Lonely? Tired? Meet the need first, then address behavior.',
        reason: 'Unmet physiological needs hijack the prefrontal cortex. Meeting basic needs first allows access to higher-order thinking and behavior change.'
    },
    {
        id: 32,
        type: 'wisdom',
        category: 'Independence',
        title: 'The Choice Board',
        description: 'Pictures of 3-4 activities they can do alone. Builds autonomy and reduces "I\'m bored" whining.',
        reason: 'Visual supports reduce working memory load. Self-directed activity builds executive function and reduces learned helplessness.'
    },
    {
        id: 33,
        type: 'modern',
        category: 'Vestibular Input',
        title: 'The Spin Doctor',
        description: 'Let them spin in circles 10x. Vestibular input organizes the sensory system. Dizzy = regulated.',
        reason: 'Vestibular stimulation integrates sensory information and improves focus. Controlled dizziness helps the nervous system process spatial awareness.'
    },
    {
        id: 34,
        type: 'wisdom',
        category: 'Forgiveness',
        title: 'Clean Slate Phrase',
        description: 'End every hard day with: "Tomorrow is a new day." Let them start fresh. Shame doesn\'t teach.',
        reason: 'Daily reset prevents shame accumulation. Secure attachment requires knowing mistakes don\'t define you and relationships survive conflict.'
    },
    {
        id: 35,
        type: 'modern',
        category: 'Impulse Control • 4-6 Years',
        title: 'Red Light, Green Light Body',
        description: 'Practice stopping and starting on command through play. Strengthens the brain\'s "brake pedal."',
        reason: 'Inhibitory control games strengthen the prefrontal cortex. Playful practice builds impulse control without power struggles.'
    },
    {
        id: 36,
        type: 'wisdom',
        category: 'Bath Time',
        title: 'Magic Potions',
        description: 'Food coloring + water in bottles = magic lab. Bath becomes adventure, not a chore to resist.',
        reason: 'Reframing routine tasks as play reduces oppositional behavior. Imagination engages the default mode network, making chores intrinsically motivating.'
    },
    {
        id: 37,
        type: 'modern',
        category: 'Working Memory',
        title: 'The Repeat-Back Game',
        description: 'After giving instructions, ask them to repeat. Not testing—supporting. Working memory needs practice.',
        reason: 'Repetition strengthens working memory pathways in the prefrontal cortex. Verbal rehearsal improves retention and reduces the need for repeated instructions.'
    },
    {
        id: 38,
        type: 'wisdom',
        category: 'Weather Days',
        title: 'Blanket Fort Headquarters',
        description: 'Rainy? Sick? Stuck inside? Build HQ together. Cozy spaces = safe spaces for big emotions.',
        reason: 'Small enclosed spaces trigger feelings of safety (evolutionary cave instinct). Collaborative building strengthens attachment through shared creation.'
    },
    {
        id: 39,
        type: 'modern',
        category: 'Self-Soothing',
        title: 'The Calm Corner',
        description: 'Not punishment—a cozy spot with books, stuffed animals, sensory toys. Safe harbor for overwhelm.',
        reason: 'Designated safe spaces teach self-regulation skills. Voluntary withdrawal prevents meltdowns by allowing autonomy in managing big feelings.'
    },
    {
        id: 40,
        type: 'wisdom',
        category: 'Money Skills',
        title: 'Three Jars Method',
        description: 'Save, Spend, Share. Every allowance splits three ways. Financial literacy starts at age 4.',
        reason: 'Early financial literacy builds delayed gratification and executive function. Physical separation makes abstract money concepts concrete.'
    },
    {
        id: 41,
        type: 'modern',
        category: 'Disappointment',
        title: 'Name It to Tame It',
        description: '"You\'re feeling disappointed." Labeling emotions activates the prefrontal cortex and calms the amygdala.',
        reason: 'Emotion labeling (affect labeling) literally reduces amygdala activity on fMRI scans. Naming feelings makes them less overwhelming and more manageable.'
    },
    {
        id: 42,
        type: 'wisdom',
        category: 'Screen Time',
        title: 'Tech Sunset Ritual',
        description: '30 mins before bed: devices "go to sleep" in a basket. Consistency > battles. Make it a family rule.',
        reason: 'Blue light suppresses melatonin production. Consistent rituals create predictable boundaries without personalized conflict.'
    },
    {
        id: 43,
        type: 'modern',
        category: 'Interoception',
        title: 'Body Clues Detective',
        description: '"How does your tummy feel? Your chest?" Teach them to read their body\'s signals before meltdown.',
        reason: 'Interoception (internal body awareness) is the foundation of emotional regulation. Catching early warning signs prevents full meltdowns.'
    },
    {
        id: 44,
        type: 'wisdom',
        category: 'Chores',
        title: 'Work Before Play',
        description: 'Clear rule: bed made, teeth brushed, then screen time. Natural consequences teach responsibility.',
        reason: 'Premack Principle: high-preference activities reinforce low-preference ones. Clear sequences reduce negotiation and build executive function.'
    },
    {
        id: 45,
        type: 'modern',
        category: 'Overstimulation',
        title: 'The Noise-Canceling Headphones',
        description: 'Sensory-sensitive kids? Let them wear headphones at loud events. Accommodate, don\'t force.',
        reason: 'Sensory accommodations prevent nervous system overload. Meeting sensory needs builds trust and prevents meltdowns rather than "toughening them up."'
    },
    {
        id: 46,
        type: 'wisdom',
        category: 'Grandparents',
        title: 'The Phone Call Ritual',
        description: 'Sunday mornings = call grandma. Builds relationships across distance. Village doesn\'t require proximity.',
        reason: 'Consistent connection rituals maintain attachment bonds. Intergenerational relationships provide perspective and emotional security beyond the nuclear family.'
    },
    {
        id: 47,
        type: 'modern',
        category: 'Growth Mindset',
        title: 'The Power of Yet',
        description: '"I can\'t do it... YET." Add one word. Changes fixed mindset to growth mindset instantly.',
        reason: 'Growth mindset language rewires neural pathways about ability. "Yet" implies potential and process, reducing helplessness and increasing persistence.'
    },
    {
        id: 48,
        type: 'wisdom',
        category: 'Seasons',
        title: 'Nature Table',
        description: 'Special shelf for found treasures: pinecones, rocks, leaves. Honors their discoveries and curiosity.',
        reason: 'Honoring children\'s interests builds intrinsic motivation and curiosity. Nature collections connect to seasonal rhythms and observational skills.'
    },
    {
        id: 49,
        type: 'modern',
        category: 'Perfectionism',
        title: 'Oops Book',
        description: 'Journal of mistakes and what you learned. Normalizes failure as learning. Shame cannot survive exposure.',
        reason: 'Reframing mistakes as data reduces shame and builds resilience. Documenting learning builds metacognition and perspective-taking.'
    },
    {
        id: 50,
        type: 'wisdom',
        category: 'Cleanup',
        title: 'Beat the Timer',
        description: '"Let\'s see if we can clean up before this song ends!" Race = game = cooperation.',
        reason: 'Gamification triggers dopamine release, making tedious tasks intrinsically rewarding. Time pressure adds challenge without power struggle.'
    }
];

// Get unique categories from activities
function getUniqueCategories() {
    const categories = new Set();
    activityLibrary.forEach(activity => {
        // Remove age range if present (e.g., "Development • 3-5 Years" → "Development")
        const category = activity.category.split(' • ')[0];
        categories.add(category);
    });
    return Array.from(categories).sort();
}

// Get unique age ranges from activities
function getUniqueAgeRanges() {
    const ageRanges = new Set();
    activityLibrary.forEach(activity => {
        const parts = activity.category.split(' • ');
        if (parts.length > 1) {
            ageRanges.add(parts[1]);
        }
    });
    return Array.from(ageRanges).sort();
}

// Apply filters to activity library
function getFilteredActivities() {
    const filters = state.activityFilters || { category: null, ageRange: null, keyword: '' };

    return activityLibrary.filter(activity => {
        // Category filter
        if (filters.category) {
            const activityCategory = activity.category.split(' • ')[0];
            if (activityCategory !== filters.category) return false;
        }

        // Age range filter
        if (filters.ageRange) {
            if (!activity.category.includes(filters.ageRange)) return false;
        }

        // Keyword search (search in title, description, reason)
        if (filters.keyword && filters.keyword.trim()) {
            const keyword = filters.keyword.toLowerCase().trim();
            const searchText = `${activity.title} ${activity.description} ${activity.reason || ''}`.toLowerCase();
            if (!searchText.includes(keyword)) return false;
        }

        return true;
    });
}

// Get daily cards (3 random cards)
function getDailyCards() {
    // Check if filters are active
    const filters = state.activityFilters || { category: null, ageRange: null, keyword: '' };
    const hasActiveFilters = filters.category || filters.ageRange || (filters.keyword && filters.keyword.trim());

    // If filters are active, don't use saved cards
    if (!hasActiveFilters) {
        const saved = storage.load('daily_cards', null);
        const today = new Date().toDateString();

        if (saved && saved.date === today) {
            return saved.cards;
        }
    }

    // Get filtered activities or all activities
    const source = hasActiveFilters ? getFilteredActivities() : activityLibrary;

    // Generate new daily cards
    const shuffled = [...source].sort(() => Math.random() - 0.5);
    const cards = shuffled.slice(0, Math.min(3, source.length));

    // Only save to storage if no filters are active
    if (!hasActiveFilters) {
        const today = new Date().toDateString();
        storage.save('daily_cards', { date: today, cards });
    }

    return cards;
}
