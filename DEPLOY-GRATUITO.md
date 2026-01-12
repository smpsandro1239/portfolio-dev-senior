# 🚀 Deploy Gratuito do Portfolio

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