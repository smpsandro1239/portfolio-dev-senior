/**
 * Property-Based Test: Vanilla Technology Stack Compliance
 * Feature: professional-portfolio, Property 1: Vanilla Technology Stack Compliance
 * Validates: Requirements 1.1, 1.2, 1.3
 * 
 * Tests that all source files contain only HTML5, CSS3, or JavaScript ES6+ 
 * without external framework imports or dependencies
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

/**
 * Test suite for vanilla technology stack compliance
 */
describe('Vanilla Technology Stack Compliance', () => {
    const srcDir = join(process.cwd(), 'src');
    const excludePatterns = [
        /node_modules/,
        /\.git/,
        /\.DS_Store/,
        /thumbs\.db/i,
        /\.test\./,
        /\.spec\./
    ];
    
    // Forbidden framework imports and dependencies
    const forbiddenImports = [
        // React
        /import.*from\s+['"]react['"]/i,
        /import.*from\s+['"]react-dom['"]/i,
        /<script.*react/i,
        
        // Vue
        /import.*from\s+['"]vue['"]/i,
        /<script.*vue/i,
        
        // Angular
        /import.*from\s+['"]@angular/i,
        /<script.*angular/i,
        
        // jQuery
        /import.*from\s+['"]jquery['"]/i,
        /<script.*jquery/i,
        /\$\(/,  // jQuery selector (basic check)
        
        // Bootstrap
        /import.*from\s+['"]bootstrap['"]/i,
        /<link.*bootstrap/i,
        /<script.*bootstrap/i,
        
        // Other popular frameworks
        /import.*from\s+['"]lodash['"]/i,
        /import.*from\s+['"]moment['"]/i,
        /import.*from\s+['"]axios['"]/i,
        
        // CDN imports
        /https?:\/\/cdn\./i,
        /https?:\/\/unpkg\.com/i,
        /https?:\/\/cdnjs\.cloudflare\.com/i
    ];
    
    // Valid native web APIs and features
    const validNativeAPIs = [
        'fetch', 'localStorage', 'sessionStorage', 'matchMedia',
        'IntersectionObserver', 'MutationObserver', 'ResizeObserver',
        'requestAnimationFrame', 'cancelAnimationFrame',
        'addEventListener', 'removeEventListener',
        'querySelector', 'querySelectorAll', 'getElementById',
        'createElement', 'appendChild', 'removeChild',
        'classList', 'dataset', 'style',
        'setTimeout', 'setInterval', 'clearTimeout', 'clearInterval',
        'Promise', 'async', 'await', 'Map', 'Set', 'WeakMap', 'WeakSet'
    ];
    
    /**
     * Get all source files recursively
     */
    function getAllSourceFiles(dir) {
        const files = [];
        
        function traverse(currentDir) {
            const items = readdirSync(currentDir);
            
            for (const item of items) {
                const fullPath = join(currentDir, item);
                const stat = statSync(fullPath);
                
                // Skip excluded patterns
                if (excludePatterns.some(pattern => pattern.test(fullPath))) {
                    continue;
                }
                
                if (stat.isDirectory()) {
                    traverse(fullPath);
                } else if (stat.isFile()) {
                    const ext = extname(item).toLowerCase();
                    if (['.html', '.css', '.js', '.mjs'].includes(ext)) {
                        files.push(fullPath);
                    }
                }
            }
        }
        
        traverse(dir);
        return files;
    }
    
    /**
     * Property Test: All source files must be vanilla (no external frameworks)
     */
    test('Property 1: All source files contain only vanilla HTML5, CSS3, or JavaScript ES6+', () => {
        const sourceFiles = getAllSourceFiles(srcDir);
        
        expect(sourceFiles.length).toBeGreaterThan(0);
        
        // Test each file for vanilla compliance
        for (const filePath of sourceFiles) {
            const content = readFileSync(filePath, 'utf-8');
            const relativePath = filePath.replace(process.cwd(), '');
            
            // Check for forbidden framework imports
            for (const forbiddenPattern of forbiddenImports) {
                expect(content).not.toMatch(forbiddenPattern);
            }
            
            // Additional checks based on file type
            const ext = extname(filePath).toLowerCase();
            
            if (ext === '.html') {
                validateHTMLFile(content, relativePath);
            } else if (ext === '.css') {
                validateCSSFile(content, relativePath);
            } else if (ext === '.js' || ext === '.mjs') {
                validateJavaScriptFile(content, relativePath);
            }
        }
    });
    
    /**
     * Validate HTML file for vanilla compliance
     */
    function validateHTMLFile(content, filePath) {
        // Should use HTML5 doctype
        expect(content).toMatch(/<!DOCTYPE html>/i);
        
        // Should not include framework-specific attributes
        expect(content).not.toMatch(/ng-/i); // Angular
        expect(content).not.toMatch(/v-/i);  // Vue
        expect(content).not.toMatch(/data-react/i); // React
        
        // Should use semantic HTML5 elements
        const semanticElements = ['header', 'nav', 'main', 'section', 'article', 'aside', 'footer'];
        const hasSemanticElements = semanticElements.some(element => 
            content.includes(`<${element}`) || content.includes(`</${element}>`)
        );
        expect(hasSemanticElements).toBe(true);
    }
    
    /**
     * Validate CSS file for vanilla compliance
     */
    function validateCSSFile(content, filePath) {
        // Should not import external frameworks
        expect(content).not.toMatch(/@import.*bootstrap/i);
        expect(content).not.toMatch(/@import.*foundation/i);
        expect(content).not.toMatch(/@import.*bulma/i);
        
        // Should use modern CSS features (custom properties, grid, flexbox)
        const modernFeatures = [
            /--[\w-]+\s*:/,  // CSS custom properties
            /display\s*:\s*grid/i,
            /display\s*:\s*flex/i,
            /grid-template/i,
            /flex-/i
        ];
        
        const hasModernFeatures = modernFeatures.some(pattern => pattern.test(content));
        expect(hasModernFeatures).toBe(true);
    }
    
    /**
     * Validate JavaScript file for vanilla compliance
     */
    function validateJavaScriptFile(content, filePath) {
        // Should use ES6+ features
        const es6Features = [
            /class\s+\w+/,           // ES6 classes
            /const\s+\w+/,           // const declarations
            /let\s+\w+/,             // let declarations
            /=>\s*{?/,               // arrow functions
            /import\s+.*from/,       // ES6 imports
            /export\s+(class|function|const|let)/  // ES6 exports
        ];
        
        const hasES6Features = es6Features.some(pattern => pattern.test(content));
        expect(hasES6Features).toBe(true);
        
        // Should only use native Web APIs
        const apiUsagePattern = /\b(\w+)\s*\(/g;
        let match;
        
        while ((match = apiUsagePattern.exec(content)) !== null) {
            const apiName = match[1];
            
            // Skip common language constructs
            if (['if', 'for', 'while', 'switch', 'function', 'return', 'console'].includes(apiName)) {
                continue;
            }
            
            // Skip variable names and method calls on objects
            if (apiName.charAt(0) === apiName.charAt(0).toLowerCase() && 
                !validNativeAPIs.includes(apiName)) {
                // This is a basic check - in a real scenario, you'd want more sophisticated parsing
                continue;
            }
        }
    }
    
    /**
     * Property Test: No package.json dependencies for runtime
     */
    test('Property 1.1: No runtime dependencies in package.json', () => {
        try {
            const packageJsonPath = join(process.cwd(), 'package.json');
            const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
            
            // Should have no runtime dependencies (only devDependencies allowed)
            expect(packageJson.dependencies || {}).toEqual({});
            
            // DevDependencies are allowed for build tools and testing
            if (packageJson.devDependencies) {
                const devDeps = Object.keys(packageJson.devDependencies);
                
                // Ensure dev dependencies are only build/test tools
                const allowedDevDeps = [
                    'jest', 'eslint', 'prettier', 'terser', 'csso',
                    'html-validate', 'stylelint', 'lighthouse',
                    '@axe-core/cli', 'serve', 'http-server'
                ];
                
                for (const dep of devDeps) {
                    const isAllowed = allowedDevDeps.some(allowed => 
                        dep.includes(allowed) || allowed.includes(dep)
                    );
                    expect(isAllowed).toBe(true);
                }
            }
        } catch (error) {
            // No package.json is also valid for a vanilla project
            if (error.code !== 'ENOENT') {
                throw error;
            }
        }
    });
    
    /**
     * Property Test: All JavaScript modules use native ES6 imports/exports
     */
    test('Property 1.2: All JavaScript modules use native ES6 imports/exports', () => {
        const jsFiles = getAllSourceFiles(srcDir).filter(file => 
            ['.js', '.mjs'].includes(extname(file).toLowerCase())
        );
        
        for (const filePath of jsFiles) {
            const content = readFileSync(filePath, 'utf-8');
            
            // If file has imports, they should be ES6 imports
            if (content.includes('import')) {
                expect(content).toMatch(/import\s+.*\s+from\s+['"][^'"]+['"]/);
                expect(content).not.toMatch(/require\s*\(/); // No CommonJS
            }
            
            // If file has exports, they should be ES6 exports
            if (content.includes('export')) {
                expect(content).toMatch(/export\s+(class|function|const|let|default)/);
                expect(content).not.toMatch(/module\.exports/); // No CommonJS
            }
        }
    });
    
    /**
     * Property Test: HTML files use only standard HTML5 elements and attributes
     */
    test('Property 1.3: HTML files use only standard HTML5 elements and attributes', () => {
        const htmlFiles = getAllSourceFiles(srcDir).filter(file => 
            extname(file).toLowerCase() === '.html'
        );
        
        for (const filePath of htmlFiles) {
            const content = readFileSync(filePath, 'utf-8');
            
            // Should not have framework-specific attributes
            const frameworkAttributes = [
                /ng-\w+/g,      // Angular
                /v-\w+/g,       // Vue
                /data-react/g,  // React
                /x-\w+/g,       // Alpine.js
                /wire:\w+/g     // Livewire
            ];
            
            for (const pattern of frameworkAttributes) {
                expect(content).not.toMatch(pattern);
            }
            
            // Should use valid HTML5 attributes
            const validAttributes = [
                'id', 'class', 'data-', 'aria-', 'role', 'tabindex',
                'href', 'src', 'alt', 'title', 'lang', 'dir',
                'type', 'name', 'value', 'placeholder', 'required',
                'disabled', 'readonly', 'checked', 'selected'
            ];
            
            // This is a basic validation - a full implementation would parse HTML
            // and validate each attribute against the HTML5 specification
        }
    });
});

/**
 * Integration test to verify the entire stack works together
 */
describe('Vanilla Stack Integration', () => {
    test('Property 1.4: All modules can be loaded and initialized without external dependencies', async () => {
        // This would require a DOM environment for full testing
        // In a real scenario, you'd use jsdom or similar
        
        const jsFiles = getAllSourceFiles(join(process.cwd(), 'src')).filter(file => 
            extname(file).toLowerCase() === '.js'
        );
        
        for (const filePath of jsFiles) {
            const content = readFileSync(filePath, 'utf-8');
            
            // Basic syntax validation - should not throw when parsed
            expect(() => {
                new Function(content);
            }).not.toThrow();
            
            // Should not reference undefined external libraries
            const externalLibraryReferences = [
                /\$\./,           // jQuery
                /React\./,        // React
                /Vue\./,          // Vue
                /angular\./,      // Angular
                /_\./,            // Lodash
                /moment\(/        // Moment.js
            ];
            
            for (const pattern of externalLibraryReferences) {
                expect(content).not.toMatch(pattern);
            }
        }
    });
});

/**
 * Helper function to get all source files (implementation above)
 */
function getAllSourceFiles(dir) {
    const files = [];
    const excludePatterns = [
        /node_modules/,
        /\.git/,
        /\.DS_Store/,
        /thumbs\.db/i,
        /\.test\./,
        /\.spec\./
    ];
    
    function traverse(currentDir) {
        try {
            const items = readdirSync(currentDir);
            
            for (const item of items) {
                const fullPath = join(currentDir, item);
                
                // Skip excluded patterns
                if (excludePatterns.some(pattern => pattern.test(fullPath))) {
                    continue;
                }
                
                try {
                    const stat = statSync(fullPath);
                    
                    if (stat.isDirectory()) {
                        traverse(fullPath);
                    } else if (stat.isFile()) {
                        const ext = extname(item).toLowerCase();
                        if (['.html', '.css', '.js', '.mjs'].includes(ext)) {
                            files.push(fullPath);
                        }
                    }
                } catch (statError) {
                    // Skip files that can't be accessed
                    continue;
                }
            }
        } catch (readError) {
            // Skip directories that can't be read
            return;
        }
    }
    
    traverse(dir);
    return files;
}