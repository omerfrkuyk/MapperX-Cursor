import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar"; // << Bunu ekle
import Footer from "@/components/Footer"; // << Bunu ekle (birazdan ekleyeceğiz)
import { LanguageProvider } from "@/lib/i18n/LanguageContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MapperX – Güneş Enerjisi Santralleri için Dijital Dönüşüm",
  description:
    "MapperX ile güneş enerjisi santrallerinizde termografik muayene, denetim ve otonom analiz çözümleri.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
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