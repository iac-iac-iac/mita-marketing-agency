'use client';

import { useEffect } from 'react';

export default function ServiceWorkerRegistration() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((registration) => {
            console.log('[SW] Service Worker зарегистрирован:', registration.scope);
          })
          .catch((error) => {
            console.error('[SW] Ошибка регистрации Service Worker:', error);
          });
      });
    }
  }, []);

  return null;
}
