import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from '@/lib/i18n/getMessages';
import AboutHeroSection from "@/components/kurumsal/AboutHeroSection";
import CarbonReductionSection from "@/components/kurumsal/CarbonReductionSection";
import IecStandartSection from "@/components/kurumsal/IecStandartSection";
import PartnershipSection from "@/components/PartnershipSection";
import FAQSection from "@/components/FAQSection";
import ReportDownloadSection from "@/components/ReportDownloadSection";

export const metadata = {
  title: 'MapperX - Entreprise',
  description: 'MapperX - Solutions d\'inspection thermographique, d\'audit et d\'analyse autonome pour les centrales solaires',
};

export default async function EntreprisePage() {
  const messages = await getMessages('fr');
  
  return (
    <NextIntlClientProvider messages={messages}>
      <main className="bg-white">
        <AboutHeroSection />
        <CarbonReductionSection />
        <IecStandartSection />
        <PartnershipSection />
        <FAQSection />
        <ReportDownloadSection />
      </main>
    </NextIntlClientProvider>
  );
} 