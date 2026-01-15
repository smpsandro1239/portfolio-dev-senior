/**
 * GitHub API Client Module
 * Handles fetching repository data with caching, error handling, and rate limiting
 */

export class GitHubApiClient {
    constructor(username) {
        this.username = username;
        this.baseURL = 'https://api.github.com';
        this.cachePrefix = 'github-api';
        this.cacheTimeout = 300000; // 5 minutes
        
        // Rate limiting
        this.rateLimitRemaining = null;
        this.rateLimitReset = null;
        
        // Request configuration
        this.requestConfig = {
            headers: {
                'Accept': 'application/vnd.github.v3+json',
                'User-Agent': 'Portfolio-Site/1.0'
            }
        };
    }
    
    /**
     * Get user repositories with caching
     */
    async getRepositories(limit = 10) {
        const cacheKey = `${this.cachePrefix}-repos-${this.username}`;
        
        try {
            // Try to get from cache first
            const cachedData = this.getCachedData(cacheKey);
            if (cachedData) {
                console.log('Using cached repository data');
                return cachedData.slice(0, limit);
            }
            
            // Fetch from API
            console.log('Fetching repositories from GitHub API');
            const repositories = await this.fetchRepositories();
            
            // Cache the results
            this.setCachedData(cacheKey, repositories);
            
            return repositories.slice(0, limit);
            
        } catch (error) {
            console.error('Error fetching repositories:', error);
            
            // Try to return stale cache data as fallback
            const staleData = this.getStaleCache(cacheKey);
            if (staleData) {
                console.log('Using stale cache data as fallback');
                return staleData.slice(0, limit);
            }
            
            throw error;
        }
    }
    
    /**
     * Fetch repositories from GitHub API
     */
    async fetchRepositories() {
        const url = `${this.baseURL}/users/${this.username}/repos`;
        const params = new URLSearchParams({
            sort: 'updated',
            direction: 'desc',
            per_page: '20',
            type: 'owner'
        });
        
        const response = await this.makeRequest(`${url}?${params}`);
        const repositories = await response.json();
        
        // Filter and sort repositories
        return this.processRepositories(repositories);
    }
    
    /**
     * Process and filter repositories
     */
    processRepositories(repositories) {
        // Define the pinned repositories in order of priority
        const pinnedRepos = [
            'IOT',
            'empregabilidade-amar-terra-verde', 
            'IOTCNT',
            'TimeAdministrator',
            'portfolio-dev-senior',
            'curso-js-2026-pt'
        ];
        
        // First, try to get all repositories (including private ones if accessible)
        let filteredRepos = repositories
            .filter(repo => {
                // Only include non-fork, non-archived repos that are in our pinned list
                return !repo.fork && !repo.archived && pinnedRepos.includes(repo.name);
            })
            .map(repo => ({
                id: repo.id,
                name: repo.name,
                description: repo.description || this.getDefaultDescription(repo.name),
                html_url: repo.html_url,
                language: repo.language,
                topics: repo.topics || [],
                stargazers_count: repo.stargazers_count,
                forks_count: repo.forks_count,
                updated_at: repo.updated_at,
                created_at: repo.created_at,
                size: repo.size,
                visibility: repo.private ? 'Private' : 'Public'
            }));
        
        // If we don't have all 6 repositories, create placeholder entries for missing ones
        if (filteredRepos.length < 6) {
            const foundRepoNames = filteredRepos.map(repo => repo.name);
            const missingRepos = pinnedRepos.filter(name => !foundRepoNames.includes(name));
            
            missingRepos.forEach(repoName => {
                filteredRepos.push({
                    id: `placeholder-${repoName}`,
                    name: repoName,
                    description: this.getDefaultDescription(repoName),
                    html_url: `https://github.com/smpsandro1239/${repoName}`,
                    language: this.getDefaultLanguage(repoName),
                    topics: [],
                    stargazers_count: 0,
                    forks_count: 0,
                    updated_at: new Date().toISOString(),
                    created_at: new Date().toISOString(),
                    size: 0,
                    visibility: 'Public',
                    isPlaceholder: true
                });
            });
        }
        
        // Sort by the pinned order
        return filteredRepos.sort((a, b) => {
            const aIndex = pinnedRepos.indexOf(a.name);
            const bIndex = pinnedRepos.indexOf(b.name);
            return aIndex - bIndex;
        }).slice(0, 6); // Ensure we only return 6 projects
    }
    
    /**
     * Get default description for repositories without description
     */
    getDefaultDescription(repoName) {
        const descriptions = {
            'IOT': 'Solução empresarial para controlo de barreiras físicas e monitorização de acesso veicular. Integra hardware ESP32 com backend Laravel, oferecendo controlo operacional preciso, segurança baseada em endereços MAC e atualizações em tempo real via LoRa',
            'empregabilidade-amar-terra-verde': 'Sistema web para gestão de empregabilidade e sustentabilidade ambiental',
            'IOTCNT': 'Contador inteligente IoT com interface web e monitorização remota',
            'TimeAdministrator': 'Aplicação TypeScript para gestão e administração de tempo',
            'portfolio-dev-senior': 'Portfolio profissional desenvolvido com HTML5, CSS3 e JavaScript vanilla',
            'curso-js-2026-pt': 'Curso completo de JavaScript moderno em português europeu'
        };
        
        return descriptions[repoName] || 'Projeto de desenvolvimento de software';
    }
    
    /**
     * Get default language for repositories
     */
    getDefaultLanguage(repoName) {
        const languages = {
            'IOT': 'C++',
            'empregabilidade-amar-terra-verde': 'JavaScript',
            'IOTCNT': 'C++',
            'TimeAdministrator': 'TypeScript',
            'portfolio-dev-senior': 'HTML',
            'curso-js-2026-pt': 'JavaScript'
        };
        
        return languages[repoName] || 'JavaScript';
    }
    
    /**
     * Get user statistics
     */
    async getUserStats() {
        const cacheKey = `${this.cachePrefix}-user-${this.username}`;
        
        try {
            // Try cache first
            const cachedData = this.getCachedData(cacheKey);
            if (cachedData) {
                return cachedData;
            }
            
            // Fetch from API
            const url = `${this.baseURL}/users/${this.username}`;
            const response = await this.makeRequest(url);
            const userData = await response.json();
            
            const stats = {
                public_repos: userData.public_repos,
                followers: userData.followers,
                following: userData.following,
                created_at: userData.created_at,
                updated_at: userData.updated_at,
                bio: userData.bio,
                location: userData.location,
                blog: userData.blog
            };
            
            // Cache the results
            this.setCachedData(cacheKey, stats);
            
            return stats;
            
        } catch (error) {
            console.error('Error fetching user stats:', error);
            
            // Return fallback data
            return {
                public_repos: 0,
                followers: 0,
                following: 0,
                created_at: null,
                updated_at: null
            };
        }
    }
    
    /**
     * Make HTTP request with error handling and rate limiting
     */
    async makeRequest(url) {
        // Check rate limit before making request
        if (this.isRateLimited()) {
            throw new Error('Rate limit exceeded. Please try again later.');
        }
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
        
        try {
            const response = await fetch(url, {
                ...this.requestConfig,
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            
            // Update rate limit info
            this.updateRateLimitInfo(response);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            return response;
            
        } catch (error) {
            clearTimeout(timeoutId);
            
            if (error.name === 'AbortError') {
                throw new Error('Request timeout');
            }
            
            throw error;
        }
    }
    
    /**
     * Update rate limit information from response headers
     */
    updateRateLimitInfo(response) {
        const remaining = response.headers.get('X-RateLimit-Remaining');
        const reset = response.headers.get('X-RateLimit-Reset');
        
        if (remaining !== null) {
            this.rateLimitRemaining = parseInt(remaining, 10);
        }
        
        if (reset !== null) {
            this.rateLimitReset = parseInt(reset, 10) * 1000; // Convert to milliseconds
        }
        
        console.log(`Rate limit: ${this.rateLimitRemaining} requests remaining`);
    }
    
    /**
     * Check if we're currently rate limited
     */
    isRateLimited() {
        if (this.rateLimitRemaining === null || this.rateLimitReset === null) {
            return false;
        }
        
        const now = Date.now();
        
        // If reset time has passed, we're no longer rate limited
        if (now > this.rateLimitReset) {
            this.rateLimitRemaining = null;
            this.rateLimitReset = null;
            return false;
        }
        
        // Check if we have remaining requests
        return this.rateLimitRemaining <= 0;
    }
    
    /**
     * Get cached data if it exists and is not expired
     */
    getCachedData(key) {
        try {
            const cached = sessionStorage.getItem(key);
            if (!cached) return null;
            
            const data = JSON.parse(cached);
            const now = Date.now();
            
            // Check if cache is still valid
            if (now - data.timestamp < this.cacheTimeout) {
                return data.value;
            }
            
            // Cache expired, remove it
            sessionStorage.removeItem(key);
            return null;
            
        } catch (error) {
            console.warn('Error reading from cache:', error);
            return null;
        }
    }
    
    /**
     * Get stale cache data (expired but still usable as fallback)
     */
    getStaleCache(key) {
        try {
            const cached = sessionStorage.getItem(key);
            if (!cached) return null;
            
            const data = JSON.parse(cached);
            return data.value;
            
        } catch (error) {
            console.warn('Error reading stale cache:', error);
            return null;
        }
    }
    
    /**
     * Set data in cache with timestamp
     */
    setCachedData(key, value) {
        const data = {
            value,
            timestamp: Date.now()
        };
        
        try {
            sessionStorage.setItem(key, JSON.stringify(data));
            
        } catch (error) {
            console.warn('Error writing to cache:', error);
            
            // If storage is full, try to clear old entries
            if (error.name === 'QuotaExceededError') {
                this.clearOldCache();
                
                // Try again
                try {
                    sessionStorage.setItem(key, JSON.stringify(data));
                } catch (retryError) {
                    console.warn('Failed to cache data after cleanup:', retryError);
                }
            }
        }
    }
    
    /**
     * Clear old cache entries to free up space
     */
    clearOldCache() {
        try {
            const keys = Object.keys(sessionStorage);
            const githubKeys = keys.filter(key => key.startsWith(this.cachePrefix));
            
            // Sort by timestamp and remove oldest entries
            const entries = githubKeys.map(key => {
                try {
                    const data = JSON.parse(sessionStorage.getItem(key));
                    return { key, timestamp: data.timestamp || 0 };
                } catch {
                    return { key, timestamp: 0 };
                }
            }).sort((a, b) => a.timestamp - b.timestamp);
            
            // Remove oldest half of entries
            const toRemove = entries.slice(0, Math.ceil(entries.length / 2));
            toRemove.forEach(entry => {
                sessionStorage.removeItem(entry.key);
            });
            
            console.log(`Cleared ${toRemove.length} old cache entries`);
            
        } catch (error) {
            console.warn('Error clearing old cache:', error);
        }
    }
    
    /**
     * Check if cache is stale (for refresh decisions)
     */
    isCacheStale() {
        const cacheKey = `${this.cachePrefix}-repos-${this.username}`;
        const cached = this.getCachedData(cacheKey);
        return !cached;
    }
    
    /**
     * Clear all cached data for this user
     */
    clearCache() {
        try {
            const keys = Object.keys(sessionStorage);
            const userKeys = keys.filter(key => 
                key.startsWith(this.cachePrefix) && key.includes(this.username)
            );
            
            userKeys.forEach(key => {
                sessionStorage.removeItem(key);
            });
            
            console.log(`Cleared cache for user: ${this.username}`);
            
        } catch (error) {
            console.warn('Error clearing cache:', error);
        }
    }
    
    /**
     * Get cache statistics
     */
    getCacheStats() {
        try {
            const keys = Object.keys(sessionStorage);
            const githubKeys = keys.filter(key => key.startsWith(this.cachePrefix));
            
            let totalSize = 0;
            let validEntries = 0;
            let expiredEntries = 0;
            
            githubKeys.forEach(key => {
                const value = sessionStorage.getItem(key);
                totalSize += value.length;
                
                try {
                    const data = JSON.parse(value);
                    const age = Date.now() - data.timestamp;
                    
                    if (age < this.cacheTimeout) {
                        validEntries++;
                    } else {
                        expiredEntries++;
                    }
                } catch {
                    expiredEntries++;
                }
            });
            
            return {
                totalEntries: githubKeys.length,
                validEntries,
                expiredEntries,
                totalSize,
                averageSize: githubKeys.length > 0 ? Math.round(totalSize / githubKeys.length) : 0
            };
            
        } catch (error) {
            console.warn('Error getting cache stats:', error);
            return null;
        }
    }
}