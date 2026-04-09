import Link from 'next/link';
import { revalidatePath } from 'next/cache';
import { getAllTestimonials, deleteTestimonial } from '@/lib/cms/db-testimonials';
import DeleteButton from './DeleteButton';

// ============================================================================
// Server Action — удаление отзыва
// ============================================================================
async function handleDelete(formData: FormData) {
  'use server';
  const id = formData.get('id') as string;
  if (id) {
    deleteTestimonial(parseInt(id));
    revalidatePath('/admin/testimonials');
  }
}

export default function AdminTestimonialsPage() {
  const testimonials = getAllTestimonials();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Управление отзывами</h1>
          <p className="text-gray-400">Создание, редактирование и удаление отзывов клиентов</p>
        </div>
        <Link
          href="/admin/testimonials/new"
          className="px-6 py-3 bg-gradient-to-r from-direct-primary to-direct-accent hover:from-direct-primary/90 hover:to-direct-accent/90 text-white font-semibold rounded-xl shadow-lg transition-all"
        >
          + Новый отзыв
        </Link>
      </div>

      {testimonials.length === 0 ? (
        <div className="glass p-12 rounded-2xl text-center">
          <p className="text-gray-400 mb-4">Пока нет отзывов</p>
          <Link
            href="/admin/testimonials/new"
            className="px-6 py-3 bg-direct-primary hover:bg-direct-primary/90 text-white font-medium rounded-xl transition-colors"
          >
            Создать первый отзыв
          </Link>
        </div>
      ) : (
        <div className="glass rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-white/70">Имя</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-white/70">Должность</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-white/70">Компания</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-white/70">Страница</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-white/70">Сортировка</th>
                <th className="px-6 py-4 text-right text-sm font-medium text-white/70">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {testimonials.map((t) => (
                <tr key={t.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 text-white font-medium">{t.name}</td>
                  <td className="px-6 py-4 text-gray-400">{t.role}</td>
                  <td className="px-6 py-4 text-gray-400">{t.company}</td>
                  <td className="px-6 py-4 text-gray-400">
                    <span className="px-3 py-1 bg-direct-primary/20 text-direct-primary rounded-full text-xs">
                      {t.category || 'Главная'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-400">{t.sort_order}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-4">
                      <Link
                        href={`/admin/testimonials/${t.id}/edit`}
                        className="text-direct-primary hover:text-direct-primary/80 text-sm"
                      >
                        Редактировать
                      </Link>
                      <form action={handleDelete} className="inline">
                        <input type="hidden" name="id" value={t.id} />
                        <DeleteButton label={t.name} />
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
