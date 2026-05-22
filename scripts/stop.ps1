<#
  Para todos os containers do site Fernando Wallace (site + tunel).
#>
$ProjectDir = Split-Path $PSScriptRoot -Parent
Push-Location $ProjectDir

Write-Host ""
Write-Host "  Parando containers..." -ForegroundColor Cyan
docker compose --profile online down

if ($LASTEXITCODE -eq 0) {
    Write-Host "  Containers parados." -ForegroundColor Green
    Write-Host ""
}

Pop-Location
