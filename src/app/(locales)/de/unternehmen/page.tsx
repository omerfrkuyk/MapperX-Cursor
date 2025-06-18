import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from '@/lib/i18n/getMessages';
import AboutHeroSection from "@/components/kurumsal/AboutHeroSection";
import CarbonReductionSection from "@/components/kurumsal/CarbonReductionSection";
import IecStandartSection from "@/components/kurumsal/IecStandartSection";
import PartnershipSection from "@/components/PartnershipSection";
import FAQSection from "@/components/FAQSection";
import ReportDownloadSection from "@/components/ReportDownloadSection";

export async function generateMetadata() {
  return {
    title: 'Unternehmen - MapperX',
    description: 'Erfahren Sie mehr über MapperX. Entdecken Sie unsere Mission, Vision und Werte.',
  };
}

export default async function UnternehmenPage() {
  const messages = await getMessages('de');
  
  return (
    <NextIntlClientProvider messages={messages} locale="de">
      <main className="flex min-h-screen flex-col">
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