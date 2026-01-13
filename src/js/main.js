/**
 * Professional Portfolio - Main JavaScript Module
 * Vanilla ES6+ JavaScript with modular architecture
 * Handles theme management, navigation, GitHub API integration, and animations
 */

// Import modules
import { ThemeManager } from './theme-manager.js';
import { NavigationManager } from './navigation.js';
import { GitHubApiClient } from './github-api.js';
import { AnimationController } from './animation-controller.js';

/**
 * Main Application Class
 * Orchestrates all modules and handles application lifecycle
 */
class PortfolioApp {
    constructor() {
        this.themeManager = null;
        this.navigationManager = null;
        this.githubClient = null;
        this.animationController = null;
        
        // Configuration
        this.config = {
            githubUsername: 'smpsandro1239',
            maxProjects: 4,
            cacheTimeout: 300000, // 5 minutes
        };
        
        // Bind methods
        this.handleDOMContentLoaded = this.handleDOMContentLoaded.bind(this);
        this.handleWindowLoad = this.handleWindowLoad.bind(this);
        this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
    }
    
    /**
     * Initialize the application
     */
    init() {
        // Set up event listeners
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', this.handleDOMContentLoaded);
        } else {
            this.handleDOMContentLoaded();
        }
        
        window.addEventListener('load', this.handleWindowLoad);
        document.addEventListener('visibilitychange', this.handleVisibilityChange);
        
        // Handle unhandled promise rejections
        window.addEventListener('unhandledrejection', this.handleUnhandledRejection.bind(this));
        
        // Update copyright year
        this.updateCopyrightYear();
    }
    
    /**
     * Handle DOM content loaded event
     */
    handleDOMContentLoaded() {
        try {
            // Initialize core modules
            this.initializeModules();
            
            // Load dynamic content
            this.loadProjects();
            
            // Set up animations
            this.setupAnimations();
            
            // Set up header scroll effect
            this.setupHeaderScrollEffect();
            
            console.log('Portfolio app initialized successfully');
        } catch (error) {
            console.error('Error initializing portfolio app:', error);
            this.handleError(error);
        }
    }
    
    /**
     * Handle window load event
     */
    handleWindowLoad() {
        // Trigger animations for elements in viewport
        if (this.animationController) {
            this.animationController.triggerInitialAnimations();
        }
        
        // Performance monitoring
        this.logPerformanceMetrics();
    }
    
    /**
     * Handle visibility change (tab switching)
     */
    handleVisibilityChange() {
        if (document.hidden) {
            // Page is hidden - pause non-essential operations
            console.log('Page hidden - pausing operations');
        } else {
            // Page is visible - resume operations
            console.log('Page visible - resuming operations');
            
            // Refresh data if cache is stale
            if (this.githubClient && this.githubClient.isCacheStale()) {
                this.loadProjects();
            }
        }
    }
    
    /**
     * Initialize all modules
     */
    initializeModules() {
        // Initialize theme manager
        this.themeManager = new ThemeManager();
        this.themeManager.init();
        
        // Initialize navigation manager
        this.navigationManager = new NavigationManager();
        this.navigationManager.init();
        
        // Initialize GitHub API client
        this.githubClient = new GitHubApiClient(this.config.githubUsername);
        
        // Initialize animation controller
        this.animationController = new AnimationController();
        this.animationController.init();
    }
    
    /**
     * Load projects from GitHub API
     */
    async loadProjects() {
        const projectsContainer = document.getElementById('projects-container');
        if (!projectsContainer) return;
        
        try {
            // Show loading state
            projectsContainer.innerHTML = `
                <div class="projects__loading" aria-live="polite">
                    A carregar projetos...
                </div>
            `;
            
            // Fetch repositories
            const repositories = await this.githubClient.getRepositories(this.config.maxProjects);
            
            // Render projects
            this.renderProjects(repositories, projectsContainer);
            
        } catch (error) {
            console.error('Error loading projects:', error);
            this.renderProjectsError(projectsContainer);
        }
    }
    
    /**
     * Render projects in the DOM
     */
    renderProjects(repositories, container) {
        if (!repositories || repositories.length === 0) {
            this.renderProjectsFallback(container);
            return;
        }
        
        const projectsHTML = repositories.map(repo => this.createProjectCard(repo)).join('');
        container.innerHTML = projectsHTML;
        
        // Trigger animations for new content
        if (this.animationController) {
            this.animationController.observeElements('.project-card');
        }
    }
    
    /**
     * Create HTML for a project card
     */
    createProjectCard(repo) {
        const topics = repo.topics && repo.topics.length > 0 
            ? repo.topics.slice(0, 5).map(topic => 
                `<span class="topic-tag">${this.escapeHtml(topic)}</span>`
              ).join('')
            : '';
        
        const language = repo.language 
            ? `<span class="project-card__language">${this.escapeHtml(repo.language)}</span>`
            : '';
        
        const stars = repo.stargazers_count > 0 
            ? `<div class="project-card__stars">
                 <span aria-hidden="true">⭐</span>
                 <span>${repo.stargazers_count}</span>
               </div>`
            : '';
        
        const description = repo.description 
            ? this.escapeHtml(repo.description)
            : 'Sem descrição disponível';
        
        return `
            <article class="project-card fade-in">
                <h3 class="project-card__title">${this.escapeHtml(repo.name)}</h3>
                <p class="project-card__description">${description}</p>
                
                ${repo.topics && repo.topics.length > 0 ? `
                    <div class="project-card__topics">
                        ${topics}
                    </div>
                ` : ''}
                
                <div class="project-card__meta">
                    ${language}
                    ${stars}
                </div>
                
                <a href="${this.escapeHtml(repo.html_url)}" 
                   class="project-card__link" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   aria-label="Ver projeto ${this.escapeHtml(repo.name)} no GitHub">
                    Ver no GitHub
                    <span aria-hidden="true">→</span>
                </a>
            </article>
        `;
    }
    
    /**
     * Render error state for projects
     */
    renderProjectsError(container) {
        container.innerHTML = `
            <div class="projects__error">
                <p>Erro ao carregar projetos. A mostrar projetos em destaque:</p>
                ${this.getFallbackProjects()}
            </div>
        `;
    }
    
    /**
     * Render fallback projects when API fails
     */
    renderProjectsFallback(container) {
        container.innerHTML = `
            <div class="projects__fallback">
                ${this.getFallbackProjects()}
            </div>
        `;
    }
    
    /**
     * Get fallback projects HTML
     */
    getFallbackProjects() {
        const fallbackProjects = [
            {
                name: 'curso-js-2026-pt',
                description: 'Curso completo de JavaScript moderno em português',
                language: 'JavaScript',
                topics: ['javascript', 'tutorial', 'português', 'educação'],
                html_url: 'https://github.com/smpsandro1239/curso-js-2026-pt'
            },
            {
                name: 'portfolio-dev-senior',
                description: 'Portfolio técnico desenvolvido em HTML, CSS e JavaScript vanilla',
                language: 'JavaScript',
                topics: ['portfolio', 'vanilla-js', 'css3', 'html5'],
                html_url: 'https://github.com/smpsandro1239/portfolio-dev-senior'
            },
            {
                name: 'freqtrade-strategies',
                description: 'Estratégias avançadas de trading algorítmico',
                language: 'Python',
                topics: ['trading', 'algoritmos', 'fintech'],
                html_url: 'https://github.com/smpsandro1239/freqtrade'
            }
        ];
        
        return fallbackProjects.map(project => this.createProjectCard(project)).join('');
    }
    
    /**
     * Set up animations
     */
    setupAnimations() {
        if (!this.animationController) return;
        
        // Observe elements for scroll animations
        this.animationController.observeElements('.hero');
        this.animationController.observeElements('.section__title');
        this.animationController.observeElements('.stat-card');
        this.animationController.observeElements('.stats-streak');
        this.animationController.observeElements('.stats-activity');
        this.animationController.observeElements('.course');
        this.animationController.observeElements('.contact');
    }
    
    /**
     * Set up header scroll effect
     */
    setupHeaderScrollEffect() {
        const header = document.querySelector('.header');
        if (!header) return;
        
        let ticking = false;
        
        const updateHeader = () => {
            const scrollY = window.scrollY;
            
            if (scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            ticking = false;
        };
        
        const requestTick = () => {
            if (!ticking) {
                window.requestAnimationFrame(updateHeader);
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', requestTick, { passive: true });
    }
    
    /**
     * Update copyright year
     */
    updateCopyrightYear() {
        const yearElement = document.getElementById('current-year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }
    
    /**
     * Log performance metrics
     */
    logPerformanceMetrics() {
        if ('performance' in window && 'getEntriesByType' in performance) {
            const navigation = performance.getEntriesByType('navigation')[0];
            if (navigation) {
                console.log('Performance Metrics:', {
                    'DOM Content Loaded': `${Math.round(navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart)}ms`,
                    'Load Complete': `${Math.round(navigation.loadEventEnd - navigation.loadEventStart)}ms`,
                    'Total Load Time': `${Math.round(navigation.loadEventEnd - navigation.fetchStart)}ms`
                });
            }
        }
    }
    
    /**
     * Handle unhandled promise rejections
     */
    handleUnhandledRejection(event) {
        console.error('Unhandled promise rejection:', event.reason);
        
        // Prevent the default browser behavior
        event.preventDefault();
        
        // Handle specific error types
        this.handleError(event.reason);
    }
    
    /**
     * Generic error handler
     */
    handleError(error) {
        // Log error details
        console.error('Application error:', error);
        
        // Show user-friendly error message if needed
        if (error.name === 'NetworkError' || error.message.includes('fetch')) {
            console.warn('Network error detected - using fallback content');
        }
        
        // In production, you might want to send errors to a logging service
        // this.sendErrorToLoggingService(error);
    }
    
    /**
     * Escape HTML to prevent XSS
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    /**
     * Clean up resources when page unloads
     */
    destroy() {
        // Remove event listeners
        document.removeEventListener('DOMContentLoaded', this.handleDOMContentLoaded);
        window.removeEventListener('load', this.handleWindowLoad);
        document.removeEventListener('visibilitychange', this.handleVisibilityChange);
        
        // Clean up modules
        if (this.themeManager) this.themeManager.destroy();
        if (this.navigationManager) this.navigationManager.destroy();
        if (this.animationController) this.animationController.destroy();
        
        console.log('Portfolio app destroyed');
    }
}

// Initialize the application
const app = new PortfolioApp();
app.init();

// Clean up on page unload
window.addEventListener('beforeunload', () => {
    app.destroy();
});

// Export for potential external use
export default PortfolioApp;