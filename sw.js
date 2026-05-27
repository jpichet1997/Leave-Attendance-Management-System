const CACHE_NAME = 'hr-os-v7'; // bump cache to force fresh assets
const urlsToCache = [
    './',
    './index.html',
    './style.css?v=20260527-2252',
    './script.js?v=20260527-2252',
    './manifest.json'
];

// 
self.addEventListener('install', event => {
    //  
    self.skipWaiting(); 
    
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log(' [Service Worker] Opened cache v3');
            return cache.addAll(urlsToCache);
        })
    );
});

// 
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            if (response) {
                return response; 
            }
            return fetch(event.request); 
        })
    );
});

//  ล้าง Cache ตัวเก่า
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(self.clients.claim()); 
    
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        console.log('🗑️ [Service Worker] Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});