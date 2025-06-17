import OtonomTermografikMuayeneSection from '@/components/termografik-inceleme/OtonomTermografikMuayeneSection';
import GelismisTermalAnalizSection from '@/components/GelismisTermalAnalizSection';
import AkilliRaporlamaSection from '@/components/termografik-inceleme/AkilliRaporlamaSection';
import TermografikHeroSection from '@/components/termografik-inceleme/TermografikHeroSection';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from '@/lib/i18n/getMessages';

export async function generateMetadata() {
  return {
    title: 'Thermografische Untersuchung - MapperX',
    description: 'Führen Sie mit MapperX KI-gestützte autonome thermografische Inspektionen in Solaranlagen durch.',
  };
}

export default async function ThermografischeUntersuchungPage() {
  const messages = await getMessages('de');
  
  return (
    <NextIntlClientProvider messages={messages} locale="de">
      <main className="flex min-h-screen flex-col">
        <TermografikHeroSection />
        <OtonomTermografikMuayeneSection />
        <GelismisTermalAnalizSection />
        <AkilliRaporlamaSection />
      </main>
    </NextIntlClientProvider>
  );
} 