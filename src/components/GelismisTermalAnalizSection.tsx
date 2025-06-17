'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useRef, useState } from 'react';

const GelismisTermalAnalizSection = () => {
  const t = useTranslations('thermalAnalysis');
  const [sliderPosition, setSliderPosition] = useState(50);
  const sliderContainerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent) => {
    if (!sliderContainerRef.current) return;
    
    const rect = sliderContainerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderPosition(percentage);
  };

  const handleMouseDown = () => {
    if (!sliderContainerRef.current) return;
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', handleMouseMove);
    }, { once: true });
  };

  return (
    <section className="bg-gray-50 py-24 px-4 md:px-12">
      <div className="max-w-[1600px] mx-auto grid md:grid-cols-2 gap-16 items-center">
        {/* Sol içerik */}
        <div>
          <h4 className="text-gray-900 font-semibold text-base md:text-lg mb-2">
            {t('title.line1')}
          </h4>
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-6">
            {t('title.line2')}
          </h2>
          <p className="text-gray-700 text-base md:text-lg mb-6">
            {t('description')}
          </p>

          <ul className="space-y-4 text-gray-700 text-base md:text-lg">
            {t.raw('features').map((feature: string, index: number) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-blue-600 text-xl">›</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Image Comparison Slider */}
        <div 
          ref={sliderContainerRef}
          className="relative w-full h-[400px] overflow-hidden rounded-xl shadow-xl cursor-ew-resize select-none"
          onMouseDown={handleMouseDown}
          onTouchStart={(e) => {
            const touch = e.touches[0];
            handleMouseMove(touch as unknown as MouseEvent);
          }}
          onTouchMove={(e) => {
            const touch = e.touches[0];
            handleMouseMove(touch as unknown as MouseEvent);
          }}
        >
          {/* Before Image (Left Side) */}
          <div className="absolute inset-0">
            <Image
              src={t('images.left.src')}
              alt={t('images.left.alt')}
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
          
          {/* After Image (Right Side) */}
          <div 
            className="absolute inset-0"
            style={{ 
              clipPath: `polygon(${sliderPosition}% 0, 100% 0, 100% 100%, ${sliderPosition}% 100%)`
            }}
          >
            <Image
              src={t('images.right.src')}
              alt={t('images.right.alt')}
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
          
          {/* Slider Handle */}
          <div 
            className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M10 8L6 12L10 16M14 8L18 12L14 16" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GelismisTermalAnalizSection;