/**
 * Service Worker Registration
 * Registers the service worker for offline support
 */

(function () {
  "use strict";

  if ("serviceWorker" in navigator) {
    // Get base path from meta tag (set by VitePress config)
    const baseMeta = document.querySelector('meta[name="app-base"]');
    const base = baseMeta ? baseMeta.getAttribute("content") : "/";

    window.addEventListener("load", function () {
      navigator.serviceWorker
        .register(base + "sw.js", { scope: base })
        .then(function (registration) {
          console.log("[SW] Registered with scope:", registration.scope);

          // Check for updates periodically
          registration.addEventListener("updatefound", function () {
            const newWorker = registration.installing;
            console.log("[SW] New version installing...");

            newWorker.addEventListener("statechange", function () {
              if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
                // New version available
                console.log("[SW] New version available");
                // Optionally notify user of update
                if (window.dispatchEvent) {
                  window.dispatchEvent(new CustomEvent("sw-update-available"));
                }
              }
            });
          });
        })
        .catch(function (error) {
          console.log("[SW] Registration failed:", error);
        });
    });
  }
})();
