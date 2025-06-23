import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from '@/lib/i18n/getMessages';
import ContactSection from '@/components/iletisim/ContactSection';

export async function generateMetadata() {
  return {
    title: 'Contatto - MapperX',
    description: 'Contatta MapperX per soluzioni di ispezione e gestione di impianti solari. Contatta il nostro team per richieste, supporto o opportunità di partnership.',
  };
}

export default async function ContattoPage() {
  const messages = await getMessages('it');
  
  return (
    <NextIntlClientProvider messages={messages} locale="it">
      <main className="flex min-h-screen flex-col">
        <ContactSection />
      </main>
    </NextIntlClientProvider>
  );
} 