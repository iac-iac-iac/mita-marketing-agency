import { getAllCases } from '@/lib/cms/cases';
import { CasesIndex } from '@/components/cases/CasesIndex';
import Header from '@/components/layout/Header';
import ScrollToTopButton from '@/components/ui/ScrollToTopButton';

export const metadata = {
  title: 'Кейсы | Direct-line',
  description: 'Реальные результаты наших клиентов с цифрами и фактами',
};

export default async function CasesPage() {
  const cases = getAllCases();

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
              Кейсы Direct-line
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Истории успеха наших клиентов с измеримыми результатами
              и конкретными цифрами
            </p>
          </div>
        </div>

        {/* Cases Index */}
        <CasesIndex cases={cases} showAll />
        <ScrollToTopButton />
      </div>
    </>
  );
}
