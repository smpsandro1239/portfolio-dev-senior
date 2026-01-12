#!/bin/bash

echo "Verificando status do workflow GitHub Actions..."
echo

echo "Abrindo GitHub Actions no browser..."
if command -v xdg-open > /dev/null; then
    xdg-open https://github.com/smpsandro1239/portfolio-dev-senior/actions
elif command -v open > /dev/null; then
    open https://github.com/smpsandro1239/portfolio-dev-senior/actions
else
    echo "Abra manualmente: https://github.com/smpsandro1239/portfolio-dev-senior/actions"
fi

echo
echo "Para verificar o status via CLI (se tiver gh CLI instalado):"
echo "gh run list --repo smpsandro1239/portfolio-dev-senior"
echo
echo "Para ver logs do ultimo run:"
echo "gh run view --repo smpsandro1239/portfolio-dev-senior"
echo

read -p "Pressione Enter para continuar..."