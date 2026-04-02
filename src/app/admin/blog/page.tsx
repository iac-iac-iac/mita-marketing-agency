'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface BlogPost {
  slug: string;
  title: string;
  publishedAt: string;
  status: 'draft' | 'published';
}

export default function AdminBlogPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Загружаем список постов из localStorage
    const storedPosts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
    
    // Если нет записей в localStorage, используем заглушку
    const posts: BlogPost[] = storedPosts.length > 0 ? storedPosts : [
      {
        slug: 'kak-uvelichit-konversiyu-lidov',
        title: 'Как увеличить конверсию лидов на 30%',
        publishedAt: '2026-03-20',
        status: 'published',
      },
      {
        slug: 'trendy-digital-marketinga-2026',
        title: 'Тренды digital-маркетинга 2026',
        publishedAt: '2026-03-15',
        status: 'published',
      },
    ];

    setPosts(posts);
    setIsLoading(false);
  }, []);

  const handleNewPost = () => {
    router.push('/admin/blog/new');
  };

  const handleEditPost = (slug: string) => {
    router.push(`/admin/blog/${slug}/edit`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Заголовок */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-white">
          Управление блогом
        </h2>
        <button
          onClick={handleNewPost}
          className="px-6 py-3 bg-direct-primary hover:bg-direct-primary/90 text-white font-medium rounded-xl transition-colors"
        >
          + Новая статья
        </button>
      </div>

      {/* Список постов */}
      {isLoading ? (
        <div className="text-center py-12">
          <div className="w-12 h-12 border-4 border-direct-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Загрузка...</p>
        </div>
      ) : posts.length === 0 ? (
        <div className="glass p-12 rounded-2xl text-center">
          <p className="text-gray-400 mb-4">Пока нет статей</p>
          <button
            onClick={handleNewPost}
            className="px-6 py-3 bg-direct-primary hover:bg-direct-primary/90 text-white font-medium rounded-xl transition-colors"
          >
            Создать первую статью
          </button>
        </div>
      ) : (
        <div className="glass rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-white/70">
                  Заголовок
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-white/70">
                  Дата
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-white/70">
                  Статус
                </th>
                <th className="px-6 py-4 text-right text-sm font-medium text-white/70">
                  Действия
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {posts.map((post) => (
                <tr key={post.slug} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 text-white">
                    {post.title}
                  </td>
                  <td className="px-6 py-4 text-gray-400">
                    {new Date(post.publishedAt).toLocaleDateString('ru-RU')}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        post.status === 'published'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}
                    >
                      {post.status === 'published' ? 'Опубликовано' : 'Черновик'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleEditPost(post.slug)}
                      className="text-direct-primary hover:underline text-sm"
                    >
                      Редактировать
                    </button>
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
