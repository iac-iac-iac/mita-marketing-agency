'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getCaseForEdit, updateCaseAction, type CaseFormInput } from '../../actions';

export default function AdminCasesEditPage() {
  const params = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<any>({
    title: '',
    excerpt: '',
    content: '',
    client: '',
    industry: '',
    cover_image: '',
    status: 'draft',
  });

  useEffect(() => {
    const decodedSlug = decodeURIComponent(params.slug as string);

    getCaseForEdit(decodedSlug).then((caseItem) => {
      if (caseItem) {
        setFormData(caseItem);
      } else {
        setError('Кейс не найден');
      }
      setIsLoading(false);
    });
  }, [params.slug]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSaving(true);

    try {
      const slug = decodeURIComponent(params.slug as string);
      await updateCaseAction(slug, formData);
      router.push('/admin/cases');
    } catch (_err) {
      setError('Ошибка сохранения');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-direct-dark flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-direct-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">Загрузка...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="glass p-12 rounded-2xl text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <button
            onClick={() => router.push('/admin/cases')}
            className="px-6 py-3 bg-direct-primary text-white rounded-xl"
          >
            Назад к списку
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Редактирование кейса
        </h1>
        <p className="text-gray-400">{formData.title}</p>
      </div>

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
          />
        </div>

        {/* Client + Industry */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="client" className="block text-sm font-medium text-white/90 mb-2">
              Клиент
            </label>
            <input
              id="client"
              name="client"
              type="text"
              value={formData.client}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-direct-primary/50 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label htmlFor="industry" className="block text-sm font-medium text-white/90 mb-2">
              Индустрия
            </label>
            <input
              id="industry"
              name="industry"
              type="text"
              value={formData.industry}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-direct-primary/50 focus:border-transparent transition-all"
            />
          </div>
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
            {isSaving ? 'Сохранение...' : 'Сохранить'}
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
