'use client';

import Image from 'next/image';
import { useState } from 'react';
import clsx from 'classnames';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import Link from 'next/link';
import { getLocalizedRoute } from '@/lib/i18n/routes';

const ThermalInspectionSection = () => {
  const [hovered, setHovered] = useState(false);
  const { translate, currentLanguage } = useLanguage();

  // Özellikleri doğru şekilde al
  const featuresData = translate('thermalInspection.features');
  const features = Array.isArray(featuresData) ? featuresData : [];

  return (
    <section className="bg-[#f9f9f9] py-20 px-4 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10 items-center">
        {/* Görsel */}
        <div
          className="relative w-full md:w-1/2 aspect-[16/9] rounded-2xl overflow-hidden shadow-xl cursor-pointer"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <Image
            src={translate('thermalInspection.images.before.src')}
            alt={translate('thermalInspection.images.before.alt')}
            fill
            className={clsx(
              'transition-opacity duration-700 object-cover z-10',
              hovered ? 'opacity-0' : 'opacity-100'
            )}
            unoptimized
          />

          <Image
            src={translate('thermalInspection.images.after.src')}
            alt={translate('thermalInspection.images.after.alt')}
            fill
            className={clsx(
              'transition-opacity duration-700 object-cover z-20',
              hovered ? 'opacity-100' : 'opacity-0'
            )}
            unoptimized
          />
        </div>

        {/* Metin Alanı */}
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="block text-blue-600">{translate('thermalInspection.title.line1')}</span>
            {translate('thermalInspection.title.line2')}
          </h2>
          <p className="text-gray-700 text-lg mb-8">
            {translate('thermalInspection.description')}
          </p>

          <ul className="space-y-4 mb-8">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-blue-600 text-xl">›</span>
                <span className="text-gray-700">{feature}</span>
            </li>
            ))}
          </ul>

          <Link
            href={getLocalizedRoute('thermographic', currentLanguage)}
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
          >
            {translate('thermalInspection.button')}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ThermalInspectionSection;