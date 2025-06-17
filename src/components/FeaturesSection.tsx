'use client';

import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import FeatureModal from './FeatureModal';

interface Feature {
  title: string;
  description: string;
  image: string;
}

const FeaturesSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { translate } = useLanguage();

  // Çeviri verilerini doğru şekilde al
  const featuresData = translate('features.items');
  const features = Array.isArray(featuresData) ? featuresData : [];

  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    loop: true,
    mode: "snap",
    slides: { perView: 1, spacing: 20 },
    breakpoints: {
      "(min-width: 768px)": {
        slides: { perView: 2, spacing: 20 },
      },
      "(min-width: 1280px)": {
        slides: { perView: 3, spacing: 30 },
      },
    },
    slideChanged: (s) => {
      setCurrentSlide(s.track.details.rel);
    },
  });

  const [selectedFeature, setSelectedFeature] = useState<number | null>(null);

  // Otomatik geçiş için interval
  useEffect(() => {
    const interval = setInterval(() => {
      if (instanceRef.current) {
        instanceRef.current.next();
      }
    }, 5000); // 5 saniye

    return () => clearInterval(interval);
  }, [instanceRef]);

  // Slider'ı yeniden başlat
  useEffect(() => {
    if (instanceRef.current) {
      instanceRef.current.update();
    }
  }, [features, instanceRef]);

  return (
    <section className="bg-[#f9f9f9] py-20 px-4 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Başlık */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
          {translate('features.section.title')}
        </h2>
        <p className="text-gray-600 text-lg mb-10">
          {translate('features.section.subtitle')}
        </p>

        {/* Slider Container */}
        <div className="relative">
        {/* Slider */}
          <div ref={sliderRef} className="keen-slider min-h-[700px]">
            {features.map((feature: Feature, index: number) => (
            <div
              key={index}
                className="keen-slider__slide"
              >
                <div 
                  className="mx-2 h-full cursor-pointer group"
              onClick={() => setSelectedFeature(index)}
            >
                  <div className="relative rounded-2xl overflow-hidden shadow-lg transition-all duration-300 group-hover:shadow-2xl h-[650px]">
              <img
                src={feature.image}
                alt={feature.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                      <h3 className="text-white text-xl font-semibold">
                {feature.title}
                      </h3>
                    </div>
                  </div>
              </div>
            </div>
          ))}
        </div>

          {/* Navigation Arrows */}
          {features.length > 1 && (
            <>
              <button
                onClick={() => instanceRef.current?.prev()}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 bg-white/80 backdrop-blur-sm hover:bg-white text-gray-800 p-3 rounded-full shadow-lg z-10 transition-all duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>
              <button
                onClick={() => instanceRef.current?.next()}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 bg-white/80 backdrop-blur-sm hover:bg-white text-gray-800 p-3 rounded-full shadow-lg z-10 transition-all duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </>
          )}

        {/* Pagination Dots */}
          {features.length > 1 && (
        <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: features.length }).map((_, idx) => (
            <button
                  key={idx}
                  onClick={() => instanceRef.current?.moveToIdx(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    currentSlide === idx
                      ? 'bg-blue-600 scale-125'
                  : 'bg-gray-400 opacity-50 hover:opacity-80'
              }`}
                  aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
          )}
      </div>

      {/* Modal */}
      {selectedFeature !== null && (
        <FeatureModal
          feature={features[selectedFeature]}
          onClose={() => setSelectedFeature(null)}
        />
      )}
      </div>
    </section>
  );
};

export default FeaturesSection;