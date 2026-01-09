/**
 * Theme Manager Module
 * Handles light/dark theme switching with system preference detection
 * and localStorage persistence
 */

export class ThemeManager {
    constructor() {
        this.storageKey = 'portfolio-theme';
        this.themes = {
            LIGHT: 'light',
            DARK: 'dark',
            AUTO: 'auto'
        };
        
        this.currentTheme = this.themes.AUTO;
        this.systemPreference = this.getSystemPreference();
        
        // Bind methods
        this.handleToggleClick = this.handleToggleClick.bind(this);
        this.handleSystemPreferenceChange = this.handleSystemPreferenceChange.bind(this);
        this.handleKeyboardToggle = this.handleKeyboardToggle.bind(this);
    }
    
    /**
     * Initialize the theme manager
     */
    init() {
        try {
            // Load saved theme or detect system preference
            this.loadTheme();
            
            // Set up event listeners
            this.setupEventListeners();
            
            // Apply initial theme
            this.applyTheme();
            
            console.log('Theme manager initialized');
        } catch (error) {
            console.error('Error initializing theme manager:', error);
            // Fallback to light theme
            this.setTheme(this.themes.LIGHT);
        }
    }
    
    /**
     * Set up event listeners
     */
    setupEventListeners() {
        // Theme toggle button
        const toggleButton = document.querySelector('.theme-toggle');
        if (toggleButton) {
            toggleButton.addEventListener('click', this.handleToggleClick);
            toggleButton.addEventListener('keydown', this.handleKeyboardToggle);
        }
        
        // System preference changes
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener('change', this.handleSystemPreferenceChange);
        } else {
            // Fallback for older browsers
            mediaQuery.addListener(this.handleSystemPreferenceChange);
        }
    }
    
    /**
     * Load theme from localStorage or system preference
     */
    loadTheme() {
        try {
            const savedTheme = localStorage.getItem(this.storageKey);
            
            if (savedTheme && Object.values(this.themes).includes(savedTheme)) {
                this.currentTheme = savedTheme;
            } else {
                // Use system preference as default
                this.currentTheme = this.systemPreference;
            }
        } catch (error) {
            console.warn('Could not load theme from localStorage:', error);
            this.currentTheme = this.systemPreference;
        }
    }
    
    /**
     * Get system color scheme preference
     */
    getSystemPreference() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return this.themes.DARK;
        }
        return this.themes.LIGHT;
    }
    
    /**
     * Apply the current theme to the document
     */
    applyTheme() {
        const themeToApply = this.currentTheme === this.themes.AUTO 
            ? this.systemPreference 
            : this.currentTheme;
        
        // Set data attribute on document element
        document.documentElement.setAttribute('data-theme', themeToApply);
        
        // Update toggle button icon and aria-label
        this.updateToggleButton(themeToApply);
        
        // Dispatch custom event for other components
        this.dispatchThemeChangeEvent(themeToApply);
        
        console.log(`Theme applied: ${themeToApply}`);
    }
    
    /**
     * Update theme toggle button appearance and accessibility
     */
    updateToggleButton(appliedTheme) {
        const toggleButton = document.querySelector('.theme-toggle');
        if (!toggleButton) return;
        
        const icon = toggleButton.querySelector('.theme-toggle__icon');
        if (!icon) return;
        
        // Update aria-label for accessibility
        const nextTheme = appliedTheme === this.themes.DARK ? 'claro' : 'escuro';
        toggleButton.setAttribute('aria-label', `Mudar para tema ${nextTheme}`);
        toggleButton.setAttribute('title', `Mudar para tema ${nextTheme}`);
        
        // Icon is handled by CSS, but we can add additional feedback
        toggleButton.classList.toggle('theme-toggle--dark', appliedTheme === this.themes.DARK);
    }
    
    /**
     * Set a specific theme
     */
    setTheme(theme) {
        if (!Object.values(this.themes).includes(theme)) {
            console.warn(`Invalid theme: ${theme}`);
            return;
        }
        
        this.currentTheme = theme;
        this.saveTheme();
        this.applyTheme();
    }
    
    /**
     * Toggle between light and dark themes
     */
    toggleTheme() {
        const currentAppliedTheme = this.currentTheme === this.themes.AUTO 
            ? this.systemPreference 
            : this.currentTheme;
        
        const newTheme = currentAppliedTheme === this.themes.DARK 
            ? this.themes.LIGHT 
            : this.themes.DARK;
        
        this.setTheme(newTheme);
    }
    
    /**
     * Save theme preference to localStorage
     */
    saveTheme() {
        try {
            localStorage.setItem(this.storageKey, this.currentTheme);
        } catch (error) {
            console.warn('Could not save theme to localStorage:', error);
        }
    }
    
    /**
     * Handle theme toggle button click
     */
    handleToggleClick(event) {
        event.preventDefault();
        this.toggleTheme();
        
        // Provide haptic feedback on supported devices
        if ('vibrate' in navigator) {
            navigator.vibrate(50);
        }
    }
    
    /**
     * Handle keyboard navigation for theme toggle
     */
    handleKeyboardToggle(event) {
        // Toggle on Enter or Space
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            this.toggleTheme();
        }
    }
    
    /**
     * Handle system preference changes
     */
    handleSystemPreferenceChange(event) {
        this.systemPreference = event.matches ? this.themes.DARK : this.themes.LIGHT;
        
        // If user is using auto theme, update the applied theme
        if (this.currentTheme === this.themes.AUTO) {
            this.applyTheme();
        }
        
        console.log(`System preference changed to: ${this.systemPreference}`);
    }
    
    /**
     * Dispatch custom theme change event
     */
    dispatchThemeChangeEvent(appliedTheme) {
        const event = new CustomEvent('themechange', {
            detail: {
                theme: appliedTheme,
                userPreference: this.currentTheme,
                systemPreference: this.systemPreference
            }
        });
        
        document.dispatchEvent(event);
    }
    
    /**
     * Get current theme information
     */
    getCurrentTheme() {
        return {
            current: this.currentTheme,
            applied: this.currentTheme === this.themes.AUTO ? this.systemPreference : this.currentTheme,
            system: this.systemPreference
        };
    }
    
    /**
     * Check if dark theme is currently applied
     */
    isDarkTheme() {
        const appliedTheme = this.currentTheme === this.themes.AUTO 
            ? this.systemPreference 
            : this.currentTheme;
        
        return appliedTheme === this.themes.DARK;
    }
    
    /**
     * Reset theme to system preference
     */
    resetToSystemPreference() {
        this.setTheme(this.themes.AUTO);
    }
    
    /**
     * Clean up event listeners
     */
    destroy() {
        const toggleButton = document.querySelector('.theme-toggle');
        if (toggleButton) {
            toggleButton.removeEventListener('click', this.handleToggleClick);
            toggleButton.removeEventListener('keydown', this.handleKeyboardToggle);
        }
        
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        if (mediaQuery.removeEventListener) {
            mediaQuery.removeEventListener('change', this.handleSystemPreferenceChange);
        } else {
            // Fallback for older browsers
            mediaQuery.removeListener(this.handleSystemPreferenceChange);
        }
        
        console.log('Theme manager destroyed');
    }
}