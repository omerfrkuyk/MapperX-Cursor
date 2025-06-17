'use client';

import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

const YesilZekaSection = () => {
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
          alt="Yeşil Zeka Logo"
          width={200}
          height={80}
          className="mx-auto mb-6"
        />
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
          Dünyada karbon salınımını azaltmaya yönelik yapılan çalışmalar kapsamında
          geliştirdiğimiz teknolojilerle bu sürece destek olmaktan mutluluk duyuyoruz.
          <br />
          <span className="font-semibold text-[#0f2027]">
            “Yeşil Zeka”
          </span>{' '}
          teması ile yenilenebilir enerji kaynaklarının verimliliğini artırmak için
          yapay zeka yazılımları geliştiriyoruz.
        </p>
      </motion.div>
    </section>
  );
};

export default YesilZekaSection;