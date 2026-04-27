import ServiceHero from '@/components/blocks/ServiceHero'
import ProblemStatement from '@/components/blocks/ProblemStatement'
import ServiceFeatures from '@/components/blocks/ServiceFeatures'
import ServiceProcess from '@/components/blocks/ServiceProcess'
import TestimonialsSection from '@/components/blocks/TestimonialsSection'
import { getAllTestimonials } from '@/lib/cms/db-testimonials'
import PricingSection from '@/components/blocks/PricingSection'
import FaqSection from '@/components/blocks/FaqSection'
import ClosingCta from '@/components/blocks/ClosingCta'
import TechnologyStack from '@/components/blocks/TechnologyStack'
import AnalyticsDashboard from '@/components/blocks/AnalyticsDashboard'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import type { Metadata } from 'next'

// Иконки для TechnologyStack
const icons = {
  crm: (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  touchScenarios: (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
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
  title: 'Лидогенерация | М.И.Т.А.',
  description: 'IT-сервис для поиска номеров телефонов людей, интересующихся продуктами клиента, с последующей обработкой колл-центром. Постоянный поток качественных лидов.',
  keywords: ['лидогенерация', 'поиск клиентов', 'лиды', 'продажи', 'call-центр', 'CRM'],
  openGraph: {
    title: 'Лидогенерация | М.И.Т.А.',
    description: 'Предсказуемый поток лидов для вашего бизнеса. IT-сервис + колл-центр для отбора живых лидов.',
    type: 'website',
    locale: 'ru_RU',
  },
}

export default function LeadgenPage() {
  const testimonials = getAllTestimonials('leadgen')
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
            name: 'Сценарии касаний',
            description:
              'Цепочки касаний в мессенджерах и по email: прогрев, напоминания и дожим без потери контекста',
            icon: icons.touchScenarios,
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
            value: 1480,
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
            description:
              "Настроим отслеживание всех касаний клиента: от первого визита до покупки. Интеграция с CRM, UTM-метки и атрибуция каналов.",
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
            description:
              "Внедряем сквозную аналитику, связываем рекламные кабинеты и CRM, настраиваем цели и скрипты касаний.",
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
      {testimonials.length > 0 && (
        <TestimonialsSection
          title="Что говорят клиенты"
          layout="wide"
          items={testimonials.map(t => ({ name: t.name, role: t.role, company: t.company, quote: t.quote }))}
        />
      )}

      {/* Тарифы */}
      <PricingSection
        title="Тарифы на лидогенерацию"
        plans={[
          {
            name: "Тест",
            price: "10 000 ₽",
            description: "Тест нужен для знакомства с сервисом.",
            features: [
              "100 определений",
              "Базовая аналитика",
              "Работа колл-центра",
              "Отчёт по результатам",
            ],
            ctaLabel: "Заказать тест",
            ctaUrl: "/contact",
            isHighlighted: false,
          },
          {
            name: "Пилот",
            price: "148 000 ₽",
            description: "Старт активных продаж",
            features: [
              "1000 звонков",
              "Полная аналитика",
              "Интеграция с CRM",
              "Еженедельная отчётность",
              "Оптимизация процессов",
            ],
            ctaLabel: "Заказать",
            ctaUrl: "/contact",
            isHighlighted: false,
          },
          {
            name: "Стандарт",
            price: "405 000 ₽",
            description: "Для активных продаж",
            features: [
              "3000 звонков",
              "Полная аналитика",
              "Интеграция с CRM",
              "Еженедельная отчётность",
              "Оптимизация процессов",
              "Составление сценария",
              "Связь с координатором",
            ],
            ctaLabel: "Заказать",
            ctaUrl: "/contact",
            isHighlighted: true,
          },
          {
            name: "Премиум",
            price: "1 290 000 ₽",
            description: "Максимальный объём и сопровождение",
            features: [
              "Индивидуальный объём",
              "Расширенная аналитика",
              "Выделенная команда",
              "SLA по конверсии",
              "Составление сценария",
              "Связь с координатором",
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
            answer:
              "Не работаем с тематикой СВО / военной повестью, кредитованием, эзотерикой, операционными вмешательствами и сферой 18+.",
          },
          {
            question: "Сколько нужно бюджета на маркетинг?",
            answer:
              "Ориентир по нашим клиентам — средний чек порядка 30 000 ₽. Точный тестовый бюджет согласуем после брифа и оценки ниши.",
          },
          {
            question: "Как быстро будут первые заявки?",
            answer: "Первые лиды вы получите через 3-5 дней после старта кампании. Полноценный объём — через 2-3 недели.",
          },
        ]}
      />

      {/* Финальный CTA */}
      <ClosingCta
        title="Запустите лидогенерацию под ключ"
        description="Оставьте заявку на бесплатную консультацию — расскажем, как применить нашу систему для вашей воронки продаж."
        primaryCtaLabel="Оставить заявку"
        primaryCtaUrl="/contact"
      />
      </main>

      <Footer />
    </>
  )
}
