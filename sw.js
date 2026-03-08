const CACHE_NAME = 'twins-cache-v2';

// Lista de archivos que la app guardará para funcionar sin internet
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon.png?v=2', // Forzamos la descarga del nuevo logo de Twins
  'https://unpkg.com/@phosphor-icons/web',
  'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap'
];

// Instalación del Service Worker y almacenamiento en caché
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Cache abierto: Guardando logo de Twins');
      return cache.addAll(urlsToCache);
    })
  );
});

// Activación y limpieza de versiones antiguas de caché
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Borrando caché antigua');
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Respuesta a las peticiones (permite que la app cargue rápido)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
