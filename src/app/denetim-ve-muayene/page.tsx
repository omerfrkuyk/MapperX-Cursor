import DenetimHeroSection from '@/components/denetim-ve-muayene/DenetimHeroSection';
import ElectricTestSection from '@/components/denetim-ve-muayene/ElectricTestSection';
import ElektrikselAltyapiSection from '@/components/denetim-ve-muayene/ElektrikselAltyapiSection';
import MapperXStudioSection from '@/components/denetim-ve-muayene/MapperXStudioSection';
import PartnershipSection from '@/components/PartnershipSection';
import FAQSection from '@/components/FAQSection';
import ReportDownloadSection from '@/components/ReportDownloadSection';

export default function DenetimVeMuayenePage() {
  return (
    <main className="flex min-h-screen flex-col">
      <DenetimHeroSection />
      <ElektrikselAltyapiSection />
      <MapperXStudioSection />
      <ElectricTestSection />
      <PartnershipSection />
      <FAQSection />
      <ReportDownloadSection />
    </main>
  );
} 