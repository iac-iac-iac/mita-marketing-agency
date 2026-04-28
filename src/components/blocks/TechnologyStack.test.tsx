import { render, screen } from '@testing-library/react'
import TechnologyStack from './TechnologyStack'

describe('TechnologyStack Component', () => {
  const mockIcon = (
    <svg data-testid="mock-icon" className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857" />
    </svg>
  )

  const mockTechnologies = [
    {
      name: 'CRM Интеграция',
      description: 'Автоматическая синхронизация с вашей CRM',
      icon: mockIcon,
    },
    {
      name: 'Сценарии касаний',
      description: 'Цепочки касаний в мессенджерах и по email',
      icon: mockIcon,
    },
    {
      name: 'Веб-аналитика',
      description: 'Глубокая аналитика поведения пользователей',
      icon: mockIcon,
    },
  ]

  it('рендерит заголовок и описание', () => {
    render(
      <TechnologyStack
        title="Технологии"
        description="Современный стек для максимальной эффективности"
        technologies={mockTechnologies}
      />
    )

    expect(screen.getByText('Технологии')).toBeInTheDocument()
    expect(
      screen.getByText('Современный стек для максимальной эффективности')
    ).toBeInTheDocument()
  })

  it('рендерит все технологии с правильными названиями', () => {
    render(
      <TechnologyStack
        title="Технологии"
        technologies={mockTechnologies}
      />
    )

    expect(screen.getByText('CRM Интеграция')).toBeInTheDocument()
    expect(screen.getByText('Сценарии касаний')).toBeInTheDocument()
    expect(screen.getByText('Веб-аналитика')).toBeInTheDocument()
  })

  it('рендерит описания для каждой технологии', () => {
    render(
      <TechnologyStack
        title="Технологии"
        technologies={mockTechnologies}
      />
    )

    expect(
      screen.getByText('Автоматическая синхронизация с вашей CRM')
    ).toBeInTheDocument()
    expect(
      screen.getByText('Цепочки касаний в мессенджерах и по email')
    ).toBeInTheDocument()
    expect(
      screen.getByText('Глубокая аналитика поведения пользователей')
    ).toBeInTheDocument()
  })

  it('рендерит иконки для технологий', () => {
    render(
      <TechnologyStack
        title="Технологии"
        technologies={mockTechnologies}
      />
    )

    const icons = screen.getAllByTestId('mock-icon')
    expect(icons).toHaveLength(3)
  })

  it('применяет glass стили к карточкам технологий', () => {
    render(
      <TechnologyStack
        title="Технологии"
        technologies={mockTechnologies}
      />
    )

    const techCards = screen.getAllByRole('article')
    expect(techCards).toHaveLength(3)
    
    techCards.forEach(card => {
      expect(card.querySelector('.glass')).toBeInTheDocument()
    })
  })

  it('корректно рендерит пустой массив технологий', () => {
    const { container } = render(
      <TechnologyStack
        title="Технологии"
        technologies={[]}
      />
    )

    const techCards = container.querySelectorAll('[role="article"]')
    expect(techCards).toHaveLength(0)
  })

  it('не рендерит описание, если оно не передано', () => {
    render(
      <TechnologyStack
        title="Технологии"
        technologies={mockTechnologies}
      />
    )

    expect(
      screen.queryByText('Современный стек для максимальной эффективности')
    ).not.toBeInTheDocument()
  })
})
