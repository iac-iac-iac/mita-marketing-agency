import fs from 'fs';
import path from 'path';
import { serialize } from 'next-mdx-remote/serialize';
import type { BlogPost, BlogPostFrontmatter, ContentMeta } from '@/types/content';
import { extractFrontmatter, removeFrontmatter, estimateReadTime } from './shared';

const blogDirectory = path.join(process.cwd(), 'src/content/blog');

/**
 * Получить все статьи блога (метаданные)
 */
export function getAllBlogPosts(): ContentMeta[] {
  try {
    if (!fs.existsSync(blogDirectory)) {
      console.error('Blog directory not found:', blogDirectory);
      return [];
    }

    const files = fs.readdirSync(blogDirectory).filter((file) =>
      file.endsWith('.mdx')
    );

    console.log('Blog files:', files);

    const posts = files.map((file) => {
      const slug = file.replace('.mdx', '');
      const filePath = path.join(blogDirectory, file);
      const content = fs.readFileSync(filePath, 'utf-8');

      // Извлекаем frontmatter из начала файла
      const frontmatter = extractFrontmatter(content) as unknown as BlogPostFrontmatter;

      console.log('Post frontmatter:', { slug, frontmatter });

      return {
        slug,
        title: String(frontmatter.title) || slug,
        excerpt: String(frontmatter.excerpt) || '',
        publishedAt: String(frontmatter.publishedAt) || new Date().toISOString(),
        coverImage: frontmatter.coverImage ? String(frontmatter.coverImage) : undefined,
      };
    });

    // Сортируем по дате публикации (новые сначала)
    return posts.sort((a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  } catch (error) {
    console.error('Error getting blog posts:', error);
    return [];
  }
}

/**
 * Получить статью по slug
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const filePath = path.join(blogDirectory, `${slug}.mdx`);
  
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  const frontmatter = extractFrontmatter(content) as unknown as BlogPostFrontmatter;
  const mainContent = removeFrontmatter(content);

  return {
    slug,
    title: String(frontmatter.title) || slug,
    excerpt: String(frontmatter.excerpt) || '',
    content: mainContent,
    publishedAt: String(frontmatter.publishedAt),
    updatedAt: frontmatter.updatedAt ? String(frontmatter.updatedAt) : undefined,
    author: String(frontmatter.author) || 'Direct-line',
    category: String(frontmatter.category) || 'Общее',
    tags: Array.isArray(frontmatter.tags) ? frontmatter.tags as string[] : [],
    coverImage: frontmatter.coverImage ? String(frontmatter.coverImage) : undefined,
    readTime: frontmatter.readTime ? Number(frontmatter.readTime) : estimateReadTime(mainContent),
  };
}

/**
 * Получить serialized контент для MDX
 */
export async function getSerializedBlogPost(slug: string) {
  const post = await getBlogPostBySlug(slug);
  
  if (!post) {
    return null;
  }

  const mdxSource = await serialize(post.content, {
    mdxOptions: {
      development: process.env.NODE_ENV === 'development',
    },
  });

  return {
    ...post,
    mdxSource,
  };
}

/**
 * Получить последние N статей
 */
export function getRecentBlogPosts(limit: number = 3): ContentMeta[] {
  const allPosts = getAllBlogPosts();
  return allPosts.slice(0, limit);
}
