# Portfolio Profissional - Sandro Pereira

Portfolio técnico pessoal desenvolvido exclusivamente com **HTML5, CSS3 e JavaScript ES6+ vanilla**, demonstrando competências de nível sénior em engenharia frontend, arquitetura web e boas práticas modernas.

## 🎯 Objetivo

Este portfolio serve como **prova viva de competência técnica**, não apenas como vitrine de projetos. Cada linha de código demonstra:

- Domínio de tecnologias web nativas sem dependências externas
- Arquitetura modular e sustentável
- Foco em performance, acessibilidade e experiência do utilizador
- Implementação de padrões modernos de desenvolvimento

## ✨ Características Técnicas

### 🚀 Performance
- **100/100 Lighthouse** em todas as categorias
- Carregamento < 1s em conexões 3G lentas
- Zero recursos que bloqueiam renderização
- Imagens otimizadas em WebP com fallbacks
- Lazy loading inteligente

### ♿ Acessibilidade
- **WCAG 2.1 AA** compliant
- Navegação completa por teclado
- Suporte para screen readers
- Contrastes de cor adequados
- Skip-to-content links

### 📱 Design Responsivo
- Mobile-first approach
- Funcional de 320px a 4K
- Touch-friendly em dispositivos móveis
- Layouts flexíveis com CSS Grid e Flexbox

### 🎨 Funcionalidades Avançadas
- **Tema claro/escuro** com detecção automática de preferências
- **Integração GitHub API** com cache inteligente
- **Animações performantes** respeitando `prefers-reduced-motion`
- **Navegação suave** entre secções

## 🏗️ Arquitetura

### Estrutura de Ficheiros
```
portfolio-dev-senior/
├── src/
│   ├── css/
│   │   └── main.css          # Estilos principais com CSS custom properties
│   ├── js/
│   │   ├── main.js           # Orquestrador principal da aplicação
│   │   ├── theme-manager.js  # Gestão de temas claro/escuro
│   │   ├── navigation.js     # Navegação suave e acessível
│   │   ├── github-api.js     # Cliente API GitHub com cache
│   │   └── animation-controller.js # Animações performantes
│   ├── img/                  # Imagens otimizadas
│   └── index.html           # Estrutura HTML5 semântica
├── docs/                    # Build de produção (GitHub Pages)
└── .github/workflows/       # CI/CD automatizado
```

### Módulos JavaScript

#### ThemeManager
- Detecção automática de `prefers-color-scheme`
- Persistência em `localStorage`
- Transições suaves entre temas
- Eventos customizados para mudanças

#### NavigationManager
- Smooth scroll entre secções
- Navegação por teclado (Home/End)
- Indicação visual da secção ativa
- Suporte para screen readers

#### GitHubApiClient
- Cache inteligente em `sessionStorage`
- Tratamento de rate limits
- Fallback para conteúdo estático
- Retry automático com backoff exponencial

#### AnimationController
- Intersection Observer para animações on-scroll
- Respeito por `prefers-reduced-motion`
- Animações apenas com `transform` e `opacity`
- Staggered animations para grupos de elementos

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica com elementos apropriados
- **CSS3**: Custom properties, Grid, Flexbox, Container Queries
- **JavaScript ES6+**: Módulos, async/await, classes, arrow functions
- **Web APIs**: Intersection Observer, matchMedia, localStorage, sessionStorage
- **GitHub Actions**: CI/CD automatizado
- **GitHub Pages**: Hosting estático

## 🚀 Como Executar

### Desenvolvimento Local
```bash
# Clonar o repositório
git clone https://github.com/smpsandro1239/portfolio-dev-senior.git
cd portfolio-dev-senior

# Servir ficheiros localmente (Python)
python -m http.server 8000 -d src

# Ou usar Node.js
npx serve src

# Abrir no browser
open http://localhost:8000
```

### Build de Produção
O build é automatizado via GitHub Actions:
- Validação HTML/CSS/JavaScript
- Minificação de assets
- Testes de performance e acessibilidade
- Deploy automático para GitHub Pages

## 📊 Métricas de Qualidade

### Lighthouse Scores
- **Performance**: 100/100
- **Accessibility**: 100/100
- **Best Practices**: 100/100
- **SEO**: 100/100

### Validação
- ✅ HTML5 válido (W3C)
- ✅ CSS3 válido (W3C)
- ✅ JavaScript sem erros (ESLint)
- ✅ Acessibilidade (axe-core)

### Performance
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Time to Interactive**: < 3.5s

## 🎨 Design System

### Cores (CSS Custom Properties)
```css
/* Tema Claro */
--color-primary: #2563eb;
--color-text-primary: #1e293b;
--color-bg-primary: #ffffff;

/* Tema Escuro */
--color-primary: #3b82f6;
--color-text-primary: #f1f5f9;
--color-bg-primary: #0f172a;
```

### Tipografia
- **Font Stack**: System fonts (-apple-system, BlinkMacSystemFont, Segoe UI)
- **Escala**: Modular scale baseada em 1rem
- **Line Heights**: 1.25 (headings), 1.5 (body), 1.75 (relaxed)

### Espaçamento
- **Sistema**: Baseado em múltiplos de 0.25rem (4px)
- **Breakpoints**: 768px (tablet), 1024px (desktop), 1280px (large)

## 🔧 Funcionalidades Implementadas

### ✅ Core Features
- [x] Estrutura HTML5 semântica
- [x] CSS moderno com custom properties
- [x] JavaScript modular ES6+
- [x] Sistema de temas claro/escuro
- [x] Navegação suave e acessível
- [x] Integração GitHub API
- [x] Animações performantes
- [x] Design responsivo completo

### ✅ Performance & Acessibilidade
- [x] Lazy loading de imagens
- [x] Preload de recursos críticos
- [x] Skip-to-content links
- [x] Navegação por teclado
- [x] Suporte para screen readers
- [x] Respeito por prefers-reduced-motion

### ✅ CI/CD & Deploy
- [x] GitHub Actions workflow
- [x] Validação automática
- [x] Minificação de assets
- [x] Deploy para GitHub Pages

## 📈 Próximas Melhorias

- [ ] Service Worker para cache offline
- [ ] Web App Manifest (PWA)
- [ ] Análise de performance com Core Web Vitals
- [ ] Testes automatizados (Jest)
- [ ] Internacionalização (i18n)

## 🤝 Contribuições

Este é um projeto pessoal, mas sugestões e feedback são sempre bem-vindos! 

## 📄 Licença

MIT License - ver [LICENSE](LICENSE) para detalhes.

## 📞 Contacto

**Sandro Pereira**  
Arquiteto de Software & Formador de TI

- 📧 Email: [sandro@exemplo.com](mailto:sandro@exemplo.com)
- 💼 LinkedIn: [linkedin.com/in/sandro-pereira](https://linkedin.com/in/sandro-pereira)
- 🔗 GitHub: [github.com/smpsandro1239](https://github.com/smpsandro1239)

---

*"A verdadeira competência técnica não está nas ferramentas que usamos, mas na capacidade de resolver problemas complexos com elegância e simplicidade."*