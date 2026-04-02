'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import Header from '@/components/layout/Header';
import ScrollToTopButton from '@/components/ui/ScrollToTopButton';

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  category: string;
  tags: string;
  coverImage: string;
}

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Загружаем пост из localStorage
    const storedPosts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
    const foundPost = storedPosts.find((p: BlogPost) => p.slug === params.slug);

    if (foundPost) {
      setPost(foundPost);
    } else {
      // Заглушка если не найдено
      setPost({
        slug: params.slug as string,
        title: 'Статья не найдена',
        excerpt: '',
        content: 'Статья не найдена в localStorage. Создайте новую статью в админ-панели.',
        author: '',
        publishedAt: '',
        category: '',
        tags: '',
        coverImage: '',
      });
    }

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

  return (
    <>
      <Header showBackButton showHamburgerMenu />
      <div className="min-h-screen bg-direct-dark pt-20">
        {/* Article Header */}
        <div className="relative py-12 px-4">
          <div className="absolute inset-0 bg-gradient-to-b from-direct-dark via-direct-secondary/50 to-direct-dark" />

          <div className="max-w-4xl mx-auto relative z-10">
            {/* Категория */}
            {post?.category && (
              <span className="inline-block px-4 py-2 bg-direct-primary/20 text-direct-primary rounded-full text-sm font-medium mb-4">
                {post.category}
              </span>
            )}

            {/* Заголовок */}
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {post?.title}
            </h1>

            {/* Мета информация */}
            <div className="flex flex-wrap gap-4 text-gray-400 text-sm">
              {post?.author && (
                <span>👤 {post.author}</span>
              )}
              {post?.publishedAt && (
                <span>📅 {new Date(post.publishedAt).toLocaleDateString('ru-RU', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              )}
            </div>

            {/* Теги */}
            {post?.tags && (
              <div className="flex flex-wrap gap-2 mt-4">
                {post.tags.split(',').map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-white/10 text-white/70 rounded-full text-xs"
                  >
                    #{tag.trim()}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Article Content */}
        <article className="max-w-4xl mx-auto px-4 py-12">
          <div className="prose prose-invert prose-lg max-w-none">
            {/* Краткое описание */}
            {post?.excerpt && (
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                {post.excerpt}
              </p>
            )}

            {/* Содержимое */}
            <div className="text-gray-300 prose prose-invert prose-lg max-w-none
              prose-headings:text-white prose-headings:font-bold
              prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl
              prose-p:leading-relaxed prose-p:mb-4
              prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-4
              prose-ol:list-decimal prose-ol:pl-6 prose-ol:mb-4
              prose-strong:text-direct-primary prose-strong:font-bold
              prose-em:text-gray-300 prose-em:italic
              prose-a:text-direct-primary prose-a:underline
              prose-blockquote:border-l-4 prose-blockquote:border-direct-primary
              prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-400
              prose-code:bg-white/10 prose-code:px-2 prose-code:py-1
              prose-code:rounded prose-code:text-direct-primary
              prose-pre:bg-white/5 prose-pre:p-4 prose-pre:rounded-xl
              prose-pre:overflow-x-auto">
              <ReactMarkdown>
                {post?.content || 'Содержимое статьи...'}
              </ReactMarkdown>
            </div>
          </div>

          {/* Кнопка назад */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <button
              onClick={() => router.back()}
              className="px-6 py-3 bg-direct-primary hover:bg-direct-primary/90 text-white rounded-xl transition-colors"
            >
              ← Назад к блогу
            </button>
          </div>
        </article>

        <ScrollToTopButton />
      </div>
    </>
  );
}
