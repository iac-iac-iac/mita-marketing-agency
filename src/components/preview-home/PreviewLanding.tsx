'use client'

import { useState, type ComponentType, type SVGProps } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import CtaButton from '@/components/ui/CtaButton'
import DropdownMenu from '@/components/ui/DropdownMenu'
import HeroDashboard from '@/components/blocks/HeroDashboard'
import { defaultServices } from '@/components/blocks/ServicesSection'
import { defaultWorkProcess } from '@/components/blocks/WorkProcessSection'
import { footerContacts } from '@/lib/navigation'
import { useScrollReveal } from '@/lib/hooks/use-scroll-reveal'
import { TiltCard } from '@/components/ui/TiltCard'

/** Палитра как на макете: фон #0D0D0D, золото #D4A84B, блик #F5E1A4, glass rgba 5% + blur 10px, body ~60% white */
const bgScreen = 'bg-[#0D0D0D]'
const glassFill = 'bg-white/[0.05] backdrop-blur-[10px]'
const goldText = 'text-[#D4A84B]'
const goldGrad = 'bg-gradient-to-b from-[#F5E1A4] via-[#D4A84B] to-[#9A7B2C] bg-clip-text text-transparent'
const glassCard = `rounded-2xl border border-[#D4A84B]/20 ${glassFill} shadow-lg`

const serviceCardClass = `group relative overflow-hidden rounded-2xl border border-white/[0.08] border-t-[#D4A84B]/35 ${glassFill} p-6 transition-all duration-500 hover:-translate-y-1 hover:border-[#D4A84B]/40 hover:bg-white/[0.07] hover:shadow-[0_12px_40px_rgba(0,0,0,0.4),0_0_15px_rgba(212,168,75,0.28)]`

const navItems = [
  { label: 'О компании', href: '/about' },
  { label: 'Услуги', href: '#services' },
  { label: 'Кейсы', href: '/cases' },
  { label: 'Блог', href: '/blog' },
  { label: 'Карьера', href: '/career' },
  { label: 'Безопасность', href: '/security' },
]

const servicesItems = [
  { label: 'Лидогенерация', url: '/services/leadgen' },
  { label: 'Call-центр', url: '/services/call-center' },
  { label: 'Продвижение на Авито', url: '/services/avito' },
  { label: 'Рекрутинг', url: '/services/recruiting' },
]

const stats = [
  { value: '500+', label: 'довольных клиентов' },
  // Неразрывный пробел, чтобы на узких колонках не рвалось "50" / "000+"
  { value: '50\u00A0000+', label: 'лидов в месяц' },
  { value: '98%', label: 'клиентов рекомендуют' },
  { value: '4', label: 'направления услуг' },
]

type IconType = ComponentType<SVGProps<SVGSVGElement> & { className?: string }>

const whyItems: { title: string; text: string; icon: IconType }[] = [
  {
    title: 'Гарантия результата',
    text: 'Мы не просто запускаем кампании — договариваемся о метриках и доводим план до результата.',
    icon: ({ className }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: 'Полная прозрачность',
    text: 'Аналитика по каналам: вы видите лиды, звонки и этапы воронки без «чёрного ящика».',
    icon: ({ className }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
  },
  {
    title: 'Подход к работе',
    text: 'Сначала аудит и стратегия, затем настройка и запуск с понятными сроками и зоной ответственности.',
    icon: ({ className }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
  },
  {
    title: 'Речевой сервис',
    text: 'Call-центр и скрипты под ваш продукт: квалификация и передача тёплых лидов в отдел продаж.',
    icon: ({ className }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
]

const accredItems: { title: string; text: string; icon: IconType }[] = [
  {
    title: 'Полная юридическая чистота',
    text: 'Работаем по договору, закрывающие документы и прозрачные платежи.',
    icon: ({ className }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    title: 'Защита данных',
    text: 'Соблюдение 152-ФЗ: хранение и обработка персональных данных в правовом поле.',
    icon: ({ className }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
  },
  {
    title: 'Собственные IT-решения',
    text: 'Своя CMS и интеграции — контроль над данными и процессами для клиентов.',
    icon: ({ className }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    title: 'Проверенные площадки',
    text: 'Работа с рекламными и классифайд-площадками в рамках согласованных регламентов.',
    icon: ({ className }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
]

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

export default function PreviewLanding() {
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter()
  const servicesTitleRef = useScrollReveal()

  return (
    <div className={`min-h-screen ${bgScreen} text-white`}>
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-[#0D0D0D]/85 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <div className="flex h-20 items-center justify-between">
            <Link href="/" className={`text-xl font-bold tracking-tight ${goldGrad}`}>
              М.И.Т.А.
            </Link>

            <nav className="hidden items-center gap-6 lg:flex">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm font-medium text-white/60 transition-colors hover:text-white/90"
                >
                  {item.label}
                </Link>
              ))}
              <DropdownMenu triggerLabel="Услуги" items={servicesItems} align="left" />
            </nav>

            <div className="hidden lg:block">
              <CtaButton
                href="/contact"
                className="!border-0 !bg-gradient-to-r from-[#B8892E] to-[#F5E1A4] !text-[#0D0D0D] !shadow-[0_0_24px_rgba(212,168,75,0.4)] hover:!opacity-90"
                size="md"
              >
                Оставить заявку
              </CtaButton>
            </div>

            <button
              type="button"
              className="p-2 text-white/60 lg:hidden"
              aria-label="Меню"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((o) => !o)}
            >
              <div className="flex flex-col justify-center gap-1.5">
                <span
                  className={`block h-0.5 w-5 bg-current transition ${menuOpen ? 'translate-y-2 rotate-45' : ''}`}
                />
                <span className={`block h-0.5 w-5 bg-current transition ${menuOpen ? 'opacity-0' : ''}`} />
                <span
                  className={`block h-0.5 w-5 bg-current transition ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`}
                />
              </div>
            </button>
          </div>
        </div>

        {menuOpen && (
          <>
            <div
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
              onClick={() => setMenuOpen(false)}
              aria-hidden
            />
            <div className="animate-fade-in fixed left-0 right-0 top-20 z-50 max-h-[80vh] overflow-y-auto rounded-b-2xl border-b border-white/10 bg-[#0D0D0D]/95 shadow-2xl backdrop-blur-md">
              <nav className="flex flex-col px-4 py-4">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="rounded-lg px-4 py-3 text-white/80 hover:bg-[#D4A84B]/12"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="mt-2 border-t border-white/10 pt-2">
                  <p className="px-4 pb-1 text-xs uppercase text-white/45">Услуги</p>
                  {servicesItems.map((s) => (
                    <Link
                      key={s.url}
                      href={s.url}
                      className="block py-2 pl-6 text-white/60"
                      onClick={() => setMenuOpen(false)}
                    >
                      {s.label}
                    </Link>
                  ))}
                </div>
                <div className="p-4 pt-4">
                  <CtaButton
                    href="/contact"
                    className="w-full !border-0 !bg-gradient-to-r from-[#B8892E] to-[#F5E1A4] !text-[#0D0D0D] !shadow-[0_0_20px_rgba(212,168,75,0.35)]"
                    onClick={() => setMenuOpen(false)}
                  >
                    Оставить заявку
                  </CtaButton>
                </div>
              </nav>
            </div>
          </>
        )}
      </header>

      <main>
        <HeroDashboard
          eyebrow="Маркетинговое IT-агентство"
          title="Постоянный поток клиентов для вашего бизнеса"
          subtitle="Комплексные маркетинговые решения и IT-сервисы для стабильного роста продаж. От лидогенерации до рекрутинга — всё в одном месте."
          primaryCtaLabel="Оставить заявку"
          primaryCtaUrl="/contact"
          secondaryCtaLabel="Узнать больше"
          secondaryCtaUrl="#services"
          videoOverlayClassName="bg-gradient-to-br from-[#0D0D0D]/80 via-[#0D0D0D]/55 to-[#0D0D0D]/80"
          bottomSectionFadeClassName="from-[#0D0D0D]"
          subtitleClassName="text-xl md:text-2xl text-white/60 mb-8 leading-relaxed"
        />

        <section id="services" className="relative py-16 md:py-24">
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0D0D0D] via-[#0D0D0D] to-[#0D0D0D]"
            aria-hidden
          />

          <div className="container relative z-10 mx-auto px-4">
            <div ref={servicesTitleRef} className="scroll-reveal mb-8 md:mb-10">
              <h2 className={`text-3xl font-bold md:text-4xl ${goldText}`}>Наши услуги</h2>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {defaultServices.map((s, index) => (
                <motion.div
                  key={s.name}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.55, delay: index * 0.08 }}
                  className="h-full"
                >
                  <TiltCard
                    className={`${serviceCardClass} group h-full cursor-pointer`}
                    onClick={() => s.ctaUrl && router.push(s.ctaUrl)}
                    effect="evade"
                    tiltLimit={12}
                    scale={1.03}
                  >
                    <div>
                      <motion.div
                        className="mb-4 flex h-20 w-20 items-center justify-center text-[#D4A84B] sm:h-24 sm:w-24"
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
                        <Image
                          src={s.icon}
                          alt=""
                          width={96}
                          height={96}
                          className="h-16 w-16 object-contain drop-shadow-[0_0_14px_rgba(212,168,75,0.35)] transition-transform duration-500 group-hover:scale-110 sm:h-20 sm:w-20"
                        />
                      </motion.div>
                      <h3 className={`mb-1 text-lg font-semibold transition-colors group-hover:text-[#F5E1A4] ${goldText}`}>
                        {s.name}
                      </h3>
                      {s.label ? (
                        <p className="mb-2 text-sm font-medium text-[#D4A84B]/90">{s.label}</p>
                      ) : null}
                      <p className="text-sm leading-relaxed text-white/60 transition-colors group-hover:text-white/75">
                        {s.description}
                      </p>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative py-16 md:py-20">
          <div
            className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-[#D4A84B]/[0.06] via-transparent to-[#D4A84B]/[0.06]"
            aria-hidden
          />
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5 }}
              className={`mb-12 text-center text-3xl font-bold md:text-4xl ${goldText}`}
            >
              Результаты в цифрах
            </motion.h2>
            <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 lg:grid-cols-4">
              {stats.map((st, i) => (
                <motion.div
                  key={st.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="text-center"
                >
                  <div
                    className={`mb-2 whitespace-nowrap bg-gradient-to-b from-[#F5E1A4] to-[#D4A84B] bg-clip-text text-4xl font-bold text-transparent md:text-5xl lg:text-6xl`}
                  >
                    {st.value}
                  </div>
                  <div className="text-sm text-white/60 md:text-base">{st.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5 }}
              className={`mb-16 text-center text-3xl font-bold md:text-4xl ${goldText}`}
            >
              Как мы работаем
            </motion.h2>

            <div className="relative mx-auto max-w-4xl">
              <div
                className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#F5E1A4]/90 via-[#D4A84B] to-[#9A7B2C]/50 md:left-1/2 md:-translate-x-1/2"
                aria-hidden
              />

              <ul className="space-y-12 md:space-y-16">
                {defaultWorkProcess.map((step, i) => {
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
                        className="absolute top-0 z-10 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border-2 border-[#D4A84B] bg-[#0D0D0D] text-[#F5E1A4] shadow-[0_0_16px_rgba(212,168,75,0.35)] left-4 md:left-1/2"
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
                        <h3 className={`text-lg font-semibold md:text-xl ${goldText}`}>
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

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <motion.h2
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.45 }}
                  className={`mb-8 text-2xl font-bold md:text-3xl ${goldText}`}
                >
                  Почему выбирают нас
                </motion.h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {whyItems.map((w, wi) => {
                    const Icon = w.icon
                    return (
                      <motion.div
                        key={w.title}
                        initial={{ opacity: 0, y: 28 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{ duration: 0.5, delay: wi * 0.06 }}
                        className={`${glassCard} p-5 transition duration-300 hover:border-[#D4A84B]/40 hover:shadow-[0_0_15px_rgba(212,168,75,0.15)]`}
                      >
                        <Icon className="mb-3 h-8 w-8 shrink-0 text-[#D4A84B]" aria-hidden />
                        <h3 className="mb-2 border-b border-white/[0.08] pb-2 font-semibold text-[#D4A84B]">
                          {w.title}
                        </h3>
                        <p className="text-sm text-white/60">{w.text}</p>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
              <div>
                <motion.h2
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.45 }}
                  className={`mb-8 text-2xl font-bold md:text-3xl ${goldText}`}
                >
                  Аккредитация и сертификаты
                </motion.h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {accredItems.map((a, ai) => {
                    const Icon = a.icon
                    return (
                      <motion.div
                        key={a.title}
                        initial={{ opacity: 0, y: 28 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{ duration: 0.5, delay: ai * 0.06 }}
                        className={`${glassCard} p-5 transition duration-300 hover:border-[#D4A84B]/40 hover:shadow-[0_0_15px_rgba(212,168,75,0.15)]`}
                      >
                        <Icon className="mb-3 h-8 w-8 shrink-0 text-[#D4A84B]" aria-hidden />
                        <h3 className="mb-2 border-b border-white/[0.08] pb-2 font-semibold text-[#D4A84B]">
                          {a.title}
                        </h3>
                        <p className="text-sm text-white/60">{a.text}</p>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-[#0D0D0D]">
        <div className="container mx-auto px-4 py-12">
          <div className="mb-10 grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <Link href="/" className={`inline-block text-xl font-bold ${goldGrad}`}>
                М.И.Т.А.
              </Link>
              <p className="mt-2 text-sm text-white/50">
                © {new Date().getFullYear()} M.I.T.A. Агентство
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5">
              <div>
                <h4 className="mb-3 text-sm font-semibold text-white/90">Навигация</h4>
                <ul className="space-y-2 text-sm text-white/60">
                  <li>
                    <Link href="/about" className="hover:text-white">
                      О компании
                    </Link>
                  </li>
                  <li>
                    <Link href="#services" className="hover:text-white">
                      Услуги
                    </Link>
                  </li>
                  <li>
                    <Link href="/cases" className="hover:text-white">
                      Кейсы
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog" className="hover:text-white">
                      Блог
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="mb-3 text-sm font-semibold text-white/90">Контакты</h4>
                <ul className="space-y-2 text-sm text-white/60">
                  <li className="text-white/85">{footerContacts.email}</li>
                  <li>{footerContacts.phone}</li>
                  <li className="pt-1 text-xs text-white/45">{footerContacts.address}</li>
                </ul>
              </div>
              <div>
                <h4 className="mb-3 text-sm font-semibold text-white/90">Право</h4>
                <ul className="space-y-2 text-sm text-white/60">
                  <li>
                    <Link href="/legal/privacy" className="hover:text-white">
                      Политика конфиденциальности
                    </Link>
                  </li>
                  <li>
                    <Link href="/legal/terms" className="hover:text-white">
                      Правила сервиса
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className={`${glassCard} p-6`}>
                <h3 className={`text-lg font-semibold ${goldText}`}>Готовы к росту?</h3>
                <p className="mt-2 text-sm text-white/60">
                  Оставьте заявку — обсудим задачу и предложим понятный план: от стратегии до лидов и метрик.
                </p>
                <div className="mt-4">
                  <CtaButton
                    href="/contact"
                    className="!border-0 !bg-gradient-to-r from-[#B8892E] to-[#F5E1A4] !text-[#0D0D0D] !shadow-[0_0_15px_rgba(212,168,75,0.3)]"
                  >
                    Оставить заявку
                  </CtaButton>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:items-center">
            <span>Маркетинговое IT-агентство полного цикла</span>
            <div className="flex gap-4">
              <Link href="/legal/terms" className="text-white/50 hover:text-white/80">
                Правила сервиса
              </Link>
              <Link href="/legal/privacy" className="text-white/50 hover:text-white/80">
                Политика конфиденциальности
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
