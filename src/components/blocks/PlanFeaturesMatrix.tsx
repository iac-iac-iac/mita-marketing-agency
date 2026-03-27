export interface PlanFeaturesMatrixProps {
  plans: string[];
  features: string[];
  values: Record<string, Record<string, string>>;
}

export default function PlanFeaturesMatrix({
  plans,
  features,
  values,
}: PlanFeaturesMatrixProps) {
  return (
    <section className="py-20 md:py-28 relative">
      {/* Фоновый градиент */}
      <div className="absolute inset-0 bg-gradient-to-b from-direct-dark via-direct-purple/30 to-direct-dark" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Заголовок */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 animate-fade-in">
            Сравнение планов
          </h2>
          
          {/* Таблица */}
          <div className="glass rounded-3xl overflow-hidden animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="overflow-x-auto">
              <table className="w-full">
                {/* Шапка таблицы */}
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left p-4 md:p-6 text-gray-400 font-medium min-w-[200px]">
                      Функции
                    </th>
                    {plans.map((plan, index) => (
                      <th
                        key={index}
                        className={`text-center p-4 md:p-6 font-semibold min-w-[150px] ${
                          index === 1 ? 'text-direct-primary' : 'text-white'
                        }`}
                      >
                        {plan}
                      </th>
                    ))}
                  </tr>
                </thead>
                
                {/* Тело таблицы */}
                <tbody>
                  {features.map((feature, featureIndex) => (
                    <tr
                      key={featureIndex}
                      className={`border-b border-white/5 hover:bg-white/5 transition-colors ${
                        featureIndex % 2 === 0 ? 'bg-white/0' : 'bg-white/[0.02]'
                      }`}
                      style={{ animationDelay: `${0.2 + featureIndex * 0.05}s` }}
                    >
                      <td className="p-4 md:p-6 text-gray-300">
                        {feature}
                      </td>
                      {plans.map((plan, planIndex) => (
                        <td key={planIndex} className="text-center p-4 md:p-6">
                          {values[plan]?.[feature] === '✓' || values[plan]?.[feature] === 'Да' ? (
                            <svg className="w-6 h-6 text-direct-primary mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : values[plan]?.[feature] === '—' || values[plan]?.[feature] === 'Нет' ? (
                            <svg className="w-6 h-6 text-gray-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          ) : (
                            <span className="text-gray-400">{values[plan]?.[feature] || '—'}</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
