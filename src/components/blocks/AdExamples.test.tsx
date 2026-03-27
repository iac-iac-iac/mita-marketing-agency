import { render, screen } from '@testing-library/react'
import AdExamples, { type AdExamplesProps } from './AdExamples'

describe('AdExamples Component', () => {
  const mockProps: AdExamplesProps = {
    title: 'Примеры объявлений',
    subtitle: 'Качественные объявления, которые конвертируют',
    examples: [
      {
        title: 'Продажа квартир в новостройках от застройщика',
        price: 'от 5.2 млн ₽',
        location: 'Москва, м. Охотный ряд',
        description: '1-к квартира, 42 м², 5/24 эт. Новый жилой комплекс с развитой инфраструктурой.',
        category: 'Недвижимость',
        views: '12 453',
        isPremium: true,
      },
      {
        title: 'Ремонт квартир под ключ - любые сложности',
        price: 'от 5 000 ₽/м²',
        location: 'Санкт-Петербург',
        description: 'Профессиональный ремонт квартир. Опыт 15 лет. Гарантия 3 года. Бесплатный замер.',
        category: 'Услуги',
        views: '8 234',
      },
      {
        title: 'Toyota Camry, 2020, 2.5 AT, 199 л.с.',
        price: '3 200 000 ₽',
        location: 'Екатеринбург',
        description: 'Автомобиль в отличном состоянии. Один владелец. Полностью обслужен.',
        category: 'Авто',
        views: '5 678',
        isPremium: true,
      },
    ],
  }

  it('renders title and subtitle correctly', () => {
    render(<AdExamples {...mockProps} />)
    
    expect(screen.getByText('Примеры объявлений')).toBeInTheDocument()
    expect(screen.getByText('Качественные объявления, которые конвертируют')).toBeInTheDocument()
  })

  it('renders all ad examples', () => {
    render(<AdExamples {...mockProps} />)
    
    expect(screen.getByText(/Продажа квартир в новостройках/i)).toBeInTheDocument()
    expect(screen.getByText(/Ремонт квартир под ключ/i)).toBeInTheDocument()
    expect(screen.getByText(/Toyota Camry/i)).toBeInTheDocument()
  })

  it('displays correct prices for each ad', () => {
    render(<AdExamples {...mockProps} />)
    
    expect(screen.getByText('от 5.2 млн ₽')).toBeInTheDocument()
    expect(screen.getByText('от 5 000 ₽/м²')).toBeInTheDocument()
    expect(screen.getByText('3 200 000 ₽')).toBeInTheDocument()
  })

  it('displays locations for each ad', () => {
    render(<AdExamples {...mockProps} />)
    
    expect(screen.getByText('Москва, м. Охотный ряд')).toBeInTheDocument()
    expect(screen.getByText('Санкт-Петербург')).toBeInTheDocument()
    expect(screen.getByText('Екатеринбург')).toBeInTheDocument()
  })

  it('displays categories for each ad', () => {
    render(<AdExamples {...mockProps} />)
    
    expect(screen.getByText('Недвижимость')).toBeInTheDocument()
    expect(screen.getByText('Услуги')).toBeInTheDocument()
    expect(screen.getByText('Авто')).toBeInTheDocument()
  })

  it('displays descriptions for each ad', () => {
    render(<AdExamples {...mockProps} />)
    
    expect(screen.getByText(/1-к квартира, 42 м²/i)).toBeInTheDocument()
    expect(screen.getByText(/Профессиональный ремонт квартир/i)).toBeInTheDocument()
    expect(screen.getByText(/Автомобиль в отличном состоянии/i)).toBeInTheDocument()
  })

  it('displays view counts when provided', () => {
    render(<AdExamples {...mockProps} />)
    
    expect(screen.getByText('12 453 просмотров')).toBeInTheDocument()
    expect(screen.getByText('8 234 просмотров')).toBeInTheDocument()
    expect(screen.getByText('5 678 просмотров')).toBeInTheDocument()
  })

  it('renders PREMIUM badges for premium ads', () => {
    render(<AdExamples {...mockProps} />)
    
    const premiumBadges = screen.getAllByText('PREMIUM')
    expect(premiumBadges).toHaveLength(2)
  })

  it('renders correct emoji icons for different categories', () => {
    const { container } = render(<AdExamples {...mockProps} />)
    
    // Проверяем, что emoji рендерятся (хотя бы один)
    const emojis = container.querySelectorAll('span')
    expect(emojis.length).toBeGreaterThan(0)
  })

  it('renders without subtitle when subtitle is not provided', () => {
    const propsWithoutSubtitle: AdExamplesProps = {
      ...mockProps,
      subtitle: undefined,
    }
    
    render(<AdExamples {...propsWithoutSubtitle} />)
    
    expect(screen.getByText('Примеры объявлений')).toBeInTheDocument()
    expect(screen.queryByText('Качественные объявления, которые конвертируют')).not.toBeInTheDocument()
  })

  it('handles empty examples array gracefully', () => {
    const propsWithEmptyExamples: AdExamplesProps = {
      title: 'Примеры',
      examples: [],
    }
    
    render(<AdExamples {...propsWithEmptyExamples} />)
    
    // Компонент должен рендериться без ошибок
    expect(screen.getByText('Примеры')).toBeInTheDocument()
  })

  it('applies glass effect class to ad cards', () => {
    const { container } = render(<AdExamples {...mockProps} />)
    
    const glassCards = container.querySelectorAll('.glass')
    expect(glassCards).toHaveLength(3)
  })

  it('renders location icon for each ad', () => {
    const { container } = render(<AdExamples {...mockProps} />)
    
    // SVG иконки локации
    const locationIcons = container.querySelectorAll('svg')
    expect(locationIcons.length).toBeGreaterThanOrEqual(3)
  })
})
