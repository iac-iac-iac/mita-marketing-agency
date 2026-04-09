/**
 * Единый источник навигационных данных
 * Используется в Header, MainHeader, Footer, HamburgerMenu
 */

export interface NavItem {
  label: string;
  url: string;
}

export interface ServiceNavItem {
  label: string;
  url: string;
}

// Основная навигация
export const mainNav: NavItem[] = [
  { label: 'О компании', url: '/about' },
  { label: 'Блог', url: '/blog' },
  { label: 'Кейсы', url: '/cases' },
  { label: 'Контакты', url: '/contact' },
];

// Навигация по услугам
export const servicesNav: ServiceNavItem[] = [
  { label: 'Лидогенерация', url: '/services/leadgen' },
  { label: 'Call-центр', url: '/services/call-center' },
  { label: 'Авито', url: '/services/avito' },
  { label: 'Рекрутинг', url: '/services/recruiting' },
];

// Навигация в футере (секции)
export const footerSections = [
  {
    title: 'Услуги',
    items: servicesNav,
  },
  {
    title: 'Компания',
    items: mainNav,
  },
  {
    title: 'Правовая информация',
    items: [
      { label: 'Условия оказания услуг', url: '/legal/terms' },
      { label: 'Политика конфиденциальности', url: '/legal/privacy' },
      { label: 'Безопасность данных', url: '/security' },
    ],
  },
];

// Контакты в футере
export const footerContacts = {
  address: 'г. Саратов, Астраханская ул., 87В',
  email: 'info@mita.ru',
  phone: '+7 (XXX) XXX-XX-XX',
};
