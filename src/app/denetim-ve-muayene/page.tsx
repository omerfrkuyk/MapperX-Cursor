import DenetimHeroSection from '@/components/denetim-ve-muayene/DenetimHeroSection';
import ElectricTestSection from '@/components/denetim-ve-muayene/ElectricTestSection';
import ElektrikselAltyapiSection from '@/components/denetim-ve-muayene/ElektrikselAltyapiSection';
import MapperXStudioSection from '@/components/denetim-ve-muayene/MapperXStudioSection';
import FAQSection from '@/components/FAQSection';
import PartnershipSection from '@/components/PartnershipSection';
import ReportDownloadSection from '@/components/ReportDownloadSection';

export default function DenetimPage() {
  return (
    <main>
      <DenetimHeroSection />
      <ElektrikselAltyapiSection />
      <MapperXStudioSection />
      <ElectricTestSection />
      < PartnershipSection />
      <FAQSection />
      <ReportDownloadSection />
    </main>
  );
}