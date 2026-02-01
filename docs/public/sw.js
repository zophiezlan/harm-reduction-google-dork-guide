// Harm Reduction Dork Guide Service Worker
const CACHE_NAME = "harm-reduction-dork-guide-v1";
const STATIC_ASSETS = [
  "/",
  "/explorer",
  "/builder",
  "/01-quick-start",
  "/02-core-operators",
  "/03-advanced-operators",
  "/04-domain-map",
  "/05-synonym-blocks",
  "/dork-explorer/dork-data.js",
];

// Install event - cache static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Caching static assets");
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener("fetch", (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // Skip POST requests
  if (event.request.method !== "GET") {
    return;
  }

  // For Google searches, always use network
  if (event.request.url.includes("google.com")) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Return cached response if available
      if (cachedResponse) {
        // Fetch updated version in background
        fetch(event.request)
          .then((response) => {
            if (response.ok) {
              return caches.open(CACHE_NAME).then((cache) => {
                return cache.put(event.request, response).then(() => {
                  console.log("[SW] Background cache updated for", event.request.url);
                });
              });
            }
          })
          .catch((error) => {
            console.error("[SW] Background update failed for", event.request.url, error);
          });
        return cachedResponse;
      }

      // Otherwise fetch from network
      return fetch(event.request)
        .then((response) => {
          // Cache successful responses
          if (response.ok) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          // Return offline page for navigation requests
          if (event.request.mode === "navigate") {
            return caches.match("/");
          }
          return new Response("Offline", { status: 503 });
        });
    })
  );
});

// Handle messages from the main thread
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
