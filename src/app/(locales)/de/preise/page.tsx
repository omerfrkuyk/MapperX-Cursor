import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from '@/lib/i18n/getMessages';
import PricingSection from "@/components/PricingPage/PricingSection";
import PricingComparison from "@/components/PricingPage/PricingComparison";

export async function generateMetadata() {
  return {
    title: 'Preise - MapperX',
    description: 'Sehen Sie sich unsere Preise für thermische Inspektion, Prüfung und autonome Analyselösungen für Solarkraftwerke an.',
  };
}

export default async function PricingPage() {
  const messages = await getMessages('de');
  
  return (
    <NextIntlClientProvider messages={messages} locale="de">
      <main className="min-h-screen bg-white pt-32">
        <PricingSection />
        <PricingComparison />
      </main>
    </NextIntlClientProvider>
  );
} 