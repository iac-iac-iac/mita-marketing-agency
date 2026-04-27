'use client'

import { motion } from 'framer-motion'

export default function HamburgerMenu({ onClick, isOpen = false }: { onClick?: () => void; isOpen?: boolean }) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.2 }}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 glass transition-colors duration-300 hover:border-[#D4A84B]/30 hover:bg-white/10"
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
