'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function ThermographicInspectionHero() {
  const t = useTranslations('thermographicInspection');

  return (
    <section className="relative bg-white py-20 px-4 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('subtitle')}
          </h2>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
            {t('title')}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
            {t('description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/kayit"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-700 transition-colors"
            >
              {t('button')}
            </Link>
            <Link
              href="/iletisim"
              className="inline-block bg-white text-blue-600 border-2 border-blue-600 px-8 py-3 rounded-full font-medium hover:bg-blue-50 transition-colors"
            >
              {t('button')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
} 