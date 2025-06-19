import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from '@/lib/i18n/getMessages';
import PricingSection from "@/components/PricingPage/PricingSection";
import PricingComparison from "@/components/PricingPage/PricingComparison";

export async function generateMetadata() {
  return {
    title: 'Fiyatlar - MapperX',
    description: 'Güneş enerjisi santralleri için termografik muayene, denetim ve otonom analiz çözümlerimizin fiyatlarını inceleyin.',
  };
}

export default async function PricingPage() {
  const messages = await getMessages('tr');
  
  return (
    <NextIntlClientProvider messages={messages} locale="tr">
      <main className="min-h-screen bg-white pt-32">
        <PricingSection />
        <PricingComparison />
      </main>
    </NextIntlClientProvider>
  );
} 