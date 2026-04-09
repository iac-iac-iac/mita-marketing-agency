'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Логируем ошибку в Sentry (если настроен)
    console.error('Unhandled error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-direct-dark flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Иконка ошибки */}
        <div className="mb-6">
          <div className="w-20 h-20 mx-auto rounded-full bg-red-500/20 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
        </div>

        {/* Заголовок */}
        <h1 className="text-3xl font-bold text-white mb-3">
          Что-то пошло не так
        </h1>

        {/* Описание */}
        <p className="text-gray-300 mb-8 leading-relaxed">
          Произошла непредвиденная ошибка. Пожалуйста, попробуйте обновить страницу или вернитесь позже.
        </p>

        {/* Кнопки действий */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-gradient-to-r from-direct-primary to-direct-accent hover:from-direct-primary/90 hover:to-direct-accent/90 text-white font-semibold rounded-xl shadow-lg transition-all"
          >
            Попробовать снова
          </button>
          <a
            href="/"
            className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all"
          >
            На главную
          </a>
        </div>

        {/* Код ошибки (для разработчиков) */}
        {process.env.NODE_ENV === 'development' && error && (
          <details className="mt-8 text-left">
            <summary className="text-sm text-gray-400 cursor-pointer hover:text-gray-300">
              Показать детали ошибки (development)
            </summary>
            <pre className="mt-2 p-4 bg-black/50 rounded-lg text-xs text-red-300 overflow-auto">
              {error.message}
              {error.stack && `\n\n${error.stack}`}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}
