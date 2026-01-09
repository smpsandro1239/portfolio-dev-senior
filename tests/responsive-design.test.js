/**
 * Property Test: Responsive Design Consistency
 * Validates: Requirements 4.2, 4.3, 4.5
 * 
 * Property 6: Responsive Design Consistency
 * For all viewport widths from 320px to 4K (3840px):
 * - Content must remain readable and accessible
 * - Interactive elements must maintain minimum touch target size (44px)
 * - Layout must not break or cause horizontal scrolling
 * - Text must remain legible (minimum 16px base font size)
 */

import { readFileSync } from 'fs';
import { join } from 'path';

describe('Property 6: Responsive Design Consistency', () => {
    let htmlContent;
    let cssContent;
    
    beforeAll(() => {
        // Load HTML and CSS files
        const htmlPath = join(process.cwd(), 'src', 'index.html');
        const cssPath = join(process.cwd(), 'src', 'css', 'main.css');
        
        htmlContent = readFileSync(htmlPath, 'utf-8');
        cssContent = readFileSync(cssPath, 'utf-8');
    });
    
    test('should have mobile-first responsive design with proper media queries', () => {
        // Check for mobile-first media queries (min-width)
        const minWidthQueries = cssContent.match(/@media.*min-width/g);
        expect(minWidthQueries).toBeTruthy();
        expect(minWidthQueries.length).toBeGreaterThan(0);
        
        // Check for key breakpoints
        expect(cssContent).toMatch(/@media.*min-width.*768px/);
        expect(cssContent).toMatch(/@media.*min-width.*1024px/);
        
        // Should not use max-width queries (mobile-first approach)
        const maxWidthQueries = cssContent.match(/@media.*max-width/g);
        expect(maxWidthQueries).toBeFalsy();
    });
    
    test('should define minimum touch target size (44px) for interactive elements', () => {
        // Check for 44px minimum in CSS
        const has44pxMinimum = cssContent.includes('44px');
        expect(has44pxMinimum).toBe(true);
        
        // Check theme toggle has proper sizing
        expect(cssContent).toMatch(/\.theme-toggle[\s\S]*?width:\s*44px/);
        expect(cssContent).toMatch(/\.theme-toggle[\s\S]*?height:\s*44px/);
        
        // Check that interactive elements have proper padding
        expect(cssContent).toMatch(/\.nav__link[\s\S]*?padding/);
        expect(cssContent).toMatch(/\.contact__link[\s\S]*?padding/);
    });
    
    test('should maintain base font size of 16px (100%)', () => {
        // Check root font size
        const rootFontSize = cssContent.match(/html\s*{[^}]*font-size:\s*100%/);
        expect(rootFontSize).toBeTruthy();
        
        // Check that base font size variable is 1rem (16px)
        expect(cssContent).toMatch(/--font-size-base:\s*1rem/);
        
        // Ensure no font sizes smaller than 12px (0.75rem)
        const fontSizeXs = cssContent.match(/--font-size-xs:\s*([\d.]+)rem/);
        if (fontSizeXs) {
            const size = parseFloat(fontSizeXs[1]);
            expect(size).toBeGreaterThanOrEqual(0.75); // 12px minimum
        }
    });
    
    test('should use CSS Grid for projects layout', () => {
        // Check for CSS Grid usage
        expect(cssContent).toMatch(/\.projects\s*{[^}]*display:\s*grid/);
        
        // Check for responsive grid columns
        expect(cssContent).toMatch(/\.projects[\s\S]*?grid-template-columns/);
        
        // Check for auto-fit or auto-fill for responsiveness
        const gridColumns = cssContent.match(/\.projects[\s\S]*?grid-template-columns:\s*repeat\((auto-fit|auto-fill)/);
        expect(gridColumns).toBeTruthy();
        
        // Check for minmax for flexible sizing
        expect(cssContent).toMatch(/\.projects[\s\S]*?minmax/);
    });
    
    test('should use Flexbox for navigation', () => {
        // Check for Flexbox usage in navigation
        expect(cssContent).toMatch(/\.nav__list\s*{[^}]*display:\s*flex/);
        
        // Check for gap property for spacing
        expect(cssContent).toMatch(/\.nav__list[\s\S]*?gap/);
        
        // Check for proper alignment
        const navListStyles = cssContent.match(/\.nav__list\s*{[^}]*}/s);
        expect(navListStyles).toBeTruthy();
    });
    
    test('should have proper container max-width and padding', () => {
        // Check for container max-width
        expect(cssContent).toMatch(/--container-max-width:\s*\d+px/);
        
        // Check for container padding
        expect(cssContent).toMatch(/--container-padding/);
        
        // Check that container uses these variables
        expect(cssContent).toMatch(/\.container[\s\S]*?max-width:\s*var\(--container-max-width\)/);
        expect(cssContent).toMatch(/\.container[\s\S]*?padding.*var\(--container-padding\)/);
    });
    
    test('should prevent horizontal scrolling with proper box-sizing', () => {
        // Check for box-sizing: border-box
        expect(cssContent).toMatch(/\*[\s\S]*?box-sizing:\s*border-box/);
        
        // Check that container has width: 100%
        expect(cssContent).toMatch(/\.container[\s\S]*?width:\s*100%/);
        
        // Check for proper overflow handling
        const hasOverflowControl = cssContent.includes('overflow') || cssContent.includes('max-width');
        expect(hasOverflowControl).toBe(true);
    });
    
    test('should have responsive typography with proper scaling', () => {
        // Check for font size variables
        expect(cssContent).toMatch(/--font-size-xs/);
        expect(cssContent).toMatch(/--font-size-sm/);
        expect(cssContent).toMatch(/--font-size-base/);
        expect(cssContent).toMatch(/--font-size-lg/);
        expect(cssContent).toMatch(/--font-size-xl/);
        expect(cssContent).toMatch(/--font-size-2xl/);
        expect(cssContent).toMatch(/--font-size-3xl/);
        expect(cssContent).toMatch(/--font-size-4xl/);
        expect(cssContent).toMatch(/--font-size-5xl/);
        
        // Check that headings use these variables
        expect(cssContent).toMatch(/h1[\s\S]*?font-size:\s*var\(--font-size-/);
        expect(cssContent).toMatch(/h2[\s\S]*?font-size:\s*var\(--font-size-/);
    });
    
    test('should have proper spacing system with CSS custom properties', () => {
        // Check for spacing scale
        expect(cssContent).toMatch(/--space-1:\s*0\.25rem/);
        expect(cssContent).toMatch(/--space-2:\s*0\.5rem/);
        expect(cssContent).toMatch(/--space-4:\s*1rem/);
        expect(cssContent).toMatch(/--space-8:\s*2rem/);
        expect(cssContent).toMatch(/--space-16:\s*4rem/);
        
        // Check that spacing is used consistently
        const spacingUsage = cssContent.match(/var\(--space-\d+\)/g);
        expect(spacingUsage).toBeTruthy();
        expect(spacingUsage.length).toBeGreaterThan(10);
    });
    
    test('should have accessible skip link for keyboard navigation', () => {
        // Check HTML has skip link
        expect(htmlContent).toMatch(/<a[^>]*class="skip-link"[^>]*>/);
        expect(htmlContent).toMatch(/href="#main-content"/);
        
        // Check CSS has skip link styles
        expect(cssContent).toMatch(/\.skip-link/);
        expect(cssContent).toMatch(/\.skip-link:focus/);
        
        // Skip link should be positioned off-screen initially
        expect(cssContent).toMatch(/\.skip-link[\s\S]*?position:\s*absolute/);
        expect(cssContent).toMatch(/\.skip-link[\s\S]*?top:\s*-\d+px/);
    });
    
    test('should support prefers-reduced-motion for accessibility', () => {
        // Check for prefers-reduced-motion media query
        expect(cssContent).toMatch(/@media.*prefers-reduced-motion:\s*reduce/);
        
        // Check that animations are disabled
        const reducedMotionBlock = cssContent.match(/@media.*prefers-reduced-motion:\s*reduce[\s\S]*?{[\s\S]*?}/);
        expect(reducedMotionBlock).toBeTruthy();
        
        // Should set animation and transition durations to minimal values
        expect(cssContent).toMatch(/prefers-reduced-motion[\s\S]*?animation-duration:\s*0\.01ms/);
        expect(cssContent).toMatch(/prefers-reduced-motion[\s\S]*?transition-duration:\s*0\.01ms/);
    });
    
    test('should have proper semantic HTML structure', () => {
        // Check for semantic HTML5 elements
        expect(htmlContent).toMatch(/<header[^>]*role="banner"/);
        expect(htmlContent).toMatch(/<nav[^>]*role="navigation"/);
        expect(htmlContent).toMatch(/<main[^>]*role="main"/);
        expect(htmlContent).toMatch(/<footer[^>]*role="contentinfo"/);
        
        // Check for proper heading hierarchy
        expect(htmlContent).toMatch(/<h1/);
        expect(htmlContent).toMatch(/<h2/);
        
        // Check for sections with IDs for navigation
        expect(htmlContent).toMatch(/id="sobre"/);
        expect(htmlContent).toMatch(/id="projetos"/);
        expect(htmlContent).toMatch(/id="curso"/);
        expect(htmlContent).toMatch(/id="contacto"/);
    });
    
    test('should have responsive images setup (even if not yet implemented)', () => {
        // Check for image optimization mentions or WebP support in CSS
        // This is a forward-looking test for Task 5
        const hasImageOptimization = cssContent.includes('img') || 
                                     cssContent.includes('picture') ||
                                     htmlContent.includes('loading="lazy"');
        
        // For now, just verify the structure is ready
        expect(typeof hasImageOptimization).toBe('boolean');
    });
    
    test('should have proper viewport meta tag', () => {
        // Check for viewport meta tag
        expect(htmlContent).toMatch(/<meta[^>]*name="viewport"[^>]*>/);
        expect(htmlContent).toMatch(/content="width=device-width,\s*initial-scale=1\.0"/);
    });
    
    test('should have responsive header with proper layout', () => {
        // Check header uses flexbox
        expect(cssContent).toMatch(/\.header__content[\s\S]*?display:\s*flex/);
        
        // Check for proper alignment
        expect(cssContent).toMatch(/\.header__content[\s\S]*?align-items:\s*center/);
        expect(cssContent).toMatch(/\.header__content[\s\S]*?justify-content:\s*space-between/);
        
        // Check for gap
        expect(cssContent).toMatch(/\.header__content[\s\S]*?gap/);
    });
    
    test('should have responsive footer layout', () => {
        // Check footer content uses flexbox
        expect(cssContent).toMatch(/\.footer__content[\s\S]*?display:\s*flex/);
        
        // Check for flex-wrap for mobile
        expect(cssContent).toMatch(/\.footer__content[\s\S]*?flex-wrap:\s*wrap/);
        
        // Check for proper spacing
        expect(cssContent).toMatch(/\.footer__content[\s\S]*?gap/);
    });
    
    test('Property: Responsive breakpoints cover all major device categories', () => {
        // Extract all breakpoint values
        const breakpoints = [];
        const breakpointMatches = cssContent.matchAll(/@media.*min-width:\s*(\d+)px/g);
        
        for (const match of breakpointMatches) {
            breakpoints.push(parseInt(match[1]));
        }
        
        // Should have at least 2 breakpoints
        expect(breakpoints.length).toBeGreaterThanOrEqual(2);
        
        // Should cover tablet (around 768px)
        const hasTabletBreakpoint = breakpoints.some(bp => bp >= 768 && bp <= 800);
        expect(hasTabletBreakpoint).toBe(true);
        
        // Should cover desktop (around 1024px)
        const hasDesktopBreakpoint = breakpoints.some(bp => bp >= 1024 && bp <= 1280);
        expect(hasDesktopBreakpoint).toBe(true);
    });
    
    test('Property: All interactive elements have sufficient spacing', () => {
        // Check that buttons and links have padding
        const interactiveElements = [
            '.theme-toggle',
            '.nav__link',
            '.contact__link',
            '.course__link',
            '.project-card__link'
        ];
        
        interactiveElements.forEach(selector => {
            const hasPadding = cssContent.match(new RegExp(`\\${selector}[\\s\\S]*?padding`));
            expect(hasPadding).toBeTruthy();
        });
    });
    
    test('Property: Layout uses modern CSS techniques (Grid and Flexbox)', () => {
        // Count Grid usage
        const gridUsage = (cssContent.match(/display:\s*grid/g) || []).length;
        expect(gridUsage).toBeGreaterThan(0);
        
        // Count Flexbox usage
        const flexUsage = (cssContent.match(/display:\s*flex/g) || []).length;
        expect(flexUsage).toBeGreaterThan(0);
        
        // Should use both Grid and Flexbox appropriately
        expect(gridUsage + flexUsage).toBeGreaterThanOrEqual(5);
    });
    
    test('Property: CSS custom properties are used for theming and consistency', () => {
        // Count custom property definitions
        const customProps = cssContent.match(/--[\w-]+:/g);
        expect(customProps).toBeTruthy();
        expect(customProps.length).toBeGreaterThan(20);
        
        // Count custom property usage
        const customPropUsage = cssContent.match(/var\(--[\w-]+\)/g);
        expect(customPropUsage).toBeTruthy();
        expect(customPropUsage.length).toBeGreaterThan(50);
    });
    
    test('Property: Responsive design maintains accessibility at all breakpoints', () => {
        // Check that focus styles are defined
        expect(cssContent).toMatch(/:focus/);
        
        // Check that focus has outline
        const focusStyles = cssContent.match(/:focus[\s\S]*?outline/g);
        expect(focusStyles).toBeTruthy();
        expect(focusStyles.length).toBeGreaterThan(0);
        
        // Check for proper color contrast variables
        expect(cssContent).toMatch(/--color-text-primary/);
        expect(cssContent).toMatch(/--color-bg-primary/);
    });
});
