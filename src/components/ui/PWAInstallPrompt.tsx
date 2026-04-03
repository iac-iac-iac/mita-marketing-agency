'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import usePWA from '@/lib/hooks/usePWA';

const STORAGE_KEY = 'pwa-install-dismissed';

/**
 * Компонент кнопки установки PWA
 * - Показывается через 30 секунд
 * - Если пользователь закрыл или нажал "Позже" — больше не появляется
 */
export default function PWAInstallPrompt() {
  const { canInstall, install, isInstalled } = usePWA();
  const [isVisible, setIsVisible] = useState(false);

  // Проверяем, закрывал ли пользователь уведомление ранее
  const isDismissed = typeof window !== 'undefined' && localStorage.getItem(STORAGE_KEY);

  // Показываем кнопку через 30 секунд (только если не закрывалось ранее)
  useEffect(() => {
    if (canInstall && !isInstalled && !isDismissed) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 30000);

      return () => clearTimeout(timer);
    }
  }, [canInstall, isInstalled, isDismissed]);

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, 'true');
    setIsVisible(false);
  };

  const handleInstall = () => {
    install();
    dismiss();
  };

  const handleLater = () => {
    dismiss();
  };

  if (!canInstall || isInstalled || isDismissed) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          className="fixed bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-auto md:w-96 z-50"
        >
          <div className="glass p-4 rounded-2xl shadow-2xl">
            <div className="flex items-start gap-3">
              {/* Контент */}
              <div className="flex-1">
                <h3 className="font-semibold mb-1">
                  Установите приложение М.И.Т.А.
                </h3>
                <p className="text-sm text-white/70 mb-3">
                  Быстрый доступ к нашим услугам прямо с рабочего стола
                </p>

                {/* Кнопки */}
                <div className="flex gap-2">
                  <button
                    onClick={handleInstall}
                    className="flex-1 py-2 bg-direct-primary hover:bg-direct-primary/90 text-white text-sm font-medium rounded-lg transition-colors"
                  >
                    Установить
                  </button>
                  <button
                    onClick={handleLater}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-lg transition-colors"
                  >
                    Позже
                  </button>
                </div>
              </div>

              {/* Кнопка закрытия */}
              <button
                onClick={dismiss}
                className="text-white/60 hover:text-white transition-colors"
              >
                ×
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
