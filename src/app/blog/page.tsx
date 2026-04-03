'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import { getAllBlogPosts, type BlogPost } from '@/lib/cms/storage';

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loaded = getAllBlogPosts().filter(p => p.status === 'published');
    // Сортируем по дате (новые сверху)
    loaded.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    setPosts(loaded);
    setIsLoading(false);
  }, []);

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
    <>
      <Header showBackButton showHamburgerMenu />
      <div className="min-h-screen bg-direct-dark pt-20">
        {/* Hero */}
        <div className="relative py-16 px-4">
          <div className="absolute inset-0 bg-gradient-to-b from-direct-dark via-direct-secondary/50 to-direct-dark" />
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Блог М.И.Т.А.
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Экспертные материалы о digital-маркетинге, веб-разработке и продвижении бизнеса
            </p>
          </div>
        </div>

        {/* Список статей */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">Пока нет публикаций</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="glass rounded-3xl overflow-hidden group hover:scale-105 transition-transform duration-300"
                >
                  {/* Cover */}
                  {post.coverImage ? (
                    <div className="h-48 overflow-hidden">
                      <div
                        className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                        style={{ backgroundImage: `url(${post.coverImage})` }}
                      />
                    </div>
                  ) : (
                    <div className="h-48 bg-gradient-to-br from-direct-primary/30 to-direct-accent/30" />
                  )}

                  {/* Content */}
                  <div className="p-6">
                    {/* Category */}
                    {post.category && (
                      <span className="inline-block px-3 py-1 mb-3 text-xs font-medium rounded-full bg-direct-primary/20 text-direct-primary">
                        {post.category}
                      </span>
                    )}

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-direct-primary transition-colors">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>
                        {new Date(post.publishedAt).toLocaleDateString('ru-RU', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                      <span>👤 {post.author}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
