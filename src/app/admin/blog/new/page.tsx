'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBlogPostAction, type BlogFormInput } from '../actions';

export default function AdminBlogNewPage() {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    author: '',
    category: 'Общее',
    tags: '',
    cover_image: '',
    status: 'draft' as 'draft' | 'published',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSaving(true);

    try {
      await createBlogPostAction(formData as BlogFormInput);
      router.push('/admin/blog');
    } catch (_err) {
      setError('Ошибка сохранения');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Новая статья
        </h1>
        <p className="text-gray-400">
          Создание новой статьи блога
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-white/90 mb-2">
            Заголовок *
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-direct-primary/50 focus:border-transparent transition-all"
            placeholder="Введите заголовок статьи"
          />
        </div>

        {/* Excerpt */}
        <div>
          <label htmlFor="excerpt" className="block text-sm font-medium text-white/90 mb-2">
            Краткое описание *
          </label>
          <textarea
            id="excerpt"
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            required
            rows={3}
            className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-direct-primary/50 focus:border-transparent transition-all"
            placeholder="Краткое содержание статьи"
          />
        </div>

        {/* Content */}
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-white/90 mb-2">
            Содержание * (Markdown)
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            rows={12}
            className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-direct-primary/50 focus:border-transparent transition-all font-mono text-sm"
            placeholder="# Заголовок\n\nТекст статьи..."
          />
        </div>

        {/* Author + Category */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="author" className="block text-sm font-medium text-white/90 mb-2">
              Автор
            </label>
            <input
              id="author"
              name="author"
              type="text"
              value={formData.author}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-direct-primary/50 focus:border-transparent transition-all"
              placeholder="М.И.Т.А."
            />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-white/90 mb-2">
              Категория
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-direct-primary/50 focus:border-transparent transition-all"
            >
              <option value="Общее">Общее</option>
              <option value="Лидогенерация">Лидогенерация</option>
              <option value="Call-центр">Call-центр</option>
              <option value="Авито">Авито</option>
              <option value="Рекрутинг">Рекрутинг</option>
              <option value="Маркетинг">Маркетинг</option>
              <option value="Разработка">Разработка</option>
            </select>
          </div>
        </div>

        {/* Tags */}
        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-white/90 mb-2">
            Теги (через запятую)
          </label>
          <input
            id="tags"
            name="tags"
            type="text"
            value={formData.tags}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-direct-primary/50 focus:border-transparent transition-all"
            placeholder="маркетинг, лиды, реклама"
          />
        </div>

        {/* Cover Image */}
        <div>
          <label htmlFor="cover_image" className="block text-sm font-medium text-white/90 mb-2">
            URL обложки
          </label>
          <input
            id="cover_image"
            name="cover_image"
            type="text"
            value={formData.cover_image}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-direct-primary/50 focus:border-transparent transition-all"
            placeholder="https://..."
          />
        </div>

        {/* Status */}
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-white/90 mb-2">
            Статус
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-direct-primary/50 focus:border-transparent transition-all"
          >
            <option value="draft">Черновик</option>
            <option value="published">Опубликовано</option>
          </select>
        </div>

        {/* Error */}
        {error && (
          <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-300 text-sm">
            {error}
          </div>
        )}

        {/* Submit */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isSaving}
            className="px-8 py-3 bg-gradient-to-r from-direct-primary to-direct-accent hover:from-direct-primary/90 hover:to-direct-accent/90 text-white font-semibold rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isSaving ? 'Сохранение...' : 'Создать статью'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition-colors"
          >
            Отмена
          </button>
        </div>
      </form>
    </div>
  );
}
