'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils/cn';

interface RelatedContentProps {
  title?: string;
  items?: Array<{
    slug: string;
    title: string;
    type: 'case' | 'blog';
    excerpt?: string;
    coverImage?: string;
  }>;
  className?: string;
}

export function RelatedContent({
  title = 'Смотрите также',
  items = [],
  className,
}: RelatedContentProps) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn('mt-16', className)}
    >
      {/* Title */}
      <h3 className="text-2xl font-bold text-white mb-8">{title}</h3>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.slice(0, 2).map((item, index) => (
          <motion.div
            key={item.slug}
            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link
              href={`/${item.type === 'case' ? 'cases' : 'blog'}/${item.slug}`}
              className="group block p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/20 hover:bg-white/10 hover:border-white/30 transition-all duration-300"
            >
              {/* Cover Image */}
              {item.coverImage && (
                <div className="relative h-40 mb-4 rounded-xl overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url(${item.coverImage})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
                  
                  {/* Type Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white">
                      {item.type === 'case' ? 'Кейс' : 'Статья'}
                    </span>
                  </div>
                </div>
              )}

              {/* Title */}
              <h4 className="text-lg font-bold text-white mb-2 group-hover:text-blue-300 transition-colors line-clamp-2">
                {item.title}
              </h4>

              {/* Excerpt */}
              {item.excerpt && (
                <p className="text-gray-400 text-sm line-clamp-2">
                  {item.excerpt}
                </p>
              )}

              {/* Link Arrow */}
              <div className="flex items-center gap-2 mt-4 text-blue-400 text-sm font-medium group-hover:text-blue-300 transition-colors">
                Подробнее
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
