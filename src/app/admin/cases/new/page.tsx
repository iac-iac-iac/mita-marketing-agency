'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { saveCase, generateSlug } from '@/lib/cms/storage';

export default function AdminCasesNewPage() {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    client: '',
    industry: '',
    coverImage: '',
    stats: [] as { label: string; value: string }[],
    status: 'draft' as 'draft' | 'published',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const newItem = {
        slug: generateSlug(formData.title),
        ...formData,
        publishedAt: new Date().toISOString(),
      };
      saveCase(newItem);
      router.push('/admin/cases');
    } catch (err) {
      console.error(err);
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
        <p className="text-gray-400">Создание нового кейса</p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl space-y-6">
        <div>
          <label className="block text-sm font-medium text-white/90 mb-2">Заголовок *</label>
          <input name="title" type="text" required value={formData.title} onChange={handleChange}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-direct-primary/50" />
        </div>

        <div>
          <label className="block text-sm font-medium text-white/90 mb-2">Клиент *</label>
          <input name="client" type="text" required value={formData.client} onChange={handleChange}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-direct-primary/50" />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-white/90 mb-2">Индустрия *</label>
            <input name="industry" type="text" required value={formData.industry} onChange={handleChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-direct-primary/50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/90 mb-2">Статус</label>
            <select name="status" value={formData.status} onChange={handleChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-direct-primary/50">
              <option value="draft">Черновик</option>
              <option value="published">Опубликовано</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-white/90 mb-2">Краткое описание *</label>
          <textarea name="excerpt" rows={3} required value={formData.excerpt} onChange={handleChange}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-direct-primary/50" />
        </div>

        <div>
          <label className="block text-sm font-medium text-white/90 mb-2">Содержимое *</label>
          <textarea name="content" rows={15} required value={formData.content} onChange={handleChange}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-mono text-sm focus:ring-2 focus:ring-direct-primary/50" />
        </div>

        <div>
          <label className="block text-sm font-medium text-white/90 mb-2">URL обложки</label>
          <input name="coverImage" type="text" value={formData.coverImage} onChange={handleChange}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-direct-primary/50" />
        </div>

        <div className="flex gap-4 pt-4">
          <button type="submit" disabled={isSaving}
            className="flex-1 py-4 bg-gradient-to-r from-direct-primary to-direct-accent text-white font-semibold rounded-xl disabled:opacity-50">
            {isSaving ? 'Сохранение...' : 'Сохранить'}
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
