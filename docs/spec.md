# SPECS — Site Fernando Wallace
**Leal Systems · Projeto Cliente**
**Versão:** 1.0 · **Data:** Maio 2026
**Stack:** HTML5 + CSS3 + Vanilla JS · Hostinger Shared Hosting

---

## 1. Visão Técnica Geral

Site estático de página única com âncoras internas (single-page com scroll suave), sem framework frontend, sem build step, sem dependências de runtime. Todo o código roda no browser sem servidor Node.js ou PHP — apenas arquivos estáticos servidos pela Hostinger.

```
Paradigma:     Static site (HTML/CSS/JS puro)
Renderização:  Client-side, sem SSR
Routing:       Âncoras de hash (#sobre, #gestao, etc.)
Build:         Nenhum — arquivos editados diretamente
Deploy:        FTP para Hostinger ou Git via painel Hostinger
```

---

## 2. Estrutura de Arquivos

```
fernandowallace/
│
├── index.html                  ← Página única principal
│
├── assets/
│   ├── css/
│   │   ├── main.css            ← Estilos globais, variáveis, reset
│   │   ├── components.css      ← Navbar, cards, botões, badges
│   │   ├── sections.css        ← Estilos por seção (hero, sobre, etc.)
│   │   └── responsive.css      ← Media queries (mobile-first)
│   │
│   ├── js/
│   │   ├── main.js             ← Init, scroll suave, IntersectionObserver
│   │   ├── lightbox.js         ← Lightbox da galeria e diplomas
│   │   ├── carousel.js         ← Carrossel de depoimentos
│   │   ├── filter.js           ← Filtro de categorias nas notícias
│   │   └── form.js             ← Validação e envio do formulário
│   │
│   ├── images/
│   │   ├── hero/               ← Foto principal (WebP, múltiplas resoluções)
│   │   ├── gallery/            ← Fotos da galeria (WebP)
│   │   ├── news/               ← Thumbnails das notícias (WebP)
│   │   ├── logos/              ← Logo Fernando Wallace (SVG + PNG)
│   │   └── icons/              ← Ícones customizados (SVG inline)
│   │
│   └── fonts/                  ← Fallback local (se necessário)
│
├── sitemap.xml
├── robots.txt
└── .htaccess                   ← Redirect HTTP→HTTPS, compressão gzip
```

---

## 3. Identidade Visual — Tokens de Design

### 3.1 Paleta de Cores

```css
:root {
  /* Cores principais */
  --color-navy:        #0B1F3A;  /* Azul-marinho — base, header, footer */
  --color-green:       #1FA67A;  /* Verde saúde — acento primário, CTAs */
  --color-green-dark:  #0F5F4A;  /* Verde escuro — hover, variações */
  --color-gold:        #C9A646;  /* Dourado suave — destaque, badges */

  /* Neutros */
  --color-white-ice:   #F7FAFC;  /* Fundo principal */
  --color-gray-text:   #4A5568;  /* Corpo de texto */
  --color-gray-light:  #EDF2F7;  /* Fundo de cards */
  --color-gray-border: #E2E8F0;  /* Bordas sutis */
  --color-white:       #FFFFFF;  /* Superfície de cards */

  /* Semânticas */
  --color-text-primary:   var(--color-navy);
  --color-text-body:      var(--color-gray-text);
  --color-text-muted:     #718096;
  --color-bg-page:        var(--color-white-ice);
  --color-bg-card:        var(--color-white);
  --color-bg-dark:        var(--color-navy);
  --color-accent:         var(--color-green);
  --color-accent-hover:   var(--color-green-dark);
  --color-highlight:      var(--color-gold);
}
```

### 3.2 Tipografia

```css
/* Importação no <head> */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Source+Sans+3:wght@300;400;600&display=swap');

:root {
  --font-display: 'Playfair Display', Georgia, serif;
  --font-body:    'Source Sans 3', system-ui, sans-serif;

  /* Escala tipográfica */
  --text-xs:   0.75rem;    /*  12px */
  --text-sm:   0.875rem;   /*  14px */
  --text-base: 1rem;       /*  16px */
  --text-lg:   1.125rem;   /*  18px */
  --text-xl:   1.25rem;    /*  20px */
  --text-2xl:  1.5rem;     /*  24px */
  --text-3xl:  1.875rem;   /*  30px */
  --text-4xl:  2.25rem;    /*  36px */
  --text-5xl:  3rem;       /*  48px */
  --text-6xl:  3.75rem;    /*  60px */

  /* Line-height */
  --leading-tight:  1.25;
  --leading-normal: 1.6;
  --leading-loose:  1.8;
}
```

### 3.3 Espaçamento

```css
:root {
  --space-1:  0.25rem;   /*  4px */
  --space-2:  0.5rem;    /*  8px */
  --space-3:  0.75rem;   /* 12px */
  --space-4:  1rem;      /* 16px */
  --space-6:  1.5rem;    /* 24px */
  --space-8:  2rem;      /* 32px */
  --space-12: 3rem;      /* 48px */
  --space-16: 4rem;      /* 64px */
  --space-20: 5rem;      /* 80px */
  --space-24: 6rem;      /* 96px */
}
```

### 3.4 Border Radius

```css
:root {
  --radius-sm:   4px;
  --radius-md:   8px;
  --radius-lg:   12px;
  --radius-xl:   16px;
  --radius-full: 9999px;
}
```

### 3.5 Sombras

```css
:root {
  --shadow-sm:  0 1px 3px rgba(11,31,58,0.08), 0 1px 2px rgba(11,31,58,0.06);
  --shadow-md:  0 4px 6px rgba(11,31,58,0.07), 0 2px 4px rgba(11,31,58,0.06);
  --shadow-lg:  0 10px 24px rgba(11,31,58,0.10), 0 4px 8px rgba(11,31,58,0.06);
  --shadow-xl:  0 20px 48px rgba(11,31,58,0.12);
}
```

### 3.6 Transições

```css
:root {
  --transition-fast:   150ms ease;
  --transition-base:   250ms ease;
  --transition-slow:   400ms ease;
  --transition-bounce: 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

---

## 4. Layout & Grid

### 4.1 Container

```css
.container {
  width: 100%;
  max-width: 1200px;
  margin-inline: auto;
  padding-inline: var(--space-6);   /* 24px lateral */
}

@media (min-width: 768px) {
  .container { padding-inline: var(--space-8); }
}

@media (min-width: 1280px) {
  .container { padding-inline: var(--space-12); }
}
```

### 4.2 Grid System

```css
/* Grid de 12 colunas base */
.grid { display: grid; gap: var(--space-6); }
.grid-2 { grid-template-columns: repeat(2, 1fr); }
.grid-3 { grid-template-columns: repeat(3, 1fr); }
.grid-4 { grid-template-columns: repeat(4, 1fr); }

/* Auto-fit para cards */
.grid-auto-sm { grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }
.grid-auto-md { grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); }

/* Grid masonry para galeria (CSS puro) */
.masonry {
  columns: 3;
  column-gap: var(--space-4);
}
.masonry-item { break-inside: avoid; margin-bottom: var(--space-4); }
```

### 4.3 Breakpoints

```css
/* Mobile-first */
/* xs:  0px    — base (mobile portrait)  */
/* sm:  480px  — mobile landscape        */
/* md:  768px  — tablet                  */
/* lg:  1024px — desktop pequeno         */
/* xl:  1280px — desktop padrão          */
/* 2xl: 1536px — desktop grande          */

@media (max-width: 767px)  { /* mobile  */ }
@media (min-width: 768px)  { /* tablet+ */ }
@media (min-width: 1024px) { /* desktop */ }
```

### 4.4 Seções

```css
section {
  padding-block: var(--space-20);  /* 80px vertical por padrão */
}

section.section-sm { padding-block: var(--space-12); }
section.section-lg { padding-block: var(--space-24); }

/* Fundo alternado */
section:nth-child(even) { background: var(--color-gray-light); }
section.section-dark     { background: var(--color-navy); color: var(--color-white-ice); }
```

---

## 5. Componentes

### 5.1 Navbar

```
Estado:       Sticky (position: sticky; top: 0)
Fundo:        Transparente no topo → #0B1F3A com blur ao scrollar (JS)
Logo:         "Fernando Wallace" em Playfair Display, branco
Links:        Sobre · Gestão · Formação · Notícias · Galeria · Contato
CTA:          Botão "Agendar Contato" — fundo verde #1FA67A
Mobile:       Hamburger → drawer lateral com animação slide-in
Z-index:      1000
Altura:       72px desktop · 60px mobile
Transição:    background 300ms ease ao scrollar
```

**Comportamento de scroll:**
```javascript
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.navbar');
  nav.classList.toggle('scrolled', window.scrollY > 60);
});
/* .navbar.scrolled: background #0B1F3A, backdrop-filter blur(8px) */
```

---

### 5.2 Botões

```css
/* Primário */
.btn-primary {
  background: var(--color-green);
  color: #fff;
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-full);
  font-family: var(--font-body);
  font-weight: 600;
  font-size: var(--text-sm);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  transition: background var(--transition-base), transform var(--transition-bounce);
  border: none;
  cursor: pointer;
}
.btn-primary:hover {
  background: var(--color-green-dark);
  transform: translateY(-1px);
}

/* Secundário (outline) */
.btn-outline {
  background: transparent;
  color: var(--color-green);
  border: 1.5px solid var(--color-green);
  /* mesmas propriedades de padding/radius */
}
.btn-outline:hover {
  background: var(--color-green);
  color: #fff;
}

/* Ghost (para seções escuras) */
.btn-ghost {
  background: transparent;
  color: #fff;
  border: 1.5px solid rgba(255,255,255,0.4);
}
.btn-ghost:hover {
  border-color: var(--color-gold);
  color: var(--color-gold);
}
```

---

### 5.3 Cards

```css
.card {
  background: var(--color-bg-card);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-gray-border);
  overflow: hidden;
  transition: transform var(--transition-base), box-shadow var(--transition-base);
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

/* Card de ação (Gestão Pública) */
.card-action {
  padding: var(--space-8);
  border-top: 3px solid var(--color-green);
}
.card-action .card-icon {
  width: 48px;
  height: 48px;
  color: var(--color-green);
  margin-bottom: var(--space-4);
}
.card-action h3 {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  color: var(--color-navy);
  margin-bottom: var(--space-2);
}
.card-action p {
  font-size: var(--text-base);
  color: var(--color-gray-text);
  line-height: var(--leading-normal);
}
```

---

### 5.4 Timeline

```css
.timeline { position: relative; padding-left: var(--space-8); }

.timeline::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, var(--color-green), var(--color-navy));
}

.timeline-item { position: relative; margin-bottom: var(--space-8); }

.timeline-dot {
  position: absolute;
  left: calc(-1 * var(--space-8) - 6px);
  top: 6px;
  width: 14px;
  height: 14px;
  border-radius: var(--radius-full);
  background: var(--color-green);
  border: 2px solid var(--color-white-ice);
  box-shadow: 0 0 0 3px var(--color-green);
}

.timeline-year {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: 600;
  color: var(--color-green);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: var(--space-1);
}

.timeline-title {
  font-family: var(--font-display);
  font-size: var(--text-lg);
  color: var(--color-navy);
  margin-bottom: var(--space-1);
}

.timeline-desc {
  font-size: var(--text-sm);
  color: var(--color-gray-text);
}
```

---

### 5.5 Badges

```css
.badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.badge-green  { background: #E6F7F1; color: #0F5F4A; }
.badge-navy   { background: #E8ECF2; color: #0B1F3A; }
.badge-gold   { background: #FBF4E0; color: #8A6E1A; }
.badge-active { background: var(--color-green); color: #fff; }

/* Badge "Em andamento" (pulsante) */
.badge-active::before {
  content: '';
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #fff;
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.6; transform: scale(0.8); }
}
```

---

### 5.6 Formulário de Contato

```html
<form id="contact-form" action="https://formspree.io/f/SEU_ID" method="POST">
  <div class="form-group">
    <label for="name">Nome completo</label>
    <input type="text" id="name" name="name" required
           placeholder="Seu nome">
  </div>
  <div class="form-group">
    <label for="email">E-mail</label>
    <input type="email" id="email" name="email" required
           placeholder="seu@email.com">
  </div>
  <div class="form-group">
    <label for="subject">Assunto</label>
    <select id="subject" name="subject">
      <option value="">Selecione o assunto</option>
      <option value="imprensa">Imprensa</option>
      <option value="parceria">Parceria institucional</option>
      <option value="saude">Saúde pública</option>
      <option value="outro">Outro</option>
    </select>
  </div>
  <div class="form-group">
    <label for="message">Mensagem</label>
    <textarea id="message" name="message" rows="5" required
              placeholder="Sua mensagem..."></textarea>
  </div>
  <button type="submit" class="btn-primary">Enviar mensagem</button>
  <div id="form-status" aria-live="polite"></div>
</form>
```

```css
.form-group { margin-bottom: var(--space-4); }

label {
  display: block;
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-navy);
  margin-bottom: var(--space-2);
}

input, select, textarea {
  width: 100%;
  padding: var(--space-3) var(--space-4);
  border: 1.5px solid var(--color-gray-border);
  border-radius: var(--radius-md);
  font-family: var(--font-body);
  font-size: var(--text-base);
  color: var(--color-gray-text);
  background: var(--color-white);
  transition: border-color var(--transition-base);
}

input:focus, select:focus, textarea:focus {
  outline: none;
  border-color: var(--color-green);
  box-shadow: 0 0 0 3px rgba(31,166,122,0.12);
}

input.error { border-color: #E53E3E; }
```

---

### 5.7 Botão WhatsApp Flutuante

```html
<a href="https://wa.me/55XXXXXXXXXXX?text=Olá%2C%20Fernando%21"
   target="_blank"
   class="whatsapp-fab"
   aria-label="Falar no WhatsApp">
  <!-- Ícone SVG do WhatsApp -->
</a>
```

```css
.whatsapp-fab {
  position: fixed;
  bottom: var(--space-6);
  right: var(--space-6);
  width: 56px;
  height: 56px;
  background: #25D366;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-lg);
  z-index: 900;
  transition: transform var(--transition-bounce);
}
.whatsapp-fab:hover { transform: scale(1.1); }
.whatsapp-fab::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: #25D366;
  animation: whatsapp-pulse 2s ease-out infinite;
  z-index: -1;
}
@keyframes whatsapp-pulse {
  0%   { transform: scale(1); opacity: 0.6; }
  100% { transform: scale(1.6); opacity: 0; }
}
```

---

## 6. Seções — Especificações Detalhadas

### 6.1 Hero

```
ID:            #hero
Min-height:    100vh
Layout:        Split — texto 50% esquerda, foto 50% direita (desktop)
               Coluna única centrada (mobile)
Fundo:         #0B1F3A com grain texture overlay (opacity 0.04)
Foto:          position absolute ou object-fit cover
               Border-radius assimétrico opcional (clip-path)
Animação:      Fade + slide-up em stagger (100ms delay entre elementos)
               IntersectionObserver com animateOnLoad: true
```

**Estrutura HTML:**
```html
<section id="hero">
  <div class="container hero-inner">
    <div class="hero-content">
      <span class="badge badge-green">Secretário Municipal de Saúde</span>
      <h1 class="hero-name">Fernando<br>Wallace</h1>
      <p class="hero-roles">Farmacêutico · Acadêmico de Medicina</p>
      <p class="hero-tagline">
        Cuidar de pessoas, fortalecer a saúde pública<br>
        e transformar gestão em resultado.
      </p>
      <div class="hero-ctas">
        <a href="#sobre" class="btn-ghost">Conheça minha trajetória</a>
        <a href="#gestao" class="btn-outline btn-outline-light">Acompanhe o trabalho</a>
      </div>
    </div>
    <div class="hero-image">
      <img src="assets/images/hero/fernando-wallace.webp"
           alt="Fernando Wallace, Secretário de Saúde de Guapimirim"
           loading="eager" width="560" height="640">
    </div>
  </div>
  <div class="hero-stats">
    <div class="stat"><span class="stat-number">X+</span><span class="stat-label">Anos na saúde pública</span></div>
    <div class="stat"><span class="stat-number">12/12</span><span class="stat-label">Semestres de Medicina</span></div>
    <div class="stat"><span class="stat-number">8ª</span><span class="stat-label">Conferência Municipal de Saúde</span></div>
    <div class="stat"><span class="stat-number">4k+</span><span class="stat-label">Moradores beneficiados</span></div>
  </div>
</section>
```

---

### 6.2 Sobre

```
ID:        #sobre
Layout:    Grid 2 colunas — foto esquerda, texto direita (desktop)
Fundo:     var(--color-white-ice)
Elementos: Foto com borda decorativa dourada · Texto em 1ª pessoa
           Timeline vertical abaixo do texto
```

---

### 6.3 Gestão Pública

```
ID:        #gestao
Layout:    Grid auto-fit 3 colunas (mínimo 280px por card)
Fundo:     var(--color-gray-light)
Cards:     6 cards — cada um com ícone SVG + título + descrição
           Hover: translateY(-4px) + shadow-lg + borda verde
```

**Cards e ícones (SVG inline — Phosphor Icons recomendado):**
```
1. Assistência Farmacêutica    → ícone: pill / pharmacy
2. Nova Clínica de Saúde       → ícone: hospital / building
3. Rede Municipal de Saúde     → ícone: network / flow
4. Conferência Municipal       → ícone: users / community
5. Valorização Profissional    → ícone: award / star
6. Diálogo Institucional       → ícone: handshake / organization
```

---

### 6.4 Formação

```
ID:        #formacao
Layout:    Lista vertical com separadores + grid de badges
Fundo:     var(--color-white)
Elementos: Cards de instituição · Badge "Em andamento" para Medicina
           CRF/RJ em destaque com número · Cursos em lista compacta
```

---

### 6.5 Agenda & Notícias

```
ID:        #noticias
Layout:    Grid 3 colunas (desktop), 2 (tablet), 1 (mobile)
Fundo:     var(--color-gray-light)
Filtros:   Buttons de categoria — Saúde · Gestão · Institucional · Formação
           JS puro: toggle classe .active, filter por data-category
Cards:     Thumbnail (WebP) + categoria badge + título + data + "Leia mais"
           Link para fonte externa (Prefeitura, CRF/RJ, Rede TV Mais)
```

---

### 6.6 Galeria

```
ID:        #galeria
Layout:    CSS Masonry 3 colunas (desktop), 2 (tablet), 1 (mobile)
Fundo:     var(--color-navy)  ← única seção com fundo escuro total
Lightbox:  GLightbox (CDN) ou implementação nativa com <dialog>
           Navegação por teclado (setas), fechamento com ESC
Hover:     Overlay escuro 60% + ícone de zoom + legenda
Imagens:   Todas em WebP, lazy loading (loading="lazy")
```

**Integração GLightbox:**
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/glightbox/dist/css/glightbox.min.css">
<script src="https://cdn.jsdelivr.net/npm/glightbox/dist/js/glightbox.min.js"></script>
<script>
  const lightbox = GLightbox({ touchNavigation: true, loop: true });
</script>
```

---

### 6.7 Contato

```
ID:        #contato
Layout:    Grid 2 colunas — formulário esquerda, info + mapa direita
Fundo:     var(--color-navy)  (seção de fechamento)
Mapa:      Google Maps embed (iframe) — Av. Dedo de Deus, 1161, Guapimirim
Form:      Formspree AJAX (fetch POST, sem redirect de página)
Redes:     Links para Instagram + WhatsApp + e-mail
```

---

## 7. Animações & Interatividade

### 7.1 Reveal on Scroll (IntersectionObserver)

```javascript
// main.js
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
```

```css
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
/* Stagger via delay inline: style="transition-delay: 100ms" */
```

### 7.2 Scroll Suave

```javascript
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
```

### 7.3 Carrossel de Depoimentos

```
Biblioteca: Splide.js (CDN, ~27KB gzip)
Opções:     type: 'loop', autoplay: true, interval: 5000,
            pauseOnHover: true, arrows: false, pagination: true
CDN:        https://cdn.jsdelivr.net/npm/@splidejs/splide@4/dist/
```

### 7.4 Filtro de Notícias

```javascript
// filter.js
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const cat = btn.dataset.filter;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    document.querySelectorAll('.news-card').forEach(card => {
      const show = cat === 'all' || card.dataset.category === cat;
      card.style.display = show ? 'block' : 'none';
    });
  });
});
```

---

## 8. SEO & Meta Tags

### 8.1 Head Completo

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- Primary Meta -->
  <title>Fernando Wallace — Farmacêutico, Acadêmico de Medicina e Secretário de Saúde · Guapimirim/RJ</title>
  <meta name="description" content="Portfólio profissional de Fernando Wallace, farmacêutico, acadêmico de Medicina e Secretário Municipal de Saúde de Guapimirim/RJ. Conheça sua trajetória, ações e gestão na saúde pública.">
  <meta name="keywords" content="Fernando Wallace, Secretário de Saúde Guapimirim, farmacêutico Guapimirim, saúde pública Guapimirim RJ">
  <meta name="author" content="Fernando Wallace">
  <link rel="canonical" href="https://fernandowallace.com.br/">

  <!-- Open Graph -->
  <meta property="og:type"        content="profile">
  <meta property="og:title"       content="Fernando Wallace — Saúde e Gestão Pública">
  <meta property="og:description" content="Farmacêutico, acadêmico de Medicina e Secretário Municipal de Saúde de Guapimirim/RJ.">
  <meta property="og:image"       content="https://fernandowallace.com.br/assets/images/og-image.jpg">
  <meta property="og:url"         content="https://fernandowallace.com.br/">
  <meta property="og:locale"      content="pt_BR">

  <!-- Twitter Card -->
  <meta name="twitter:card"        content="summary_large_image">
  <meta name="twitter:title"       content="Fernando Wallace — Saúde e Gestão Pública">
  <meta name="twitter:description" content="Farmacêutico, acadêmico de Medicina e Secretário Municipal de Saúde de Guapimirim/RJ.">
  <meta name="twitter:image"       content="https://fernandowallace.com.br/assets/images/og-image.jpg">

  <!-- Favicon -->
  <link rel="icon"             type="image/svg+xml" href="/assets/images/logos/favicon.svg">
  <link rel="icon"             type="image/png"     href="/assets/images/logos/favicon-32.png" sizes="32x32">
  <link rel="apple-touch-icon"                      href="/assets/images/logos/apple-touch-icon.png">
  <meta name="theme-color" content="#0B1F3A">

  <!-- Preconnect fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Source+Sans+3:wght@300;400;600&display=swap" rel="stylesheet">

  <!-- CSS -->
  <link rel="stylesheet" href="assets/css/main.css">
  <link rel="stylesheet" href="assets/css/components.css">
  <link rel="stylesheet" href="assets/css/sections.css">
  <link rel="stylesheet" href="assets/css/responsive.css">
</head>
```

### 8.2 Schema.org (JSON-LD)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Fernando Wallace Clemente da Silva",
  "alternateName": "Fernando Wallace",
  "jobTitle": "Secretário Municipal de Saúde",
  "description": "Farmacêutico, acadêmico de Medicina e Secretário Municipal de Saúde de Guapimirim/RJ.",
  "url": "https://fernandowallace.com.br",
  "image": "https://fernandowallace.com.br/assets/images/hero/fernando-wallace.webp",
  "sameAs": [
    "https://www.instagram.com/fernandowallace_oficial/"
  ],
  "worksFor": {
    "@type": "GovernmentOrganization",
    "name": "Secretaria Municipal de Saúde de Guapimirim",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Avenida Dedo de Deus, 1161",
      "addressLocality": "Guapimirim",
      "addressRegion": "RJ",
      "addressCountry": "BR"
    }
  },
  "hasOccupation": [
    {
      "@type": "Occupation",
      "name": "Farmacêutico"
    },
    {
      "@type": "Occupation",
      "name": "Acadêmico de Medicina"
    }
  ]
}
</script>
```

---

## 9. Performance

### 9.1 Imagens

```
Formato:       WebP (com fallback <picture> para PNG/JPG)
Compressão:    Squoosh.app — qualidade 80 para fotos, 90 para UI
Hero:          Pré-carregada com <link rel="preload">
Demais:        loading="lazy" + width/height explícitos (evita layout shift)
Tamanhos hero: 1200w (desktop) · 800w (tablet) · 400w (mobile)
OG Image:      1200×630px JPG (não WebP — compatibilidade)
```

**Implementação com srcset:**
```html
<picture>
  <source type="image/webp"
          srcset="assets/images/hero/fw-400.webp 400w,
                  assets/images/hero/fw-800.webp 800w,
                  assets/images/hero/fw-1200.webp 1200w"
          sizes="(max-width: 768px) 100vw, 50vw">
  <img src="assets/images/hero/fw-800.jpg"
       alt="Fernando Wallace, Secretário de Saúde de Guapimirim"
       width="600" height="720" loading="eager">
</picture>
```

### 9.2 CSS & JS

```
CSS:   Ordem: main → components → sections → responsive
       Sem @import dentro dos arquivos CSS (usar <link> no head)
       Critical CSS inline no <head> para above-the-fold (opcional)

JS:    Todos os scripts no fim do <body> com defer
       Nenhuma biblioteca > 50KB (exceto GLightbox e Splide)
       Sem jQuery
```

### 9.3 .htaccess (Hostinger)

```apache
# Redirect HTTP → HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Compressão Gzip
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css application/javascript image/svg+xml
</IfModule>

# Cache de assets estáticos
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/webp    "access plus 1 year"
  ExpiresByType image/png     "access plus 1 year"
  ExpiresByType text/css      "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>

# Segurança básica
Options -Indexes
Header always set X-Content-Type-Options "nosniff"
Header always set X-Frame-Options "SAMEORIGIN"
```

### 9.4 Metas de Performance

| Métrica | Meta |
|---|---|
| PageSpeed Mobile | ≥ 85 |
| PageSpeed Desktop | ≥ 95 |
| LCP (Largest Contentful Paint) | < 2.5s |
| CLS (Cumulative Layout Shift) | < 0.1 |
| FID / INP | < 200ms |
| Peso total da página (sem cache) | < 1.5MB |

---

## 10. Acessibilidade

```
Idioma:        <html lang="pt-BR">
Foco visível:  outline customizado em todos os elementos interativos
Alt texts:     Todas as imagens com alt descritivo
ARIA:          aria-label em ícones decorativos
               aria-live="polite" no status do formulário
               role="navigation" na navbar
Contraste:     Mínimo AA (4.5:1) — validar com Colour Contrast Analyser
Skip link:     <a href="#main" class="skip-link">Ir para o conteúdo</a>
Teclado:       Lightbox navegável por teclado (setas + ESC)
               Menu mobile acessível com Escape para fechar
```

---

## 11. Integrações Externas

| Serviço | Propósito | Plano |
|---|---|---|
| **Formspree** | Envio do formulário de contato | Free (50 submissions/mês) |
| **Google Analytics 4** | Analytics de visitantes | Free |
| **Google Search Console** | Indexação e SEO | Free |
| **Google Maps Embed** | Mapa da Secretaria | Free |
| **GLightbox** | Lightbox da galeria | Open source (CDN) |
| **Splide.js** | Carrossel de depoimentos | Open source (CDN) |
| **Google Fonts** | Playfair Display + Source Sans 3 | Free |
| **UptimeRobot** | Monitoramento de disponibilidade | Free (5 monitors) |

---

## 12. Checklist de Qualidade — Pré-Deploy

**Visual**
- [ ] Todas as seções renderizam corretamente em 375px, 768px, 1280px e 1920px
- [ ] Nenhum texto cortado ou overflow horizontal
- [ ] Hover states funcionando em todos os cards e botões
- [ ] Animações de entrada ocorrendo corretamente no scroll
- [ ] Lightbox abrindo e navegando corretamente
- [ ] Carrossel de depoimentos funcionando (autoplay + pause no hover)
- [ ] Filtro de notícias funcionando
- [ ] Formulário enviando e exibindo mensagem de sucesso/erro

**SEO**
- [ ] Title tag única e descritiva
- [ ] Meta description entre 150–160 caracteres
- [ ] Open Graph image 1200×630px
- [ ] Schema.org Person validado (schema.org/validator)
- [ ] sitemap.xml gerado e correto
- [ ] robots.txt permitindo crawl

**Performance**
- [ ] Todas as imagens em WebP com fallback
- [ ] Lazy loading nas imagens abaixo do fold
- [ ] PageSpeed ≥ 85 mobile
- [ ] Nenhum recurso bloqueante no <head> além das fontes

**Funcional**
- [ ] Links de navegação scrollam para a seção correta
- [ ] Formulário Formspree recebendo submissões
- [ ] Botão WhatsApp abre com mensagem pré-preenchida
- [ ] Google Maps embed carregando
- [ ] HTTPS funcionando (sem mixed content)

**Acessibilidade**
- [ ] Contraste AA em todos os textos
- [ ] Skip link funcional
- [ ] Lightbox navegável por teclado
- [ ] Alt texts em todas as imagens

---

*Documento gerado por Leal Systems · André Leal — CEO*
*Todos os direitos reservados · Uso interno e apresentação ao cliente · Confidencial*