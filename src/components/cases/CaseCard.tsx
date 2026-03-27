'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

interface CaseCardProps {
  slug: string;
  title: string;
  excerpt: string;
  client: string;
  industry: string;
  publishedAt: string;
  coverImage?: string;
  stats?: Array<{ label: string; after: string }>;
  className?: string;
}

export function CaseCard({
  slug,
  title,
  excerpt,
  client,
  industry,
  publishedAt,
  coverImage,
  stats,
  className,
}: CaseCardProps) {
  const formattedDate = new Date(publishedAt).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
  });

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className={cn(
        'glass rounded-3xl overflow-hidden group cursor-pointer',
        className
      )}
    >
      {/* Cover Image */}
      {coverImage && (
        <div className="relative h-48 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
            style={{ backgroundImage: `url(${coverImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-direct-dark/80 to-transparent" />
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        {/* Client Badge */}
        <span className="inline-block px-3 py-1 mb-3 text-xs font-medium rounded-full bg-direct-primary/20 border border-direct-primary/30 text-direct-primary">
          {client}
        </span>

        {/* Title */}
        <Link href={`/cases/${slug}`}>
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-direct-primary transition-colors">
            {title}
          </h3>
        </Link>

        {/* Excerpt */}
        <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
          {excerpt}
        </p>

        {/* Stats */}
        {stats && stats.length > 0 && (
          <div className="grid grid-cols-2 gap-3 mb-4">
            {stats.slice(0, 2).map((stat, index) => (
              <div key={index} className="text-center p-2 rounded-lg bg-direct-secondary/30">
                <div className="text-lg font-bold text-direct-primary">
                  {stat.after}
                </div>
                <div className="text-xs text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Meta */}
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>{industry}</span>
          <span>{formattedDate}</span>
        </div>
      </div>
    </motion.article>
  );
}
