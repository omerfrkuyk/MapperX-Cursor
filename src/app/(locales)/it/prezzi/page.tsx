import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from '@/lib/i18n/getMessages';
import PricingSection from "@/components/PricingPage/PricingSection";
import PricingComparison from "@/components/PricingPage/PricingComparison";

export async function generateMetadata() {
  return {
    title: 'Prezzi - MapperX',
    description: 'Visualizza i nostri piani tariffari per le soluzioni di ispezione termica, audit e analisi autonoma per impianti solari.',
  };
}

export default async function PricingPage() {
  const messages = await getMessages('it');
  
  return (
    <NextIntlClientProvider messages={messages} locale="it">
      <main className="min-h-screen bg-white pt-32">
        <PricingSection />
        <PricingComparison />
      </main>
    </NextIntlClientProvider>
  );
} 