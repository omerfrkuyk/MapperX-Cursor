import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from '@/lib/i18n/getMessages';
import PricingSection from "@/components/PricingPage/PricingSection";
import PricingComparison from "@/components/PricingPage/PricingComparison";

export async function generateMetadata() {
  return {
    title: 'Pricing - MapperX',
    description: 'View our pricing plans for thermal inspection, audit, and autonomous analysis solutions for solar power plants.',
  };
}

export default async function PricingPage() {
  const messages = await getMessages('en');
  
  return (
    <NextIntlClientProvider messages={messages} locale="en">
      <main className="min-h-screen bg-white pt-32">
        <PricingSection />
        <PricingComparison />
      </main>
    </NextIntlClientProvider>
  );
} 