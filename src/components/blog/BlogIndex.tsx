'use client';

import { motion } from 'framer-motion';
import { BlogCard } from './BlogCard';
import type { ContentMeta } from '@/types/content';

interface BlogIndexProps {
  posts: ContentMeta[];
  title?: string;
  showAll?: boolean;
}

export function BlogIndex({ posts, title = 'Блог', showAll = false }: BlogIndexProps) {
  if (!posts || posts.length === 0) {
    return (
      <div className="text-center text-gray-400 py-12">
        Пока нет публикаций
      </div>
    );
  }

  const displayPosts = showAll ? posts : posts.slice(0, 3);

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {title && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {title}
            </h2>
          </motion.div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayPosts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <BlogCard 
                slug={post.slug}
                title={post.title}
                excerpt={post.excerpt}
                publishedAt={post.publishedAt}
                coverImage={post.coverImage}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
