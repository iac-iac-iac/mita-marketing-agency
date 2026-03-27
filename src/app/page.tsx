'use client'

import MainHeader from '@/components/layout/MainHeader'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/blocks/Hero'
import ProblemStatement from '@/components/blocks/ProblemStatement'
import FeatureGroup from '@/components/blocks/FeatureGroup'
import ProcessSteps from '@/components/blocks/ProcessSteps'
import TestimonialsSection from '@/components/blocks/TestimonialsSection'
import BlogPreview from '@/components/blocks/BlogPreview'
import CasePreview from '@/components/blocks/CasePreview'
import ClosingCta from '@/components/blocks/ClosingCta'

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

        {/* Feature Group - Услуги */}
        <div id="services">
          <FeatureGroup
            groupTitle="Наши услуги"
            groupIntro="Комплексный подход к решению ваших маркетинговых задач. Четыре направления, которые работают как единый механизм для роста вашего бизнеса."
            items={[
              {
                name: 'Лидогенерация',
                label: 'Флагманский продукт',
                description: 'IT-сервис для поиска номеров телефонов людей, интересующихся продуктами клиента + первичный обзвон для отбора «живых» лидов.',
                icon: '/images/icons/service_icon/1_service_icon_Lead_generation.png',
                ctaLabel: 'Подробнее',
                ctaUrl: '/services/leadgen',
              },
              {
                name: 'Call-центр',
                label: 'Профессиональный обзвон',
                description: 'Обзвон номеров клиента для получения горячих лидов. Холодные и тёплые звонки, обработка входящих заявок, скрипты продаж.',
                icon: '/images/icons/service_icon/2_service_icon_Call_center.png',
                ctaLabel: 'Подробнее',
                ctaUrl: '/services/call-center',
              },
              {
                name: 'Авито',
                label: 'Бюджетный канал',
                description: 'Продвижение на платформе Авито. Публикация объявлений, ведение аккаунта, оптимизация под поисковые запросы.',
                icon: '/images/icons/service_icon/3_service_icon_Classified_ads.png',
                ctaLabel: 'Подробнее',
                ctaUrl: '/services/avito',
              },
              {
                name: 'Рекрутинг',
                label: 'Подбор персонала',
                description: 'Поиск, привлечение, отбор и наём сотрудников. Массовый подбор с использованием call-центра для быстрого результата.',
                icon: '/images/icons/service_icon/4_service_icon_Recruiting.png',
                ctaLabel: 'Подробнее',
                ctaUrl: '/services/recruiting',
              },
            ]}
            groupCtaLabel="Смотреть все услуги"
            groupCtaUrl="/#services"
          />
        </div>

        {/* Process Steps секция */}
        <ProcessSteps
          title="Как мы работаем"
          steps={[
            {
              number: 1,
              title: 'Аудит и стратегия',
              description: 'Проводим глубокий анализ вашей текущей ситуации, определяем точки роста и разрабатываем персонализированную стратегию продвижения.',
              kpi: '1-2 недели',
            },
            {
              number: 2,
              title: 'Настройка и запуск',
              description: 'Настраиваем все необходимые инструменты, создаём рекламные кампании, интегрируем CRM и системы аналитики.',
              kpi: '2-3 недели',
            },
            {
              number: 3,
              title: 'Привлечение лидов',
              description: 'Запускаем рекламные кампании, начинаем привлекать потенциальных клиентов и передаём их в обработку.',
              kpi: 'Постоянно',
            },
            {
              number: 4,
              title: 'Оптимизация и масштабирование',
              description: 'Анализируем результаты, оптимизируем рекламные каналы и масштабируем успешные решения для максимального роста.',
              kpi: 'Ежемесячно',
            },
          ]}
        />

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
