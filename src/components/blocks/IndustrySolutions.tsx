'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

interface IndustryItem {
  icon: string
  name: string
  description: string
  ctaUrl: string
}

interface IndustrySolutionsProps {
  items?: IndustryItem[]
  title?: string
  subtitle?: string
}

const defaultItems: IndustryItem[] = [
  {
    icon: '/images/icons/service_icon/1_service_icon_Lead_generation.png',
    name: 'Лидогенерация',
    description: 'IT-сервис для поиска номеров телефонов людей, интересующихся продуктами клиента + первичный обзвон.',
    ctaUrl: '/services/leadgen',
  },
  {
    icon: '/images/icons/service_icon/2_service_icon_Call_center.png',
    name: 'Call-центр',
    description: 'Обзвон номеров клиента для получения горячих лидов. Холодные и тёплые звонки, обработка входящих заявок.',
    ctaUrl: '/services/call-center',
  },
  {
    icon: '/images/icons/service_icon/3_service_icon_Classified_ads.png',
    name: 'Авито',
    description: 'Продвижение на платформе Авито. Публикация объявлений, ведение аккаунта, оптимизация под поисковые запросы.',
    ctaUrl: '/services/avito',
  },
  {
    icon: '/images/icons/service_icon/4_service_icon_Recruiting.png',
    name: 'Рекрутинг',
    description: 'Поиск, привлечение, отбор и наём сотрудников. Массовый подбор с использованием call-центра.',
    ctaUrl: '/services/recruiting',
  },
]

export default function IndustrySolutions({
  items = defaultItems,
  title = 'Наши услуги',
  subtitle = 'Комплексный подход к решению ваших маркетинговых задач. Четыре направления, которые работают как единый механизм для роста вашего бизнеса.',
}: IndustrySolutionsProps) {
  return (
    <section className="py-20 md:py-28 relative">
      {/* Фоновый градиент */}
      <div className="absolute inset-0 bg-gradient-to-b from-direct-dark via-direct-secondary/50 to-direct-dark" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Заголовок и вступление */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{title}</h2>
          <p className="text-xl text-gray-300 leading-relaxed">{subtitle}</p>
        </motion.div>

        {/* Карточки услуг */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {items.map((item, index) => (
            <Link key={item.name} href={item.ctaUrl} className="block group">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass p-6 rounded-2xl hover:bg-white/10 transition-all duration-500 cursor-pointer group-hover:scale-[1.02] group-hover:shadow-xl group-hover:shadow-direct-primary/10 h-full"
              >
                {/* Иконка */}
                <motion.div
                  className="mb-4"
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 + 0.2, type: 'spring', stiffness: 200, damping: 10 }}
                >
                  <Image
                    src={item.icon}
                    alt={`${item.name} icon`}
                    width={64}
                    height={64}
                    className="w-16 h-16 object-contain"
                  />
                </motion.div>

                <h3 className="text-xl font-semibold mb-2 group-hover:text-direct-primary transition-colors">
                  {item.name}
                </h3>
                <p className="text-gray-300 leading-relaxed text-sm">{item.description}</p>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
