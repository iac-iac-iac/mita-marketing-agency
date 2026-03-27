import Link from 'next/link'
import type { ReactNode } from 'react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const aboutLinks = [
    { label: 'О компании', url: '/about' },
    { label: 'Услуги', url: '/#services' },
    { label: 'Контакты', url: '/contact' },
  ]

  const servicesLinks = [
    { label: 'Лидогенерация', url: '/services/leadgen' },
    { label: 'Call-центр', url: '/services/call-center' },
    { label: 'Продвижение на Авито', url: '/services/avito' },
    { label: 'Рекрутинг', url: '/services/recruiting' },
  ]

  const resourcesLinks = [
    { label: 'Блог', url: '/blog' },
    { label: 'Кейсы', url: '/cases' },
    { label: 'Безопасность', url: '/security' },
    { label: 'FAQ', url: '/contact' },
  ]

  const legalLinks = [
    { label: 'Политика конфиденциальности', url: '/legal/privacy' },
    { label: 'Условия оказания услуг', url: '/legal/terms' },
  ]

  const socialLinks = [
    { label: 'Telegram', url: 'https://t.me/directline', icon: 'telegram' },
    { label: 'WhatsApp', url: 'https://wa.me/directline', icon: 'whatsapp' },
    { label: 'VK', url: 'https://vk.com/directline', icon: 'vk' },
  ]

  return (
    <footer className="bg-direct-dark border-t border-white/10">
      <div className="container mx-auto px-4 py-12">
        {/* Основной контент */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
          {/* О компании */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <img
                src="/images/icons/Favicon.ico"
                alt="Direct-line"
                className="w-8 h-8"
              />
              <span className="text-xl font-bold text-white">Direct-line</span>
            </Link>
            <p className="text-gray-400 text-sm mb-4">
              Маркетинговое IT-агентство полного цикла. Комплексная система лидогенерации для вашего бизнеса.
            </p>
          </div>

          {/* О компании ссылки */}
          <div>
            <h4 className="text-white font-semibold mb-4">О компании</h4>
            <ul className="space-y-2">
              {aboutLinks.map((link) => (
                <li key={link.url}>
                  <Link
                    href={link.url}
                    className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Услуги */}
          <div>
            <h4 className="text-white font-semibold mb-4">Услуги</h4>
            <ul className="space-y-2">
              {servicesLinks.map((link) => (
                <li key={link.url}>
                  <Link
                    href={link.url}
                    className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ресурсы */}
          <div>
            <h4 className="text-white font-semibold mb-4">Ресурсы</h4>
            <ul className="space-y-2">
              {resourcesLinks.map((link) => (
                <li key={link.url}>
                  <Link
                    href={link.url}
                    className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Юридическое */}
          <div>
            <h4 className="text-white font-semibold mb-4">Юридическое</h4>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.url}>
                  <Link
                    href={link.url}
                    className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Соцсети и копирайт */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Копирайт */}
            <p className="text-gray-500 text-sm">
              © {currentYear} Direct-line. Все права защищены.
            </p>

            {/* Соцсети */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.url}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl glass flex items-center justify-center text-gray-400 hover:text-white hover:bg-direct-primary/20 transition-all duration-300"
                  aria-label={social.label}
                >
                  <SocialIcon name={social.icon} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

function SocialIcon({ name }: { name: string }): ReactNode {
  const icons: Record<string, ReactNode> = {
    telegram: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.88-2.11 5.88-2.53 2.8-1.18 3.38-1.38 3.76-1.38.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .24z" />
      </svg>
    ),
    whatsapp: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
    vk: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M15.073 2H8.937C5.027 2 2 4.937 2 8.927v6.136C2 18.973 4.937 22 8.927 22h6.136C19.063 22 22 19.063 22 15.073V8.937C22 5.027 19.063 2 15.073 2zM17.9 13.5c.6.6.6.6 1.2.6h.6c.6 0 .6.6 0 1.2-.6.6-1.2.6-1.8.6h-1.2c-1.2 0-1.8-.6-2.4-1.2-.6-.6-1.2-1.2-1.8-1.2s-.6.6-.6 1.2v1.2c0 .6-.6.6-1.2.6h-1.2c-1.8 0-3.6-1.2-4.8-3.6-1.2-2.4-1.2-4.8 0-6.6 0-.6.6-.6 1.2-.6h1.2c.6 0 .6.6.6 1.2v1.2c0 .6.6 1.2 1.2 1.2s.6-.6.6-1.2V6.5c0-.6-.6-1.2-1.2-1.2H7.1c-.6 0-1.2.6-1.2 1.2v1.2c0 2.4 1.2 4.8 3.6 6.6 1.2.6 1.8 1.2 2.4 1.2s.6-.6.6-1.2v-1.2c0-.6.6-.6 1.2-.6s1.2.6 1.8 1.2c.6.6 1.2 1.2 2.4 1.2h1.2c.6 0 .6-.6.6-1.2v-1.2c0-.6-.6-.6-1.2-.6s-.6.6-.6 1.2z" />
      </svg>
    ),
  }

  return icons[name] || null
}
