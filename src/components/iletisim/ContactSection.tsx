'use client';

import { useTranslations } from 'next-intl';

const ContactSection = () => {
  const t = useTranslations('contact');

  return (
    <section className="w-full py-40 px-6 md:px-32 bg-white text-[#0f2027]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
        {/* Left: Address and Form */}
        <div className="space-y-16">
          {/* Contact Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-lg">
            <div>
              <h3 className="text-3xl font-bold mb-4">{t('headquarters.title')}</h3>
              <p><strong>{t('address')}:</strong> {t('headquarters.address')}</p>
              <p><strong>T:</strong> <a href="tel:08502598284" className="text-blue-500">0850 259 82 84</a></p>
              <p><strong>M:</strong> <a href="mailto:info@mapperx.com" className="text-blue-500">info@mapperx.com</a></p>
            </div>
            <div>
              <h3 className="text-3xl font-bold mb-4">{t('rdCenter.title')}</h3>
              <p><strong>{t('address')}:</strong> {t('rdCenter.address')}</p>
              <p><strong>T:</strong> <a href="tel:08502598284" className="text-blue-500">0850 259 82 84</a></p>
              <p><strong>M:</strong> <a href="mailto:info@mapperx.com" className="text-blue-500">info@mapperx.com</a></p>
            </div>
          </div>

          {/* Form */}
          <form className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8 text-base bg-white shadow-xl p-10 rounded-2xl border border-gray-100">
            <div className="col-span-1">
              <label className="block text-gray-700 font-medium mb-2">{t('form.fullName')} *</label>
              <input type="text" placeholder={t('form.fullName')} required className="w-full px-6 py-4 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>
            <div className="col-span-1">
              <label className="block text-gray-700 font-medium mb-2">{t('form.companyName')}</label>
              <input type="text" placeholder={t('form.companyName')} className="w-full px-6 py-4 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>
            <div className="col-span-1">
              <label className="block text-gray-700 font-medium mb-2">{t('form.city')}</label>
              <input type="text" placeholder={t('form.city')} className="w-full px-6 py-4 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>
            <div className="col-span-1">
              <label className="block text-gray-700 font-medium mb-2">{t('form.email')} *</label>
              <input type="email" placeholder={t('form.email')} required className="w-full px-6 py-4 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>
            <div className="col-span-2">
              <label className="block text-black font-medium mb-2">{t('form.companyType.label')}</label>
              <select required className="w-full px-6 py-4 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
                <option value="">{t('form.select')}</option>
                <option>{t('form.companyType.options.epc')}</option>
                <option>{t('form.companyType.options.om')}</option>
                <option>{t('form.companyType.options.siteOwner')}</option>
                <option>{t('form.companyType.options.technicalTeam')}</option>
                <option>{t('form.companyType.options.droneService')}</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-black font-medium mb-2">{t('form.siteCapacity.label')}</label>
              <select required className="w-full px-6 py-4 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
                <option value="">{t('form.select')}</option>
                <option>&lt; 1 MW</option>
                <option>1–5 MW</option>
                <option>5–20 MW</option>
                <option>&gt; 20 MW</option>
              </select>
            </div>
            <div className="col-span-2">
              <button type="submit" className="bg-[#0f2027] text-white text-lg px-8 py-4 rounded-xl hover:bg-[#203a43] transition-all w-full shadow-md">
                {t('form.submit')}
              </button>
            </div>
          </form>
        </div>

        {/* Right: Map */}
<div className="w-full h-[600px] rounded-2xl overflow-hidden shadow-2xl">
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12239.051176934178!2d32.855867!3d39.9137478!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d34f0a7ea5f5d7%3A0x2288a27591a8367b!2sKavakl%C4%B1dere%2C%20B%C3%BCkl%C3%BCm%20Cd.%20No%3A11%2F5%2C%2006600%20%C3%87ankaya%2FAnkara!5e0!3m2!1str!2str!4v1717365394464!5m2!1str!2str"
    width="100%"
    height="100%"
    loading="lazy"
    className="border-0"
    allowFullScreen
  ></iframe>
</div>
      </div>
    </section>
  );
};

export default ContactSection;