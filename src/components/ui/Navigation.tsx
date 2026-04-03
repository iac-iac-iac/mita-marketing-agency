export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface NavigationProps {
  items: NavItem[];
  className?: string;
  activeHref?: string;
  onItemClick?: (item: NavItem) => void;
}

/**
 * Базовый компонент навигации
 * Переиспользуется в Header, MainHeader, Footer, MobileMenu
 */
export default function Navigation({
  items,
  className = '',
  activeHref,
  onItemClick,
}: NavigationProps) {
  const handleClick = (item: NavItem) => {
    if (onItemClick) {
      onItemClick(item);
    }
  };

  const isActive = (href: string) => {
    if (!activeHref) return false;
    if (href === '/') return activeHref === '/';
    return activeHref.startsWith(href);
  };

  return (
    <nav className={className} role="navigation">
      <ul className="flex flex-col md:flex-row gap-4 md:gap-6">
        {items.map((item) => (
          <li key={item.href} className="relative">
            {item.children ? (
              <div className="group">
                <button
                  className={`
                    px-4 py-2 text-sm font-medium transition-colors
                    ${isActive(item.href)
                      ? 'text-direct-primary'
                      : 'text-white/80 hover:text-white'
                    }
                  `}
                >
                  {item.label}
                </button>
                {/* Выпадающее меню */}
                <ul className="
                  absolute left-0 top-full mt-2 py-2
                  bg-direct-dark/95 backdrop-blur-sm
                  border border-white/10 rounded-lg
                  opacity-0 invisible group-hover:opacity-100 group-hover:visible
                  transition-all duration-200
                  min-w-[200px] z-50
                ">
                  {item.children.map((child) => (
                    <li key={child.href}>
                      <a
                        href={child.href}
                        className="block px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/5 transition-colors"
                        onClick={() => handleClick(child)}
                      >
                        {child.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <a
                href={item.href}
                className={`
                  block px-4 py-2 text-sm font-medium transition-colors
                  ${isActive(item.href)
                    ? 'text-direct-primary'
                    : 'text-white/80 hover:text-white'
                  }
                `}
                onClick={() => handleClick(item)}
              >
                {item.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

/**
 * Стандартные элементы навигации М.И.Т.А.
 */
export const defaultNavItems: NavItem[] = [
  {
    label: 'Услуги',
    href: '/#services',
    children: [
      { label: 'Лидогенерация', href: '/services/leadgen' },
      { label: 'Call-центр', href: '/services/call-center' },
      { label: 'Авито', href: '/services/avito' },
      { label: 'Рекрутинг', href: '/services/recruiting' },
    ],
  },
  {
    label: 'О компании',
    href: '/about',
  },
  {
    label: 'Кейсы',
    href: '/cases',
  },
  {
    label: 'Блог',
    href: '/blog',
  },
  {
    label: 'Контакты',
    href: '/contact',
  },
];

/**
 * Навигация для footer
 */
export const footerNavItems: NavItem[] = [
  {
    label: 'Услуги',
    href: '/#services',
    children: [
      { label: 'Лидогенерация', href: '/services/leadgen' },
      { label: 'Call-центр', href: '/services/call-center' },
      { label: 'Авито', href: '/services/avito' },
      { label: 'Рекрутинг', href: '/services/recruiting' },
    ],
  },
  {
    label: 'Компания',
    href: '/about',
    children: [
      { label: 'О нас', href: '/about' },
      { label: 'Кейсы', href: '/cases' },
      { label: 'Отзывы', href: '/testimonials' },
    ],
  },
  {
    label: 'Ресурсы',
    href: '/blog',
    children: [
      { label: 'Блог', href: '/blog' },
      { label: 'Безопасность', href: '/security' },
    ],
  },
  {
    label: 'Контакты',
    href: '/contact',
  },
];

/**
 * Юридическая навигация для footer
 */
export const legalNavItems: NavItem[] = [
  {
    label: 'Условия использования',
    href: '/legal/terms',
  },
  {
    label: 'Политика конфиденциальности',
    href: '/legal/privacy',
  },
];
