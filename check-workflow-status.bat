@echo off
echo Verificando status do workflow GitHub Actions...
echo.

echo Abrindo GitHub Actions no browser...
start https://github.com/smpsandro1239/portfolio-dev-senior/actions

echo.
echo Para verificar o status via CLI (opcional):
echo gh run list --repo smpsandro1239/portfolio-dev-senior
echo.
echo Para ver logs do ultimo run:
echo gh run view --repo smpsandro1239/portfolio-dev-senior
echo.
pause