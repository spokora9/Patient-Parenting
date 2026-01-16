// --- QUEST TEMPLATES LIBRARY ---
const questTemplates = {
    morning: {
        name: "Morning Routine",
        icon: "🌅",
        quests: [
            { title: "Wake up on time", xp: 5 },
            { title: "Make bed", xp: 10 },
            { title: "Brush teeth", xp: 5 },
            { title: "Get dressed independently", xp: 10 },
            { title: "Eat breakfast", xp: 5 },
            { title: "Pack school bag", xp: 10 }
        ]
    },
    bedtime: {
        name: "Bedtime Routine",
        icon: "🌙",
        quests: [
            { title: "Bath/shower", xp: 10 },
            { title: "Brush teeth (bedtime)", xp: 5 },
            { title: "Put on pajamas", xp: 5 },
            { title: "Read bedtime story", xp: 15 },
            { title: "Lights out on time", xp: 10 }
        ]
    },
    chores: {
        name: "Daily Chores",
        icon: "🧹",
        quests: [
            { title: "Clear dinner table", xp: 10 },
            { title: "Put toys away", xp: 10 },
            { title: "Feed pet", xp: 5 },
            { title: "Take out recycling", xp: 10 },
            { title: "Tidy bedroom", xp: 15 }
        ]
    },
    homework: {
        name: "Homework & Learning",
        icon: "📚",
        quests: [
            { title: "20 mins reading", xp: 20 },
            { title: "Complete homework", xp: 25 },
            { title: "Practice instrument", xp: 15 },
            { title: "Review spelling words", xp: 10 }
        ]
    },
    kindness: {
        name: "Acts of Kindness",
        icon: "💝",
        quests: [
            { title: "Help sibling", xp: 15 },
            { title: "Say something nice", xp: 10 },
            { title: "Share toys", xp: 10 },
            { title: "Help with cooking", xp: 15 },
            { title: "Thank someone", xp: 5 }
        ]
    },
    weekend: {
        name: "Weekend Activities",
        icon: "🎨",
        quests: [
            { title: "Outdoor play (30 mins)", xp: 15 },
            { title: "Creative project", xp: 20 },
            { title: "Family game time", xp: 15 },
            { title: "Help with weekend chores", xp: 20 }
        ]
    }
};

// Get all template categories
function getTemplateCategories() {
    return Object.keys(questTemplates).map(key => ({
        id: key,
        name: questTemplates[key].name,
        icon: questTemplates[key].icon,
        questCount: questTemplates[key].quests.length
    }));
}

// Get quests from a specific template
function getTemplateQuests(templateId) {
    return questTemplates[templateId]?.quests || [];
}

// Add template to user's quests
function applyTemplate(templateId) {
    const template = questTemplates[templateId];
    if (!template) return;

    const newQuests = template.quests.map((q, index) => ({
        id: `q${Date.now()}_${index}`,
        title: q.title,
        xp: q.xp,
        recurring: true,
        completed: false,
        template: templateId
    }));

    state.customQuests.push(...newQuests);
    saveState();
    audio.playTone('success');
}
