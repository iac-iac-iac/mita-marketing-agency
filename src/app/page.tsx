'use client'

import MainHeader from '@/components/layout/MainHeader'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/blocks/Hero'
import ProblemStatement from '@/components/blocks/ProblemStatement'
import TestimonialsSection from '@/components/blocks/TestimonialsSection'
import BlogPreview from '@/components/blocks/BlogPreview'
import CasePreview from '@/components/blocks/CasePreview'
import ClosingCta from '@/components/blocks/ClosingCta'
import ServicesSection, { defaultServices } from '@/components/blocks/ServicesSection'
import WorkProcessSection, { defaultWorkProcess } from '@/components/blocks/WorkProcessSection'

export default function HomePage() {
  return (
    <>
      <MainHeader />

      <main className="animate-fade-in-up">
        {/* Hero секция */}
        <Hero
          eyebrow="Маркетинговое IT-агентство"
          title="Постоянный поток клиентов для вашего бизнеса"
          subtitle="Комплексные маркетинговые решения и IT-сервисы для стабильного роста продаж. От лидогенерации до рекрутинга — всё в одном месте."
          primaryCtaLabel="Оставить заявку"
          primaryCtaUrl="#contact"
          secondaryCtaLabel="Узнать больше"
          secondaryCtaUrl="#services"
          mediaSrc="/images/hero-banner/Hero-banner_main_link.mp4"
          mediaType="video"
          videoPoster="/images/hero-banner/Hero-banner_main_link.png"
        />

        {/* Problem Statement секция */}
        <ProblemStatement
          title="Знакомые проблемы?"
          description="Большинство бизнесов сталкиваются с одними и теми же вызовами в маркетинге и продажах:"
          painPoints={[
            'Недостаточно качественных лидов для отдела продаж',
            'Высокая стоимость привлечения клиента в контекстной рекламе',
            'Менеджеры тратят время на «холодные» и нецелевые контакты',
            'Нет прозрачной аналитики и понимания ROI маркетинга',
            'Сложно масштабировать продажи без потери качества',
          ]}
        />

        {/* Services секция */}
        <ServicesSection items={defaultServices} />

        {/* Work Process секция */}
        <WorkProcessSection steps={defaultWorkProcess} />

        {/* Testimonials секция */}
        <TestimonialsSection
          title="Что говорят клиенты"
          intro="Наши клиенты довольны результатами работы и рекомендуют нас партнёрам"
          layout="wide"
          items={[
            {
              name: 'Алексей Петров',
              role: 'Коммерческий директор',
              company: 'Автосалон «АвтоПремиум»',
              quote: 'За 3 месяца получили 500+ лидов. Конверсия в продажу — 15%. Это лучший результат, что у нас был.',
            },
            {
              name: 'Дмитрий Соколов',
              role: 'Руководитель отдела продаж',
              company: 'ТехноСтарт',
              quote: 'Рекрутинг от Direct-line помог нам закрыть 50 вакансий за 2 месяца. Быстро, качественно, с гарантией.',
            },
            {
              name: 'Елена Волкова',
              role: 'Маркетинг директор',
              company: 'СтройМастер',
              quote: 'Продвижение на Авито дало нам на 40% больше заявок при том же бюджете. Отличная работа!',
            },
          ]}
        />

        {/* Blog Preview секция */}
        <BlogPreview
          title="Последние статьи"
          postsLimit={3}
          posts={[
            {
              title: 'Как увеличить конверсию лидов на 30%: практические советы',
              slug: 'kak-uvelichit-konversiyu-lidov',
              date: '20 марта 2026',
              author: 'Алексей Иванов',
              category: 'Лидогенерация',
              excerpt: 'Разбираем проверенные техники повышения конверсии лидов в продажи. От скриптов до аналитики.',
            },
            {
              title: 'Тренды digital-маркетинга 2026: что нужно знать бизнесу',
              slug: 'trendy-digital-marketinga-2026',
              date: '15 марта 2026',
              author: 'Мария Петрова',
              category: 'Маркетинг',
              excerpt: 'Обзор ключевых трендов и инструментов, которые будут определять рынок в этом году.',
            },
            {
              title: 'Кейс: как мы привлекли 1000 лидов для автосалона за 2 месяца',
              slug: 'kejs-avtosalon-1000-lidov',
              date: '10 марта 2026',
              author: 'Дмитрий Сидоров',
              category: 'Кейсы',
              excerpt: 'Подробный разбор стратегии, тактик и результатов работы с крупным автосалоном.',
            },
          ]}
        />

        {/* Case Preview секция */}
        <CasePreview
          title="Наши кейсы"
          cases={[
            {
              slug: 'avtopremium-case',
              title: 'Как автосалон увеличил продажи на 147%',
              industry: 'Автомобили',
              resultSummary: 'Внедрение сквозной аналитики и оптимизация рекламных кампаний для федерального автосалона.',
              services: ['Сквозная аналитика', 'Контекстная реклама', 'Call-tracking'],
            },
            {
              slug: 'stroymaster-case',
              title: 'Рост онлайн-продаж стройматериалов на 220%',
              industry: 'E-commerce',
              resultSummary: 'Комплексный маркетинг и оптимизация воронки продаж для интернет-магазина.',
              services: ['Редизайн', 'Ремаркетинг', 'Триггерные рассылки'],
            },
          ]}
        />

        {/* Closing CTA секция */}
        <div id="contact">
          <ClosingCta
            title="Готовы увеличить поток клиентов?"
            description="Оставьте заявку сейчас и получите бесплатную консультацию по стратегии лидогенерации для вашего бизнеса."
            primaryCtaLabel="Оставить заявку"
            primaryCtaUrl="#contact"
            secondaryCtaLabel="Платный тест за 10 000 ₽"
            secondaryCtaUrl="/contact"
          />
        </div>
      </main>

      <Footer />
    </>
  )
}
