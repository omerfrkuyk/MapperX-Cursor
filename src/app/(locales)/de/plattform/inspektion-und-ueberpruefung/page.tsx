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
    title: 'Inspektion und Überprüfung - MapperX',
    description: 'Führen Sie mit MapperX elektrische Infrastrukturinspektionen und -tests durch, erstellen Sie digitale Zwillinge Ihrer Kraftwerke.',
  };
}

export default async function InspektionUndUeberpruefungPage() {
  const messages = await getMessages('de');
  
  return (
    <NextIntlClientProvider messages={messages} locale="de">
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