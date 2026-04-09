'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createCaseAction, type CaseFormInput } from '../actions';

export default function AdminCasesNewPage() {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState<CaseFormInput>({
    title: '',
    excerpt: '',
    content: '',
    client: '',
    industry: '',
    cover_image: '',
    status: 'draft',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSaving(true);

    try {
      await createCaseAction(formData);
      router.push('/admin/cases');
    } catch (_err) {
      setError('Ошибка сохранения');
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Новый кейс</h1>
        <p className="text-gray-400">Создание нового кейса клиента</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-white/90 mb-2">Заголовок *</label>
          <input id="title" name="title" type="text" value={formData.title} onChange={handleChange} required
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-direct-primary/50" />
        </div>

        <div>
          <label htmlFor="client" className="block text-sm font-medium text-white/90 mb-2">Клиент *</label>
          <input id="client" name="client" type="text" value={formData.client} onChange={handleChange} required
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-direct-primary/50" />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label htmlFor="industry" className="block text-sm font-medium text-white/90 mb-2">Индустрия *</label>
            <input id="industry" name="industry" type="text" value={formData.industry} onChange={handleChange} required
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-direct-primary/50" />
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-white/90 mb-2">Статус</label>
            <select id="status" name="status" value={formData.status} onChange={handleChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-direct-primary/50">
              <option value="draft">Черновик</option>
              <option value="published">Опубликовано</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="excerpt" className="block text-sm font-medium text-white/90 mb-2">Краткое описание *</label>
          <textarea id="excerpt" name="excerpt" rows={3} value={formData.excerpt} onChange={handleChange} required
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-direct-primary/50" />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-white/90 mb-2">Содержимое *</label>
          <textarea id="content" name="content" rows={15} value={formData.content} onChange={handleChange} required
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-mono text-sm focus:ring-2 focus:ring-direct-primary/50" />
        </div>

        <div>
          <label htmlFor="cover_image" className="block text-sm font-medium text-white/90 mb-2">URL обложки</label>
          <input id="cover_image" name="cover_image" type="text" value={formData.cover_image} onChange={handleChange}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-direct-primary/50" />
        </div>

        {error && (
          <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-300 text-sm">{error}</div>
        )}

        <div className="flex gap-4 pt-4">
          <button type="submit" disabled={isSaving}
            className="flex-1 py-4 bg-gradient-to-r from-direct-primary to-direct-accent text-white font-semibold rounded-xl disabled:opacity-50">
            {isSaving ? 'Сохранение...' : 'Создать кейс'}
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
