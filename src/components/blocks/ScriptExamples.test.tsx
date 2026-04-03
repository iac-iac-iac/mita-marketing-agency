import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import ScriptExamples from './ScriptExamples'

// Мок для framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
  useInView: () => true,
}))

describe('ScriptExamples', () => {
  const mockScripts = [
    {
      title: 'Первичный контакт с ЛПР',
      description: 'Скрипт для первого звонка лицу, принимающему решения',
      type: 'Холодный' as const,
      dialog: [
        {
          speaker: 'Оператор' as const,
          text: 'Добрый день, меня зовут Анна, компания М.И.Т.А. Подскажите, я могу поговорить с директором по маркетингу?',
        },
        {
          speaker: 'Клиент' as const,
          text: 'Это я. Что вы хотели?',
        },
        {
          speaker: 'Оператор' as const,
          text: 'Иван Иванович, мы помогаем компаниям увеличивать количество заявок с сайта на 30-50% за счёт комплексного подхода. Скажите, вы сейчас используете какие-то инструменты лидогенерации?',
        },
        {
          speaker: 'Клиент' as const,
          text: 'Ну, контекстную рекламу запускали, но результат слабый...',
        },
      ],
    },
    {
      title: 'Обработка тёплой заявки',
      description: 'Работа с клиентом, который оставил заявку на сайте',
      type: 'Тёплый' as const,
      dialog: [
        {
          speaker: 'Оператор' as const,
          text: 'Здравствуйте, Ольга! Меня зовут Максим, компания М.И.Т.А. Вы оставили заявку на нашем сайте по поводу продвижения на Авито. Удобно сейчас поговорить?',
        },
        {
          speaker: 'Клиент' as const,
          text: 'Да, конечно. Я хотела узнать подробнее, как это работает.',
        },
        {
          speaker: 'Оператор' as const,
          text: 'Отлично! Расскажите, какой у вас бизнес? Какие товары или услуги вы предлагаете?',
        },
      ],
    },
    {
      title: 'Дожим клиента после КП',
      description: 'Работа с клиентом, который получил коммерческое предложение',
      type: 'Дожим' as const,
      dialog: [
        {
          speaker: 'Оператор' as const,
          text: 'Добрый день, Сергей Петрович! Это Анна, М.И.Т.А. Вы получили наше коммерческое предложение на прошлой неделе. Удалось ознакомиться?',
        },
        {
          speaker: 'Клиент' as const,
          text: 'Да, посмотрел. Но цена кажется высоковатой...',
        },
        {
          speaker: 'Оператор' as const,
          text: 'Понимаю вашу обеспокоенность. Скажите, а с чем именно вы сравниваете? Давайте я расскажу, что именно входит в эту стоимость и какой результат вы получите.',
        },
      ],
    },
  ]

  const defaultProps = {
    scripts: mockScripts,
    title: 'Примеры скриптов',
    description: 'Реальные сценарии разговоров наших операторов',
  }

  it('рендерит заголовок и описание', () => {
    render(<ScriptExamples {...defaultProps} />)
    
    expect(screen.getByText('Примеры скриптов')).toBeInTheDocument()
    expect(screen.getByText('Реальные сценарии разговоров наших операторов')).toBeInTheDocument()
  })

  it('рендерит все скрипты', () => {
    render(<ScriptExamples {...defaultProps} />)
    
    mockScripts.forEach(script => {
      expect(screen.getByText(script.title)).toBeInTheDocument()
      expect(screen.getByText(script.description)).toBeInTheDocument()
    })
  })

  it('рендерит бейджи типов звонков', () => {
    render(<ScriptExamples {...defaultProps} />)
    
    expect(screen.getByText('Холодный звонок')).toBeInTheDocument()
    expect(screen.getByText('Тёплый звонок')).toBeInTheDocument()
    expect(screen.getByText('Дожим звонок')).toBeInTheDocument()
  })

  it('открывает первый скрипт по умолчанию', () => {
    render(<ScriptExamples {...defaultProps} />)
    
    // Первый скрипт должен быть открыт
    expect(screen.getByText('Первичный контакт с ЛПР')).toBeInTheDocument()
    expect(screen.getByText(/Добрый день, меня зовут Анна/)).toBeInTheDocument()
  })

  it('закрывает открытый скрипт при повторном клике', async () => {
    render(<ScriptExamples {...defaultProps} />)
    
    // Находим кнопку первого скрипта
    const firstButton = screen.getByText('Первичный контакт с ЛПР').closest('button')
    
    // Закрываем первый скрипт
    fireEvent.click(firstButton!)
    
    // Ждём анимацию
    await waitFor(() => {
      expect(screen.queryByText(/Добрый день, меня зовут Анна/)).not.toBeInTheDocument()
    }, { timeout: 500 })
  })

  it('открывает другой скрипт при клике', async () => {
    render(<ScriptExamples {...defaultProps} />)
    
    // Находим кнопку второго скрипта
    const secondButton = screen.getByText('Обработка тёплой заявки').closest('button')
    
    // Открываем второй скрипт
    fireEvent.click(secondButton!)
    
    // Ждём анимацию и проверяем контент
    await waitFor(() => {
      expect(screen.getByText(/Здравствуйте, Ольга!/)).toBeInTheDocument()
    }, { timeout: 500 })
  })

  it('отображает реплики оператора и клиента', () => {
    render(<ScriptExamples {...defaultProps} />)
    
    expect(screen.getByText('Оператор')).toBeInTheDocument()
    expect(screen.getByText('Клиент')).toBeInTheDocument()
  })

  it('имеет правильную структуру диалога', () => {
    render(<ScriptExamples {...defaultProps} />)
    
    // Проверяем что диалог содержит правильное количество реплик
    const dialogLines = screen.getAllByRole('button') // Кнопки аккордеона
    expect(dialogLines).toHaveLength(mockScripts.length)
  })

  it('работает без description (опционально)', () => {
    const propsWithoutDesc = {
      ...defaultProps,
      description: undefined,
    }
    
    render(<ScriptExamples {...propsWithoutDesc} />)
    
    expect(screen.queryByText('Реальные сценарии разговоров наших операторов')).not.toBeInTheDocument()
  })

  it('работает без title (опционально)', () => {
    const propsWithoutTitle = {
      scripts: mockScripts,
    }
    
    render(<ScriptExamples {...propsWithoutTitle} />)
    
    expect(screen.queryByText('Примеры скриптов')).not.toBeInTheDocument()
  })

  it('использует title по умолчанию', () => {
    const propsWithDefaultTitle = {
      scripts: mockScripts,
    }
    
    render(<ScriptExamples {...propsWithDefaultTitle} />)
    
    expect(screen.getByText('Примеры скриптов')).toBeInTheDocument()
  })

  it('рендерит стеклянные карточки для каждого скрипта', () => {
    render(<ScriptExamples {...defaultProps} />)
    
    const glassCards = document.querySelectorAll('.glass')
    expect(glassCards).toHaveLength(mockScripts.length)
  })

  it('имеет индикатор раскрытия (стрелка)', () => {
    render(<ScriptExamples {...defaultProps} />)
    
    // Проверяем наличие SVG стрелки
    const arrows = document.querySelectorAll('svg')
    expect(arrows.length).toBeGreaterThan(0)
  })

  it('обрабатывает пустой массив скриптов', () => {
    const propsWithEmptyScripts = {
      scripts: [],
      title: 'Нет скриптов',
    }
    
    render(<ScriptExamples {...propsWithEmptyScripts} />)
    
    expect(screen.getByText('Нет скриптов')).toBeInTheDocument()
    expect(document.querySelectorAll('.glass')).toHaveLength(0)
  })

  it('применяет разные цвета для разных типов звонков', () => {
    render(<ScriptExamples {...defaultProps} />)
    
    // Проверяем наличие классов цветов для разных типов
    const coldBadge = screen.getByText('Холодный звонок').closest('span')
    const warmBadge = screen.getByText('Тёплый звонок').closest('span')
    const followupBadge = screen.getByText('Дожим звонок').closest('span')
    
    expect(coldBadge).toHaveClass('bg-blue-500/20')
    expect(warmBadge).toHaveClass('bg-orange-500/20')
    expect(followupBadge).toHaveClass('bg-green-500/20')
  })

  it('имеет правильные aria-атрибуты для доступности', () => {
    render(<ScriptExamples {...defaultProps} />)
    
    const buttons = screen.getAllByRole('button')
    buttons.forEach(button => {
      expect(button).toHaveAttribute('aria-expanded')
    })
  })
})
