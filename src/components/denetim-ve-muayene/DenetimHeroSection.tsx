'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

const DenetimHeroSection = () => {
  const t = useTranslations('inspectionAndAudit.hero');

  return (
    <section className="bg-white py-36 px-4 md:px-12">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start relative">
        {/* Sol içerik */}
        <div>
          <h4 className="text-black font-semibold text-base md:text-lg mb-3">
            {t('subtitle')}
          </h4>
          <h1 className="text-3xl md:text-5xl font-bold text-blue-700 leading-tight mb-6">
            {t('title')}
          </h1>
          <p className="text-gray-700 text-base md:text-lg mb-8">
            {t('description')}
          </p>

          <div className="flex gap-6 items-center">
            <a
              href="https://mapperx.com/iletisim/"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-base font-semibold transition"
            >
              {t('buttons.register')}
            </a>
            <a
              href="https://mapperx.com/iletisim/"
              className="text-gray-700 hover:text-blue-700 text-base font-medium underline underline-offset-4"
            >
              {t('buttons.contact')}
            </a>
          </div>
        </div>

        {/* Sağ görsel */}
        <div className="w-full max-w-[850px] mx-auto relative">
          <Image
            src="/features/mapperx-ges-bakim-1-1.png"
            alt={t('image.alt')}
            width={1024}
            height={768}
            className="w-full rounded-xl"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default DenetimHeroSection;