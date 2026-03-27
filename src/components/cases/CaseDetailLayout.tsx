'use client'

import { MDXRemote } from 'next-mdx-remote';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { StatsBlock } from '../ui/StatsBlock';
import { ToolsList } from '../ui/ToolsList';
import { RelatedContent } from '../blocks/RelatedContent';
import type { Case, CaseStats } from '@/types/content';
import { sanitizeHtml } from '@/lib/utils/sanitize';
import Header from '../layout/Header';
import ScrollToTopButton from '../ui/ScrollToTopButton';

interface CaseDetailLayoutProps {
  caseItem: Case;
  mdxSource: MDXRemoteSerializeResult;
}

export function CaseDetailLayout({ caseItem, mdxSource }: CaseDetailLayoutProps) {
  const {
    title,
    excerpt,
    client,
    industry,
    coverImage,
    stats,
    tools,
    challenges,
    solutions,
    results,
    testimonial,
  } = caseItem;

  // Компоненты для MDX
  const components = {
    StatsBlock: () => null,
    ToolsList: () => null,
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
        <div className={`relative max-w-6xl mx-auto px-4 ${coverImage ? '-mt-32' : 'pt-20'} pb-12`}>
          {/* Client Badge */}
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium rounded-full bg-direct-primary/20 border border-direct-primary/30 text-direct-primary">
            {client}
          </span>

          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-8">
            <span>{industry}</span>
            <span>•</span>
            <span>Кейс</span>
          </div>

          {/* Excerpt */}
          {excerpt && (
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              {excerpt}
            </p>
          )}
        </div>
      </div>

      {/* Stats */}
      {stats && stats.length > 0 && (
        <div className="max-w-6xl mx-auto px-4 mb-12">
          <StatsBlock stats={stats} />
        </div>
      )}

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 pb-20">
        <div className="glass p-8 md:p-12 rounded-3xl mb-12">
          <div className="prose prose-lg prose-invert max-w-none">
            <MDXRemote {...mdxSource} components={components} />
          </div>
        </div>

        {/* Tools */}
        {tools && tools.length > 0 && (
          <div className="mb-12">
            <ToolsList tools={tools} />
          </div>
        )}

        {/* Testimonial */}
        {testimonial && (
          <div className="glass p-8 md:p-12 rounded-3xl mb-12">
            <blockquote className="text-xl text-gray-300 italic mb-6">
              "{testimonial.text}"
            </blockquote>
            <div>
              <p className="font-semibold text-white">{testimonial.author}</p>
              <p className="text-sm text-direct-primary">{testimonial.position}</p>
              <p className="text-sm text-gray-400">{testimonial.company}</p>
            </div>
          </div>
        )}

        {/* Results */}
        {results && (
          <div className="glass p-8 md:p-12 rounded-3xl">
            <h2 className="text-2xl font-bold text-white mb-6">Результаты</h2>
            <div className="prose prose-lg prose-invert max-w-none">
              <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(results) }} />
            </div>
          </div>
        )}
      </div>

      {/* Related Content */}
      {caseItem.relatedCases && caseItem.relatedCases.length > 0 && (
        <RelatedContent
          title="Похожие кейсы"
          items={caseItem.relatedCases.map((slug) => ({
            slug,
            title: slug,
            type: 'case' as const,
          }))}
        />
      )}
      <ScrollToTopButton />
    </article>
    </div>
  );
}
