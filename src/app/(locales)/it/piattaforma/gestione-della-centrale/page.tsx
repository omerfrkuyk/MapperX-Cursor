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
    title: 'Gestione della Centrale - MapperX',
    description: 'Ottimizza la gestione delle tue centrali solari e aumenta l\'efficienza operativa con MapperX.',
  };
}

export default async function GestioneDellaCentralePage() {
  const messages = await getMessages('it');
  
  return (
    <NextIntlClientProvider messages={messages} locale="it">
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