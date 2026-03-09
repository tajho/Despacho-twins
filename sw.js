const CACHE_NAME = 'twins-cache-v12'; // Cambiamos a v12
const urlsToCache = [
  './',
  './index.html?v=12',
  './manifest.json?v=12',
  './icon.png?v=11' // Forzamos la descarga del nuevo logo
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    ))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(res => res || fetch(event.request))
  );
});
