import ProcessTimelineSection from '@/components/blocks/ProcessTimelineSection'
import type { ProcessStep } from '@/components/blocks/WorkProcessSection'

export interface ServiceProcessProps {
  title: string
  steps: ProcessStep[]
}

/** Та же вёрстка таймлайна, что на главной / в превью (центральная линия, иконки, чередование). */
export default function ServiceProcess({ title, steps }: ServiceProcessProps) {
  return <ProcessTimelineSection title={title} steps={steps} />
}
