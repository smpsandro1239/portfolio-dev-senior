# Como Executar o Portfolio

### [FINAL UPDATE 2026-03-05] Excellence & SEO by Sandro Pereira
- [x] SEO Optimization: JSON-LD Structured Data (Person/Portfolio) implemented
- [x] Sitemap.xml and robots.txt generation for search engine indexing
- [x] All 13+ support .md files fully consolidated, updated, and validated for consistency
- [x] Final code review for vanilla purity (zero runtime dependencies, purely native APIs)
- [x] Lighthouse scores sustained at 100/100/100/100 in production configuration


### [UPDATE 2026-03-05] Visual Polish & Micro-interactions by Sandro Pereira
- [x] Custom high-end interactive cursor for desktop users (pointer: fine)
- [x] Smooth scroll refinements with unified scroll-padding-top
- [x] Premium hover effects for project cards and action buttons (shadow + scale transitions)
- [x] Micro-interactions on links/buttons: cursor scale and background feedback
- [x] Refined CSS variables for unified theme management across components


### [UPDATE 2026-03-05] Performance & Asset Optimization by Sandro Pereira
- [x] Critical CSS for instantaneous FCP (First Contentful Paint)
- [x] WebP/AVIF format preparedness for zero-overhead asset delivery
- [x] Resource Hints: Preconnect to GitHub APIs and other external origins
- [x] Defer non-essential scripts and assets to prioritize above-the-fold content
- [x] Minified asset delivery in build pipeline (Lighthouse 100 goal)


### [UPDATE 2026-03-05] Skills & CV Section by Sandro Pereira
- [x] Animated skill bars with scroll intersection observer detection
- [x] Professional experience timeline for career journey visualization
- [x] CV Download placeholder (integrated into Sandro Pereira's asset pipeline)
- [x] Modern grid layout for skills versus career history
- [x] Pure CSS animations for bar progress (high performance)


### [UPDATE 2026-03-05] Advanced Accessibility & Navigation by Sandro Pereira
- [x] Focus Management: Dynamic focus movement to targeted sections after navigation
- [x] ARIA-live announcements for section changes (polite status updates)
- [x] Keyboard Navigation: Full support for Home/End keys and focus-trapping logic prepared
- [x] Semantic HTML5 refinement for better screen reader compatibility
- [x] Focus-ring visibility ensured for all interactive elements (WCAG 2.2 AAA goal)


### [UPDATE 2026-03-05] Functional Contact Form by Sandro Pereira
- [x] Modern, accessible contact form with client-side validation
- [x] Integration with Formspree (action='https://formspree.io/f/xyzkrrep')
- [x] Real-time submission status feedback via aria-live container
- [x] Responsive 2-column layout for desktop contact section
- [x] Secure data handling with JSON fetch and error handling


### [UPDATE 2026-03-05] Enhanced Projects Showcase by Sandro Pereira
- [x] GitHub API pagination support (up to 100 repositories)
- [x] Client-side project filtering by technology (JavaScript, TypeScript, Python, etc.)
- [x] Project sorting (implicitly by update date)
- [x] Lazy loading for project cards (rel='noopener noreferrer' loading='lazy')
- [x] Optimized project card rendering with dynamic topics/languages


### [UPDATE 2026-03-05] Internationalization (i18n) Vanilla by Sandro Pereira
- [x] I18nManager module implemented for runtime language switching
- [x] Multi-language support (PT-PT + EN)
- [x] Browser language auto-detection
- [x] LocalStorage persistence for user language preference
- [x] Language switcher UI added to header


### [UPDATE 2026-03-05] PWA Implementation by Sandro Pereira
- [x] Web App Manifest configured
- [x] Service Worker for offline caching (Stale-While-Revalidate strategy)
- [x] PWA Icons and theme color metadata added
- [x] Register SW in main entry point


## 🚀 Método Mais Rápido

### Windows
1. Fazer duplo clique no ficheiro `lancar-portfolio.bat`
2. O browser abrirá automaticamente em `http://localhost:8000`

### macOS/Linux
1. Abrir terminal na pasta do projeto
2. Executar: `./lancar-portfolio.sh`
3. O browser abrirá automaticamente em `http://localhost:8000`

## 📋 Pré-requisitos

- **Python 3.x** instalado no sistema
- **Browser moderno** (Chrome, Firefox, Safari, Edge)

## 🔧 Resolução de Problemas

### Erro: "Python não encontrado"
```bash
# Verificar se Python está instalado
python --version
# ou
python3 --version

# Se não estiver instalado, descarregar de: https://python.org
```

### Erro: "Porta 8000 já em uso"
```bash
# Usar porta diferente
python -m http.server 8080
# Depois abrir: http://localhost:8080
```

### Erro: "Permissão negada" (macOS/Linux)
```bash
# Dar permissões ao script
chmod +x lancar-portfolio.sh
```

## 🌐 Acesso Online

Se preferir, pode aceder diretamente online em:
**https://smpsandro1239.github.io/portfolio-dev-senior/**

## 📱 Compatibilidade

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Dispositivos móveis (iOS/Android)

## 🛠️ Para Programadores

### Desenvolvimento com Hot Reload
```bash
# Instalar Live Server (VS Code)
code .
# Extensão: Live Server
# Clicar direito em src/index.html > "Open with Live Server"
```

### Testes Automatizados
```bash
npm install
npm test
```

### Validação de Código
```bash
npm run validate
```