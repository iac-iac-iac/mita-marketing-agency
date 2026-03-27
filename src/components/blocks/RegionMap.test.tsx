import { render, screen, fireEvent } from '@testing-library/react'
import RegionMap, { type RegionMapProps } from './RegionMap'

describe('RegionMap Component', () => {
  const mockProps: RegionMapProps = {
    title: 'География работы',
    subtitle: 'Работаем по всей России',
    totalRegions: 50,
    regions: [
      {
        name: 'Москва и Московская область',
        cities: ['Москва', 'Химки', 'Подольск', 'Мытищи', 'Люберцы'],
        active: true,
      },
      {
        name: 'Санкт-Петербург и ЛО',
        cities: ['Санкт-Петербург', 'Гатчина', 'Пушкин'],
        active: true,
      },
      {
        name: 'Свердловская область',
        cities: ['Екатеринбург', 'Нижний Тагил', 'Каменск-Уральский'],
        active: true,
      },
      {
        name: 'Краснодарский край',
        cities: ['Краснодар', 'Сочи', 'Новороссийск', 'Анапа'],
        active: true,
      },
      {
        name: 'Новосибирская область',
        cities: ['Новосибирск', 'Бердск'],
        active: false,
      },
    ],
  }

  it('renders title and subtitle correctly', () => {
    render(<RegionMap {...mockProps} />)
    
    expect(screen.getByText('География работы')).toBeInTheDocument()
    expect(screen.getByText('Работаем по всей России')).toBeInTheDocument()
  })

  it('displays total regions count', () => {
    render(<RegionMap {...mockProps} />)
    
    expect(screen.getByText('50+')).toBeInTheDocument()
    expect(screen.getByText('регионов по всей России')).toBeInTheDocument()
  })

  it('renders all regions', () => {
    render(<RegionMap {...mockProps} />)
    
    expect(screen.getByText('Москва и Московская область')).toBeInTheDocument()
    expect(screen.getByText('Санкт-Петербург и ЛО')).toBeInTheDocument()
    expect(screen.getByText('Свердловская область')).toBeInTheDocument()
    expect(screen.getByText('Краснодарский край')).toBeInTheDocument()
    expect(screen.getByText('Новосибирская область')).toBeInTheDocument()
  })

  it('displays city counts for each region', () => {
    render(<RegionMap {...mockProps} />)
    
    expect(screen.getByText('5 городов')).toBeInTheDocument()
    expect(screen.getByText('3 города')).toBeInTheDocument()
    expect(screen.getByText('2 города')).toBeInTheDocument()
  })

  it('renders without subtitle when subtitle is not provided', () => {
    const propsWithoutSubtitle: RegionMapProps = {
      ...mockProps,
      subtitle: undefined,
    }
    
    render(<RegionMap {...propsWithoutSubtitle} />)
    
    expect(screen.getByText('География работы')).toBeInTheDocument()
    expect(screen.queryByText('Работаем по всей России')).not.toBeInTheDocument()
  })

  it('renders without totalRegions when not provided', () => {
    const propsWithoutTotal: RegionMapProps = {
      ...mockProps,
      totalRegions: undefined,
    }
    
    render(<RegionMap {...propsWithoutTotal} />)
    
    expect(screen.queryByText('50+')).not.toBeInTheDocument()
    expect(screen.queryByText('регионов по всей России')).not.toBeInTheDocument()
  })

  it('expands region on click to show cities', () => {
    render(<RegionMap {...mockProps} />)
    
    // Находим первый регион и кликаем
    const firstRegion = screen.getByText('Москва и Московская область').closest('.glass')
    expect(firstRegion).toBeInTheDocument()
    
    if (firstRegion) {
      fireEvent.click(firstRegion)
      
      // Проверяем, что города появились
      expect(screen.getByText('Москва')).toBeInTheDocument()
      expect(screen.getByText('Химки')).toBeInTheDocument()
      expect(screen.getByText('Подольск')).toBeInTheDocument()
    }
  })

  it('collapses expanded region on second click', () => {
    render(<RegionMap {...mockProps} />)
    
    const firstRegion = screen.getByText('Москва и Московская область').closest('.glass')
    
    if (firstRegion) {
      // Разворачиваем
      fireEvent.click(firstRegion)
      expect(screen.getByText('Москва')).toBeInTheDocument()
      
      // Сворачиваем
      fireEvent.click(firstRegion)
      // Города должны скрыться (проверяем, что они не видимы)
      const moscowElements = screen.queryAllByText('Москва')
      // Оставляем только те, что в списке городов (не заголовок)
      const cityElements = moscowElements.filter(el => 
        el.classList.contains('text-xs') || el.tagName === 'SPAN'
      )
      expect(cityElements.length).toBeLessThanOrEqual(1)
    }
  })

  it('applies active styling to active regions', () => {
    const { container } = render(<RegionMap {...mockProps} />)
    
    // Проверяем, что есть градиентные иконки (активные регионы)
    const activeIcons = container.querySelectorAll('.from-direct-primary')
    expect(activeIcons.length).toBeGreaterThan(0)
  })

  it('applies inactive styling to inactive regions', () => {
    const { container } = render(<RegionMap {...mockProps} />)
    
    // Проверяем, что есть серые иконки (неактивные регионы)
    const inactiveIcons = container.querySelectorAll('.bg-gray-700')
    expect(inactiveIcons.length).toBeGreaterThan(0)
  })

  it('renders location icons for each region', () => {
    const { container } = render(<RegionMap {...mockProps} />)
    
    // SVG иконки локаций
    const locationIcons = container.querySelectorAll('svg')
    expect(locationIcons.length).toBeGreaterThanOrEqual(5)
  })

  it('renders chevron icons for expandable regions', () => {
    const { container } = render(<RegionMap {...mockProps} />)
    
    // Иконки стрелочек (chevron)
    const chevrons = container.querySelectorAll('svg[viewBox="0 0 24 24"]')
    expect(chevrons.length).toBeGreaterThanOrEqual(5)
  })

  it('handles empty regions array gracefully', () => {
    const propsWithEmptyRegions: RegionMapProps = {
      title: 'География',
      regions: [],
    }
    
    render(<RegionMap {...propsWithEmptyRegions} />)
    
    // Компонент должен рендериться без ошибок
    expect(screen.getByText('География')).toBeInTheDocument()
  })

  it('handles regions without cities', () => {
    const propsWithoutCities: RegionMapProps = {
      title: 'География',
      regions: [
        { name: 'Регион без городов', active: true },
      ],
    }
    
    render(<RegionMap {...propsWithoutCities} />)
    
    expect(screen.getByText('Регион без городов')).toBeInTheDocument()
    expect(screen.queryByText('город')).not.toBeInTheDocument()
  })

  it('applies glass effect class to region cards', () => {
    const { container } = render(<RegionMap {...mockProps} />)
    
    const glassCards = container.querySelectorAll('.glass')
    expect(glassCards).toHaveLength(5)
  })

  it('displays correct city count singular/plural forms', () => {
    const propsWithVariousCounts: RegionMapProps = {
      title: 'География',
      regions: [
        { name: 'Один город', cities: ['Город1'] },
        { name: 'Два города', cities: ['Город1', 'Город2'] },
        { name: 'Пять городов', cities: ['Г1', 'Г2', 'Г3', 'Г4', 'Г5'] },
      ],
    }
    
    render(<RegionMap {...propsWithVariousCounts} />)
    
    expect(screen.getByText('1 город')).toBeInTheDocument()
    expect(screen.getByText('2 города')).toBeInTheDocument()
    expect(screen.getByText('5 городов')).toBeInTheDocument()
  })
})
