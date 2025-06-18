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
    title: 'Corporate - MapperX',
    description: 'Learn more about MapperX. Discover our mission, vision, and values.',
  };
}

export default async function CorporatePage() {
  const messages = await getMessages('en');
  
  return (
    <NextIntlClientProvider messages={messages} locale="en">
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