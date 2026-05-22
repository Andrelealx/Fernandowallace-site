<#
.SYNOPSIS
  Gerencia o site Fernando Wallace no Docker.
.EXAMPLE
  .\run.ps1 setup         # Configura o ambiente (primeira vez)
  .\run.ps1 start         # Inicia localmente (http://localhost:8080)
  .\run.ps1 start online  # Inicia com tunel publico (fernandowallace.com.br)
  .\run.ps1 stop          # Para todos os containers
  .\run.ps1 status        # Exibe status e logs
  .\run.ps1 update        # Atualiza codigo e reconstroi
#>
param(
    [Parameter(Position=0)]
    [string]$Command = "help",

    [Parameter(Position=1)]
    [string]$Mode = ""
)

$ScriptDir = $PSScriptRoot

switch ($Command.ToLower()) {
    "setup"  { & "$ScriptDir\scripts\setup.ps1" }
    "start"  {
        if ($Mode -eq "online") {
            & "$ScriptDir\scripts\start.ps1" -Online
        } else {
            & "$ScriptDir\scripts\start.ps1"
        }
    }
    "stop"   { & "$ScriptDir\scripts\stop.ps1" }
    "status" { & "$ScriptDir\scripts\status.ps1" }
    "update" { & "$ScriptDir\scripts\update.ps1" }
    default  {
        Write-Host ""
        Write-Host "  Fernando Wallace Site" -ForegroundColor Cyan
        Write-Host "  ─────────────────────────────────────────" -ForegroundColor DarkGray
        Write-Host ""
        Write-Host "  Uso:  .\run.ps1 <comando> [modo]" -ForegroundColor White
        Write-Host ""
        Write-Host "  Comandos:" -ForegroundColor Yellow
        Write-Host "    setup         Configura tunel (primeira vez)" -ForegroundColor White
        Write-Host "    start         Inicia localmente  → http://localhost:8080" -ForegroundColor White
        Write-Host "    start online  Inicia com tunel   → https://fernandowallace.com.br" -ForegroundColor Green
        Write-Host "    stop          Para todos os containers" -ForegroundColor White
        Write-Host "    status        Status e ultimos logs" -ForegroundColor White
        Write-Host "    update        git pull + rebuild + restart" -ForegroundColor White
        Write-Host ""
    }
}
