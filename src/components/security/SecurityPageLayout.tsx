'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useScrollReveal } from '@/lib/hooks/use-scroll-reveal'
import CtaButton from '@/components/ui/CtaButton'
import { sanitizeHtml } from '@/lib/utils/sanitize'

export interface SecurityPageLayoutProps {
  title: string;
  subtitle: string;
  sections: {
    id: string;
    title: string;
    content: string;
    icon?: string | React.ReactNode;
  }[];
  faqItems: {
    question: string;
    answer: string;
  }[];
  ctaTitle: string;
  ctaSubtitle: string;
  ctaButtonLabel: string;
  ctaButtonUrl: string;
}

/**
 * Отдельный компонент для секции с scroll reveal
 * Чтобы использовать hook внутри .map()
 */
function SecuritySection({ section, index }: { section: SecurityPageLayoutProps['sections'][0]; index: number }) {
  const ref = useScrollReveal()

  return (
    <section
      id={section.id}
      className="scroll-reveal"
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div ref={ref} className="glass p-8 md:p-10">
        <div className="flex items-start gap-6">
          {section.icon && (
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-direct-primary/20 flex items-center justify-center overflow-hidden">
              {typeof section.icon === 'string' ? (
                <Image
                  src={section.icon}
                  alt={`${section.title} icon`}
                  width={48}
                  height={48}
                  className="w-12 h-12 object-contain"
                />
              ) : (
                section.icon
              )}
            </div>
          )}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {section.title}
            </h2>
            <div
              className="text-gray-300 leading-relaxed prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: sanitizeHtml(section.content) }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default function SecurityPageLayout({
  title,
  subtitle,
  sections,
  faqItems,
  ctaTitle,
  ctaSubtitle,
  ctaButtonLabel,
  ctaButtonUrl,
}: SecurityPageLayoutProps) {
  const heroRef = useScrollReveal()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <main className="min-h-screen">
      {/* Hero секция */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Фоновое изображение */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-direct-primary/20 via-direct-dark to-direct-accent/20" />
        </div>

        {/* Декоративные элементы */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-direct-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-direct-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />

        <div ref={heroRef} className="scroll-reveal container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>
      </section>

      {/* Секции контента */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto space-y-16">
          {sections.map((section, index) => (
            <SecuritySection
              key={section.id}
              section={section}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* FAQ секция */}
      <section className="py-20 md:py-28 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-direct-dark via-direct-secondary/30 to-direct-dark" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="scroll-reveal">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12">
              Часто задаваемые вопросы
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqItems.map((item, index) => (
              <div
                key={index}
                className="glass rounded-2xl overflow-hidden scroll-reveal"
                style={{ transitionDelay: `${100 + index * 50}ms` }}
              >
                <button
                  className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-white/5 transition-colors"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <span className="font-semibold text-lg">
                    {item.question}
                  </span>
                  <svg
                    className={`w-6 h-6 transition-transform duration-300 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-4 text-gray-300 leading-relaxed animate-slide-up">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA блок */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-direct-primary/10 via-direct-dark to-direct-accent/10" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="scroll-reveal glass p-10 md:p-16 text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              {ctaTitle}
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              {ctaSubtitle}
            </p>
            <CtaButton
              variant="primary"
              size="lg"
              href={ctaButtonUrl}
            >
              {ctaButtonLabel}
            </CtaButton>
          </div>
        </div>
      </section>
    </main>
  )
}
