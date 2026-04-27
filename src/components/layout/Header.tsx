'use client'

import { useState } from 'react'
import Link from 'next/link'
import BackButton from '../ui/BackButton'
import HamburgerMenu from '../ui/HamburgerMenu'
import { motion, AnimatePresence } from 'framer-motion'

export interface HeaderProps {
  showBackButton?: boolean
  showHamburgerMenu?: boolean
}

export default function Header({ showBackButton = false, showHamburgerMenu = false }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const servicesItems = [
    { label: 'Лидогенерация', url: '/services/leadgen' },
    { label: 'Call-центр', url: '/services/call-center' },
    { label: 'Продвижение на Авито', url: '/services/avito' },
    { label: 'Рекрутинг', url: '/services/recruiting' },
  ]

  const navItems = [
    { label: 'Главная', url: '/' },
    { label: 'О компании', url: '/about' },
    { label: 'Кейсы', url: '/cases' },
    { label: 'Блог', url: '/blog' },
    { label: 'Карьера', url: '/career' },
    { label: 'Контакты', url: '/contact' },
  ]

  return (
    <>
      {/* Кнопки слева */}
      <div className="fixed top-6 left-6 z-50 flex items-center gap-3">
        {showBackButton && <BackButton />}
        {showHamburgerMenu && <HamburgerMenu onClick={() => setIsMobileMenuOpen(true)} isOpen={isMobileMenuOpen} />}
      </div>

      {/* Мобильное меню с анимацией */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Затемнение фона с анимацией */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Меню слева с анимацией */}
            <motion.div
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: 'tween', duration: 0.35, ease: 'easeOut' }}
              className="fixed left-0 top-0 z-50 h-full w-80 overflow-y-auto border-r border-white/10 bg-[#0D0D0D]/95 p-6 shadow-2xl backdrop-blur-md"
            >
              <div className="mt-20 flex flex-col gap-2">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.url}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={item.url}
                      className="rounded-xl px-4 py-3 text-lg text-white/70 transition-colors duration-200 hover:bg-[#D4A84B]/10 hover:text-white"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}

                <div className="my-4 border-t border-white/10" />

                <span className="mb-2 px-4 text-xs font-medium uppercase tracking-wider text-white/45">Услуги</span>
                {servicesItems.map((item, index) => (
                  <motion.div
                    key={item.url}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (navItems.length + index) * 0.05 }}
                  >
                    <Link
                      href={item.url}
                      className="rounded-xl px-4 py-3 text-lg text-white/60 transition-colors duration-200 hover:bg-[#D4A84B]/10 hover:text-white"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
