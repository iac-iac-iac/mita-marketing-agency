'use client'

import CtaButton from '@/components/ui/CtaButton'
import { useScrollReveal } from '@/lib/hooks/use-scroll-reveal'
import { mitaCtaGradient, mitaGoldText } from '@/lib/mita-landing-styles'
import { cn } from '@/lib/utils/cn'

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
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0D0D0D] via-[#0D0D0D] to-[#0D0D0D]/95" />
      <div className="absolute top-1/4 left-1/4 h-96 w-96 animate-float rounded-full bg-[#D4A84B]/10 blur-3xl" />
      <div
        className="absolute right-1/4 bottom-1/4 h-64 w-64 animate-float rounded-full bg-[#D4A84B]/8 blur-3xl"
        style={{ animationDelay: '1.5s' }}
      />

      <div className="container relative z-10 mx-auto px-4">
        <div ref={contentRef} className="scroll-reveal mx-auto max-w-4xl text-center">
          <h2
            className={cn(
              mitaGoldText,
              'mb-6 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl'
            )}
          >
            {title}
          </h2>

          <p className="mb-10 text-xl leading-relaxed text-white/60">
            {description}
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <CtaButton
              href={primaryCtaUrl}
              size="lg"
              className={cn(mitaCtaGradient, 'hover:!opacity-90')}
            >
              {primaryCtaLabel}
            </CtaButton>

            {secondaryCtaLabel && secondaryCtaUrl && (
              <CtaButton
                variant="secondary"
                size="lg"
                href={secondaryCtaUrl}
                className="!border !border-white/12 !bg-white/[0.06] !from-transparent !to-transparent !text-white/90 !shadow-none hover:!bg-white/10"
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
