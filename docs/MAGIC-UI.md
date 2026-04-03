# Magic UI — Библиотека UI компонентов

## 📦 Что такое Magic UI?

Magic UI — это коллекция из 209+ готовых UI-компонентов с анимациями для создания современных лендингов и веб-приложений на React/Next.js с Tailwind CSS.

## 🎨 Категории компонентов

### Текстовые эффекты
- **Animated Gradient Text** — анимированный градиентный текст
- **Aurora Text** — эффект северного сияния на тексте
- **Animated Shiny Text** — блестящий текст с эффектом блика
- **Morphing Text** — плавный морфинг между словами

### Анимации и связи
- **Animated Beam** — лучи между элементами (для интеграций)
- **Animated Circular Progress Bar** — анимированный круговой прогресс
- **Animated List** — последовательная анимация списка

### Фоны
- **Animated Grid Pattern** — анимированная сетка
- **Aurora Background** — фон с эффектом авроры

### UI элементы
- **Theme Toggler** — переключатель темы с анимацией
- **Android/iOS Mockups** — мокапы устройств

## 💡 Рекомендации для М.И.Т.А.

### Для лендинга агентства:
1. **Animated Gradient Text** — для заголовков Hero секции
2. **Morphing Text** — для смены услуг (Разработка → Дизайн → Маркетинг)
3. **Animated Beam** — для демонстрации интеграций и технологического стека
4. **Animated List** — для анимированного списка кейсов/отзывов

### Для страницы услуг:
1. **Animated Circular Progress Bar** — для визуализации навыков/технологий
2. **Animated Gradient Text** — для акцентов на CTA

### Для страницы "О нас":
1. **Animated Beam** — для связи команды/отделов
2. **Animated List** — для таймлайна компании

## 🚀 Как установить компонент

### Шаг 1: Установка зависимостей
```bash
npm install framer-motion clsx tailwind-merge
```

### Шаг 2: Создание утилиты cn
Создай файл `src/lib/utils/cn.ts`:
```typescript
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### Шаг 3: Установка компонента
```bash
npx shadcn@latest add "https://magicui.design/r/<component-name>.json"
```

### Шаг 4: Использование
```tsx
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text"

<AnimatedGradientText className="text-4xl font-bold">
  Ваш текст
</AnimatedGradientText>
```

## 📋 Список популярных компонентов

| Компонент | Команда установки | Для чего |
|-----------|------------------|----------|
| Animated Gradient Text | `npx shadcn@latest add "https://magicui.design/r/animated-gradient-text.json"` | Заголовки, CTA |
| Morphing Text | `npx shadcn@latest add "https://magicui.design/r/morphing-text.json"` | Динамические заголовки |
| Animated Beam | `npx shadcn@latest add "https://magicui.design/r/animated-beam.json"` | Интеграции, связи |
| Animated List | `npx shadcn@latest add "https://magicui.design/r/animated-list.json"` | Списки, уведомления |
| Aurora Text | `npx shadcn@latest add "https://magicui.design/r/aurora-text.json"` | Эффектные заголовки |

## 🔗 Ссылки

- [Magic UI Registry](https://magicui.design/)
- [Документация](https://magicui.design/docs)
