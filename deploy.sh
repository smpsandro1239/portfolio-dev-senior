#!/bin/bash

echo "========================================"
echo "  Deploy Automático - Portfolio"
echo "========================================"
echo ""

# Verificar se estamos num repositório Git
if [ ! -d ".git" ]; then
    echo "❌ Erro: Não é um repositório Git!"
    echo "Execute primeiro: git init"
    exit 1
fi

echo "1. A adicionar ficheiros..."
git add .

echo ""
read -p "Mensagem do commit (ou Enter para 'Atualização portfolio'): " commit_msg
if [ -z "$commit_msg" ]; then
    commit_msg="Atualização portfolio"
fi

echo ""
echo "2. A fazer commit..."
git commit -m "$commit_msg"

echo ""
echo "3. A enviar para GitHub..."
git push

echo ""
echo "========================================"
echo "  Deploy Concluído! ✅"
echo "========================================"
echo ""
echo "O site será atualizado em 2-5 minutos em:"
echo "https://smpsandro1239.github.io/portfolio-dev-senior/"
echo ""