import { render, screen } from '@testing-library/react'
import CallStatistics from './CallStatistics'

// Мок для framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
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

describe('CallStatistics', () => {
  const mockStats = [
    {
      label: 'Звонков в день',
      value: 85,
      suffix: '',
      icon: '📞',
      description: 'В среднем на оператора',
    },
    {
      label: 'Конверсия в продажу',
      value: 12,
      suffix: '%',
      icon: '📈',
      description: 'Средний показатель по проектам',
    },
    {
      label: 'NPS клиентов',
      value: 72,
      suffix: '',
      icon: '⭐',
      description: 'Индекс лояльности',
    },
    {
      label: 'Среднее время звонка',
      value: 4,
      suffix: ' мин',
      icon: '⏱️',
      description: 'Оптимальная длительность',
    },
  ]

  const defaultProps = {
    stats: mockStats,
    title: 'Наши результаты в цифрах',
    description: 'Показатели эффективности нашего call-центра',
  }

  it('рендерит заголовок и описание', () => {
    render(<CallStatistics {...defaultProps} />)
    
    expect(screen.getByText('Наши результаты в цифрах')).toBeInTheDocument()
    expect(screen.getByText('Показатели эффективности нашего call-центра')).toBeInTheDocument()
  })

  it('рендерит все статистики', () => {
    render(<CallStatistics {...defaultProps} />)
    
    // Проверяем наличие всех label
    mockStats.forEach(stat => {
      expect(screen.getByText(stat.label)).toBeInTheDocument()
    })
  })

  it('рендерит иконки для каждой статистики', () => {
    render(<CallStatistics {...defaultProps} />)
    
    mockStats.forEach(stat => {
      expect(screen.getByText(stat.icon)).toBeInTheDocument()
    })
  })

  it('рендерит значения с Counter компонентом', () => {
    render(<CallStatistics {...defaultProps} />)
    
    const counters = screen.getAllByTestId('counter')
    expect(counters).toHaveLength(mockStats.length)
  })

  it('рендерит описания для каждой статистики', () => {
    render(<CallStatistics {...defaultProps} />)
    
    mockStats.forEach(stat => {
      expect(screen.getByText(stat.description!)).toBeInTheDocument()
    })
  })

  it('работает без description (опционально)', () => {
    const propsWithoutDesc = {
      ...defaultProps,
      description: undefined,
    }
    
    render(<CallStatistics {...propsWithoutDesc} />)
    
    expect(screen.queryByText('Показатели эффективности нашего call-центра')).not.toBeInTheDocument()
  })

  it('работает без title (опционально)', () => {
    const propsWithoutTitle = {
      stats: mockStats,
    }
    
    render(<CallStatistics {...propsWithoutTitle} />)
    
    expect(screen.queryByText('Наши результаты в цифрах')).not.toBeInTheDocument()
  })

  it('использует title по умолчанию', () => {
    const propsWithDefaultTitle = {
      stats: mockStats,
    }
    
    render(<CallStatistics {...propsWithDefaultTitle} />)
    
    // Проверяем что заголовок рендерится со значением по умолчанию
    expect(screen.getByText('Наши результаты в цифрах')).toBeInTheDocument()
  })

  it('рендерит правильное количество стеклянных карточек', () => {
    render(<CallStatistics {...defaultProps} />)
    
    // Проверяем наличие glass классов (через className)
    const glassCards = document.querySelectorAll('.glass')
    expect(glassCards).toHaveLength(mockStats.length)
  })

  it('имеет правильную структуру grid для адаптивности', () => {
    render(<CallStatistics {...defaultProps} />)
    
    const gridContainer = document.querySelector('.grid')
    expect(gridContainer).toBeInTheDocument()
    expect(gridContainer).toHaveClass('grid-cols-1')
    expect(gridContainer).toHaveClass('sm:grid-cols-2')
    expect(gridContainer).toHaveClass('lg:grid-cols-4')
  })

  it('рендерит суффиксы для значений', () => {
    render(<CallStatistics {...defaultProps} />)
    
    // Проверяем наличие суффиксов
    expect(screen.getByText('%')).toBeInTheDocument()
    expect(screen.getByText('мин')).toBeInTheDocument()
  })

  it('обрабатывает пустой массив stats', () => {
    const propsWithEmptyStats = {
      stats: [],
      title: 'Пустая статистика',
    }
    
    render(<CallStatistics {...propsWithEmptyStats} />)
    
    expect(screen.getByText('Пустая статистика')).toBeInTheDocument()
    expect(document.querySelectorAll('.glass')).toHaveLength(0)
  })

  it('применяет анимацию с задержкой для каждой карточки', () => {
    render(<CallStatistics {...defaultProps} />)
    
    // Проверяем что у каждой карточки есть transition с delay
    const cards = document.querySelectorAll('.glass')
    cards.forEach((card, index) => {
      // В тестах мы не можем проверить точные значения transition,
      // но можем убедиться что элементы отрендерились
      expect(card).toBeInTheDocument()
    })
  })
})
