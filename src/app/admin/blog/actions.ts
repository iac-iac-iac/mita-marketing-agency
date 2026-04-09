/**
 * Server Actions для админки блога
 * 
 * better-sqlite3 работает ТОЛЬКО на сервере.
 * Все CRUD операции должны быть в Server Actions, не в клиентских компонентах.
 */

'use server';

import { createPost, updatePost, deletePost, generateSlug, getPostBySlug } from '@/lib/cms/db-blog';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export interface BlogFormInput {
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  tags: string; // строка через запятую
  cover_image: string;
  status: 'draft' | 'published';
}

// ============================================================================
// Создание статьи
// ============================================================================
export async function createBlogPostAction(input: BlogFormInput) {
  try {
    createPost({
      slug: generateSlug(input.title),
      title: input.title,
      excerpt: input.excerpt,
      content: input.content,
      author: input.author || 'М.И.Т.А.',
      category: input.category || 'Общее',
      tags: input.tags
        .split(',')
        .map(t => t.trim())
        .filter(Boolean),
      cover_image: input.cover_image,
      status: input.status,
      read_time: Math.max(1, Math.ceil(input.content.split(/\s+/).length / 200)),
    });

    revalidatePath('/admin/blog');
    revalidatePath('/blog');
  } catch (error) {
    console.error('Failed to create blog post:', error);
    throw new Error('Ошибка создания статьи');
  }
}

// ============================================================================
// Обновление статьи
// ============================================================================
export async function updateBlogPostAction(slug: string, input: BlogFormInput) {
  try {
    updatePost(slug, {
      title: input.title,
      excerpt: input.excerpt,
      content: input.content,
      author: input.author,
      category: input.category,
      tags: input.tags
        .split(',')
        .map(t => t.trim())
        .filter(Boolean),
      cover_image: input.cover_image,
      status: input.status,
      read_time: Math.max(1, Math.ceil(input.content.split(/\s+/).length / 200)),
    });

    revalidatePath('/admin/blog');
    revalidatePath('/blog');
    revalidatePath(`/blog/${slug}`);
  } catch (error) {
    console.error('Failed to update blog post:', error);
    throw new Error('Ошибка обновления статьи');
  }
}

// ============================================================================
// Удаление статьи
// ============================================================================
export async function deleteBlogPostAction(formData: FormData) {
  const slug = formData.get('slug') as string;
  if (!slug) return;

  deletePost(slug);

  revalidatePath('/admin/blog');
  revalidatePath('/blog');
}

// ============================================================================
// Получение статьи (для edit страницы)
// ============================================================================
export async function getBlogPostForEdit(slug: string) {
  const post = getPostBySlug(slug);
  if (!post) return null;

  const tags = JSON.parse(post.tags || '[]');

  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    author: post.author,
    category: post.category,
    tags: Array.isArray(tags) ? tags.join(', ') : '',
    cover_image: post.cover_image || '',
    status: post.status,
  };
}
