/**
 * Legacy cleanup: previous SW versions intercepted fetches and could surface 503 for
 * media and Next image URLs. This script only unregisters itself and clears caches.
 * The app no longer registers a service worker (see root layout).
 */
self.addEventListener('install', function () {
  self.skipWaiting();
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (key) { return caches.delete(key); }));
    }).then(function () {
      return self.registration.unregister();
    })
  );
});
