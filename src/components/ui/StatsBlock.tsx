'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';
import Counter from './Counter';

interface StatsBlockProps {
  stats: Array<{
    label: string;
    before?: string;
    after: string;
    improvement?: string;
    icon?: string;
  }>;
  className?: string;
}

export function StatsBlock({ stats, className }: StatsBlockProps) {
  if (!stats || stats.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className={cn(
        'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6',
        className
      )}
    >
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className="relative p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 shadow-lg overflow-hidden group"
        >
          {/* Glass Effect */}
          <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Icon */}
          {stat.icon && (
            <div className="w-12 h-12 mb-4 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-400/30 flex items-center justify-center overflow-hidden">
              {stat.icon.startsWith('/') ? (
                <Image
                  src={stat.icon}
                  alt={`${stat.label} icon`}
                  width={48}
                  height={48}
                  className="w-12 h-12 object-contain"
                />
              ) : (
                <span className="text-2xl">{stat.icon}</span>
              )}
            </div>
          )}

          {/* After Value (Main) */}
          <div className="relative">
            <p className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400 mb-2">
              {stat.after.includes('%') || stat.after.includes('+') ? (
                <>
                  <Counter value={parseInt(stat.after.replace(/\D/g, ''))} />
                  {stat.after.replace(/\d+/g, '')}
                </>
              ) : (
                stat.after
              )}
            </p>

            {/* Before/After Comparison */}
            {stat.before && (
              <div className="flex items-center gap-2 text-sm mb-2">
                <span className="text-gray-500 line-through">{stat.before}</span>
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            )}

            {/* Improvement */}
            {stat.improvement && (
              <div className="flex items-center gap-1 text-green-400 text-sm font-medium">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                {stat.improvement}
              </div>
            )}

            {/* Label */}
            <p className="text-gray-400 text-sm mt-3">{stat.label}</p>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-2xl group-hover:from-blue-500/20 group-hover:to-purple-500/20 transition-all duration-500" />
        </motion.div>
      ))}
    </motion.div>
  );
}
