/**
 * Animation Controller Module
 * Handles performant animations using Intersection Observer and CSS transforms
 * Respects user's motion preferences
 */

export class AnimationController {
    constructor() {
        this.observers = new Map();
        this.animatedElements = new Set();
        this.respectsReducedMotion = this.checkReducedMotionPreference();
        
        // Animation configuration
        this.config = {
            rootMargin: '0px 0px -10% 0px', // Trigger when 10% visible
            threshold: 0.1,
            animationDelay: 100, // Stagger delay between elements
            maxStaggerDelay: 600 // Maximum total stagger delay
        };
        
        // Bind methods
        this.handleIntersection = this.handleIntersection.bind(this);
        this.handleReducedMotionChange = this.handleReducedMotionChange.bind(this);
    }
    
    /**
     * Initialize the animation controller
     */
    init() {
        try {
            // Set up reduced motion preference listener
            this.setupReducedMotionListener();
            
            // Create intersection observer
            this.createIntersectionObserver();
            
            console.log('Animation controller initialized');
        } catch (error) {
            console.error('Error initializing animation controller:', error);
        }
    }
    
    /**
     * Check user's reduced motion preference
     */
    checkReducedMotionPreference() {
        if (!window.matchMedia) return false;
        
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    
    /**
     * Set up listener for reduced motion preference changes
     */
    setupReducedMotionListener() {
        if (!window.matchMedia) return;
        
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener('change', this.handleReducedMotionChange);
        } else {
            // Fallback for older browsers
            mediaQuery.addListener(this.handleReducedMotionChange);
        }
    }
    
    /**
     * Handle reduced motion preference changes
     */
    handleReducedMotionChange(event) {
        this.respectsReducedMotion = event.matches;
        console.log(`Reduced motion preference: ${this.respectsReducedMotion ? 'enabled' : 'disabled'}`);
        
        // If reduced motion is enabled, immediately show all elements
        if (this.respectsReducedMotion) {
            this.showAllElements();
        }
    }
    
    /**
     * Create intersection observer for scroll animations
     */
    createIntersectionObserver() {
        if (!('IntersectionObserver' in window)) {
            console.warn('IntersectionObserver not supported, animations disabled');
            this.showAllElements();
            return;
        }
        
        const observer = new IntersectionObserver(this.handleIntersection, {
            root: null,
            rootMargin: this.config.rootMargin,
            threshold: this.config.threshold
        });
        
        this.observers.set('scroll', observer);
    }
    
    /**
     * Handle intersection observer events
     */
    handleIntersection(entries) {
        if (this.respectsReducedMotion) {
            // If reduced motion is preferred, show elements immediately
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.showElement(entry.target, true);
                }
            });
            return;
        }
        
        // Group entries by container for staggered animations
        const containers = new Map();
        
        entries.forEach(entry => {
            if (entry.isIntersecting && !this.animatedElements.has(entry.target)) {
                const container = this.findAnimationContainer(entry.target);
                const containerKey = container ? container.id || container.className : 'default';
                
                if (!containers.has(containerKey)) {
                    containers.set(containerKey, []);
                }
                
                containers.get(containerKey).push(entry.target);
            }
        });
        
        // Animate elements with staggered timing
        containers.forEach((elements, containerKey) => {
            this.animateElementsWithStagger(elements);
        });
    }
    
    /**
     * Find the animation container for staggered animations
     */
    findAnimationContainer(element) {
        // Look for parent with animation container class or specific containers
        const containers = ['.projects', '.contact__links', '.nav__list'];
        
        for (const containerSelector of containers) {
            const container = element.closest(containerSelector);
            if (container) return container;
        }
        
        return null;
    }
    
    /**
     * Animate elements with staggered timing
     */
    animateElementsWithStagger(elements) {
        elements.forEach((element, index) => {
            const delay = Math.min(
                index * this.config.animationDelay,
                this.config.maxStaggerDelay
            );
            
            setTimeout(() => {
                this.showElement(element);
            }, delay);
        });
    }
    
    /**
     * Show an element with animation
     */
    showElement(element, immediate = false) {
        if (this.animatedElements.has(element)) return;
        
        this.animatedElements.add(element);
        
        if (immediate || this.respectsReducedMotion) {
            // Show immediately without animation
            element.style.opacity = '1';
            element.style.transform = 'none';
            element.classList.add('animate');
        } else {
            // Animate in
            element.classList.add('animate');
        }
        
        // Stop observing this element
        const observer = this.observers.get('scroll');
        if (observer) {
            observer.unobserve(element);
        }
    }
    
    /**
     * Show all elements immediately (for reduced motion)
     */
    showAllElements() {
        const animatableElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
        
        animatableElements.forEach(element => {
            this.showElement(element, true);
        });
    }
    
    /**
     * Observe elements for scroll animations
     */
    observeElements(selector) {
        const observer = this.observers.get('scroll');
        if (!observer) return;
        
        const elements = document.querySelectorAll(selector);
        
        elements.forEach(element => {
            // Add animation class if not already present
            if (!element.classList.contains('fade-in') && 
                !element.classList.contains('slide-in-left') && 
                !element.classList.contains('slide-in-right')) {
                
                // Determine animation type based on element or position
                const animationType = this.getAnimationType(element);
                element.classList.add(animationType);
            }
            
            // Start observing
            observer.observe(element);
        });
        
        console.log(`Observing ${elements.length} elements for animations`);
    }
    
    /**
     * Determine animation type for an element
     */
    getAnimationType(element) {
        // Check for data attribute first
        const dataAnimation = element.dataset.animation;
        if (dataAnimation) return dataAnimation;
        
        // Determine based on element type or position
        if (element.classList.contains('project-card')) {
            return 'fade-in';
        }
        
        if (element.classList.contains('contact__link')) {
            return 'slide-in-left';
        }
        
        if (element.classList.contains('nav__link')) {
            return 'slide-in-right';
        }
        
        // Default animation
        return 'fade-in';
    }
    
    /**
     * Trigger animations for elements currently in viewport
     */
    triggerInitialAnimations() {
        if (this.respectsReducedMotion) {
            this.showAllElements();
            return;
        }
        
        const observer = this.observers.get('scroll');
        if (!observer) return;
        
        // Manually check which elements are in viewport
        const animatableElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
        
        animatableElements.forEach(element => {
            if (this.isElementInViewport(element)) {
                this.showElement(element);
            }
        });
    }
    
    /**
     * Check if element is in viewport
     */
    isElementInViewport(element) {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        
        return (
            rect.top >= 0 &&
            rect.top <= windowHeight * 0.9 // 90% visible threshold
        );
    }
    
    /**
     * Add smooth scroll behavior to links
     */
    enableSmoothScroll() {
        // This is handled by CSS scroll-behavior, but we can add JS fallback
        if (!('scrollBehavior' in document.documentElement.style)) {
            console.log('Adding smooth scroll polyfill');
            this.addSmoothScrollPolyfill();
        }
    }
    
    /**
     * Add smooth scroll polyfill for older browsers
     */
    addSmoothScrollPolyfill() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', (event) => {
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    event.preventDefault();
                    this.smoothScrollTo(targetElement);
                }
            });
        });
    }
    
    /**
     * Smooth scroll to element (polyfill)
     */
    smoothScrollTo(element) {
        const targetPosition = element.offsetTop;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 800;
        let start = null;
        
        const animation = (currentTime) => {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const run = this.easeInOutQuad(timeElapsed, startPosition, distance, duration);
            
            window.scrollTo(0, run);
            
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        };
        
        requestAnimationFrame(animation);
    }
    
    /**
     * Easing function for smooth scroll
     */
    easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    /**
     * Create a custom animation
     */
    createCustomAnimation(element, keyframes, options = {}) {
        if (this.respectsReducedMotion) {
            // Skip animation, just apply final state
            const finalKeyframe = keyframes[keyframes.length - 1];
            Object.assign(element.style, finalKeyframe);
            return Promise.resolve();
        }
        
        if ('animate' in element) {
            // Use Web Animations API
            return element.animate(keyframes, {
                duration: 300,
                easing: 'ease-out',
                fill: 'forwards',
                ...options
            }).finished;
        } else {
            // Fallback to CSS transitions
            return this.fallbackAnimation(element, keyframes, options);
        }
    }
    
    /**
     * Fallback animation using CSS transitions
     */
    fallbackAnimation(element, keyframes, options) {
        return new Promise((resolve) => {
            const duration = options.duration || 300;
            const finalKeyframe = keyframes[keyframes.length - 1];
            
            element.style.transition = `all ${duration}ms ease-out`;
            Object.assign(element.style, finalKeyframe);
            
            setTimeout(() => {
                element.style.transition = '';
                resolve();
            }, duration);
        });
    }
    
    /**
     * Pause all animations
     */
    pauseAnimations() {
        document.documentElement.style.setProperty('--animation-play-state', 'paused');
    }
    
    /**
     * Resume all animations
     */
    resumeAnimations() {
        document.documentElement.style.removeProperty('--animation-play-state');
    }
    
    /**
     * Clean up observers and event listeners
     */
    destroy() {
        // Disconnect all observers
        this.observers.forEach(observer => {
            observer.disconnect();
        });
        this.observers.clear();
        
        // Remove reduced motion listener
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
            if (mediaQuery.removeEventListener) {
                mediaQuery.removeEventListener('change', this.handleReducedMotionChange);
            } else {
                mediaQuery.removeListener(this.handleReducedMotionChange);
            }
        }
        
        // Clear sets
        this.animatedElements.clear();
        
        console.log('Animation controller destroyed');
    }
}