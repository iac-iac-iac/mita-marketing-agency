import fs from 'fs';
import path from 'path';
import { serialize } from 'next-mdx-remote/serialize';
import type { Case, CaseFrontmatter, CaseStats, CaseTestimonial, ContentMeta } from '@/types/content';
import { extractFrontmatter, removeFrontmatter } from './shared';

const casesDirectory = path.join(process.cwd(), 'src/content/cases');

/**
 * Получить все кейсы (метаданные)
 */
export function getAllCases(): ContentMeta[] {
  try {
    if (!fs.existsSync(casesDirectory)) {
      console.error('Cases directory not found:', casesDirectory);
      return [];
    }

    const files = fs.readdirSync(casesDirectory).filter((file) =>
      file.endsWith('.mdx')
    );

    console.log('Case files:', files);

    const cases = files.map((file) => {
      const slug = file.replace('.mdx', '');
      const filePath = path.join(casesDirectory, file);
      const content = fs.readFileSync(filePath, 'utf-8');

      // Извлекаем frontmatter из начала файла
      const frontmatter = extractFrontmatter(content);

      console.log('Case frontmatter:', { slug, frontmatter });

      return {
        slug,
        title: String(frontmatter.title) || slug,
        excerpt: String(frontmatter.excerpt) || '',
        publishedAt: String(frontmatter.publishedAt) || new Date().toISOString(),
        coverImage: frontmatter.coverImage ? String(frontmatter.coverImage) : undefined,
      };
    });

    // Сортируем по дате публикации (новые сначала)
    return cases.sort((a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  } catch (error) {
    console.error('Error getting cases:', error);
    return [];
  }
}

/**
 * Получить кейс по slug
 */
export async function getCaseBySlug(slug: string): Promise<Case | null> {
  const filePath = path.join(casesDirectory, `${slug}.mdx`);
  
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  const frontmatter = extractFrontmatter(content);
  const mainContent = removeFrontmatter(content);

  return {
    slug,
    title: String(frontmatter.title) || slug,
    excerpt: String(frontmatter.excerpt) || '',
    content: mainContent,
    publishedAt: String(frontmatter.publishedAt),
    updatedAt: frontmatter.updatedAt ? String(frontmatter.updatedAt) : undefined,
    client: String(frontmatter.client) || '',
    industry: String(frontmatter.industry) || '',
    coverImage: frontmatter.coverImage ? String(frontmatter.coverImage) : undefined,
    gallery: Array.isArray(frontmatter.gallery) ? frontmatter.gallery as string[] : undefined,
    stats: frontmatter.stats as Array<{ label: string; before: string; after: string; improvement: string }> | undefined,
    tools: Array.isArray(frontmatter.tools) ? frontmatter.tools as string[] : undefined,
    challenges: Array.isArray(frontmatter.challenges) ? frontmatter.challenges as string[] : undefined,
    solutions: Array.isArray(frontmatter.solutions) ? frontmatter.solutions as string[] : undefined,
    results: frontmatter.results ? String(frontmatter.results) : undefined,
    testimonial: frontmatter.testimonial as unknown as { text: string; author: string; position: string; company: string } | undefined,
    relatedCases: Array.isArray(frontmatter.relatedCases) ? frontmatter.relatedCases as string[] : undefined,
  };
}

/**
 * Получить serialized контент для MDX
 */
export async function getSerializedCase(slug: string) {
  const caseItem = await getCaseBySlug(slug);
  
  if (!caseItem) {
    return null;
  }

  const mdxSource = await serialize(caseItem.content, {
    mdxOptions: {
      development: process.env.NODE_ENV === 'development',
    },
  });

  return {
    ...caseItem,
    mdxSource,
  };
}
