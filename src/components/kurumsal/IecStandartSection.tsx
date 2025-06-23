'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslations } from 'next-intl';
import { FaCheckCircle } from 'react-icons/fa';

const IecStandartSection = () => {
  const t = useTranslations('about.iecStandart');
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const features = [0, 1, 2, 3].map(index => t(`features.${index}`));

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <section className="bg-white py-24 px-4 md:px-16">
      <div className="max-w-screen-xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        {/* Left Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="relative flex justify-start pl-0 md:pl-12"
        >
          <div className="w-full max-w-[600px]">
            <Image
              src="/IEC-62446-3@2x.png"
              alt="IEC Standards"
              width={600}
              height={600}
              className="w-full h-auto"
              priority
            />
          </div>
        </motion.div>

        {/* Right Content */}
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

          <div className="space-y-4">
            {features.map((feature: string, index: number) => (
              <div key={index} className="flex items-start gap-3">
                <FaCheckCircle className="mt-1 text-green-500" size={20} />
                <p className="text-black text-lg">
                  {feature}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default IecStandartSection;