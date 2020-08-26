const cache_app = "searchgit";
const assets = [
    "/",
    "/main.html",
    "/manifest.json",
    "/css/style.css",
    "/js/install.js",
    "/js/main.js"
];

self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
    e.waitUntil(
      caches.open(cache_app).then((cache) => {
            console.log('[Service Worker] Caching all: app shell and content');
        return cache.addAll(assets);
      })
    );
  });

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then(res => {
            return res || fetch(fetchEvent.request)
        })
    )
})

self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== cache_app) {
                    return caches.delete(key);
                }
            }));
        })
    );
});