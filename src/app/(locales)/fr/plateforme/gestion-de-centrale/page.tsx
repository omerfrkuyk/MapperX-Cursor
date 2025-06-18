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
    title: 'Gestion de Centrale - MapperX',
    description: 'Optimisez la gestion de vos centrales solaires et augmentez l\'efficacité opérationnelle avec MapperX.',
  };
}

export default async function GestionDeCentralePage() {
  const messages = await getMessages('fr');
  
  return (
    <NextIntlClientProvider messages={messages} locale="fr">
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