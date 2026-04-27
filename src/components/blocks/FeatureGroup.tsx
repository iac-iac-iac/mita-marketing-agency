'use client'

import Image from 'next/image'
import { useScrollReveal } from '@/lib/hooks/use-scroll-reveal'
import { useScrollRevealMulti } from '@/lib/hooks/use-scroll-reveal-multi'
import { useRouter } from 'next/navigation'
import TextLinkCta from '@/components/ui/TextLinkCta'
import { motion } from 'framer-motion'
import { TiltCard } from '@/components/ui/TiltCard'
import { mitaServiceCard, mitaGoldText } from '@/lib/mita-landing-styles'
import { cn } from '@/lib/utils/cn'

function ServiceCardMita({
  item,
  index,
}: {
  item: {
    name: string
    label: string
    description: string
    icon?: string | React.ReactNode
    ctaLabel?: string
    ctaUrl?: string
  }
  index: number
}) {
  const router = useRouter()
  const hasLink = !!item.ctaUrl

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      className="h-full"
    >
      <TiltCard
        className={cn(mitaServiceCard, 'h-full', hasLink && 'cursor-pointer')}
        onClick={() => hasLink && router.push(item.ctaUrl!)}
        effect="evade"
        tiltLimit={12}
        scale={1.03}
      >
        <div>
          {item.icon && (
            <motion.div
              className="mb-4 flex h-20 w-20 items-center justify-center sm:h-24 sm:w-24"
              initial={{ scale: 0.85, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                type: 'spring',
                stiffness: 220,
                damping: 18,
                delay: index * 0.08 + 0.12,
              }}
            >
              {typeof item.icon === 'string' && item.icon.startsWith('/') ? (
                <Image
                  src={item.icon}
                  alt=""
                  width={96}
                  height={96}
                  className="h-16 w-16 object-contain drop-shadow-[0_0_14px_rgba(212,168,75,0.35)] transition-transform duration-500 group-hover:scale-110 sm:h-20 sm:w-20"
                />
              ) : (
                <span className="text-4xl">{item.icon}</span>
              )}
            </motion.div>
          )}
          <h3
            className={cn(
              'mb-1 text-lg font-semibold transition-colors group-hover:text-[#F5E1A4]',
              mitaGoldText
            )}
          >
            {item.name}
          </h3>
          <p className="mb-2 text-sm font-medium text-[#D4A84B]/90">{item.label}</p>
          <p className="text-sm leading-relaxed text-white/60 transition-colors group-hover:text-white/75">
            {item.description}
          </p>
          {item.ctaLabel && item.ctaUrl && (
            <div className="mt-4" onClick={(e) => e.stopPropagation()}>
              <TextLinkCta label={item.ctaLabel} href={item.ctaUrl} />
            </div>
          )}
        </div>
      </TiltCard>
    </motion.div>
  )
}

function ServiceCardClassic({
  item,
  index,
  setRef,
}: {
  item: {
    name: string
    label: string
    description: string
    icon?: string | React.ReactNode
    ctaLabel?: string
    ctaUrl?: string
  }
  index: number
  setRef: (index: number) => (node: HTMLDivElement | null) => void
}) {
  const router = useRouter()
  const hasLink = !!item.ctaUrl

  return (
    <motion.div
      ref={setRef(index)}
      initial={{ opacity: 0, x: 0, y: 50 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={cn(
        'glass scroll-reveal rounded-2xl p-6 transition-all duration-500',
        hasLink && 'cursor-pointer hover:scale-[1.02] hover:bg-white/10 hover:shadow-xl hover:shadow-direct-primary/10'
      )}
      onClick={() => hasLink && router.push(item.ctaUrl!)}
    >
      {item.icon && (
        <motion.div
          className="mb-4"
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.4,
            delay: index * 0.1 + 0.2,
            type: 'spring',
            stiffness: 200,
            damping: 10,
          }}
        >
          {typeof item.icon === 'string' && item.icon.startsWith('/') ? (
            <Image
              src={item.icon}
              alt={`${item.name} icon`}
              width={64}
              height={64}
              className="h-16 w-16 object-contain"
            />
          ) : (
            <span className="text-4xl">{item.icon}</span>
          )}
        </motion.div>
      )}

      <h3 className="mb-2 text-xl font-semibold transition-colors hover:text-direct-primary">
        {item.name}
      </h3>
      <p className="mb-3 text-sm font-medium text-direct-primary">{item.label}</p>
      <p className="leading-relaxed text-white/60">{item.description}</p>
      {item.ctaLabel && item.ctaUrl && (
        <div className="mt-4">
          <TextLinkCta label={item.ctaLabel} href={item.ctaUrl} />
        </div>
      )}
    </motion.div>
  )
}

export interface FeatureGroupProps {
  groupTitle: string
  groupIntro: string
  items: {
    name: string
    label: string
    description: string
    icon?: string | React.ReactNode
    ctaLabel?: string
    ctaUrl?: string
  }[]
  groupCtaLabel?: string
  groupCtaUrl?: string
  /** Карточки с наклоном/spotlight как на превью-главной */
  tilt?: boolean
}

export default function FeatureGroup({
  groupTitle,
  groupIntro,
  items,
  groupCtaLabel,
  groupCtaUrl,
  tilt = false,
}: FeatureGroupProps) {
  const titleRef = useScrollReveal()
  const { setRef } = useScrollRevealMulti<HTMLDivElement>(items.length)
  const ctaRef = useScrollReveal()

  return (
    <section className="relative py-20 md:py-28">
      <div
        className={cn('absolute inset-0', tilt ? 'bg-gradient-to-b from-[#0D0D0D] via-[#0D0D0D] to-[#0D0D0D]' : 'bg-gradient-to-b from-direct-dark via-direct-purple/30 to-direct-dark')}
      />

      <div className="container relative z-10 mx-auto px-4">
        <div ref={titleRef} className="scroll-reveal">
          <div className="mx-auto mb-16 max-w-4xl text-center">
            <h2
              className={cn(
                'mb-6 text-3xl font-bold md:text-4xl lg:text-5xl',
                tilt && mitaGoldText
              )}
            >
              {groupTitle}
            </h2>
            <p
              className={cn(
                'text-xl leading-relaxed',
                tilt ? 'text-white/60' : 'text-white/70'
              )}
            >
              {groupIntro}
            </p>
          </div>
        </div>

        <div className="mx-auto mb-12 grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) =>
            tilt ? (
              <ServiceCardMita key={index} item={item} index={index} />
            ) : (
              <ServiceCardClassic key={index} item={item} index={index} setRef={setRef} />
            )
          )}
        </div>

        {groupCtaLabel && groupCtaUrl && (
          <div ref={ctaRef} className="scroll-reveal scroll-reveal-delay-4 text-center">
            <TextLinkCta label={groupCtaLabel} href={groupCtaUrl} />
          </div>
        )}
      </div>
    </section>
  )
}
