'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { getLocalizedRoute } from '@/lib/i18n/routes';

const PartnershipSection = () => {
  const { translate, currentLanguage } = useLanguage();

  return (
    <section className="bg-white py-24 px-6 md:px-16">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
        
        {/* Görsel */}
        <div className="w-full lg:w-1/3 flex justify-center">
          <Image
            src={translate('partnership.image.src')}
            alt={translate('partnership.image.alt')}
            width={400}
            height={400}
            className="w-auto h-[220px] md:h-[260px] object-contain"
          />
        </div>

        {/* Drone Pilot Ağı */}
        <div className="w-full lg:w-1/3 text-center lg:text-left space-y-6">
          <h3 className="text-3xl font-extrabold text-gray-900">
            {translate('partnership.dronePilot.title')}
          </h3>
          <p className="text-lg text-gray-700 leading-relaxed">
            {translate('partnership.dronePilot.description')}
          </p>
          <Link
            href={getLocalizedRoute('contact', currentLanguage)}
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-base font-semibold px-7 py-3 rounded-full transition"
          >
            {translate('partnership.dronePilot.button')}
          </Link>
        </div>

        {/* Partner Programı */}
        <div className="w-full lg:w-1/3 bg-blue-600 text-white p-8 rounded-2xl text-center space-y-5 shadow-md">
          <h3 className="text-3xl font-extrabold">
            {translate('partnership.partnerProgram.title')}
          </h3>
          <p className="text-lg leading-relaxed">
            {translate('partnership.partnerProgram.description')}
          </p>
          <Link
            href={getLocalizedRoute('contact', currentLanguage)}
            className="inline-block bg-white text-blue-700 text-base font-semibold px-7 py-3 rounded-full hover:bg-gray-100 transition"
          >
            {translate('partnership.partnerProgram.button')}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PartnershipSection;