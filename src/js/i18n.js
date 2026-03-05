/* Autor: Sandro Pereira (smpsandro1239) */
/* Projeto: portfolio-dev-senior – Portfólio vanilla sênior elite 2026 */

export class I18nManager {
    constructor() {
        this.locales = {
            'pt': {
                'nav-home': 'Início',
                'nav-projects': 'Projetos',
                'nav-quality': 'Qualidade',
                'nav-stats': 'Estatísticas',
                'nav-contact': 'Contacto',
                'hero-title': 'Construir soluções que entregam valor real',
                'hero-subtitle': 'Software Architect & IT Trainer',
                'projects-title': 'Projetos Selecionados',
                'quality-title': 'Qualidade Técnica',
                'stats-title': 'Estatísticas de Desenvolvimento',
                'contact-title': 'Entre em contacto',
                'footer-copyright': 'Sandro Pereira. Todos os direitos reservados.'
            },
            'en': {
                'nav-home': 'Home',
                'nav-projects': 'Projects',
                'nav-quality': 'Quality',
                'nav-stats': 'Stats',
                'nav-contact': 'Contact',
                'hero-title': 'Building solutions that deliver real value',
                'hero-subtitle': 'Software Architect & IT Trainer',
                'projects-title': 'Selected Projects',
                'quality-title': 'Technical Quality',
                'stats-title': 'Development Statistics',
                'contact-title': 'Get in touch',
                'footer-copyright': 'Sandro Pereira. All rights reserved.'
            }
        };
        this.currentLang = localStorage.getItem('sandro-lang') ||
                           (navigator.language.startsWith('pt') ? 'pt' : 'en');
    }

    init() {
        this.applyTranslations();
        // this.setupSwitcher();
        this.setupSwitcherStatic();
    }

    applyTranslations() {
        const langData = this.locales[this.currentLang];
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (langData[key]) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = langData[key];
                } else {
                    el.textContent = langData[key];
                }
            }
        });
        document.documentElement.lang = this.currentLang;

        // Update switcher active state
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === this.currentLang);
            btn.setAttribute('aria-pressed', btn.dataset.lang === this.currentLang);
        });
    }

    switchLanguage(lang) {
        if (this.locales[lang]) {
            this.currentLang = lang;
            localStorage.setItem('sandro-lang', lang);
            this.applyTranslations();
            document.dispatchEvent(new CustomEvent('langChanged', { detail: { lang } }));
        }
    }

    setupSwitcher() {
        const switcherContainer = document.querySelector('.header__actions') || document.querySelector('.header__nav');
        if (!switcherContainer) return;

        const switcherHTML = `
            <div class="lang-switcher" aria-label="Alterar idioma / Change language">
                <button class="lang-btn" data-lang="pt" aria-label="Português">PT</button>
                <button class="lang-btn" data-lang="en" aria-label="English">EN</button>
            </div>
        `;

        switcherContainer.insertAdjacentHTML('beforeend', switcherHTML);

        switcherContainer.addEventListener('click', (e) => {
            const btn = e.target.closest('.lang-btn');
            if (btn) {
                this.switchLanguage(btn.dataset.lang);
            }
        });

        this.applyTranslations();
    }
}
