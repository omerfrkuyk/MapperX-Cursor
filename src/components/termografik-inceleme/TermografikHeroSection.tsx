'use client';

import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';

// Slider bileşeni (client-side render)
const ReactCompareImage = dynamic(() => import('react-compare-image'), { ssr: false });

const TermografikHeroSection = () => {
  const t = useTranslations('thermographicInspection');

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
          <p className="text-gray-700 text-base md:text-lg mb-6">
            {t('description')}
          </p>

          <div className="flex gap-6 items-center mb-6">
            <a
              href="https://mapperx.com/iletisim/"
              className="text-base font-medium underline underline-offset-4 text-gray-700 hover:text-blue-700"
            >
              {t('buttons.contact')}
            </a>
            <a
              href="https://mapperx.com/iletisim/"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full text-sm font-semibold transition"
            >
              {t('buttons.register')}
            </a>
          </div>
        </div>

        {/* Görsel ve gif */}
        <div className="w-full max-w-[850px] mx-auto relative">
          {/* Sol üst GIF */}
          <div className="absolute -top-16 -left-16 z-20 hidden md:block">
            <img
              src="/thermal-inspection/animation_temp_weather_mapperx-1.gif"
              alt={t('images.temperatureMapAlt')}
              className="w-80 h-80 object-contain"
            />
          </div>

          {/* Karşılaştırmalı görsel */}
          <ReactCompareImage
            leftImage="/thermal-inspection/mapperx-fault-type-slider-before-1.png"
            rightImage="/thermal-inspection/mapperx-fault-type-slider-after-1.png"
            sliderLineWidth={2}
            sliderLineColor="#ffffff"
            handleSize={32}
          />
        </div>
      </div>
    </section>
  );
};

export default TermografikHeroSection; 