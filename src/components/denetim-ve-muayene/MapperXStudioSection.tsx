'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { FaCheckCircle } from 'react-icons/fa';

const MapperXStudioSection = () => {
  const t = useTranslations('inspectionAndAudit.mapperXStudio');

  return (
    <section className="bg-white py-24 px-4 md:px-12">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        {/* Sol içerik */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {t('title')}
          </h2>
          <p className="text-black text-lg mb-8">
            {t('description')}
          </p>

          <div className="space-y-6">
            {[1, 2, 3].map((index) => (
              <div key={index} className="flex items-start gap-4">
                <FaCheckCircle className="mt-1 text-green-500" size={20} />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {t(`features.${index}.title`)}
                  </h3>
                  <p className="text-black">
                    {t(`features.${index}.description`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sağ görsel */}
        <div className="relative w-full">
          <Image
            src="/mapperx-studio-1.png"
            alt={t('image.alt')}
            width={1600}
            height={1200}
            className="w-full h-auto rounded-xl"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default MapperXStudioSection;