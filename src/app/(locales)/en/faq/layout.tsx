import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | MapperX',
  description: 'Find answers to frequently asked questions about solar systems, thermographic inspection, audit processes, and MapperX.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
} 