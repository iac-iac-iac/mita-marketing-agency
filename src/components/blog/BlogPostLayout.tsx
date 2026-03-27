'use client'

import { MDXRemote } from 'next-mdx-remote';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { InlineCta } from '../ui/InlineCta';
import Header from '../layout/Header';
import ScrollToTopButton from '../ui/ScrollToTopButton';

interface BlogPostLayoutProps {
  title: string;
  excerpt: string;
  publishedAt: string;
  author: string;
  category: string;
  readTime: number;
  coverImage?: string;
  tags?: string[];
  mdxSource: MDXRemoteSerializeResult;
}

export function BlogPostLayout({
  title,
  excerpt,
  publishedAt,
  author,
  category,
  readTime,
  coverImage,
  tags,
  mdxSource,
}: BlogPostLayoutProps) {
  const formattedDate = new Date(publishedAt).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Компоненты для MDX
  const components = {
    InlineCta: () => null,
  };

  return (
    <div>
      <Header showBackButton showHamburgerMenu />
      <article className="min-h-screen pt-20 bg-direct-dark">
        {/* Hero Section */}
        <div className="relative">
          {/* Cover Image */}
          {coverImage && (
            <div className="relative h-64 md:h-96 w-full">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${coverImage})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-direct-dark via-direct-dark/60 to-transparent" />
            </div>
          )}

        {/* Header Content */}
        <div className={`relative max-w-4xl mx-auto px-4 ${coverImage ? '-mt-32' : 'pt-20'} pb-12`}>
          {/* Category Badge */}
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium rounded-full bg-direct-primary/20 border border-direct-primary/30 text-direct-primary">
            {category}
          </span>

          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-8">
            <span>{author}</span>
            <span>•</span>
            <span>{formattedDate}</span>
            <span>•</span>
            <span>{readTime} мин</span>
          </div>

          {/* Excerpt */}
          {excerpt && (
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              {excerpt}
            </p>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 pb-20">
        <div className="glass p-8 md:p-12 rounded-3xl">
          <div className="prose prose-lg prose-invert max-w-none">
            <MDXRemote {...mdxSource} components={components} />
          </div>

          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-white/10">
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-sm rounded-full bg-direct-secondary/50 text-gray-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Inline CTA */}
      <InlineCta />
      <ScrollToTopButton />
    </article>
    </div>
  );
}
