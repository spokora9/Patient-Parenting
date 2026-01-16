// --- STORAGE MANAGER ---
const storage = {
    save: (key, data) => {
        try {
            localStorage.setItem(`parent_architect_${key}`, JSON.stringify(data));
        } catch (e) {
            console.warn('Failed to save to localStorage:', e);
        }
    },
    load: (key, defaultValue) => {
        try {
            const data = localStorage.getItem(`parent_architect_${key}`);
            return data ? JSON.parse(data) : defaultValue;
        } catch (e) {
            console.warn('Failed to load from localStorage:', e);
            return defaultValue;
        }
    },
    clear: () => {
        try {
            Object.keys(localStorage).forEach(key => {
                if (key.startsWith('parent_architect_')) {
                    localStorage.removeItem(key);
                }
            });
        } catch (e) {
            console.warn('Failed to clear localStorage:', e);
        }
    }
};
