import FeatureGroup from './FeatureGroup'

export interface ServiceItem {
  name: string;
  label: string;
  description: string;
  icon: string;
  ctaLabel: string;
  ctaUrl: string;
}

export interface ServicesSectionProps {
  id?: string;
  groupTitle?: string;
  groupIntro?: string;
  items: ServiceItem[];
  groupCtaLabel?: string;
  groupCtaUrl?: string;
}

/**
 * Секция услуг на главной странице
 * Переиспользуемый компонент для отображения услуг
 */
export default function ServicesSection({
  id = 'services',
  groupTitle = 'Наши услуги',
  groupIntro = 'Комплексный подход к решению ваших маркетинговых задач. Четыре направления, которые работают как единый механизм для роста вашего бизнеса.',
  items,
  groupCtaLabel = '',
  groupCtaUrl = '',
}: ServicesSectionProps) {
  return (
    <div id={id}>
      <FeatureGroup
        groupTitle={groupTitle}
        groupIntro={groupIntro}
        items={items}
        groupCtaLabel={groupCtaLabel}
        groupCtaUrl={groupCtaUrl}
      />
    </div>
  )
}

/**
 * Стандартные услуги М.И.Т.А.
 */
export const defaultServices: ServiceItem[] = [
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
];
