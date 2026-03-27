'use client'

import CtaButton from '@/components/ui/CtaButton'
import { useScrollReveal } from '@/lib/hooks/use-scroll-reveal'

export interface ClosingCtaProps {
  title: string;
  description: string;
  primaryCtaLabel: string;
  primaryCtaUrl: string;
  secondaryCtaLabel?: string;
  secondaryCtaUrl?: string;
}

export default function ClosingCta({
  title,
  description,
  primaryCtaLabel,
  primaryCtaUrl,
  secondaryCtaLabel,
  secondaryCtaUrl,
}: ClosingCtaProps) {
  const contentRef = useScrollReveal()

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Фоновый градиент */}
      <div className="absolute inset-0 bg-gradient-to-br from-direct-primary/30 via-direct-dark/80 to-direct-accent/30" />

      {/* Декоративные элементы */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-direct-primary/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-direct-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />

      <div className="container mx-auto px-4 relative z-10">
        <div ref={contentRef} className="max-w-4xl mx-auto text-center scroll-reveal">
          {/* H2 заголовок */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            {title}
          </h2>

          {/* Описание */}
          <p className="text-xl text-gray-300 mb-10 leading-relaxed">
            {description}
          </p>

          {/* CTA кнопки */}
          <div className="flex flex-wrap justify-center gap-4">
            <CtaButton
              variant="primary"
              size="lg"
              href={primaryCtaUrl}
            >
              {primaryCtaLabel}
            </CtaButton>

            {secondaryCtaLabel && secondaryCtaUrl && (
              <CtaButton
                variant="secondary"
                size="lg"
                href={secondaryCtaUrl}
              >
                {secondaryCtaLabel}
              </CtaButton>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
