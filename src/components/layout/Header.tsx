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
              className="fixed top-0 left-0 z-50 h-full w-80 glass glass-strong p-6 overflow-y-auto"
            >
              <div className="flex flex-col gap-2 mt-20">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.url}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={item.url}
                      className="px-4 py-3 text-lg text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}

                <div className="my-4 border-t border-white/10" />

                <span className="text-gray-400 text-sm uppercase tracking-wider px-4 mb-2">
                  Услуги
                </span>
                {servicesItems.map((item, index) => (
                  <motion.div
                    key={item.url}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (navItems.length + index) * 0.05 }}
                  >
                    <Link
                      href={item.url}
                      className="px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors duration-200"
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
