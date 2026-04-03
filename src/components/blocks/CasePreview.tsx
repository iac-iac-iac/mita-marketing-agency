'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getAllCases, type Case } from '@/lib/cms/storage';

export interface CasePreviewProps {
  title?: string;
  casesLimit?: number;
}

export default function CasePreview({
  title = 'Наши кейсы',
  casesLimit = 2,
}: CasePreviewProps) {
  const [cases, setCases] = useState<Case[]>([]);

  useEffect(() => {
    const loaded = getAllCases().filter(c => c.status === 'published');
    loaded.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    setCases(loaded.slice(0, casesLimit));
  }, [casesLimit]);

  if (cases.length === 0) {
    return null; // Не показываем секцию если нет кейсов
  }

  return (
    <section className="py-20 md:py-28 relative">
      {/* Фоновый градиент */}
      <div className="absolute inset-0 bg-gradient-to-b from-direct-dark via-direct-purple/30 to-direct-dark" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Заголовок */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold animate-fade-in">
            {title}
          </h2>
          <Link
            href="/cases"
            className="text-direct-primary hover:text-white transition-colors duration-300 font-medium inline-flex items-center gap-2 group animate-fade-in"
            style={{ animationDelay: '0.1s' }}
          >
            Смотреть все кейсы
            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Сетка кейсов */}
        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {cases.map((item, index) => (
            <Link
              key={item.slug}
              href={`/cases/${item.slug}`}
              className="glass p-8 rounded-3xl hover:bg-white/10 transition-all duration-300 hover:scale-105 group animate-fade-in"
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              {/* Индустрия */}
              {item.industry && (
                <span className="inline-block px-3 py-1 rounded-full bg-direct-primary/20 text-direct-primary text-sm font-medium mb-4">
                  {item.industry}
                </span>
              )}

              {/* Заголовок */}
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-direct-primary transition-colors">
                {item.title}
              </h3>

              {/* Описание */}
              {item.excerpt && (
                <p className="text-gray-400 mb-4 leading-relaxed">
                  {item.excerpt}
                </p>
              )}

              {/* Клиент */}
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>👤 {item.client}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
