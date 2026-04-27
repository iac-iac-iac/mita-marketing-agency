import ServiceHero from '@/components/blocks/ServiceHero'
import FeatureGroup from '@/components/blocks/FeatureGroup'
import ProcessSteps from '@/components/blocks/ProcessSteps'
import ToolsSection from '@/components/blocks/ToolsSection'
import ClosingCta from '@/components/blocks/ClosingCta'
import Header from '@/components/layout/Header'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Услуги | М.И.Т.А.',
  description: 'Комплексные маркетинговые решения для роста вашего бизнеса. Лидогенерация, call-центр, продвижение на Авито и рекрутинг.',
  keywords: ['услуги', 'лидогенерация', 'call-центр', 'авито', 'рекрутинг', 'маркетинг', 'продажи'],
  openGraph: {
    title: 'Услуги | М.И.Т.А.',
    description: 'Четыре направления для стабильного роста вашего бизнеса. От лидогенерации до подбора персонала.',
    type: 'website',
    locale: 'ru_RU',
  },
}

export default function ServicesPage() {
  return (
    <>
      <Header showBackButton showHamburgerMenu />

      <main className="animate-fade-in-up">
        <ServiceHero
          eyebrow="Наши услуги"
          title="Комплексные решения для роста вашего бизнеса"
          subtitle="От лидогенерации до рекрутинга — всё в одном месте. Четыре направления, которые работают как единый механизм для стабильного роста продаж."
          primaryCtaLabel="Оставить заявку"
          primaryCtaUrl="/contact"
          secondaryCtaLabel="Связаться с нами"
          secondaryCtaUrl="/contact"
          mediaSrc="/images/hero-banner/Hero-banner_main_link.mp4"
          mediaType="video"
          videoPoster="/images/hero-banner/Hero-banner_main_link.png"
        />

        <FeatureGroup
          tilt
          groupTitle="Направления работы"
          groupIntro="Комплексный подход к решению ваших маркетинговых задач. Каждое направление может работать как самостоятельно, так и в связке с другими для максимального результата."
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
          groupCtaUrl="/services"
        />

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
              description: 'Настраиваем все необходимые инструменты, создаём маркетинговые кампании, интегрируем CRM и системы аналитики.',
              kpi: '2-3 недели',
            },
            {
              number: 3,
              title: 'Привлечение лидов',
              description: 'Запускаем каналы привлечения, начинаем собирать потенциальных клиентов и передаём их в обработку.',
              kpi: 'Постоянно',
            },
            {
              number: 4,
              title: 'Оптимизация и масштабирование',
              description: 'Анализируем результаты, оптимизируем каналы привлечения и масштабируем успешные решения для максимального роста.',
              kpi: 'Ежемесячно',
            },
          ]}
        />

        <ToolsSection
          title="Инструменты, которые мы используем"
          intro="Современный стек технологий для максимального результата. Интегрируем все необходимые сервисы в единую экосистему для эффективной работы."
          tools={[
            {
              name: 'CRM-системы',
              description: 'Битрикс24 для управления лидами и клиентами. Автоматизация воронок продаж.',
              icon: '/images/icons/icon_tool/1_icon_tool_crm.png',
            },
            {
              name: 'IP-телефония',
              description: 'Интеграция с телефонией для автоматической записи разговоров и контроля качества.',
              icon: '/images/icons/icon_tool/2_icon_tool_telephony.png',
            },
            {
              name: 'Рекламные платформы',
              description: 'Яндекс.Директ и Google Ads для привлечения целевой аудитории.',
              icon: '/images/icons/icon_tool/3_icon_tool_advertising.png',
            },
            {
              name: 'Аналитика',
              description: 'Яндекс.Метрика, Google Analytics, Roistat для сквозной аналитики.',
              icon: '/images/icons/icon_tool/4_icon_tool_analytics.png',
            },
            {
              name: 'Мессенджеры',
              description: 'Интеграция с WhatsApp, Telegram, Viber для коммуникации с клиентами.',
              icon: '/images/icons/icon_tool/5_icon_tool_messaging.png',
            },
            {
              name: 'Базы данных',
              description: 'Надёжное хранение и обработка данных клиентов с регулярным резервным копированием.',
              icon: '/images/icons/icon_tool/6_icon_tool_database.png',
            },
          ]}
        />

        <ClosingCta
          title="Готовы увеличить поток клиентов?"
          description="Оставьте заявку сейчас и получите бесплатную консультацию по стратегии продвижения для вашего бизнеса."
          primaryCtaLabel="Оставить заявку"
          primaryCtaUrl="/contact"
          secondaryCtaLabel="Узнать больше"
          secondaryCtaUrl="#services"
        />
      </main>
    </>
  )
}
