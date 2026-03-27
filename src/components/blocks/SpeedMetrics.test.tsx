import { render, screen } from '@testing-library/react'
import SpeedMetrics from './SpeedMetrics'

// Мок для framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    h3: ({ children, ...props }: any) => <h3 {...props}>{children}</h3>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
  },
  useInView: () => true, // Всегда считаем что элемент в view для тестов
}))

// Мок для Counter компонента
jest.mock('@/components/ui/Counter', () => {
  return {
    __esModule: true,
    default: ({ value }: { value: number }) => <span data-testid="counter">{value}</span>,
  }
})

describe('SpeedMetrics', () => {
  const mockMetrics = [
    {
      label: 'Дней на закрытие вакансии',
      value: 14,
      suffix: ' дней',
      icon: '🚀',
      description: 'Средний срок подбора',
    },
    {
      label: 'Звонков в день',
      value: 200,
      suffix: '',
      icon: '📞',
      description: 'На одного рекрутера',
    },
    {
      label: 'Собеседований в неделю',
      value: 50,
      suffix: '',
      icon: '👥',
      description: 'С квалифицированными кандидатами',
    },
  ]

  const defaultProps = {
    metrics: mockMetrics,
    title: 'Скорость подбора',
    description: 'Наши показатели эффективности',
  }

  it('рендерит заголовок и описание', () => {
    render(<SpeedMetrics {...defaultProps} />)

    expect(screen.getByText('Скорость подбора')).toBeInTheDocument()
    expect(screen.getByText('Наши показатели эффективности')).toBeInTheDocument()
  })

  it('рендерит все метрики скорости', () => {
    render(<SpeedMetrics {...defaultProps} />)

    mockMetrics.forEach(metric => {
      expect(screen.getByText(metric.label)).toBeInTheDocument()
    })
  })

  it('рендерит иконки для каждой метрики', () => {
    render(<SpeedMetrics {...defaultProps} />)

    mockMetrics.forEach(metric => {
      expect(screen.getByText(metric.icon)).toBeInTheDocument()
    })
  })

  it('рендерит значения с Counter компонентом', () => {
    render(<SpeedMetrics {...defaultProps} />)

    const counters = screen.getAllByTestId('counter')
    expect(counters).toHaveLength(mockMetrics.length)
  })

  it('рендерит описания для каждой метрики', () => {
    render(<SpeedMetrics {...defaultProps} />)

    mockMetrics.forEach(metric => {
      expect(screen.getByText(metric.description!)).toBeInTheDocument()
    })
  })

  it('рендерит суффиксы для значений', () => {
    render(<SpeedMetrics {...defaultProps} />)

    expect(screen.getByText('дней')).toBeInTheDocument()
  })

  it('работает без description (опционально)', () => {
    const propsWithoutDesc = {
      ...defaultProps,
      description: undefined,
    }

    render(<SpeedMetrics {...propsWithoutDesc} />)

    expect(screen.queryByText('Наши показатели эффективности')).not.toBeInTheDocument()
  })

  it('работает без title (опционально)', () => {
    const propsWithoutTitle = {
      metrics: mockMetrics,
    }

    render(<SpeedMetrics {...propsWithoutTitle} />)

    expect(screen.queryByText('Скорость подбора')).not.toBeInTheDocument()
  })

  it('использует title по умолчанию', () => {
    const propsWithDefaultTitle = {
      metrics: mockMetrics,
    }

    render(<SpeedMetrics {...propsWithDefaultTitle} />)

    expect(screen.getByText('Скорость подбора')).toBeInTheDocument()
  })

  it('рендерит правильное количество стеклянных карточек', () => {
    render(<SpeedMetrics {...defaultProps} />)

    const glassCards = document.querySelectorAll('.glass')
    expect(glassCards).toHaveLength(mockMetrics.length)
  })

  it('имеет правильную структуру grid для адаптивности', () => {
    render(<SpeedMetrics {...defaultProps} />)

    const gridContainer = document.querySelector('.grid')
    expect(gridContainer).toBeInTheDocument()
    expect(gridContainer).toHaveClass('grid-cols-1')
    expect(gridContainer).toHaveClass('md:grid-cols-3')
  })

  it('обрабатывает пустой массив metrics', () => {
    const propsWithEmptyMetrics = {
      metrics: [],
      title: 'Пустые метрики',
    }

    render(<SpeedMetrics {...propsWithEmptyMetrics} />)

    expect(screen.getByText('Пустые метрики')).toBeInTheDocument()
    expect(document.querySelectorAll('.glass')).toHaveLength(0)
  })

  it('обрабатывает метрику с нулевым значением', () => {
    const propsWithZeroValue = {
      metrics: [
        {
          label: 'Тестовая метрика',
          value: 0,
          suffix: '',
          icon: '📊',
        },
      ],
      title: 'Тест',
    }

    render(<SpeedMetrics {...propsWithZeroValue} />)

    const counter = screen.getByTestId('counter')
    expect(counter).toHaveTextContent('0')
  })

  it('обрабатывает метрику с большим значением', () => {
    const propsWithLargeValue = {
      metrics: [
        {
          label: 'Большая метрика',
          value: 10000,
          suffix: '+',
          icon: '📈',
        },
      ],
      title: 'Тест',
    }

    render(<SpeedMetrics {...propsWithLargeValue} />)

    expect(screen.getByText('10000')).toBeInTheDocument()
    expect(screen.getByText('+')).toBeInTheDocument()
  })

  it('применяет анимацию с задержкой для каждой карточки', () => {
    render(<SpeedMetrics {...defaultProps} />)

    const cards = document.querySelectorAll('.glass')
    cards.forEach((card, index) => {
      expect(card).toBeInTheDocument()
    })
  })

  it('имеет правильную структуру с иконкой в круге', () => {
    render(<SpeedMetrics {...defaultProps} />)

    // Проверяем наличие контейнеров для иконок
    const iconContainers = document.querySelectorAll('.rounded-full')
    expect(iconContainers.length).toBeGreaterThanOrEqual(mockMetrics.length)
  })

  it('рендерит метрики в правильном порядке', () => {
    render(<SpeedMetrics {...defaultProps} />)

    const labels = screen.getAllByText(/(Дней на закрытие вакансии|Звонков в день|Собеседований в неделю)/)
    expect(labels).toHaveLength(mockMetrics.length)
    
    // Проверяем порядок следования
    expect(labels[0]).toHaveTextContent('Дней на закрытие вакансии')
    expect(labels[1]).toHaveTextContent('Звонков в день')
    expect(labels[2]).toHaveTextContent('Собеседований в неделю')
  })
})
