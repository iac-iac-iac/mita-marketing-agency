'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface ChatWidgetProps {
  botName?: string;
  botAvatar?: string;
  greetingMessage?: string;
  position?: 'bottom-right' | 'bottom-left';
}

/**
 * Онлайн-чат виджет
 * Простой виджет для связи с клиентами
 * 
 * По умолчанию позиционируется слева (bottom-left),
 * так как справа находится кнопка ScrollToTop
 */
export default function ChatWidget({
  botName = 'Ассистент Direct-line',
  botAvatar = 'A',
  greetingMessage = 'Здравствуйте! Чем можем помочь?',
  position = 'bottom-left', // По умолчанию слева, чтобы не конфликтовать с ScrollToTop
}: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: greetingMessage,
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Авто-открытие через 10 секунд
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        setIsOpen(true);
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, [isOpen]);

  // Отправка сообщения
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Имитация ответа бота (в реальности здесь будет API запрос)
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  // Простые ответы бота
  const getBotResponse = (userText: string): string => {
    const text = userText.toLowerCase();

    if (text.includes('цена') || text.includes('стоимость')) {
      return 'Стоимость услуг зависит от выбранного пакета и объёма работ. Вы можете использовать наш калькулятор на главной странице для расчёта ориентировочной стоимости.';
    }

    if (text.includes('услуг') || text.includes('предлож')) {
      return 'Мы предлагаем: лидогенерацию, call-центр, продвижение на Авито и рекрутинг. Какое направление вас интересует?';
    }

    if (text.includes('контакт') || text.includes('связ')) {
      return 'Вы можете оставить заявку в форме обратной связи или позвонить нам. Менеджер свяжется с вами в ближайшее время!';
    }

    if (text.includes('кейс') || text.includes('пример')) {
      return 'У нас есть множество успешных кейсов! Посетите раздел "Кейсы" на сайте, чтобы увидеть результаты нашей работы.';
    }

    if (text.includes('спасибо') || text.includes('благодар')) {
      return 'Всегда рады помочь! Обращайтесь ещё! 😊';
    }

    return 'Спасибо за ваш вопрос! Наш менеджер скоро свяжется с вами для уточнения деталей.';
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const positionClasses = position === 'bottom-right'
    ? 'bottom-4 right-4'
    : 'bottom-4 left-4';

  return (
    <>
      {/* Кнопка открытия/закрытия */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`
          fixed ${positionClasses} z-50
          w-14 h-14 rounded-full
          bg-gradient-to-r from-direct-primary to-direct-accent
          text-white text-2xl
          shadow-lg hover:shadow-xl
          transition-all duration-300
          flex items-center justify-center
        `}
        style={{ marginBottom: isOpen ? '0' : '0' }}
      >
        {isOpen ? '×' : '💭'}
      </motion.button>

      {/* Окно чата */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className={`
              fixed ${positionClasses} z-40
              w-80 md:w-96
              mb-20
              glass rounded-2xl
              overflow-hidden
              shadow-2xl
            `}
          >
            {/* Заголовок */}
            <div className="bg-gradient-to-r from-direct-primary to-direct-accent p-4">
              <div className="flex items-center gap-3">
                <div className="text-2xl">{botAvatar}</div>
                <div>
                  <div className="font-semibold">{botName}</div>
                  <div className="text-xs text-white/80">Онлайн</div>
                </div>
              </div>
            </div>

            {/* Сообщения */}
            <div className="h-80 overflow-y-auto p-4 space-y-3 bg-direct-dark/50">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`
                      max-w-[80%] p-3 rounded-2xl text-sm
                      ${message.sender === 'user'
                        ? 'bg-direct-primary text-white rounded-br-none'
                        : 'bg-white/10 text-white rounded-bl-none'
                      }
                    `}
                  >
                    {message.text}
                  </div>
                </motion.div>
              ))}

              {/* Индикатор набора */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white/10 p-3 rounded-2xl rounded-bl-none">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Ввод сообщения */}
            <div className="p-4 border-t border-white/10 bg-direct-dark/80">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Введите сообщение..."
                  className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-direct-primary/50"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleSendMessage}
                  className="px-4 py-2 bg-direct-primary hover:bg-direct-primary/90 text-white rounded-xl transition-colors"
                >
                  →
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
