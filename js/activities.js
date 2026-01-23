// --- ACTIVITY LIBRARY ---
const activityLibrary = [
    {
        id: 1,
        type: 'modern',
        category: 'Sensory',
        ageRange: '2-10',
        title: 'Heavy Work',
        description: 'Regulate the nervous system. Have them push a laundry basket filled with books across the room.',
        reason: 'Proprioceptive input (deep pressure from muscles and joints) activates the parasympathetic nervous system, reducing cortisol and promoting calm.'
    },
    {
        id: 2,
        type: 'wisdom',
        category: 'Nature',
        ageRange: 'All Ages',
        title: 'Cloud Watching',
        description: 'Go outside. Lie on the grass. Find animals in the sky. No agenda, just observation.',
        reason: 'Nature exposure lowers stress hormones and increases serotonin. Unstructured observation builds attention span and imagination without performance pressure.'
    },
    {
        id: 3,
        type: 'modern',
        category: 'Development',
        ageRange: '3-5',
        title: 'The "Choice" Trick',
        description: 'Instead of "Put on your shoes," try "Do you want to put on the left shoe or the right shoe first?"',
        reason: 'Giving choices activates the prefrontal cortex (decision-making) rather than the amygdala (resistance). It satisfies their developmental need for autonomy.'
    },
    {
        id: 4,
        type: 'wisdom',
        category: 'Storytelling',
        ageRange: '4-12',
        title: 'The Magic Story Thread',
        description: 'Start a story, let them add one sentence, you add one. No rules, just imagination.',
        reason: 'Collaborative storytelling builds theory of mind, sequencing skills, and shared joy. It creates secure attachment through play.'
    },
    {
        id: 5,
        type: 'modern',
        category: 'Emotional Regulation',
        ageRange: '3-10',
        title: 'Color Your Feelings',
        description: 'Ask: "What color is your mad/sad/happy today?" Let them draw it. No judgment, just expression.',
        reason: 'Externalizing emotions through art engages the prefrontal cortex, which calms the amygdala. Visual expression bypasses language barriers in young children.'
    },
    {
        id: 6,
        type: 'wisdom',
        category: 'Connection',
        ageRange: 'All Ages',
        title: 'The 10-Minute Everything',
        description: 'Set a timer. For 10 minutes, do EXACTLY what they want. Follow their lead completely.',
        reason: 'Child-led play fills their "connection tank" more than hours of distracted parenting. It builds secure attachment and reduces attention-seeking behavior.'
    },
    {
        id: 7,
        type: 'modern',
        category: 'Proprioception',
        ageRange: '2-8',
        title: 'The Sandwich Hug',
        description: 'Place child between couch cushions and give gentle pressure. Deep pressure calms the nervous system.',
        reason: 'Deep touch pressure releases oxytocin and reduces cortisol. It activates the parasympathetic nervous system, shifting the body from fight-or-flight to rest-and-digest.'
    },
    {
        id: 8,
        type: 'wisdom',
        category: 'Ritual',
        ageRange: '4-12',
        title: 'The Worry Stone',
        description: 'Find a smooth stone together. At bedtime, let them tell it one worry. Leave it outside their door.',
        reason: 'Rituals provide predictability, which soothes anxiety. Externalizing worries prevents rumination and signals to the brain that worries are contained and manageable.'
    },
    {
        id: 9,
        type: 'modern',
        category: 'Executive Function',
        ageRange: '5-12',
        title: 'Backward Planning',
        description: 'Getting ready is hard. Try: "What\'s the LAST thing before we leave? Now what comes before that?"',
        reason: 'Working backward strengthens planning and sequencing in the prefrontal cortex. It makes abstract time concrete for developing brains.'
    },
    {
        id: 10,
        type: 'wisdom',
        category: 'Play',
        ageRange: 'All Ages',
        title: 'Nonsense Songs',
        description: 'Make up a song about literally anything. Socks, broccoli, the ceiling. Silly = connection.',
        reason: 'Laughter triggers endorphin release and builds social bonds. Absurdity bypasses the critical brain, fostering creativity and joy without judgment.'
    },
    {
        id: 11,
        type: 'modern',
        category: 'Nutrition',
        ageRange: '2-8',
        title: 'Deconstructed Dinner',
        description: 'Serve all meal components separately. Let them build their own plate. Control = less resistance.',
        reason: 'Autonomy reduces food battles by engaging decision-making circuits. Exposure to components builds familiarity without pressure, reducing picky eating over time.'
    },
    {
        id: 12,
        type: 'wisdom',
        category: 'Outdoor Play',
        ageRange: 'All Ages',
        title: 'Puddle Jumping Permission',
        description: 'Next rainy day, say YES to puddles. Bring towels. Mess = memories. Cortisol down, oxytocin up.',
        reason: 'Sensory play in nature reduces stress hormones. Permission to be messy builds risk assessment and resilience through safe exploration.'
    },
    {
        id: 13,
        type: 'modern',
        category: 'Sleep Routine',
        ageRange: '3-12',
        title: 'The Body Scan',
        description: '"Let\'s relax our toes...now our legs..." Guides them out of fight-or-flight into rest mode.',
        reason: 'Progressive muscle relaxation activates the parasympathetic nervous system. Focusing on body sensations shifts attention from racing thoughts to physical calm.'
    },
    {
        id: 14,
        type: 'wisdom',
        category: 'Connection',
        ageRange: 'All Ages',
        title: 'Secret Handshake',
        description: 'Create one together. Use it when they\'re brave, scared, or proud. Your special language.',
        reason: 'Shared rituals strengthen attachment bonds and create safety cues. Physical connection activates mirror neurons, building empathy and secure base.'
    },
    {
        id: 15,
        type: 'modern',
        category: 'Attention Span',
        ageRange: '5-12',
        title: 'The 2-Minute Rule',
        description: 'Before asking for focus: 2 mins of wild movement. Jump, spin, dance. Then ask for sitting still.',
        reason: 'Movement primes the cerebellum and increases dopamine, preparing the brain for sustained attention. Physical release prevents fidgeting during focus tasks.'
    },
    {
        id: 16,
        type: 'wisdom',
        category: 'Creativity',
        ageRange: '2-10',
        title: 'The Loose Parts Basket',
        description: 'Box of random stuff: sticks, fabric, cardboard. No instructions. Watch them build worlds.',
        reason: 'Open-ended play develops divergent thinking and problem-solving. Lack of rules engages the default mode network, fostering creativity and executive function.'
    },
    {
        id: 17,
        type: 'modern',
        category: 'Social Skills',
        ageRange: '4-12',
        title: 'Emotion Charades',
        description: 'Act out feelings without words. Builds emotional literacy + theory of mind.',
        reason: 'Embodying emotions activates mirror neurons and builds empathy. Nonverbal expression strengthens the connection between feelings and bodily sensations.'
    },
    {
        id: 18,
        type: 'wisdom',
        category: 'Gratitude',
        ageRange: 'All Ages',
        title: 'Rose, Bud, Thorn',
        description: 'At dinner: What was good today (rose)? What are you looking forward to (bud)? What was hard (thorn)?',
        reason: 'Structured reflection builds emotional awareness without toxic positivity. Acknowledging both good and bad normalizes the full range of human experience.'
    },
    {
        id: 19,
        type: 'modern',
        category: 'Transitions',
        ageRange: '2-10',
        title: 'The 5-4-3-2-1 Countdown',
        description: 'Give concrete time marker before transitions. "In 5 minutes..." then count down. Predictability = cooperation.',
        reason: 'Time warnings allow the brain to prepare for change, reducing amygdala activation. Predictability creates safety and reduces oppositional behavior.'
    },
    {
        id: 20,
        type: 'wisdom',
        category: 'Bedtime',
        ageRange: '3-10',
        title: 'Flashlight Stories',
        description: 'Lights off, flashlight on. Tell a story on the ceiling. Makes bedtime magical, not a battle.',
        reason: 'Dim lighting triggers melatonin production. Story rituals signal safety to the nervous system, activating the ventral vagal complex for rest.'
    },
    {
        id: 21,
        type: 'modern',
        category: 'Co-Regulation',
        ageRange: '3-10',
        title: 'Breathing Buddies',
        description: 'Place a stuffed animal on their belly while lying down. Watch it rise and fall. Visual feedback activates the vagus nerve.',
        reason: 'Visual biofeedback makes breath awareness concrete for developing brains. Slow breathing activates the parasympathetic nervous system, reducing anxiety.'
    },
    {
        id: 22,
        type: 'wisdom',
        category: 'Morning',
        ageRange: 'All Ages',
        title: 'The First Hello',
        description: 'Before asking anything, just say good morning and hug. Tasks can wait 60 seconds. Connection first, demands second.',
        reason: 'Morning oxytocin release from physical touch fills the connection tank before making demands. Secure base before expectations reduces resistance all day.'
    },
    {
        id: 23,
        type: 'modern',
        category: 'Sibling Conflict',
        ageRange: '3-12',
        title: 'The Team Problem',
        description: '"Sounds like we have a problem to solve together." Frame it as team vs. problem, not kid vs. kid.',
        reason: 'Reframing conflict as collaborative problem-solving activates the prefrontal cortex instead of threat response. Creates "us vs. problem" instead of "me vs. you."'
    },
    {
        id: 24,
        type: 'wisdom',
        category: 'Cooking',
        ageRange: '3-10',
        title: 'Tiny Chef Station',
        description: 'Give them a real job: washing vegetables, tearing lettuce, stirring. Competence builds confidence.',
        reason: 'Meaningful contribution builds self-efficacy and intrinsic motivation. Mastery experiences strengthen neural pathways for persistence and problem-solving.'
    },
    {
        id: 25,
        type: 'modern',
        category: 'Anxiety',
        ageRange: '5-12',
        title: 'Worry Time Box',
        description: 'Write worries on paper, put in box. "We\'ll look at these at 4pm." Externalizing thoughts reduces rumination.',
        reason: 'Postponing worry contains it in time, preventing catastrophizing. Writing engages the prefrontal cortex, which dampens amygdala hyperactivity.'
    },
    {
        id: 26,
        type: 'wisdom',
        category: 'Adventure',
        ageRange: '5-12',
        title: 'The Yes Day',
        description: 'Once a month, they make ALL the decisions (within budget/safety). Breakfast for dinner? Why not.',
        reason: 'Agency builds executive function and decision-making skills. Controlled autonomy satisfies the developmental need for power without undermining authority.'
    },
    {
        id: 27,
        type: 'modern',
        category: 'Focus • 6-8 Years',
        ageRange: '6-8',
        title: 'Brain Breaks',
        description: 'Every 20 mins of homework: 2-min movement break. The brain needs glucose circulation to concentrate.',
        reason: 'Movement increases blood flow and oxygen to the prefrontal cortex. Short breaks prevent attention fatigue and improve long-term retention.'
    },
    {
        id: 28,
        type: 'wisdom',
        category: 'Car Rides',
        ageRange: 'All Ages',
        title: 'High/Low Game',
        description: 'Everyone shares their high and low of the day. No fixing, just listening. Makes the minivan a safe space.',
        reason: 'Reflective listening builds emotional intelligence without problem-solving fatigue. Normalizes that every day has both ups and downs.'
    },
    {
        id: 29,
        type: 'modern',
        category: 'Frustration Tolerance',
        ageRange: '3-10',
        title: 'The Glitter Jar',
        description: 'Shake jar when upset. Watch glitter settle = watch big feelings settle. Visual metaphor for emotional regulation.',
        reason: 'Visual metaphors make abstract concepts concrete for young brains. Watching external chaos settle mirrors internal regulation process.'
    },
    {
        id: 30,
        type: 'wisdom',
        category: 'Repair',
        ageRange: 'All Ages',
        title: 'The Do-Over',
        description: 'After you yell: "I don\'t like how I said that. Can I try again?" Models accountability and growth.',
        reason: 'Modeling repair builds secure attachment. Shows that mistakes don\'t break relationships and teaches conflict resolution through action, not lectures.'
    },
    {
        id: 31,
        type: 'modern',
        category: 'Meltdown Prevention',
        ageRange: 'All Ages',
        title: 'HALT Check',
        description: 'Before discipline, check: Hungry? Angry? Lonely? Tired? Meet the need first, then address behavior.',
        reason: 'Unmet physiological needs hijack the prefrontal cortex. Meeting basic needs first allows access to higher-order thinking and behavior change.'
    },
    {
        id: 32,
        type: 'wisdom',
        category: 'Independence',
        ageRange: '2-8',
        title: 'The Choice Board',
        description: 'Pictures of 3-4 activities they can do alone. Builds autonomy and reduces "I\'m bored" whining.',
        reason: 'Visual supports reduce working memory load. Self-directed activity builds executive function and reduces learned helplessness.'
    },
    {
        id: 33,
        type: 'modern',
        category: 'Vestibular Input',
        ageRange: '3-10',
        title: 'The Spin Doctor',
        description: 'Let them spin in circles 10x. Vestibular input organizes the sensory system. Dizzy = regulated.',
        reason: 'Vestibular stimulation integrates sensory information and improves focus. Controlled dizziness helps the nervous system process spatial awareness.'
    },
    {
        id: 34,
        type: 'wisdom',
        category: 'Forgiveness',
        ageRange: 'All Ages',
        title: 'Clean Slate Phrase',
        description: 'End every hard day with: "Tomorrow is a new day." Let them start fresh. Shame doesn\'t teach.',
        reason: 'Daily reset prevents shame accumulation. Secure attachment requires knowing mistakes don\'t define you and relationships survive conflict.'
    },
    {
        id: 35,
        type: 'modern',
        category: 'Impulse Control • 4-6 Years',
        ageRange: '4-6',
        title: 'Red Light, Green Light Body',
        description: 'Practice stopping and starting on command through play. Strengthens the brain\'s "brake pedal."',
        reason: 'Inhibitory control games strengthen the prefrontal cortex. Playful practice builds impulse control without power struggles.'
    },
    {
        id: 36,
        type: 'wisdom',
        category: 'Bath Time',
        ageRange: '2-8',
        title: 'Magic Potions',
        description: 'Food coloring + water in bottles = magic lab. Bath becomes adventure, not a chore to resist.',
        reason: 'Reframing routine tasks as play reduces oppositional behavior. Imagination engages the default mode network, making chores intrinsically motivating.'
    },
    {
        id: 37,
        type: 'modern',
        category: 'Working Memory',
        ageRange: '4-12',
        title: 'The Repeat-Back Game',
        description: 'After giving instructions, ask them to repeat. Not testing—supporting. Working memory needs practice.',
        reason: 'Repetition strengthens working memory pathways in the prefrontal cortex. Verbal rehearsal improves retention and reduces the need for repeated instructions.'
    },
    {
        id: 38,
        type: 'wisdom',
        category: 'Weather Days',
        ageRange: 'All Ages',
        title: 'Blanket Fort Headquarters',
        description: 'Rainy? Sick? Stuck inside? Build HQ together. Cozy spaces = safe spaces for big emotions.',
        reason: 'Small enclosed spaces trigger feelings of safety (evolutionary cave instinct). Collaborative building strengthens attachment through shared creation.'
    },
    {
        id: 39,
        type: 'modern',
        category: 'Self-Soothing',
        ageRange: '2-10',
        title: 'The Calm Corner',
        description: 'Not punishment—a cozy spot with books, stuffed animals, sensory toys. Safe harbor for overwhelm.',
        reason: 'Designated safe spaces teach self-regulation skills. Voluntary withdrawal prevents meltdowns by allowing autonomy in managing big feelings.'
    },
    {
        id: 40,
        type: 'wisdom',
        category: 'Money Skills',
        ageRange: '4-12',
        title: 'Three Jars Method',
        description: 'Save, Spend, Share. Every allowance splits three ways. Financial literacy starts at age 4.',
        reason: 'Early financial literacy builds delayed gratification and executive function. Physical separation makes abstract money concepts concrete.'
    },
    {
        id: 41,
        type: 'modern',
        category: 'Disappointment',
        ageRange: '2-12',
        title: 'Name It to Tame It',
        description: '"You\'re feeling disappointed." Labeling emotions activates the prefrontal cortex and calms the amygdala.',
        reason: 'Emotion labeling (affect labeling) literally reduces amygdala activity on fMRI scans. Naming feelings makes them less overwhelming and more manageable.'
    },
    {
        id: 42,
        type: 'wisdom',
        category: 'Screen Time',
        ageRange: '4-12',
        title: 'Tech Sunset Ritual',
        description: '30 mins before bed: devices "go to sleep" in a basket. Consistency > battles. Make it a family rule.',
        reason: 'Blue light suppresses melatonin production. Consistent rituals create predictable boundaries without personalized conflict.'
    },
    {
        id: 43,
        type: 'modern',
        category: 'Interoception',
        ageRange: '4-12',
        title: 'Body Clues Detective',
        description: '"How does your tummy feel? Your chest?" Teach them to read their body\'s signals before meltdown.',
        reason: 'Interoception (internal body awareness) is the foundation of emotional regulation. Catching early warning signs prevents full meltdowns.'
    },
    {
        id: 44,
        type: 'wisdom',
        category: 'Chores',
        ageRange: '4-12',
        title: 'Work Before Play',
        description: 'Clear rule: bed made, teeth brushed, then screen time. Natural consequences teach responsibility.',
        reason: 'Premack Principle: high-preference activities reinforce low-preference ones. Clear sequences reduce negotiation and build executive function.'
    },
    {
        id: 45,
        type: 'modern',
        category: 'Overstimulation',
        ageRange: '2-12',
        title: 'The Noise-Canceling Headphones',
        description: 'Sensory-sensitive kids? Let them wear headphones at loud events. Accommodate, don\'t force.',
        reason: 'Sensory accommodations prevent nervous system overload. Meeting sensory needs builds trust and prevents meltdowns rather than "toughening them up."'
    },
    {
        id: 46,
        type: 'wisdom',
        category: 'Grandparents',
        ageRange: 'All Ages',
        title: 'The Phone Call Ritual',
        description: 'Sunday mornings = call grandma. Builds relationships across distance. Village doesn\'t require proximity.',
        reason: 'Consistent connection rituals maintain attachment bonds. Intergenerational relationships provide perspective and emotional security beyond the nuclear family.'
    },
    {
        id: 47,
        type: 'modern',
        category: 'Growth Mindset',
        ageRange: '5-12',
        title: 'The Power of Yet',
        description: '"I can\'t do it... YET." Add one word. Changes fixed mindset to growth mindset instantly.',
        reason: 'Growth mindset language rewires neural pathways about ability. "Yet" implies potential and process, reducing helplessness and increasing persistence.'
    },
    {
        id: 48,
        type: 'wisdom',
        category: 'Seasons',
        ageRange: 'All Ages',
        title: 'Nature Table',
        description: 'Special shelf for found treasures: pinecones, rocks, leaves. Honors their discoveries and curiosity.',
        reason: 'Honoring children\'s interests builds intrinsic motivation and curiosity. Nature collections connect to seasonal rhythms and observational skills.'
    },
    {
        id: 49,
        type: 'modern',
        category: 'Perfectionism',
        ageRange: '5-12',
        title: 'Oops Book',
        description: 'Journal of mistakes and what you learned. Normalizes failure as learning. Shame cannot survive exposure.',
        reason: 'Reframing mistakes as data reduces shame and builds resilience. Documenting learning builds metacognition and perspective-taking.'
    },
    {
        id: 50,
        type: 'wisdom',
        category: 'Cleanup',
        ageRange: '3-10',
        title: 'Beat the Timer',
        description: '"Let\'s see if we can clean up before this song ends!" Race = game = cooperation.',
        reason: 'Gamification triggers dopamine release, making tedious tasks intrinsically rewarding. Time pressure adds challenge without power struggle.'
    },

    // === The Developing Brain (Whole-Brain Child & Executive Function) ===
    {
        id: 51,
        type: 'modern',
        category: 'The Developing Brain',
        ageRange: '2-10',
        title: 'Connect Before Redirect',
        source: 'The Whole-Brain Child',
        description: 'When your child is mid-meltdown, get down on their eye level, offer a touch or a hug, and say: "I see you\'re having a really hard time right now."',
        reason: 'When the "downstairs brain" (the amygdala) is firing, the "upstairs brain" (logic) is offline. Physical connection and empathy soothe the nervous system, allowing the logical brain to come back online so they can actually listen to you.'
    },
    {
        id: 52,
        type: 'modern',
        category: 'The Developing Brain',
        ageRange: '3-12',
        title: 'Name It to Tame It',
        source: 'The Whole-Brain Child',
        description: 'Help your child tell the story of what upset them. "You were building that tower, and then it fell down, and you felt so frustrated, right?"',
        reason: 'Putting words to an emotion sends "soothing neurotransmitters" from the left (logical) brain to the right (emotional) brain. It literally calms the emotional storm by processing the experience.'
    },

    // === Playful Connection ===
    {
        id: 53,
        type: 'wisdom',
        category: 'Playful Connection',
        ageRange: '3-10',
        title: 'The Role Reversal',
        source: 'Playful Parenting',
        description: 'Play a game where your child is the "strong giant" and you are the "tiny, weak human" who can\'t even open a door or lift a pillow.',
        reason: 'Children spend their whole day being told what to do. Letting them be the "powerful" one in play helps them process feelings of powerlessness and builds genuine self-esteem through laughter and mastery.'
    },
    {
        id: 54,
        type: 'wisdom',
        category: 'Playful Connection',
        ageRange: '2-8',
        title: 'The Giggle Break',
        source: 'Hand in Hand Parenting',
        description: 'If a power struggle is brewing over putting on shoes, try to put the shoes on your own ears or hands first. Act confused.',
        reason: 'Laughter lowers cortisol (the stress hormone). By shifting from a command to a "silly" moment, you bypass the "fight-or-flight" response and invite cooperation through connection.'
    },
    {
        id: 55,
        type: 'wisdom',
        category: 'Playful Connection',
        ageRange: '3-10',
        title: 'The "Powerful Child" Pillow Fight',
        source: 'Playful Parenting',
        description: 'Initiate a gentle pillow fight or wrestling match, but commit to losing dramatically. Get "knocked over" by a light tap. Let them triumphantly sit on you while you pretend you are too weak to move.',
        reason: 'Children spend their entire day being told what to do by bigger, stronger adults. Physical play where they get to be the powerful "winner" is incredibly healing and helps them process feelings of powerlessness safely.'
    },
    {
        id: 56,
        type: 'wisdom',
        category: 'Playful Connection',
        ageRange: '0-5',
        title: 'The "Floor Time" Audit',
        source: 'Aha! Parenting',
        description: 'Spend 10 minutes today physically lying on the floor at their eye level while they play. You don\'t have to direct the play or even talk much; just observe the world from their perspective.',
        reason: 'We spend most of our time towering over young children. Changing your physical perspective changes your mental perspective. It signals to the child that you are fully present in their world, which fills their "connection cup" rapidly.'
    },
    {
        id: 57,
        type: 'wisdom',
        category: 'Playful Connection',
        ageRange: '2-8',
        title: 'The Affection Attack',
        source: 'Playful Parenting',
        description: 'When things feel grumpy or disconnected in the house (but not during a full meltdown), announce "I\'m going to get you!" and chase them down for a giant, silly bear hug.',
        reason: 'Sometimes verbal attempts to connect just add pressure. Physical, high-energy, affectionate play breaks through the "grumpy armor," releases endorphins, and hits the reset button on the mood for both parent and child.'
    },

    // === Respectful Communication ===
    {
        id: 58,
        type: 'modern',
        category: 'Respectful Communication',
        ageRange: '3-12',
        title: 'Describe, Don\'t Command',
        source: 'How to Talk So Kids Will Listen',
        description: 'Instead of saying "Clean up these toys!", simply point and say: "I see blocks on the rug that need to go in their bin."',
        reason: 'Commands often trigger instant resistance. Describing the problem invites the child to use their own initiative to solve it, which feels much more empowering than following an order.'
    },
    {
        id: 59,
        type: 'modern',
        category: 'Respectful Communication',
        ageRange: '2-12',
        title: 'All Feelings Are Allowed',
        source: 'Aha! Parenting',
        description: 'Use the "Yes/No" Rule. "YES, you can feel angry that we have to leave the park. NO, you may not hit. Let\'s stomp our feet instead."',
        reason: 'When we limit a child\'s actions but accept their emotions, they learn that they are safe with us even when they are at their worst. This builds the "psychological safety" foundation for lifelong self-worth.'
    },
    {
        id: 60,
        type: 'modern',
        category: 'Respectful Communication',
        ageRange: '2-7',
        title: 'The "Wish" Strategy',
        source: 'How to Talk So Little Kids Will Listen',
        description: 'When a child wants something they can\'t have (like a cookie for breakfast), give it to them in "fantasy." Try: "I wish I had a giant cookie the size of a mattress that we could both sleep on and eat!"',
        reason: 'Little kids often lack the logic to understand why they can\'t have something. Validating the "wish" shows you understand their desire, which often stops the struggle to get the actual item.'
    },
    {
        id: 61,
        type: 'modern',
        category: 'Respectful Communication',
        ageRange: '5-12',
        title: 'Plan B (The Empathy Step)',
        source: 'The Explosive Child',
        description: 'When a recurring conflict happens (like homework or screen time), start with: "I\'ve noticed you\'ve been having a hard time with [X]. What\'s up?" and then just listen.',
        reason: 'This shifts you from an "adversary" (forcing a solution) to a "partner." It uncovers the lagging skill or concern the child has, which is the only way to find a solution that actually sticks.'
    },
    {
        id: 62,
        type: 'modern',
        category: 'Respectful Communication',
        ageRange: '4-10',
        title: 'Connection Before Content',
        source: 'Raising An Emotionally Intelligent Child',
        description: 'Before asking "What happened?" or "Why did you do that?", describe their physical state. Try: "Your face looks very tight and your fists are clenched. You seem really mad."',
        reason: 'This is "Emotion Coaching." By labeling the physical sensation of the emotion, you help the child build a "mindsight" map. Once the emotion is acknowledged, the behavior is much easier to address.'
    },

    // === Parent Self-Care ===
    {
        id: 63,
        type: 'modern',
        category: 'Parent Self-Care',
        ageRange: 'All Ages',
        title: 'The "Reset" Breath',
        source: 'Zen Habits',
        description: 'Before you open your mouth to yell, pause and take one "Notice Breath." Notice the air entering your nose and leaving your mouth.',
        reason: 'This 3-second pause creates a gap between the stimulus (the mess) and your response. It shifts you from your own "downstairs" reactive brain back into your "upstairs" intentional brain.'
    },
    {
        id: 64,
        type: 'wisdom',
        category: 'Parent Self-Care',
        ageRange: 'All Ages',
        title: 'The Soul of Simplicity',
        source: 'Simplicity Parenting',
        description: 'Look at your child\'s toys or schedule. Remove one "toy with batteries" or cancel one non-essential activity this week.',
        reason: 'Excessive "stuff" and "busy-ness" keep a child\'s nervous system in a state of low-level stress. Simplification creates the mental space for deep play and calm behavior to emerge naturally.'
    },
    {
        id: 65,
        type: 'wisdom',
        category: 'Parent Self-Care',
        ageRange: '0-9',
        title: 'Filtering the Adult World',
        source: 'Simplicity Parenting',
        description: 'Practice "The Filter." Avoid discussing adult stresses (money, news, work conflict) or having the TV news on when children are in the room.',
        reason: 'Young children are like sponges but lack the context to process adult problems. Filtering their environment protects their "sacred childhood" and prevents the low-level anxiety that often manifests as behavioral issues.'
    },
    {
        id: 66,
        type: 'modern',
        category: 'Parent Self-Care',
        ageRange: '2-6',
        title: 'The One-Minute Transition',
        source: 'Zen Habits',
        description: 'Instead of yelling from across the room that it\'s time to leave, walk over, put a hand on their shoulder, and watch them play for exactly 60 seconds without saying a word. Then announce the transition.',
        reason: 'Jumping straight into a command is a "shock" to a child\'s flow. By joining their world for one minute, you bridge the gap between their play and your request, making them much more likely to follow your lead.'
    },

    // === High-Conflict & "Big Emotion" Moments ===
    {
        id: 67,
        type: 'modern',
        category: 'High-Conflict Moments',
        ageRange: 'All Ages',
        title: 'Turn Down the "Shark Music"',
        source: 'No-Drama Discipline',
        description: 'When your child misbehaves, notice the internal soundtrack playing in your head. Is it ominous "shark music" telling you this behavior is a disaster? Try: Take a breath and consciously switch your internal soundtrack to calm "elevator music" before you respond.',
        reason: 'Your state of mind dictates your child\'s reaction. If you approach with alarm (shark music), their brain goes into defense mode. If you approach with calm, you keep their "upstairs brain" (the part that can learn) online.'
    },
    {
        id: 68,
        type: 'modern',
        category: 'High-Conflict Moments',
        ageRange: '5-16',
        title: 'The "Can\'t vs. Won\'t" Lens',
        source: 'The Explosive Child',
        description: 'When a child repeatedly fails at a task (like getting off a screen or starting homework), stop assuming they won\'t do it. Assume they can\'t do it right now. Ask yourself: "What skill are they missing to handle this situation?"',
        reason: 'Explosive behavior happens when the demands of the environment exceed the child\'s capacity to respond adaptively. Identifying the missing skill is the only way to solve the actual problem rather than just punishing the reaction.'
    },
    {
        id: 69,
        type: 'modern',
        category: 'High-Conflict Moments',
        ageRange: '4-12',
        title: 'Focus on Solutions, Not Blame',
        source: 'Positive Discipline',
        description: 'A spill happens, something breaks, or a rule is broken. Instead of asking "Who did this?" or lecturing, calmly ask: "Uh oh. What do we need to do to fix this?"',
        reason: 'Blame triggers shame and defensiveness, shutting down learning. Focusing instantly on repair teaches responsibility and executive function without damaging the connection.'
    },

    // === Emotional Intelligence & Regulation ===
    {
        id: 70,
        type: 'modern',
        category: 'Emotional Intelligence',
        ageRange: '3-10',
        title: 'Emotion Coaching Framework',
        source: 'Raising An Emotionally Intelligent Child',
        description: 'When big feelings arise: 1) Notice the emotion, 2) See it as an opportunity to connect, 3) Listen and validate, 4) Help them label feelings, 5) Set limits on behavior while problem-solving.',
        reason: 'John Gottman\'s research shows emotion-coached children have better immune systems, higher academic achievement, better peer relationships, and fewer behavioral problems. The key is validating feelings while guiding behavior.'
    },
    {
        id: 71,
        type: 'wisdom',
        category: 'Emotional Intelligence',
        ageRange: '5-12',
        title: 'The Feelings Thermometer',
        source: 'Aha! Parenting',
        description: 'Draw a thermometer with numbers 1-10. Ask them to point to how big their feeling is. "Is your mad at a 3 or an 8?" This externalizes intensity.',
        reason: 'Making emotion intensity visible and measurable helps children develop emotional granularity - the ability to distinguish between similar emotions. This is the foundation of emotional regulation and reduces "all-or-nothing" thinking.'
    },
    {
        id: 72,
        type: 'modern',
        category: 'Emotional Intelligence',
        ageRange: '6-12',
        title: 'The RULER Approach',
        source: 'Yale Center for Emotional Intelligence',
        description: 'Teach the framework: Recognize emotions in yourself and others, Understand causes and consequences, Label emotions accurately, Express emotions appropriately, Regulate emotions effectively.',
        reason: 'The RULER approach is evidence-based and reduces anxiety, depression, and behavioral issues while improving grades and social skills. Emotional literacy is as important as reading literacy.'
    },

    // === Mindfulness & Presence ===
    {
        id: 73,
        type: 'wisdom',
        category: 'Mindfulness',
        ageRange: '4-12',
        title: 'The Mindful Bell',
        source: 'Everyday Blessings (Kabat-Zinn)',
        description: 'Ring a bell or chime. Everyone stops and takes three deep breaths together, noticing how their body feels. Do this randomly throughout the day.',
        reason: 'Brief mindfulness "interruptions" train the brain to shift out of autopilot mode. Regular practice strengthens the prefrontal cortex and reduces reactivity in both parents and children.'
    },
    {
        id: 74,
        type: 'wisdom',
        category: 'Mindfulness',
        ageRange: '3-8',
        title: 'Belly Breathing with Stuffies',
        source: 'Mindful Parenting',
        description: 'Have child lie down with a stuffed animal on their belly. Watch it rise and fall as they breathe. "Let\'s make the stuffy go up and down slowly."',
        reason: 'Visual biofeedback makes breath awareness concrete for young children. Slow, diaphragmatic breathing activates the vagus nerve, shifting from sympathetic (stress) to parasympathetic (calm) nervous system.'
    },

    // === Building Self-Esteem (Dorothy Corkille Briggs) ===
    {
        id: 75,
        type: 'modern',
        category: 'Self-Esteem',
        ageRange: 'All Ages',
        title: 'The Mirror of Parental Response',
        source: 'Your Child\'s Self-Esteem',
        description: 'Children develop their self-image from how we respond to them. Practice responding with warmth and respect even during corrections: "I love you AND that behavior doesn\'t work here. Let\'s try again."',
        reason: 'Children cannot see themselves directly - they only see their reflection in the "mirror" of our faces, words, and actions. Our consistent, loving response becomes their internal voice and self-worth.'
    },
    {
        id: 76,
        type: 'modern',
        category: 'Self-Esteem',
        ageRange: '3-12',
        title: 'Separate Child from Behavior',
        source: 'Your Child\'s Self-Esteem',
        description: 'Say "That was an unkind choice" not "You\'re being mean." Or "I see a mess that needs cleaning" not "You\'re so messy." Behavior is temporary; identity is permanent.',
        reason: 'When we label the child instead of the behavior, we damage their core sense of self. Separating the two teaches that mistakes don\'t define them and change is always possible.'
    },
    {
        id: 77,
        type: 'wisdom',
        category: 'Self-Esteem',
        ageRange: 'All Ages',
        title: 'The Power of "I Notice"',
        source: 'Your Child\'s Self-Esteem',
        description: 'Instead of "Good job!" try specific noticing: "I noticed you shared your truck with your sister" or "I saw you keep trying even when it was hard." Description beats evaluation.',
        reason: 'Generic praise creates external validation dependency. Specific noticing teaches children to recognize their own accomplishments and builds intrinsic motivation. They learn to see and value themselves accurately.'
    },

    // === Sibling Relationships ===
    {
        id: 78,
        type: 'modern',
        category: 'Siblings',
        ageRange: '3-10',
        title: 'Siblings Without Rivalry',
        source: 'How to Talk So Kids Will Listen',
        description: 'Avoid comparisons. Instead of "Why can\'t you be nice like your sister?" try "You\'re having a hard time being gentle right now. What do you need?"',
        reason: 'Comparisons breed resentment and damage both children\'s self-esteem. Each child needs to feel uniquely valued, not measured against their siblings.'
    },
    {
        id: 79,
        type: 'wisdom',
        category: 'Siblings',
        ageRange: '4-12',
        title: 'Special Time for Each Child',
        source: 'Hand in Hand Parenting',
        description: 'Schedule 10-20 minutes alone with each child regularly. No siblings, no phones. They choose the activity. This is their time with you.',
        reason: 'Sibling conflict often stems from competition for parental attention. Regular one-on-one time fills each child\'s "connection cup" individually, reducing rivalry and attention-seeking behavior.'
    },

    // === Screen Time & Technology ===
    {
        id: 80,
        type: 'modern',
        category: 'Screen Time',
        ageRange: '3-12',
        title: 'Co-Viewing Instead of Prohibition',
        source: 'Common Sense Media',
        description: 'When they watch something, sit with them sometimes. Ask questions: "Why did that character do that?" "How do you think they felt?" Turn passive into active.',
        reason: 'Co-viewing transforms screen time from passive consumption to active learning. It builds critical thinking, emotional literacy, and connection - and helps you understand their media world.'
    },
    {
        id: 81,
        type: 'modern',
        category: 'Screen Time',
        ageRange: '5-16',
        title: 'The Tech-Free Meal Rule',
        source: 'Aha! Parenting',
        description: 'All devices (including parent phones) stay in a basket during meals. Make it a family rule, not a kid-specific rule.',
        reason: 'Family meals with face-to-face conversation are linked to better grades, lower substance abuse, and stronger family bonds. But only when everyone is present, not just physically there.'
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

// Check if activity age range matches designated ages
function matchesDesignatedAges(activity) {
    const designatedAges = state.designatedAges || [];

    // If no designated ages are set, show all cards
    if (designatedAges.length === 0) return true;

    // If activity has no age range or says "All Ages", always show it
    if (!activity.ageRange || activity.ageRange === 'All Ages') return true;

    // Parse age range (e.g., "3-10" or "0-5")
    const ageRangeParts = activity.ageRange.split('-');
    if (ageRangeParts.length !== 2) return true; // Malformed range, show it

    const minAge = parseInt(ageRangeParts[0]);
    const maxAge = parseInt(ageRangeParts[1]);

    // Check if any designated age falls within the activity's range
    return designatedAges.some(age => age >= minAge && age <= maxAge);
}

// Apply filters to activity library
function getFilteredActivities() {
    const filters = state.activityFilters || { category: null, ageRange: null, keyword: '' };

    return activityLibrary.filter(activity => {
        // Designated ages filter (always applied)
        if (!matchesDesignatedAges(activity)) return false;

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
