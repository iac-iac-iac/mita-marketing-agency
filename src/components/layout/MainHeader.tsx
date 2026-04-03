'use client'

import { useState } from 'react'
import Link from 'next/link'
import CtaButton from '../ui/CtaButton'
import DropdownMenu from '../ui/DropdownMenu'

export default function MainHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { label: 'О компании', url: '/about' },
    { label: 'Услуги', url: '/#services' },
    { label: 'Кейсы', url: '/cases' },
    { label: 'Блог', url: '/blog' },
    { label: 'Безопасность', url: '/security' },
  ]

  const servicesItems = [
    { label: 'Лидогенерация', url: '/services/leadgen' },
    { label: 'Call-центр', url: '/services/call-center' },
    { label: 'Продвижение на Авито', url: '/services/avito' },
    { label: 'Рекрутинг', url: '/services/recruiting' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass glass-strong border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Логотип */}
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src="/images/icons/Favicon.ico"
              alt="М.И.Т.А."
              className="w-8 h-8"
            />
            <span className="text-xl font-bold text-white">М.И.Т.А.</span>
          </Link>

          {/* Десктоп навигация */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.url}
                href={item.url}
                className="text-gray-300 hover:text-white transition-colors duration-300 font-medium"
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

          {/* CTA кнопка */}
          <div className="hidden lg:block">
            <CtaButton
              variant="primary"
              size="md"
              href="#contact"
            >
              Оставить заявку
            </CtaButton>
          </div>

          {/* Мобильное бургер-меню */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-gray-300 hover:text-white transition-colors"
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

      {/* Мобильное меню */}
      {isMobileMenuOpen && (
        <div className="lg:hidden glass glass-strong rounded-2xl mt-4 mb-4 overflow-hidden animate-fade-in">
          <nav className="flex flex-col py-4">
            {navItems.map((item) => (
              <Link
                key={item.url}
                href={item.url}
                className="px-6 py-3 text-gray-300 hover:text-white hover:bg-direct-primary/20 transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            <div className="px-6 py-3">
              <span className="text-gray-400 text-sm uppercase tracking-wider mb-2 block">
                Услуги
              </span>
              <div className="flex flex-col gap-1 ml-2">
                {servicesItems.map((item) => (
                  <Link
                    key={item.url}
                    href={item.url}
                    className="text-gray-300 hover:text-white transition-colors duration-200 py-1"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="px-6 pt-4 mt-2 border-t border-white/10">
              <CtaButton
                variant="primary"
                size="md"
                href="#contact"
                className="w-full"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Оставить заявку
              </CtaButton>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
