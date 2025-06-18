import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Häufig gestellte Fragen | MapperX',
  description: 'Finden Sie hier Antworten auf häufig gestellte Fragen zu Solaranlagen, thermografischer Inspektion, Prüfprozessen und MapperX.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
} 