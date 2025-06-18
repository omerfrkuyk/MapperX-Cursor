import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from '@/lib/i18n/getMessages';
import AboutHeroSection from "@/components/kurumsal/AboutHeroSection";
import CarbonReductionSection from "@/components/kurumsal/CarbonReductionSection";
import IecStandartSection from "@/components/kurumsal/IecStandartSection";
import PartnershipSection from "@/components/PartnershipSection";
import FAQSection from "@/components/FAQSection";
import ReportDownloadSection from "@/components/ReportDownloadSection";

export const metadata = {
  title: 'MapperX - Aziendale',
  description: 'MapperX - Soluzioni di ispezione termografica, audit e analisi autonoma per impianti solari',
};

export default async function AziendalePage() {
  const messages = await getMessages('it');
  
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