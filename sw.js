// Starbyte Quest Service Worker (offline cache)
const CACHE = "starbyte-cache-v9";
const ASSETS = [
  "./",
  "./index.html",
  "./about.html",
  "./style.css",
  "./kids-ui.css",
  "./ui.js",
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
    await Promise.all(keys.map(k => (k.startsWith("starbyte-cache-") && k !== CACHE) ? caches.delete(k) : null));
    self.clients.claim();
  })());
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  const url = new URL(req.url);
  if (req.method !== "GET" || url.origin !== self.location.origin) return;
  const isAppShell = req.mode === "navigate" || url.pathname.endsWith("/") || url.pathname.endsWith("/index.html") ||
    url.pathname.endsWith("/app.js") ||
    url.pathname.endsWith("/style.css") ||
    url.pathname.endsWith("/kids-ui.css") ||
    url.pathname.endsWith("/ui.js") ||
    url.pathname.endsWith("/manifest.json");
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    if (isAppShell){
      try{
        const fresh = await fetch(req);
        if (fresh.ok) await cache.put(req, fresh.clone());
        return fresh;
      }catch{
        const cached = await cache.match(req);
        return cached || (req.mode === "navigate" ? await cache.match("./index.html") : null) || Response.error();
      }
    }
    const cached = await cache.match(req);
    if (cached) return cached;
    try {
      const fresh = await fetch(req);
      if (fresh.ok) await cache.put(req, fresh.clone());
      return fresh;
    } catch (e) {
      return Response.error();
    }
  })());
});
