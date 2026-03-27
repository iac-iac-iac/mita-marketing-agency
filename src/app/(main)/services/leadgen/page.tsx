import ServiceHero from '@/components/blocks/ServiceHero'
import ProblemStatement from '@/components/blocks/ProblemStatement'
import ServiceFeatures from '@/components/blocks/ServiceFeatures'
import ServiceProcess from '@/components/blocks/ServiceProcess'
import TestimonialsSection from '@/components/blocks/TestimonialsSection'
import PricingSection from '@/components/blocks/PricingSection'
import FaqSection from '@/components/blocks/FaqSection'
import ClosingCta from '@/components/blocks/ClosingCta'
import TechnologyStack from '@/components/blocks/TechnologyStack'
import AnalyticsDashboard from '@/components/blocks/AnalyticsDashboard'
import LeadExamples from '@/components/blocks/LeadExamples'
import Header from '@/components/layout/Header'
import type { Metadata } from 'next'

// Иконки для TechnologyStack
const icons = {
  crm: (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  callTracking: (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  ),
  analytics: (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  telephony: (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
    </svg>
  ),
  roi: (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
  automation: (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  abTesting: (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
    </svg>
  ),
  lookalike: (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
}

export const metadata: Metadata = {
  title: 'Лидогенерация | Direct-line',
  description: 'IT-сервис для поиска номеров телефонов людей, интересующихся продуктами клиента, с последующей обработкой колл-центром. Постоянный поток качественных лидов.',
  keywords: ['лидогенерация', 'поиск клиентов', 'лиды', 'продажи', 'call-центр', 'CRM'],
  openGraph: {
    title: 'Лидогенерация | Direct-line',
    description: 'Предсказуемый поток лидов для вашего бизнеса. IT-сервис + колл-центр для отбора живых лидов.',
    type: 'website',
    locale: 'ru_RU',
  },
}

export default function LeadgenPage() {
  return (
    <>
      <Header showBackButton showHamburgerMenu />

      <main className="animate-fade-in-up">
      <ServiceHero
        eyebrow="Лидогенерация"
        title="Предсказуемый поток лидов"
        subtitle="IT-сервис для поиска номеров телефонов людей, интересующихся продуктами клиента, с последующей обработкой колл-центром для отбора живых лидов"
        primaryCtaLabel="Заказать тест"
        primaryCtaUrl="/contact"
        secondaryCtaLabel="Узнать подробнее"
        secondaryCtaUrl="#process"
        mediaSrc="/images/hero-banner/Hero-banner_LeadGeneration.mp4"
        mediaType="video"
        videoPoster="/images/hero-banner/Hero-banner_LeadGeneration.png"
      />

      {/* Технологии */}
      <TechnologyStack
        title="Технологический стек"
        description="Современные инструменты для максимальной эффективности каждой кампании"
        technologies={[
          {
            name: 'CRM Интеграция',
            description: 'Автоматическая синхронизация с вашей CRM. Битрикс24, AmoCRM, RetailCRM',
            icon: icons.crm,
          },
          {
            name: 'Колл-трекинг',
            description: 'Отслеживание источников звонков. Подмена номеров, динамический трекинг',
            icon: icons.callTracking,
          },
          {
            name: 'Веб-аналитика',
            description: 'Яндекс.Метрика, Google Analytics. Настройка целей, e-commerce, сквозная аналитика',
            icon: icons.analytics,
          },
          {
            name: 'IP-телефония',
            description: 'Интеграция с телефонией. Запись разговоров, аналитика звонков',
            icon: icons.telephony,
          },
          {
            name: 'Сквозная аналитика',
            description: 'Roistat, Calltouch. Отслеживание ROI от клика до сделки',
            icon: icons.roi,
          },
          {
            name: 'Автоматизация',
            description: 'Скрипты, чат-боты, авто-воронки. Снижение нагрузки на менеджеров',
            icon: icons.automation,
          },
          {
            name: 'A/B тесты',
            description: 'Быстрое тестирование гипотез. Креативы, посадочные, офферы',
            icon: icons.abTesting,
          },
          {
            name: 'Look-alike',
            description: 'Поиск похожей аудитории. Алгоритмы на основе успешных конверсий',
            icon: icons.lookalike,
          },
        ]}
      />

      {/* Аналитика */}
      <AnalyticsDashboard
        title="Аналитика в реальном времени"
        metrics={[
          {
            label: 'CTR',
            value: 12.5,
            suffix: '%',
            description: 'Кликабельность объявлений',
            trend: 'up',
          },
          {
            label: 'Конверсия',
            value: 8.3,
            suffix: '%',
            description: 'Конверсия в лиды',
            trend: 'up',
          },
          {
            label: 'CPL',
            value: 450,
            suffix: '₽',
            description: 'Стоимость лида',
            trend: 'down',
          },
          {
            label: 'ROI',
            value: 340,
            suffix: '%',
            description: 'Возврат инвестиций',
            trend: 'up',
          },
        ]}
      />

      {/* Примеры лидов */}
      <LeadExamples
        title="Примеры лидов"
        description="Реальные данные из наших кампаний — прозрачность каждого этапа воронки"
        leads={[
          {
            id: 1,
            niche: 'Недвижимость',
            source: 'Яндекс.Директ',
            cost: 1200,
            status: 'converted',
          },
          {
            id: 2,
            niche: 'Автобизнес',
            source: 'VK Реклама',
            cost: 850,
            status: 'in_progress',
          },
          {
            id: 3,
            niche: 'Образование',
            source: 'Google Ads',
            cost: 650,
            status: 'converted',
          },
          {
            id: 4,
            niche: 'Строительство',
            source: 'Авито',
            cost: 450,
            status: 'rejected',
          },
          {
            id: 5,
            niche: 'Финансы',
            source: 'Таргет VK',
            cost: 980,
            status: 'in_progress',
          },
          {
            id: 6,
            niche: 'E-commerce',
            source: 'Яндекс.Директ',
            cost: 720,
            status: 'converted',
          },
          {
            id: 7,
            niche: 'B2B услуги',
            source: 'Контекстная реклама',
            cost: 1500,
            status: 'converted',
          },
        ]}
      />

      {/* Проблемы */}
      <ProblemStatement
        title="Знакомые ситуации?"
        description="Многие компании сталкиваются с проблемами при привлечении клиентов:"
        painPoints={[
          "Нестабильный поток заявок — то густо, то пусто",
          "Высокая стоимость лида в контекстной рекламе и таргете",
          "Менеджеры тратят время на «холодные» и нецелевые контакты",
          "Нет прозрачной аналитики: непонятно, какой канал даёт результат",
          "Сложно масштабировать продажи без потери качества лидов",
        ]}
      />

      {/* Фичи */}
      <ServiceFeatures
        title="Что входит в лидогенерацию"
        features={[
          {
            name: "Сквозная аналитика",
            description: "Настроим отслеживание всех касаний клиента: от первого визита до покупки. Интеграция с CRM, колл-трекинг, UTM-метки.",
          },
          {
            name: "Тестирование гипотез",
            description: "Быстро запускаем и тестируем креативы, посадочные, офферы. Находим работающие связки за 1-2 недели.",
          },
          {
            name: "Сегментация и квалификация",
            description: "Автоматические правила в CRM, scoring лидов, разделение на тёплые/холодные. Менеджеры работают только с целевыми.",
          },
        ]}
      />

      {/* Процесс */}
      <ServiceProcess
        title="Как мы работаем"
        steps={[
          {
            number: 1,
            title: "Аудит текущих каналов",
            description: "Анализируем, какие каналы уже работают, где есть точки роста, какие офферы дают конверсию.",
            kpi: "Готовый план оптимизации",
          },
          {
            number: 2,
            title: "Настройка трекинга и CRM",
            description: "Внедряем сквозную аналитику, настраиваем колл-трекинг, интегрируем все источники данных.",
            kpi: "Прозрачная статистика",
          },
          {
            number: 3,
            title: "Запуск тестовых кампаний",
            description: "Тестируем гипотезы, находим работающие связки, оптимизируем бюджет.",
            kpi: "~10% конверсия в лид",
          },
          {
            number: 4,
            title: "Масштабирование",
            description: "Увеличиваем бюджет на работающих каналах, подключаем новые источники лидов.",
            kpi: "Рост количества лидов",
          },
        ]}
      />

      {/* Отзывы */}
      <TestimonialsSection
        title="Клиенты о лидогенерации"
        layout="wide"
        items={[
          {
            name: "Алексей Петров",
            role: "Коммерческий директор",
            company: "Автосалон «АвтоПремиум»",
            quote: "За 3 месяца получили 500+ лидов. Конверсия в продажу — 15%. Это лучший результат, что у нас был.",
          },
          {
            name: "Мария Иванова",
            role: "РОП",
            company: "Строительная компания «СтройМастер»",
            quote: "Наконец-то менеджеры не тратят время на холодные контакты. Лиды качественные, с высокой конверсией.",
          },
        ]}
      />

      {/* Тарифы */}
      <PricingSection
        title="Тарифы на лидогенерацию"
        plans={[
          {
            name: "Тест",
            price: "10 000 ₽",
            description: "Для знакомства с сервисом",
            features: [
              "100 звонков",
              "Базовая аналитика",
              "Отчёт по результатам",
              "Персональный менеджер",
            ],
            ctaLabel: "Заказать тест",
            ctaUrl: "/contact",
            isHighlighted: false,
          },
          {
            name: "Стандарт",
            price: "148 000 ₽",
            description: "Для активных продаж",
            features: [
              "1000 звонков",
              "Полная аналитика",
              "Интеграция с CRM",
              "Еженедельная отчётность",
              "Оптимизация процессов",
            ],
            ctaLabel: "Заказать",
            ctaUrl: "/contact",
            isHighlighted: true,
          },
          {
            name: "Гибрид",
            price: "от 250 000 ₽",
            description: "С оплатой за результат",
            features: [
              "Индивидуальный объём",
              "Оплата за лиды",
              "Расширенная аналитика",
              "Выделенная команда",
              "SLA по конверсии",
            ],
            ctaLabel: "Обсудить условия",
            ctaUrl: "/contact",
            isHighlighted: false,
          },
        ]}
      />

      {/* FAQ */}
      <FaqSection
        title="Частые вопросы"
        items={[
          {
            question: "Какие ниши вы не берёте?",
            answer: "Мы не работаем с проектами в сфере здоровья и красоты из-за этических ограничений и специфики регулирования рекламы медицинских услуг.",
          },
          {
            question: "Сколько нужно бюджета на рекламу?",
            answer: "Рекомендуемый бюджет на тестирование — от 50 000 ₽. После нахождения работающих связок бюджет масштабируется под ваши задачи.",
          },
          {
            question: "Как быстро будут первые заявки?",
            answer: "Первые лиды вы получите через 3-5 дней после старта кампании. Полноценный объём — через 2-3 недели.",
          },
          {
            question: "Что если лиды некачественные?",
            answer: "Мы проводим предварительную квалификацию и отбор лидов. Если лиды не соответствуют критериям — перерабатываем кампанию бесплатно.",
          },
          {
            question: "Можно ли платить за результат?",
            answer: "Да, на тарифе «Гибрид» возможна оплата за квалифицированные лиды. Обсудите условия с менеджером.",
          },
        ]}
      />

      {/* Финальный CTA */}
      <ClosingCta
        title="Запустите лидогенерацию под ключ"
        description="Оставьте заявку на бесплатную консультацию — расскажем, как применить нашу систему для вашей воронки продаж."
        primaryCtaLabel="Оставить заявку"
        primaryCtaUrl="/contact"
        secondaryCtaLabel="Платный тест за 10 000 ₽"
        secondaryCtaUrl="#test"
      />
      </main>
    </>
  )
}
