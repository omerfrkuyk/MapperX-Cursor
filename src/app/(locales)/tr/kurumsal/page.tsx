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
    title: 'Kurumsal - MapperX',
    description: 'MapperX hakkında detaylı bilgi edinin. Misyonumuz, vizyonumuz ve değerlerimizi keşfedin.',
  };
}

export default async function KurumsalPage() {
  const messages = await getMessages('tr');
  
  return (
    <NextIntlClientProvider messages={messages} locale="tr">
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