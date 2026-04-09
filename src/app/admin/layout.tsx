'use client';

import { useState, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  // Выход из админки
  const handleLogout = useCallback(async () => {
    setIsLoading(true);
    // Удаляем cookie через API endpoint
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
    } catch {
      // Игнорируем ошибки при выходе
    }
    router.push('/admin/login');
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-direct-dark flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-direct-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">Выход...</p>
        </div>
      </div>
    );
  }

  // middleware.ts проверяет аутентификацию, поэтому если мы здесь — пользователь авторизован
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-direct-dark">
      {/* Верхняя панель */}
      <header className="bg-direct-secondary border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold text-white">
                М.И.Т.А. Admin
              </h1>
              <nav className="hidden md:flex items-center gap-4">
                <a href="/admin/blog" className="text-white/70 hover:text-white transition-colors">Блог</a>
                <a href="/admin/cases" className="text-white/70 hover:text-white transition-colors">Кейсы</a>
                <a href="/admin/testimonials" className="text-white/70 hover:text-white transition-colors">Отзывы</a>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <a
                href="/"
                className="text-white/70 hover:text-white transition-colors text-sm"
              >
                На сайт
              </a>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-sm"
              >
                Выйти
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Контент */}
      <main>{children}</main>
    </div>
  );
}
