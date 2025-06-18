import OtonomTermografikMuayeneSection from '@/components/termografik-inceleme/OtonomTermografikMuayeneSection';
import GelismisTermalAnalizSection from '@/components/GelismisTermalAnalizSection';
import AkilliRaporlamaSection from '@/components/termografik-inceleme/AkilliRaporlamaSection';
import TermografikHeroSection from '@/components/termografik-inceleme/TermografikHeroSection';
import AnomaliTurleriSection from '@/components/termografik-inceleme/AnomaliTurleriSection';
import CompatibleDroneSection from '@/components/CompatibleDroneSection';
import ReportDownloadSection from '@/components/ReportDownloadSection';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from '@/lib/i18n/getMessages';
import PartnershipSection from '@/components/PartnershipSection';
import FAQSection from '@/components/FAQSection';

export async function generateMetadata() {
  return {
    title: 'Termografik İnceleme - MapperX',
    description: 'MapperX ile güneş enerjisi santrallerinde yapay zeka destekli otonom termografik muayene gerçekleştirin.',
  };
}

export default async function TermografikIncelemePage() {
  const messages = await getMessages('tr');
  
  return (
    <NextIntlClientProvider messages={messages} locale="tr">
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