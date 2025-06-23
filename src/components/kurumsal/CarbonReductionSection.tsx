'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { motion, useAnimation, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslations } from 'next-intl';

const CarbonReductionSection = () => {
  const t = useTranslations('about.carbonReduction');
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const fadeInVariant: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] },
    },
  };

  return (
    <section className="bg-gray-50 px-4 md:px-16 py-24">
      <div className="max-w-screen-xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        {/* Left Text */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={fadeInVariant}
        >
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-6">
            {t('title')}
          </h2>
          <p className="text-black text-base md:text-lg mb-8">
            {t('description')}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-gray-900 text-lg mb-2">
                {t('energyEfficiency')}
              </h4>
              <p className="text-black">
                {t('energyDescription')}
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 text-lg mb-2">
                {t('sustainability')}
              </h4>
              <p className="text-black">
                {t('sustainabilityDescription')}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="w-full"
        >
          <Image
            src="/mapperx-carbon-zero-1.png"
            alt={t('title')}
            width={800}
            height={600}
            className="w-full h-auto rounded-2xl shadow-xl"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default CarbonReductionSection;