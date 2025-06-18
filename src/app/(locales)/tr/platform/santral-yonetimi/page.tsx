import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from '@/lib/i18n/getMessages';
import SantralYonetimiHeroSection from "@/components/santral-yonetimi/SantralYonetimiHeroSection";
import MeteorolojikVeriSection from "@/components/santral-yonetimi/MeteorolojikVeriSection";
import PanelOperasyonSection from "@/components/santral-yonetimi/PanelOperasyonSection";
import SeriNumarasiSection from "@/components/santral-yonetimi/SeriNumarasiSection";
import TeamSection from "@/components/santral-yonetimi/TeamSection";
import PartnershipSection from "@/components/PartnershipSection";
import FAQSection from "@/components/FAQSection";
import ReportDownloadSection from "@/components/ReportDownloadSection";

export async function generateMetadata() {
  return {
    title: 'Santral Yönetimi - MapperX',
    description: 'MapperX ile güneş enerjisi santrallerinizin yönetimini optimize edin ve operasyonel verimliliğinizi artırın.',
  };
}

export default async function SantralYonetimiPage() {
  const messages = await getMessages('tr');
  
  return (
    <NextIntlClientProvider messages={messages} locale="tr">
      <main className="flex min-h-screen flex-col">
        <SantralYonetimiHeroSection />
        <PanelOperasyonSection />
        <MeteorolojikVeriSection />
        <TeamSection />
        <SeriNumarasiSection />
        <PartnershipSection />
        <FAQSection />
        <ReportDownloadSection />
      </main>
    </NextIntlClientProvider>
  );
} 