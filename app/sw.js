const CACHE = 'noteApp';
const cacheable = [
    './',
    './index.html',
    './sw.js',
    './script.js',
    './manifest.json',
    './img/192.png',
    './style.css',
];

async function updateCache(request) {
    const c = await caches.open(CACHE);
    const response = await fetch(request);
    return c.put(request, response);
}

async function handleFetch(request) {
    const c = await caches.open(CACHE);
    const cachedCopy = await c.match(request);
    return cachedCopy || Promise.reject(new Error('no-match'));
}

function interceptFetch(evt) {
    evt.respondWith(handleFetch(evt.request));
    evt.waitUntil(updateCache(evt.request));
}

async function prepareCache(evt) {
    const c = await caches.open(CACHE);
    c.addAll(cacheable);
}

self.addEventListener('install', prepareCache);
self.addEventListener('fetch', interceptFetch);