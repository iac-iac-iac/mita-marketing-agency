/**
 * Service Worker для Direct-line PWA
 * Кэширование ресурсов и offline режим
 */

const CACHE_NAME = 'direct-line-v1';
const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';

// Ресурсы для кэширования при установке
const STATIC_ASSETS = [
  '/',
  '/offline',
  '/manifest.json',
  '/images/icons/Favicon.ico',
];

// Установка Service Worker
self.addEventListener('install', (event: ExtendableEvent) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      console.log('[SW] Кэширование статических ресурсов');
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// Активация Service Worker
self.addEventListener('activate', (event: ExtendableEvent) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== STATIC_CACHE && key !== DYNAMIC_CACHE)
          .map((key) => {
            console.log('[SW] Удаление старого кэша:', key);
            return caches.delete(key);
          })
      );
    })
  );
  self.clients.claim();
});

// Перехват запросов
self.addEventListener('fetch', (event: FetchEvent) => {
  const { request } = event;
  const url = new URL(request.url);

  // Только для same-origin запросов
  if (url.origin !== location.origin) {
    return;
  }

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        // Возвращаем из кэша
        return cachedResponse;
      }

      // Загружаем из сети
      return fetch(request).then((networkResponse) => {
        // Кэшируем успешные ответы
        if (networkResponse && networkResponse.status === 200) {
          const responseClone = networkResponse.clone();
          caches.open(DYNAMIC_CACHE).then((cache) => {
            cache.put(request, responseClone);
          });
        }
        return networkResponse;
      }).catch(() => {
        // Offline: возвращаем offline страницу для навигации
        if (request.mode === 'navigate') {
          return caches.match('/offline');
        }
        // Для остальных ресурсов возвращаем пустой ответ
        return new Response('Offline', { status: 503 });
      });
    })
  );
});

// Обработка push-уведомлений
self.addEventListener('push', (event: PushEvent) => {
  const data = event.data?.json() ?? {};
  const { title, body, icon } = data;

  event.waitUntil(
    self.registration.showNotification(title, {
      body,
      icon,
      badge: '/images/icons/Favicon.ico',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1,
      },
    })
  );
});

// Обработка клика по уведомлению
self.addEventListener('notificationclick', (event: ExtendableEvent) => {
  event.waitUntil(
    self.clients.openWindow('/')
  );
});
