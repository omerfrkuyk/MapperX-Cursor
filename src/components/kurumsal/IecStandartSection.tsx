'use client';

import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

const IecStandartSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section className="bg-[#F9F9F9] py-24 px-6 md:px-20">
      <div className="max-w-screen-xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        {/* Sol görsel */}
        <div className="flex justify-center">
          <Image
            src="/IEC-62446-3@2x.png"
            alt="IEC 62446 Standardı"
            width={500}
            height={500}
            className="w-full max-w-[500px] h-auto"
          />
        </div>

        {/* Sağ yazı */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-6">
            IEC Standartlarına Tam Uyum
          </h2>
          <ul className="space-y-4 text-base text-gray-700">
            <li>➤ MapperX, uluslararası kabul görmüş IEC 62446 standartlarına tam uyum sağlayarak hizmet verir.</li>
            <li>➤ Bu standartlar, fotovoltaik sistemlerin güvenli ve verimli çalışmasını sağlamak için gerekli olan test ve belgelendirme süreçlerini belirler.</li>
            <li>➤ MapperX’in bu standartlara uygun denetim ve analizleri, müşterilere güvenilir ve doğrulanabilir sonuçlar sunar.</li>
            <li>➤ Bu sayede, müşterilerin tesislerinin güvenliği ve performansı garanti altına alınmış olur. MapperX, kalite ve güvenlik konularında en üst seviyede hizmet sunmayı taahhüt eder.</li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default IecStandartSection;