(function () {
    const storageKey = 'urltrimmer-theme';
    const root = document.documentElement;

    const getPreferredTheme = () => {
        const stored = localStorage.getItem(storageKey);
        if (stored === 'light' || stored === 'dark') {
            return stored;
        }

        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };

    const applyTheme = (theme) => {
        const normalizedTheme = theme === 'dark' ? 'dark' : 'light';
        root.setAttribute('data-theme', normalizedTheme);
        root.style.colorScheme = normalizedTheme;
        localStorage.setItem(storageKey, normalizedTheme);
    };

    const getCurrentTheme = () => root.getAttribute('data-theme') || getPreferredTheme();

    window.themeManager = {
        getCurrentTheme,
        applyTheme,
        toggleTheme: () => {
            const nextTheme = getCurrentTheme() === 'dark' ? 'light' : 'dark';
            applyTheme(nextTheme);
        },
        initialize: () => {
            applyTheme(getPreferredTheme());
        }
    };

    window.themeManager.initialize();
})();
