importScripts('https://cdn.jsdelivr.net/npm/localforage@1.10.0/dist/localforage.min.js')

const vitesFilesToCache = [
    '/assets/',
    'src/index.js',
    'src/index.css',
];


self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open("prg9-cache").then((cache) => {
      return cache.addAll([
      "/",
      "/index.html",
      "/offline.html",
      vitesFilesToCache,
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  if (url.origin === 'https://cmgt.hr.nl' && url.pathname === '/api/projects') {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const responseClone = response.clone(); // Clone the response before using it
          saveDataToIndexedDB(responseClone);
          return response;
        })
        .catch(() => {
          return loadFromIndexedDB();
        })
    );
  } else if (url.origin === 'https://cmgt.hr.nl' && url.pathname === '/api/tags') {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          return response;
        })
        .catch(() => {
          return new Response(JSON.stringify({ message: 'Online connection is required to fetch tags' }), {
            status: 503,
            headers: { 'Content-type': 'application/json' }
          });
        })
    );
  } else {
    event.respondWith(
      caches.match(event.request)
        .then(response => {
          return response || fetch(event.request);
        })
        .catch(() => {
          return caches.match('/offline.html');
        })
    );
  }
});


function saveDataToIndexedDB(response) {
  const dataStore = localforage.createInstance({
    name: "prg9-storage",
  });

  return response.json().then(data => {
    return Promise.all(data.data.map(project => {
      return dataStore.setItem(`project-${project.project.id}`, project)
        .catch(error => console.error(`Error saving project ${project.project.id} to IndexedDB:`, error));
    }));
  });
}

function loadFromIndexedDB(key) {
  const dataStore = localforage.createInstance({
    name: "prg9-storage",
  });
  return dataStore.keys()
  .then(keys => Promise.all(keys.map(key => dataStore.getItem(key))))
  .then(data => {
    const responseData = {
      data:data,
    };
    return new Response(JSON.stringify(responseData), {
      headers: {"Content-Type": "application/json" },
    });
  })
  .catch(error => {
    console.error("Error loading data from IndexedDB:", error);
    throw error;
  });
}
