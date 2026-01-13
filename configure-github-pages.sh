#!/bin/bash

echo "========================================"
echo "   CONFIGURAR GITHUB PAGES"
echo "========================================"
echo
echo "O branch gh-pages foi criado com sucesso!"
echo "Agora precisas de configurar o GitHub Pages manualmente:"
echo
echo "1. Vai a: https://github.com/smpsandro1239/portfolio-dev-senior/settings/pages"
echo "2. Em 'Source', seleciona 'Deploy from a branch'"
echo "3. Em 'Branch', seleciona 'gh-pages'"
echo "4. Em 'Folder', deixa '/ (root)'"
echo "5. Clica 'Save'"
echo
echo "Abrindo a página de configuração..."

# Detectar sistema operativo e abrir URL
if command -v xdg-open > /dev/null; then
    xdg-open https://github.com/smpsandro1239/portfolio-dev-senior/settings/pages
elif command -v open > /dev/null; then
    open https://github.com/smpsandro1239/portfolio-dev-senior/settings/pages
else
    echo "Abra manualmente: https://github.com/smpsandro1239/portfolio-dev-senior/settings/pages"
fi

echo
echo "Após configurar, o site estará disponível em:"
echo "https://smpsandro1239.github.io/portfolio-dev-senior/"
echo
echo "Aguarda 1-2 minutos após a configuração para o site ficar online."
echo
read -p "Pressiona Enter para continuar..."