'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function OfflinePage() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    setIsOnline(navigator.onLine);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-direct-dark to-direct-secondary flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        {/* Иконка */}
        <div className="text-6xl mb-6">
          {isOnline ? '✓' : '×'}
        </div>

        {/* Заголовок */}
        <h1 className="text-3xl font-bold mb-4">
          {isOnline ? 'Вы в сети' : 'Нет подключения'}
        </h1>

        {/* Описание */}
        <p className="text-white/70 mb-8">
          {isOnline
            ? 'Ура! Соединение восстановлено.'
            : 'Похоже, у вас нет подключения к интернету. Проверьте соединение и попробуйте снова.'}
        </p>

        {/* Кнопка */}
        {!isOnline && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.reload()}
            className="px-8 py-4 bg-gradient-to-r from-direct-primary to-direct-accent hover:from-direct-primary/90 hover:to-direct-accent/90 text-white font-semibold rounded-xl transition-all"
          >
            Попробовать снова
          </motion.button>
        )}

        {/* Ссылка на главную */}
        <div className="mt-6">
          <a
            href="/"
            className="text-direct-primary hover:underline"
          >
            Вернуться на главную
          </a>
        </div>
      </motion.div>
    </div>
  );
}
