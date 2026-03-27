import ServiceHero from '@/components/blocks/ServiceHero'
import ServiceFeatures from '@/components/blocks/ServiceFeatures'
import ServiceProcess from '@/components/blocks/ServiceProcess'
import ClosingCta from '@/components/blocks/ClosingCta'
import CompactPricing from '@/components/blocks/CompactPricing'
import AdExamples from '@/components/blocks/AdExamples'
import RegionMap from '@/components/blocks/RegionMap'
import Header from '@/components/layout/Header'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Продвижение на Авито | Direct-line',
  description: 'Бюджетный канал привлечения клиентов через платформу Авито. Упаковка, ведение и масштабирование объявлений в любом количестве регионов.',
  keywords: ['авито', 'продвижение на авито', 'объявления', 'лиды с авито', 'маркетинг', 'реклама'],
  openGraph: {
    title: 'Продвижение на Авито | Direct-line',
    description: 'Поток заявок с Авито под ключ. Работа в любом количестве регионов от 1 до 50+.',
    type: 'website',
    locale: 'ru_RU',
  },
}

export default function AvitoPage() {
  return (
    <>
      <Header showBackButton showHamburgerMenu />

      <main className="animate-fade-in-up">
        {/* 1. Hero (компактный) */}
        <ServiceHero
          eyebrow="Авито"
          title="Поток заявок с Авито под ключ"
          subtitle="Бюджетный канал привлечения клиентов через платформу Авито. Упаковка, ведение и масштабирование объявлений"
          primaryCtaLabel="Заказать продвижение"
          primaryCtaUrl="/contact"
          secondaryCtaLabel="Узнать подробнее"
          secondaryCtaUrl="#pricing"
          mediaSrc="/images/hero-banner/Hero-banner_Avito.mp4"
          mediaType="video"
          videoPoster="/images/hero-banner/Hero-banner_Avito.png"
        />

        {/* 2. Тарифы (НОВЫЙ) — сразу после Hero */}
        <CompactPricing
          title="Тарифы на продвижение"
          subtitle="Прозрачное ценообразование без скрытых платежей"
          plans={[
            {
              name: 'Регионы',
              description: 'До 4 регионов (не МСК/СПБ)',
              price: '30 000 ₽',
              regions: 'До 4 регионов',
              features: [
                'Публикация объявлений',
                'Ведение аккаунта',
                'Ответы на сообщения',
                'Ежемесячная отчётность',
                'Оптимизация под поиск',
              ],
              ctaLabel: 'Заказать',
              ctaUrl: '/contact',
            },
            {
              name: 'Москва и СПБ',
              description: 'МСК, СПБ или 5+ регионов',
              price: '40 000 ₽',
              regions: 'МСК и/или СПБ',
              features: [
                'Публикация объявлений',
                'Ведение аккаунта',
                'Приоритетная поддержка',
                '5+ регионов',
                'Расширенная аналитика',
              ],
              ctaLabel: 'Заказать',
              ctaUrl: '/contact',
              isHighlighted: true,
            },
            {
              name: 'Тест',
              description: 'Пробный запуск в 1 регионе',
              price: '15 000 ₽',
              regions: '1 регион',
              features: [
                '5 объявлений',
                'Тестовый период 2 недели',
                'Базовая аналитика',
                'Оценка эффективности',
              ],
              ctaLabel: 'Попробовать',
              ctaUrl: '/contact',
            },
            {
              name: 'Индивидуальный',
              description: 'Для крупных проектов',
              price: 'от 50 000 ₽',
              regions: '50+ регионов',
              features: [
                'Персональный менеджер',
                'Расширенная аналитика',
                'Интеграция по API',
                'Гибкие условия',
              ],
              ctaLabel: 'Обсудить',
              ctaUrl: '/contact',
            },
          ]}
        />

        {/* 3. Примеры объявлений (НОВЫЙ) */}
        <AdExamples
          title="Примеры объявлений"
          subtitle="Упакуем ваши товары и услуги так, что клиенты не смогут пройти мимо"
          examples={[
            {
              title: 'Продажа квартир в новостройках от застройщика',
              price: 'от 5.2 млн ₽',
              location: 'Москва, м. Охотный ряд',
              description: '1-к квартира, 42 м², 5/24 эт. Новый жилой комплекс с развитой инфраструктурой.',
              category: 'Недвижимость',
              views: '12 453',
              isPremium: true,
            },
            {
              title: 'Ремонт квартир под ключ - любые сложности',
              price: 'от 5 000 ₽/м²',
              location: 'Санкт-Петербург',
              description: 'Профессиональный ремонт квартир. Опыт 15 лет. Гарантия 3 года. Бесплатный замер.',
              category: 'Услуги',
              views: '8 234',
            },
            {
              title: 'Toyota Camry, 2020, 2.5 AT, 199 л.с.',
              price: '3 200 000 ₽',
              location: 'Екатеринбург',
              description: 'Автомобиль в отличном состоянии. Один владелец. Полностью обслужен.',
              category: 'Авто',
              views: '5 678',
              isPremium: true,
            },
          ]}
        />

        {/* 4. География (НОВЫЙ) */}
        <RegionMap
          title="География работы"
          subtitle="Работаем по всей России от Калининграда до Владивостока"
          totalRegions={50}
          regions={[
            {
              name: 'Москва и Московская область',
              cities: ['Москва', 'Химки', 'Подольск', 'Мытищи', 'Люберцы'],
              active: true,
            },
            {
              name: 'Санкт-Петербург и ЛО',
              cities: ['Санкт-Петербург', 'Гатчина', 'Пушкин'],
              active: true,
            },
            {
              name: 'Свердловская область',
              cities: ['Екатеринбург', 'Нижний Тагил', 'Каменск-Уральский'],
              active: true,
            },
            {
              name: 'Краснодарский край',
              cities: ['Краснодар', 'Сочи', 'Новороссийск', 'Анапа'],
              active: true,
            },
            {
              name: 'Новосибирская область',
              cities: ['Новосибирск', 'Бердск'],
              active: true,
            },
            {
              name: 'Республика Татарстан',
              cities: ['Казань', 'Набережные Челны', 'Альметьевск'],
              active: true,
            },
          ]}
        />

        {/* 5. Фичи услуги (сокращённый) */}
        <ServiceFeatures
          title="Что мы делаем"
          features={[
            {
              name: "Упаковка объявлений",
              description: "Создание продающих текстов, подбор фотографий, оптимизация под поиск Авито. Объявления, которые конвертируют",
              icon: 'A1',
            },
            {
              name: "Ведение аккаунта",
              description: "Регулярное обновление объявлений, ответы на сообщения, модерация отзывов. Полное сопровождение",
              icon: "👤",
            },
            {
              name: "Масштабирование",
              description: "Работа в любом количестве регионов. От 1 до 50+ регионов. Быстрое увеличение охвата",
              icon: "📍",
            },
            {
              name: "Интеграция с CRM",
              description: "Все заявки автоматически передаются в вашу CRM. Отслеживание источника и конверсии",
              icon: "🔗",
            },
            {
              name: "Аналитика",
              description: "Отслеживание просмотров, анализ конверсии, оптимизация кампаний на основе данных",
              icon: 'A2',
            },
            {
              name: "Опыт партнёров",
              description: "Используем проверенные стратегии и наработки. Избегаем типичных ошибок и блокировок",
              icon: 'A3',
            },
          ]}
        />

        {/* 6. Процесс работы */}
        <ServiceProcess
          title="Как мы работаем"
          steps={[
            {
              number: 1,
              title: "Приём заявки и анализ",
              description: "Определяем регион продвижения, количество регионов, выбираем тариф. Получаем информацию о товарах/услугах клиента.",
              kpi: "1 день",
            },
            {
              number: 2,
              title: "Создание и публикация объявлений",
              description: "Пишем продающие тексты, подбираем фотографии, создаём объявления. Публикуем и оптимизируем под поиск Авито.",
              kpi: "1-2 дня",
            },
            {
              number: 3,
              title: "Ведение и обновление",
              description: "Регулярно обновляем объявления, отвечаем на сообщения, модерируем отзывы. Поддерживаем высокую видимость.",
              kpi: "Ежедневно",
            },
            {
              number: 4,
              title: "Отчётность и оптимизация",
              description: "Предоставляем ежемесячный отчёт по просмотрам, заявкам и конверсии. Оптимизируем кампании для улучшения результатов.",
              kpi: "Ежемесячно",
            },
          ]}
        />

        {/* 7. Закрывающий CTA (минималистичный) */}
        <ClosingCta
          title="Готовы получить поток заявок с Авито?"
          description="Запустим продвижение в вашем регионе за 1-2 дня"
          primaryCtaLabel="Заказать продвижение"
          primaryCtaUrl="/contact"
        />
      </main>
    </>
  )
}
