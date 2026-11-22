/* Autor: Sandro Pereira (smpsandro1239) */
/* Service Worker: cache local assets and provide an offline fallback. */

const CACHE_NAME = 'sandro-portfolio-v7';
const ASSETS_TO_CACHE = [
  '',
  'index.html',
  'projetos.html',
  'css/main.css',
  'css/case-studies.css',
  'js/main.js',
  'js/theme-manager.js',
  'js/navigation.js',
  'js/animation-controller.js',
  'js/github-api.js',
  'js/i18n.js',
  'js/github-stats.js',
  'manifest.json',
  'robots.txt',
  'sitemap.xml'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => Promise.all(
        cacheNames
          .filter(cacheName => cacheName !== CACHE_NAME)
          .map(cacheName => caches.delete(cacheName))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const request = event.request;
  const requestUrl = new URL(request.url);

  /* Do not intercept writes or third-party requests such as GitHub stats. */
  if (request.method !== 'GET' || requestUrl.origin !== self.location.origin) {
    return;
  }

  event.respondWith(
    fetch(request)
      .then(async response => {
        if (response.ok && response.type === 'basic') {
          const responseToCache = response.clone();
          await caches.open(CACHE_NAME)
            .then(cache => cache.put(request, responseToCache));
        }
        return response;
      })
      .catch(async () => {
        const cache = await caches.open(CACHE_NAME);
        const cachedResponse = await cache.match(request);

        if (cachedResponse) {
          return cachedResponse;
        }

        if (request.mode === 'navigate') {
          const offlinePage = await cache.match('index.html');
          if (offlinePage) {
            return offlinePage;
          }
        }

        return new Response('Conteúdo indisponível sem ligação à Internet.', {
          status: 503,
          statusText: 'Service Unavailable',
          headers: { 'Content-Type': 'text/plain; charset=utf-8' }
        });
      })
  );
});
