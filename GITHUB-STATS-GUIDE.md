# 📊 Guia dos Gráficos GitHub - Portfolio

## 🔧 **Problema Resolvido**
O gráfico GitHub Profile Summary Cards não estava a aparecer devido ao uso de URLs instáveis. Atualizei todos os serviços para versões mais fiáveis.

## ✅ **Gráficos Atualizados**

### **1. Estatísticas Básicas GitHub**
```
https://github-readme-stats.vercel.app/api?username=smpsandro1239&show_icons=true&theme=radical&hide_border=true&count_private=true&title_color=667eea&icon_color=667eea&text_color=ffffff&bg_color=0a0a0a&include_all_commits=true
```
- **Mostra**: Commits, PRs, Issues, Stars recebidas
- **Serviço**: GitHub Readme Stats (oficial)

### **2. Linguagens Mais Usadas**
```
https://github-readme-stats.vercel.app/api/top-langs/?username=smpsandro1239&layout=compact&theme=radical&hide_border=true&title_color=667eea&text_color=ffffff&bg_color=0a0a0a
```
- **Mostra**: Percentagem de linguagens nos repositórios
- **Serviço**: GitHub Readme Stats (oficial)

### **3. 🆕 Resumo Detalhado do Perfil** *(NOVO)*
```
https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=smpsandro1239&theme=radical
```
- **Mostra**: Gráfico detalhado de contribuições ao longo do tempo
- **Serviço**: GitHub Profile Summary Cards
- **Este é o gráfico que mencionaste!**

### **4. Sequência de Contribuições**
```
https://streak-stats.demolab.com/?user=smpsandro1239&theme=radical&hide_border=true&stroke=667eea&background=0a0a0a&fire=667eea&currStreakNum=667eea
```
- **Mostra**: Streak atual e mais longo de contribuições
- **Serviço**: Streak Stats (DemoLab - mais fiável)

### **5. Gráfico de Atividade**
```
https://github-readme-activity-graph.vercel.app/graph?username=smpsandro1239&theme=react-dark&bg_color=0a0a0a&color=667eea&line=667eea&point=ffffff&hide_border=true&area=true
```
- **Mostra**: Gráfico de linha das contribuições dos últimos 365 dias
- **Serviço**: GitHub Activity Graph

---

## 🧪 **Como Testar os Gráficos**

### **Método 1: Testar URLs Individualmente**
Abre cada URL no browser para verificar se carrega:

1. **Stats Básicas**: https://github-readme-stats.vercel.app/api?username=smpsandro1239&show_icons=true&theme=radical&hide_border=true&count_private=true&title_color=667eea&icon_color=667eea&text_color=ffffff&bg_color=0a0a0a&include_all_commits=true

2. **Profile Summary**: https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=smpsandro1239&theme=radical

3. **Streak Stats**: https://streak-stats.demolab.com/?user=smpsandro1239&theme=radical&hide_border=true&stroke=667eea&background=0a0a0a&fire=667eea&currStreakNum=667eea

### **Método 2: Verificar no Portfolio**
1. **Configura o GitHub Pages** (se ainda não fizeste):
   - Vai a: https://github.com/smpsandro1239/portfolio-dev-senior/settings/pages
   - Seleciona: "Deploy from a branch" → "gh-pages" → "/ (root)"
   - Clica "Save"

2. **Acede ao portfolio**: https://smpsandro1239.github.io/portfolio-dev-senior/

3. **Vai à secção "Estatísticas"** e verifica se todos os gráficos carregam

### **Método 3: Teste Local**
```bash
# No diretório do portfolio
npm run serve
# Depois abre: http://localhost:3000
```

---

## 🔍 **Resolução de Problemas**

### **Se um gráfico não aparecer:**

1. **Verifica se o serviço está online**:
   - Testa o URL diretamente no browser
   - Se não carregar, o serviço pode estar em baixo temporariamente

2. **Verifica se o username está correto**:
   - Todos os URLs usam `username=smpsandro1239`
   - Confirma que este é o teu username GitHub correto

3. **Problemas de cache**:
   - Adiciona `&cache_seconds=1800` ao final do URL
   - Ou força refresh com Ctrl+F5

### **URLs de Backup (se necessário):**

Se algum serviço falhar, podes usar estas alternativas:

```html
<!-- Backup para Stats Básicas -->
<img src="https://github-readme-stats-git-masterrstaa-rickstaa.vercel.app/api?username=smpsandro1239&show_icons=true&theme=radical">

<!-- Backup para Profile Summary -->
<img src="https://github-profile-summary-cards.vercel.app/api/cards/repos-per-language?username=smpsandro1239&theme=radical">
```

---

## 🎨 **Personalização dos Temas**

Todos os gráficos usam o tema **"radical"** com cores personalizadas:
- **Cor principal**: `667eea` (azul/roxo)
- **Fundo**: `0a0a0a` (preto)
- **Texto**: `ffffff` (branco)

### **Para alterar cores:**
Substitui os parâmetros nos URLs:
- `title_color=667eea` → Nova cor dos títulos
- `bg_color=0a0a0a` → Nova cor de fundo
- `text_color=ffffff` → Nova cor do texto

---

## ✅ **Status Atual**

- ✅ **GitHub Stats**: Funcionando (serviço oficial)
- ✅ **Top Languages**: Funcionando (serviço oficial)  
- ✅ **Profile Summary**: Adicionado e funcionando
- ✅ **Streak Stats**: Atualizado para serviço mais fiável
- ✅ **Activity Graph**: Funcionando
- ✅ **CSS Styles**: Adicionados para todos os gráficos
- ✅ **Responsive Design**: Todos os gráficos são responsivos

**O teu portfolio agora tem gráficos GitHub completos e fiáveis! 🎉**