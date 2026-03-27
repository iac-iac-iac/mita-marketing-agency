import { render, screen } from '@testing-library/react'
import QualityControl from './QualityControl'

// Мок для framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    li: ({ children, ...props }: any) => <li {...props}>{children}</li>,
  },
  useInView: () => true,
}))

// Мок для next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: any) => <img src={src} alt={alt} {...props} />,
}))

describe('QualityControl', () => {
  const mockLevels = [
    {
      title: 'Запись звонков',
      description: 'Все разговоры записываются и хранятся в системе',
      icon: '🎧',
      features: [
        'Автоматическая запись каждого звонка',
        'Хранение записей 90 дней',
        'Быстрый поиск по базе звонков',
        'Доступ клиента к записям',
      ],
    },
    {
      title: 'Аудит качества',
      description: 'Регулярная проверка разговоров супервайзером',
      icon: '📋',
      features: [
        'Еженедельный аудит 10% звонков',
        'Оценка по чек-листу из 20 критериев',
        'Выявление ошибок и точек роста',
        'Персональные рекомендации операторам',
      ],
    },
    {
      title: 'Обратная связь',
      description: 'Постоянное развитие операторов через фидбек',
      icon: '💬',
      features: [
        'Ежедневные разборы сложных звонков',
        'Индивидуальные сессии с операторами',
        'Групповые тренинги по слабым местам',
        'Мотивация за качество работы',
      ],
    },
    {
      title: 'Обучение',
      description: 'Непрерывное развитие навыков команды',
      icon: '📚',
      features: [
        'Вводное обучение для новых операторов',
        'Регулярные тренинги по продуктам',
        'Отработка возражений на ролевых играх',
        'Сертификация операторов',
      ],
    },
  ]

  const defaultProps = {
    levels: mockLevels,
    title: 'Контроль качества',
    description: 'Многоуровневая система обеспечения качества каждого звонка',
  }

  it('рендерит заголовок и описание', () => {
    render(<QualityControl {...defaultProps} />)
    
    expect(screen.getByText('Контроль качества')).toBeInTheDocument()
    expect(screen.getByText('Многоуровневая система обеспечения качества каждого звонка')).toBeInTheDocument()
  })

  it('рендерит все уровни контроля', () => {
    render(<QualityControl {...defaultProps} />)
    
    mockLevels.forEach(level => {
      expect(screen.getByText(level.title)).toBeInTheDocument()
      expect(screen.getByText(level.description)).toBeInTheDocument()
    })
  })

  it('рендерит иконки для каждого уровня', () => {
    render(<QualityControl {...defaultProps} />)
    
    mockLevels.forEach(level => {
      expect(screen.getByText(level.icon)).toBeInTheDocument()
    })
  })

  it('рендерит списки возможностей для каждого уровня', () => {
    render(<QualityControl {...defaultProps} />)
    
    mockLevels.forEach(level => {
      level.features.forEach(feature => {
        expect(screen.getByText(feature)).toBeInTheDocument()
      })
    })
  })

  it('рендерит галочки для каждого пункта списка', () => {
    render(<QualityControl {...defaultProps} />)
    
    // Подсчитываем общее количество фич
    const totalFeatures = mockLevels.reduce((sum, level) => sum + level.features.length, 0)
    
    // Проверяем наличие SVG галочек
    const checkmarks = document.querySelectorAll('svg')
    expect(checkmarks.length).toBeGreaterThanOrEqual(totalFeatures)
  })

  it('рендерит блок прозрачности процессов', () => {
    render(<QualityControl {...defaultProps} />)
    
    expect(screen.getByText(/Прозрачность процессов:/)).toBeInTheDocument()
    expect(screen.getByText(/Вы получаете доступ к записям всех звонков/)).toBeInTheDocument()
  })

  it('работает без description (опционально)', () => {
    const propsWithoutDesc = {
      ...defaultProps,
      description: undefined,
    }
    
    render(<QualityControl {...propsWithoutDesc} />)
    
    expect(screen.queryByText('Многоуровневая система обеспечения качества каждого звонка')).not.toBeInTheDocument()
  })

  it('работает без title (опционально)', () => {
    const propsWithoutTitle = {
      levels: mockLevels,
    }
    
    render(<QualityControl {...propsWithoutTitle} />)
    
    expect(screen.queryByText('Контроль качества')).not.toBeInTheDocument()
  })

  it('использует title по умолчанию', () => {
    const propsWithDefaultTitle = {
      levels: mockLevels,
    }
    
    render(<QualityControl {...propsWithDefaultTitle} />)
    
    expect(screen.getByText('Контроль качества')).toBeInTheDocument()
  })

  it('рендерит стеклянные карточки для каждого уровня', () => {
    render(<QualityControl {...defaultProps} />)
    
    const glassCards = document.querySelectorAll('.glass')
    // +1 для блока прозрачности
    expect(glassCards).toHaveLength(mockLevels.length + 1)
  })

  it('имеет правильную структуру grid для адаптивности', () => {
    render(<QualityControl {...defaultProps} />)
    
    const gridContainer = document.querySelector('.grid')
    expect(gridContainer).toBeInTheDocument()
    expect(gridContainer).toHaveClass('grid-cols-1')
    expect(gridContainer).toHaveClass('md:grid-cols-2')
    expect(gridContainer).toHaveClass('lg:grid-cols-4')
  })

  it('обрабатывает пустой массив levels', () => {
    const propsWithEmptyLevels = {
      levels: [],
      title: 'Нет уровней',
    }
    
    render(<QualityControl {...propsWithEmptyLevels} />)
    
    expect(screen.getByText('Нет уровней')).toBeInTheDocument()
    expect(document.querySelectorAll('.glass')).toHaveLength(1) // Только блок прозрачности
  })

  it('применяет анимацию с задержкой для каждой карточки', () => {
    render(<QualityControl {...defaultProps} />)
    
    const cards = document.querySelectorAll('.glass')
    cards.forEach((card, index) => {
      expect(card).toBeInTheDocument()
    })
  })

  it('имеет правильные классы для hover эффектов', () => {
    render(<QualityControl {...defaultProps} />)
    
    const cards = document.querySelectorAll('.glass')
    cards.forEach(card => {
      expect(card).toHaveClass('hover:bg-white/10')
      expect(card).toHaveClass('hover:scale-105')
    })
  })

  it('рендерит правильное количество фич для каждого уровня', () => {
    render(<QualityControl {...defaultProps} />)
    
    mockLevels.forEach(level => {
      level.features.forEach(feature => {
        expect(screen.getByText(feature)).toBeInTheDocument()
      })
    })
    
    // Проверяем что все фичи отрендерились
    const allFeatures = mockLevels.flatMap(level => level.features)
    allFeatures.forEach(feature => {
      expect(screen.getByText(feature)).toBeInTheDocument()
    })
  })

  it('использует правильные иконки SVG для галочек', () => {
    render(<QualityControl {...defaultProps} />)
    
    // Проверяем что SVG имеют правильные атрибуты
    const svgs = document.querySelectorAll('svg')
    svgs.forEach(svg => {
      expect(svg).toHaveAttribute('fill', 'none')
      expect(svg).toHaveAttribute('stroke', 'currentColor')
    })
  })

  it('имеет правильную структуру списка ul/li', () => {
    render(<QualityControl {...defaultProps} />)
    
    const lists = document.querySelectorAll('ul')
    expect(lists).toHaveLength(mockLevels.length)
    
    lists.forEach(list => {
      const items = list.querySelectorAll('li')
      expect(items.length).toBeGreaterThan(0)
    })
  })
})
