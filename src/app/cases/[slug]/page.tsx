import { notFound } from 'next/navigation';
import { getSerializedCase } from '@/lib/cms/cases';
import { CaseDetailLayout } from '@/components/cases/CaseDetailLayout';

interface CasePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CasePageProps) {
  const { slug } = await params;
  const caseItem = await getSerializedCase(slug);

  if (!caseItem) {
    return {
      title: 'Кейс не найден',
    };
  }

  return {
    title: `${caseItem.title} | Direct-line`,
    description: caseItem.excerpt,
  };
}

export default async function CasePage({ params }: CasePageProps) {
  const { slug } = await params;
  const caseItem = await getSerializedCase(slug);

  if (!caseItem) {
    notFound();
  }

  return (
    <CaseDetailLayout
      caseItem={caseItem}
      mdxSource={caseItem.mdxSource}
    />
  );
}
