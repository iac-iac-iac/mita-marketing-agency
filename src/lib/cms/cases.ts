import path from 'path';
import type { Case, CaseFrontmatter, ContentMeta } from '@/types/content';
import {
  getMdxFiles,
  readMdxFile,
  getSerializedContent,
  sortByDate,
} from './utils';

const casesDirectory = path.join(process.cwd(), 'src/content/cases');

/**
 * Получить все кейсы (метаданные)
 */
export function getAllCases(): ContentMeta[] {
  const files = getMdxFiles(casesDirectory);

  const cases = files.map((file) => {
    const slug = file.replace('.mdx', '');
    const filePath = path.join(casesDirectory, file);
    const result = readMdxFile(filePath);

    if (!result) {
      return null;
    }

    const frontmatter = result.frontmatter as unknown as CaseFrontmatter;

    return {
      slug,
      title: String(frontmatter.title) || slug,
      excerpt: String(frontmatter.excerpt) || '',
      publishedAt: String(frontmatter.publishedAt) || new Date().toISOString(),
      coverImage: frontmatter.coverImage ? String(frontmatter.coverImage) : undefined,
    } satisfies ContentMeta;
  }).filter(Boolean);

  // Сортируем по дате
  return sortByDate(cases);
}

/**
 * Получить кейс по slug
 */
export async function getCaseBySlug(slug: string): Promise<Case | null> {
  const filePath = path.join(casesDirectory, `${slug}.mdx`);
  const result = readMdxFile(filePath);

  if (!result) {
    return null;
  }

  const frontmatter = result.frontmatter as unknown as CaseFrontmatter;

  return {
    slug,
    title: String(frontmatter.title) || slug,
    excerpt: String(frontmatter.excerpt) || '',
    content: result.content,
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
 * Получить serialized контент для MDX с кэшированием
 */
export async function getSerializedCase(slug: string) {
  const caseItem = await getCaseBySlug(slug);

  if (!caseItem) {
    return null;
  }

  try {
    const mdxSource = await getSerializedContent(caseItem.content, `case-${slug}`);

    return {
      ...caseItem,
      mdxSource,
    };
  } catch (error) {
    console.error('Error serializing case:', error);
    return null;
  }
}
