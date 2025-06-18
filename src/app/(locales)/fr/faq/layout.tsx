import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Questions Fréquemment Posées | MapperX',
  description: 'Trouvez des réponses aux questions fréquemment posées sur les systèmes solaires, l\'inspection thermographique, les processus d\'audit et MapperX.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
} 