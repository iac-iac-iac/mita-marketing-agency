'use client'

import { motion } from 'framer-motion'

export default function HamburgerMenu({ onClick }: { onClick?: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.1 }}
      className="w-10 h-10 rounded-full glass hover:bg-white/15 transition-colors duration-300 flex items-center justify-center"
      aria-label="Меню"
    >
      <div className="w-5 h-5 flex flex-col justify-center items-center gap-1.5">
        <motion.span
          className="w-4 h-0.5 bg-white rounded-full origin-center"
          animate={{ rotate: 45, y: 6 }}
          transition={{ duration: 0.3 }}
        />
        <motion.span
          className="w-4 h-0.5 bg-white rounded-full"
          animate={{ opacity: 0, width: 0 }}
          transition={{ duration: 0.3 }}
        />
        <motion.span
          className="w-4 h-0.5 bg-white rounded-full origin-center"
          animate={{ rotate: -45, y: -6 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.button>
  )
}
