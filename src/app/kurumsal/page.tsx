import FAQSection from '@/components/FAQSection';
import AboutHeroSection from '@/components/kurumsal/AboutHeroSection';
import CarbonReductionSection from '@/components/kurumsal/CarbonReductionSection';
import IecStandartSection from '@/components/kurumsal/IecStandartSection';
import PartnershipSection from '@/components/PartnershipSection';
import ReportDownloadSection from '@/components/ReportDownloadSection';

export default function KurumsalPage() {
  return (
    <main className="min-h-screen bg-white">
      <AboutHeroSection />
      <CarbonReductionSection />
      <IecStandartSection />
      <PartnershipSection />
      <FAQSection />
      <ReportDownloadSection />
      
    </main>
  );
}