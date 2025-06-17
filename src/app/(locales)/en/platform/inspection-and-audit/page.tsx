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
    title: 'Inspection and Audit - MapperX',
    description: 'Perform electrical infrastructure inspections and tests with MapperX, create digital twins of your power plants.',
  };
}

export default async function InspectionAndAuditPage() {
  const messages = await getMessages('en');
  
  return (
    <NextIntlClientProvider messages={messages} locale="en">
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