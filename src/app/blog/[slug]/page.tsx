import JournalArticlePage from '@/app/journal/[slug]/page';
import type { Metadata } from 'next';
import { JOURNAL_ARTICLES } from '@/mocks/fixtures';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = JOURNAL_ARTICLES.find((a) => a.slug === slug);
  if (!article) return { title: 'Article Not Found | The Unplugged Wear' };

  return {
    title: `${article.title} | The Unplugged Wear Blog`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [{ url: article.coverImage }],
    },
  };
}

export default JournalArticlePage;
