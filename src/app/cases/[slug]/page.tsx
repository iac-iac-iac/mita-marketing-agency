'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import Header from '@/components/layout/Header';
import { getCaseBySlug } from '@/lib/cms/storage';
import type { Case } from '@/lib/cms/storage';

export default function CasePage() {
  const params = useParams();
  const router = useRouter();
  const [item, setItem] = useState<Case | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const decodedSlug = decodeURIComponent(params.slug as string);
    const found = getCaseBySlug(decodedSlug);
    setItem(found);
    setIsLoading(false);
  }, [params.slug]);

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

  if (!item) {
    return (
      <>
        <Header showBackButton showHamburgerMenu />
        <div className="min-h-screen bg-direct-dark flex items-center justify-center pt-20">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Кейс не найден</h1>
            <button
              onClick={() => router.push('/cases')}
              className="px-6 py-3 bg-direct-primary hover:bg-direct-primary/90 text-white rounded-xl transition-colors"
            >
              ← Назад к кейсам
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header showBackButton showHamburgerMenu />
      <div className="min-h-screen bg-direct-dark pt-20">
        {/* Header */}
        <div className="relative py-12 px-4">
          <div className="absolute inset-0 bg-gradient-to-b from-direct-dark via-direct-secondary/50 to-direct-dark" />
          <div className="max-w-4xl mx-auto relative z-10">
            {/* Industry */}
            {item.industry && (
              <span className="inline-block px-4 py-2 bg-direct-primary/20 text-direct-primary rounded-full text-sm font-medium mb-4">
                {item.industry}
              </span>
            )}

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {item.title}
            </h1>

            {/* Client */}
            <div className="flex flex-wrap gap-4 text-gray-400 text-sm mb-6">
              <span>👤 Клиент: {item.client}</span>
              <span>📅 {new Date(item.publishedAt).toLocaleDateString('ru-RU', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <article className="max-w-4xl mx-auto px-4 py-12">
          {/* Excerpt */}
          {item.excerpt && (
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              {item.excerpt}
            </p>
          )}

          {/* Stats */}
          {item.stats && item.stats.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {item.stats.map((stat, i) => (
                <div key={i} className="glass p-4 rounded-xl text-center">
                  <div className="text-2xl font-bold text-direct-primary mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Markdown Content */}
          <div className="markdown-content text-gray-300">
            <ReactMarkdown>
              {item.content}
            </ReactMarkdown>
          </div>

          {/* Back button */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <button
              onClick={() => router.back()}
              className="px-6 py-3 bg-direct-primary hover:bg-direct-primary/90 text-white rounded-xl transition-colors"
            >
              ← Назад к кейсам
            </button>
          </div>
        </article>
      </div>
    </>
  );
}
