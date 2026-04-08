import Image from 'next/image'
import Link from 'next/link'
import CtaButton from '@/components/ui/CtaButton'

export interface HeroProps {
  eyebrow?: string;
  title: string;
  subtitle: string;
  primaryCtaLabel: string;
  primaryCtaUrl: string;
  secondaryCtaLabel?: string;
  secondaryCtaUrl?: string;
  mediaSrc?: string;
  mediaType?: 'image' | 'video' | 'none';
  videoPoster?: string; // Изображение-заглушка для видео пока оно загружается
  onPrimaryCtaClick?: (e: React.MouseEvent) => void;
}

export default function Hero({
  eyebrow = 'Маркетинговое IT-агентство',
  title,
  subtitle,
  primaryCtaLabel,
  primaryCtaUrl,
  secondaryCtaLabel,
  secondaryCtaUrl,
  mediaSrc = '/images/hero-banner/Hero-banner_main_link.png',
  mediaType = 'image',
  videoPoster,
  onPrimaryCtaClick,
}: HeroProps) {
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
            className="absolute inset-0 w-full h-full object-cover"
            poster={videoPoster}
          >
            <source src={mediaSrc} type="video/mp4" />
            Ваш браузер не поддерживает видео.
          </video>
          {/* Лёгкий градиент поверх видео */}
          <div className="absolute inset-0 bg-gradient-to-br from-direct-dark/50 via-transparent to-transparent" />
          {/* 20% затемнение */}
          <div className="absolute inset-0 bg-black/20" />
        </div>
      )}

      {mediaType === 'image' && mediaSrc && (
        <div className="absolute inset-0 z-0">
          <Image
            src={mediaSrc}
            alt="М.И.Т.А. Hero Background"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          {/* Лёгкий градиент поверх изображения */}
          <div className="absolute inset-0 bg-gradient-to-br from-direct-dark/50 via-transparent to-transparent" />
          {/* 20% затемнение */}
          <div className="absolute inset-0 bg-black/20" />
          {/* Нижний градиент для плавного перехода */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-direct-dark to-transparent" />
        </div>
      )}

      {/* Декоративные элементы */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-direct-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-direct-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />

      {/* Нижнее затемнение для плавного перехода */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-direct-dark to-transparent z-10 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl animate-fade-in">
          {/* Eyebrow */}
          {eyebrow && (
            <p className="text-direct-primary font-semibold text-sm md:text-base mb-4 tracking-wider uppercase">
              {eyebrow}
            </p>
          )}

          {/* H1 заголовок */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            {title}
          </h1>

          {/* Подзаголовок */}
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
            {subtitle}
          </p>

          {/* CTA кнопки */}
          <div className="flex flex-wrap gap-4">
            <CtaButton
              variant="primary"
              size="lg"
              href={primaryCtaUrl}
              onClick={onPrimaryCtaClick}
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
