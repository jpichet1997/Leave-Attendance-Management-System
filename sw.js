const CACHE_NAME = 'hr-os-v3'; // 🚀 เปลี่ยนเป็น v3 เพื่อบังคับให้มือถือรู้ว่ามีอัปเดตใหม่
const urlsToCache = [
    './',
    './index.html',
    './style.css',
    './script.js',
    './manifest.json'
];

// 🛠️ ติดตั้ง Service Worker และจับไฟล์ยัดลง Cache
self.addEventListener('install', event => {
    // 🔥 สั่งให้ Service Worker ตัวใหม่ทำงาน "ทันที" ไม่ต้องรอปิดหน้าเว็บ
    self.skipWaiting(); 
    
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('📦 [Service Worker] Opened cache v3');
            return cache.addAll(urlsToCache);
        })
    );
});

// ⚡ เวลา User เปิดแอป ให้ดึงจาก Cache มาโชว์ก่อน จะได้โหลดไว
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

// 🧹 ล้าง Cache ตัวเก่าทิ้งเวลาอัปเดตเวอร์ชันใหม่
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    
    // 🔥 สั่งให้คุมหน้าเว็บทั้งหมดทันที โดยไม่ต้องรอรีเฟรชหลายรอบ
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