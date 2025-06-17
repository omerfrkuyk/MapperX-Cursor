'use client';

const InternshipApplicationForm = () => {
  return (
    <section className="w-full py-28 px-6 md:px-20 bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364] text-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Sol: Başlık kısmı */}
        <div className="text-center lg:text-left space-y-4">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500">
            MapperX
          </h1>
          <p className="text-3xl font-semibold text-white">We are Hiring!</p>
        </div>

        {/* Sağ: Form */}
        <form className="bg-white rounded-2xl p-8 shadow-2xl text-[#0f2027] space-y-6">
          {/* Ad Soyad */}
          <div>
            <label className="block font-semibold mb-1">Ad Soyad</label>
            <input
              type="text"
              placeholder="Adınızı ve soyadınızı girin"
              className="w-full border border-gray-300 rounded-md px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* E-Posta */}
          <div>
            <label className="block font-semibold mb-1">E-Posta</label>
            <input
              type="email"
              placeholder="E-posta adresinizi girin"
              className="w-full border border-gray-300 rounded-md px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Telefon */}
          <div>
            <label className="block font-semibold mb-1">Telefon Numarası</label>
            <input
              type="tel"
              placeholder="Telefon numaranızı girin"
              className="w-full border border-gray-300 rounded-md px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Üniversite */}
          <div>
            <label className="block font-semibold mb-1">Üniversite / Bölüm</label>
            <input
              type="text"
              placeholder="Örnek: Bilkent Üniversitesi, Bilgisayar Mühendisliği"
              className="w-full border border-gray-300 rounded-md px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Sınıf */}
          <div>
            <label className="block font-semibold mb-1">Sınıf</label>
            <select
              className="w-full border border-gray-300 rounded-md px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Sınıfınızı seçin</option>
              <option>Hazırlık</option>
              <option>1. Sınıf</option>
              <option>2. Sınıf</option>
              <option>3. Sınıf</option>
              <option>4. Sınıf</option>
              <option>Mezun</option>
            </select>
          </div>

          {/* Zorunlu staj mı */}
          <div>
            <label className="block font-semibold mb-1">Staj Zorunlu mu?</label>
            <select
              className="w-full border border-gray-300 rounded-md px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Seçiniz</option>
              <option>Evet</option>
              <option>Hayır</option>
            </select>
          </div>

          {/* Staj Tarihleri */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block font-semibold mb-1">Staj Başlangıç Tarihi</label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-md px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="flex-1">
              <label className="block font-semibold mb-1">Staj Bitiş Tarihi</label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-md px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          {/* CV Yükleme */}
          <div>
            <label className="block font-semibold mb-1">CV Yükle</label>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              className="w-full border border-gray-300 rounded-md px-4 py-3 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
            />
          </div>

          {/* Kısa Not */}
          <div>
            <label className="block font-semibold mb-1">Kısa Not</label>
            <textarea
              rows={4}
              placeholder="Kendinizden kısaca bahsedin..."
              className="w-full border border-gray-300 rounded-md px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
            ></textarea>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold py-3 rounded-md hover:opacity-90 transition"
          >
            Başvuruyu Gönder
          </button>
        </form>
      </div>
    </section>
  );
};

export default InternshipApplicationForm;