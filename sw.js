// Starbyte Quest Service Worker (offline cache)
const CACHE = "starbyte-cache-v7";
const ASSETS = [
  "./",
  "./index.html",
  "./about.html",
  "./style.css",
  "./app.js",
  "./manifest.json",
  "./icon.svg",
  "./logo.svg",
  "./favicon.svg"
];

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await cache.addAll(ASSETS);
    self.skipWaiting();
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map(k => (k !== CACHE) ? caches.delete(k) : null));
    self.clients.claim();
  })());
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  const url = new URL(req.url);
  const isAppShell = url.pathname.endsWith("/index.html") ||
    url.pathname.endsWith("/app.js") ||
    url.pathname.endsWith("/style.css") ||
    url.pathname.endsWith("/manifest.json");
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    if (isAppShell){
      try{
        const fresh = await fetch(req);
        cache.put(req, fresh.clone());
        return fresh;
      }catch{
        const cached = await cache.match(req);
        return cached || caches.match("./");
      }
    }
    const cached = await cache.match(req);
    if (cached) return cached;
    try {
      const fresh = await fetch(req);
      cache.put(req, fresh.clone());
      return fresh;
    } catch (e) {
      return caches.match("./");
    }
  })());
});
