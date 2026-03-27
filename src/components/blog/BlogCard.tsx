'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

interface BlogCardProps {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  coverImage?: string;
  category?: string;
  readTime?: number;
  className?: string;
}

export function BlogCard({
  slug,
  title,
  excerpt,
  publishedAt,
  coverImage,
  category,
  readTime,
  className,
}: BlogCardProps) {
  const formattedDate = new Date(publishedAt).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
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
        {/* Category Badge */}
        {category && (
          <span className="inline-block px-3 py-1 mb-3 text-xs font-medium rounded-full bg-direct-primary/20 border border-direct-primary/30 text-direct-primary">
            {category}
          </span>
        )}

        {/* Title */}
        <Link href={`/blog/${slug}`}>
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-direct-primary transition-colors">
            {title}
          </h3>
        </Link>

        {/* Excerpt */}
        <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
          {excerpt}
        </p>

        {/* Meta */}
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>{formattedDate}</span>
          {readTime && <span>{readTime} мин</span>}
        </div>
      </div>
    </motion.article>
  );
}
