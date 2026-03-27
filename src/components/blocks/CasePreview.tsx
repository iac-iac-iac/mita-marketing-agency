import Link from 'next/link'

export interface CasePreviewProps {
  title: string;
  casesLimit?: number;
  cases: {
    title: string;
    industry: string;
    resultSummary: string;
    services: string[];
    slug: string;
  }[];
}

export default function CasePreview({
  title,
  casesLimit = 3,
  cases,
}: CasePreviewProps) {
  const limitedCases = cases.slice(0, casesLimit)

  return (
    <section className="py-20 md:py-28 relative">
      {/* Фоновый градиент */}
      <div className="absolute inset-0 bg-gradient-to-b from-direct-dark via-direct-purple/30 to-direct-dark" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Заголовок */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold animate-fade-in">
            {title}
          </h2>
          <Link
            href="/cases"
            className="text-direct-primary hover:text-white transition-colors duration-300 font-medium inline-flex items-center gap-2 group animate-fade-in"
            style={{ animationDelay: '0.1s' }}
          >
            Смотреть все кейсы
            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
        
        {/* Сетка кейсов */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {limitedCases.map((caseItem, index) => (
            <Link
              key={caseItem.slug}
              href={`/cases/${caseItem.slug}`}
              className="glass p-8 rounded-3xl hover:bg-white/10 transition-all duration-300 hover:scale-105 group animate-fade-in"
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              {/* Индустрия */}
              <span className="inline-block px-3 py-1 rounded-full bg-direct-accent/20 text-direct-accent text-sm font-medium mb-4">
                {caseItem.industry}
              </span>
              
              {/* Заголовок кейса */}
              <h3 className="text-2xl font-semibold text-white mb-4 group-hover:text-direct-primary transition-colors">
                {caseItem.title}
              </h3>
              
              {/* Результат */}
              <div className="mb-6">
                <p className="text-gray-300 leading-relaxed">
                  {caseItem.resultSummary}
                </p>
              </div>
              
              {/* Услуги */}
              <div className="flex flex-wrap gap-2 mb-6">
                {caseItem.services.map((service, serviceIndex) => (
                  <span
                    key={serviceIndex}
                    className="px-3 py-1 rounded-lg bg-white/5 text-gray-400 text-sm"
                  >
                    {service}
                  </span>
                ))}
              </div>
              
              {/* CTA ссылка */}
              <div className="flex items-center gap-2 text-direct-primary font-medium group-hover:gap-3 transition-all">
                <span>Подробнее</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
