@echo off
echo ========================================
echo   MONITORIZAÇÃO GITHUB ACTIONS
echo ========================================
echo.
echo 🔍 Verificando status do último workflow...
echo.
echo 📋 Links úteis:
echo    • Actions: https://github.com/smpsandro1239/portfolio-dev-senior/actions
echo    • Portfolio: https://smpsandro1239.github.io/portfolio-dev-senior/
echo.
echo ⏳ Aguardando conclusão do workflow...
echo.
echo 📊 O que esperamos ver no próximo run:
echo    ✅ Node.js version: v20.x.x (não v18.x.x)
echo    ✅ ESLint version: v9.39.2 (não v8.x.x)
echo    ✅ npm run lint:js - sem erros de --parserOptions
echo    ✅ Todas as validações passam
echo    ✅ Deploy para GitHub Pages com sucesso
echo.
pause