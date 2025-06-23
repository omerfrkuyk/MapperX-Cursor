import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar"; // << Bunu ekle
import Footer from "@/components/Footer"; // << Bunu ekle (birazdan ekleyeceğiz)
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import JsonLd, { organizationJsonLd, websiteJsonLd } from "@/components/JsonLd";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://mapperx.com'),
  title: "MapperX | Güneş Enerjisi Santralleri için Yapay Zeka Destekli Otonom Çözümler",
  description: "MapperX, güneş enerjisi santrallerinde termografik muayene, denetim ve otonom analiz çözümleri sunar. Yapay zeka destekli teknolojilerle verimliliğinizi artırın.",
  keywords: "MapperX, güneş enerjisi, termografik muayene, yapay zeka, otonom analiz, santral yönetimi",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification', // Google Search Console doğrulama kodu eklenecek
  },
  alternates: {
    canonical: '/',
    languages: {
      'tr': '/tr',
      'en': '/en',
      'de': '/de',
      'fr': '/fr',
      'it': '/it',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://mapperx.com',
    siteName: 'MapperX',
    title: 'MapperX | Güneş Enerjisi Santralleri için Yapay Zeka Destekli Otonom Çözümler',
    description: 'MapperX, güneş enerjisi santrallerinde termografik muayene, denetim ve otonom analiz çözümleri sunar.',
    images: [
      {
        url: '/og-image.jpg', // Sosyal medya için özel görsel eklenecek
        width: 1200,
        height: 630,
        alt: 'MapperX Platform Overview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@MapperX',
    creator: '@MapperX',
    title: 'MapperX | Güneş Enerjisi Çözümleri',
    description: 'Güneş enerjisi santrallerinde yapay zeka destekli otonom çözümler.',
    images: ['/twitter-image.jpg'], // Twitter için özel görsel eklenecek
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <head>
        <JsonLd type="Organization" data={organizationJsonLd} />
        <JsonLd type="WebSite" data={websiteJsonLd} />
      </head>
      <body className={inter.className}>
        <LanguageProvider>
          <Navbar /> {/* Navbar burada */}
          {children}
          <Footer /> {/* Footer burada */}
        </LanguageProvider>
      </body>
    </html>
  );
}