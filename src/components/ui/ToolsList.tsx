'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

interface ToolsListProps {
  tools: Array<{
    name: string;
    icon?: string;
  }> | string[];
  title?: string;
  className?: string;
}

export function ToolsList({ tools, title = 'Инструменты', className }: ToolsListProps) {
  if (!tools || tools.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn('p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/20', className)}
    >
      {/* Title */}
      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
        <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        {title}
      </h3>

      {/* Tools Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {tools.map((tool, index) => {
          const toolName = typeof tool === 'string' ? tool : tool.name;
          const toolIcon = typeof tool === 'object' && tool.icon ? tool.icon : null;
          
          return (
            <motion.div
              key={toolName}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="group flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
              {/* Tool Icon */}
              {toolIcon ? (
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-400/30 flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform">
                  <Image
                    src={toolIcon}
                    alt={`${toolName} icon`}
                    width={32}
                    height={32}
                    className="w-8 h-8 object-contain"
                  />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-400/30 flex items-center justify-center text-white font-bold text-sm group-hover:scale-110 transition-transform">
                  {toolName.charAt(0).toUpperCase()}
                </div>
              )}

              {/* Tool Name */}
              <span className="text-gray-300 text-sm font-medium group-hover:text-white transition-colors">
                {toolName}
              </span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
