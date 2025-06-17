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
    title: 'Ispezione e Verifica - MapperX',
    description: 'Esegui ispezioni e test delle infrastrutture elettriche con MapperX, crea gemelli digitali delle tue centrali elettriche.',
  };
}

export default async function IspezioneEVerificaPage() {
  const messages = await getMessages('it');
  
  return (
    <NextIntlClientProvider messages={messages} locale="it">
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