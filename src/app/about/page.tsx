import Header from '@/components/layout/Header'
import TeamCarousel from '@/components/ui/TeamCarousel'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'О компании | М.И.Т.А.',
  description: 'Команда профессионалов М.И.Т.А. — маркетинговое IT-агентство полного цикла',
  openGraph: {
    title: 'О компании | М.И.Т.А.',
    description: 'Команда профессионалов М.И.Т.А. — маркетинговое IT-агентство полного цикла',
    type: 'website',
    locale: 'ru_RU',
    images: [
      {
        url: '/images/OG_image/OG_image_Blog_and_case_studies.png',
        alt: 'М.И.Т.А. команда',
      },
    ],
  },
}

export default function AboutPage() {
  return (
    <>
      <Header showBackButton showHamburgerMenu />

      <div className="min-h-screen py-20 relative">
        {/* Фон */}
        <div 
          className="fixed inset-0 z-0"
          style={{
            backgroundImage: `url('/images/OG_image/OG_image_Blog_and_case_studies.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(8px)',
            transform: 'scale(1.1)',
          }}
        />
        <div className="fixed inset-0 z-0 bg-direct-dark/80" />

        <div className="container mx-auto px-4 relative z-10">
          {/* Заголовок */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Наша команда
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Профессионалы своего дела, которые помогут вашему бизнесу расти
            </p>
          </div>

          {/* Карусель команды */}
          <TeamCarousel />

          {/* Дополнительная информация */}
          <div className="mt-20 grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6 rounded-2xl glass">
              <div className="text-4xl font-bold text-direct-primary mb-2">5+</div>
              <p className="text-gray-300">Лет на рынке</p>
            </div>
            <div className="text-center p-6 rounded-2xl glass">
              <div className="text-4xl font-bold text-direct-primary mb-2">100+</div>
              <p className="text-gray-300">Успешных проектов</p>
            </div>
            <div className="text-center p-6 rounded-2xl glass">
              <div className="text-4xl font-bold text-direct-primary mb-2">50+</div>
              <p className="text-gray-300">Специалистов в команде</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
