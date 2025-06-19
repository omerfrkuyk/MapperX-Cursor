"use client";

import { useTranslations } from "next-intl";

interface PricingComparisonProps {
  locale: string;
}

export default function PricingComparison({ locale }: PricingComparisonProps) {
  const t = useTranslations('pricing.pricingComparison');

  const features = [
    { key: "gsd", label: t('features.gsd') },
    { key: "flightLevel", label: t('features.flightLevel') },
    { key: "inspectionType", label: t('features.inspectionType') },
    { key: "detailLevel", label: t('features.detailLevel') },
    { key: "anomalyTypes", label: t('features.anomalyTypes') },
    { key: "bosModule", label: t('features.bosModule') },
    { key: "thermalRgb", label: t('features.thermalRgb') },
    { key: "workOrders", label: t('features.workOrders') },
    { key: "serialNumber", label: t('features.serialNumber') },
    { key: "efficiency", label: t('features.efficiency') },
    { key: "reporting", label: t('features.reporting') },
    { key: "description", label: t('features.description') },
    { key: "detectedIssues", label: t('features.detectedIssues') }
  ];

  const plans = ["starter", "professional", "enterprise"];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="w-full overflow-x-auto bg-white rounded-xl shadow-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-4 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-xl"></th>
              {plans.map((plan, index) => (
                <th 
                  key={plan} 
                  className={`px-6 py-4 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                    index === plans.length - 1 ? 'rounded-tr-xl' : ''
                  }`}
                >
                  {t(`plans.${plan}.name`)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {features.map(({ key, label }, rowIndex) => (
              <tr 
                key={key}
                className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {label}
                </td>
                {plans.map((plan) => (
                  <td 
                    key={`${plan}-${key}`} 
                    className="px-6 py-4 whitespace-normal text-sm text-gray-600 hover:bg-blue-50 transition-colors duration-150"
                  >
                    {t(`plans.${plan}.${key}`)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 