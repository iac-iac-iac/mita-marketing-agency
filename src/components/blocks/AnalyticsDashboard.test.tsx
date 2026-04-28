import { render, screen } from '@testing-library/react'
import AnalyticsDashboard from './AnalyticsDashboard'

describe('AnalyticsDashboard Component', () => {
  const mockMetrics = [
    {
      label: 'CTR',
      value: 12.5,
      suffix: '%',
      description: 'Кликабельность объявлений',
      trend: 'up',
    },
    {
      label: 'Конверсия',
      value: 8.3,
      suffix: '%',
      description: 'Конверсия в лиды',
      trend: 'up',
    },
    {
      label: 'CPL',
      value: 1480,
      suffix: '₽',
      description: 'Стоимость лида',
      trend: 'down',
    },
    {
      label: 'ROI',
      value: 340,
      suffix: '%',
      description: 'Возврат инвестиций',
      trend: 'up',
    },
  ]

  it('рендерит заголовок', () => {
    render(
      <AnalyticsDashboard
        title="Аналитика в реальном времени"
        metrics={mockMetrics}
      />
    )

    expect(screen.getByText('Аналитика в реальном времени')).toBeInTheDocument()
  })

  it('рендерит все метрики с правильными названиями', () => {
    render(
      <AnalyticsDashboard
        title="Аналитика"
        metrics={mockMetrics}
      />
    )

    expect(screen.getByText('CTR')).toBeInTheDocument()
    expect(screen.getByText('Конверсия')).toBeInTheDocument()
    expect(screen.getByText('CPL')).toBeInTheDocument()
    expect(screen.getByText('ROI')).toBeInTheDocument()
  })

  it('рендерит описания для каждой метрики', () => {
    render(
      <AnalyticsDashboard
        title="Аналитика"
        metrics={mockMetrics}
      />
    )

    expect(
      screen.getByText('Кликабельность объявлений')
    ).toBeInTheDocument()
    expect(
      screen.getByText('Конверсия в лиды')
    ).toBeInTheDocument()
    expect(
      screen.getByText('Стоимость лида')
    ).toBeInTheDocument()
    expect(
      screen.getByText('Возврат инвестиций')
    ).toBeInTheDocument()
  })

  it('рендерит суффиксы для метрик', () => {
    render(
      <AnalyticsDashboard
        title="Аналитика"
        metrics={mockMetrics}
      />
    )

    expect(screen.getByText('%')).toBeInTheDocument()
    expect(screen.getByText('₽')).toBeInTheDocument()
  })

  it('отображает тренды для метрик', () => {
    render(
      <AnalyticsDashboard
        title="Аналитика"
        metrics={mockMetrics}
      />
    )

    const trendIcons = screen.getAllByTestId('trend-icon')
    expect(trendIcons).toHaveLength(4)
  })

  it('применяет glass стили к карточкам метрик', () => {
    render(
      <AnalyticsDashboard
        title="Аналитика"
        metrics={mockMetrics}
      />
    )

    const metricCards = screen.getAllByRole('article')
    expect(metricCards).toHaveLength(4)
    
    metricCards.forEach(card => {
      expect(card.querySelector('.glass')).toBeInTheDocument()
    })
  })

  it('корректно рендерит пустой массив метрик', () => {
    const { container } = render(
      <AnalyticsDashboard
        title="Аналитика"
        metrics={[]}
      />
    )

    const metricCards = container.querySelectorAll('[role="article"]')
    expect(metricCards).toHaveLength(0)
  })

  it('рендерит dashboard визуализацию', () => {
    render(
      <AnalyticsDashboard
        title="Аналитика"
        metrics={mockMetrics}
      />
    )

    const dashboard = screen.getByTestId('analytics-dashboard')
    expect(dashboard).toBeInTheDocument()
  })
})
