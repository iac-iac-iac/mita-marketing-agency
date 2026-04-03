'use client';

import { motion } from 'framer-motion';
import { CaseCard } from './CaseCard';
import type { ContentMeta } from '@/types/content';

interface CasesIndexProps {
  cases: ContentMeta[];
  title?: string;
  showAll?: boolean;
}

export function CasesIndex({ cases, title = 'Кейсы', showAll = false }: CasesIndexProps) {
  if (!cases || cases.length === 0) {
    return (
      <div className="text-center text-gray-400 py-12">
        Пока нет кейсов
      </div>
    );
  }

  const displayCases = showAll ? cases : cases.slice(0, 3);

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {title && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {title}
            </h2>
          </motion.div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {displayCases.map((caseItem, index) => (
            <motion.div
              key={caseItem.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <CaseCard 
                slug={caseItem.slug}
                title={caseItem.title}
                excerpt={caseItem.excerpt}
                publishedAt={caseItem.publishedAt}
                coverImage={caseItem.coverImage}
                client="М.И.Т.А."
                industry="Маркетинг"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
