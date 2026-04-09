'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createTestimonialAction, type TestimonialFormInput } from '../actions';

export default function AdminTestimonialNewPage() {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState<TestimonialFormInput>({
    name: '',
    role: '',
    company: '',
    quote: '',
    avatar: '',
    category: '',
    sort_order: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev: any) => ({ ...prev, [e.target.name]: e.target.name === 'sort_order' ? parseInt(e.target.value) || 0 : e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSaving(true);
    try {
      await createTestimonialAction(formData);
      router.push('/admin/testimonials');
    } catch (_err) {
      setError('Ошибка сохранения');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Новый отзыв</h1>
        <p className="text-gray-400">Добавление отзыва клиента</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-white/90 mb-2">Имя *</label>
          <input id="name" name="name" type="text" value={formData.name} onChange={handleChange} required
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-direct-primary/50" />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-white/90 mb-2">Должность *</label>
            <input id="role" name="role" type="text" value={formData.role} onChange={handleChange} required
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-direct-primary/50" />
          </div>
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-white/90 mb-2">Компания *</label>
            <input id="company" name="company" type="text" value={formData.company} onChange={handleChange} required
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-direct-primary/50" />
          </div>
        </div>

        <div>
          <label htmlFor="quote" className="block text-sm font-medium text-white/90 mb-2">Отзыв *</label>
          <textarea id="quote" name="quote" rows={5} value={formData.quote} onChange={handleChange} required
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-direct-primary/50" />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label htmlFor="avatar" className="block text-sm font-medium text-white/90 mb-2">URL аватара</label>
            <input id="avatar" name="avatar" type="text" value={formData.avatar} onChange={handleChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-direct-primary/50" />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-white/90 mb-2">Привязка к странице</label>
            <select id="category" name="category" value={formData.category} onChange={handleChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-direct-primary/50">
              <option value="">Главная страница</option>
              <option value="leadgen">Лидогенерация</option>
              <option value="call-center">Call-центр</option>
              <option value="avito">Авито</option>
              <option value="recruiting">Рекрутинг</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="sort_order" className="block text-sm font-medium text-white/90 mb-2">Порядок сортировки</label>
          <input id="sort_order" name="sort_order" type="number" value={formData.sort_order} onChange={handleChange}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-direct-primary/50" />
        </div>

        {error && (
          <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-300 text-sm">{error}</div>
        )}

        <div className="flex gap-4 pt-4">
          <button type="submit" disabled={isSaving}
            className="flex-1 py-4 bg-gradient-to-r from-direct-primary to-direct-accent text-white font-semibold rounded-xl disabled:opacity-50">
            {isSaving ? 'Сохранение...' : 'Создать отзыв'}
          </button>
          <button type="button" onClick={() => router.back()}
            className="px-8 py-4 bg-white/10 text-white font-semibold rounded-xl">
            Отмена
          </button>
        </div>
      </form>
    </div>
  );
}
