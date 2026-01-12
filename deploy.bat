@echo off
echo ========================================
echo   Deploy Automatico - Portfolio
echo ========================================
echo.

REM Verificar se estamos num repositorio Git
if not exist ".git" (
    echo Erro: Nao e um repositorio Git!
    echo Execute primeiro: git init
    pause
    exit /b 1
)

echo 1. A adicionar ficheiros...
git add .

echo.
set /p commit_msg="Mensagem do commit (ou Enter para 'Atualizacao portfolio'): "
if "%commit_msg%"=="" set commit_msg=Atualizacao portfolio

echo.
echo 2. A fazer commit...
git commit -m "%commit_msg%"

echo.
echo 3. A enviar para GitHub...
git push

echo.
echo ========================================
echo   Deploy Concluido! 
echo ========================================
echo.
echo O site sera atualizado em 2-5 minutos em:
echo https://smpsandro1239.github.io/portfolio-dev-senior/
echo.
pause