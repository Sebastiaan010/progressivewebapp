importScripts('https://cdn.jsdelivr.net/npm/localforage@1.10.0/dist/localforage.min.js')

const cacheName = 'programmeren9-cache-v1';

const cacheFiles = [
    'src/index.js',
    'src/index.css',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll([
      "/",
      "/index.html",
      "/offline.html",
      ]);
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

        // Save the project data to IndexedDB (example for /api/projects endpoint)
        if (event.request.url.includes('/api/projects')) {
          response.json().then((data) => {
            data.forEach((project) => {
              saveToIndexedDB(project.id, project);
            });
          });
        }

        return response;
      });
    }).catch(() => {
      // Try to get data from IndexedDB if the network request fails (example for /api/projects endpoint)
      if (event.request.url.includes('/api/projects')) {
        return getFromIndexedDB(event.request.url);
      }

      // If the request is not for /api/projects, return an offline page
      return caches.match('/offline.html');
    })
  );
});


function saveToIndexedDB(key, value) {
  return localforage.setItem(key, value);
}

function getFromIndexedDB(key) {
  return localforage.getItem(key);
}
