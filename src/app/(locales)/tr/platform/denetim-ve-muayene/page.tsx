import HeroSection from '@/components/inspection-and-audit/tr/HeroSection';
import ElectricalInfrastructureSection from '@/components/inspection-and-audit/tr/ElectricalInfrastructureSection';
import MapperXStudioSection from '@/components/inspection-and-audit/tr/MapperXStudioSection';
import ElectricTestSection from '@/components/inspection-and-audit/tr/ElectricTestSection';
import PartnershipSection from '@/components/PartnershipSection';
import FAQSection from '@/components/FAQSection';
import ReportDownloadSection from '@/components/ReportDownloadSection';

export default function DenetimVeMuayene() {
  return (
    <main>
      <HeroSection />
      <ElectricalInfrastructureSection />
      <MapperXStudioSection />
      <ElectricTestSection />
      <PartnershipSection />
      <FAQSection />
      <ReportDownloadSection />
    </main>
  );
} 