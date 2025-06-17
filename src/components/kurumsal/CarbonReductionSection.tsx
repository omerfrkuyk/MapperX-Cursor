'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const CarbonReductionSection = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const fadeInVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section className="bg-gray-50 px-4 md:px-16 py-24">
      <div className="max-w-screen-xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        {/* Sol Metin */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={fadeInVariant}
        >
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-6">
            MapperX ile Karbon Emisyonunu Azaltın
          </h2>
          <p className="text-gray-700 text-base md:text-lg mb-6">
            MapperX, çevreye duyarlı bir teknoloji olarak yeşil dönüşüm hedeflerine 
            önemli katkılarda bulunur. Gelişmiş izleme ve analiz sistemleri sayesinde 
            enerji verimliliğini artırır ve bakım süreçlerini optimize eder. Bu sayede, 
            enerji tüketimi ve karbon emisyonları önemli ölçüde azalır. MapperX, doğru zamanda 
            ve doğru yerde yapılan müdahaleler ile enerji kaynaklarının daha verimli 
            kullanılmasını sağlar. Böylece, işletme maliyetlerini düşürürken çevresel etkileri de 
            en aza indirir.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-gray-900 text-lg mb-2">
                Enerji Verimliliği
              </h4>
              <p className="text-gray-700">
                Gelişmiş izleme ve analiz sistemleri ile enerji verimliliğini artırarak karbon emisyonlarını azaltır.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 text-lg mb-2">
                Sürdürülebilirlik
              </h4>
              <p className="text-gray-700">
                Doğru zamanda yapılan müdahalelerle çevresel etkileri minimize ederek sürdürülebilir bir geleceğe katkıda bulunur.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Sağ Görsel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="w-full"
        >
          <Image
            src="/mapperx-carbon-zero-1.png"
            alt="Karbon Emisyonu"
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