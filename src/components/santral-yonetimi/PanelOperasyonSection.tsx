'use client';

import Image from 'next/image';

const PanelOperasyonSection = () => {
  return (
    <section className="bg-white py-24 px-6 md:px-16">
      <div className="max-w-screen-2xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        {/* Sol görsel */}
        <div className="w-full">
          <Image
            src="/panel-operasyon-status-1.png"
            alt="Panel Operasyon Durumu"
            width={1400}
            height={800}
            className="w-full h-auto rounded-xl shadow-xl"
          />
        </div>

        {/* Sağ içerik */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Gerçek Zamanlı Operasyon Yönetimi</h3>
          <p className="text-gray-700 text-base md:text-lg mb-6">
            İşletme ve bakım faaliyetlerinde operasyonel durumunun izlenmesi, santral verimliliğini artırmak ve kesintisiz enerji üretimini sağlamak için kritik öneme sahiptir. Santralinizin anlık operasyonel durumunu izleyin ve yönetin. Gerçek zamanlı verilerle, santralinizin performansını sürekli olarak takip edin ve potansiyel sorunları erken tespit ederek hızlı müdahalelerde bulunun.
          </p>

          <ul className="space-y-4 text-gray-700 text-base md:text-lg">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 text-xl">›</span>
              Operasyonlarınızı saniyeler için raporlayarak güncel durumu takip edin.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 text-xl">›</span>
              Santralinizin anlık verilerini takip edin ve performansını değerlendirin.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 text-xl">›</span>
              Santral verimliliğini artırarak enerji üretiminde kesintisizliği sağlayın.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default PanelOperasyonSection;