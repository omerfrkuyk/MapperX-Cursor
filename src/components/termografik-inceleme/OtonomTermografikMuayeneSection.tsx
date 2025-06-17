'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

const OtonomTermografikMuayeneSection = () => {
  const t = useTranslations('autonomousInspection');

  return (
    <section className="bg-gray-50 py-28 px-4 md:px-12">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        {/* Görsel */}
        <div>
          <Image
            src="/thermal-inspection/mapperx-santral-gorunumu-6-1.png"
            alt={t('image.alt')}
            width={1024}
            height={768}
            className="w-full rounded-xl shadow-xl"
          />
        </div>

        {/* İçerik */}
        <div>
          <h4 className="text-black font-semibold text-lg mb-3">
            {t('subtitle')}
          </h4>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5 leading-snug">
            {t('title')}
          </h2>
          <p className="text-gray-700 text-base md:text-lg mb-6 leading-relaxed">
            {t('description')}
          </p>

          <ul className="space-y-4 text-gray-800 text-base md:text-lg">
            {t.raw('features').map((feature: string, index: number) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-blue-600 text-2xl leading-none">›</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default OtonomTermografikMuayeneSection;