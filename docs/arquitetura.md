# ARQUITETURA — Site Fernando Wallace
**Leal Systems · Projeto Cliente**
**Versão:** 1.0 · **Data:** Maio 2026
**Stack atual:** HTML5 + CSS3 + Vanilla JS · Hostinger Shared Hosting

---

## 1. Visão Geral da Arquitetura

O site Fernando Wallace é um **site estático de página única (SPA-like sem framework)**, servido diretamente pela Hostinger como arquivos estáticos. Não há servidor de aplicação, banco de dados ou runtime Node.js envolvido na arquitetura de produção.

```
┌─────────────────────────────────────────────────────────┐
│                      USUÁRIO FINAL                      │
│              Browser (Chrome/Safari/Firefox)            │
└──────────────────────────┬──────────────────────────────┘
                           │ HTTPS
                           ▼
┌─────────────────────────────────────────────────────────┐
│                   CLOUDFLARE (DNS + CDN)                │
│         Cache de assets · DDoS · SSL automático         │
└──────────────────────────┬──────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│              HOSTINGER SHARED HOSTING                   │
│    Apache · PHP (não usado) · FileSystem estático       │
│    fernandowallace.com.br → /public_html/               │
└──────────┬──────────────────────────┬───────────────────┘
           │                          │
           ▼                          ▼
    index.html                   assets/
    sitemap.xml              css/ js/ images/
    robots.txt
    .htaccess
```

---

## 2. Diagrama de Componentes

### 2.1 Arquitetura de Arquivos (Runtime)

```
index.html  ←── ponto de entrada único
     │
     ├── <head>
     │     ├── Google Fonts CDN (Playfair Display + Source Sans 3)
     │     ├── main.css        ← variáveis, reset, utilitários
     │     ├── components.css  ← navbar, botões, cards, badges
     │     ├── sections.css    ← hero, sobre, gestão, galeria...
     │     └── responsive.css  ← media queries mobile-first
     │
     └── <body>
           ├── #navbar         ← sticky, scroll-aware
           ├── #hero           ← above the fold
           ├── #sobre          ← timeline + bio
           ├── #gestao         ← 6 cards de ação
           ├── #formacao       ← credenciais + diplomas
           ├── #noticias       ← feed filtrado
           ├── #galeria        ← masonry + lightbox
           ├── #contato        ← form + mapa
           ├── #footer
           └── .whatsapp-fab   ← botão flutuante
                 │
                 └── <script defer> (fim do body)
                       ├── main.js       ← init, scroll, observer
                       ├── lightbox.js   ← galeria + diplomas
                       ├── carousel.js   ← depoimentos (Splide)
                       ├── filter.js     ← notícias por categoria
                       └── form.js       ← validação + Formspree
```

---

### 2.2 Fluxo de Dados — Formulário de Contato

```
Usuário preenche form
        │
        ▼
form.js valida campos
  (nome, e-mail, mensagem)
        │
   ┌────┴────┐
   │ inválido│──► exibe mensagem de erro inline
   └────┬────┘
        │ válido
        ▼
  fetch POST → Formspree API
  (https://formspree.io/f/SEU_ID)
        │
   ┌────┴────────────┐
   │ Formspree       │
   │ encaminha email │──► Fernando recebe no e-mail cadastrado
   └────┬────────────┘
        │
        ▼
  res.ok? 
  ├── sim → exibe "Mensagem enviada!" (aria-live)
  └── não → exibe "Erro. Tente novamente."
```

---

### 2.3 Fluxo de Interação — Galeria + Lightbox

```
Usuário acessa #galeria
        │
        ▼
Grid Masonry CSS renderiza thumbnails (WebP lazy)
        │
        ▼
Usuário clica em imagem
        │
        ▼
GLightbox intercepta click via [data-glightbox]
        │
        ▼
Abre <dialog> fullscreen
  ├── Imagem em alta resolução (preload)
  ├── Legenda (data-description)
  ├── Navegação por setas (← →)
  ├── Swipe em mobile (touch events)
  └── Fecha: ESC / clique fora / botão X
```

---

### 2.4 Fluxo de Scroll e Animações

```
DOMContentLoaded
        │
        ▼
main.js inicializa IntersectionObserver
  └── observa todos os [.reveal]
        │
        ▼
Usuário scrolla a página
        │
        ▼
Observer detecta elemento no viewport (threshold: 0.15)
        │
        ▼
Adiciona class .visible
  └── CSS: opacity 0→1 + translateY(24px→0)
        com transition-delay escalonado por filho
```

---

## 3. Arquitetura CSS

### 3.1 Camadas (Cascade Layers)

```
Ordem de carregamento (do mais geral ao mais específico):

1. main.css
   ├── :root { CSS Variables }   ← design tokens
   ├── CSS Reset (box-sizing, margin, padding)
   ├── Base tags (body, a, img, h1-h6, p)
   └── Utilitários (.container, .grid, .flex, .sr-only)

2. components.css
   ├── .navbar + .navbar.scrolled
   ├── .btn-primary / .btn-outline / .btn-ghost
   ├── .card / .card-action / .card-news
   ├── .badge (variantes)
   ├── .timeline + .timeline-item
   ├── .form-group / input / select / textarea
   └── .whatsapp-fab

3. sections.css
   ├── #hero (layout split, stats bar)
   ├── #sobre (grid foto+texto, timeline)
   ├── #gestao (grid cards)
   ├── #formacao (lista credenciais)
   ├── #noticias (grid + filtros)
   ├── #galeria (masonry, overlay hover)
   ├── #contato (split form+info)
   └── #footer

4. responsive.css
   └── @media queries mobile-first
       ├── max-width: 767px  (mobile)
       ├── min-width: 768px  (tablet)
       └── min-width: 1024px (desktop)
```

### 3.2 Especificidade — Regras de Escrita

```
Regra 1: Nunca usar !important (exceto em utilitários .sr-only)
Regra 2: Máximo 3 níveis de seletor (.navbar .links .link)
Regra 3: IDs de seção (#hero) apenas como âncoras de scroll, não como seletor CSS
Regra 4: Classes BEM-like para componentes: .card, .card__title, .card--featured
Regra 5: Variáveis CSS para todos os valores repetidos
```

---

## 4. Arquitetura JavaScript

### 4.1 Módulos e Responsabilidades

```
main.js
├── initScrollBehavior()    ← smooth scroll em âncoras
├── initNavbar()            ← sticky + classe .scrolled
├── initRevealObserver()    ← IntersectionObserver p/ animações
└── initActiveNavLink()     ← highlight do link ativo no scroll

lightbox.js
├── initGLightbox()         ← galeria de fotos
└── initDiplomaLightbox()   ← galeria de diplomas

carousel.js
└── initSplide()            ← carrossel de depoimentos

filter.js
└── initNewsFilter()        ← filtro de categorias nas notícias

form.js
├── validateForm()          ← validação client-side
├── submitForm()            ← fetch POST para Formspree
└── showStatus()            ← feedback de sucesso/erro
```

### 4.2 Padrão de Inicialização

```javascript
// main.js — padrão de entrada único
document.addEventListener('DOMContentLoaded', () => {
  initScrollBehavior();
  initNavbar();
  initRevealObserver();
  initActiveNavLink();
});

// Cada módulo exporta uma função init
// Sem globals desnecessários
// Sem dependência entre módulos (exceto via DOM)
```

### 4.3 Dependências Externas (CDN)

```
Biblioteca     Versão   Tamanho gzip   CDN
─────────────────────────────────────────────────────────
GLightbox      3.3.0    ~12KB          cdn.jsdelivr.net
Splide.js      4.1.4    ~27KB          cdn.jsdelivr.net
Google Fonts   —        ~20KB          fonts.googleapis.com

Total CDN:     ~59KB gzip
Código próprio: estimado ~15KB total (CSS + JS)
─────────────────────────────────────────────────────────
Sem jQuery. Sem Lodash. Sem React. Sem Vue.
```

---

## 5. Arquitetura de Imagens

### 5.1 Pipeline de Otimização

```
Foto original (JPG/PNG da câmera ou Instagram)
        │
        ▼
Squoosh.app (browser-based, gratuito)
  ├── Converter para WebP
  ├── Qualidade 80 (fotos) / 90 (UI)
  └── Redimensionar para múltiplos tamanhos:
        ├── 400w  (mobile)
        ├── 800w  (tablet / thumbnail)
        └── 1200w (desktop / fullscreen)
        │
        ▼
Salvar em assets/images/<categoria>/
  ├── hero/     fw-400.webp, fw-800.webp, fw-1200.webp
  ├── gallery/  foto-001-800.webp, foto-001-1600.webp
  └── news/     noticia-001-600.webp
```

### 5.2 Estratégia de Carregamento

```
Hero image:    loading="eager" + <link rel="preload"> no <head>
               → carrega antes de qualquer outro recurso

Above fold:    loading="eager" (primeiras 2-3 fotos visíveis)
Below fold:    loading="lazy" + width/height explícitos
               → evita Cumulative Layout Shift (CLS)

Galeria:       loading="lazy" em todas as thumbnails
               Fullscreen (lightbox): carregado on-demand ao clicar

OG Image:      1200×630px JPG (não WebP — compatibilidade máxima)
Favicon:       SVG (vetorial, qualquer tamanho) + PNG 32px fallback
```

### 5.3 Estrutura de Nomenclatura

```
Padrão: [slug]-[largura].[ext]

Exemplos:
  fernando-hero-1200.webp
  gestao-clinica-800.webp
  conferencia-saude-2024-800.webp
  diploma-farmacia-1200.webp

Regras:
  - Apenas letras minúsculas, números e hífens
  - Sem espaços, sem acentos, sem underscore
  - Sempre incluir largura no nome para diferenciar versões
```

---

## 6. Arquitetura de SEO

### 6.1 Hierarquia de Conteúdo

```
<html lang="pt-BR">
  <head>
    <title> — única, ~60 chars, keyword principal no início
    <meta description> — única, 150-160 chars, inclui cidade
    <link rel="canonical"> — URL absoluta sem trailing slash
    <meta og:*> — para compartilhamento social
    <script type="application/ld+json"> — Schema.org Person
  </head>
  <body>
    <h1> — aparece UMA vez (nome Fernando Wallace no hero)
    <h2> — título de cada seção (Sobre, Gestão, Formação...)
    <h3> — títulos de cards e itens dentro das seções
    <h4> — sub-itens quando necessário
  </body>
```

### 6.2 Schema.org — Grafo de Entidades

```
Person (Fernando Wallace)
  │
  ├── worksFor → GovernmentOrganization
  │     └── Secretaria Municipal de Saúde de Guapimirim
  │           └── address → PostalAddress (Guapimirim/RJ)
  │
  ├── hasOccupation → Occupation (Farmacêutico)
  ├── hasOccupation → Occupation (Acadêmico de Medicina)
  │
  ├── sameAs → Instagram @fernandowallace_oficial
  │
  └── image → URL da foto principal
```

### 6.3 Sitemap

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://fernandowallace.com.br/</loc>
    <lastmod>2026-05-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://fernandowallace.com.br/#sobre</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://fernandowallace.com.br/#gestao</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://fernandowallace.com.br/#noticias</loc>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://fernandowallace.com.br/#contato</loc>
    <priority>0.6</priority>
  </url>
</urlset>
```

---

## 7. Arquitetura de Segurança

### 7.1 Headers HTTP (.htaccess)

```apache
# HTTPS forçado
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Sem listagem de diretório
Options -Indexes

# Segurança de conteúdo
Header always set X-Content-Type-Options "nosniff"
Header always set X-Frame-Options "SAMEORIGIN"
Header always set X-XSS-Protection "1; mode=block"
Header always set Referrer-Policy "strict-origin-when-cross-origin"

# CSP — Content Security Policy
Header always set Content-Security-Policy "
  default-src 'self';
  script-src 'self' 'unsafe-inline' cdn.jsdelivr.net;
  style-src 'self' 'unsafe-inline' fonts.googleapis.com cdn.jsdelivr.net;
  font-src 'self' fonts.gstatic.com;
  img-src 'self' data: maps.googleapis.com maps.gstatic.com;
  frame-src maps.google.com;
  connect-src 'self' formspree.io;
"
```

### 7.2 Formulário — Proteção Anti-Spam

```html
<!-- Honeypot field (invisível para humanos, bots preenchem) -->
<input type="text" name="_gotcha" style="display:none" tabindex="-1" autocomplete="off">

<!-- Formspree: desabilitar redirect após envio -->
<input type="hidden" name="_next" value="false">

<!-- Formspree: assunto fixo para identificar origem -->
<input type="hidden" name="_subject" value="Contato via fernandowallace.com.br">
```

---

## 8. Arquitetura de Deploy

### 8.1 Fluxo de Deploy (Opção A — FTP Manual)

```
Desenvolvimento local
  └── VS Code / editor de preferência
        │
        ▼
Testar localmente (Live Server / browser direto)
        │
        ▼
Otimizar imagens (Squoosh)
        │
        ▼
FileZilla (FTP) → Hostinger
  Host:     ftp.fernandowallace.com.br
  Usuário:  conta Hostinger
  Porta:    21 (FTP) ou 22 (SFTP)
  Destino:  /public_html/
        │
        ▼
Verificar em https://fernandowallace.com.br
        │
        ▼
Testar PageSpeed + formulário + lightbox
```

### 8.2 Fluxo de Deploy (Opção B — Git via Hostinger)

```
Repositório GitHub (privado)
  └── branch: main
        │
        ▼
Hostinger Git Integration
  (painel hPanel → Git → conectar repo)
        │
        ▼
git push origin main
        │
        ▼
Hostinger faz pull automático para /public_html/
        │
        ▼
Site atualizado sem FTP manual
```

> Recomendação: Usar Opção B desde o início. Controle de versão + deploy automatizado sem custo adicional.

### 8.3 Ambientes

```
Ambiente     URL                                   Propósito
──────────────────────────────────────────────────────────────
Local        http://localhost:5500 (Live Server)   Desenvolvimento
Staging      https://staging.leal.systems/fw/      Aprovação do cliente
Produção     https://fernandowallace.com.br        Go live
```

> O ambiente de staging pode ser uma subpasta no servidor da Leal Systems, protegida por senha (.htpasswd) até aprovação final.

---

## 9. Arquitetura de Analytics

### 9.1 Google Analytics 4 — Eventos Customizados

```javascript
// Eventos a rastrear além do pageview automático:

// Clique no CTA do hero
gtag('event', 'cta_click', {
  event_category: 'engagement',
  event_label: 'hero_agendar_contato'
});

// Abertura de item na galeria
gtag('event', 'gallery_open', {
  event_category: 'media',
  event_label: 'foto_' + imageSlug
});

// Envio de formulário
gtag('event', 'form_submit', {
  event_category: 'lead',
  event_label: 'contato_formulario'
});

// Clique no WhatsApp
gtag('event', 'whatsapp_click', {
  event_category: 'lead',
  event_label: 'whatsapp_flutuante'
});

// Clique no Instagram
gtag('event', 'social_click', {
  event_category: 'social',
  event_label: 'instagram'
});
```

### 9.2 Google Search Console

```
Verificação:   Meta tag <meta name="google-site-verification" content="...">
Sitemap:       Submeter https://fernandowallace.com.br/sitemap.xml
Monitorar:     Impressões · Cliques · CTR · Posição média
Palavras-chave alvo:
  ├── "Fernando Wallace Guapimirim"
  ├── "Secretário de Saúde Guapimirim"
  └── "Fernando Wallace farmacêutico"
```

---

## 10. Evolução Arquitetural — Roadmap Técnico

### Versão 1.0 (entrega atual)
```
Static HTML + CSS + JS
Hostinger Shared Hosting
Formspree para formulário
Analytics manual via gtag()
```

### Versão 1.5 (6–12 meses)
```
Adicionar CMS headless (Sanity.io free tier)
Fernando ou assessoria atualiza notícias pelo painel
Geração estática das notícias via script Node.js simples
Sem mudança de hospedagem — continua Hostinger
```

### Versão 2.0 (12–24 meses, se crescimento justificar)
```
Migração para Next.js 14 (App Router)
Deploy na Vercel (CDN global, preview deployments)
Sanity.io como CMS full (imagens, galerias, depoimentos)
Resend para e-mail transacional (substituindo Formspree)
Vercel Analytics integrado
Blog/artigos para SEO de longo prazo
```

### Comparativo de Arquiteturas

| Critério | v1.0 (atual) | v1.5 | v2.0 |
|---|---|---|---|
| Custo mensal | ~R$ 30 (Hostinger) | ~R$ 30 + $0 Sanity | ~R$ 0 Vercel + $0 Sanity |
| Velocidade de entrega | Alta | Média | Baixa |
| Autonomia do cliente | Nenhuma | Alta (notícias) | Total |
| Performance | ★★★★☆ | ★★★★☆ | ★★★★★ |
| Complexidade técnica | Baixa | Média | Alta |
| Manutenção Leal Systems | Baixa | Média | Baixa (CI/CD) |

---

## 11. Decisões de Arquitetura Documentadas

| Decisão | Alternativa considerada | Motivo da escolha |
|---|---|---|
| HTML puro em vez de React | Next.js desde início | Entrega rápida, zero build step, Hostinger compartilhado |
| Formspree em vez de backend próprio | PHP Mailer, Node.js API | Sem servidor de aplicação, gratuito, confiável |
| GLightbox em vez de lightbox nativo | Fancybox, lightGallery | Open source, leve (~12KB), sem licença paga |
| Splide.js em vez de Swiper | Swiper, Glide.js | Mais leve que Swiper, melhor DX que Glide |
| Google Fonts em vez de self-hosted | Bunny Fonts, fontes locais | Facilidade, cache compartilhado entre sites, LGPD aceitável |
| CSS puro em vez de Tailwind | Tailwind CDN | Sem build step, CSS semântico, arquivo menor |
| JS modular sem bundler | Webpack, Vite | Sem build step, compatível com Hostinger puro |

---

*Documento gerado por Leal Systems · André Leal — CEO*
*Todos os direitos reservados · Uso interno e apresentação ao cliente · Confidencial*