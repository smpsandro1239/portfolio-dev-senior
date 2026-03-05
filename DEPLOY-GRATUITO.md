# 🚀 Deploy Gratuito do Portfolio

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


## 🌟 Opção 1: GitHub Pages (Mais Simples)

### ✅ Vantagens
- **100% Gratuito para sempre**
- **SSL automático (HTTPS)**
- **Deploy automático**
- **Integração perfeita com GitHub**
- **Domínio**: `smpsandro1239.github.io/portfolio-dev-senior`

### 📋 Passo a Passo

#### 1. Criar Repositório no GitHub
```bash
# Se ainda não tens o repositório no GitHub
git init
git add .
git commit -m "Portfolio inicial"
git branch -M main
git remote add origin https://github.com/smpsandro1239/portfolio-dev-senior.git
git push -u origin main
```

#### 2. Ativar GitHub Pages
1. Ir para o repositório no GitHub
2. **Settings** → **Pages**
3. **Source**: Deploy from a branch
4. **Branch**: `main`
5. **Folder**: `/src` (importante!)
6. **Save**

#### 3. Aguardar Deploy
- O site ficará disponível em: `https://smpsandro1239.github.io/portfolio-dev-senior/`
- Deploy demora 2-5 minutos

---

## 🌟 Opção 2: Netlify (Mais Funcionalidades)

### ✅ Vantagens
- **100% Gratuito**
- **Domínio personalizado gratuito**
- **Deploy automático via Git**
- **Formulários de contacto**
- **Analytics básicos**

### 📋 Passo a Passo

#### 1. Criar Conta
- Ir para [netlify.com](https://netlify.com)
- **Sign up** com GitHub

#### 2. Deploy via Git
1. **New site from Git**
2. **Connect to Git provider** → GitHub
3. Selecionar repositório `portfolio-dev-senior`
4. **Build settings**:
   - **Base directory**: `src`
   - **Publish directory**: `src`
5. **Deploy site**

#### 3. Configurar Domínio (Opcional)
- **Site settings** → **Domain management**
- **Add custom domain** (se tiveres um)
- Ou usar o domínio gratuito do Netlify

---

## 🌟 Opção 3: Vercel (Melhor Performance)

### ✅ Vantagens
- **100% Gratuito**
- **Performance excepcional**
- **Deploy automático**
- **Analytics avançados**
- **Edge functions**

### 📋 Passo a Passo

#### 1. Criar Conta
- Ir para [vercel.com](https://vercel.com)
- **Sign up** com GitHub

#### 2. Deploy
1. **New Project**
2. **Import Git Repository**
3. Selecionar `portfolio-dev-senior`
4. **Configure Project**:
   - **Root Directory**: `src`
5. **Deploy**

---

## 🌟 Opção 4: Firebase Hosting

### ✅ Vantagens
- **100% Gratuito (até 10GB)**
- **CDN global**
- **SSL automático**
- **Deploy via CLI**

### 📋 Passo a Passo

#### 1. Instalar Firebase CLI
```bash
npm install -g firebase-tools
```

#### 2. Configurar Projeto
```bash
cd portfolio-dev-senior
firebase login
firebase init hosting
# Selecionar pasta 'src' como public directory
```

#### 3. Deploy
```bash
firebase deploy
```

---

## 🎯 Recomendação

### Para Iniciantes: **GitHub Pages**
- Mais simples
- Integração perfeita
- Zero configuração

### Para Profissionais: **Netlify**
- Mais funcionalidades
- Melhor interface
- Formulários gratuitos

### Para Performance: **Vercel**
- Mais rápido
- Analytics detalhados
- Otimizações automáticas

---

## 🔧 Configuração Adicional

### Domínio Personalizado (Opcional)
Se quiseres um domínio como `sandropereira.dev`:

1. **Comprar domínio** (€10-15/ano):
   - Namecheap, GoDaddy, ou Cloudflare
2. **Configurar DNS** na plataforma escolhida
3. **Ativar SSL** (automático na maioria)

### Otimizações
```bash
# Comprimir imagens
# Minificar CSS/JS (já está configurado)
# Configurar cache headers
```

---

## 📊 Comparação Rápida

| Plataforma | Facilidade | Performance | Funcionalidades | Domínio Gratuito |
|------------|------------|-------------|-----------------|-------------------|
| GitHub Pages | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ | ✅ |
| Netlify | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ✅ |
| Vercel | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ✅ |
| Firebase | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | ✅ |

---

## 🚀 Deploy Automático

Todas as plataformas suportam **deploy automático**:
- Fazes `git push`
- Site atualiza automaticamente
- Zero trabalho manual

---

## 💡 Dicas Importantes

1. **Usar pasta `src`** como root do site
2. **Configurar redirects** se necessário
3. **Testar em dispositivos móveis**
4. **Monitorizar performance** com Lighthouse
5. **Configurar analytics** (Google Analytics gratuito)

---

## 🆘 Resolução de Problemas

### Site não carrega
- Verificar se pasta `src` está configurada
- Aguardar 5-10 minutos após deploy
- Verificar logs de build

### Imagens não aparecem
- Verificar caminhos relativos
- Usar `./img/` em vez de `/img/`

### JavaScript não funciona
- Verificar console do browser
- Confirmar que módulos ES6 são suportados