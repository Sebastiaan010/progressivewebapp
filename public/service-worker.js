importScripts('https://cdn.jsdelivr.net/npm/localforage/dist/localforage.min.js');

const cacheName = 'programmeren9-cache-v1';

const cacheFiles = [
    'src/index.js',
    'src/index.css',
];

self.addEventListener('install', (event) => {
  // Voeg caching strategieën toe tijdens de installatie
});

self.addEventListener('fetch', (event) => {
  const request = event.request;

  // Voeg caching strategieën toe tijdens fetch events
  event.respondWith(
    fetch(request).then((response) => {
      // CacheFirstThenNetwork strategie
      if (response.status === 200) {
        const responseClone = response.clone();

        // Cache de response in de cache
        caches.open('app-cache').then((cache) => {
          cache.put(request, responseClone);
        });

        return response;
      }
    }).catch(() => {
      // NetworkFirstThenCache strategie
      return caches.match(request).then((cachedResponse) => {
        return cachedResponse || fetch(request).then((response) => {
          const responseClone = response.clone();

          // Sla de response op in de cache
          caches.open('app-cache').then((cache) => {
            cache.put(request, responseClone);
          });

          return response;
        });
      });
    })
  );
});

function saveToIndexedDB(key, value) {
  // Gebruik LocalForage om gegevens op te slaan in IndexedDB
  localforage.setItem(key, value);
}

function getFromIndexedDB(key) {
  // Gebruik LocalForage om gegevens op te halen uit IndexedDB
  return localforage.getItem(key);
}