/**
 * Server Actions для админки кейсов
 */

'use server';

import { createCase, updateCase, deleteCase, generateSlug, getCaseBySlug } from '@/lib/cms/db-cases';
import { revalidatePath } from 'next/cache';

export interface CaseFormInput {
  title: string;
  excerpt: string;
  content: string;
  client: string;
  industry: string;
  cover_image: string;
  status: 'draft' | 'published';
}

// ============================================================================
// Создание кейса
// ============================================================================
export async function createCaseAction(input: CaseFormInput) {
  try {
    createCase({
      slug: generateSlug(input.title),
      title: input.title,
      excerpt: input.excerpt,
      content: input.content,
      client: input.client || '',
      industry: input.industry || '',
      cover_image: input.cover_image,
      status: input.status,
    });

    revalidatePath('/admin/cases');
    revalidatePath('/cases');
  } catch (error) {
    console.error('Failed to create case:', error);
    throw new Error('Ошибка создания кейса');
  }
}

// ============================================================================
// Обновление кейса
// ============================================================================
export async function updateCaseAction(slug: string, input: CaseFormInput) {
  try {
    updateCase(slug, {
      title: input.title,
      excerpt: input.excerpt,
      content: input.content,
      client: input.client,
      industry: input.industry,
      cover_image: input.cover_image,
      status: input.status,
    });

    revalidatePath('/admin/cases');
    revalidatePath('/cases');
    revalidatePath(`/cases/${slug}`);
  } catch (error) {
    console.error('Failed to update case:', error);
    throw new Error('Ошибка обновления кейса');
  }
}

// ============================================================================
// Удаление кейса
// ============================================================================
export async function deleteCaseAction(formData: FormData) {
  const slug = formData.get('slug') as string;
  if (!slug) return;

  deleteCase(slug);

  revalidatePath('/admin/cases');
  revalidatePath('/cases');
}

// ============================================================================
// Получение кейса для редактирования
// ============================================================================
export async function getCaseForEdit(slug: string) {
  const caseItem = getCaseBySlug(slug);
  if (!caseItem) return null;

  return {
    slug: caseItem.slug,
    title: caseItem.title,
    excerpt: caseItem.excerpt,
    content: caseItem.content,
    client: caseItem.client,
    industry: caseItem.industry,
    cover_image: caseItem.cover_image || '',
    status: caseItem.status,
  };
}
