'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

const AboutHeroSection = () => {
  const t = useTranslations('about.hero');

  return (
    <section className="bg-white pt-28 px-4 md:px-12">
      <div className="w-full max-w-none mx-auto grid md:grid-cols-2 items-center gap-20">
        {/* Left image */}
        <div className="px-4 md:px-12">
          <Image
            src="/mapperx-solarpanel-aboutus-1.png"
            alt={t('title')}
            width={1200}
            height={900}
            className="w-full rounded-2xl object-cover"
          />
        </div>

        {/* Right text */}
        <div className="px-4 md:px-8">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
            {t('title')}
          </h2>

          <div className="space-y-6">
            <div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                {t('mapperxTechnology')}
              </h4>
              <p className="text-black">
                {t('mapperxDescription')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  {t('operationalEfficiency')}
                </h4>
                <p className="text-black">
                  {t('operationalDescription')}
                </p>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  {t('proactiveMaintenance')}
                </h4>
                <p className="text-black">
                  {t('proactiveDescription')}
                </p>
              </div>
            </div>

            <div>
              <a
                href="/iletisim"
                className="inline-block mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition"
              >
                {t('contactUs')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHeroSection;