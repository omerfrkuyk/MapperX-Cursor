'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/lib/i18n/LanguageContext';

const ReportDownloadSection = () => {
  const { translate } = useLanguage();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const validateEmail = (email: string) =>
    /^\S+@\S+\.\S+$/.test(email);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      name: form.name ? '' : translate('reportDownload.form.required'),
      email: validateEmail(form.email) ? '' : translate('reportDownload.form.invalidEmail'),
      phone: form.phone ? '' : translate('reportDownload.form.required'),
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error);
    if (!hasErrors) {
      window.open(
        'https://mapperx.com/wp-content/uploads/2022/10/MapperX-Katalog.pdf',
        '_blank'
      );
    }
  };

  return (
    <section className="bg-[#f9f9f9] py-20 px-4 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Left side: form */}
        <div className="flex-1">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1e2a3a] mb-4">
            {translate('reportDownload.title')}
          </h2>
          <p className="text-gray-700 mb-8 max-w-xl">
            {translate('reportDownload.description')}
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-[#1e2a3a] mb-1">
                {translate('reportDownload.form.fullName')} <span className="text-orange-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full text-black rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1e2a3a] text-sm"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#1e2a3a] mb-1">
                {translate('reportDownload.form.email')} <span className="text-orange-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full text-black rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1e2a3a] text-sm"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#1e2a3a] mb-1">
                {translate('reportDownload.form.phone')} <span className="text-orange-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full text-black rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1e2a3a] text-sm"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>

            <button
              type="submit"
              className="rounded-full border border-[#1e2a3a] text-[#1e2a3a] hover:bg-[#1e2a3a] hover:text-white px-6 py-2 font-medium transition text-sm"
            >
              {translate('reportDownload.form.download')}
            </button>
          </form>
        </div>

        {/* Right side: image */}
        <div className="flex-1">
          <Image
            src="/report-file-1-1.png"
            alt={translate('reportDownload.image.alt')}
            width={500}
            height={500}
            className="object-contain w-full max-w-sm mx-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default ReportDownloadSection;