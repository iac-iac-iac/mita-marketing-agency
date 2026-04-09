import Link from 'next/link';
import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import { getPublishedCases } from '@/lib/cms/db-cases';

export const metadata: Metadata = {
  title: 'Кейсы М.И.Т.А. — Результаты наших клиентов',
  description: 'Реальные примеры увеличения лидогенерации и роста бизнеса наших клиентов',
};

export default function CasesPage() {
  const cases = getPublishedCases();

  return (
    <>
      <Header showBackButton showHamburgerMenu />
      <div className="min-h-screen bg-direct-dark pt-20">
        {/* Hero */}
        <div className="relative py-16 px-4">
          <div className="absolute inset-0 bg-gradient-to-b from-direct-dark via-direct-secondary/50 to-direct-dark" />
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Кейсы клиентов
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Реальные результаты: рост лидов, увеличение продаж, оптимизация процессов
            </p>
          </div>
        </div>

        {/* Список кейсов */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          {cases.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">Пока нет кейсов</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cases.map((caseItem) => {
                const stats = JSON.parse(caseItem.stats || '[]');

                return (
                  <Link
                    key={caseItem.slug}
                    href={`/cases/${caseItem.slug}`}
                    className="glass rounded-3xl overflow-hidden group hover:scale-105 transition-transform duration-300"
                  >
                    {/* Cover */}
                    {caseItem.cover_image ? (
                      <div className="h-48 overflow-hidden">
                        <div
                          className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                          style={{ backgroundImage: `url(${caseItem.cover_image})` }}
                        />
                      </div>
                    ) : (
                      <div className="h-48 bg-gradient-to-br from-direct-primary/30 to-direct-accent/30" />
                    )}

                    {/* Content */}
                    <div className="p-6">
                      {/* Industry */}
                      {caseItem.industry && (
                        <span className="inline-block px-3 py-1 mb-3 text-xs font-medium rounded-full bg-direct-primary/20 text-direct-primary">
                          {caseItem.industry}
                        </span>
                      )}

                      {/* Title */}
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-direct-primary transition-colors">
                        {caseItem.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                        {caseItem.excerpt}
                      </p>

                      {/* Stats preview */}
                      {stats.length > 0 && (
                        <div className="flex gap-4 text-xs text-gray-400">
                          {stats.slice(0, 2).map((stat: { label: string; after: string }, i: number) => (
                            <span key={i}>
                              📈 {stat.label}: <span className="text-direct-primary font-semibold">{stat.after}</span>
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Client */}
                      <div className="flex items-center justify-between text-sm text-gray-400 mt-4">
                        <span>👤 {caseItem.client}</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
