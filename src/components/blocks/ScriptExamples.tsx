'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface DialogLine {
  speaker: 'Оператор' | 'Клиент'
  text: string
}

interface Script {
  title: string
  description: string
  type: 'Холодный' | 'Тёплый' | 'Дожим'
  dialog: DialogLine[]
}

interface ScriptExamplesProps {
  scripts: Script[]
  title?: string
  description?: string
}

export default function ScriptExamples({ 
  scripts, 
  title = "Примеры скриптов",
  description = "Реальные сценарии разговоров наших операторов"
}: ScriptExamplesProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleScript = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const getTypeColor = (type: Script['type']) => {
    switch (type) {
      case 'Холодный':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'Тёплый':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30'
      case 'Дожим':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Фоновый градиент */}
      <div className="absolute inset-0 bg-gradient-to-b from-direct-dark via-direct-secondary/30 to-direct-dark opacity-50" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Заголовок */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {title}
          </h2>
          {description && (
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </motion.div>

        {/* Аккордеон со скриптами */}
        <div className="max-w-4xl mx-auto space-y-4">
          {scripts.map((script, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="glass rounded-2xl overflow-hidden"
            >
              {/* Заголовок скрипта (кликабельный) */}
              <button
                onClick={() => toggleScript(index)}
                className="w-full p-6 text-left hover:bg-white/5 transition-colors"
                aria-expanded={openIndex === index}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getTypeColor(script.type)}`}>
                        {script.type} звонок
                      </span>
                      <h3 className="text-xl font-bold text-direct-light">
                        {script.title}
                      </h3>
                    </div>
                    <p className="text-gray-400">
                      {script.description}
                    </p>
                  </div>
                  
                  {/* Индикатор раскрытия */}
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-8 h-8 rounded-full bg-direct-primary/20 flex items-center justify-center flex-shrink-0"
                  >
                    <svg
                      className="w-5 h-5 text-direct-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </motion.div>
                </div>
              </button>

              {/* Раскрывающийся контент с диалогом */}
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 border-t border-white/10">
                      <div className="mt-6 space-y-4">
                        <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                          Пример диалога
                        </h4>
                        
                        {script.dialog.map((line, lineIndex) => (
                          <motion.div
                            key={lineIndex}
                            initial={{ opacity: 0, x: line.speaker === 'Оператор' ? -20 : 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: lineIndex * 0.1 }}
                            className={`flex gap-4 ${
                              line.speaker === 'Оператор' ? 'flex-row' : 'flex-row-reverse'
                            }`}
                          >
                            {/* Аватар */}
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                              line.speaker === 'Оператор' 
                                ? 'bg-direct-primary/30' 
                                : 'bg-direct-accent/30'
                            }`}>
                              <span className="text-lg">
                                {line.speaker === 'Оператор' ? '👤' : '👨‍💼'}
                              </span>
                            </div>
                            
                            {/* Реплика */}
                            <div className={`flex-1 max-w-2xl ${
                              line.speaker === 'Оператор' ? 'text-left' : 'text-right'
                            }`}>
                              <div className={`inline-block p-4 rounded-2xl ${
                                line.speaker === 'Оператор' 
                                  ? 'bg-direct-primary/10 rounded-tl-none' 
                                  : 'bg-direct-accent/10 rounded-tr-none'
                              }`}>
                                <div className="text-xs font-medium text-gray-400 mb-1">
                                  {line.speaker}
                                </div>
                                <p className="text-direct-light">
                                  {line.text}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
