<#
  Setup inicial — configura Docker + Cloudflare Tunnel.
  Execute apenas uma vez. Requer: Docker Desktop + cloudflared.

  Instalar cloudflared:  winget install Cloudflare.cloudflared
#>

$ErrorActionPreference = "Stop"
$ProjectDir = Split-Path $PSScriptRoot -Parent

function Write-Step($n, $msg) {
    Write-Host ""
    Write-Host "  [$n] $msg" -ForegroundColor Yellow
}
function Write-OK($msg)  { Write-Host "      v  $msg" -ForegroundColor Green }
function Write-Err($msg) { Write-Host "      x  $msg" -ForegroundColor Red }

Write-Host ""
Write-Host "  ============================================" -ForegroundColor Cyan
Write-Host "   Fernando Wallace Site — Setup do Ambiente  " -ForegroundColor Cyan
Write-Host "  ============================================" -ForegroundColor Cyan

# ── 1. Pre-requisitos ────────────────────────────────────────────
Write-Step "1/6" "Verificando pre-requisitos"

$missing = @()
if (-not (Get-Command "docker"       -ErrorAction SilentlyContinue)) { $missing += "Docker Desktop" }
if (-not (Get-Command "cloudflared"  -ErrorAction SilentlyContinue)) { $missing += "cloudflared" }

if ($missing.Count -gt 0) {
    Write-Err "Instale antes de continuar:"
    foreach ($m in $missing) { Write-Host "       - $m" -ForegroundColor Red }
    if ($missing -contains "cloudflared") {
        Write-Host ""
        Write-Host "      winget install Cloudflare.cloudflared" -ForegroundColor White
    }
    exit 1
}
Write-OK "Docker e cloudflared encontrados"

# ── Tunel ja configurado? ────────────────────────────────────────
$configPath = Join-Path $ProjectDir "tunnel\config.yml"
if (Test-Path $configPath) {
    Write-Host ""
    Write-Host "  Tunel ja configurado." -ForegroundColor Yellow
    Write-Host "  Use '.\run.ps1 start online' para iniciar." -ForegroundColor White
    exit 0
}

# ── 2. Login Cloudflare ──────────────────────────────────────────
Write-Step "2/6" "Login no Cloudflare (abrira o navegador)"
Push-Location $ProjectDir
cloudflared tunnel login
if ($LASTEXITCODE -ne 0) { Write-Err "Login falhou"; Pop-Location; exit 1 }
Write-OK "Autenticado com sucesso"

# ── 3. Criar tunnel ──────────────────────────────────────────────
Write-Step "3/6" "Criando tunel 'fw-site'"
$createOutput = (cloudflared tunnel create fw-site 2>&1) -join "`n"
Write-Host $createOutput

# Extrai UUID do output
$uuidPattern = '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}'
$tunnelId = [regex]::Match($createOutput, $uuidPattern).Value

if (-not $tunnelId) {
    # Fallback: tenta via tunnel list
    $listOutput = (cloudflared tunnel list 2>&1) -join "`n"
    foreach ($line in ($listOutput -split "`n")) {
        if ($line -match "fw-site") {
            $tunnelId = [regex]::Match($line, $uuidPattern).Value
            if ($tunnelId) { break }
        }
    }
}

if (-not $tunnelId) {
    Write-Err "Nao foi possivel determinar o ID do tunel."
    Write-Host "      Execute 'cloudflared tunnel list', copie o UUID de 'fw-site'" -ForegroundColor Yellow
    Write-Host "      e crie tunnel\config.yml baseado em tunnel\config.yml.example" -ForegroundColor Yellow
    Pop-Location; exit 1
}
Write-OK "Tunnel ID: $tunnelId"

# ── 4. Copiar credenciais ────────────────────────────────────────
Write-Step "4/6" "Copiando credenciais para tunnel\"
$credSource = "$env:USERPROFILE\.cloudflared\$tunnelId.json"
$credDest   = Join-Path $ProjectDir "tunnel\$tunnelId.json"

if (Test-Path $credSource) {
    Copy-Item $credSource $credDest
    Write-OK "Credenciais copiadas"
} else {
    Write-Err "Arquivo nao encontrado: $credSource"
    Write-Host "      Copie manualmente '$tunnelId.json' para a pasta tunnel\" -ForegroundColor Yellow
    Pop-Location; exit 1
}

# ── 5. Gerar config.yml ──────────────────────────────────────────
Write-Step "5/6" "Gerando tunnel\config.yml"
$configContent = @"
tunnel: $tunnelId
credentials-file: /etc/cloudflared/$tunnelId.json

ingress:
  - hostname: fernandowallace.com.br
    service: http://site:80
  - hostname: www.fernandowallace.com.br
    service: http://site:80
  - service: http_status:404
"@
Set-Content -Path $configPath -Value $configContent -Encoding utf8
Write-OK "config.yml criado"

# ── Rotear DNS (requer dominio no Cloudflare) ────────────────────
Write-Host "      Configurando DNS no Cloudflare..."  -ForegroundColor DarkGray
cloudflared tunnel route dns fw-site fernandowallace.com.br 2>&1 | Out-Null
cloudflared tunnel route dns fw-site www.fernandowallace.com.br 2>&1 | Out-Null
Write-OK "DNS roteado para o tunel"

# ── 6. Build Docker ──────────────────────────────────────────────
Write-Step "6/6" "Construindo imagem Docker"
docker compose build
if ($LASTEXITCODE -ne 0) { Write-Err "Build falhou"; Pop-Location; exit 1 }
Write-OK "Imagem construida com sucesso"

Pop-Location

# ── Resultado ────────────────────────────────────────────────────
Write-Host ""
Write-Host "  ============================================" -ForegroundColor Cyan
Write-Host "   Setup concluido!                          " -ForegroundColor Cyan
Write-Host "  ============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "  .\run.ps1 start         -> local: http://localhost:8080" -ForegroundColor White
Write-Host "  .\run.ps1 start online  -> publico: https://fernandowallace.com.br" -ForegroundColor Green
Write-Host ""
