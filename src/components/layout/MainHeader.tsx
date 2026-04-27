'use client'

import { useState } from 'react'
import Link from 'next/link'
import CtaButton from '../ui/CtaButton'
import DropdownMenu from '../ui/DropdownMenu'
import { mitaHeaderBar, mitaCtaGradient, mitaGoldGrad } from '@/lib/mita-landing-styles'
import { cn } from '@/lib/utils/cn'

export default function MainHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { label: 'О компании', url: '/about' },
    { label: 'Услуги', url: '/#services' },
    { label: 'Кейсы', url: '/cases' },
    { label: 'Блог', url: '/blog' },
    { label: 'Карьера', url: '/career' },
    { label: 'Безопасность', url: '/security' },
  ]

  const servicesItems = [
    { label: 'Лидогенерация', url: '/services/leadgen' },
    { label: 'Call-центр', url: '/services/call-center' },
    { label: 'Продвижение на Авито', url: '/services/avito' },
    { label: 'Рекрутинг', url: '/services/recruiting' },
  ]

  return (
    <header className={cn('fixed left-0 right-0 top-0 z-50', mitaHeaderBar)}>
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center">
          <div className="flex min-w-0 flex-1 justify-start">
            <Link href="/" className="group flex items-center gap-3">
              <img
                src="/images/icons/Favicon.ico"
                alt="М.И.Т.А."
                className="h-8 w-8"
              />
              <span className={cn('text-xl font-bold tracking-tight', mitaGoldGrad)}>М.И.Т.А.</span>
            </Link>
          </div>

          <nav className="hidden flex-1 items-center justify-center gap-6 lg:flex xl:gap-8">
            {navItems.map((item) => (
              <Link
                key={item.url}
                href={item.url}
                className="whitespace-nowrap font-medium text-white/60 transition-colors duration-300 hover:text-white/90"
              >
                {item.label}
              </Link>
            ))}

            <DropdownMenu
              triggerLabel="Услуги"
              items={servicesItems}
              align="left"
            />
          </nav>

          <div className="flex flex-1 items-center justify-end gap-2">
            <div className="hidden lg:block">
              <CtaButton
                href="/contact"
                size="md"
                className={cn(mitaCtaGradient, 'hover:!opacity-90')}
              >
                Оставить заявку
              </CtaButton>
            </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-white/60 transition-colors hover:text-white lg:hidden"
            aria-label="Меню"
            aria-expanded={isMobileMenuOpen}
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center gap-1.5">
              <span
                className={`block w-5 h-0.5 bg-current transform transition-all duration-300 ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              />
              <span
                className={`block w-5 h-0.5 bg-current transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block w-5 h-0.5 bg-current transform transition-all duration-300 ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              />
            </div>
          </button>
          </div>
        </div>
      </div>

      {/* Мобильное меню */}
      {isMobileMenuOpen && (
        <>
          {/* Затемнение фона */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          {/* Меню */}
          <div className="fixed left-0 right-0 top-0 z-50 mt-0 max-h-[85vh] overflow-y-auto overflow-x-hidden rounded-b-2xl border-b border-white/10 bg-[#0D0D0D]/95 shadow-2xl backdrop-blur-md animate-fade-in lg:hidden">
            {/* Кнопка закрытия */}
            <div className="flex justify-end px-4 pt-4">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white/70 hover:text-white text-2xl"
                aria-label="Закрыть меню"
              >
                ✕
              </button>
            </div>
          <nav className="flex flex-col py-4 px-6">
            {navItems.map((item) => (
              <Link
                key={item.url}
                href={item.url}
                className="px-6 py-3 text-white/80 transition-colors duration-200 hover:bg-[#D4A84B]/12 hover:text-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            <div className="px-6 py-3">
              <span className="mb-2 block text-xs font-medium uppercase tracking-wider text-white/45">
                Услуги
              </span>
              <div className="ml-2 flex flex-col gap-1">
                {servicesItems.map((item) => (
                  <Link
                    key={item.url}
                    href={item.url}
                    className="py-1 text-white/60 transition-colors duration-200 hover:text-white"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-2 border-t border-white/10 px-6 pt-4 lg:hidden">
              <CtaButton
                href="/contact"
                size="md"
                className={cn(mitaCtaGradient, 'w-full hover:!opacity-90')}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Оставить заявку
              </CtaButton>
            </div>
          </nav>
          </div>
        </>
      )}
    </header>
  )
}
