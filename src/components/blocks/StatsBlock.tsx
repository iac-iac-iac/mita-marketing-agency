'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

interface StatItem {
  label: string
  value: string
  icon: string
}

interface StatsBlockProps {
  stats: StatItem[]
  title?: string
}

export default function StatsBlock({ stats, title }: StatsBlockProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="glass p-4 rounded-xl text-center hover:bg-white/5 transition-colors"
        >
          <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-direct-primary/20 flex items-center justify-center overflow-hidden">
            <Image
              src={stat.icon}
              alt={`${stat.label} icon`}
              width={48}
              height={48}
              className="w-12 h-12 object-contain"
            />
          </div>
          <div className="text-2xl font-bold text-direct-primary mb-1">
            {stat.value}
          </div>
          <div className="text-xs text-gray-400">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
