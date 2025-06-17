// app/termografik-inceleme/page.tsx

import FAQSection from '@/components/FAQSection';
import GelismisTermalAnalizSection from '@/components/GelismisTermalAnalizSection';
import PartnershipSection from '@/components/PartnershipSection';
import ReportDownloadSection from '@/components/ReportDownloadSection';
import AkilliRaporlamaSection from '@/components/termografik-inceleme/AkilliRaporlamaSection';
import AnomaliTurleriSection from '@/components/termografik-inceleme/AnomaliTurleriSection';
import OtonomTermografikMuayeneSection from '@/components/termografik-inceleme/OtonomTermografikMuayeneSection';
import SantralGorunumuSection from '@/components/termografik-inceleme/OtonomTermografikMuayeneSection';
import TermografikHeroSection from '@/components/termografik-inceleme/TermografikHeroSection';

export default function TermografikPage() {
  return (
    <main>
      <TermografikHeroSection />
      <OtonomTermografikMuayeneSection/>
      <GelismisTermalAnalizSection />
      <AkilliRaporlamaSection />
      <AnomaliTurleriSection />
      <PartnershipSection />
      <FAQSection />
      <ReportDownloadSection />
    </main>
  );
}