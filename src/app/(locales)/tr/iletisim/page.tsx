import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from '@/lib/i18n/getMessages';
import ContactSection from '@/components/iletisim/ContactSection';

export async function generateMetadata() {
  return {
    title: 'İletişim - MapperX',
    description: 'MapperX ile iletişime geçin. Güneş enerjisi santrali denetimi ve yönetimi çözümleri için ekibimizle iletişime geçin.',
  };
}

export default async function IletisimPage() {
  const messages = await getMessages('tr');
  
  return (
    <NextIntlClientProvider messages={messages} locale="tr">
      <main className="flex min-h-screen flex-col">
        <ContactSection />
      </main>
    </NextIntlClientProvider>
  );
} 