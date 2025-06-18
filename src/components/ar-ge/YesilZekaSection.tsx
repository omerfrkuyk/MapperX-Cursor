'use client';

import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n/LanguageContext';

const YesilZekaSection = () => {
  const { translate } = useLanguage();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section
      ref={ref}
      className="w-full bg-white py-20 px-6 md:px-20 flex flex-col items-center text-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="max-w-4xl"
      >
        <Image
          src="/yesil-zeka.webp"
          alt={translate('rAndD.greenAI.highlight')}
          width={200}
          height={80}
          className="mx-auto mb-6"
        />
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
          {translate('rAndD.greenAI.description')}
          <br />
          <span className="font-semibold text-[#0f2027]">
            {translate('rAndD.greenAI.highlight')}
          </span>{' '}
          {translate('rAndD.greenAI.subDescription')}
        </p>
      </motion.div>
    </section>
  );
};

export default YesilZekaSection;