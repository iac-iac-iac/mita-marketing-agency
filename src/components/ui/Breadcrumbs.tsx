import Link from 'next/link';

interface Breadcrumb {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: Breadcrumb[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Навигация" className="mb-6">
      <ol className="flex items-center gap-2 text-sm text-gray-300 flex-wrap">
        {/* Главная */}
        <li>
          <Link href="/" className="hover:text-direct-primary transition-colors">
            Главная
          </Link>
        </li>

        {/* Остальные элементы */}
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>

            {item.href ? (
              <Link
                href={item.href}
                className={`hover:text-direct-primary transition-colors ${
                  index === items.length - 1 ? 'text-direct-primary font-medium' : ''
                }`}
              >
                {item.label}
              </Link>
            ) : (
              <span className={index === items.length - 1 ? 'text-direct-primary font-medium' : ''}>
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
