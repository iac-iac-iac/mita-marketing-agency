'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Ошибка входа');
      }

      // Токен теперь хранится в HTTP-only cookie (устанавливается сервером)
      // Перенаправляем на страницу, с которой пришли, или в блог
      const from = searchParams.get('from') || '/admin/blog';
      router.push(from);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка входа');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-direct-dark to-direct-secondary flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Заголовок */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            М.И.Т.А. Admin
          </h1>
          <p className="text-gray-400">
            Введите пароль для доступа к админ-панели
          </p>
        </div>

        {/* Форма входа */}
        <div className="glass p-8 rounded-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Поле пароля */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white/90 mb-2">
                Пароль
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-direct-primary/50 focus:border-transparent transition-all"
                placeholder="Введите пароль"
                autoComplete="current-password"
              />
            </div>

            {/* Сообщение об ошибке */}
            {error && (
              <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-300 text-sm">
                {error}
              </div>
            )}

            {/* Кнопка входа */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-gradient-to-r from-direct-primary to-direct-accent hover:from-direct-primary/90 hover:to-direct-accent/90 text-white font-semibold rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isLoading ? 'Вход...' : 'Войти'}
            </button>
          </form>

          {/* Подсказка */}
          <div className="mt-6 text-center text-sm text-gray-400">
            <p className="text-xs">
              🔒 Пароль хранится в .env.local
            </p>
          </div>
        </div>

        {/* Ссылка на главную */}
        <div className="mt-6 text-center">
          <a
            href="/"
            className="text-direct-primary hover:underline text-sm"
          >
            ← Вернуться на главную
          </a>
        </div>
      </div>
    </div>
  );
}
