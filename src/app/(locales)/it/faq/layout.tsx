import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Domande Frequenti | MapperX',
  description: 'Trova risposte alle domande frequenti sui sistemi solari, l\'ispezione termografica, i processi di verifica e MapperX.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
} 