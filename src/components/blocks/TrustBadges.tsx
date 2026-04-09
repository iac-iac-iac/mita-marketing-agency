'use client';

import { motion } from 'framer-motion';

interface TrustBadge {
  icon: string;
  label: string;
  value: string;
}

const badges: TrustBadge[] = [
  { icon: '🏢', label: 'Компаний обслужено', value: '200+' },
  { icon: '📈', label: 'Лидов в месяц', value: '5000+' },
  { icon: '⭐', label: 'Средний рейтинг', value: '4.9/5' },
  { icon: '🎯', label: 'Конверсия', value: '12-35%' },
];

export default function TrustBadges() {
  return (
    <section className="py-12 bg-direct-secondary/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {badges.map((badge, index) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="text-center group"
            >
              {/* Иконка */}
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                {badge.icon}
              </div>

              {/* Значение */}
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                {badge.value}
              </div>

              {/* Описание */}
              <div className="text-sm text-gray-300">
                {badge.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
