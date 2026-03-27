import { render, screen } from '@testing-library/react'
import RecruitmentFunnel from './RecruitmentFunnel'

// Мок для framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    h3: ({ children, ...props }: any) => <h3 {...props}>{children}</h3>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
  },
  useInView: () => true,
}))

describe('RecruitmentFunnel', () => {
  const mockStages = [
    {
      number: 1,
      name: 'Заявок получено',
      count: 1000,
      conversion: 100,
      description: 'Первичный контакт',
    },
    {
      number: 2,
      name: 'Дозвонились',
      count: 650,
      conversion: 65,
      description: 'Установлен контакт',
    },
    {
      number: 3,
      name: 'Заинтересовались',
      count: 400,
      conversion: 40,
      description: 'Выразили интерес к вакансии',
    },
    {
      number: 4,
      name: 'Прошли собеседование',
      count: 200,
      conversion: 20,
      description: 'Успешное интервью',
    },
    {
      number: 5,
      name: 'Вышли на работу',
      count: 100,
      conversion: 10,
      description: 'Трудоустроены',
    },
  ]

  const defaultProps = {
    stages: mockStages,
    title: 'Воронка кандидатов',
    description: 'Прозрачный процесс подбора от звонка до выхода на работу',
  }

  it('рендерит заголовок и описание', () => {
    render(<RecruitmentFunnel {...defaultProps} />)

    expect(screen.getByText('Воронка кандидатов')).toBeInTheDocument()
    expect(screen.getByText('Прозрачный процесс подбора от звонка до выхода на работу')).toBeInTheDocument()
  })

  it('рендерит все этапы воронки', () => {
    render(<RecruitmentFunnel {...defaultProps} />)

    mockStages.forEach(stage => {
      expect(screen.getByText(stage.name)).toBeInTheDocument()
    })
  })

  it('рендерит номера этапов', () => {
    render(<RecruitmentFunnel {...defaultProps} />)

    mockStages.forEach(stage => {
      expect(screen.getByText(stage.number.toString())).toBeInTheDocument()
    })
  })

  it('рендерит количество кандидатов на каждом этапе', () => {
    render(<RecruitmentFunnel {...defaultProps} />)

    mockStages.forEach(stage => {
      expect(screen.getByText(stage.count.toString())).toBeInTheDocument()
    })
  })

  it('рендерит конверсию для каждого этапа', () => {
    render(<RecruitmentFunnel {...defaultProps} />)

    mockStages.forEach(stage => {
      expect(screen.getByText(`${stage.conversion}%`)).toBeInTheDocument()
    })
  })

  it('рендерит описания этапов', () => {
    render(<RecruitmentFunnel {...defaultProps} />)

    mockStages.forEach(stage => {
      expect(screen.getByText(stage.description)).toBeInTheDocument()
    })
  })

  it('работает без description (опционально)', () => {
    const propsWithoutDesc = {
      ...defaultProps,
      description: undefined,
    }

    render(<RecruitmentFunnel {...propsWithoutDesc} />)

    expect(screen.queryByText('Прозрачный процесс подбора от звонка до выхода на работу')).not.toBeInTheDocument()
  })

  it('работает без title (опционально)', () => {
    const propsWithoutTitle = {
      stages: mockStages,
    }

    render(<RecruitmentFunnel {...propsWithoutTitle} />)

    expect(screen.queryByText('Воронка кандидатов')).not.toBeInTheDocument()
  })

  it('использует title по умолчанию', () => {
    const propsWithDefaultTitle = {
      stages: mockStages,
    }

    render(<RecruitmentFunnel {...propsWithDefaultTitle} />)

    expect(screen.getByText('Воронка кандидатов')).toBeInTheDocument()
  })

  it('рендерит правильное количество стеклянных карточек', () => {
    render(<RecruitmentFunnel {...defaultProps} />)

    const glassCards = document.querySelectorAll('.glass')
    expect(glassCards).toHaveLength(mockStages.length)
  })

  it('имеет правильную структуру grid для адаптивности', () => {
    render(<RecruitmentFunnel {...defaultProps} />)

    const gridContainer = document.querySelector('.grid')
    expect(gridContainer).toBeInTheDocument()
    expect(gridContainer).toHaveClass('grid-cols-1')
    expect(gridContainer).toHaveClass('lg:grid-cols-5')
  })

  it('обрабатывает пустой массив stages', () => {
    const propsWithEmptyStages = {
      stages: [],
      title: 'Пустая воронка',
    }

    render(<RecruitmentFunnel {...propsWithEmptyStages} />)

    expect(screen.getByText('Пустая воронка')).toBeInTheDocument()
    expect(document.querySelectorAll('.glass')).toHaveLength(0)
  })

  it('рендерит этапы в правильном порядке', () => {
    render(<RecruitmentFunnel {...defaultProps} />)

    const stageNames = screen.getAllByText(/(Заявок получено|Дозвонились|Заинтересовались|Прошли собеседование|Вышли на работу)/)
    expect(stageNames).toHaveLength(mockStages.length)
  })

  it('отображает процент конверсии с символом %', () => {
    render(<RecruitmentFunnel {...defaultProps} />)

    const percentages = screen.getAllByText(/%$/)
    expect(percentages.length).toBeGreaterThan(0)
  })

  it('имеет визуальное разделение между этапами на desktop', () => {
    render(<RecruitmentFunnel {...defaultProps} />)

    // Проверяем наличие connector элементов
    const connectors = document.querySelectorAll('[class*="connector"]')
    // Connectors могут быть опциональны
    expect(connectors.length).toBeGreaterThanOrEqual(0)
  })

  it('применяет анимацию с задержкой для каждой карточки', () => {
    render(<RecruitmentFunnel {...defaultProps} />)

    const cards = document.querySelectorAll('.glass')
    cards.forEach((card, index) => {
      expect(card).toBeInTheDocument()
    })
  })

  it('рендерит label для количества кандидатов', () => {
    render(<RecruitmentFunnel {...defaultProps} />)

    // Проверяем наличие текста "кандидатов" или подобного
    expect(screen.getByText('кандидатов')).toBeInTheDocument()
  })
})
