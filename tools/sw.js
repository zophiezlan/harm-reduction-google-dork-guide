/**
 * Service Worker for Needle
 * Provides offline support for the application
 */

const CACHE_NAME = "needle-guide-v1";
const STATIC_CACHE = "needle-static-v1";
const DATA_CACHE = "needle-data-v1";

// Core assets to cache on install
const PRECACHE_ASSETS = [
  "/",
  "/explorer",
  "/builder",
  "/README",
  "/manifest.json",
  "/dork-explorer/dork-data.js",
];

// Install event - cache core assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      console.log("[SW] Pre-caching static assets");
      return cache.addAll(
        PRECACHE_ASSETS.map((url) => new Request(url, { cache: "reload" })),
      );
    }),
  );
  // Activate immediately
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => {
            return (
              name.startsWith("needle-") &&
              name !== STATIC_CACHE &&
              name !== DATA_CACHE
            );
          })
          .map((name) => {
            console.log("[SW] Deleting old cache:", name);
            return caches.delete(name);
          }),
      );
    }),
  );
  // Take control of all pages immediately
  self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== "GET") return;

  // Skip cross-origin requests (e.g., Google search)
  if (url.origin !== self.location.origin) return;

  // Handle dork-data.js specially - cache but check for updates
  if (url.pathname.endsWith("dork-data.js")) {
    event.respondWith(staleWhileRevalidate(request, DATA_CACHE));
    return;
  }

  // For page navigations, use network-first strategy
  if (request.mode === "navigate") {
    event.respondWith(networkFirst(request, STATIC_CACHE));
    return;
  }

  // For static assets, use cache-first strategy
  event.respondWith(cacheFirst(request, STATIC_CACHE));
});

/**
 * Cache-first strategy
 * Try cache first, fall back to network
 */
async function cacheFirst(request, cacheName) {
  const cached = await caches.match(request);
  if (cached) return cached;

  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.log("[SW] Network request failed:", error);
    return new Response("Offline", { status: 503 });
  }
}

/**
 * Network-first strategy
 * Try network first, fall back to cache
 */
async function networkFirst(request, cacheName) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.log("[SW] Network failed, trying cache:", request.url);
    const cached = await caches.match(request);
    if (cached) return cached;

    // Return offline page for navigation requests
    if (request.mode === "navigate") {
      return new Response(
        `<!DOCTYPE html>
        <html>
        <head>
          <title>Offline - Needle</title>
          <style>
            body { font-family: system-ui; text-align: center; padding: 40px; }
            h1 { color: #10b981; }
          </style>
        </head>
        <body>
          <h1>You're Offline</h1>
          <p>Needle is not available offline for this page.</p>
          <p>Please check your internet connection and try again.</p>
        </body>
        </html>`,
        {
          status: 503,
          headers: { "Content-Type": "text/html" },
        },
      );
    }

    return new Response("Offline", { status: 503 });
  }
}

/**
 * Stale-while-revalidate strategy
 * Return cached version immediately, but fetch and cache update in background
 */
async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  // Fetch in background regardless
  const fetchPromise = fetch(request)
    .then((response) => {
      if (response.ok) {
        cache.put(request, response.clone());
      }
      return response;
    })
    .catch((error) => {
      console.log("[SW] Background fetch failed:", error);
      return null;
    });

  // Return cached if available, otherwise wait for network
  return cached || fetchPromise;
}
