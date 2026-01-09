/**
 * Navigation Manager Module
 * Handles smooth scrolling, keyboard navigation, and accessibility features
 */

export class NavigationManager {
    constructor() {
        this.activeSection = null;
        this.sections = [];
        this.navLinks = [];
        this.isScrolling = false;
        this.scrollTimeout = null;
        
        // Configuration
        this.config = {
            scrollOffset: 80, // Offset for sticky header
            scrollDuration: 800,
            throttleDelay: 100
        };
        
        // Bind methods
        this.handleNavClick = this.handleNavClick.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.handleKeydown = this.handleKeydown.bind(this);
        this.updateActiveSection = this.updateActiveSection.bind(this);
    }
    
    /**
     * Initialize the navigation manager
     */
    init() {
        try {
            // Cache DOM elements
            this.cacheDOMElements();
            
            // Set up event listeners
            this.setupEventListeners();
            
            // Set initial active section
            this.updateActiveSection();
            
            console.log('Navigation manager initialized');
        } catch (error) {
            console.error('Error initializing navigation manager:', error);
        }
    }
    
    /**
     * Cache DOM elements for performance
     */
    cacheDOMElements() {
        // Get all navigation links
        this.navLinks = Array.from(document.querySelectorAll('.nav__link[href^="#"]'));
        
        // Get all sections that can be navigated to
        this.sections = this.navLinks
            .map(link => {
                const targetId = link.getAttribute('href').substring(1);
                const element = document.getElementById(targetId);
                return element ? { id: targetId, element, link } : null;
            })
            .filter(Boolean);
        
        console.log(`Found ${this.sections.length} navigable sections`);
    }
    
    /**
     * Set up event listeners
     */
    setupEventListeners() {
        // Navigation link clicks
        this.navLinks.forEach(link => {
            link.addEventListener('click', this.handleNavClick);
        });
        
        // Scroll events (throttled)
        window.addEventListener('scroll', this.throttle(this.handleScroll, this.config.throttleDelay));
        
        // Keyboard navigation
        document.addEventListener('keydown', this.handleKeydown);
        
        // Handle hash changes (browser back/forward)
        window.addEventListener('hashchange', this.handleHashChange.bind(this));
    }
    
    /**
     * Handle navigation link clicks
     */
    handleNavClick(event) {
        event.preventDefault();
        
        const link = event.currentTarget;
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            this.scrollToSection(targetElement, targetId);
            
            // Update URL without triggering scroll
            this.updateURL(targetId);
            
            // Announce to screen readers
            this.announceNavigation(targetId);
        }
    }
    
    /**
     * Smooth scroll to a section
     */
    scrollToSection(element, sectionId) {
        const headerHeight = this.getHeaderHeight();
        const targetPosition = element.offsetTop - headerHeight - this.config.scrollOffset;
        
        // Set scrolling flag
        this.isScrolling = true;
        
        // Clear any existing scroll timeout
        if (this.scrollTimeout) {
            clearTimeout(this.scrollTimeout);
        }
        
        // Perform smooth scroll
        window.scrollTo({
            top: Math.max(0, targetPosition),
            behavior: 'smooth'
        });
        
        // Reset scrolling flag after animation
        this.scrollTimeout = setTimeout(() => {
            this.isScrolling = false;
            this.updateActiveSection();
        }, this.config.scrollDuration);
        
        // Immediately update active section for visual feedback
        this.setActiveSection(sectionId);
    }
    
    /**
     * Handle scroll events
     */
    handleScroll() {
        // Don't update during programmatic scrolling
        if (this.isScrolling) return;
        
        this.updateActiveSection();
    }
    
    /**
     * Update the active section based on scroll position
     */
    updateActiveSection() {
        const scrollPosition = window.pageYOffset;
        const headerHeight = this.getHeaderHeight();
        const viewportHeight = window.innerHeight;
        
        let activeSection = null;
        
        // Find the section that's most visible in the viewport
        for (const section of this.sections) {
            const element = section.element;
            const rect = element.getBoundingClientRect();
            const elementTop = rect.top + scrollPosition;
            const elementBottom = elementTop + rect.height;
            
            // Check if section is in viewport
            const isInViewport = (
                elementTop <= scrollPosition + headerHeight + this.config.scrollOffset &&
                elementBottom > scrollPosition + headerHeight
            );
            
            if (isInViewport) {
                activeSection = section.id;
                break;
            }
        }
        
        // Fallback: if no section is clearly active, use the first one
        if (!activeSection && this.sections.length > 0) {
            activeSection = this.sections[0].id;
        }
        
        // Update active section if it changed
        if (activeSection && activeSection !== this.activeSection) {
            this.setActiveSection(activeSection);
        }
    }
    
    /**
     * Set the active section and update navigation
     */
    setActiveSection(sectionId) {
        this.activeSection = sectionId;
        
        // Update navigation link states
        this.navLinks.forEach(link => {
            const linkTarget = link.getAttribute('href').substring(1);
            const isActive = linkTarget === sectionId;
            
            link.classList.toggle('nav__link--active', isActive);
            link.setAttribute('aria-current', isActive ? 'page' : 'false');
        });
        
        // Dispatch custom event
        this.dispatchSectionChangeEvent(sectionId);
    }
    
    /**
     * Handle keyboard navigation
     */
    handleKeydown(event) {
        // Handle keyboard shortcuts for navigation
        if (event.altKey || event.ctrlKey || event.metaKey) {
            return;
        }
        
        switch (event.key) {
            case 'Home':
                if (event.target.tagName !== 'INPUT' && event.target.tagName !== 'TEXTAREA') {
                    event.preventDefault();
                    this.scrollToTop();
                }
                break;
                
            case 'End':
                if (event.target.tagName !== 'INPUT' && event.target.tagName !== 'TEXTAREA') {
                    event.preventDefault();
                    this.scrollToBottom();
                }
                break;
        }
    }
    
    /**
     * Handle hash changes (browser navigation)
     */
    handleHashChange() {
        const hash = window.location.hash.substring(1);
        if (hash && !this.isScrolling) {
            const targetElement = document.getElementById(hash);
            if (targetElement) {
                this.scrollToSection(targetElement, hash);
            }
        }
    }
    
    /**
     * Scroll to top of page
     */
    scrollToTop() {
        this.isScrolling = true;
        
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        setTimeout(() => {
            this.isScrolling = false;
            this.updateActiveSection();
        }, this.config.scrollDuration);
    }
    
    /**
     * Scroll to bottom of page
     */
    scrollToBottom() {
        this.isScrolling = true;
        
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth'
        });
        
        setTimeout(() => {
            this.isScrolling = false;
            this.updateActiveSection();
        }, this.config.scrollDuration);
    }
    
    /**
     * Get header height for scroll offset calculation
     */
    getHeaderHeight() {
        const header = document.querySelector('.header');
        return header ? header.offsetHeight : 0;
    }
    
    /**
     * Update URL without triggering scroll
     */
    updateURL(sectionId) {
        if (history.replaceState) {
            const newURL = `${window.location.pathname}${window.location.search}#${sectionId}`;
            history.replaceState(null, null, newURL);
        }
    }
    
    /**
     * Announce navigation to screen readers
     */
    announceNavigation(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const heading = section.querySelector('h1, h2, h3, h4, h5, h6');
            const sectionName = heading ? heading.textContent : sectionId;
            
            // Create announcement for screen readers
            const announcement = document.createElement('div');
            announcement.setAttribute('aria-live', 'polite');
            announcement.setAttribute('aria-atomic', 'true');
            announcement.className = 'sr-only';
            announcement.textContent = `Navegou para a secção: ${sectionName}`;
            
            document.body.appendChild(announcement);
            
            // Remove announcement after it's been read
            setTimeout(() => {
                document.body.removeChild(announcement);
            }, 1000);
        }
    }
    
    /**
     * Dispatch section change event
     */
    dispatchSectionChangeEvent(sectionId) {
        const event = new CustomEvent('sectionchange', {
            detail: {
                activeSection: sectionId,
                previousSection: this.activeSection
            }
        });
        
        document.dispatchEvent(event);
    }
    
    /**
     * Throttle function to limit event frequency
     */
    throttle(func, delay) {
        let timeoutId;
        let lastExecTime = 0;
        
        return function (...args) {
            const currentTime = Date.now();
            
            if (currentTime - lastExecTime > delay) {
                func.apply(this, args);
                lastExecTime = currentTime;
            } else {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    func.apply(this, args);
                    lastExecTime = Date.now();
                }, delay - (currentTime - lastExecTime));
            }
        };
    }
    
    /**
     * Get current active section
     */
    getActiveSection() {
        return this.activeSection;
    }
    
    /**
     * Navigate to a specific section programmatically
     */
    navigateToSection(sectionId) {
        const targetElement = document.getElementById(sectionId);
        if (targetElement) {
            this.scrollToSection(targetElement, sectionId);
            this.updateURL(sectionId);
        }
    }
    
    /**
     * Clean up event listeners
     */
    destroy() {
        // Remove navigation link listeners
        this.navLinks.forEach(link => {
            link.removeEventListener('click', this.handleNavClick);
        });
        
        // Remove window listeners
        window.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('hashchange', this.handleHashChange);
        document.removeEventListener('keydown', this.handleKeydown);
        
        // Clear timeouts
        if (this.scrollTimeout) {
            clearTimeout(this.scrollTimeout);
        }
        
        console.log('Navigation manager destroyed');
    }
}