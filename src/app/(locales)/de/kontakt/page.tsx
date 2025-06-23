import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from '@/lib/i18n/getMessages';
import ContactSection from '@/components/iletisim/ContactSection';

export async function generateMetadata() {
  return {
    title: 'Kontakt - MapperX',
    description: 'Kontaktieren Sie MapperX für Lösungen zur Inspektion und Verwaltung von Solarkraftwerken. Kontaktieren Sie unser Team für Anfragen, Support oder Partnerschaftsmöglichkeiten.',
  };
}

export default async function KontaktPage() {
  const messages = await getMessages('de');
  
  return (
    <NextIntlClientProvider messages={messages} locale="de">
      <main className="flex min-h-screen flex-col">
        <ContactSection />
      </main>
    </NextIntlClientProvider>
  );
} 