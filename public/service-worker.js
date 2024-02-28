importScripts('https://cdn.jsdelivr.net/npm/localforage@1.10.0/dist/localforage.min.js')

const cacheName = 'programmeren9-cache-v1';

const cacheFiles = [
    'src/index.js',
    'src/index.css',
];


self.addEventListener('install', (event) => {
  // Voeg caching strategieën toe tijdens de installatie
});

self.addEventListener('fetch', (event) => {
  // Implementeer caching strategieën tijdens fetch events
});

function saveToIndexedDB(key, value) {
  // Gebruik LocalForage om gegevens op te slaan in IndexedDB
  localforage.setItem(key, value);
}

function getFromIndexedDB(key) {
  // Gebruik LocalForage om gegevens op te halen uit IndexedDB
  return localforage.getItem(key);
}
