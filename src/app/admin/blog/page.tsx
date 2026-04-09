import Link from 'next/link';
import { revalidatePath } from 'next/cache';
import { getAllPosts, deletePost } from '@/lib/cms/db-blog';
import DeleteButton from './DeleteButton';

// ============================================================================
// Server Action — удаление статьи
// ============================================================================
async function handleDelete(formData: FormData) {
  'use server';
  const slug = formData.get('slug') as string;
  if (slug) {
    deletePost(slug);
    revalidatePath('/admin/blog');
  }
}

export default function AdminBlogPage() {
  const posts = getAllPosts();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Управление блогом
          </h1>
          <p className="text-gray-400">
            Создание, редактирование и удаление статей
          </p>
        </div>
        <Link
          href="/admin/blog/new"
          className="px-6 py-3 bg-gradient-to-r from-direct-primary to-direct-accent hover:from-direct-primary/90 hover:to-direct-accent/90 text-white font-semibold rounded-xl shadow-lg transition-all"
        >
          + Новая статья
        </Link>
      </div>

      {/* Table */}
      {posts.length === 0 ? (
        <div className="glass p-12 rounded-2xl text-center">
          <p className="text-gray-400 mb-4">Пока нет статей</p>
          <Link
            href="/admin/blog/new"
            className="px-6 py-3 bg-direct-primary hover:bg-direct-primary/90 text-white font-medium rounded-xl transition-colors"
          >
            Создать первую статью
          </Link>
        </div>
      ) : (
        <div className="glass rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-white/70">Заголовок</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-white/70">Категория</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-white/70">Автор</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-white/70">Дата</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-white/70">Статус</th>
                <th className="px-6 py-4 text-right text-sm font-medium text-white/70">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {posts.map((post) => (
                <tr key={post.slug} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 text-white font-medium">{post.title}</td>
                  <td className="px-6 py-4 text-gray-400">
                    <span className="px-3 py-1 bg-direct-primary/20 text-direct-primary rounded-full text-xs">
                      {post.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-400">{post.author}</td>
                  <td className="px-6 py-4 text-gray-400">
                    {new Date(post.published_at).toLocaleDateString('ru-RU')}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      post.status === 'published'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {post.status === 'published' ? 'Опубликовано' : 'Черновик'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-blue-400 hover:text-blue-300 text-sm"
                      >
                        Просмотр
                      </Link>
                      <Link
                        href={`/admin/blog/${post.slug}/edit`}
                        className="text-direct-primary hover:text-direct-primary/80 text-sm"
                      >
                        Редактировать
                      </Link>
                      <form action={handleDelete} className="inline">
                        <input type="hidden" name="slug" value={post.slug} />
                        <DeleteButton label={post.title} type="статью" />
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
