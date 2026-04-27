'use client'

import { motion } from 'framer-motion'

export default function BackButton() {
  const handleBack = () => {
    window.history.back()
  }

  return (
    <motion.button
      onClick={handleBack}
      whileHover={{ scale: 1.05, x: -4 }}
      whileTap={{ scale: 0.95 }}
      className="inline-flex items-center gap-2 rounded-full border border-white/10 glass px-4 py-2 text-white/70 transition-colors duration-300 hover:bg-white/10 hover:text-white"
      aria-label="Вернуться назад"
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 19l-7-7m0 0l7-7m-7 7h18"
        />
      </svg>
      <span className="text-sm font-medium">Назад</span>
    </motion.button>
  )
}
