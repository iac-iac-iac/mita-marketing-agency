import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Header from '@/components/layout/Header';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { getPostBySlug, getPublishedPosts, generateSlug } from '@/lib/cms/db-blog';
import type { BlogPostDB } from '@/lib/cms/db-blog';

// ============================================================================
// Static paths для SSG
// ============================================================================
export async function generateStaticParams() {
  const posts = getPublishedPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// ============================================================================
// Metadata
// ============================================================================
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: 'Статья не найдена' };

  return {
    title: `${post.title} — Блог М.И.Т.А.`,
    description: post.excerpt,
  };
}

// ============================================================================
// Page
// ============================================================================
export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);

  if (!post || post.status !== 'published') {
    notFound();
  }

  // Парсим теги из JSON
  const tags: string[] = JSON.parse(post.tags || '[]');

  return (
    <>
      <Header showBackButton showHamburgerMenu />
      <div className="min-h-screen bg-direct-dark pt-20">
        {/* Hero */}
        <div className="relative py-12 px-4">
          <div className="absolute inset-0 bg-gradient-to-b from-direct-dark via-direct-secondary/30 to-direct-dark" />
          <div className="max-w-4xl mx-auto relative z-10">
            {/* Breadcrumbs */}
            <Breadcrumbs
              items={[
                { label: 'Блог', href: '/blog' },
                { label: post.title },
              ]}
            />

            {/* Cover Image */}
            {post.cover_image && (
              <div className="h-64 md:h-80 rounded-3xl overflow-hidden mb-8">
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${post.cover_image})` }}
                />
              </div>
            )}

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-6">
              <span>📅 {new Date(post.published_at).toLocaleDateString('ru-RU', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}</span>
              <span>👤 {post.author}</span>
              <span>📂 {post.category}</span>
              <span>⏱ {post.read_time} мин</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
              {post.title}
            </h1>

            {/* Tags */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {tags.map((tag, i) => (
                  <span key={i} className="px-3 py-1 bg-white/10 text-gray-300 rounded-full text-xs">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 pb-20">
          <article className="markdown-content text-gray-300 leading-relaxed">
            <MDXRemote source={post.content} />
          </article>

          {/* Back link */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <Link
              href="/blog"
              className="text-direct-primary hover:underline inline-flex items-center gap-2"
            >
              ← Вернуться к блогу
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
