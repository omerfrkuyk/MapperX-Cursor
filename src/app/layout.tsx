import './globals.css';
import { LanguageProvider } from '@/lib/i18n/LanguageContext';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import JsonLd, { organizationJsonLd, websiteJsonLd } from '@/components/JsonLd';
import ClientLayout from '@/components/ClientLayout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MapperX',
  description: 'MapperX - Solar Power Plant Management Software',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <JsonLd type="Organization" data={organizationJsonLd} />
        <JsonLd type="WebSite" data={websiteJsonLd} />
      </head>
      <body className={inter.className}>
        <LanguageProvider>
          <ClientLayout>
            {children}
          </ClientLayout>
        </LanguageProvider>
      </body>
    </html>
  );
}