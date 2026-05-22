/* =========================================================
   Service Worker — Fernando Wallace
   Cache-first para assets estáticos, network-first para HTML
   ========================================================= */

const CACHE = 'fw-v1';
const STATIC = [
  '/',
  '/index.html',
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
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(STATIC)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const { request } = e;
  const url = new URL(request.url);

  // Ignora requisições externas (CDN, APIs)
  if (url.origin !== location.origin) return;

  // HTML → network-first (sempre conteúdo fresco)
  if (request.headers.get('accept')?.includes('text/html')) {
    e.respondWith(
      fetch(request).catch(() => caches.match('/index.html'))
    );
    return;
  }

  // Assets → cache-first
  e.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;
      return fetch(request).then(res => {
        if (res.ok) {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(request, clone));
        }
        return res;
      });
    })
  );
});
