// app/sikca-sorulan-sorular/page.tsx
import FullFAQSection from '@/components/FullFAQSection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sıkça Sorulan Sorular | MapperX',
  description: 'Güneş enerjisi sistemleri, termografik muayene, denetim süreçleri ve MapperX hakkında sıkça sorulan soruları bu sayfada bulabilirsiniz.',
};

const FAQPage = () => {
  return (
    <main>
      <FullFAQSection />
    </main>
  );
};

export default FAQPage;