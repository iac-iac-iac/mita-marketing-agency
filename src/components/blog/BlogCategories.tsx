'use client'

import Image from 'next/image'
import { useState } from 'react'
import { motion } from 'framer-motion'

interface Category {
  id: string
  name: string
  description: string
  icon: string
  count?: number
}

interface BlogCategoriesProps {
  categories?: Category[]
  onCategorySelect?: (categoryId: string | null) => void
}

const defaultCategories: Category[] = [
  {
    id: 'lead-generation',
    name: 'Лидогенерация',
    description: 'Стратегии и инструменты привлечения клиентов',
    icon: '/images/blog_category/blog_category_lead_generation.png',
    count: 5,
  },
  {
    id: 'call-center',
    name: 'Call-центр',
    description: 'Продажи по телефону и работа с клиентами',
    icon: '/images/blog_category/blog_category_call_center.png',
    count: 8,
  },
  {
    id: 'avito',
    name: 'Авито',
    description: 'Продвижение на платформе Авито',
    icon: '/images/blog_category/blog_category_avito.png',
    count: 3,
  },
  {
    id: 'recruiting',
    name: 'Рекрутинг',
    description: 'Подбор персонала и HR-технологии',
    icon: '/images/blog_category/blog_category_recruiting.png',
    count: 4,
  },
  {
    id: 'analytics',
    name: 'Аналитика',
    description: 'Сквозная аналитика и оптимизация',
    icon: '/images/blog_category/blog_category_analytics.png',
    count: 6,
  },
]

export default function BlogCategories({ categories, onCategorySelect }: BlogCategoriesProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const categoryList = categories || defaultCategories

  const handleCategoryClick = (categoryId: string) => {
    const newActive = activeCategory === categoryId ? null : categoryId
    setActiveCategory(newActive)
    onCategorySelect?.(newActive)
  }

  return (
    <section className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Категории
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Выберите интересующую вас тему
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categoryList.map((category, index) => (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              onClick={() => handleCategoryClick(category.id)}
              className={`glass p-6 rounded-2xl hover:bg-white/10 transition-all duration-300 flex flex-col items-center text-center ${
                activeCategory === category.id ? 'ring-2 ring-direct-primary bg-direct-primary/10' : ''
              }`}
            >
              <div className="w-16 h-16 rounded-xl bg-direct-primary/20 flex items-center justify-center mb-4 overflow-hidden">
                <Image
                  src={category.icon}
                  alt={`${category.name} icon`}
                  width={64}
                  height={64}
                  className="w-16 h-16 object-contain"
                />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                {category.name}
              </h3>
              <p className="text-xs text-gray-400 mb-3">
                {category.description}
              </p>
              {category.count && (
                <span className="text-xs text-direct-primary font-medium">
                  {category.count} материалов
                </span>
              )}
            </motion.button>
          ))}
        </div>

        {activeCategory && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mt-8"
          >
            <button
              onClick={() => {
                setActiveCategory(null)
                onCategorySelect?.(null)
              }}
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              Показать все статьи
            </button>
          </motion.div>
        )}
      </div>
    </section>
  )
}
