'use client'

import { motion } from 'framer-motion'
import Counter from '@/components/ui/Counter'

interface Metric {
  label: string
  value: number
  suffix: string
  description: string
  trend?: 'up' | 'down' | 'neutral'
}

interface AnalyticsDashboardProps {
  title: string
  metrics: Metric[]
}

export default function AnalyticsDashboard({
  title,
  metrics,
}: AnalyticsDashboardProps) {
  return (
    <section 
      className="py-20 px-4 md:px-8 max-w-7xl mx-auto"
      data-testid="analytics-dashboard"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-direct-primary to-direct-accent bg-clip-text text-transparent">
          {title}
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Контролируйте каждый показатель эффективности в реальном времени
        </p>
      </motion.div>

      {/* Dashboard Visual */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8 }}
        className="glass rounded-3xl p-8 mb-12 relative overflow-hidden"
      >
        {/* Background gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-direct-primary/10 via-transparent to-direct-accent/10 pointer-events-none" />
        
        {/* Dashboard header */}
        <div className="relative z-10 flex items-center justify-between mb-8 pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="text-sm text-gray-400 font-mono">
            analytics.М.И.Т.А.ru
          </div>
          <div className="w-20" />
        </div>

        {/* Metrics grid */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <motion.article
              key={metric.label}
              role="article"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass p-6 rounded-2xl hover:bg-white/10 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-sm text-gray-400 font-medium">
                  {metric.label}
                </span>
                {metric.trend && (
                  <span 
                    className={`flex items-center text-sm ${
                      metric.trend === 'up' 
                        ? 'text-green-400' 
                        : metric.trend === 'down'
                        ? 'text-red-400'
                        : 'text-gray-400'
                    }`}
                    data-testid="trend-icon"
                  >
                    {metric.trend === 'up' ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                      </svg>
                    ) : metric.trend === 'down' ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
                      </svg>
                    )}
                  </span>
                )}
              </div>
              
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-4xl font-bold text-direct-primary">
                  <Counter value={metric.value} duration={2.5} />
                </span>
                <span className="text-2xl font-bold text-direct-primary">
                  {metric.suffix}
                </span>
              </div>
              
              <p className="text-xs text-gray-400 leading-relaxed">
                {metric.description}
              </p>
            </motion.article>
          ))}
        </div>

        {/* Chart placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative z-10 mt-8 pt-8 border-t border-white/10"
        >
          <div className="h-32 rounded-xl bg-gradient-to-r from-direct-primary/20 via-direct-accent/20 to-direct-primary/20 flex items-center justify-center">
            <div className="flex items-end gap-2 h-20">
              {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((height, i) => (
                <div
                  key={i}
                  className="w-6 bg-gradient-to-t from-direct-primary to-direct-accent rounded-t opacity-60"
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
          </div>
          <p className="text-center text-xs text-gray-500 mt-4 font-mono">
            Динамика лидов за последние 30 дней
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}
