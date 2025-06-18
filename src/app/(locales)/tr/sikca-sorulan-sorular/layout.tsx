import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sıkça Sorulan Sorular | MapperX',
  description: 'Güneş enerjisi sistemleri, termografik muayene, denetim süreçleri ve MapperX hakkında sıkça sorulan soruları bu sayfada bulabilirsiniz.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
} 