import { notFound } from 'next/navigation';
import { getSerializedBlogPost } from '@/lib/cms/blog';
import { BlogPostLayout } from '@/components/blog/BlogPostLayout';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getSerializedBlogPost(slug);

  if (!post) {
    return {
      title: 'Статья не найдена',
    };
  }

  return {
    title: `${post.title} | Direct-line`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getSerializedBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <BlogPostLayout
      title={post.title}
      excerpt={post.excerpt}
      publishedAt={post.publishedAt}
      author={post.author}
      category={post.category}
      readTime={post.readTime}
      coverImage={post.coverImage}
      tags={post.tags}
      mdxSource={post.mdxSource}
    />
  );
}
