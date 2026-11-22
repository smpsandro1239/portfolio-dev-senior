/* Autor: Sandro Pereira (smpsandro1239) */
/* Projeto: portfolio-dev-senior – Portfólio vanilla sênior elite 2026 */

const CACHE_NAME = 'sandro-portfolio-v2';
const ASSETS_TO_CACHE = [
  '',
  'index.html',
  'css/main.css',
  'js/main.js',
  'js/theme-manager.js',
  'js/navigation.js',
  'js/animation-controller.js',
  'js/github-api.js',
  'js/i18n.js',
  'js/github-stats.js',
  'manifest.json'
];

// Install Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Service Worker: Caching assets...');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Service Worker: Clearing old cache...');
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch Strategy: Stale-While-Revalidate
self.addEventListener('fetch', (event) => {
  // Ignore external API requests for GitHub (let them handle their own cache/rate limiting)
  if (event.request.url.includes('api.github.com')) {
    return;
  }

  event.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(event.request).then((response) => {
        const fetchPromise = fetch(event.request).then((networkResponse) => {
          // Only cache valid GET responses
          if (event.request.method === 'GET' && networkResponse.status === 200) {
            cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        }).catch(() => {
          // Fallback if network fails and cache is empty
          if (event.request.mode === 'navigate') {
            return cache.match('index.html');
          }
        });

        return response || fetchPromise;
      });
    })
  );
});
