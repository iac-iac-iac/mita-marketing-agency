'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getAllBlogPosts, type BlogPost } from '@/lib/cms/storage';

export interface BlogPreviewProps {
  title?: string;
  postsLimit?: number;
}

export default function BlogPreview({
  title = 'Последние статьи',
  postsLimit = 3,
}: BlogPreviewProps) {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const loaded = getAllBlogPosts().filter(p => p.status === 'published');
    loaded.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    setPosts(loaded.slice(0, postsLimit));
  }, [postsLimit]);

  if (posts.length === 0) {
    return null; // Не показываем секцию если нет статей
  }

  return (
    <section className="py-20 md:py-28 relative">
      {/* Фоновый градиент */}
      <div className="absolute inset-0 bg-gradient-to-b from-direct-dark via-direct-secondary/50 to-direct-dark" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Заголовок */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold animate-fade-in">
            {title}
          </h2>
          <Link
            href="/blog"
            className="text-direct-primary hover:text-white transition-colors duration-300 font-medium inline-flex items-center gap-2 group animate-fade-in"
            style={{ animationDelay: '0.1s' }}
          >
            Смотреть все статьи
            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 16">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Сетка статей */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {posts.map((post, index) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="glass p-6 rounded-3xl hover:bg-white/10 transition-all duration-300 hover:scale-105 group animate-fade-in"
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              {/* Категория */}
              <span className="inline-block px-3 py-1 rounded-full bg-direct-primary/20 text-direct-primary text-sm font-medium mb-4">
                {post.category}
              </span>

              {/* Заголовок статьи */}
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-direct-primary transition-colors line-clamp-2">
                {post.title}
              </h3>

              {/* Краткое описание */}
              {post.excerpt && (
                <p className="text-gray-400 mb-4 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              )}

              {/* Мета информация */}
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{post.author}</span>
                <span>{new Date(post.publishedAt).toLocaleDateString('ru-RU', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
