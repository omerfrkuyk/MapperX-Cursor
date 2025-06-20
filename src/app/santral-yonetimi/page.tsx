import FAQSection from '@/components/FAQSection';
import PartnershipSection from '@/components/PartnershipSection';
import ReportDownloadSection from '@/components/ReportDownloadSection';
import MeteorolojikVeriSection from '@/components/santral-yonetimi/MeteorolojikVeriSection';
import PanelOperasyonSection from '@/components/santral-yonetimi/PanelOperasyonSection';
import SantralYonetimiHeroSection from '@/components/santral-yonetimi/SantralYonetimiHeroSection';
import SeriNumarasiSection from '@/components/santral-yonetimi/SeriNumarasiSection';
import TeamSection from '@/components/santral-yonetimi/TeamSection';

export default function SantralYonetimiPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <SantralYonetimiHeroSection />
      <PanelOperasyonSection />
      <MeteorolojikVeriSection />
      <TeamSection />
      <SeriNumarasiSection />
      <PartnershipSection />
      <FAQSection />
      <ReportDownloadSection />
      
      {/* Diğer bileşenler buraya eklenecek */}
    </main>
  );
}