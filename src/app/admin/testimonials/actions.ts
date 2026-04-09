/**
 * Server Actions для админки отзывов
 */

'use server';

import { createTestimonial, updateTestimonial, deleteTestimonial, getAllTestimonials, getTestimonialById } from '@/lib/cms/db-testimonials';
import { revalidatePath } from 'next/cache';

export interface TestimonialFormInput {
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar?: string;
  category?: string;  /* '' = главная, 'leadgen', 'call-center', 'avito', 'recruiting' */
  sort_order?: number;
}

// ============================================================================
// Создание отзыва
// ============================================================================
export async function createTestimonialAction(input: TestimonialFormInput) {
  try {
    createTestimonial({
      name: input.name,
      role: input.role,
      company: input.company,
      quote: input.quote,
      avatar: input.avatar,
      category: input.category || '',
      sort_order: input.sort_order ?? 0,
    });
    revalidatePath('/admin/testimonials');
    revalidatePath('/');
  } catch (error) {
    console.error('Failed to create testimonial:', error);
    throw new Error('Ошибка создания отзыва');
  }
}

// ============================================================================
// Обновление отзыва
// ============================================================================
export async function updateTestimonialAction(id: number, input: TestimonialFormInput) {
  try {
    updateTestimonial(id, input);
    revalidatePath('/admin/testimonials');
    revalidatePath('/');
  } catch (error) {
    console.error('Failed to update testimonial:', error);
    throw new Error('Ошибка обновления отзыва');
  }
}

// ============================================================================
// Удаление отзыва
// ============================================================================
export async function deleteTestimonialAction(formData: FormData) {
  const id = formData.get('id') as string;
  if (!id) return;
  deleteTestimonial(parseInt(id));
  revalidatePath('/admin/testimonials');
  revalidatePath('/');
}

// ============================================================================
// Получение отзыва для редактирования
// ============================================================================
export async function getTestimonialForEdit(id: number) {
  return getTestimonialById(id);
}
