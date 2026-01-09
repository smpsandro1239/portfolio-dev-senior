/**
 * Simple Vanilla Stack Validation Script
 * Validates that the project uses only vanilla HTML, CSS, and JavaScript
 * without external framework dependencies
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

const srcDir = './src';
let errors = [];
let warnings = [];

// Forbidden framework imports and dependencies
const forbiddenPatterns = [
    // React
    { pattern: /import.*from\s+['"]react['"]/i, name: 'React import' },
    { pattern: /import.*from\s+['"]react-dom['"]/i, name: 'React DOM import' },
    { pattern: /<script.*react/i, name: 'React script tag' },
    
    // Vue
    { pattern: /import.*from\s+['"]vue['"]/i, name: 'Vue import' },
    { pattern: /<script.*vue/i, name: 'Vue script tag' },
    
    // Angular
    { pattern: /import.*from\s+['"]@angular/i, name: 'Angular import' },
    { pattern: /<script.*angular/i, name: 'Angular script tag' },
    
    // jQuery
    { pattern: /import.*from\s+['"]jquery['"]/i, name: 'jQuery import' },
    { pattern: /<script.*jquery/i, name: 'jQuery script tag' },
    
    // Bootstrap
    { pattern: /import.*from\s+['"]bootstrap['"]/i, name: 'Bootstrap import' },
    { pattern: /<link.*bootstrap/i, name: 'Bootstrap CSS link' },
    { pattern: /<script.*bootstrap/i, name: 'Bootstrap script tag' },
    
    // CDN imports
    { pattern: /https?:\/\/cdn\./i, name: 'CDN import' },
    { pattern: /https?:\/\/unpkg\.com/i, name: 'unpkg.com import' },
    { pattern: /https?:\/\/cdnjs\.cloudflare\.com/i, name: 'cdnjs import' }
];

/**
 * Get all source files recursively
 */
function getAllSourceFiles(dir) {
    const files = [];
    const excludePatterns = [
        /node_modules/,
        /\.git/,
        /\.DS_Store/,
        /thumbs\.db/i,
        /\.test\./,
        /\.spec\./,
        /validate-vanilla\.js/
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
                    warnings.push(`Cannot access file: ${fullPath}`);
                }
            }
        } catch (readError) {
            warnings.push(`Cannot read directory: ${currentDir}`);
        }
    }
    
    traverse(dir);
    return files;
}

/**
 * Validate HTML file
 */
function validateHTMLFile(content, filePath) {
    // Should use HTML5 doctype
    if (!content.match(/<!DOCTYPE html>/i)) {
        errors.push(`${filePath}: Missing HTML5 doctype`);
    }
    
    // Should not include framework-specific attributes
    if (content.match(/\s+v-\w+/i)) {
        errors.push(`${filePath}: Contains Vue attributes (v-*)`);
    }
    if (content.match(/\s+ng-\w+/i)) {
        errors.push(`${filePath}: Contains Angular attributes (ng-*)`);
    }
    if (content.match(/data-react-/i)) {
        errors.push(`${filePath}: Contains React attributes`);
    }
    
    // Should use semantic HTML5 elements
    const semanticElements = ['header', 'nav', 'main', 'section', 'article', 'aside', 'footer'];
    const hasSemanticElements = semanticElements.some(element => 
        content.includes(`<${element}`) || content.includes(`</${element}>`)
    );
    
    if (!hasSemanticElements) {
        warnings.push(`${filePath}: No semantic HTML5 elements found`);
    }
}

/**
 * Validate CSS file
 */
function validateCSSFile(content, filePath) {
    // Should not import external frameworks
    if (content.match(/@import.*bootstrap/i)) {
        errors.push(`${filePath}: Imports Bootstrap CSS`);
    }
    if (content.match(/@import.*foundation/i)) {
        errors.push(`${filePath}: Imports Foundation CSS`);
    }
    
    // Should use modern CSS features
    const modernFeatures = [
        /--[\w-]+\s*:/,  // CSS custom properties
        /display\s*:\s*grid/i,
        /display\s*:\s*flex/i
    ];
    
    const hasModernFeatures = modernFeatures.some(pattern => pattern.test(content));
    if (!hasModernFeatures) {
        warnings.push(`${filePath}: No modern CSS features detected (custom properties, grid, flexbox)`);
    }
}

/**
 * Validate JavaScript file
 */
function validateJavaScriptFile(content, filePath) {
    // Should use ES6+ features
    const es6Features = [
        /class\s+\w+/,           // ES6 classes
        /const\s+\w+/,           // const declarations
        /let\s+\w+/,             // let declarations
        /=>\s*{?/,               // arrow functions
        /import\s+.*from/,       // ES6 imports
        /export\s+(class|function|const|let|default)/  // ES6 exports
    ];
    
    const hasES6Features = es6Features.some(pattern => pattern.test(content));
    if (!hasES6Features) {
        warnings.push(`${filePath}: No ES6+ features detected`);
    }
    
    // Should not use CommonJS
    if (content.match(/require\s*\(/)) {
        errors.push(`${filePath}: Uses CommonJS require() instead of ES6 imports`);
    }
    if (content.match(/module\.exports/)) {
        errors.push(`${filePath}: Uses CommonJS module.exports instead of ES6 exports`);
    }
}

/**
 * Main validation function
 */
function validateVanillaStack() {
    console.log('🔍 Validating Vanilla Technology Stack...\n');
    
    const sourceFiles = getAllSourceFiles(srcDir);
    
    if (sourceFiles.length === 0) {
        errors.push('No source files found in src directory');
        return false;
    }
    
    console.log(`Found ${sourceFiles.length} source files to validate:\n`);
    
    // Validate each file
    for (const filePath of sourceFiles) {
        try {
            const content = readFileSync(filePath, 'utf-8');
            const ext = extname(filePath).toLowerCase();
            
            console.log(`  📄 ${filePath}`);
            
            // Check for forbidden framework imports
            for (const { pattern, name } of forbiddenPatterns) {
                if (pattern.test(content)) {
                    errors.push(`${filePath}: Contains ${name}`);
                }
            }
            
            // File-type specific validation
            if (ext === '.html') {
                validateHTMLFile(content, filePath);
            } else if (ext === '.css') {
                validateCSSFile(content, filePath);
            } else if (ext === '.js' || ext === '.mjs') {
                validateJavaScriptFile(content, filePath);
            }
            
        } catch (error) {
            errors.push(`${filePath}: Cannot read file - ${error.message}`);
        }
    }
    
    // Check package.json for runtime dependencies
    try {
        const packageJson = JSON.parse(readFileSync('./package.json', 'utf-8'));
        
        if (packageJson.dependencies && Object.keys(packageJson.dependencies).length > 0) {
            errors.push('package.json contains runtime dependencies (should only have devDependencies)');
        }
        
        console.log('  📦 package.json - No runtime dependencies ✅');
        
    } catch (error) {
        warnings.push('No package.json found (acceptable for vanilla project)');
    }
    
    return true;
}

/**
 * Print results
 */
function printResults() {
    console.log('\n' + '='.repeat(60));
    console.log('📊 VALIDATION RESULTS');
    console.log('='.repeat(60));
    
    if (errors.length === 0) {
        console.log('✅ PASSED: Vanilla Technology Stack Compliance');
        console.log('\n🎉 All files use only HTML5, CSS3, and JavaScript ES6+ without external frameworks!');
    } else {
        console.log('❌ FAILED: Vanilla Technology Stack Compliance');
        console.log('\n🚨 Errors found:');
        errors.forEach(error => console.log(`   • ${error}`));
    }
    
    if (warnings.length > 0) {
        console.log('\n⚠️  Warnings:');
        warnings.forEach(warning => console.log(`   • ${warning}`));
    }
    
    console.log('\n' + '='.repeat(60));
    console.log(`📈 Summary: ${errors.length} errors, ${warnings.length} warnings`);
    
    return errors.length === 0;
}

// Run validation
const success = validateVanillaStack();
const passed = printResults();

// Exit with appropriate code
process.exit(passed ? 0 : 1);