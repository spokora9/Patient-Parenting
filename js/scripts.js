// --- SCRIPT DESIGNER LIBRARY ---
// Database of scripts for common parenting scenarios
const scriptLibrary = [
    {
        id: 1,
        scenario: 'Hitting',
        keywords: ['hitting', 'violence', 'aggressive', 'hurt', 'hit'],
        instead: 'Stop! Hitting hurts.',
        say: '"I can see you\'re upset. Hitting hurts. What words can you use to tell me how you feel?"',
        note: 'At this moment, they need firm boundaries + empathy. Name the feeling, not the behavior.'
    },
    {
        id: 2,
        scenario: 'Not Listening',
        keywords: ['not listening', 'ignoring', 'tune out', 'ignore'],
        instead: 'Why aren\'t you listening?!',
        say: '"I need you to look at my eyes. I\'m going to say something important." (Pause) "Thank you for listening."',
        note: 'Connection before correction. Get down to their level. Make it a request, not a demand.'
    },
    {
        id: 3,
        scenario: 'Won\'t Sleep',
        keywords: ['sleep', 'bedtime', 'won\'t sleep', 'staying up'],
        instead: 'Just go to bed!',
        say: '"Your body needs rest to grow strong. Let\'s read one story, then lights out. Which book tonight?"',
        note: 'Give them autonomy within boundaries. Routine = safety for their nervous system.'
    },
    {
        id: 4,
        scenario: 'Tantrum in Public',
        keywords: ['tantrum', 'public', 'meltdown', 'crying', 'screaming'],
        instead: 'Stop embarrassing me!',
        say: '(Quiet, calm tone) "I see you\'re having big feelings. Let\'s take a break." (Move to quieter spot if possible)',
        note: 'Their behavior is communication, not manipulation. Your calm is their calm.'
    },
    {
        id: 5,
        scenario: 'Sibling Fighting',
        keywords: ['fighting', 'sibling', 'brother', 'sister', 'argue'],
        instead: 'Stop fighting right now!',
        say: '"It sounds like you both want the same thing. Let\'s figure this out together. [Name], what happened first?"',
        note: 'Be the mediator, not the judge. Teach negotiation skills early.'
    },
    {
        id: 6,
        scenario: 'Refusing Food',
        keywords: ['won\'t eat', 'picky', 'refusing food', 'dinner'],
        instead: 'Just eat it!',
        say: '"You don\'t have to eat it, but this is what we\'re having. Your tummy might get hungry later."',
        note: 'Trust their body cues. Power struggles with food can last years. Offer, don\'t force.'
    },
    {
        id: 7,
        scenario: 'Morning Rush',
        keywords: ['morning', 'getting ready', 'rushing', 'late', 'school'],
        instead: 'Hurry up! We\'re late!',
        say: '"We leave in 10 minutes. What do you need to do first? Shoes or coat?"',
        note: 'Give time warnings. Break tasks into steps. Let them lead the order.'
    },
    {
        id: 8,
        scenario: 'Lying',
        keywords: ['lying', 'lie', 'not telling truth', 'dishonest'],
        instead: 'You\'re lying!',
        say: '"That doesn\'t sound like what really happened. Let\'s try again. I won\'t be mad—I just need to know the truth."',
        note: 'Create safety for honesty. Lying is developmentally normal (ages 3-6). It means their imagination is growing.'
    },
    {
        id: 9,
        scenario: 'Screen Time Battle',
        keywords: ['screen', 'ipad', 'tv', 'tablet', 'phone', 'youtube'],
        instead: 'No more screens!',
        say: '"You have 5 more minutes. When the timer beeps, it\'s time to turn it off. What will you do next?"',
        note: 'Predictability reduces meltdowns. Give them a heads-up and a plan for what comes after.'
    },
    {
        id: 10,
        scenario: 'Whining',
        keywords: ['whining', 'whine', 'annoying voice'],
        instead: 'Stop whining!',
        say: '"I can\'t understand whiny voice. Can you try again with your regular voice?"',
        note: 'Don\'t reward it with attention, but don\'t shame them. Teach them how to ask effectively.'
    }
];

// Search scripts by keyword or scenario
function searchScripts(query) {
    if (!query || query.trim() === '') return scriptLibrary;

    const lowerQuery = query.toLowerCase().trim();

    return scriptLibrary.filter(script => {
        return script.scenario.toLowerCase().includes(lowerQuery) ||
               script.keywords.some(keyword => keyword.includes(lowerQuery));
    });
}

// Get script by ID
function getScriptById(id) {
    return scriptLibrary.find(script => script.id === id);
}
