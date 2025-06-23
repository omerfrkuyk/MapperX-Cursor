"use client";

import Link from "next/link";
import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface PricingPlan {
  name: string;
  price: string;
  features: string[];
}

const PricingSection = () => {
  const { translate, isLoading } = useLanguage();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const plans = translate('pricing.plans') as PricingPlan[];

  if (!Array.isArray(plans)) {
    console.error('Pricing plans data is not an array:', plans);
    return null;
  }

  return (
    <section className="bg-[#f9f9f9] py-20 px-4 md:px-12">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900">{translate('pricing.title')}</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {plans.map((plan: PricingPlan, index: number) => (
          <div
            key={index}
            className={`rounded-3xl shadow-xl p-8 transition-transform duration-300 hover:scale-[1.02] relative overflow-hidden ${
              index === 1
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-800"
            }`}
          >
            {index === 1 && (
              <div className="absolute top-0 right-0 bg-blue-500 w-24 h-24 rounded-bl-full opacity-20 animate-pulse" />
            )}
            <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
            <p className="text-4xl font-semibold mb-6">
              {plan.price}
              <span className="text-sm font-normal ml-2 align-middle">
                {translate('pricing.perMwp')}
              </span>
            </p>
            <ul className="text-sm space-y-3 mb-6">
              {Array.isArray(plan.features) && plan.features.map((feature: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2">
                  <FaCheckCircle className="mt-1 text-green-500" size={20} />
                  {feature}
                </li>
              ))}
            </ul>
            <Link
              href="/fiyatlar"
              className={`block text-center rounded-full px-6 py-3 font-medium text-sm transition ${
                index === 1
                  ? "bg-white text-blue-600 hover:bg-gray-100"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {translate('pricing.calculatePrice')}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PricingSection;