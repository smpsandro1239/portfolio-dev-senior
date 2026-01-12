@echo off
echo ========================================
echo   Portfolio Profissional - Sandro Pereira
echo ========================================
echo.
echo A iniciar servidor local...
echo.

cd /d "%~dp0src"

echo Servidor disponivel em: http://localhost:8000
echo.
echo Pressione Ctrl+C para parar o servidor
echo.

start http://localhost:8000
python -m http.server 8000