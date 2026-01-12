# 🚀 Deploy Rápido - 5 Minutos

## ⚡ GitHub Pages (Recomendado)

### 1. Criar Repositório
```bash
# Na pasta portfolio-dev-senior
git init
git add .
git commit -m "Portfolio profissional"
git branch -M main
```

### 2. Enviar para GitHub
```bash
# Criar repositório em github.com/smpsandro1239/portfolio-dev-senior
git remote add origin https://github.com/smpsandro1239/portfolio-dev-senior.git
git push -u origin main
```

### 3. Ativar GitHub Pages
1. Ir para **Settings** → **Pages**
2. **Source**: Deploy from a branch
3. **Branch**: `gh-pages` (será criado automaticamente)
4. **Save**

### 4. Aguardar Deploy
- ✅ **URL**: `https://smpsandro1239.github.io/portfolio-dev-senior/`
- ⏱️ **Tempo**: 2-5 minutos
- 🔄 **Automático**: Cada `git push` atualiza o site

---

## ⚡ Netlify (Alternativa)

### 1. Arrastar e Largar
1. Ir para [netlify.com](https://netlify.com)
2. **Drag and drop** a pasta `src`
3. ✅ **Pronto!** Site online em segundos

### 2. Via Git (Recomendado)
1. **New site from Git**
2. Conectar GitHub
3. Selecionar repositório
4. **Publish directory**: `src`
5. **Deploy**

---

## 🎯 Qual Escolher?

### GitHub Pages ✅
- **Grátis para sempre**
- **Deploy automático**
- **Integração perfeita**
- **SSL incluído**

### Netlify ✅
- **Mais rápido para testar**
- **Funcionalidades extra**
- **Interface mais amigável**
- **Formulários gratuitos**

---

## 🔧 Após Deploy

### Verificar
- [ ] Site carrega corretamente
- [ ] Todas as secções funcionam
- [ ] Tema claro/escuro funciona
- [ ] GitHub API carrega projetos
- [ ] Responsivo em móvel

### Partilhar
- 📧 **Email**: Adicionar ao CV
- 💼 **LinkedIn**: Atualizar perfil
- 🐙 **GitHub**: Pin do repositório
- 📱 **Redes sociais**: Partilhar link

---

## 🆘 Problemas Comuns

### Site não carrega
```bash
# Verificar se pasta src está configurada
# Aguardar 5-10 minutos
# Verificar Actions no GitHub
```

### JavaScript não funciona
```bash
# Verificar console do browser (F12)
# Confirmar que todos os ficheiros estão no repositório
```

### Imagens não aparecem
```bash
# Usar caminhos relativos: ./img/foto.jpg
# Não usar caminhos absolutos: /img/foto.jpg
```

---

## 🚀 Próximos Passos

1. **Domínio personalizado** (opcional)
2. **Google Analytics** (gratuito)
3. **SEO otimização**
4. **Performance monitoring**
5. **Backup automático**

---

## 💡 Dica Pro

**Deploy em 30 segundos:**
```bash
git add .
git commit -m "Atualização"
git push
# Site atualiza automaticamente! 🎉
```