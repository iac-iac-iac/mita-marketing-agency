'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

export interface ServiceOption {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  icon?: string;
}

export interface CalculatorOption {
  id: string;
  label: string;
  priceModifier: number; // множитель цены
}

export interface ServiceCategory {
  id: string;
  name: string;
  options: ServiceOption[];
}

export interface CalculatorState {
  serviceId: string;
  volume: number; // объём (например, количество лидов)
  options: string[]; // выбанные опции
}

/**
 * Данные для калькулятора
 */
export const serviceCategories: ServiceCategory[] = [
  {
    id: 'leadgen',
    name: 'Лидогенерация',
    options: [
      {
        id: 'base',
        name: 'Базовый пакет',
        description: 'Поиск лидов + первичная обработка',
        basePrice: 50000,
        icon: 'L',
      },
      {
        id: 'pro',
        name: 'PRO пакет',
        description: 'Расширенный поиск + CRM интеграция',
        basePrice: 100000,
        icon: 'P',
      },
      {
        id: 'enterprise',
        name: 'Enterprise',
        description: 'Полный цикл + персональный менеджер',
        basePrice: 200000,
        icon: 'E',
      },
    ],
  },
  {
    id: 'callcenter',
    name: 'Call-центр',
    options: [
      {
        id: 'inbound',
        name: 'Входящие звонки',
        description: 'Обработка входящих заявок',
        basePrice: 30000,
        icon: 'In',
      },
      {
        id: 'outbound',
        name: 'Исходящие звонки',
        description: 'Холодные и тёплые звонки',
        basePrice: 40000,
        icon: 'Out',
      },
      {
        id: 'mixed',
        name: 'Смешанный',
        description: 'Входящие + исходящие',
        basePrice: 60000,
        icon: 'Mix',
      },
    ],
  },
  {
    id: 'avito',
    name: 'Авито',
    options: [
      {
        id: 'starter',
        name: 'Стартовый',
        description: '5 объявлений в месяц',
        basePrice: 15000,
        icon: 'S',
      },
      {
        id: 'business',
        name: 'Бизнес',
        description: '20 объявлений + продвижение',
        basePrice: 35000,
        icon: 'B',
      },
      {
        id: 'premium',
        name: 'Премиум',
        description: '50 объявлений + VIP поддержка',
        basePrice: 70000,
        icon: 'P',
      },
    ],
  },
  {
    id: 'recruiting',
    name: 'Рекрутинг',
    options: [
      {
        id: 'mass',
        name: 'Массовый подбор',
        description: 'Линейный персонал (от 10 человек)',
        basePrice: 50000,
        icon: 'M',
      },
      {
        id: 'it',
        name: 'IT рекрутинг',
        description: 'Подбор IT специалистов',
        basePrice: 80000,
        icon: 'IT',
      },
      {
        id: 'top',
        name: 'Top Management',
        description: 'Подбор руководителей',
        basePrice: 150000,
        icon: 'T',
      },
    ],
  },
];

/**
 * Дополнительные опции
 */
export const additionalOptions: CalculatorOption[] = [
  { id: 'crm', label: 'CRM интеграция', priceModifier: 1.2 },
  { id: 'analytics', label: 'Расширенная аналитика', priceModifier: 1.15 },
  { id: 'manager', label: 'Персональный менеджер', priceModifier: 1.3 },
  { id: 'guarantee', label: 'Гарантия результата', priceModifier: 1.25 },
];

/**
 * Форматирование цены
 */
function formatPrice(price: number): string {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(price);
}

/**
 * Калькулятор услуг Direct-line
 */
export default function ServicesCalculator() {
  const [selectedCategory, setSelectedCategory] = useState<string>('leadgen');
  const [selectedService, setSelectedService] = useState<string>('base');
  const [volume, setVolume] = useState<number>(100);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  // Расчёт стоимости
  const calculatedPrice = useMemo(() => {
    const category = serviceCategories.find(c => c.id === selectedCategory);
    if (!category) return 0;

    const service = category.options.find(s => s.id === selectedService);
    if (!service) return 0;

    let price = service.basePrice;

    // Применяем объём (для некоторых услуг)
    if (selectedCategory === 'leadgen' || selectedCategory === 'callcenter') {
      price = price + (volume * 100);
    }

    // Применяем дополнительные опции
    selectedAddons.forEach(addonId => {
      const addon = additionalOptions.find(a => a.id === addonId);
      if (addon) {
        price *= addon.priceModifier;
      }
    });

    return Math.round(price);
  }, [selectedCategory, selectedService, volume, selectedAddons]);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    // Сбрасываем услугу на первую в категории
    const category = serviceCategories.find(c => c.id === categoryId);
    if (category && category.options.length > 0) {
      setSelectedService(category.options[0].id);
    }
  };

  const toggleAddon = (addonId: string) => {
    setSelectedAddons(prev =>
      prev.includes(addonId)
        ? prev.filter(id => id !== addonId)
        : [...prev, addonId]
    );
  };

  const currentCategory = serviceCategories.find(c => c.id === selectedCategory);
  const currentService = currentCategory?.options.find(s => s.id === selectedService);

  return (
    <section className="py-16 bg-gradient-to-br from-direct-dark to-direct-secondary">
      <div className="container mx-auto px-4">
        {/* Заголовок */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Рассчитайте стоимость услуг
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Выберите направление и параметры работы для расчёта ориентировочной стоимости
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Левая колонка: Выбор услуг */}
          <div className="space-y-6">
            {/* Категории */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Направление</h3>
              <div className="grid grid-cols-2 gap-3">
                {serviceCategories.map((category) => (
                  <motion.button
                    key={category.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleCategoryChange(category.id)}
                    className={`
                      p-4 rounded-xl border transition-all text-left
                      ${selectedCategory === category.id
                        ? 'bg-direct-primary/20 border-direct-primary'
                        : 'bg-white/5 border-white/10 hover:border-white/20'
                      }
                    `}
                  >
                    <div className="font-medium">{category.name}</div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Услуги в категории */}
            {currentCategory && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Пакет услуг</h3>
                <div className="space-y-3">
                  {currentCategory.options.map((service) => (
                    <motion.button
                      key={service.id}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => setSelectedService(service.id)}
                      className={`
                        w-full p-4 rounded-xl border transition-all text-left
                        ${selectedService === service.id
                          ? 'bg-direct-primary/20 border-direct-primary'
                          : 'bg-white/5 border-white/10 hover:border-white/20'
                        }
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{service.icon}</span>
                        <div>
                          <div className="font-medium">{service.name}</div>
                          <div className="text-sm text-white/60">{service.description}</div>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Объём (для некоторых категорий) */}
            {(selectedCategory === 'leadgen' || selectedCategory === 'callcenter') && (
              <div>
                <h3 className="text-xl font-semibold mb-4">
                  {selectedCategory === 'leadgen' ? 'Количество лидов в месяц' : 'Количество звонков в день'}
                </h3>
                <input
                  type="range"
                  min="50"
                  max="1000"
                  step="50"
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                />
                <div className="text-center mt-2 text-white/70">
                  {volume} {selectedCategory === 'leadgen' ? 'лидов/мес' : 'звонков/день'}
                </div>
              </div>
            )}

            {/* Дополнительные опции */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Дополнительно</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {additionalOptions.map((addon) => (
                  <motion.label
                    key={addon.id}
                    whileHover={{ scale: 1.02 }}
                    className={`
                      flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all
                      ${selectedAddons.includes(addon.id)
                        ? 'bg-direct-primary/20 border-direct-primary'
                        : 'bg-white/5 border-white/10 hover:border-white/20'
                      }
                    `}
                  >
                    <input
                      type="checkbox"
                      checked={selectedAddons.includes(addon.id)}
                      onChange={() => toggleAddon(addon.id)}
                      className="w-4 h-4 rounded border-white/20 bg-white/10 text-direct-primary focus:ring-direct-primary"
                    />
                    <span className="text-sm">{addon.label}</span>
                  </motion.label>
                ))}
              </div>
            </div>
          </div>

          {/* Правая колонка: Итоговая стоимость */}
          <div className="lg:sticky lg:top-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass p-6 rounded-2xl"
            >
              <h3 className="text-2xl font-bold mb-6">Итоговая стоимость</h3>

              {/* Отображение цены */}
              <div className="mb-6">
                <div className="text-4xl font-bold text-direct-primary mb-2">
                  {formatPrice(calculatedPrice)}
                </div>
                <div className="text-white/60 text-sm">
                  в месяц
                </div>
              </div>

              {/* Детализация */}
              <div className="space-y-3 mb-6 pb-6 border-b border-white/10">
                <div className="flex justify-between text-sm">
                  <span className="text-white/70">Базовая стоимость:</span>
                  <span>{formatPrice(currentService?.basePrice || 0)}</span>
                </div>

                {(selectedCategory === 'leadgen' || selectedCategory === 'callcenter') && (
                  <div className="flex justify-between text-sm">
                    <span className="text-white/70">Объём ({volume}):</span>
                    <span>+{formatPrice(volume * 100)}</span>
                  </div>
                )}

                {selectedAddons.map(addonId => {
                  const addon = additionalOptions.find(a => a.id === addonId);
                  if (!addon) return null;

                  return (
                    <div key={addonId} className="flex justify-between text-sm">
                      <span className="text-white/70">{addon.label}:</span>
                      <span className="text-direct-primary">+{(addon.priceModifier - 1) * 100}%</span>
                    </div>
                  );
                })}
              </div>

              {/* CTA кнопка */}
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="block w-full py-4 bg-gradient-to-r from-direct-primary to-direct-accent hover:from-direct-primary/90 hover:to-direct-accent/90 text-white font-semibold rounded-xl text-center transition-all"
              >
                Заказать услугу
              </motion.a>

              {/* Примечание */}
              <p className="text-xs text-white/50 text-center mt-4">
                * Стоимость является ориентировочной и может меняться в зависимости от деталей проекта
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
