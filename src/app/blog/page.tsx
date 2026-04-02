'use client';

import { useEffect, useState } from 'react';
import { BlogIndex } from '@/components/blog/BlogIndex';
import BlogCategories from '@/components/blog/BlogCategories';
import Header from '@/components/layout/Header';
import ScrollToTopButton from '@/components/ui/ScrollToTopButton';

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Загружаем посты из localStorage
    const storedPosts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
    
    // Если нет записей, используем заглушку
    const posts = storedPosts.length > 0 ? storedPosts : [
      {
        slug: 'kak-uvelichit-konversiyu-lidov',
        title: 'Как увеличить конверсию лидов на 30%',
        excerpt: 'Разбираем проверенные техники повышения конверсии лидов в продажи',
        publishedAt: '2026-03-20',
        author: 'Алексей Иванов',
        category: 'Лидогенерация',
        content: 'Полный текст статьи...',
        tags: 'лиды, конверсия, маркетинг',
        coverImage: '',
      },
      {
        slug: 'trendy-digital-marketinga-2026',
        title: 'Тренды digital-маркетинга 2026',
        excerpt: 'Обзор ключевых трендов и инструментов, которые будут определять рынок в этом году',
        publishedAt: '2026-03-15',
        author: 'Мария Петрова',
        category: 'Маркетинг',
        content: 'Полный текст статьи...',
        tags: 'маркетинг, тренды, 2026',
        coverImage: '',
      },
    ];

    setPosts(posts);
    setIsLoading(false);
  }, []);

  return (
    <>
      <Header showBackButton showHamburgerMenu />
      <div className="min-h-screen bg-direct-dark pt-20">
        {/* Hero Section */}
        <div className="relative py-12 px-4">
          {/* Фоновый градиент */}
          <div className="absolute inset-0 bg-gradient-to-b from-direct-dark via-direct-secondary/50 to-direct-dark" />

          <div className="max-w-7xl mx-auto text-center relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Блог Direct-line
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Экспертные материалы о digital-маркетинге, веб-разработке
              и продвижении бизнеса
            </p>
          </div>
        </div>

        {/* Blog Categories */}
        <BlogCategories />

        {/* Blog Index */}
        <BlogIndex posts={posts} showAll />
        <ScrollToTopButton />
      </div>
    </>
  );
}
