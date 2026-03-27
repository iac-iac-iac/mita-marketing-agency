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
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass hover:bg-white/15 transition-colors duration-300 text-gray-300 hover:text-white"
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
