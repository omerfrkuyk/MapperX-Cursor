import DenetimHeroSection from '@/components/denetim-ve-muayene/DenetimHeroSection';
import ElectricTestSection from '@/components/denetim-ve-muayene/ElectricTestSection';
import ElektrikselAltyapiSection from '@/components/denetim-ve-muayene/ElektrikselAltyapiSection';
import MapperXStudioSection from '@/components/denetim-ve-muayene/MapperXStudioSection';
import PartnershipSection from '@/components/PartnershipSection';
import FAQSection from '@/components/FAQSection';
import ReportDownloadSection from '@/components/ReportDownloadSection';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from '@/lib/i18n/getMessages';

export async function generateMetadata() {
  return {
    title: 'Inspection et Audit - MapperX',
    description: 'Effectuez des inspections et des tests d\'infrastructure électrique avec MapperX, créez des jumeaux numériques de vos centrales.',
  };
}

export default async function InspectionEtAuditPage() {
  const messages = await getMessages('fr');
  
  return (
    <NextIntlClientProvider messages={messages} locale="fr">
      <main>
        <DenetimHeroSection />
        <ElektrikselAltyapiSection />
        <MapperXStudioSection />
        <ElectricTestSection />
        <PartnershipSection />
        <FAQSection />
        <ReportDownloadSection />
      </main>
    </NextIntlClientProvider>
  );
} 