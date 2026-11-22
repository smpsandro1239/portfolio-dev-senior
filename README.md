# Portefólio — Sandro Pereira

Portefólio pessoal para apresentar projetos, tecnologias e percurso de aprendizagem em desenvolvimento de software.

🌐 **Site:** https://smpsandro1239.github.io/portfolio-dev-senior/  
🧭 **Estudos de caso:** https://smpsandro1239.github.io/portfolio-dev-senior/projetos.html  
💻 **GitHub:** https://github.com/smpsandro1239  
💼 **LinkedIn:** https://linkedin.com/in/sandro-pereira-a5ab0236

## Áreas de trabalho

- Desenvolvimento web: HTML, CSS, JavaScript, TypeScript, Angular e React.
- Backend e APIs: Python, PHP, Node.js e REST.
- Bases de dados: PostgreSQL, MySQL, MongoDB e SQLite.
- Inteligência artificial: integração de modelos, agentes e experiências com visão computacional.
- Sistemas integrados: ESP32, C++ e LoRa.
- Ferramentas e entrega: Git, Docker, Linux e GitHub Actions.

## Projetos em destaque

Os cartões do site consultam os repositórios públicos através da API do GitHub. A seleção é limitada a projetos reais encontrados na conta; não são criados cartões fictícios quando um repositório não está disponível.

| Projeto | Descrição |
|---|---|
| SMART SHELF AI (em desenvolvimento) | Projeto de IA e visão computacional; código ainda não público neste portefólio. |
| [AiCryptoMultiAgente](https://github.com/smpsandro1239/AiCryptoMultiAgente) | Framework modular para análise de mercado e trading algorítmico multiagente. |
| [IOT](https://github.com/smpsandro1239/IOT) | Solução de controlo de acessos e barreiras com integração de hardware. |
| [TimeAdministrator](https://github.com/smpsandro1239/TimeAdministrator) | Aplicação web para gestão e administração de tempo. |
| [MultiFreq_](https://github.com/smpsandro1239/MultiFreq_) | Ferramentas para gerir instâncias Freqtrade e fluxos de trading. |
| [Sistema-de-Faturacao-AT](https://github.com/smpsandro1239/Sistema-de-Faturacao-AT) | Aplicação de faturação e gestão comercial; quaisquer alegações de certificação ou conformidade legal devem ser confirmadas separadamente. |
| [Curso_JavaScript_2025_2](https://github.com/smpsandro1239/Curso_JavaScript_2025_2) | Projeto de aprendizagem e experimentação com JavaScript e integração de IA. |

## Formação

TeSP em **Desenvolvimento Web e Multimédia** — percurso de ensino superior técnico-profissional com 90 ECTS.

## Estudos de caso técnicos

A página [Projetos e Estudos de Caso](https://smpsandro1239.github.io/portfolio-dev-senior/projetos.html) aprofunda cinco repositórios, apresenta fluxos arquiteturais conceptuais e distingue funcionalidades documentadas de capacidades ainda não validadas. Não apresenta como certificadas funcionalidades fiscais nem como comprovados resultados de hardware, trading ou integrações externas.

## Tecnologias do portefólio

- HTML5 semântico, CSS moderno e JavaScript ES modules.
- Tema claro/escuro e preferência de movimento reduzido.
- Integração com a API pública do GitHub, cache de sessão e fallback para cache desatualizada.
- Manifesto e Service Worker para capacidades PWA.
- Pipeline GitHub Actions para validação, build, verificações de acessibilidade/performance e publicação no GitHub Pages.

## Executar localmente

Requisitos: Node.js 20 ou superior e npm.

```bash
git clone https://github.com/smpsandro1239/portfolio-dev-senior.git
cd portfolio-dev-senior
npm ci
npm run serve
```

Abrir http://localhost:3000.

### Comandos disponíveis

```bash
npm run lint:html
npm run lint:css
npm run lint:js
npm test
npm run build
npm run validate
```

## CI/CD e qualidade

O workflow em `.github/workflows/deploy.yml` está configurado para:

1. Instalar dependências com `npm ci`.
2. Validar HTML, CSS e JavaScript.
3. Minificar os assets para produção.
4. Publicar também o manifesto e o Service Worker da PWA.
5. Executar Lighthouse CI, axe-core e verificações de tamanho.
6. Publicar no GitHub Pages quando a execução ocorre na branch `main`.

A existência destas verificações no workflow não significa, por si só, que a última execução passou. Consultar sempre o separador **Actions** para o resultado mais recente. As pontuações Lighthouse e a conformidade WCAG só devem ser divulgadas quando acompanhadas por relatórios atuais e verificáveis.

## Nota sobre o conteúdo

Este portefólio distingue projetos pessoais, académicos e experimentais. As descrições resumem o âmbito conhecido de cada repositório; o código, os README individuais e o histórico de commits são a fonte de verdade sobre o estado de implementação. Não são atribuídos níveis percentuais arbitrários às competências nem cargos, certificações ou resultados de testes que não estejam comprovados.

---

© Sandro Pereira · Código do portefólio disponibilizado sob licença MIT.
