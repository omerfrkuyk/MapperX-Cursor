'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n/LanguageContext';

const CompatibleDronesSection = () => {
  const { translate } = useLanguage();

  // Drone verilerini çeviriden al
  const dronesData = translate('compatibleDrones.drones');
  const drones = Array.isArray(dronesData) ? dronesData : [];

  // Description'ı parçalara ayır
  const description = translate('compatibleDrones.description');
  const [beforeLink, afterLink] = description.split('{helpCenter}');

  return (
    <section className="bg-[#f9f9f9] py-20 px-4 md:px-12 text-center">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
          {translate('compatibleDrones.title')}
        </h2>
        <p className="text-gray-700 mb-10 text-lg">
          {beforeLink}
          <Link
            href="https://support.mapperx.com"
            target="_blank"
            className="text-blue-600 underline hover:text-blue-800"
          >
            {translate('compatibleDrones.helpCenter')}
          </Link>
          {afterLink}
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-end justify-items-center">
          {drones.map((drone, index) => (
            <motion.div
              key={drone.name}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.3 }}
              className="flex flex-col items-center"
            >
              <Image
                src={drone.image}
                alt={drone.name}
                width={200}
                height={200}
                className="w-auto h-40 object-contain"
                unoptimized
              />
              <p className="mt-4 text-sm font-medium text-gray-900">{drone.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompatibleDronesSection;