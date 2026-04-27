import Image from 'next/image'
import CtaButton from '@/components/ui/CtaButton'
import { mitaCtaGradient } from '@/lib/mita-landing-styles'
import { cn } from '@/lib/utils/cn'

export interface ServiceHeroProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  primaryCtaLabel: string;
  primaryCtaUrl: string;
  secondaryCtaLabel?: string;
  secondaryCtaUrl?: string;
  mediaSrc: string;
  mediaType?: 'image' | 'video';
  videoPoster?: string;
}

export default function ServiceHero({
  eyebrow,
  title,
  subtitle,
  primaryCtaLabel,
  primaryCtaUrl,
  secondaryCtaLabel,
  secondaryCtaUrl,
  mediaSrc,
  mediaType = 'image',
  videoPoster,
}: ServiceHeroProps) {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Фоновое изображение или видео на всю страницу */}
      {mediaType === 'video' && mediaSrc && (
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
            poster={videoPoster}
          >
            <source src={mediaSrc} type="video/mp4" />
            Ваш браузер не поддерживает видео.
          </video>
          <div className="absolute inset-0 bg-gradient-to-br from-[#0D0D0D]/80 via-[#0D0D0D]/55 to-[#0D0D0D]/80" />
        </div>
      )}

      {mediaType === 'image' && mediaSrc && (
        <div className="absolute inset-0 z-0">
          <Image
            src={mediaSrc}
            alt={`${title} Background`}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0D0D0D]/80 via-[#0D0D0D]/55 to-[#0D0D0D]/80" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0D0D0D] to-transparent" />
        </div>
      )}

      {/* Декоративные элементы */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-direct-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-direct-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />

      {/* Нижнее затемнение для плавного перехода */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-48 bg-gradient-to-t from-[#0D0D0D] to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl animate-fade-in">
          {/* Eyebrow */}
          <p className="text-direct-primary font-semibold text-sm md:text-base mb-4 tracking-wider uppercase">
            {eyebrow}
          </p>

          {/* H1 заголовок */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            {title}
          </h1>

          {/* Подзаголовок */}
          <p className="mb-8 text-xl leading-relaxed text-white/60 md:text-2xl">
            {subtitle}
          </p>

          <div className="flex flex-wrap gap-4">
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
