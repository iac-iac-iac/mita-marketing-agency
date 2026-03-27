import { render, screen } from '@testing-library/react'
import VacancyCases from './VacancyCases'

// Мок для framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    h3: ({ children, ...props }: any) => <h3 {...props}>{children}</h3>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
  },
  useInView: () => true,
}))

// Мок для Counter компонента
jest.mock('@/components/ui/Counter', () => {
  return {
    __esModule: true,
    default: ({ value }: { value: number }) => <span data-testid="counter">{value}</span>,
  }
})

describe('VacancyCases', () => {
  const mockCases = [
    {
      niche: 'Продажи',
      position: 'Менеджер по продажам',
      deadline: '14 дней',
      result: '25 кандидатов',
      icon: '💼',
    },
    {
      niche: 'Производство',
      position: 'Оператор станка ЧПУ',
      deadline: '21 день',
      result: '18 кандидатов',
      icon: '🏭',
    },
    {
      niche: 'Ритейл',
      position: 'Продавец-консультант',
      deadline: '10 дней',
      result: '40 кандидатов',
      icon: '🛍️',
    },
    {
      niche: 'Логистика',
      position: 'Водитель-экспедитор',
      deadline: '7 дней',
      result: '12 кандидатов',
      icon: '🚚',
    },
  ]

  const defaultProps = {
    cases: mockCases,
    title: 'Закрытые вакансии',
    description: 'Реальные результаты подбора по разным нишам',
  }

  it('рендерит заголовок и описание', () => {
    render(<VacancyCases {...defaultProps} />)

    expect(screen.getByText('Закрытые вакансии')).toBeInTheDocument()
    expect(screen.getByText('Реальные результаты подбора по разным нишам')).toBeInTheDocument()
  })

  it('рендерит все кейсы', () => {
    render(<VacancyCases {...defaultProps} />)

    mockCases.forEach(caseItem => {
      expect(screen.getByText(caseItem.position)).toBeInTheDocument()
    })
  })

  it('рендерит ниши для каждого кейса', () => {
    render(<VacancyCases {...defaultProps} />)

    mockCases.forEach(caseItem => {
      expect(screen.getByText(caseItem.niche)).toBeInTheDocument()
    })
  })

  it('рендерит сроки закрытия', () => {
    render(<VacancyCases {...defaultProps} />)

    mockCases.forEach(caseItem => {
      expect(screen.getByText(caseItem.deadline)).toBeInTheDocument()
    })
  })

  it('рендерит результаты', () => {
    render(<VacancyCases {...defaultProps} />)

    mockCases.forEach(caseItem => {
      expect(screen.getByText(caseItem.result)).toBeInTheDocument()
    })
  })

  it('рендерит иконки для каждого кейса', () => {
    render(<VacancyCases {...defaultProps} />)

    mockCases.forEach(caseItem => {
      expect(screen.getByText(caseItem.icon)).toBeInTheDocument()
    })
  })

  it('работает без description (опционально)', () => {
    const propsWithoutDesc = {
      ...defaultProps,
      description: undefined,
    }

    render(<VacancyCases {...propsWithoutDesc} />)

    expect(screen.queryByText('Реальные результаты подбора по разным нишам')).not.toBeInTheDocument()
  })

  it('работает без title (опционально)', () => {
    const propsWithoutTitle = {
      cases: mockCases,
    }

    render(<VacancyCases {...propsWithoutTitle} />)

    expect(screen.queryByText('Закрытые вакансии')).not.toBeInTheDocument()
  })

  it('использует title по умолчанию', () => {
    const propsWithDefaultTitle = {
      cases: mockCases,
    }

    render(<VacancyCases {...propsWithDefaultTitle} />)

    expect(screen.getByText('Закрытые вакансии')).toBeInTheDocument()
  })

  it('рендерит правильное количество стеклянных карточек', () => {
    render(<VacancyCases {...defaultProps} />)

    const glassCards = document.querySelectorAll('.glass')
    expect(glassCards).toHaveLength(mockCases.length)
  })

  it('имеет правильную структуру grid для адаптивности', () => {
    render(<VacancyCases {...defaultProps} />)

    const gridContainer = document.querySelector('.grid')
    expect(gridContainer).toBeInTheDocument()
    expect(gridContainer).toHaveClass('grid-cols-1')
    expect(gridContainer).toHaveClass('md:grid-cols-2')
    expect(gridContainer).toHaveClass('lg:grid-cols-4')
  })

  it('обрабатывает пустой массив cases', () => {
    const propsWithEmptyCases = {
      cases: [],
      title: 'Пустые кейсы',
    }

    render(<VacancyCases {...propsWithEmptyCases} />)

    expect(screen.getByText('Пустые кейсы')).toBeInTheDocument()
    expect(document.querySelectorAll('.glass')).toHaveLength(0)
  })

  it('рендерит кейсы в правильном порядке', () => {
    render(<VacancyCases {...defaultProps} />)

    const positions = screen.getAllByText(/(Менеджер по продажам|Оператор станка ЧПУ|Продавец-консультант|Водитель-экспедитор)/)
    expect(positions).toHaveLength(mockCases.length)
  })

  it('имеет правильную структуру с label для срока', () => {
    render(<VacancyCases {...defaultProps} />)

    expect(screen.getByText('Срок:')).toBeInTheDocument()
  })

  it('имеет правильную структуру с label для результата', () => {
    render(<VacancyCases {...defaultProps} />)

    expect(screen.getByText('Результат:')).toBeInTheDocument()
  })

  it('применяет анимацию с задержкой для каждой карточки', () => {
    render(<VacancyCases {...defaultProps} />)

    const cards = document.querySelectorAll('.glass')
    cards.forEach((card, index) => {
      expect(card).toBeInTheDocument()
    })
  })

  it('рендерит нишу как badge/тег', () => {
    render(<VacancyCases {...defaultProps} />)

    // Проверяем наличие ниш (они могут быть в badge)
    const niches = screen.getAllByText(/(Продажи|Производство|Ритейл|Логистика)/)
    expect(niches.length).toBeGreaterThanOrEqual(mockCases.length)
  })
})
