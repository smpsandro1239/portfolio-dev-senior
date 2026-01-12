#!/bin/bash

echo "========================================"
echo "  Portfolio Profissional - Sandro Pereira"
echo "========================================"
echo ""
echo "A iniciar servidor local..."
echo ""

# Navegar para a pasta src
cd "$(dirname "$0")/src"

echo "Servidor disponível em: http://localhost:8000"
echo ""
echo "Pressione Ctrl+C para parar o servidor"
echo ""

# Abrir no browser (funciona no macOS e Linux)
if command -v open &> /dev/null; then
    open http://localhost:8000
elif command -v xdg-open &> /dev/null; then
    xdg-open http://localhost:8000
fi

# Iniciar servidor Python
python3 -m http.server 8000 2>/dev/null || python -m http.server 8000