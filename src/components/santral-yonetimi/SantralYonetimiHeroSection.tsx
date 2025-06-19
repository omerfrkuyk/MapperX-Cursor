'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function SantralYonetimiHeroSection() {
  const t = useTranslations('powerPlantManagement.hero');

  return (
    <section className="relative w-full h-screen flex items-center justify-center bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-12 flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="w-full lg:w-1/2 space-y-6">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
            {t('title')}
          </h2>
          <p className="text-lg text-gray-600">
            {t('description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition duration-300">
              {t('buttons.register')}
            </button>
            <button className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition duration-300">
              {t('buttons.contact')}
            </button>
          </div>
        </div>
        <div className="w-full lg:w-1/2 relative">
          <Image
            src="/mapperx-img.png"
            alt={t('image.alt')}
            width={800}
            height={600}
            className="rounded-lg shadow-xl"
          />
        </div>
      </div>
    </section>
  );
}