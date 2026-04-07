const CACHE_NAME = 'hr-os-v2';
const urlsToCache = [
    './',
    './index.html',
    './style.css',
    './script.js',
    './manifest.json'
];

// 🛠️ ติดตั้ง Service Worker และจับไฟล์ยัดลง Cache
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('📦 [Service Worker] Opened cache');
            return cache.addAll(urlsToCache);
        })
    );
});

// ⚡ เวลา User เปิดแอป ให้ดึงจาก Cache มาโชว์ก่อน จะได้โหลดไวระดับเสี้ยววินาที
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            if (response) {
                return response; // ถ้าเจอใน Cache ให้เอาไปโชว์เลย
            }
            return fetch(event.request); // ถ้าไม่เจอ ค่อยไปโหลดจากเซิร์ฟเวอร์
        })
    );
});

// 🧹 ล้าง Cache ตัวเก่าทิ้งเวลาอัปเดตเวอร์ชั่นใหม่
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});