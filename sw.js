/* =========================================================
   Service Worker — Fernando Wallace  v2
   - Precache de assets essenciais + offline.html
   - Navegação: network-first com fallback para cache ou offline.html
   - Assets: cache-first, atualiza em background
   ========================================================= */

const VERSION = 'fw-v2';

const PRECACHE = [
  '/',
  '/index.html',
  '/offline.html',
  '/manifest.json',
  '/assets/css/main.css',
  '/assets/css/components.css',
  '/assets/css/sections.css',
  '/assets/css/responsive.css',
  '/assets/js/main.js',
  '/assets/js/form.js',
  '/assets/js/lightbox.js',
  '/assets/js/carousel.js',
  '/assets/js/filter.js',
  '/assets/images/favicon.svg',
  '/assets/images/hero/fernando-hero.jpg',
];

// ── Install: pré-carrega assets essenciais ────────────────────────
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(VERSION)
      .then(c => c.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

// ── Activate: limpa caches antigos ───────────────────────────────
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== VERSION).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// ── Fetch ─────────────────────────────────────────────────────────
self.addEventListener('fetch', e => {
  const { request } = e;
  const url = new URL(request.url);

  // Ignora requisições externas (CDNs, APIs, Formspree)
  if (url.origin !== location.origin) return;

  // Navegação HTML: network-first → cache → offline.html
  if (request.mode === 'navigate') {
    e.respondWith(
      fetch(request)
        .then(res => {
          if (res.ok) {
            caches.open(VERSION).then(c => c.put(request, res.clone()));
          }
          return res;
        })
        .catch(() =>
          caches.match(request)
            .then(cached => cached || caches.match('/offline.html'))
        )
    );
    return;
  }

  // Assets estáticos: cache-first → network (e armazena no cache)
  e.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;
      return fetch(request).then(res => {
        if (res.ok) {
          caches.open(VERSION).then(c => c.put(request, res.clone()));
        }
        return res;
      });
    })
  );
});
