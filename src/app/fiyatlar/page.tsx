// src/app/fiyatlar/page.tsx
import PricingSection from '@/components/PricingPage/PricingSection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MapperX Fiyatlar | Planlar ve Özellikler',
  description: 'MapperX platformunun fiyatlandırma planlarını karşılaştırın. Güneş enerjisi projeleriniz için en uygun paketi bulun.',
  keywords: ['MapperX fiyatlar', 'Güneş Enerjisi Platformu', 'plan karşılaştırma', 'MapperX abonelik'],
};

export default function PricingPage() {
  return <PricingSection />;
}