'use client'

import { motion } from 'framer-motion'

export default function HamburgerMenu({ onClick, isOpen = false }: { onClick?: () => void; isOpen?: boolean }) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.2 }}
      className="w-10 h-10 rounded-full glass hover:bg-white/15 transition-colors duration-300 flex items-center justify-center"
      aria-label="Меню"
    >
      <div className="w-5 h-5 flex flex-col justify-center items-center gap-1.5">
        <motion.span
          className="w-4 h-0.5 bg-white rounded-full origin-center"
          animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 6 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        />
        <motion.span
          className="w-4 h-0.5 bg-white rounded-full"
          animate={{ opacity: isOpen ? 0 : 1, width: isOpen ? 0 : '100%' }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        />
        <motion.span
          className="w-4 h-0.5 bg-white rounded-full origin-center"
          animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -6 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        />
      </div>
    </motion.button>
  )
}
