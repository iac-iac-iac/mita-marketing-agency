import ProcessSteps from './ProcessSteps'

export interface ProcessStep {
  number: number;
  title: string;
  description: string;
  kpi: string;
}

export interface WorkProcessSectionProps {
  title?: string;
  steps: ProcessStep[];
}

/**
 * Секция "Как мы работаем" на главной странице
 * Переиспользуемый компонент для отображения шагов работы
 */
export default function WorkProcessSection({
  title = 'Как мы работаем',
  steps,
}: WorkProcessSectionProps) {
  return (
    <ProcessSteps
      title={title}
      steps={steps}
    />
  )
}

/**
 * Стандартные шаги работы М.И.Т.А.
 */
export const defaultWorkProcess: ProcessStep[] = [
  {
    number: 1,
    title: 'Аудит и стратегия',
    description: 'Проводим глубокий анализ вашей текущей ситуации, определяем точки роста и разрабатываем персонализированную стратегию продвижения.',
    kpi: '1-2 недели',
  },
  {
    number: 2,
    title: 'Настройка и запуск',
    description: 'Настраиваем все необходимые инструменты, создаём маркетинговые кампании, интегрируем CRM и системы аналитики.',
    kpi: '2-3 недели',
  },
  {
    number: 3,
    title: 'Привлечение лидов',
    description: 'Запускаем каналы привлечения, начинаем собирать потенциальных клиентов и передаём их в обработку.',
    kpi: 'Постоянно',
  },
  {
    number: 4,
    title: 'Оптимизация и масштабирование',
    description: 'Анализируем результаты, оптимизируем каналы привлечения и масштабируем успешные решения для максимального роста.',
    kpi: 'Ежемесячно',
  },
];
