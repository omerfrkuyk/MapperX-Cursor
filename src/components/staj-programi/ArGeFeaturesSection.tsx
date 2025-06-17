"use client";

import { FaCube, FaLeaf, FaPencilAlt, FaFeatherAlt } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

const features = [
  {
    title: "Ar-Ge Projeleri",
    description:
      "MapperX’te, teknoloji ve yeniliğin kalbinde yer alan Ar-Ge projeleri yürütüyoruz. Geliştirdiğimiz projelerle sektördeki sorunlara çözümler üretiyor, verimliliği artırıyor ve yenilikçi teknolojileri hayata geçiriyoruz.",
    icon: <FaCube size={32} className="text-blue-500" />,
  },
  {
    title: "Doğaya Saygı",
    description:
      "MapperX, çevresel sürdürülebilirliği ön planda tutar ve doğaya saygılı projeler geliştirir. Tüm faaliyetlerimizde doğaya olan etkileri en aza indirmeyi hedefliyoruz.",
    icon: <FaLeaf size={32} className="text-green-500" />,
  },
  {
    title: "Akademik Araştırmalar",
    description:
      "MapperX, akademik araştırmaların pratiğe dönüştüğü bir platformdur. Üniversitelerle iş birliği yaparak elde edilen bilgileri uygulamaya geçiriyoruz.",
    icon: <FaPencilAlt size={32} className="text-indigo-500" />,
  },
  {
    title: "Sıfır Karbon Projeleri",
    description:
      "MapperX, sıfır karbon hedefi doğrultusunda projeler geliştirir. Yenilenebilir enerji kaynaklarına yönelik çözümlerle karbon ayak izimizi azaltıyoruz.",
    icon: <FaFeatherAlt size={32} className="text-sky-500" />,
  },
];

const ArGeFeaturesSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="w-full bg-white py-24 px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12" ref={ref}>
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="p-6 bg-gray-50 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border-t-4 border-blue-100"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-[#0f2027]">{feature.title}</h3>
              <p className="text-gray-700 text-base leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArGeFeaturesSection;