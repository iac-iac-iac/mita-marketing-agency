'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import Header from '@/components/layout/Header';
import { getBlogPostBySlug } from '@/lib/cms/storage';
import type { BlogPost } from '@/lib/cms/storage';

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const decodedSlug = decodeURIComponent(params.slug as string);
    const found = getBlogPostBySlug(decodedSlug);
    setPost(found);
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

  if (!post) {
    return (
      <>
        <Header showBackButton showHamburgerMenu />
        <div className="min-h-screen bg-direct-dark flex items-center justify-center pt-20">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Статья не найдена</h1>
            <button
              onClick={() => router.push('/blog')}
              className="px-6 py-3 bg-direct-primary hover:bg-direct-primary/90 text-white rounded-xl transition-colors"
            >
              ← Назад к блогу
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
            {/* Category */}
            {post.category && (
              <span className="inline-block px-4 py-2 bg-direct-primary/20 text-direct-primary rounded-full text-sm font-medium mb-4">
                {post.category}
              </span>
            )}

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap gap-4 text-gray-400 text-sm mb-6">
              <span>👤 {post.author}</span>
              <span>📅 {new Date(post.publishedAt).toLocaleDateString('ru-RU', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}</span>
            </div>

            {/* Tags */}
            {post.tags && (
              <div className="flex flex-wrap gap-2">
                {post.tags.split(',').map((tag, i) => (
                  <span key={i} className="px-3 py-1 bg-white/10 text-white/70 rounded-full text-xs">
                    #{tag.trim()}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <article className="max-w-4xl mx-auto px-4 py-12">
          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              {post.excerpt}
            </p>
          )}

          {/* Markdown Content */}
          <div className="markdown-content text-gray-300">
            <ReactMarkdown>
              {post.content}
            </ReactMarkdown>
          </div>

          {/* Back button */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <button
              onClick={() => router.back()}
              className="px-6 py-3 bg-direct-primary hover:bg-direct-primary/90 text-white rounded-xl transition-colors"
            >
              ← Назад к блогу
            </button>
          </div>
        </article>
      </div>
    </>
  );
}
