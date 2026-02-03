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
    },

    // === More Developing Brain Strategies ===
    {
        id: 82,
        type: 'modern',
        category: 'The Developing Brain',
        ageRange: '4-12',
        title: 'Engage, Don\'t Enrage',
        source: 'The Whole-Brain Child',
        description: 'When correcting behavior, get curious instead of furious. Ask "What happened?" before "Why did you do that?" Investigation before interrogation.',
        reason: 'Defensive "why" questions activate the fear response. Open-ended "what" questions engage the upstairs brain in reflection and problem-solving without triggering shame.'
    },
    {
        id: 83,
        type: 'modern',
        category: 'The Developing Brain',
        ageRange: '6-16',
        title: 'Use It or Lose It',
        source: 'The Whole-Brain Child',
        description: 'Exercise the upstairs brain by asking questions that require thinking: "What else could you have done?" "How do you think they felt?" Build those neural pathways.',
        reason: 'The prefrontal cortex develops through use. Reflective questions strengthen executive function, empathy, and moral reasoning circuits. Unused neural pathways get pruned.'
    },
    {
        id: 84,
        type: 'modern',
        category: 'The Developing Brain',
        ageRange: '3-10',
        title: 'Move It or Lose It',
        source: 'The Whole-Brain Child',
        description: 'Before asking them to regulate emotions or focus, let them move their body. Dance, jump, run - physical movement integrates the brain.',
        reason: 'Physical movement activates the cerebellum and releases neurotransmitters that prepare the brain for learning and emotional regulation. Body precedes mind.'
    },

    // === More Playful Connection ===
    {
        id: 85,
        type: 'wisdom',
        category: 'Playful Connection',
        ageRange: '2-10',
        title: 'The Tickle Tax',
        source: 'Playful Parenting',
        description: 'When they ask for something, playfully demand "payment" in the form of hugs or tickles. Make cooperation fun, not forced.',
        reason: 'Transforming mundane requests into playful exchanges activates the social engagement system. Laughter and physical connection fill the connection cup before compliance.'
    },
    {
        id: 86,
        type: 'wisdom',
        category: 'Playful Connection',
        ageRange: '4-12',
        title: 'Special Time',
        source: 'Hand in Hand Parenting',
        description: 'Set a timer for 10-30 minutes. During this time, the child is in charge. You follow their lead with warm, enthusiastic attention. No corrections, no teaching.',
        reason: 'Child-directed Special Time reverses the power dynamic temporarily, allowing children to process feelings of powerlessness through play. Fills the connection cup faster than hours of distracted time together.'
    },
    {
        id: 87,
        type: 'wisdom',
        category: 'Playful Connection',
        ageRange: '5-14',
        title: 'Playlistening',
        source: 'Hand in Hand Parenting',
        description: 'Notice what makes them laugh and do it again. Be the "bumbling parent" who can\'t find things right in front of you, or pretend you\'re weaker than them.',
        reason: 'Children use laughter to release stress and anxiety. Following their lead in what\'s funny gives them control and helps them process everyday powerlessness through giggles.'
    },

    // === More Respectful Communication ===
    {
        id: 88,
        type: 'modern',
        category: 'Respectful Communication',
        ageRange: '3-16',
        title: 'Give Information, Not Accusation',
        source: 'How to Talk So Kids Will Listen',
        description: 'Instead of "You left your wet towel on the floor again!" try "Wet towels belong on the hook." State the problem, not the blame.',
        reason: 'Information invites problem-solving. Accusations trigger defensiveness and shut down the prefrontal cortex. Facts without criticism preserve dignity and encourage cooperation.'
    },
    {
        id: 89,
        type: 'modern',
        category: 'Respectful Communication',
        ageRange: '4-16',
        title: 'Say It with a Word',
        source: 'How to Talk So Kids Will Listen',
        description: 'Instead of a lecture, use one word. "Dishes." "Homework." "Dog." Kids tune out paragraphs but hear single words.',
        reason: 'Long explanations activate the defensive brain. Single-word reminders respect intelligence and autonomy, giving them space to take responsibility without nagging.'
    },
    {
        id: 90,
        type: 'modern',
        category: 'Respectful Communication',
        ageRange: '3-12',
        title: 'Offer Choices',
        source: 'How to Talk So Kids Will Listen',
        description: '"Do you want to do homework before or after dinner?" "Pajamas or teeth first?" Limited choices give autonomy within boundaries.',
        reason: 'Choice activates the prefrontal cortex and satisfies the developmental need for autonomy. Limited options prevent overwhelm while reducing power struggles.'
    },
    {
        id: 91,
        type: 'modern',
        category: 'Respectful Communication',
        ageRange: '5-16',
        title: 'Problem-Solve Together',
        source: 'How to Talk So Kids Will Listen',
        description: '1) Acknowledge feelings, 2) Define the problem, 3) Invite their ideas, 4) Write down all ideas without judgment, 5) Choose one to try.',
        reason: 'Collaborative problem-solving builds executive function and teaches conflict resolution. Solutions they help create are solutions they\'ll follow.'
    },

    // === More Parent Self-Care ===
    {
        id: 92,
        type: 'modern',
        category: 'Parent Self-Care',
        ageRange: 'All Ages',
        title: 'The Sacred Pause',
        source: 'Parenting from the Inside Out',
        description: 'When triggered, silently ask yourself: "Is this about my child, or is this about my own childhood?" Name your trigger before responding.',
        reason: 'Our strongest reactions are often about our unresolved past, not our child\'s present behavior. Naming the trigger creates space between stimulus and response.'
    },
    {
        id: 93,
        type: 'wisdom',
        category: 'Parent Self-Care',
        ageRange: 'All Ages',
        title: 'The "Good Enough" Parent',
        source: 'Simplicity Parenting',
        description: 'Release perfectionism. Research shows kids need parents who are "good enough" - not perfect. Your repair after mistakes matters more than avoiding them.',
        reason: 'Perfectionist parenting models anxiety and shame. "Good enough" parenting models resilience, self-compassion, and the reality that mistakes don\'t define us.'
    },
    {
        id: 94,
        type: 'modern',
        category: 'Parent Self-Care',
        ageRange: 'All Ages',
        title: 'Fill Your Own Cup First',
        source: 'Aha! Parenting',
        description: 'Identify one small thing that fills you up (5-minute walk, coffee alone, favorite song). Do it daily before you run dry.',
        reason: 'You cannot pour from an empty cup. Self-care isn\'t selfish - it\'s the oxygen mask principle. Regulated parents raise regulated children.'
    },

    // === More High-Conflict Strategies ===
    {
        id: 95,
        type: 'modern',
        category: 'High-Conflict Moments',
        ageRange: '4-16',
        title: 'Plan B: Empathy First',
        source: 'The Explosive Child',
        description: 'Three steps: 1) Empathy - "I noticed..." 2) Define the problem - "The thing is..." 3) Invitation - "Let\'s think about how we can work this out."',
        reason: 'Traditional consequences don\'t work for inflexible kids. Plan B identifies lagging skills and teaches them collaboratively. Kids do well if they can.'
    },
    {
        id: 96,
        type: 'modern',
        category: 'High-Conflict Moments',
        ageRange: 'All Ages',
        title: 'The Time-In (Not Time-Out)',
        source: 'No-Drama Discipline',
        description: 'Instead of isolation, offer connection. "You\'re having a hard time. Want to sit with me?" Co-regulate before you educate.',
        reason: 'Time-outs isolate children when their brains need connection most. Time-ins provide co-regulation, which builds the neural pathways for self-regulation.'
    },
    {
        id: 97,
        type: 'modern',
        category: 'High-Conflict Moments',
        ageRange: '3-12',
        title: 'Consequences vs. Punishment',
        source: 'Positive Discipline',
        description: 'Ask: "Is this related, respectful, reasonable, and revealed in advance?" If not, it\'s punishment, not a consequence.',
        reason: 'Punishments trigger resentment and revenge. Natural and logical consequences teach responsibility while preserving connection and dignity.'
    },

    // === More Emotional Intelligence ===
    {
        id: 98,
        type: 'modern',
        category: 'Emotional Intelligence',
        ageRange: '3-12',
        title: 'Emotion Coaching in Action',
        source: 'Raising An Emotionally Intelligent Child',
        description: 'Child melts down: 1) Name it: "You\'re so frustrated!" 2) Validate it: "It\'s hard when..." 3) Limit behavior: "No hitting" 4) Problem-solve: "What can we do?"',
        reason: 'Emotion coaching builds emotional intelligence, which predicts success in relationships, school, and life better than IQ. The formula: feelings are valid, behavior has limits.'
    },
    {
        id: 99,
        type: 'wisdom',
        category: 'Emotional Intelligence',
        ageRange: '4-12',
        title: 'The Feelings Wheel',
        source: 'Aha! Parenting',
        description: 'Print a feelings wheel with basic emotions in the center (mad, sad, scared, glad) and more nuanced emotions in outer rings. Help them pinpoint the exact feeling.',
        reason: 'Emotional granularity - the ability to distinguish between similar emotions - is linked to better emotional regulation and mental health. "Disappointed" feels different than "betrayed."'
    },
    {
        id: 100,
        type: 'modern',
        category: 'Emotional Intelligence',
        ageRange: '5-16',
        title: 'Name the Thinking Error',
        source: 'Cognitive Behavioral Therapy',
        description: 'Teach thinking traps: All-or-Nothing ("I always fail"), Catastrophizing ("This is the worst"), Mind Reading ("They hate me"). Name them together.',
        reason: 'Metacognition - thinking about thinking - gives children power over their thoughts. Naming cognitive distortions creates distance from them and builds resilience.'
    },

    // === Teens & Adolescents (13-18) ===
    {
        id: 101,
        type: 'modern',
        category: 'Teen Communication',
        ageRange: '13-18',
        title: 'The Side-by-Side Talk',
        source: 'Aha! Parenting',
        description: 'Don\'t force eye contact. Talk during car rides, walks, or while doing dishes together. Teens open up when there\'s an "escape route."',
        reason: 'Direct eye contact feels confrontational to teens. Side-by-side activities lower defenses and create natural conversation flow without intensity.'
    },
    {
        id: 102,
        type: 'wisdom',
        category: 'Teen Communication',
        ageRange: '13-18',
        title: 'Ask, Don\'t Tell',
        source: 'How to Talk So Teens Will Listen',
        description: 'Instead of "You should study more," try "How do you feel about how the semester is going?" Invite reflection instead of imposing solutions.',
        reason: 'Teens\' developmental task is individuation. Unsolicited advice triggers resistance. Questions engage their prefrontal cortex and respect their emerging autonomy.'
    },
    {
        id: 103,
        type: 'modern',
        category: 'Teen Independence',
        ageRange: '13-18',
        title: 'The Gradual Release',
        source: 'Positive Discipline for Teenagers',
        description: 'Pick one area to gradually release control: Later curfew with check-ins, manage own laundry, control own screen time. Build trust incrementally.',
        reason: 'Teens need practice with freedom before they leave home. Gradual release with natural consequences builds executive function and decision-making skills.'
    },
    {
        id: 104,
        type: 'modern',
        category: 'Teen Independence',
        ageRange: '12-18',
        title: 'Mistakes Are Data',
        source: 'Growth Mindset Research',
        description: 'When they fail: "What did you learn?" not "I told you so." Normalize failure as the price of trying. Share your own mistakes.',
        reason: 'Teen brain development requires risk-taking and learning from consequences. Shame about mistakes creates either paralysis or secrecy. Curiosity creates growth.'
    },
    {
        id: 105,
        type: 'wisdom',
        category: 'Teen Connection',
        ageRange: '13-18',
        title: 'The 10-Minute Check-In',
        source: 'Aha! Parenting',
        description: 'Knock on their door nightly. "Got 10 minutes?" Sit on the edge of their bed. Ask open questions. Listen more than you talk.',
        reason: 'Even when teens seem to push away, they need connection. Consistent, low-pressure check-ins maintain the relationship during the turbulent years.'
    },
    {
        id: 106,
        type: 'modern',
        category: 'Teen Brain',
        ageRange: '12-18',
        title: 'The Teen Brain Reality Check',
        source: 'The Teenage Brain (Jensen)',
        description: 'Remember: Their prefrontal cortex won\'t finish developing until age 25. Poor decisions aren\'t defiance - they\'re neurodevelopment. Guide, don\'t punish.',
        reason: 'The teen brain is under construction. The emotional center (limbic system) matures before the rational center (prefrontal cortex). Understanding this changes everything.'
    },
    {
        id: 107,
        type: 'modern',
        category: 'Teen Mental Health',
        ageRange: '13-18',
        title: 'The Anxiety Check',
        source: 'Aha! Parenting',
        description: 'Notice changes in sleep, appetite, grades, or social life. Ask directly: "Have you been feeling anxious or down?" Normalize mental health conversations.',
        reason: 'Teen suicide is the 2nd leading cause of death for ages 10-24. Early intervention is critical. Teens need permission to talk about mental health without shame.'
    },
    {
        id: 108,
        type: 'wisdom',
        category: 'Teen Boundaries',
        ageRange: '13-18',
        title: 'The Non-Negotiables',
        source: 'Positive Discipline for Teenagers',
        description: 'Identify your true bottom lines (safety, respect, illegal activity). Everything else is negotiable. Choose your battles wisely.',
        reason: 'Power struggles over everything push teens away. Clear boundaries on essentials + flexibility on preferences = maintained connection + safety.'
    },

    // === More Sibling Strategies ===
    {
        id: 109,
        type: 'modern',
        category: 'Siblings',
        ageRange: '3-12',
        title: 'Each One Unique',
        source: 'How to Talk So Kids Will Listen',
        description: 'Instead of "I love you both the same," try "I love you each uniquely." Acknowledge their different needs, not identical treatment.',
        reason: 'Fair doesn\'t mean equal. Children need to feel uniquely seen, not identically treated. "Equal" distribution of attention breeds competition.'
    },
    {
        id: 110,
        type: 'wisdom',
        category: 'Siblings',
        ageRange: '4-14',
        title: 'Stay Out of It',
        source: 'Siblings Without Rivalry',
        description: 'Unless blood or broken bones: "You two have a problem. I trust you to work it out." Walk away. Let them practice conflict resolution.',
        reason: 'When we referee, kids learn to manipulate us instead of solving problems. Staying neutral forces them to develop negotiation skills.'
    },
    {
        id: 111,
        type: 'modern',
        category: 'Siblings',
        ageRange: '2-10',
        title: 'Acknowledge the Feeling',
        source: 'How to Talk So Kids Will Listen',
        description: 'Older child upset about new baby: "You wish she\'d go back to the hospital, huh?" Name the taboo feeling without judgment.',
        reason: 'Pretending jealousy doesn\'t exist intensifies it. Acknowledging dark feelings makes them less powerful and builds trust that all feelings are acceptable.'
    },

    // === More Screen Time Strategies ===
    {
        id: 112,
        type: 'modern',
        category: 'Screen Time',
        ageRange: '8-16',
        title: 'The Media Literacy Conversation',
        source: 'Common Sense Media',
        description: 'Ask: "What are they trying to sell you? Who made this? Why?" Teach them to question what they consume, not just how much.',
        reason: 'Digital literacy is the new literacy. Critical thinking about media, advertising, and algorithms protects them from manipulation and builds discernment.'
    },
    {
        id: 113,
        type: 'wisdom',
        category: 'Screen Time',
        ageRange: '10-18',
        title: 'The Phone-Free Bedroom',
        source: 'The Teen Brain',
        description: 'All phones charge in a common area overnight. No exceptions. Sleep deprivation + social media = mental health crisis.',
        reason: 'Blue light disrupts melatonin. Late-night social media increases anxiety and depression. Teens physically can\'t resist the ping - they need external limits.'
    },

    // === Limit Setting & Boundaries ===
    {
        id: 114,
        type: 'modern',
        category: 'Limit Setting',
        ageRange: '2-10',
        title: 'Kind AND Firm',
        source: 'Positive Discipline',
        description: 'Set limits with warmth: "I know you want to stay (kind), AND it\'s bedtime now (firm)." Both/and, not either/or.',
        reason: 'Kindness without firmness is permissiveness. Firmness without kindness is authoritarianism. Both together build secure attachment and healthy boundaries.'
    },
    {
        id: 115,
        type: 'modern',
        category: 'Limit Setting',
        ageRange: '3-16',
        title: 'The Broken Record',
        source: 'How to Talk So Kids Will Listen',
        description: 'They push. You repeat calmly: "I know. The answer is no." Don\'t engage in the debate. Calm repetition shows you mean it.',
        reason: 'Children test limits to see if you mean them. Calm consistency builds security. Debating signals the limit is negotiable.'
    },
    {
        id: 116,
        type: 'wisdom',
        category: 'Limit Setting',
        ageRange: '4-14',
        title: 'Follow Through, Not Threats',
        source: 'Positive Discipline',
        description: 'Instead of "If you don\'t clean up, no dessert!" try: State expectation once, then follow through with natural consequence without anger.',
        reason: 'Repeated warnings teach children to ignore you. Action teaches more than words. Calm follow-through builds respect and responsibility.'
    },

    // === Morning & Bedtime Routines ===
    {
        id: 117,
        type: 'modern',
        category: 'Routines',
        ageRange: '3-10',
        title: 'The Picture Chart',
        source: 'Positive Discipline',
        description: 'Take photos of each morning step: brush teeth, get dressed, pack bag. Let the chart be the boss, not you.',
        reason: 'Visual routines build independence and reduce nagging. When the chart is "in charge," it\'s not a power struggle between parent and child.'
    },
    {
        id: 118,
        type: 'wisdom',
        category: 'Routines',
        ageRange: '2-12',
        title: 'The Bedtime Wind-Down',
        source: 'Simplicity Parenting',
        description: 'Start 90 minutes before sleep: Dim lights, warm bath, quiet activities. Predictable sequence signals the nervous system it\'s time to rest.',
        reason: 'Cortisol takes 90 minutes to clear. Screen time, rough play, or stress right before bed guarantees bedtime battles. Slow wind-down = smooth sleep.'
    },

    // === Resilience & Growth Mindset ===
    {
        id: 119,
        type: 'modern',
        category: 'Resilience',
        ageRange: '5-16',
        title: 'Praise the Process, Not the Person',
        source: 'Growth Mindset (Dweck)',
        description: 'Not "You\'re so smart!" but "I saw you work really hard on that." Effort, strategy, and persistence are what matter.',
        reason: '"Smart" praise creates fixed mindset and fear of failure. Process praise builds growth mindset and resilience. Effort is controllable; ability feels fixed.'
    },
    {
        id: 120,
        type: 'wisdom',
        category: 'Resilience',
        ageRange: '6-16',
        title: 'Normalize Struggle',
        source: 'Growth Mindset',
        description: '"This is hard for you right now" not "This is hard for you." Add "right now" or "yet." Struggle is temporary, not identity.',
        reason: 'Fixed mindset says struggle = inadequacy. Growth mindset says struggle = learning. Language shapes whether challenges feel like threats or opportunities.'
    },
    {
        id: 121,
        type: 'modern',
        category: 'Resilience',
        ageRange: '7-16',
        title: 'The Failure Resume',
        source: 'Growth Mindset',
        description: 'Keep a journal of failures and what they taught. Famous failures: Einstein flunked math, Disney was fired, J.K. Rowling was rejected 12 times.',
        reason: 'Reframing failure as part of success reduces fear of trying. Seeing failure as data rather than identity builds resilience and willingness to take healthy risks.'
    },

    // === Homework & School ===
    {
        id: 122,
        type: 'modern',
        category: 'Homework & School',
        ageRange: '6-14',
        title: 'The Two-Minute Start',
        source: 'Executive Function Research',
        description: '"Just do 2 minutes." Starting is hardest. After 2 minutes, they can stop or continue. Usually they continue.',
        reason: 'Task initiation is an executive function skill. Lowering the activation energy reduces avoidance. Momentum builds naturally once started.'
    },
    {
        id: 123,
        type: 'modern',
        category: 'Homework & School',
        ageRange: '8-18',
        title: 'The Pomodoro Technique',
        source: 'Focus Research',
        description: '25 minutes focused work, 5-minute break. After 4 cycles, take a longer break. Timer makes it concrete.',
        reason: 'Sustained attention fatigues. Scheduled breaks prevent burnout and improve retention. Concrete time limits reduce resistance to starting.'
    },
    {
        id: 124,
        type: 'wisdom',
        category: 'Homework & School',
        ageRange: '5-12',
        title: 'Let Natural Consequences Teach',
        source: 'Positive Discipline',
        description: 'They forgot their homework? Don\'t rescue. Let them experience the consequence. Empathy, not "I told you so."',
        reason: 'Rescuing prevents learning. Natural consequences build responsibility better than lectures. Empathy + experience = growth.'
    },

    // === Friendship & Social Skills ===
    {
        id: 125,
        type: 'modern',
        category: 'Social Skills',
        ageRange: '5-12',
        title: 'The Friendship Framework',
        source: 'Social Thinking Curriculum',
        description: 'Teach: Whole body listening, reading social cues, flexible thinking, problem-solving together. Practice through role-play.',
        reason: 'Social skills aren\'t innate - they\'re learned. Explicit teaching + practice builds social competence for kids who struggle with implicit learning.'
    },
    {
        id: 126,
        type: 'wisdom',
        category: 'Social Skills',
        ageRange: '6-14',
        title: 'Host, Don\'t Just Attend',
        source: 'Connection Building',
        description: 'Having friends over (even one) builds social confidence. Being the host gives control and reduces anxiety.',
        reason: 'Home-turf advantage reduces social anxiety. Hosting builds confidence and allows children to practice hospitality and social orchestration.'
    },
    {
        id: 127,
        type: 'modern',
        category: 'Social Skills',
        ageRange: '8-16',
        title: 'The Friend Drama Detox',
        source: 'Aha! Parenting',
        description: 'They\'re upset about friend conflict. Listen fully, validate feelings, then ask: "What do YOU want to do?" Don\'t fix it for them.',
        reason: 'Parent-mediated friend conflicts undermine social development. Listening + empowering them to solve it builds social problem-solving skills.'
    },

    // === Anger Management ===
    {
        id: 128,
        type: 'modern',
        category: 'Anger Management',
        ageRange: '4-12',
        title: 'The Anger Ladder',
        source: 'Aha! Parenting',
        description: 'Create a visual ladder: 1 (calm) to 10 (rage). Teach interventions at each level. At 3, take deep breaths. At 5, take a break.',
        reason: 'Early intervention prevents escalation. Teaching self-monitoring and level-appropriate tools builds emotional regulation and agency.'
    },
    {
        id: 129,
        type: 'wisdom',
        category: 'Anger Management',
        ageRange: '3-10',
        title: 'The Anger Volcano',
        source: 'Visual Metaphors',
        description: 'Draw a volcano. "What makes the lava bubble up? What helps cool it down?" Make it concrete and externalized.',
        reason: 'Externalizing anger through metaphor creates distance and control. Visual representation helps young children understand and manage big feelings.'
    },
    {
        id: 130,
        type: 'modern',
        category: 'Anger Management',
        ageRange: '5-16',
        title: 'Name the Need Behind the Anger',
        source: 'Nonviolent Communication',
        description: 'Anger is a secondary emotion. Ask: "What do you need? Fairness? To be heard? Control?" Address the need, not just the anger.',
        reason: 'Anger signals unmet needs. Teaching need identification and expression gives children agency and builds emotional literacy beyond surface emotions.'
    },

    // === Teaching Empathy ===
    {
        id: 131,
        type: 'modern',
        category: 'Teaching Empathy',
        ageRange: '4-10',
        title: 'The Perspective-Taking Game',
        source: 'Theory of Mind Research',
        description: 'Read stories or watch shows, pause and ask: "How do you think they feel? Why?" "What do you think they\'re thinking?"',
        reason: 'Perspective-taking builds theory of mind - understanding others have different thoughts/feelings. This is the foundation of empathy and moral reasoning.'
    },
    {
        id: 132,
        type: 'wisdom',
        category: 'Teaching Empathy',
        ageRange: '3-12',
        title: 'The Repair Action',
        source: 'Restorative Justice',
        description: 'They hurt someone? Not "Say sorry." Ask: "What can you do to help them feel better?" Action beats words.',
        reason: 'Forced apologies teach compliance, not empathy. Choosing repair actions teaches genuine care and the impact of behavior on others.'
    },
    {
        id: 133,
        type: 'modern',
        category: 'Teaching Empathy',
        ageRange: '5-16',
        title: 'Model Empathy Out Loud',
        source: 'Aha! Parenting',
        description: 'Narrate your empathy: "That driver looks stressed. I wonder if they\'re having a hard day?" Make your thinking visible.',
        reason: 'Children learn empathy through modeling more than teaching. Verbalizing your empathic thinking shows them the internal process of caring.'
    },

    // === Body Autonomy & Consent ===
    {
        id: 134,
        type: 'modern',
        category: 'Body Autonomy',
        ageRange: '2-10',
        title: 'No Forced Affection',
        source: 'Consent Education',
        description: 'Don\'t force hugs/kisses with relatives. "You can wave, high-five, or hug - your choice." Their body, their rules.',
        reason: 'Forced affection teaches children their body isn\'t theirs to control. Respecting their no builds body autonomy and prevents predator grooming.'
    },
    {
        id: 135,
        type: 'modern',
        category: 'Body Autonomy',
        ageRange: '3-12',
        title: 'Teach "My Body, My Rules"',
        source: 'Safety Education',
        description: '"Your body belongs to you. No one should touch your private parts. If someone does, it\'s not your fault - tell me."',
        reason: 'Clear, shame-free body safety education empowers children to recognize and report abuse. Knowledge is protection.'
    },
    {
        id: 136,
        type: 'wisdom',
        category: 'Body Autonomy',
        ageRange: '8-16',
        title: 'Respect Their "No"',
        source: 'Consent Culture',
        description: 'They say no to tickling/roughhousing? Stop immediately. "Okay, I hear your no." Model consent in everyday moments.',
        reason: 'Teaching that "no" will be respected builds boundaries and consent understanding. Daily practice prepares them for peer/dating consent.'
    },

    // === Neurodivergent & Special Needs Support ===
    {
        id: 137,
        type: 'modern',
        category: 'Neurodivergent Support',
        ageRange: '3-16',
        title: 'Presume Competence',
        source: 'Neurodiversity Movement',
        description: 'Assume they understand even if they can\'t respond typically. Speak to them, not about them. Intelligence ≠ communication ability.',
        reason: 'Presuming competence shapes expectations and opportunities. Many nonspeaking individuals have typical or above-average cognition but need alternative communication.'
    },
    {
        id: 138,
        type: 'modern',
        category: 'Neurodivergent Support',
        ageRange: '4-18',
        title: 'Accommodate, Don\'t Punish',
        source: 'The Explosive Child',
        description: 'Meltdowns aren\'t manipulation - they\'re skill deficits. Provide sensory tools, predictability, reduced demands during stress.',
        reason: 'Behavioral challenges signal lagging skills, not bad behavior. Accommodations address root causes; punishment escalates dysregulation.'
    },
    {
        id: 139,
        type: 'wisdom',
        category: 'Neurodivergent Support',
        ageRange: '5-16',
        title: 'Create a Sensory Diet',
        source: 'Occupational Therapy',
        description: 'Regular sensory input throughout the day: jumping, carrying heavy items, fidgets, quiet time. Prevention beats meltdowns.',
        reason: 'Sensory needs are real physiological needs. Meeting them proactively organizes the nervous system and prevents dysregulation.'
    },

    // === Divorce & Family Changes ===
    {
        id: 140,
        type: 'modern',
        category: 'Divorce Support',
        ageRange: '3-16',
        title: 'Don\'t Make Them Choose',
        source: 'Family Therapy',
        description: '"You don\'t have to pick sides. You can love us both." Never badmouth the other parent. Their love isn\'t betrayal.',
        reason: 'Children in loyalty binds experience toxic stress and identity confusion. Permission to love both parents protects mental health.'
    },
    {
        id: 141,
        type: 'wisdom',
        category: 'Divorce Support',
        ageRange: '4-12',
        title: 'The Two-Home Story',
        source: 'Narrative Therapy',
        description: 'Create a photo book of both homes: "Your red room at Dad\'s, your blue room at Mom\'s. You belong in both."',
        reason: 'Concrete visual of both homes as equally theirs reduces displacement anxiety. Belonging in multiple places builds security.'
    },

    // === Digital Citizenship (Teens) ===
    {
        id: 142,
        type: 'modern',
        category: 'Digital Citizenship',
        ageRange: '10-18',
        title: 'The Permanence Talk',
        source: 'Digital Literacy',
        description: '"Screenshot exists forever. Would you want your grandma/future boss to see this?" Digital footprint is permanent.',
        reason: 'Prefrontal cortex development means teens struggle with long-term consequences. Concrete examples make abstract permanence real.'
    },
    {
        id: 143,
        type: 'modern',
        category: 'Digital Citizenship',
        ageRange: '12-18',
        title: 'The Online Disinhibition Effect',
        source: 'Cyberpsychology',
        description: 'Explain: People say things online they\'d never say in person. Don\'t take anonymous cruelty personally - it\'s about them.',
        reason: 'Understanding online disinhibition builds resilience against cyberbullying and reduces personalization of online attacks.'
    },

    // === Peer Pressure ===
    {
        id: 144,
        type: 'modern',
        category: 'Peer Pressure',
        ageRange: '10-18',
        title: 'The Blame-The-Parent Exit',
        source: 'Aha! Parenting',
        description: 'Give them an out: "Text me \'X\' and I\'ll call with a fake emergency to get you out." Be their excuse.',
        reason: 'Adolescent brain prioritizes peer acceptance. Giving a face-saving exit allows them to make safe choices without social cost.'
    },
    {
        id: 145,
        type: 'wisdom',
        category: 'Peer Pressure',
        ageRange: '8-16',
        title: 'Practice the "No" Script',
        source: 'Assertiveness Training',
        description: 'Role-play responses: "Nah, I\'m good." "Not my thing." "I\'ve got practice." Rehearsed scripts work under pressure.',
        reason: 'Pressure situations trigger fight/flight. Pre-planned scripts bypass the frozen brain and provide automatic responses.'
    },

    // === Academic Pressure & Perfectionism ===
    {
        id: 146,
        type: 'modern',
        category: 'Academic Pressure',
        ageRange: '8-18',
        title: 'B\'s Are Beautiful',
        source: 'Mental Health Advocacy',
        description: 'Normalize not being perfect. Share your own average grades/failures. "You don\'t have to be the best, just give your best."',
        reason: 'Perfectionism is linked to anxiety, depression, and suicide in teens. Accepting "good enough" reduces toxic pressure and increases wellbeing.'
    },
    {
        id: 147,
        type: 'modern',
        category: 'Academic Pressure',
        ageRange: '10-18',
        title: 'One Thing at a Time',
        source: 'Executive Function',
        description: 'Overwhelmed by AP classes + sports + clubs? Help them drop ONE thing. Being excellent at less beats mediocre at everything.',
        reason: 'Overscheduling fragments attention and prevents mastery. Depth in fewer areas builds genuine competence and reduces burnout.'
    },

    // === Teaching Gratitude ===
    {
        id: 148,
        type: 'wisdom',
        category: 'Gratitude',
        ageRange: '5-16',
        title: 'The Gratitude Visit',
        source: 'Positive Psychology',
        description: 'Write a thank-you letter to someone who impacted their life. Deliver it in person. Witness the joy.',
        reason: 'Expressing gratitude to others (vs just listing blessings) creates connection and meaning. Witnessing impact builds empathy.'
    },
    {
        id: 149,
        type: 'modern',
        category: 'Gratitude',
        ageRange: '3-12',
        title: 'The Gratitude Jar',
        source: 'Gratitude Research',
        description: 'Each week, write one good thing on paper, add to jar. On hard days, read past entries. Evidence of goodness.',
        reason: 'Negativity bias means we forget good things. Physical evidence of blessings counters depression and builds resilient thinking.'
    },

    // === Grief & Loss ===
    {
        id: 150,
        type: 'modern',
        category: 'Grief & Loss',
        ageRange: '3-16',
        title: 'Tell the Truth',
        source: 'Child Bereavement',
        description: 'Don\'t say "sleeping" or "passed away." Say "died." Use clear language. Answer questions honestly at their level.',
        reason: 'Euphemisms create confusion and magical thinking. Clear language respects their intelligence and prevents distorted grief.'
    },
    {
        id: 151,
        type: 'wisdom',
        category: 'Grief & Loss',
        ageRange: '4-16',
        title: 'Memory Box',
        source: 'Grief Counseling',
        description: 'Create a box of memories: photos, letters, objects. "They died, but love doesn\'t die. We can remember them forever."',
        reason: 'Continuing bonds with the deceased is healthy grief. Memory rituals honor loss while allowing life to continue.'
    },

    // === Executive Function Building ===
    {
        id: 152,
        type: 'modern',
        category: 'Executive Function',
        ageRange: '6-14',
        title: 'The Planning Conversation',
        source: 'Executive Function Coaching',
        description: 'Before tasks: "What do you need? What\'s your first step? How long will it take? What might be hard?" Externalize planning.',
        reason: 'Executive function develops slowly. Verbalizing plans activates prefrontal cortex and builds the planning process into habit.'
    },
    {
        id: 153,
        type: 'modern',
        category: 'Executive Function',
        ageRange: '7-16',
        title: 'Chunk the Task',
        source: 'Learning Science',
        description: 'Big project? Break it into tiny pieces. Not "write essay" but "choose topic," then "find 3 sources," then "write intro."',
        reason: 'Working memory limits mean large tasks overwhelm. Chunking reduces cognitive load and makes abstract tasks concrete.'
    },

    // === Money & Financial Literacy ===
    {
        id: 154,
        type: 'modern',
        category: 'Money Skills',
        ageRange: '8-16',
        title: 'The Want vs. Need Filter',
        source: 'Financial Literacy',
        description: 'Before purchases: "Is this a want or a need?" Teach the difference. Needs first, then wants with their own money.',
        reason: 'Delaying gratification and distinguishing wants from needs builds executive function and prevents entitlement.'
    },
    {
        id: 155,
        type: 'modern',
        category: 'Money Skills',
        ageRange: '10-18',
        title: 'The First Job',
        source: 'Independence Building',
        description: 'Support (don\'t force) getting a job. Babysitting, lawn mowing, tutoring. Earning money teaches value of work.',
        reason: 'Earning money builds work ethic, time management, and appreciation for family resources. Real-world experience beats lectures.'
    },

    // === Environmental Awareness ===
    {
        id: 156,
        type: 'wisdom',
        category: 'Environmental Care',
        ageRange: '4-16',
        title: 'The Garden Project',
        source: 'Nature Connection',
        description: 'Grow something together. Vegetables, flowers, herbs. Tend it daily. Witness life cycles.',
        reason: 'Caring for living things builds responsibility, patience, and environmental awareness. Watching growth teaches cause and effect.'
    },
    {
        id: 157,
        type: 'modern',
        category: 'Environmental Care',
        ageRange: '6-16',
        title: 'The Trash Audit',
        source: 'Environmental Education',
        description: 'For one week, keep all trash in a bag. See how much waste you create. Brainstorm reduction strategies together.',
        reason: 'Making consumption visible creates awareness. Child-led solutions build agency and environmental responsibility.'
    },

    // === Community & Contribution ===
    {
        id: 158,
        type: 'modern',
        category: 'Community Service',
        ageRange: '5-16',
        title: 'Choose Their Cause',
        source: 'Positive Psychology',
        description: 'Let them pick: animals, environment, hungry people? Volunteer together for THEIR cause. Agency builds commitment.',
        reason: 'Contribution to something bigger builds purpose and meaning. Self-chosen causes engage intrinsic motivation.'
    },
    {
        id: 159,
        type: 'wisdom',
        category: 'Community Service',
        ageRange: '8-18',
        title: 'The Regular Ritual',
        source: 'Character Development',
        description: 'Monthly food bank, weekly dog walking, annual toy drive. Make service a regular part of life, not one-time.',
        reason: 'Consistent service builds it into identity. Regular exposure to others\' struggles builds empathy and gratitude.'
    },

    // === Independence Building Across Ages ===
    {
        id: 160,
        type: 'modern',
        category: 'Independence',
        ageRange: '6-10',
        title: 'The Skill Ladder',
        source: 'Montessori Method',
        description: 'Each year, teach one new life skill: 6=make bed, 7=shower alone, 8=simple breakfast, 9=laundry, 10=basic cooking.',
        reason: 'Systematic skill-building prevents learned helplessness. Competence builds confidence and prepares for eventual independence.'
    },
    {
        id: 161,
        type: 'modern',
        category: 'Independence',
        ageRange: '10-16',
        title: 'The Safety Net Release',
        source: 'Gradual Release Model',
        description: 'Let them fail small now (forgotten lunch, missed bus) so they don\'t fail big later (college, job). Small consequences teach.',
        reason: 'Overprotection prevents resilience. Age-appropriate failure builds problem-solving and creates safety through experience.'
    },

    // === More Teen Mental Health ===
    {
        id: 162,
        type: 'modern',
        category: 'Teen Mental Health',
        ageRange: '13-18',
        title: 'Normalize Therapy',
        source: 'Mental Health Advocacy',
        description: '"Everyone needs support sometimes. Therapy is like a personal trainer for your brain." Remove stigma.',
        reason: 'Teen mental health crisis is real. Normalizing help-seeking saves lives. Early intervention prevents crisis.'
    },
    {
        id: 163,
        type: 'modern',
        category: 'Teen Mental Health',
        ageRange: '13-18',
        title: 'The Depression Check',
        source: 'Suicide Prevention',
        description: 'Notice withdrawal, irritability, sleep changes, giving away possessions. Ask directly: "Are you thinking of hurting yourself?"',
        reason: 'Asking about suicide doesn\'t plant the idea - it saves lives. Direct questions give permission to ask for help.'
    },

    // === Cultural Identity & Diversity ===
    {
        id: 164,
        type: 'modern',
        category: 'Cultural Identity',
        ageRange: '3-16',
        title: 'Mirror Books & Windows',
        source: 'Diverse Literature',
        description: 'Provide books where they see themselves (mirrors) and books about different cultures/identities (windows).',
        reason: 'Children need to see themselves represented to build positive identity. Windows build empathy and prepare for diverse world.'
    },
    {
        id: 165,
        type: 'wisdom',
        category: 'Cultural Identity',
        ageRange: '5-16',
        title: 'Talk About Difference',
        source: 'Anti-Bias Education',
        description: 'Don\'t shush questions about race/disability/family structure. Answer honestly. Silence teaches shame, conversation teaches respect.',
        reason: 'Color-blindness doesn\'t work. Naming and discussing differences with respect builds inclusion and reduces prejudice.'
    },
    // TEEN-SPECIFIC CONTENT (13-16 years)
    {
        id: 166,
        type: 'modern',
        category: 'Teen Connection',
        ageRange: '13-16',
        title: 'The Car Conversation',
        source: 'Untangled',
        description: 'Don\'t face them during tough talks. Drive together or walk side by side. Less eye contact = more honesty.',
        reason: 'Teens\' amygdala is hypersensitive to perceived judgment. Side-by-side positioning reduces threat response, allowing the prefrontal cortex to engage. This is why teens often open up during car rides.'
    },
    {
        id: 167,
        type: 'modern',
        category: 'Teen Development',
        ageRange: '13-16',
        title: 'Knock First, Always',
        source: 'The Yes Brain',
        description: 'Even if the door is open. Wait for "come in." Their room is their autonomy laboratory.',
        reason: 'Adolescent brain development requires practicing control over their environment. Respecting privacy builds the neural pathways for self-regulation and reduces cortisol from boundary violations.'
    },
    {
        id: 168,
        type: 'modern',
        category: 'Teen Emotional Regulation',
        ageRange: '13-16',
        title: 'Name the Pattern, Not the Person',
        description: 'Say "I notice you seem more irritable after gaming" not "You\'re addicted." Observe behavior, don\'t label identity.',
        reason: 'Teen identity is fragile and under construction. Labels activate defensive neural pathways. Pattern observation engages metacognition without triggering shame.'
    },
    {
        id: 169,
        type: 'wisdom',
        category: 'Teen Connection',
        ageRange: '13-16',
        title: 'The Midnight Kitchen Check',
        description: 'If they\'re night owls, be available at their peak hours. Make late-night snacks together without interrogation.',
        reason: 'Adolescent circadian rhythms naturally shift 2-3 hours later (delayed sleep phase). Meeting them at their biological peak, without agenda, builds connection when their guard is down.'
    },
    {
        id: 170,
        type: 'modern',
        category: 'Teen Independence',
        ageRange: '13-16',
        title: 'Problem-Solving Questions',
        source: 'How to Talk So Teens Will Listen',
        description: 'Instead of solving, ask: "What are your options?" "What\'s your plan?" "How can I support that?" Let them lead.',
        reason: 'The prefrontal cortex (executive function) develops through practice, not instruction. Asking questions activates their problem-solving networks; giving answers keeps them dependent.'
    },
    {
        id: 171,
        type: 'modern',
        category: 'Teen Conflict',
        ageRange: '13-16',
        title: 'The 24-Hour Rule',
        description: 'For non-urgent conflicts, say "I need to think about this. Let\'s talk tomorrow." Model emotional regulation.',
        reason: 'Teen conflicts trigger both your and their amygdala. The 24-hour delay allows prefrontal cortex to re-engage, models impulse control, and prevents reactive parenting that damages trust.'
    },
    {
        id: 172,
        type: 'modern',
        category: 'Teen Social Skills',
        ageRange: '13-16',
        title: 'Debrief Social Events',
        description: 'After parties/gatherings, ask: "What did you notice about people?" not "Did you have fun?" Teach social observation.',
        reason: 'Teen social brain is hyperactive but unsophisticated. Reflective questions build theory of mind, emotional intelligence, and social pattern recognition—key skills for navigating peer dynamics.'
    },
    {
        id: 173,
        type: 'modern',
        category: 'Teen Mental Health',
        ageRange: '13-16',
        title: 'Normalize Professional Help',
        source: 'The Teenage Brain',
        description: 'Say "Everyone needs support sometimes. Even I see a therapist." Remove stigma by modeling.',
        reason: 'Teen suicide rates are rising. Normalizing mental health care reduces shame, builds help-seeking behavior, and teaches that emotional wellness requires maintenance like physical health.'
    },
    // CONFLICT RESOLUTION
    {
        id: 174,
        type: 'modern',
        category: 'Conflict Resolution',
        ageRange: '4-12',
        title: 'The Feelings Wheel',
        source: 'Peaceful Parent, Happy Kids',
        description: 'When siblings fight, give each a turn with the "feelings wheel." They spin to name their emotion before talking.',
        reason: 'Naming emotions activates the prefrontal cortex and calms the amygdala (affect labeling). Children can\'t resolve conflict until they move from reactive brainstem to thinking brain.'
    },
    {
        id: 175,
        type: 'modern',
        category: 'Conflict Resolution',
        ageRange: '5-14',
        title: 'The "Both Things" Statement',
        description: 'Teach them: "I\'m mad at you AND I still love you." "I want that toy AND I can wait my turn." Both can be true.',
        reason: 'Binary thinking (all-good or all-bad) is a sign of immature emotional regulation. "Both/and" thinking builds dialectical reasoning and emotional complexity—essential for healthy relationships.'
    },
    {
        id: 176,
        type: 'modern',
        category: 'Sibling Conflict',
        ageRange: '3-10',
        title: 'The Problem-Solving Table',
        description: 'Create a special spot for conflicts. Both kids state the problem, brainstorm solutions, vote. You\'re the facilitator, not judge.',
        reason: 'When parents solve conflicts, kids learn helplessness. When kids solve conflicts with support, they build executive function, negotiation skills, and self-efficacy.'
    },
    {
        id: 177,
        type: 'modern',
        category: 'Conflict Resolution',
        ageRange: '6-16',
        title: 'The Repair Ritual',
        source: 'Sibling Rivalry',
        description: 'After conflicts, require repair not apology. "What can you do to make this better?" Action > words.',
        reason: 'Forced apologies teach dishonesty. Repair actions build empathy, responsibility, and genuine remorse. The act of repairing activates prosocial neural pathways.'
    },
    {
        id: 178,
        type: 'wisdom',
        category: 'Conflict Resolution',
        ageRange: '4-12',
        title: 'The Mediator, Not Rescuer',
        description: 'Say "Sounds like you both have a problem. How will you solve it?" then step back. Don\'t solve for them.',
        reason: 'Rescuing prevents the development of conflict resolution skills. Children need practice navigating disagreement to build resilience and social competence.'
    },
    {
        id: 179,
        type: 'modern',
        category: 'Emotional Regulation',
        ageRange: '5-12',
        title: 'The Calm Corner',
        description: 'Create a designated space with sensory tools (stress ball, putty, breathing cards). It\'s not timeout—it\'s regulation.',
        reason: 'Time-outs increase shame and isolation. A calm corner teaches self-regulation as a skill. Sensory tools activate the parasympathetic nervous system, returning the brain to baseline.'
    },
    // SCREEN TIME MANAGEMENT
    {
        id: 180,
        type: 'modern',
        category: 'Screen Time',
        ageRange: '5-16',
        title: 'The Screen Time Menu',
        source: 'Screenwise',
        description: 'Create a weekly "menu" together. They choose from options you provide. Autonomy within boundaries.',
        reason: 'Rigid rules trigger rebellion. Collaborative decision-making activates prefrontal cortex and builds executive function. Kids who have input are more likely to follow limits.'
    },
    {
        id: 181,
        type: 'modern',
        category: 'Screen Time',
        ageRange: '6-14',
        title: 'The Tech-Free Zones',
        description: 'No screens at: meals, first hour after school, last hour before bed. Create connection windows.',
        reason: 'Screens during transitions prevent emotional regulation. Post-school is prime dysregulation time; screens delay processing. Blue light before bed suppresses melatonin by 50%, disrupting sleep architecture.'
    },
    {
        id: 182,
        type: 'modern',
        category: 'Screen Time',
        ageRange: '8-16',
        title: 'Co-View, Don\'t Spy',
        source: 'The Art of Screen Time',
        description: 'Watch their shows with them. Play their games. Ask genuine questions. Build media literacy together.',
        reason: 'Monitoring without relationship builds resentment. Co-viewing activates social learning pathways, builds critical thinking about media, and maintains connection in their digital world.'
    },
    {
        id: 183,
        type: 'modern',
        category: 'Screen Time',
        ageRange: '10-16',
        title: 'Model Your Phone Use',
        description: 'Say out loud: "I\'m putting my phone away to be present with you." Make your choices visible.',
        reason: 'Mirror neurons mean kids copy what you do, not what you say. Narrating your intentional tech choices builds their metacognition about digital habits.'
    },
    {
        id: 184,
        type: 'modern',
        category: 'Screen Time',
        ageRange: '7-16',
        title: 'The Dopamine Conversation',
        description: 'Teach them how apps are designed to be addictive. Explain dopamine, notifications, infinite scroll. Knowledge is power.',
        reason: 'Understanding the neuroscience of tech addiction activates executive function (top-down control) rather than relying on willpower. Metacognition about cravings reduces their power.'
    },
    {
        id: 185,
        type: 'modern',
        category: 'Screen Time',
        ageRange: '5-14',
        title: 'The Transition Timer',
        description: 'Give 10-min, 5-min, 2-min warnings before screen time ends. Sudden stops trigger meltdowns.',
        reason: 'Screen time activates the brain\'s reward system. Abrupt endings cause dopamine crash and fight-or-flight response. Gradual transitions allow the prefrontal cortex to prepare for the shift.'
    },
    // EMOTIONAL INTELLIGENCE
    {
        id: 186,
        type: 'modern',
        category: 'Emotional Intelligence',
        ageRange: '3-8',
        title: 'Emotion Detective',
        description: 'Watch TV with sound off. Guess emotions from faces and body language. Make it a game.',
        reason: 'Reading facial expressions and body language activates the social brain (superior temporal sulcus). This builds theory of mind and empathy—foundations of emotional intelligence.'
    },
    {
        id: 187,
        type: 'modern',
        category: 'Emotional Intelligence',
        ageRange: '5-12',
        title: 'The Feelings Forecast',
        source: 'Raising an Emotionally Intelligent Child',
        description: 'At breakfast, ask: "What emotion might you feel today? How will you handle it?" Prepare, don\'t react.',
        reason: 'Anticipating emotions activates the prefrontal cortex and builds emotion regulation scripts. Pre-planning coping strategies creates neural pathways that activate during stress.'
    },
    {
        id: 188,
        type: 'modern',
        category: 'Emotional Intelligence',
        ageRange: '4-10',
        title: 'Name Your Own Feelings',
        description: 'Say "I\'m feeling frustrated right now. I need 5 minutes to calm down." Model what you want to see.',
        reason: 'Children learn emotional literacy through observation. When parents name and regulate their own emotions, kids develop richer emotion vocabulary and regulation strategies.'
    },
    {
        id: 189,
        type: 'modern',
        category: 'Emotional Intelligence',
        ageRange: '6-14',
        title: 'The Intensity Scale',
        description: 'Teach 1-10 scale for emotions. "That sounds like a level 7 frustration. What helps you get to a 4?"',
        reason: 'Quantifying emotions builds interoception (awareness of internal states) and activates the prefrontal cortex. Scaling reduces overwhelm by making big feelings more manageable.'
    },
    {
        id: 190,
        type: 'modern',
        category: 'Emotional Intelligence',
        ageRange: '5-16',
        title: 'Perspective-Taking Practice',
        description: 'When discussing conflicts, ask: "What do you think they were feeling? What were they trying to get?"',
        reason: 'Theory of mind (understanding others\' mental states) is the foundation of empathy. Actively practicing perspective-taking strengthens neural networks in the medial prefrontal cortex.'
    },
    {
        id: 191,
        type: 'modern',
        category: 'Emotional Intelligence',
        ageRange: '4-12',
        title: 'Emotion Charades',
        description: 'Act out emotions without words. Guess together. Make it playful.',
        reason: 'Body awareness (proprioception) and emotional awareness are linked. Acting out emotions builds the mind-body connection essential for recognizing and regulating feelings.'
    },
    // EXECUTIVE FUNCTION BUILDING
    {
        id: 192,
        type: 'modern',
        category: 'Executive Function',
        ageRange: '5-12',
        title: 'The Visual Schedule',
        source: 'Smart but Scattered',
        description: 'Use pictures or words to show the order of routines. Let them check off each step. Make it visible.',
        reason: 'The prefrontal cortex (executive function center) isn\'t fully developed until age 25. External scaffolding (visual schedules) reduces working memory load and builds planning skills.'
    },
    {
        id: 193,
        type: 'modern',
        category: 'Executive Function',
        ageRange: '6-14',
        title: 'The When-Then Routine',
        description: 'Replace "if-then" (rewards) with "when-then" (sequence). "When shoes are on, then we leave." State facts, not threats.',
        reason: 'When-then statements build temporal sequencing (a key executive function) without the power struggle of conditional rewards. Facts are less likely to trigger defiance than commands.'
    },
    {
        id: 194,
        type: 'modern',
        category: 'Executive Function',
        ageRange: '7-16',
        title: 'Backwards Planning',
        description: 'For big tasks, start at the end: "The project is due Friday. What needs to happen Thursday? Wednesday?" Build the map together.',
        reason: 'Backwards planning activates the prefrontal cortex and builds temporal reasoning. Breaking tasks into steps reduces overwhelm and teaches the foundational skill of project management.'
    },
    {
        id: 195,
        type: 'modern',
        category: 'Executive Function',
        ageRange: '5-12',
        title: 'The Launch Pad',
        description: 'Designate a spot by the door for backpack, shoes, jacket. Same place, every time. Reduce decisions.',
        reason: 'Executive function is a limited resource. Routinizing simple tasks (always the same spot) preserves cognitive energy for learning. Consistency builds automatic habits.'
    },
    {
        id: 196,
        type: 'modern',
        category: 'Executive Function',
        ageRange: '8-16',
        title: 'Teach Task Initiation',
        source: 'Executive Skills in Children',
        description: 'For homework resistance, say: "Let\'s just do 5 minutes together." Start small. Initiation is the hardest part.',
        reason: 'Task initiation activates the anterior cingulate cortex, which struggles to shift from rest to work. Starting small reduces activation energy and builds momentum.'
    },
    {
        id: 197,
        type: 'modern',
        category: 'Executive Function',
        ageRange: '6-14',
        title: 'The Timer Trick',
        description: 'Use timers for transitions, tasks, and breaks. Visual time (sand timer) is better than abstract time for kids.',
        reason: 'Children have poor time perception due to underdeveloped prefrontal cortex. Visual timers make abstract time concrete, reducing anxiety and improving task completion.'
    },
    // SOCIAL SKILLS & FRIENDSHIP
    {
        id: 198,
        type: 'modern',
        category: 'Social Skills',
        ageRange: '5-12',
        title: 'Friendship Autopsy',
        source: 'The Unwritten Rules of Friendship',
        description: 'After playdates, debrief: "What went well? What was tricky? What would you do differently?" Build social awareness.',
        reason: 'Social skills require explicit teaching and reflection. Metacognition about social interactions builds the neural pathways for reading social cues and adjusting behavior.'
    },
    {
        id: 199,
        type: 'modern',
        category: 'Social Skills',
        ageRange: '6-14',
        title: 'The Conversation Volley',
        description: 'Teach: "Ask a question, they answer, you share, then ask again." Friendship is like tennis—back and forth.',
        reason: 'Reciprocal conversation is not intuitive for kids. Teaching the structure of conversation (question-answer-share) builds social competence and prevents one-sided interactions.'
    },
    {
        id: 200,
        type: 'modern',
        category: 'Social Skills',
        ageRange: '7-16',
        title: 'Teach Flexible Thinking',
        description: 'When plans change, say: "Plan A didn\'t work. What\'s Plan B?" Model adaptability as a skill, not failure.',
        reason: 'Cognitive flexibility (adapting to change) is controlled by the prefrontal cortex. Kids who can\'t shift gears struggle socially. Teaching Plan B thinking builds resilience and reduces rigidity.'
    },
    {
        id: 201,
        type: 'modern',
        category: 'Social Skills',
        ageRange: '5-12',
        title: 'The Apology Formula',
        description: 'Teach: "I\'m sorry for [action]. I understand it hurt you because [impact]. Next time I\'ll [repair]."',
        reason: 'Meaningful apologies require perspective-taking and executive function. The formula builds empathy (understanding impact) and accountability (planning repair).'
    },
    {
        id: 202,
        type: 'modern',
        category: 'Social Skills',
        ageRange: '8-16',
        title: 'Sportsmanship Rituals',
        description: 'After games (win or lose): shake hands, name one thing the opponent did well. Practice grace.',
        reason: 'Sportsmanship is executive function under stress—controlling impulses when emotions are high. Rituals create neural pathways for gracious behavior in competitive situations.'
    },
    {
        id: 203,
        type: 'modern',
        category: 'Social Skills',
        ageRange: '6-14',
        title: 'Body Space Awareness',
        description: 'Teach personal space with hula hoops. Everyone gets a hoop—that\'s your bubble. Respect others\' bubbles.',
        reason: 'Some kids struggle with proprioception and don\'t sense when they\'re too close. Visual/physical boundaries build spatial awareness and social appropriateness.'
    },
    // SELF-REGULATION & INDEPENDENCE
    {
        id: 204,
        type: 'modern',
        category: 'Self-Regulation',
        ageRange: '4-10',
        title: 'The Breathing Buddy',
        description: 'Give them a stuffed animal to place on their belly. Watch it rise and fall. Make breathing visible.',
        reason: 'Deep breathing activates the vagus nerve, switching from sympathetic (stress) to parasympathetic (calm) nervous system. Visual feedback helps kids learn interoception.'
    },
    {
        id: 205,
        type: 'modern',
        category: 'Self-Regulation',
        ageRange: '5-12',
        title: 'The Glitter Jar',
        source: 'Mindful Games',
        description: 'Shake a jar of glitter water. Watch it settle. "This is your brain when upset. See how it calms down?"',
        reason: 'Visual metaphors help kids understand abstract concepts. Watching the glitter settle externalizes the calming process and teaches that emotions are temporary.'
    },
    {
        id: 206,
        type: 'modern',
        category: 'Self-Regulation',
        ageRange: '6-14',
        title: 'Energy Check-Ins',
        description: 'Teach: "Do you need to move your body or rest it?" Help them read their own signals.',
        reason: 'Interoception (sensing internal states) is learned. Regular check-ins build the neural pathways for recognizing whether they need vestibular input or rest.'
    },
    {
        id: 207,
        type: 'modern',
        category: 'Independence',
        ageRange: '3-8',
        title: 'The "I Can" Chart',
        description: 'List tasks they can do independently (pour cereal, turn on light). Add new skills. Celebrate capability.',
        reason: 'Self-efficacy builds through mastery experiences. Visual reminders of competence activate the reward system and motivate new skill acquisition.'
    },
    {
        id: 208,
        type: 'wisdom',
        category: 'Independence',
        ageRange: '5-12',
        title: 'Let Them Struggle (Safely)',
        source: 'The Gift of Failure',
        description: 'Watch them wrestle with a zipper, puzzle, or problem. Don\'t rescue. Say "You\'re working hard on that."',
        reason: 'Productive struggle builds neural connections. Rescuing signals "I don\'t think you can do it," which undermines self-efficacy. Struggle + eventual success = growth mindset.'
    },
    {
        id: 209,
        type: 'modern',
        category: 'Independence',
        ageRange: '6-14',
        title: 'Morning Responsibility Transfer',
        description: 'Give them an alarm clock. Their job to wake up, get dressed, eat. Natural consequences if they\'re late.',
        reason: 'Responsibility without stakes doesn\'t build competence. Natural consequences (being late) activate learning better than parent nagging. Intrinsic motivation > external control.'
    },
    {
        id: 210,
        type: 'modern',
        category: 'Self-Regulation',
        ageRange: '7-16',
        title: 'The Pause Button',
        description: 'Teach: When upset, imagine hitting "pause" on your body. Freeze for 5 seconds. Then choose your action.',
        reason: 'The 5-second pause allows the prefrontal cortex to catch up to the amygdala. This brief delay activates executive function and prevents impulsive reactions.'
    },
    // ADDITIONAL HIGH-VALUE CARDS
    {
        id: 211,
        type: 'modern',
        category: 'Anxiety',
        ageRange: '6-14',
        title: 'The Worry Time',
        source: 'What to Do When You Worry Too Much',
        description: 'Set 15 minutes daily for worry. When worries come up, say "Save it for worry time." Contain it.',
        reason: 'Containing worry to scheduled time prevents it from colonizing the whole day. This teaches the brain that not all thoughts require immediate attention.'
    },
    {
        id: 212,
        type: 'modern',
        category: 'Anxiety',
        ageRange: '5-12',
        title: 'Name the Anxiety Monster',
        description: 'Give anxiety a silly name (Mr. Worry Wart). Externalize it. "Sounds like Mr. Worry Wart is visiting again."',
        reason: 'Externalizing anxiety (narrative therapy) creates psychological distance. The child and parent become a team fighting the monster, not the child fighting themself.'
    },
    {
        id: 213,
        type: 'modern',
        category: 'Growth Mindset',
        ageRange: '5-16',
        title: 'Add "Yet" to Everything',
        source: 'Mindset',
        description: 'When they say "I can\'t do this," add "yet." "You can\'t do it yet." Reframe failure as progress.',
        reason: 'The word "yet" activates growth mindset neural pathways. It reframes challenges as temporary and malleable rather than fixed, promoting persistence.'
    },
    {
        id: 214,
        type: 'modern',
        category: 'Resilience',
        ageRange: '6-14',
        title: 'Mistake of the Week',
        description: 'At dinner, everyone shares their biggest mistake and what they learned. Normalize failure.',
        reason: 'Shame thrives in secrecy. Public mistake-sharing reduces fear of failure, builds psychological safety, and teaches that mistakes are data, not identity.'
    },
    {
        id: 215,
        type: 'modern',
        category: 'Screen Time',
        ageRange: '8-16',
        title: 'The Phone Basket',
        description: 'Everyone (parents too) puts phones in a basket during dinner/family time. Model the behavior you want.',
        reason: 'Mere presence of phones reduces conversation quality by 30%. Physical removal signals prioritization of connection and teaches digital boundaries.'
    },
    {
        id: 216,
        type: 'modern',
        category: 'Emotional Regulation',
        ageRange: '4-10',
        title: 'The Volcano Metaphor',
        description: 'Teach: "Your anger is like a volcano. Can you feel the lava rising? What helps it cool down?"',
        reason: 'Metaphors make abstract emotions concrete. Naming physical sensations (heat, pressure) builds interoception and creates a window for intervention before eruption.'
    },
    {
        id: 217,
        type: 'modern',
        category: 'Connection',
        ageRange: 'All Ages',
        title: 'The 10-Minute Special Time',
        source: 'Peaceful Parent, Happy Kids',
        description: 'Set a timer. Their choice of activity. No multitasking. Full presence. Daily.',
        reason: 'Consistent one-on-one time fills the attachment tank, reducing attention-seeking behavior. Predictability activates the brain\'s reward system and builds secure attachment.'
    },
    {
        id: 218,
        type: 'modern',
        category: 'Sleep',
        ageRange: '3-12',
        title: 'The Calm-Down Ladder',
        description: 'Create a visual ladder: bath → pajamas → stories → songs → lights out. Predictable steps = calm nervous system.',
        reason: 'Bedtime routines trigger melatonin release through classical conditioning. Consistency signals safety to the amygdala, allowing the transition to sleep.'
    },
    {
        id: 219,
        type: 'modern',
        category: 'Gratitude',
        ageRange: '4-16',
        title: 'Rose, Bud, Thorn',
        description: 'At dinner: Rose (highlight), Bud (tomorrow hope), Thorn (challenge). Balanced perspective.',
        reason: 'Gratitude practices increase serotonin and dopamine. Including thorns validates struggle without dwelling in negativity. Balance builds resilience.'
    },
    {
        id: 220,
        type: 'modern',
        category: 'Executive Function',
        ageRange: '6-14',
        title: 'The Two-Minute Rule',
        description: 'If a task takes under 2 minutes (hang coat, put dish in sink), do it now. Build immediate action habit.',
        reason: 'Task initiation is executive function. The 2-minute rule reduces decision fatigue and prevents task accumulation that leads to overwhelm.'
    },
    {
        id: 221,
        type: 'modern',
        category: 'Creativity',
        ageRange: '4-12',
        title: 'Boredom is a Feature',
        description: 'When they say "I\'m bored," respond: "Wonderful! Boredom is where creativity starts." Don\'t rescue.',
        reason: 'Boredom activates the default mode network, which is essential for creativity, imagination, and problem-solving. Constant stimulation prevents this neural development.'
    },
    {
        id: 222,
        type: 'modern',
        category: 'Teen Mental Health',
        ageRange: '12-16',
        title: 'Suicide Prevention Check',
        source: 'American Foundation for Suicide Prevention',
        description: 'Ask directly: "Are you thinking about hurting yourself?" Asking doesn\'t plant the idea—it saves lives.',
        reason: 'Teens contemplating suicide feel relief when asked directly. It opens dialogue, reduces isolation, and allows intervention. Silence and avoidance increase risk.'
    },
    {
        id: 223,
        type: 'modern',
        category: 'Body Autonomy',
        ageRange: '2-12',
        title: 'They Choose Affection',
        description: 'Never force hugs/kisses, even with relatives. "You can wave, high-five, or hug—your choice."',
        reason: 'Forcing physical affection teaches kids their body is not their own. Autonomy over touch builds consent understanding and reduces vulnerability to abuse.'
    },
    {
        id: 224,
        type: 'modern',
        category: 'Financial Literacy',
        ageRange: '6-16',
        title: 'The Three Jars',
        description: 'Allowance divided: Save, Spend, Give. Let them manage all three. Make money visible.',
        reason: 'Financial literacy requires practice with real consequences. Dividing money builds delayed gratification (prefrontal cortex) and generosity (prosocial behavior).'
    },
    {
        id: 225,
        type: 'modern',
        category: 'Identity Development',
        ageRange: '8-16',
        title: 'The "Tell Me More" Approach',
        description: 'When they share something about themselves (identity, interest, belief), respond: "Tell me more." Curiosity > judgment.',
        reason: 'Adolescent identity formation requires exploration. Curiosity signals acceptance and safety, allowing authentic self-discovery. Judgment shuts down sharing and drives secrecy.'
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
