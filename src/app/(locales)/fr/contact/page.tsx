import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from '@/lib/i18n/getMessages';
import ContactSection from '@/components/iletisim/ContactSection';

export async function generateMetadata() {
  return {
    title: 'Contact - MapperX',
    description: 'Contactez MapperX pour des solutions d\'inspection et de gestion de centrales solaires. Contactez notre équipe pour des demandes, du support ou des opportunités de partenariat.',
  };
}

export default async function ContactPage() {
  const messages = await getMessages('fr');
  
  return (
    <NextIntlClientProvider messages={messages} locale="fr">
      <main className="flex min-h-screen flex-col">
        <ContactSection />
      </main>
    </NextIntlClientProvider>
  );
} 