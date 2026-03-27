import { render, screen } from '@testing-library/react'
import LeadExamples from './LeadExamples'

describe('LeadExamples Component', () => {
  const mockLeads = [
    {
      id: 1,
      niche: 'Недвижимость',
      source: 'Яндекс.Директ',
      cost: 1200,
      status: 'converted',
    },
    {
      id: 2,
      niche: 'Автобизнес',
      source: 'VK Реклама',
      cost: 850,
      status: 'in_progress',
    },
    {
      id: 3,
      niche: 'Образование',
      source: 'Google Ads',
      cost: 650,
      status: 'converted',
    },
    {
      id: 4,
      niche: 'Строительство',
      source: 'Авито',
      cost: 450,
      status: 'rejected',
    },
    {
      id: 5,
      niche: 'Финансы',
      source: 'Таргет VK',
      cost: 980,
      status: 'in_progress',
    },
  ]

  it('рендерит заголовок и описание', () => {
    render(
      <LeadExamples
        title="Примеры лидов"
        description="Реальные данные из наших кампаний"
        leads={mockLeads}
      />
    )

    expect(screen.getByText('Примеры лидов')).toBeInTheDocument()
    expect(
      screen.getByText('Реальные данные из наших кампаний')
    ).toBeInTheDocument()
  })

  it('рендерит таблицу с заголовками колонок', () => {
    render(
      <LeadExamples
        title="Примеры лидов"
        leads={mockLeads}
      />
    )

    expect(screen.getByText('Ниша')).toBeInTheDocument()
    expect(screen.getByText('Источник')).toBeInTheDocument()
    expect(screen.getByText('Стоимость')).toBeInTheDocument()
    expect(screen.getByText('Статус')).toBeInTheDocument()
  })

  it('рендерит все лиды в таблице', () => {
    render(
      <LeadExamples
        title="Примеры лидов"
        leads={mockLeads}
      />
    )

    expect(screen.getByText('Недвижимость')).toBeInTheDocument()
    expect(screen.getByText('Автобизнес')).toBeInTheDocument()
    expect(screen.getByText('Образование')).toBeInTheDocument()
    expect(screen.getByText('Строительство')).toBeInTheDocument()
    expect(screen.getByText('Финансы')).toBeInTheDocument()
  })

  it('рендерит источники для каждого лида', () => {
    render(
      <LeadExamples
        title="Примеры лидов"
        leads={mockLeads}
      />
    )

    expect(screen.getByText('Яндекс.Директ')).toBeInTheDocument()
    expect(screen.getByText('VK Реклама')).toBeInTheDocument()
    expect(screen.getByText('Google Ads')).toBeInTheDocument()
    expect(screen.getByText('Авито')).toBeInTheDocument()
    expect(screen.getByText('Таргет VK')).toBeInTheDocument()
  })

  it('рендерит стоимость лидов с правильным форматом', () => {
    render(
      <LeadExamples
        title="Примеры лидов"
        leads={mockLeads}
      />
    )

    expect(screen.getByText('1 200 ₽')).toBeInTheDocument()
    expect(screen.getByText('850 ₽')).toBeInTheDocument()
    expect(screen.getByText('650 ₽')).toBeInTheDocument()
    expect(screen.getByText('450 ₽')).toBeInTheDocument()
    expect(screen.getByText('980 ₽')).toBeInTheDocument()
  })

  it('рендерит статусы с правильными текстами', () => {
    render(
      <LeadExamples
        title="Примеры лидов"
        leads={mockLeads}
      />
    )

    expect(screen.getAllByText('Конвертирован')).toHaveLength(2)
    expect(screen.getAllByText('В работе')).toHaveLength(2)
    expect(screen.getByText('Отклонён')).toBeInTheDocument()
  })

  it('применяет цветовую индикацию для статусов', () => {
    render(
      <LeadExamples
        title="Примеры лидов"
        leads={mockLeads}
      />
    )

    const statusBadges = screen.getAllByTestId('status-badge')
    expect(statusBadges).toHaveLength(5)
  })

  it('применяет glass стили к таблице', () => {
    render(
      <LeadExamples
        title="Примеры лидов"
        leads={mockLeads}
      />
    )

    const table = screen.getByTestId('lead-examples-table')
    expect(table).toHaveClass('glass')
  })

  it('корректно рендерит пустой массив лидов', () => {
    const { container } = render(
      <LeadExamples
        title="Примеры лидов"
        leads={[]}
      />
    )

    const rows = container.querySelectorAll('tbody tr')
    expect(rows).toHaveLength(0)
  })

  it('не рендерит описание, если оно не передано', () => {
    render(
      <LeadExamples
        title="Примеры лидов"
        leads={mockLeads}
      />
    )

    expect(
      screen.queryByText('Реальные данные из наших кампаний')
    ).not.toBeInTheDocument()
  })
})
