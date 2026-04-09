import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Header from '@/components/layout/Header';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { getCaseBySlug, getPublishedCases } from '@/lib/cms/db-cases';
import type { CaseDB } from '@/lib/cms/db-cases';

// ============================================================================
// Static paths для SSG
// ============================================================================
export async function generateStaticParams() {
  const cases = getPublishedCases();
  return cases.map((c) => ({
    slug: c.slug,
  }));
}

// ============================================================================
// Metadata
// ============================================================================
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const caseItem = getCaseBySlug(params.slug);
  if (!caseItem) return { title: 'Кейс не найден' };

  return {
    title: `${caseItem.title} — Кейсы М.И.Т.А.`,
    description: caseItem.excerpt,
  };
}

// ============================================================================
// Types
// ============================================================================
interface CaseStats {
  label: string;
  before?: string;
  after: string;
  improvement?: string;
  icon?: string;
}

interface CaseTestimonial {
  text: string;
  author: string;
  position: string;
  company: string;
  avatar?: string;
}

// ============================================================================
// Page
// ============================================================================
export default function CaseDetailPage({ params }: { params: { slug: string } }) {
  const caseItem = getCaseBySlug(params.slug);

  if (!caseItem || caseItem.status !== 'published') {
    notFound();
  }

  const stats: CaseStats[] = JSON.parse(caseItem.stats || '[]');
  const testimonial: CaseTestimonial | null = caseItem.testimonial && caseItem.testimonial !== '{}'
    ? JSON.parse(caseItem.testimonial)
    : null;

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
                { label: 'Кейсы', href: '/cases' },
                { label: caseItem.title },
              ]}
            />

            {/* Cover Image */}
            {caseItem.cover_image && (
              <div className="h-64 md:h-80 rounded-3xl overflow-hidden mb-8">
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${caseItem.cover_image})` }}
                />
              </div>
            )}

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-6">
              <span>📅 {new Date(caseItem.published_at).toLocaleDateString('ru-RU', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}</span>
              <span>🏢 {caseItem.client}</span>
              <span>📂 {caseItem.industry}</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
              {caseItem.title}
            </h1>
          </div>
        </div>

        {/* Stats */}
        {stats.length > 0 && (
          <div className="max-w-4xl mx-auto px-4 mb-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, i) => (
                <div key={i} className="glass p-6 rounded-2xl text-center">
                  <div className="text-2xl md:text-3xl font-bold text-direct-primary mb-1">
                    {stat.after}
                  </div>
                  {stat.before && (
                    <div className="text-sm text-gray-500 line-through mb-1">{stat.before}</div>
                  )}
                  <div className="text-sm text-gray-300">{stat.label}</div>
                  {stat.improvement && (
                    <div className="text-xs text-green-400 mt-1">↑ {stat.improvement}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 pb-12">
          <article className="markdown-content text-gray-300 leading-relaxed">
            <MDXRemote source={caseItem.content} />
          </article>

          {/* Testimonial */}
          {testimonial && (
            <div className="mt-12 glass p-8 rounded-3xl">
              <div className="text-3xl text-direct-primary mb-4">"</div>
              <p className="text-gray-300 italic mb-4">{testimonial.text}</p>
              <div className="text-sm text-gray-400">
                <span className="font-semibold text-white">{testimonial.author}</span>
                {', '}{testimonial.position}{', '}{testimonial.company}
              </div>
            </div>
          )}

          {/* Back link */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <Link
              href="/cases"
              className="text-direct-primary hover:underline inline-flex items-center gap-2"
            >
              ← Вернуться к кейсам
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
