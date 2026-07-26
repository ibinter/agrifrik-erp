const CACHE_VERSION = "agrifrik-v3";
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const DATA_CACHE = `${CACHE_VERSION}-data`;
const OFFLINE_URL = "/offline";

// Assets statiques à précacher
const PRECACHE_ASSETS = [
  "/",
  "/offline",
  "/dashboard",
  "/manifest.json",
  "/favicon.ico",
];

// Install : précacher les assets statiques
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => cache.addAll(PRECACHE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate : nettoyer les anciens caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((k) => k !== STATIC_CACHE && k !== DATA_CACHE)
            .map((k) => caches.delete(k))
        )
      )
      .then(() => self.clients.claim())
  );
});

// Fetch : stratégies adaptées
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Ignorer les requêtes cross-origin
  if (url.origin !== self.location.origin) return;

  // Ignorer les requêtes non-GET
  if (request.method !== "GET") return;

  // API routes : network-first avec fallback cache puis réponse JSON offline
  if (url.pathname.startsWith("/api/")) {
    event.respondWith(
      fetch(request)
        .then((res) => {
          if (res.ok) {
            const clone = res.clone();
            caches.open(DATA_CACHE).then((cache) => cache.put(request, clone));
          }
          return res;
        })
        .catch(() =>
          caches.match(request).then(
            (cached) =>
              cached ??
              new Response(
                JSON.stringify({
                  error: "Hors ligne — données non disponibles",
                  offline: true,
                }),
                {
                  headers: { "Content-Type": "application/json" },
                  status: 503,
                }
              )
          )
        )
    );
    return;
  }

  // Assets Next.js (_next/static) et fichiers statiques : cache-first
  if (
    url.pathname.startsWith("/_next/static/") ||
    url.pathname.match(/\.(js|css|png|jpg|jpeg|svg|ico|woff2?)$/)
  ) {
    event.respondWith(
      caches.match(request).then(
        (cached) =>
          cached ??
          fetch(request).then((res) => {
            if (res.ok) {
              caches
                .open(STATIC_CACHE)
                .then((cache) => cache.put(request, res.clone()));
            }
            return res;
          })
      )
    );
    return;
  }

  // Pages HTML : network-first avec mise en cache, fallback cache puis /offline
  event.respondWith(
    fetch(request)
      .then((res) => {
        if (res.ok) {
          caches
            .open(STATIC_CACHE)
            .then((cache) => cache.put(request, res.clone()));
        }
        return res;
      })
      .catch(async () => {
        const cached = await caches.match(request);
        if (cached) return cached;
        const offlinePage = await caches.match(OFFLINE_URL);
        return (
          offlinePage ??
          new Response("Hors ligne", {
            status: 503,
            headers: { "Content-Type": "text/plain" },
          })
        );
      })
  );
});

// Background sync pour les formulaires hors-ligne
self.addEventListener("sync", (event) => {
  if (event.tag === "sync-pending-forms") {
    event.waitUntil(syncPendingForms());
  }
});

async function syncPendingForms() {
  // Lire depuis IndexedDB les formulaires en attente et les envoyer
  console.log("[SW] Synchronisation des formulaires hors-ligne...");
}

// Messages du client (ex: demande de mise à jour)
self.addEventListener("message", (event) => {
  if (event.data?.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
