<#
  Inicia o site Fernando Wallace no Docker.
  -Online  : sobe o site + tunel Cloudflare (modo publico)
  (sem flag): sobe apenas o site localmente (http://localhost:8080)
#>
param([switch]$Online)

$ProjectDir = Split-Path $PSScriptRoot -Parent
Push-Location $ProjectDir

if ($Online) {
    $configPath = Join-Path $ProjectDir "tunnel\config.yml"
    if (-not (Test-Path $configPath)) {
        Write-Host "  Tunel nao configurado. Execute primeiro: .\run.ps1 setup" -ForegroundColor Red
        Pop-Location; exit 1
    }

    Write-Host ""
    Write-Host "  Iniciando modo ONLINE..." -ForegroundColor Cyan
    docker compose --profile online up -d --build

    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "  Site publico:  https://fernandowallace.com.br" -ForegroundColor Green
        Write-Host "  Acesso local:  http://localhost:8080" -ForegroundColor White
        Write-Host ""
        Write-Host "  Logs do tunel: docker logs -f fw-tunnel" -ForegroundColor DarkGray
    }
} else {
    Write-Host ""
    Write-Host "  Iniciando modo OFFLINE (apenas local)..." -ForegroundColor Cyan
    docker compose up -d --build

    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "  Site disponivel em: http://localhost:8080" -ForegroundColor Green
        Write-Host "  Para expor publicamente: .\run.ps1 start online" -ForegroundColor DarkGray
        Write-Host ""
    }
}

Pop-Location
