<#
  Atualiza o codigo via git pull e reconstroi o container.
  Detecta automaticamente se estava rodando em modo online ou offline
  e reinicia no mesmo modo.
#>
$ProjectDir = Split-Path $PSScriptRoot -Parent
Push-Location $ProjectDir

Write-Host ""
Write-Host "  Buscando atualizacoes..." -ForegroundColor Cyan
git pull
if ($LASTEXITCODE -ne 0) {
    Write-Host "  git pull falhou. Verifique conflitos." -ForegroundColor Red
    Pop-Location; exit 1
}

Write-Host ""
Write-Host "  Reconstruindo imagem Docker..." -ForegroundColor Cyan
docker compose build --no-cache
if ($LASTEXITCODE -ne 0) {
    Write-Host "  Build falhou." -ForegroundColor Red
    Pop-Location; exit 1
}

# Detecta modo atual antes de reiniciar
$tunnelUp = docker ps -q -f "name=fw-tunnel" 2>$null
$siteUp   = docker ps -q -f "name=fw-site"   2>$null

Write-Host ""
if ($tunnelUp) {
    Write-Host "  Reiniciando em modo ONLINE..." -ForegroundColor Yellow
    docker compose --profile online up -d
    Write-Host "  Site publico:  https://fernandowallace.com.br" -ForegroundColor Green
} elseif ($siteUp) {
    Write-Host "  Reiniciando em modo OFFLINE..." -ForegroundColor Yellow
    docker compose up -d
    Write-Host "  Site local:  http://localhost:8080" -ForegroundColor Green
} else {
    Write-Host "  Nenhum container estava ativo." -ForegroundColor Yellow
    Write-Host "  Use '.\run.ps1 start' para iniciar." -ForegroundColor White
}

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "  Atualizado com sucesso!" -ForegroundColor Cyan
    Write-Host ""
}

Pop-Location
