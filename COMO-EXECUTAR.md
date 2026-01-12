# Como Executar o Portfolio

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