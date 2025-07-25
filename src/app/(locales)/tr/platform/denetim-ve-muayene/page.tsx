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
    title: 'Denetim ve Muayene - MapperX',
    description: 'MapperX ile elektriksel altyapı denetimlerini ve testlerini gerçekleştirin, santrallerinizin dijital ikizlerini oluşturun.',
  };
}

export default async function DenetimVeMuayenePage() {
  const messages = await getMessages('tr');
  
  return (
    <NextIntlClientProvider messages={messages} locale="tr">
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