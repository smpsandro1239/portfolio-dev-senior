import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, test } from '@jest/globals';

const pagePath = join(process.cwd(), 'src', 'projetos.html');
const page = readFileSync(pagePath, 'utf8');
const buildScript = readFileSync(join(process.cwd(), 'scripts', 'build.js'), 'utf8');
const sitemap = readFileSync(join(process.cwd(), 'src', 'sitemap.xml'), 'utf8');
const serviceWorker = readFileSync(join(process.cwd(), 'src', 'sw.js'), 'utf8');
const mainScript = readFileSync(join(process.cwd(), 'src', 'js', 'main.js'), 'utf8');
const mainStyles = readFileSync(join(process.cwd(), 'src', 'css', 'main.css'), 'utf8');
const navigationScript = readFileSync(join(process.cwd(), 'src', 'js', 'navigation.js'), 'utf8');

describe('Technical project case studies', () => {
  test('provides semantic page structure and a single primary heading', () => {
    expect(page).toMatch(/<!doctype html>/i);
    expect(page).toMatch(/<html lang="pt-PT">/);
    expect(page).toMatch(/<main id="conteudo">/);
    expect((page.match(/<h1\b/g) || []).length).toBe(1);
  });

  test('documents all six case studies, including five public repositories', () => {
    const expectedIds = [
      'smart-shelf-ai',
      'ai-crypto',
      'iot',
      'time-administrator',
      'multifreq',
      'faturacao'
    ];

    for (const id of expectedIds) {
      expect(page).toContain(`id="${id}"`);
    }
  });

  test('labels SMART SHELF AI as in development and does not imply public source code', () => {
    expect(page).toContain('id="smart-shelf-ai"');
    expect(page).toContain('Em desenvolvimento · sem código público');
    expect(page).toContain('não são apresentadas como funcionalidades concluídas');
    expect(page).not.toContain('https://github.com/smpsandro1239/SMART-SHELF-AI');
  });

  test('links each public repository case study to the matching repository', () => {
    const expectedRepositories = [
      'AiCryptoMultiAgente',
      'IOT',
      'TimeAdministrator',
      'MultiFreq_',
      'Sistema-de-Faturacao-AT'
    ];

    for (const repository of expectedRepositories) {
      expect(page).toContain(`https://github.com/smpsandro1239/${repository}`);
    }
  });

  test('does not claim that the invoicing project is AT-certified', () => {
    expect(page).toContain('não apresenta a aplicação como software certificado pela AT');
    expect(page).toContain('não foram verificadas de forma independente');
  });

  test('qualifies hardware, trading and external integration claims', () => {
    expect(page).toContain('não constitui prova de rentabilidade');
    expect(page).toContain('devem ser confirmados em ensaios físicos');
    expect(page).toContain('não se presume que todos os fornecedores externos estejam ativos');
  });

  test('includes the documented IoT dashboard screenshot with accessible text', () => {
    expect(page).toContain('interface-principal.png');
    expect(page).toContain('alt="Captura do painel principal da aplicação de controlo de acessos IoT"');
    expect(page).toContain('loading="lazy"');
  });

  test('uses safe attributes for external links', () => {
    const externalLinks = page.match(/<a\b[^>]*target="_blank"[^>]*>/g) || [];

    expect(externalLinks.length).toBeGreaterThanOrEqual(6);
    for (const link of externalLinks) {
      expect(link).toContain('rel="noopener noreferrer"');
    }
  });

  test('publishes the case studies, SEO files and stylesheets in the production build', () => {
    expect(buildScript).toContain("join(source, 'projetos.html')");
    expect(buildScript).toContain("'case-studies.css'");
    expect(buildScript).toContain("'csso'");
    expect(buildScript).toContain("'robots.txt'");
    expect(buildScript).toContain("'sitemap.xml'");
    expect(sitemap).toContain('/projetos.html');
  });

  test('precaches the case study page and stylesheet without invalid async syntax', () => {
    expect(serviceWorker).toContain("'projetos.html'");
    expect(serviceWorker).toContain("'css/case-studies.css'");
    expect(serviceWorker).toContain(".then(async response =>");
  });

  test('respects reduced-motion preferences in JavaScript navigation', () => {
    expect(navigationScript).toContain("matchMedia('(prefers-reduced-motion: reduce)')");
    expect(navigationScript).toContain('getScrollBehavior()');
    expect(navigationScript).toContain('getScrollDuration()');
    expect((navigationScript.match(/behavior: this.getScrollBehavior\(\)/g) || []).length).toBe(3);
  });

  test('does not retain handlers for removed placeholder UI', () => {
    expect(mainScript).not.toContain('setupContactForm');
    expect(mainScript).not.toContain('setupCVDownload');
    expect(mainScript).not.toContain('setupProjectFilters');
    expect(mainStyles).not.toContain('.contact-form');
    expect(mainStyles).not.toContain('.filter-btn');
  });

  test('contains valid JSON-LD structured data', () => {
    const match = page.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
    expect(match).not.toBeNull();
    const structuredData = JSON.parse(match[1]);
    expect(structuredData['@type']).toBe('CollectionPage');
    expect(structuredData.hasPart.some(item => item.name === 'SMART SHELF AI')).toBe(true);
  });

  test('exposes descriptive search and social metadata', () => {
    expect(page).toContain('property="og:title"');
    expect(page).toContain('name="twitter:card"');
    expect(page).toContain('"@type": "CollectionPage"');
  });

  test('loads the shared and case-study stylesheets', () => {
    expect(page).toContain('href="css/main.css"');
    expect(page).toContain('href="css/case-studies.css"');
  });
});
