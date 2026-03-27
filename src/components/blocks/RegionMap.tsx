'use client'

import { useState } from 'react'
import { useScrollReveal } from '@/lib/hooks/use-scroll-reveal'
import { motion } from 'framer-motion'

export interface Region {
  name: string;
  cities?: string[];
  active?: boolean;
}

export interface RegionMapProps {
  title: string;
  subtitle?: string;
  totalRegions?: number;
  regions: Region[];
}

/**
 * RegionMap — Список регионов с возможностью масштабирования
 * Показывает географический охват (1-50+ регионов)
 */
export default function RegionMap({
  title,
  subtitle,
  totalRegions,
  regions,
}: RegionMapProps) {
  const [expandedRegion, setExpandedRegion] = useState<number | null>(null)
  const titleRef = useScrollReveal()
  const listRef = useScrollReveal()

  // Группировка регионов по федеральным округам
  const groupedRegions = regions.reduce((acc, region, index) => {
    const groupIndex = Math.floor(index / 5)
    if (!acc[groupIndex]) {
      acc[groupIndex] = []
    }
    acc[groupIndex].push({ ...region, originalIndex: index })
    return acc
  }, [] as Array<Array<Region & { originalIndex: number }>>)

  return (
    <section className="py-16 md:py-20 relative">
      {/* Фоновый градиент */}
      <div className="absolute inset-0 bg-gradient-to-b from-direct-dark via-direct-secondary/30 to-direct-dark" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Заголовок */}
        <div ref={titleRef} className="scroll-reveal mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg text-gray-300 text-center max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
          
          {/* Общее количество регионов */}
          {totalRegions && (
            <div className="mt-6 text-center">
              <div className="inline-block glass px-8 py-4 rounded-2xl border-direct-primary/30">
                <span className="text-5xl font-bold text-direct-primary">{totalRegions}+</span>
                <span className="block text-gray-400 mt-1">регионов по всей России</span>
              </div>
            </div>
          )}
        </div>

        {/* Список регионов */}
        <div ref={listRef} className="scroll-reveal max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {groupedRegions.flatMap((group, groupIndex) =>
              group.map((region, idx) => {
                const globalIndex = groupIndex * 5 + idx
                const isExpanded = expandedRegion === globalIndex

                return (
                  <motion.div
                    key={globalIndex}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.4, delay: globalIndex * 0.05 }}
                    className={`glass rounded-xl p-4 cursor-pointer transition-all duration-300 ${
                      isExpanded 
                        ? 'border-direct-primary/50 shadow-lg shadow-direct-primary/10' 
                        : 'border-white/10 hover:border-direct-primary/30'
                    }`}
                    onClick={() => setExpandedRegion(isExpanded ? null : globalIndex)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {/* Иконка региона */}
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          region.active 
                            ? 'bg-gradient-to-br from-direct-primary to-direct-accent' 
                            : 'bg-gray-700'
                        }`}>
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        
                        {/* Название региона */}
                        <div>
                          <h3 className="font-semibold text-lg">{region.name}</h3>
                          {region.cities && region.cities.length > 0 && (
                            <p className="text-sm text-gray-400">
                              {region.cities.length} {region.cities.length === 1 ? 'город' : region.cities.length < 5 ? 'города' : 'городов'}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Индикатор расширения */}
                      <svg 
                        className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>

                    {/* Раскрывающийся список городов */}
                    {region.cities && region.cities.length > 0 && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ 
                          height: isExpanded ? 'auto' : 0, 
                          opacity: isExpanded ? 1 : 0 
                        }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-3 pt-3 border-t border-white/10">
                          <div className="flex flex-wrap gap-2">
                            {region.cities.map((city, cityIndex) => (
                              <span 
                                key={cityIndex}
                                className="text-xs px-2 py-1 bg-white/5 rounded-md text-gray-300"
                              >
                                {city}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                )
              })
            )}
          </div>
        </div>

        {/* Призыв к действию */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-2">
            Работаем по всей России, включая отдалённые регионы
          </p>
          <p className="text-sm text-gray-500">
            Масштабируйтесь на новые регионы без ограничений
          </p>
        </div>
      </div>
    </section>
  )
}
