importScripts('https://cdn.jsdelivr.net/npm/localforage@1.10.0/dist/localforage.min.js')

const cacheName = 'programmeren9-cache-v1';

const cacheFiles = [
    'src/index.js',
    'src/index.css',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(cacheFiles);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request).then((response) => {
        // Cache the fetched response for future use
        caches.open(cacheName).then((cache) => {
          cache.put(event.request, response.clone());
        });
        return response;
      });
    })
  );
});

function saveToIndexedDB(key, value) {
  return localforage.setItem(key, value);
}

function getFromIndexedDB(key) {
  return localforage.getItem(key);
}
