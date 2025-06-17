'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useRef, useState } from 'react';

const OtonomTermografikMuayeneSection = () => {
  const t = useTranslations('autonomousInspection');
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
    <section className="bg-gray-50 py-28 px-4 md:px-12">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
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
              src="/thermal-inspection/mapperx-fault-type-slider-before-1.png"
              alt="Before thermal inspection"
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
              src="/thermal-inspection/mapperx-fault-type-slider-after-1.png"
              alt="After thermal inspection"
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

        {/* Content */}
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