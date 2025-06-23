import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from '@/lib/i18n/getMessages';
import ContactSection from '@/components/iletisim/ContactSection';

export async function generateMetadata() {
  return {
    title: 'Contact - MapperX',
    description: 'Contact MapperX for solar power plant inspection and management solutions. Get in touch with our team for inquiries, support, or partnership opportunities.',
  };
}

export default async function ContactPage() {
  const messages = await getMessages('en');
  
  return (
    <NextIntlClientProvider messages={messages} locale="en">
      <main className="flex min-h-screen flex-col">
        <ContactSection />
      </main>
    </NextIntlClientProvider>
  );
} 