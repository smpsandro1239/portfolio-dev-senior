/**
 * GitHub Stats Handler
 * Manages GitHub statistics images with fallback URLs and retry logic
 */

class GitHubStatsHandler {
    constructor() {
        this.statsConfig = {
            'github-stats': {
                primary: 'https://github-readme-stats-git-masterrstaa-rickstaa.vercel.app/api?username=smpsandro1239&show_icons=true&theme=radical&hide_border=true&count_private=true&title_color=667eea&icon_color=667eea&text_color=ffffff&bg_color=0a0a0a&include_all_commits=true',
                fallback: 'https://github-readme-stats.vercel.app/api?username=smpsandro1239&show_icons=true&theme=radical&hide_border=true&count_private=true&title_color=667eea&icon_color=667eea&text_color=ffffff&bg_color=0a0a0a&include_all_commits=true'
            },
            'top-langs': {
                primary: 'https://github-readme-stats-git-masterrstaa-rickstaa.vercel.app/api/top-langs/?username=smpsandro1239&layout=compact&theme=radical&hide_border=true&title_color=667eea&text_color=ffffff&bg_color=0a0a0a',
                fallback: 'https://github-readme-stats.vercel.app/api/top-langs/?username=smpsandro1239&layout=compact&theme=radical&hide_border=true&title_color=667eea&text_color=ffffff&bg_color=0a0a0a'
            },
            'profile-summary': {
                primary: 'https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=smpsandro1239&theme=radical',
                fallback: 'https://github-profile-summary-cards.vercel.app/api/cards/repos-per-language?username=smpsandro1239&theme=radical'
            },
            'streak-stats': {
                primary: 'https://streak-stats.demolab.com?user=smpsandro1239&theme=radical&hide_border=true&stroke=667eea&background=0a0a0a&fire=667eea&currStreakNum=667eea',
                fallback: 'https://github-readme-streak-stats.herokuapp.com/?user=smpsandro1239&theme=radical&hide_border=true&stroke=667eea&background=0a0a0a&fire=667eea&currStreakNum=667eea'
            },
            'activity-graph': {
                primary: 'https://github-readme-activity-graph.vercel.app/graph?username=smpsandro1239&theme=react-dark&bg_color=0a0a0a&color=667eea&line=667eea&point=ffffff&hide_border=true&area=true',
                fallback: 'https://activity-graph.herokuapp.com/graph?username=smpsandro1239&theme=react-dark&bg_color=0a0a0a&color=667eea&line=667eea&point=ffffff&hide_border=true&area=true'
            }
        };
        
        this.retryAttempts = new Map();
        this.maxRetries = 2;
        this.retryDelay = 2000; // 2 seconds
    }

    init() {
        this.setupStatsImages();
        this.addRefreshButton();
    }

    setupStatsImages() {
        const statsImages = document.querySelectorAll('.github-stats img');
        
        statsImages.forEach((img) => {
            const statsType = this.getStatsType(img);
            if (statsType && this.statsConfig[statsType]) {
                this.setupImageWithFallback(img, statsType);
            }
        });
    }

    getStatsType(img) {
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
        
        // Set primary URL
        img.src = config.primary;
        
        // Add error handler
        img.onerror = () => this.handleImageError(img, statsType);
        
        // Add loading indicator
        this.addLoadingIndicator(img);
    }

    handleImageError(img, statsType) {
        const attempts = this.retryAttempts.get(statsType) || 0;
        
        if (attempts < this.maxRetries) {
            this.retryAttempts.set(statsType, attempts + 1);
            
            setTimeout(() => {
                const config = this.statsConfig[statsType];
                img.src = attempts === 0 ? config.fallback : config.primary + '&t=' + Date.now();
            }, this.retryDelay);
        } else {
            this.showErrorPlaceholder(img, statsType);
        }
    }

    addLoadingIndicator(img) {
        const container = img.parentElement;
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'stats-loading';
        loadingDiv.innerHTML = `
            <div class="loading-spinner"></div>
            <p>A carregar estatísticas...</p>
        `;
        
        container.appendChild(loadingDiv);
        
        img.onload = () => {
            loadingDiv.remove();
        };
    }

    showErrorPlaceholder(img, statsType) {
        const container = img.parentElement;
        const errorDiv = document.createElement('div');
        errorDiv.className = 'stats-error';
        errorDiv.innerHTML = `
            <div class="error-icon">📊</div>
            <p>Gráfico temporariamente indisponível</p>
            <button class="retry-btn" onclick="githubStats.retryImage('${statsType}')">
                Tentar novamente
            </button>
        `;
        
        container.innerHTML = '';
        container.appendChild(errorDiv);
    }

    retryImage(statsType) {
        this.retryAttempts.delete(statsType);
        const container = document.querySelector(`.stats-${statsType.replace('-', '-')} .stats-error`)?.parentElement;
        if (container) {
            const img = document.createElement('img');
            img.alt = this.getAltText(statsType);
            img.loading = 'lazy';
            
            container.innerHTML = '';
            container.appendChild(img);
            
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
        if (statsSection) {
            const refreshBtn = document.createElement('button');
            refreshBtn.className = 'stats-refresh-btn';
            refreshBtn.innerHTML = '🔄 Atualizar Estatísticas';
            refreshBtn.onclick = () => this.refreshAllStats();
            
            statsSection.appendChild(refreshBtn);
        }
    }

    refreshAllStats() {
        this.retryAttempts.clear();
        const statsImages = document.querySelectorAll('.github-stats img');
        
        statsImages.forEach(img => {
            const statsType = this.getStatsType(img);
            if (statsType) {
                const config = this.statsConfig[statsType];
                img.src = config.primary + '&t=' + Date.now();
            }
        });
    }
}

// Initialize GitHub Stats Handler
const githubStats = new GitHubStatsHandler();

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => githubStats.init());
} else {
    githubStats.init();
}

export default GitHubStatsHandler;