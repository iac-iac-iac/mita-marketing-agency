'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface TeamMember {
  name: string
  role: string
  image: string
}

const teamMembers: TeamMember[] = [
  {
    name: 'Сергей Хуммедов',
    role: 'Коммерческий директор',
    image: '/images/team/Director_Sergey.png',
  },
  {
    name: 'Евгений Покусаев',
    role: 'Руководитель колл-центра №2',
    image: '/images/team/Evgeniy.png',
  },
  {
    name: 'Сергей Чурбаков',
    role: 'Руководитель отдела Авито и Рекрутинга',
    image: '/images/team/Sergey.png',
  },
  {
    name: 'Полина Дергачёва',
    role: 'HR менеджер',
    image: '/images/team/Polina.png',
  },
  {
    name: 'Кристина Покусаева',
    role: 'Бизнес ассистент',
    image: '/images/team/Kristina.png',
  },
  {
    name: 'Злата Сорокина',
    role: 'Руководитель отдела продаж',
    image: '/images/team/Zlata.png',
  },
  {
    name: 'Алия Осипова',
    role: 'Руководитель отдела аналитики',
    image: '/images/team/Aliya.png',
  },
  {
    name: 'Надежда Поворова',
    role: 'Руководитель колл-центра №4',
    image: '/images/team/Hope2.png',
  },
  {
    name: 'Венера Мефедюк',
    role: 'Руководитель отдела тестов',
    image: '/images/team/Venera.png',
  },
  {
    name: 'Надежда Чернецова',
    role: 'Руководитель колл-центра №1',
    image: '/images/team/Hope.png',
  },
]

export default function TeamCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
  }

  const nextSlide = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % teamMembers.length)
  }

  const prevSlide = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + teamMembers.length) % teamMembers.length)
  }

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Карточки команды */}
      <div className="relative h-[400px] overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.3 },
              scale: { duration: 0.3 },
            }}
            className="absolute inset-0"
          >
            <div className="glass p-8 rounded-3xl flex flex-col md:flex-row items-center gap-8">
              {/* Фото */}
              <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl">
                <Image
                  src={teamMembers[currentIndex].image}
                  alt={teamMembers[currentIndex].name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Информация */}
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-3xl font-bold text-white mb-2">
                  {teamMembers[currentIndex].name}
                </h3>
                <p className="text-xl text-direct-primary mb-2">
                  {teamMembers[currentIndex].role}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Кнопки навигации */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          onClick={prevSlide}
          className="w-12 h-12 rounded-full glass hover:bg-white/10 flex items-center justify-center transition-colors"
          aria-label="Предыдущий"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Индикаторы */}
        <div className="flex gap-2">
          {teamMembers.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1)
                setCurrentIndex(index)
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'w-8 bg-direct-primary'
                  : 'bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Слайд ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="w-12 h-12 rounded-full glass hover:bg-white/10 flex items-center justify-center transition-colors"
          aria-label="Следующий"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}
