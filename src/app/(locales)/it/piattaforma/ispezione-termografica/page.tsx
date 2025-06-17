import OtonomTermografikMuayeneSection from '@/components/termografik-inceleme/OtonomTermografikMuayeneSection';
import GelismisTermalAnalizSection from '@/components/GelismisTermalAnalizSection';
import AkilliRaporlamaSection from '@/components/termografik-inceleme/AkilliRaporlamaSection';
import TermografikHeroSection from '@/components/termografik-inceleme/TermografikHeroSection';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from '@/lib/i18n/getMessages';

export async function generateMetadata() {
  return {
    title: 'Ispezione Termografica - MapperX',
    description: 'Esegui ispezioni termografiche autonome assistite dall\'IA negli impianti solari con MapperX.',
  };
}

export default async function IspezioneTermograficaPage() {
  const messages = await getMessages('it');
  
  return (
    <NextIntlClientProvider messages={messages} locale="it">
      <main className="flex min-h-screen flex-col">
        <TermografikHeroSection />
        <OtonomTermografikMuayeneSection />
        <GelismisTermalAnalizSection />
        <AkilliRaporlamaSection />
      </main>
    </NextIntlClientProvider>
  );
} 