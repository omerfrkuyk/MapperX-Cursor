'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslations } from 'next-intl';

const AnomaliTurleriSection = () => {
  const t = useTranslations('thermographicInspection.anomalyTypes');
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <section className="bg-white py-24 px-4 md:px-16">
      <div className="max-w-screen-xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        {/* Left Content */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.8, ease: 'easeOut' }
            }
          }}
          className="space-y-6"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            {t('title')}
          </h2>
          <p className="text-gray-700 text-lg mb-8">
            {t('description')}
          </p>

          <div className="space-y-4">
            {[0, 1, 2].map((index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="text-blue-600 mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </div>
                <p className="text-gray-700 text-lg">
                  {t(`features.${index}`)}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <Image
            src="/thermal-inspection/mapperx-santral-gorunumu-7-1.png"
            alt={t('title')}
            width={800}
            height={500}
            className="w-full h-auto rounded-2xl shadow-lg"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default AnomaliTurleriSection;