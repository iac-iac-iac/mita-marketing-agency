'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import CtaButton from '@/components/ui/CtaButton'

interface HeroDashboardProps {
  eyebrow?: string
  title?: string
  subtitle?: string
  primaryCtaLabel?: string
  primaryCtaUrl?: string
  secondaryCtaLabel?: string
  secondaryCtaUrl?: string
  mediaSrc?: string
  videoPoster?: string
}

// Анимированные счётчики
const counters = [
  { label: 'лидов сегодня', value: 247, suffix: '' },
  { label: 'звонков обработано', value: 1843, suffix: '' },
  { label: 'средняя конверсия', value: 34, suffix: '%' },
]

// Золотые частицы — генерируются один раз (не через Math.random на верхнем уровне)
function generateParticles(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: 10 + (i * 73 % 80),
    y: 10 + (i * 47 % 80),
    size: 2 + (i % 4),
    duration: 4 + (i % 5),
    delay: (i % 4) * 0.8,
  }))
}

const particles = generateParticles(12)

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const duration = 2000
    const steps = 60
    const increment = target / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [target])

  return <>{count.toLocaleString('ru-RU')}{suffix}</>
}

export default function HeroDashboard({
  eyebrow = 'Маркетинговое IT-агентство',
  title = 'Постоянный поток клиентов для вашего бизнеса',
  subtitle = 'Комплексные маркетинговые решения и IT-сервисы для стабильного роста продаж. От лидогенерации до рекрутинга — всё в одном месте.',
  primaryCtaLabel = 'Оставить заявку',
  primaryCtaUrl = '/contact',
  secondaryCtaLabel = 'Узнать больше',
  secondaryCtaUrl = '#services',
  mediaSrc = '/images/hero-banner/Hero-banner_main_link.mp4',
  videoPoster = '/images/hero-banner/Hero-banner_main_link.png',
}: HeroDashboardProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  // Параллакс: контент плавно уходит вверх, частицы слегка смещаются
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const contentY = useTransform(scrollYProgress, [0, 0.8], [0, -60])

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Видео-фон — фиксированный, без параллакса */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          onEnded={(e) => {
            (e.target as HTMLVideoElement).currentTime = 0
            ;(e.target as HTMLVideoElement).play()
          }}
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ transform: 'scale(1.1)' }}
          poster={videoPoster}
        >
          <source src={mediaSrc} type="video/mp4" />
        </video>
        {/* Затемнение поверх видео */}
        <div className="absolute inset-0 bg-gradient-to-br from-direct-dark/70 via-direct-dark/50 to-direct-dark/70" />
      </div>

      {/* Золотые частицы — лёгкий параллакс */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: useTransform(scrollYProgress, [0, 1], ['0%', '10%']) }}>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-direct-primary"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              filter: `blur(${p.size / 2}px)`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: 'easeInOut',
            }}
          />
        ))}
      </motion.div>

      {/* Основной контент с параллаксом */}
      <motion.div
        className="container mx-auto px-4 relative z-10 py-20"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        <div className="max-w-3xl animate-fade-in">
          {/* Eyebrow */}
          <p className="text-direct-primary font-semibold text-sm md:text-base mb-4 tracking-wider uppercase">
            {eyebrow}
          </p>

          {/* Заголовок */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white">
            {title}
          </h1>

          {/* Подзаголовок */}
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
            {subtitle}
          </p>

          {/* Счётчики */}
          <div className="flex flex-wrap gap-6 mb-10">
            {counters.map((counter, i) => (
              <motion.div
                key={counter.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.15 }}
                className="glass rounded-xl px-5 py-3 border border-direct-primary/10"
              >
                <div className="text-2xl md:text-3xl font-bold text-direct-primary">
                  <AnimatedCounter target={counter.value} suffix={counter.suffix} />
                </div>
                <div className="text-xs text-gray-400 mt-1">{counter.label}</div>
              </motion.div>
            ))}
          </div>

          {/* CTA кнопки — "дышащая" главная кнопка */}
          <div className="flex flex-wrap gap-4">
            <motion.div
              animate={{
                boxShadow: [
                  '0 0 0 0 rgba(212, 168, 75, 0.4)',
                  '0 0 0 16px rgba(212, 168, 75, 0)',
                ],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="rounded-xl"
            >
              <CtaButton
                variant="primary"
                size="md"
                href={primaryCtaUrl}
              >
                {primaryCtaLabel}
              </CtaButton>
            </motion.div>
            <CtaButton
              variant="secondary"
              size="md"
              href={secondaryCtaUrl}
            >
              {secondaryCtaLabel}
            </CtaButton>
          </div>
        </div>
      </motion.div>

      {/* Градиент снизу — плавный переход к следующей секции */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-direct-dark to-transparent z-10 pointer-events-none" />
    </section>
  )
}
