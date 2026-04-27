'use client'

import { motion } from 'framer-motion'
import type { ProcessStep } from '@/components/blocks/WorkProcessSection'
import { mitaGoldText } from '@/lib/mita-landing-styles'

function iconSearch() {
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  )
}
function iconGear() {
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
}
function iconPlane() {
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
  )
}
function iconChart() {
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  )
}

const timelineIcons = [iconSearch, iconGear, iconPlane, iconChart]
const timelineAlign: ('right' | 'left')[] = ['right', 'right', 'left', 'right']

export interface ProcessTimelineSectionProps {
  title?: string
  steps: ProcessStep[]
}

export default function ProcessTimelineSection({
  title = 'Как мы работаем',
  steps,
}: ProcessTimelineSectionProps) {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className={`mb-16 text-center text-3xl font-bold md:text-4xl ${mitaGoldText}`}
        >
          {title}
        </motion.h2>

        <div className="relative mx-auto max-w-4xl">
          <div
            className="absolute bottom-0 left-4 top-0 w-0.5 bg-gradient-to-b from-[#F5E1A4]/90 via-[#D4A84B] to-[#9A7B2C]/50 md:left-1/2 md:-translate-x-1/2"
            aria-hidden
          />

          <ul className="space-y-12 md:space-y-16">
            {steps.map((step, i) => {
              const Icon = timelineIcons[i] ?? iconSearch
              const align = timelineAlign[i] ?? 'right'
              return (
                <motion.li
                  key={step.number}
                  initial={{ opacity: 0, x: align === 'right' ? 24 : -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.55, delay: i * 0.06 }}
                  className="relative min-h-[4.5rem]"
                >
                  <div
                    className="absolute left-4 top-0 z-10 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border-2 border-[#D4A84B] bg-[#0D0D0D] text-[#F5E1A4] shadow-[0_0_16px_rgba(212,168,75,0.35)] md:left-1/2"
                    aria-hidden
                  >
                    <Icon />
                  </div>

                  <div
                    className={
                      align === 'right'
                        ? 'pl-12 md:ml-[50%] md:pl-10'
                        : 'pl-12 md:mr-[50%] md:pr-10 md:text-right'
                    }
                  >
                    <h3 className={`text-lg font-semibold md:text-xl ${mitaGoldText}`}>
                      {step.number}. {step.title}
                    </h3>
                    <p className="mt-2 text-sm text-white/60 md:text-base">{step.description}</p>
                  </div>
                </motion.li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
