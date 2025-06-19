import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from '@/lib/i18n/getMessages';
import PricingSection from "@/components/PricingPage/PricingSection";
import PricingComparison from "@/components/PricingPage/PricingComparison";

export async function generateMetadata() {
  return {
    title: 'Tarifs - MapperX',
    description: 'Découvrez nos tarifs pour les solutions d\'inspection thermique, d\'audit et d\'analyse autonome pour les centrales solaires.',
  };
}

export default async function PricingPage() {
  const messages = await getMessages('fr');
  
  return (
    <NextIntlClientProvider messages={messages} locale="fr">
      <main className="min-h-screen bg-white">
        <PricingSection />
        <PricingComparison />
      </main>
    </NextIntlClientProvider>
  );
} 