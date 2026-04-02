'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAllCases, deleteCase, type Case } from '@/lib/cms/storage';

export default function AdminCasesPage() {
  const router = useRouter();
  const [cases, setCases] = useState<Case[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loaded = getAllCases();
    loaded.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    setCases(loaded);
    setIsLoading(false);
  }, []);

  const handleDelete = (slug: string) => {
    if (confirm(`Удалить кейс "${slug}"?`)) {
      deleteCase(slug);
      setCases(cases.filter(c => c.slug !== slug));
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-direct-dark flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-direct-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">Загрузка...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Управление кейсами
          </h1>
          <p className="text-gray-400">
            Создание, редактирование и удаление кейсов
          </p>
        </div>
        <button
          onClick={() => router.push('/admin/cases/new')}
          className="px-6 py-3 bg-gradient-to-r from-direct-primary to-direct-accent hover:from-direct-primary/90 hover:to-direct-accent/90 text-white font-semibold rounded-xl shadow-lg transition-all"
        >
          + Новый кейс
        </button>
      </div>

      {/* Table */}
      {cases.length === 0 ? (
        <div className="glass p-12 rounded-2xl text-center">
          <p className="text-gray-400 mb-4">Пока нет кейсов</p>
          <button
            onClick={() => router.push('/admin/cases/new')}
            className="px-6 py-3 bg-direct-primary hover:bg-direct-primary/90 text-white font-medium rounded-xl transition-colors"
          >
            Создать первый кейс
          </button>
        </div>
      ) : (
        <div className="glass rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-white/70">Название</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-white/70">Клиент</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-white/70">Индустрия</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-white/70">Дата</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-white/70">Статус</th>
                <th className="px-6 py-4 text-right text-sm font-medium text-white/70">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {cases.map((item) => (
                <tr key={item.slug} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 text-white font-medium">{item.title}</td>
                  <td className="px-6 py-4 text-gray-400">{item.client}</td>
                  <td className="px-6 py-4 text-gray-400">
                    <span className="px-3 py-1 bg-direct-primary/20 text-direct-primary rounded-full text-xs">
                      {item.industry}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-400">
                    {new Date(item.publishedAt).toLocaleDateString('ru-RU')}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.status === 'published'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {item.status === 'published' ? 'Опубликовано' : 'Черновик'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => router.push(`/cases/${item.slug}`)}
                        className="text-blue-400 hover:text-blue-300 text-sm"
                      >
                        Просмотр
                      </button>
                      <button
                        onClick={() => router.push(`/admin/cases/${item.slug}/edit`)}
                        className="text-direct-primary hover:text-direct-primary/80 text-sm"
                      >
                        Редактировать
                      </button>
                      <button
                        onClick={() => handleDelete(item.slug)}
                        className="text-red-400 hover:text-red-300 text-sm"
                      >
                        Удалить
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
