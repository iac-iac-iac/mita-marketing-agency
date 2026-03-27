import { render, screen } from '@testing-library/react'
import CompactPricing, { type CompactPricingProps } from './CompactPricing'

describe('CompactPricing Component', () => {
  const mockProps: CompactPricingProps = {
    title: 'Тарифы на продвижение',
    subtitle: 'Выберите подходящий вариант',
    plans: [
      {
        name: 'Регионы',
        description: 'До 4 регионов (не МСК/СПБ)',
        price: '30 000 ₽/мес',
        regions: 'До 4 регионов',
        features: [
          'Публикация объявлений',
          'Ведение аккаунта',
          'Ответы на сообщения',
          'Ежемесячная отчётность',
        ],
        ctaLabel: 'Заказать',
        ctaUrl: '/contact',
      },
      {
        name: 'Москва и СПБ',
        description: 'МСК, СПБ или 5+ регионов',
        price: '40 000 ₽/мес',
        regions: 'МСК и/или СПБ',
        features: [
          'Публикация объявлений',
          'Ведение аккаунта',
          'Приоритетная поддержка',
        ],
        ctaLabel: 'Заказать',
        ctaUrl: '/contact',
        isHighlighted: true,
      },
    ],
  }

  it('renders title and subtitle correctly', () => {
    render(<CompactPricing {...mockProps} />)
    
    expect(screen.getByText('Тарифы на продвижение')).toBeInTheDocument()
    expect(screen.getByText('Выберите подходящий вариант')).toBeInTheDocument()
  })

  it('renders all pricing plans', () => {
    render(<CompactPricing {...mockProps} />)
    
    expect(screen.getByText('Регионы')).toBeInTheDocument()
    expect(screen.getByText('Москва и СПБ')).toBeInTheDocument()
  })

  it('displays correct prices for each plan', () => {
    render(<CompactPricing {...mockProps} />)
    
    expect(screen.getByText('30 000 ₽/мес')).toBeInTheDocument()
    expect(screen.getByText('40 000 ₽/мес')).toBeInTheDocument()
  })

  it('displays regions information for each plan', () => {
    render(<CompactPricing {...mockProps} />)
    
    expect(screen.getByText('До 4 регионов')).toBeInTheDocument()
    expect(screen.getByText('МСК и/или СПБ')).toBeInTheDocument()
  })

  it('renders all features for each plan', () => {
    render(<CompactPricing {...mockProps} />)
    
    expect(screen.getByText('Публикация объявлений')).toBeInTheDocument()
    expect(screen.getByText('Ведение аккаунта')).toBeInTheDocument()
    expect(screen.getByText('Ответы на сообщения')).toBeInTheDocument()
    expect(screen.getByText('Ежемесячная отчётность')).toBeInTheDocument()
    expect(screen.getByText('Приоритетная поддержка')).toBeInTheDocument()
  })

  it('renders CTA buttons with correct labels and links', () => {
    render(<CompactPricing {...mockProps} />)
    
    const buttons = screen.getAllByRole('link', { name: /Заказать/i })
    expect(buttons).toHaveLength(2)
    
    buttons.forEach(button => {
      expect(button).toHaveAttribute('href', '/contact')
    })
  })

  it('applies highlighted styling to highlighted plan', () => {
    const { container } = render(<CompactPricing {...mockProps} />)
    
    // Находим карточку с выделенным тарифом
    const highlightedCard = container.querySelector('.border-direct-primary\\/50')
    expect(highlightedCard).toBeInTheDocument()
  })

  it('renders without subtitle when subtitle is not provided', () => {
    const propsWithoutSubtitle: CompactPricingProps = {
      ...mockProps,
      subtitle: undefined,
    }
    
    render(<CompactPricing {...propsWithoutSubtitle} />)
    
    expect(screen.getByText('Тарифы на продвижение')).toBeInTheDocument()
    expect(screen.queryByText('Выберите подходящий вариант')).not.toBeInTheDocument()
  })

  it('handles empty features array gracefully', () => {
    const propsWithEmptyFeatures: CompactPricingProps = {
      ...mockProps,
      plans: [
        {
          ...mockProps.plans[0],
          features: [],
        },
      ],
    }
    
    render(<CompactPricing {...propsWithEmptyFeatures} />)
    
    // Компонент должен рендериться без ошибок
    expect(screen.getByText('Регионы')).toBeInTheDocument()
  })

  it('applies glass effect class to pricing cards', () => {
    const { container } = render(<CompactPricing {...mockProps} />)
    
    const glassCards = container.querySelectorAll('.glass')
    expect(glassCards).toHaveLength(2)
  })
})
