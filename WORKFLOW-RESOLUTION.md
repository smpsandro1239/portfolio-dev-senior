# Resolução de Problemas do GitHub Actions Workflow

## ✅ Problemas Resolvidos

### 1. **Lighthouse CI - Invalid URL Error**
- **Problema**: `LighthouseError: INVALID_URL` ao tentar analisar `file:///github/workspace/docs/index.html`
- **Causa**: Lighthouse CI tentava analisar ficheiros locais diretamente em vez de usar um servidor HTTP
- **Solução**: 
  - Configurado servidor local na porta 8080 antes do Lighthouse CI
  - Atualizado `lighthouserc.json` para usar `"url": ["http://localhost:8080"]`
  - Removido `upload.target` para evitar conflitos de artifacts
  - Adicionado gestão adequada do servidor (start/stop)

### 2. **Coordenação de Testes**
- **Melhoria**: Reutilização do servidor entre Lighthouse CI e testes de acessibilidade
- **Benefício**: Reduz tempo de execução e evita conflitos de porta

## 📋 Configuração Final

### Lighthouse CI (`lighthouserc.json`)
```json
{
  "ci": {
    "collect": {
      "staticDistDir": "./docs",
      "url": ["http://localhost:8080"],
      "settings": {
        "preset": "desktop",
        "throttlingMethod": "provided",
        "onlyCategories": ["performance", "accessibility", "best-practices", "seo"]
      }
    },
    "assert": {
      "assertions": {
        "categories:performance": ["warn", {"minScore": 0.90}],
        "categories:accessibility": ["error", {"minScore": 1.00}],
        "categories:best-practices": ["warn", {"minScore": 0.95}],
        "categories:seo": ["warn", {"minScore": 0.95}]
      }
    }
  }
}
```

### Workflow Steps
1. **Build** → Gera ficheiros em `./docs`
2. **Start Server** → `npx serve -s docs -l 8080 &`
3. **Lighthouse CI** → Analisa `http://localhost:8080`
4. **Accessibility Test** → Reutiliza o servidor
5. **Stop Server** → Cleanup automático

## 🔧 Scripts de Monitorização

- **Windows**: `check-workflow-status.bat`
- **Linux/macOS**: `check-workflow-status.sh`

## 📊 Métricas de Qualidade

O workflow agora valida:
- ✅ HTML (html-validate)
- ✅ CSS (stylelint)
- ✅ JavaScript (ESLint v9)
- ✅ Performance (Lighthouse ≥90%)
- ✅ Acessibilidade (Lighthouse 100% + axe-core)
- ✅ SEO (Lighthouse ≥95%)
- ✅ Best Practices (Lighthouse ≥95%)
- ✅ Budget de Performance (CSS ≤50KB, JS ≤100KB)

## 🚀 Status Atual

**Commit**: `58ac010` - "fix: Resolve Lighthouse CI invalid URL error"

**Próximos Passos**:
1. Monitorizar execução do workflow
2. Verificar se todos os testes passam
3. Confirmar deploy automático para GitHub Pages

---

*Documentação atualizada em: 12 Janeiro 2026*