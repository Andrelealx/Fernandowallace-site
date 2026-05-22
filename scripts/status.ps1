<#
  Exibe o status e os ultimos logs do site Fernando Wallace.
#>
$ProjectDir = Split-Path $PSScriptRoot -Parent
Push-Location $ProjectDir

Write-Host ""
Write-Host "  ── Containers ──────────────────────────────" -ForegroundColor Cyan
docker compose --profile online ps

Write-Host ""
Write-Host "  ── Logs (ultimas 40 linhas) ─────────────────" -ForegroundColor Cyan
docker compose --profile online logs --tail=40

Pop-Location
