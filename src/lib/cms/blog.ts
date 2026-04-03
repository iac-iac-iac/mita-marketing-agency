import path from 'path';
import type { BlogPost, BlogPostFrontmatter, ContentMeta } from '@/types/content';
import {
  getMdxFiles,
  readMdxFile,
  getSerializedContent,
  estimateReadTime,
  sortByDate,
} from './utils';

const blogDirectory = path.join(process.cwd(), 'src/content/blog');

/**
 * Получить все статьи блога (метаданные)
 */
export function getAllBlogPosts(): ContentMeta[] {
  const files = getMdxFiles(blogDirectory);

  const posts = files.map((file) => {
    const slug = file.replace('.mdx', '');
    const filePath = path.join(blogDirectory, file);
    const result = readMdxFile(filePath);

    if (!result) {
      return null;
    }

    const frontmatter = result.frontmatter as unknown as BlogPostFrontmatter;

    return {
      slug,
      title: String(frontmatter.title) || slug,
      excerpt: String(frontmatter.excerpt) || '',
      publishedAt: String(frontmatter.publishedAt) || new Date().toISOString(),
      coverImage: frontmatter.coverImage ? String(frontmatter.coverImage) : undefined,
    } satisfies ContentMeta;
  }).filter(Boolean);

  // Сортируем по дате
  return sortByDate(posts);
}

/**
 * Получить статью по slug
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const filePath = path.join(blogDirectory, `${slug}.mdx`);
  const result = readMdxFile(filePath);

  if (!result) {
    return null;
  }

  const frontmatter = result.frontmatter as unknown as BlogPostFrontmatter;

  return {
    slug,
    title: String(frontmatter.title) || slug,
    excerpt: String(frontmatter.excerpt) || '',
    content: result.content,
    publishedAt: String(frontmatter.publishedAt),
    updatedAt: frontmatter.updatedAt ? String(frontmatter.updatedAt) : undefined,
    author: String(frontmatter.author) || 'М.И.Т.А.',
    category: String(frontmatter.category) || 'Общее',
    tags: Array.isArray(frontmatter.tags) ? frontmatter.tags as string[] : [],
    coverImage: frontmatter.coverImage ? String(frontmatter.coverImage) : undefined,
    readTime: frontmatter.readTime ? Number(frontmatter.readTime) : estimateReadTime(result.content),
  };
}

/**
 * Получить serialized контент для MDX с кэшированием
 */
export async function getSerializedBlogPost(slug: string) {
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return null;
  }

  try {
    const mdxSource = await getSerializedContent(post.content, `blog-${slug}`);

    return {
      ...post,
      mdxSource,
    };
  } catch (error) {
    console.error('Error serializing blog post:', error);
    return null;
  }
}

/**
 * Получить последние N статей
 */
export function getRecentBlogPosts(limit: number = 3): ContentMeta[] {
  const allPosts = getAllBlogPosts();
  return allPosts.slice(0, limit);
}
