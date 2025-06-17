import ThermographicInspectionHero from '@/components/ThermographicInspectionHero';
import OtonomTermografikMuayeneSection from '@/components/termografik-inceleme/OtonomTermografikMuayeneSection';
import GelismisTermalAnalizSection from '@/components/GelismisTermalAnalizSection';
import AkilliRaporlamaSection from '@/components/termografik-inceleme/AkilliRaporlamaSection';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from '@/lib/i18n/getMessages';

export async function generateMetadata() {
  return {
    title: 'Thermographic Inspection - MapperX',
    description: 'Perform AI-powered autonomous thermographic inspection in solar power plants with MapperX.',
  };
}

export default async function ThermographicInspectionPage() {
  const messages = await getMessages('en');
  
  return (
    <NextIntlClientProvider messages={messages} locale="en">
      <main className="flex min-h-screen flex-col">
        <ThermographicInspectionHero />
        <OtonomTermografikMuayeneSection />
        <GelismisTermalAnalizSection />
        <AkilliRaporlamaSection />
      </main>
    </NextIntlClientProvider>
  );
} 