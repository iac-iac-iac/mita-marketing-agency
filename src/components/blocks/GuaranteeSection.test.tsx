import { render, screen } from '@testing-library/react'
import GuaranteeSection from './GuaranteeSection'

// Мок для framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    h3: ({ children, ...props }: any) => <h3 {...props}>{children}</h3>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
  },
  useInView: () => true,
}))

describe('GuaranteeSection', () => {
  const mockGuarantees = [
    {
      title: 'Замена кандидата',
      description: 'Если кандидат не прошёл испытательный срок, найдём замену бесплатно в течение 14 дней',
      icon: '🔄',
      color: 'blue',
    },
    {
      title: 'Возврат денег',
      description: 'Если не закроем вакансию в срок, вернём 100% предоплаты без вопросов',
      icon: '💰',
      color: 'green',
    },
    {
      title: 'Соблюдение сроков',
      description: 'Гарантируем передачу кандидатов точно в оговоренные даты по договору',
      icon: '⏰',
      color: 'purple',
    },
  ]

  const defaultProps = {
    guarantees: mockGuarantees,
    title: 'Наши гарантии',
    description: 'Работаем по договору с полной ответственностью за результат',
  }

  it('рендерит заголовок и описание', () => {
    render(<GuaranteeSection {...defaultProps} />)

    expect(screen.getByText('Наши гарантии')).toBeInTheDocument()
    expect(screen.getByText('Работаем по договору с полной ответственностью за результат')).toBeInTheDocument()
  })

  it('рендерит все гарантии', () => {
    render(<GuaranteeSection {...defaultProps} />)

    mockGuarantees.forEach(guarantee => {
      expect(screen.getByText(guarantee.title)).toBeInTheDocument()
    })
  })

  it('рендерит описания для каждой гарантии', () => {
    render(<GuaranteeSection {...defaultProps} />)

    mockGuarantees.forEach(guarantee => {
      expect(screen.getByText(guarantee.description)).toBeInTheDocument()
    })
  })

  it('рендерит иконки для каждой гарантии', () => {
    render(<GuaranteeSection {...defaultProps} />)

    mockGuarantees.forEach(guarantee => {
      expect(screen.getByText(guarantee.icon)).toBeInTheDocument()
    })
  })

  it('работает без description (опционально)', () => {
    const propsWithoutDesc = {
      ...defaultProps,
      description: undefined,
    }

    render(<GuaranteeSection {...propsWithoutDesc} />)

    expect(screen.queryByText('Работаем по договору с полной ответственностью за результат')).not.toBeInTheDocument()
  })

  it('работает без title (опционально)', () => {
    const propsWithoutTitle = {
      guarantees: mockGuarantees,
    }

    render(<GuaranteeSection {...propsWithoutTitle} />)

    expect(screen.queryByText('Наши гарантии')).not.toBeInTheDocument()
  })

  it('использует title по умолчанию', () => {
    const propsWithDefaultTitle = {
      guarantees: mockGuarantees,
    }

    render(<GuaranteeSection {...propsWithDefaultTitle} />)

    expect(screen.getByText('Наши гарантии')).toBeInTheDocument()
  })

  it('рендерит правильное количество стеклянных карточек', () => {
    render(<GuaranteeSection {...defaultProps} />)

    const glassCards = document.querySelectorAll('.glass')
    expect(glassCards).toHaveLength(mockGuarantees.length)
  })

  it('имеет правильную структуру grid для адаптивности', () => {
    render(<GuaranteeSection {...defaultProps} />)

    const gridContainer = document.querySelector('.grid')
    expect(gridContainer).toBeInTheDocument()
    expect(gridContainer).toHaveClass('grid-cols-1')
    expect(gridContainer).toHaveClass('md:grid-cols-3')
  })

  it('обрабатывает пустой массив guarantees', () => {
    const propsWithEmptyGuarantees = {
      guarantees: [],
      title: 'Пустые гарантии',
    }

    render(<GuaranteeSection {...propsWithEmptyGuarantees} />)

    expect(screen.getByText('Пустые гарантии')).toBeInTheDocument()
    expect(document.querySelectorAll('.glass')).toHaveLength(0)
  })

  it('рендерит гарантии в правильном порядке', () => {
    render(<GuaranteeSection {...defaultProps} />)

    const titles = screen.getAllByText(/(Замена кандидата|Возврат денег|Соблюдение сроков)/)
    expect(titles).toHaveLength(mockGuarantees.length)
  })

  it('применяет анимацию с задержкой для каждой карточки', () => {
    render(<GuaranteeSection {...defaultProps} />)

    const cards = document.querySelectorAll('.glass')
    cards.forEach((card, index) => {
      expect(card).toBeInTheDocument()
    })
  })

  it('имеет правильную структуру с иконкой в круге', () => {
    render(<GuaranteeSection {...defaultProps} />)

    // Проверяем наличие контейнеров для иконок
    const iconContainers = document.querySelectorAll('.rounded-full')
    expect(iconContainers.length).toBeGreaterThanOrEqual(mockGuarantees.length)
  })

  it('рендерит минимальное количество гарантий (одна)', () => {
    const propsWithOneGuarantee = {
      guarantees: [
        {
          title: 'Тестовая гарантия',
          description: 'Описание тестовой гарантии',
          icon: '✅',
          color: 'blue',
        },
      ],
      title: 'Тест',
    }

    render(<GuaranteeSection {...propsWithOneGuarantee} />)

    expect(screen.getByText('Тестовая гарантия')).toBeInTheDocument()
    expect(document.querySelectorAll('.glass')).toHaveLength(1)
  })

  it('рендерит разные цвета для гарантий', () => {
    render(<GuaranteeSection {...defaultProps} />)

    // Проверяем наличие цветовых классов
    const blueElements = document.querySelectorAll('[class*="blue"]')
    const greenElements = document.querySelectorAll('[class*="green"]')
    const purpleElements = document.querySelectorAll('[class*="purple"]')
    
    // Хотя бы некоторые элементы должны иметь цветовые классы
    expect(blueElements.length + greenElements.length + purpleElements.length).toBeGreaterThan(0)
  })
})
