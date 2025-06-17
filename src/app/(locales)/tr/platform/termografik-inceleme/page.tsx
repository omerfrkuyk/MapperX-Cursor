import ThermographicInspectionHero from '@/components/ThermographicInspectionHero';
import OtonomTermografikMuayeneSection from '@/components/termografik-inceleme/OtonomTermografikMuayeneSection';
import GelismisTermalAnalizSection from '@/components/GelismisTermalAnalizSection';
import AkilliRaporlamaSection from '@/components/termografik-inceleme/AkilliRaporlamaSection';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from '@/lib/i18n/getMessages';

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
        <ThermographicInspectionHero />
        <OtonomTermografikMuayeneSection />
        <GelismisTermalAnalizSection />
        <AkilliRaporlamaSection />
      </main>
    </NextIntlClientProvider>
  );
} 