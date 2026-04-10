'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export function InlineCta() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className="relative mt-16 p-8 rounded-2xl overflow-hidden"
    >
      {/* Background with 3D Glass Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 to-purple-600/30 backdrop-blur-xl" />
      <div className="absolute inset-0 bg-white/5" />
      <div className="absolute inset-0 border border-white/20 rounded-2xl" />
      
      {/* Decorative Elements */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl" />
      
      {/* Content */}
      <div className="relative z-10 text-center">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Готовы увеличить продажи?
        </h3>
        <p className="text-gray-200 mb-8 max-w-2xl mx-auto">
          Оставьте заявку и получите бесплатную консультацию по настройке сквозной аналитики 
          и оптимизации маркетинговых кампаний
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            Оставить заявку
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          
          <Link
            href="/cases"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white/10 border border-white/30 text-white font-semibold hover:bg-white/20 transition-all duration-300"
          >
            Смотреть кейсы
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
