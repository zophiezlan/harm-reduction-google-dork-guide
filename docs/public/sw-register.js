// Service Worker Registration
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    const base =
      document
        .querySelector('meta[name="app-base"]')
        ?.getAttribute("content") || "/";
    const normalizedBase = base.endsWith("/") ? base : `${base}/`;
    const swUrl = new URL(`${normalizedBase}sw.js`, window.location.origin);

    navigator.serviceWorker
      .register(swUrl.toString())
      .then(() => console.log("Service Worker registered"))
      .catch((err) => console.log("Service Worker registration failed:", err));
  });
}
