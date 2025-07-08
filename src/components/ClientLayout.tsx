'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/admin');

  // Admin sayfalarında navbar ve footer'ı gösterme
  if (isAdminPage) {
    return <>{children}</>;
  }

  // Normal sayfalarda navbar ve footer'ı göster
  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        {children}
      </div>
      <Footer />
    </>
  );
} 