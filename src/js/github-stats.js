/**
 * GitHub Stats Handler
 * Manages GitHub statistics images with fallback URLs and retry logic
 */

class GitHubStatsHandler {
    constructor() {
        this.statsConfig = {
            'github-stats': {
                primary: 'https://github-readme-stats.vercel.app/api?username=smpsandro1239&show_icons=true&theme=radical&hide_border=true&count_private=true&title_color=667eea&icon_color=667eea&text_color=ffffff&bg_color=0a0a0a&include_all_commits=true',
                fallback: 'https://github-readme-stats-git-masterrstaa-rickstaa.vercel.app/api?username=smpsandro1239&show_icons=true&theme=radical&hide_border=true&count_private=true&title_color=667eea&icon_color=667eea&text_color=ffffff&bg_color=0a0a0a&include_all_commits=true'
            },
            'top-langs': {
                primary: 'https://github-readme-stats.vercel.app/api/top-langs/?username=smpsandro1239&layout=compact&theme=radical&hide_border=true&title_color=667eea&text_color=ffffff&bg_color=0a0a0a',
                fallback: 'https://github-readme-stats-git-masterrstaa-rickstaa.vercel.app/api/top-langs/?username=smpsandro1239&layout=compact&theme=radical&hide_border=true&title_color=667eea&text_color=ffffff&bg_color=0a0a0a'
            },
            'profile-summary': {
                primary: 'https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=smpsandro1239&theme=radical',
                fallback: 'https://github-profile-summary-cards.vercel.app/api/cards/repos-per-language?username=smpsandro1239&theme=radical'
            },
            'streak-stats': {
                primary: 'https://github-readme-streak-stats.herokuapp.com/?user=smpsandro1239&theme=radical&hide_border=true&stroke=667eea&background=0a0a0a&fire=667eea&currStreakNum=667eea',
                fallback: 'https://streak-stats.demolab.com?user=smpsandro1239&theme=radical&hide_border=true&stroke=667eea&background=0a0a0a&fire=667eea&currStreakNum=667eea'
            },
            'activity-graph': {
                primary: 'https://github-readme-activity-graph.vercel.app/graph?username=smpsandro1239&theme=react-dark&bg_color=0a0a0a&color=667eea&line=667eea&point=ffffff&hide_border=true&area=true',
                fallback: 'https://activity-graph.herokuapp.com/graph?username=smpsandro1239&theme=react-dark&bg_color=0a0a0a&color=667eea&line=667eea&point=ffffff&hide_border=true&area=true'
            }
        };
        
        this.retryAttempts = new Map();
        this.maxRetries = 3;
        this.retryDelay = 3000; // 3 seconds
        this.loadTimeout = 15000; // 15 seconds timeout for loading
    }

    init() {
        console.log('Initializing GitHub Stats Handler...');
        this.setupStatsImages();
        this.addRefreshButton();
        this.addGlobalErrorHandler();
    }

    setupStatsImages() {
        // Find all stat images in the GitHub stats section
        const statsSection = document.querySelector('.github-stats');
        if (!statsSection) {
            console.warn('GitHub stats section not found');
            return;
        }

        const statsImages = statsSection.querySelectorAll('img');
        console.log(`Found ${statsImages.length} GitHub stats images`);
        
        statsImages.forEach((img, index) => {
            const statsType = this.getStatsTypeFromAlt(img) || this.getStatsTypeFromSrc(img);
            console.log(`Image ${index + 1}: ${statsType || 'unknown type'}`);
            
            if (statsType && this.statsConfig[statsType]) {
                this.setupImageWithFallback(img, statsType);
            } else {
                console.warn(`Unknown stats type for image:`, img.src);
            }
        });
    }

    getStatsTypeFromAlt(img) {
        const alt = img.alt.toLowerCase();
        if (alt.includes('estatísticas github')) return 'github-stats';
        if (alt.includes('linguagens mais usadas')) return 'top-langs';
        if (alt.includes('resumo detalhado') || alt.includes('perfil github')) return 'profile-summary';
        if (alt.includes('sequência') || alt.includes('contribuições')) return 'streak-stats';
        if (alt.includes('gráfico de atividade') || alt.includes('atividade')) return 'activity-graph';
        return null;
    }

    getStatsTypeFromSrc(img) {
        const src = img.src;
        if (src.includes('github-readme-stats') && src.includes('top-langs')) return 'top-langs';
        if (src.includes('github-readme-stats')) return 'github-stats';
        if (src.includes('github-profile-summary-cards')) return 'profile-summary';
        if (src.includes('streak-stats')) return 'streak-stats';
        if (src.includes('activity-graph')) return 'activity-graph';
        return null;
    }

    setupImageWithFallback(img, statsType) {
        const config = this.statsConfig[statsType];
        console.log(`Setting up ${statsType} with primary URL:`, config.primary);
        
        // Clear any existing error handlers
        img.onerror = null;
        img.onload = null;
        
        // Set primary URL with cache busting
        const primaryUrl = config.primary + (config.primary.includes('?') ? '&' : '?') + 't=' + Date.now();
        img.src = primaryUrl;
        
        // Add loading indicator
        this.addLoadingIndicator(img, statsType);
        
        // Set up timeout for loading
        const loadingTimeout = setTimeout(() => {
            console.warn(`${statsType} loading timeout`);
            this.handleImageError(img, statsType);
        }, this.loadTimeout);
        
        // Add success handler
        img.onload = () => {
            console.log(`${statsType} loaded successfully`);
            clearTimeout(loadingTimeout);
            this.removeLoadingIndicator(img);
        };
        
        // Add error handler
        img.onerror = () => {
            console.warn(`${statsType} failed to load, trying fallback`);
            clearTimeout(loadingTimeout);
            this.handleImageError(img, statsType);
        };
    }

    handleImageError(img, statsType) {
        const attempts = this.retryAttempts.get(statsType) || 0;
        console.log(`Handling error for ${statsType}, attempt ${attempts + 1}/${this.maxRetries}`);
        
        if (attempts < this.maxRetries) {
            this.retryAttempts.set(statsType, attempts + 1);
            
            setTimeout(() => {
                const config = this.statsConfig[statsType];
                const url = attempts === 0 ? config.fallback : config.primary;
                const urlWithCache = url + (url.includes('?') ? '&' : '?') + 't=' + Date.now() + '&retry=' + attempts;
                
                console.log(`Retrying ${statsType} with URL:`, urlWithCache);
                img.src = urlWithCache;
            }, this.retryDelay);
        } else {
            console.error(`${statsType} failed after ${this.maxRetries} attempts`);
            this.showErrorPlaceholder(img, statsType);
        }
    }

    addLoadingIndicator(img, statsType) {
        const container = img.parentElement;
        
        // Remove existing loading indicator
        const existingLoading = container.querySelector('.stats-loading');
        if (existingLoading) {
            existingLoading.remove();
        }
        
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'stats-loading';
        loadingDiv.innerHTML = `
            <div class="loading-spinner"></div>
            <p>A carregar ${this.getDisplayName(statsType)}...</p>
        `;
        
        // Hide image while loading
        img.style.opacity = '0';
        container.appendChild(loadingDiv);
    }

    removeLoadingIndicator(img) {
        const container = img.parentElement;
        const loadingDiv = container.querySelector('.stats-loading');
        if (loadingDiv) {
            loadingDiv.remove();
        }
        
        // Show image
        img.style.opacity = '1';
    }

    getDisplayName(statsType) {
        const displayNames = {
            'github-stats': 'estatísticas',
            'top-langs': 'linguagens',
            'profile-summary': 'resumo do perfil',
            'streak-stats': 'sequência de contribuições',
            'activity-graph': 'gráfico de atividade'
        };
        return displayNames[statsType] || 'gráfico';
    }

    showErrorPlaceholder(img, statsType) {
        const container = img.parentElement;
        
        // Remove loading indicator
        this.removeLoadingIndicator(img);
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'stats-error';
        errorDiv.innerHTML = `
            <div class="error-icon">📊</div>
            <p>${this.getDisplayName(statsType)} temporariamente indisponível</p>
            <button class="retry-btn" onclick="window.githubStatsHandler.retryImage('${statsType}')">
                Tentar novamente
            </button>
        `;
        
        // Hide the image and show error
        img.style.display = 'none';
        container.appendChild(errorDiv);
    }

    retryImage(statsType) {
        console.log(`Manual retry for ${statsType}`);
        this.retryAttempts.delete(statsType);
        
        // Find the container with error
        const containers = document.querySelectorAll('.stat-card, .stats-streak, .stats-profile, .stats-activity');
        let targetContainer = null;
        
        containers.forEach(container => {
            const errorDiv = container.querySelector('.stats-error');
            if (errorDiv && errorDiv.innerHTML.includes(this.getDisplayName(statsType))) {
                targetContainer = container;
            }
        });
        
        if (targetContainer) {
            // Remove error div
            const errorDiv = targetContainer.querySelector('.stats-error');
            if (errorDiv) {
                errorDiv.remove();
            }
            
            // Find or create image
            let img = targetContainer.querySelector('img');
            if (!img) {
                img = document.createElement('img');
                img.alt = this.getAltText(statsType);
                img.loading = 'lazy';
                targetContainer.appendChild(img);
            }
            
            // Show image again
            img.style.display = 'block';
            img.style.opacity = '0';
            
            this.setupImageWithFallback(img, statsType);
        }
    }

    getAltText(statsType) {
        const altTexts = {
            'github-stats': 'Estatísticas GitHub',
            'top-langs': 'Linguagens Mais Usadas',
            'profile-summary': 'Resumo Detalhado do Perfil GitHub',
            'streak-stats': 'Sequência de Contribuições',
            'activity-graph': 'Gráfico de Atividade'
        };
        return altTexts[statsType] || 'Estatística GitHub';
    }

    addRefreshButton() {
        const statsSection = document.querySelector('.github-stats');
        if (statsSection && !statsSection.querySelector('.stats-refresh-btn')) {
            const refreshBtn = document.createElement('button');
            refreshBtn.className = 'stats-refresh-btn';
            refreshBtn.innerHTML = '🔄 Atualizar Estatísticas';
            refreshBtn.onclick = () => {
                window.githubStatsHandler.refreshAllStats();
            };
            
            statsSection.appendChild(refreshBtn);
        }
    }

    refreshAllStats() {
        console.log('Refreshing all GitHub stats...');
        this.retryAttempts.clear();
        
        const statsSection = document.querySelector('.github-stats');
        if (!statsSection) return;
        
        const statsImages = statsSection.querySelectorAll('img');
        
        statsImages.forEach(img => {
            const statsType = this.getStatsTypeFromAlt(img) || this.getStatsTypeFromSrc(img);
            if (statsType && this.statsConfig[statsType]) {
                // Remove any error placeholders
                const container = img.parentElement;
                const errorDiv = container.querySelector('.stats-error');
                if (errorDiv) {
                    errorDiv.remove();
                }
                
                // Show image again
                img.style.display = 'block';
                
                this.setupImageWithFallback(img, statsType);
            }
        });
    }

    addGlobalErrorHandler() {
        // Handle any unhandled image errors
        window.addEventListener('error', (event) => {
            if (event.target && event.target.tagName === 'IMG') {
                const img = event.target;
                const statsSection = document.querySelector('.github-stats');
                
                if (statsSection && statsSection.contains(img)) {
                    const statsType = this.getStatsTypeFromAlt(img) || this.getStatsTypeFromSrc(img);
                    if (statsType && !this.retryAttempts.has(statsType)) {
                        console.log(`Global error handler caught ${statsType}`);
                        this.handleImageError(img, statsType);
                    }
                }
            }
        }, true);
    }
}

// Initialize GitHub Stats Handler
const githubStatsHandler = new GitHubStatsHandler();

// Make it globally available for onclick handlers
window.githubStatsHandler = githubStatsHandler;
window.githubStats = githubStatsHandler; // Keep backward compatibility

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('DOM loaded, initializing GitHub stats...');
        githubStatsHandler.init();
    });
} else {
    console.log('DOM already loaded, initializing GitHub stats...');
    githubStatsHandler.init();
}

export default GitHubStatsHandler;