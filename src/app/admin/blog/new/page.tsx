'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

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
    coverImage: '',
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
      // Логируем formData для отладки
      console.log('Form data:', formData);
      
      // Пока просто сохраняем в localStorage для демонстрации
      const posts = JSON.parse(localStorage.getItem('blogPosts') || '[]');

      const newPost = {
        ...formData,
        slug: formData.title
          .toLowerCase()
          .replace(/[^a-z0-9а-яё\s-]/gi, '') // Удаляем спецсимволы
          .replace(/\s+/g, '-') // Пробелы на дефисы
          .replace(/ё/g, 'е') // Ё на Е
          .replace(/[^a-z0-9а-яё-]/g, '') // Оставляем только буквы и дефисы
          .replace(/-+/g, '-') // Удаляем повторяющиеся дефисы
          .replace(/^-|-$/g, ''), // Удаляем дефисы по краям
        publishedAt: new Date().toISOString(),
        status: 'published',
      };

      console.log('New post:', newPost);

      posts.push(newPost);
      localStorage.setItem('blogPosts', JSON.stringify(posts));
      
      console.log('Saved to localStorage');

      // Перенаправляем в список
      router.push('/admin/blog');
    } catch (err) {
      setError('Ошибка сохранения');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Заголовок */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Новая статья
        </h1>
        <p className="text-gray-400">
          Создайте новую запись в блоге
        </p>
      </div>

      {/* Форма */}
      <form onSubmit={handleSubmit} className="max-w-4xl space-y-6">
        {/* Заголовок */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-white/90 mb-2">
            Заголовок *
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-direct-primary/50 focus:border-transparent transition-all"
            placeholder="Введите заголовок статьи"
          />
        </div>

        {/* Краткое описание */}
        <div>
          <label htmlFor="excerpt" className="block text-sm font-medium text-white/90 mb-2">
            Краткое описание *
          </label>
          <textarea
            id="excerpt"
            name="excerpt"
            required
            rows={3}
            value={formData.excerpt}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-direct-primary/50 focus:border-transparent transition-all resize-none"
            placeholder="Краткое описание статьи (2-3 предложения)"
          />
        </div>

        {/* Контент */}
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-white/90 mb-2">
            Содержимое *
          </label>
          <textarea
            id="content"
            name="content"
            required
            rows={15}
            value={formData.content}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-direct-primary/50 focus:border-transparent transition-all resize-none font-mono text-sm"
            placeholder="Текст статьи в формате Markdown..."
          />
          <p className="mt-2 text-xs text-gray-400">
            💡 Поддерживается Markdown: # Заголовок, **жирный**, *курсив*, - списки
          </p>
        </div>

        {/* Автор и категория */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="author" className="block text-sm font-medium text-white/90 mb-2">
              Автор *
            </label>
            <input
              id="author"
              name="author"
              type="text"
              required
              value={formData.author}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-direct-primary/50 focus:border-transparent transition-all"
              placeholder="Имя автора"
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-white/90 mb-2">
              Категория *
            </label>
            <select
              id="category"
              name="category"
              required
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
              <option value="Кейсы">Кейсы</option>
            </select>
          </div>
        </div>

        {/* Теги */}
        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-white/90 mb-2">
            Теги
          </label>
          <input
            id="tags"
            name="tags"
            type="text"
            value={formData.tags}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-direct-primary/50 focus:border-transparent transition-all"
            placeholder="тег1, тег2, тег3"
          />
          <p className="mt-2 text-xs text-gray-400">
            Разделяйте теги запятыми
          </p>
        </div>

        {/* Обложка */}
        <div>
          <label htmlFor="coverImage" className="block text-sm font-medium text-white/90 mb-2">
            URL обложки
          </label>
          <input
            id="coverImage"
            name="coverImage"
            type="text"
            value={formData.coverImage}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-direct-primary/50 focus:border-transparent transition-all"
            placeholder="/images/blog/cover.jpg"
          />
        </div>

        {/* Сообщение об ошибке */}
        {error && (
          <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-300">
            {error}
          </div>
        )}

        {/* Кнопки */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={isSaving}
            className="flex-1 py-4 bg-gradient-to-r from-direct-primary to-direct-accent hover:from-direct-primary/90 hover:to-direct-accent/90 text-white font-semibold rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isSaving ? 'Сохранение...' : 'Сохранить'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all"
          >
            Отмена
          </button>
        </div>
      </form>
    </div>
  );
}
