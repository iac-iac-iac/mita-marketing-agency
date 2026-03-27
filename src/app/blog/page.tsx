import { getAllBlogPosts } from '@/lib/cms/blog';
import { BlogIndex } from '@/components/blog/BlogIndex';
import BlogCategories from '@/components/blog/BlogCategories';
import Header from '@/components/layout/Header';
import ScrollToTopButton from '@/components/ui/ScrollToTopButton';

export const metadata = {
  title: 'Блог | Direct-line',
  description: 'Полезные статьи о маркетинге, разработке и продвижении бизнеса',
};

export default async function BlogPage() {
  const posts = getAllBlogPosts();

  console.log('Blog posts:', posts);

  return (
    <>
      <Header showBackButton showHamburgerMenu />
      <div className="min-h-screen bg-direct-dark pt-20">
        {/* Hero Section */}
        <div className="relative py-12 px-4">
          {/* Фоновый градиент */}
          <div className="absolute inset-0 bg-gradient-to-b from-direct-dark via-direct-secondary/50 to-direct-dark" />

          <div className="max-w-7xl mx-auto text-center relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Блог Direct-line
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Экспертные материалы о digital-маркетинге, веб-разработке
              и продвижении бизнеса
            </p>
          </div>
        </div>

        {/* Blog Categories */}
        <BlogCategories />

        {/* Blog Index */}
        <BlogIndex posts={posts} showAll />
        <ScrollToTopButton />
      </div>
    </>
  );
}
