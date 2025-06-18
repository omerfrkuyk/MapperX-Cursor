import OtonomTermografikMuayeneSection from '@/components/termografik-inceleme/OtonomTermografikMuayeneSection';
import GelismisTermalAnalizSection from '@/components/GelismisTermalAnalizSection';
import AkilliRaporlamaSection from '@/components/termografik-inceleme/AkilliRaporlamaSection';
import TermografikHeroSection from '@/components/termografik-inceleme/TermografikHeroSection';
import AnomaliTurleriSection from '@/components/termografik-inceleme/AnomaliTurleriSection';
import PartnershipSection from '@/components/PartnershipSection';
import FAQSection from '@/components/FAQSection';
import ReportDownloadSection from '@/components/ReportDownloadSection';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from '@/lib/i18n/getMessages';

export async function generateMetadata() {
  return {
    title: 'Inspection Thermographique - MapperX',
    description: 'Effectuez une inspection thermographique autonome assistée par IA dans les centrales solaires avec MapperX.',
  };
}

export default async function InspectionThermographiquePage() {
  const messages = await getMessages('fr');
  
  return (
    <NextIntlClientProvider messages={messages} locale="fr">
      <main className="flex min-h-screen flex-col">
        <TermografikHeroSection />
        <OtonomTermografikMuayeneSection />
        <GelismisTermalAnalizSection />
        <AkilliRaporlamaSection />
        <AnomaliTurleriSection />
        <PartnershipSection />
        <FAQSection />
        <ReportDownloadSection />
      </main>
    </NextIntlClientProvider>
  );
} 