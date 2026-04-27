/**
 * Service Worker for M.I.T.A. PWA
 * Offline shell only: precache /, /offline, manifest. All other requests use the
 * browser default (no interception) so Next.js RSC prefetch, images, and assets
 * never hit the old cache-first + synthetic 503 path.
 */

const STATIC_CACHE = 'static-v4';

const STATIC_ASSETS = ['/', '/offline', '/manifest.json'];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(STATIC_CACHE).then(function (cache) {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys
          .filter(function (key) {
            return key !== STATIC_CACHE;
          })
          .map(function (key) {
            return caches.delete(key);
          })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function (event) {
  var request = event.request;
  var url = new URL(request.url);

  if (url.origin !== location.origin) {
    return;
  }

  if (request.mode !== 'navigate') {
    return;
  }

  event.respondWith(
    fetch(request).catch(function () {
      return caches.match('/offline');
    })
  );
});

self.addEventListener('push', function (event) {
  var data = event.data ? event.data.json() : {};
  var title = data.title || 'M.I.T.A.';
  var body = data.body || '';
  var icon = data.icon || '/images/icons/Favicon.ico';

  event.waitUntil(
    self.registration.showNotification(title, {
      body: body,
      icon: icon,
      badge: '/images/icons/Favicon.ico',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1,
      },
    })
  );
});

self.addEventListener('notificationclick', function (event) {
  event.waitUntil(self.clients.openWindow('/'));
});
