"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";

const PricingComparison = () => {
  const { translate } = useLanguage();

  const features = [
    { key: "gsd", label: translate("pricingComparison.features.gsd") },
    { key: "flightLevel", label: translate("pricingComparison.features.flightLevel") },
    { key: "inspectionType", label: translate("pricingComparison.features.inspectionType") },
    { key: "detailLevel", label: translate("pricingComparison.features.detailLevel") },
    { key: "anomalyTypes", label: translate("pricingComparison.features.anomalyTypes") },
    { key: "bosModule", label: translate("pricingComparison.features.bosModule") },
    { key: "thermalRgb", label: translate("pricingComparison.features.thermalRgb") },
    { key: "workOrders", label: translate("pricingComparison.features.workOrders") },
    { key: "serialNumber", label: translate("pricingComparison.features.serialNumber") },
    { key: "efficiency", label: translate("pricingComparison.features.efficiency") },
    { key: "reporting", label: translate("pricingComparison.features.reporting") }
  ];

  const plans = [
    {
      key: "starter",
      name: translate("pricingComparison.plans.starter.name"),
      features: {
        gsd: translate("pricingComparison.plans.starter.gsd"),
        flightLevel: translate("pricingComparison.plans.starter.flightLevel"),
        inspectionType: translate("pricingComparison.plans.starter.inspectionType"),
        detailLevel: translate("pricingComparison.plans.starter.detailLevel"),
        anomalyTypes: translate("pricingComparison.plans.starter.anomalyTypes"),
        bosModule: translate("pricingComparison.plans.starter.bosModule"),
        thermalRgb: translate("pricingComparison.plans.starter.thermalRgb"),
        workOrders: translate("pricingComparison.plans.starter.workOrders"),
        serialNumber: translate("pricingComparison.plans.starter.serialNumber"),
        efficiency: translate("pricingComparison.plans.starter.efficiency"),
        reporting: translate("pricingComparison.plans.starter.reporting"),
        description: translate("pricingComparison.plans.starter.description"),
        detectedIssues: translate("pricingComparison.plans.starter.detectedIssues")
      }
    },
    {
      key: "professional",
      name: translate("pricingComparison.plans.professional.name"),
      features: {
        gsd: translate("pricingComparison.plans.professional.gsd"),
        flightLevel: translate("pricingComparison.plans.professional.flightLevel"),
        inspectionType: translate("pricingComparison.plans.professional.inspectionType"),
        detailLevel: translate("pricingComparison.plans.professional.detailLevel"),
        anomalyTypes: translate("pricingComparison.plans.professional.anomalyTypes"),
        bosModule: translate("pricingComparison.plans.professional.bosModule"),
        thermalRgb: translate("pricingComparison.plans.professional.thermalRgb"),
        workOrders: translate("pricingComparison.plans.professional.workOrders"),
        serialNumber: translate("pricingComparison.plans.professional.serialNumber"),
        efficiency: translate("pricingComparison.plans.professional.efficiency"),
        reporting: translate("pricingComparison.plans.professional.reporting"),
        description: translate("pricingComparison.plans.professional.description"),
        detectedIssues: translate("pricingComparison.plans.professional.detectedIssues")
      }
    },
    {
      key: "enterprise",
      name: translate("pricingComparison.plans.enterprise.name"),
      features: {
        gsd: translate("pricingComparison.plans.enterprise.gsd"),
        flightLevel: translate("pricingComparison.plans.enterprise.flightLevel"),
        inspectionType: translate("pricingComparison.plans.enterprise.inspectionType"),
        detailLevel: translate("pricingComparison.plans.enterprise.detailLevel"),
        anomalyTypes: translate("pricingComparison.plans.enterprise.anomalyTypes"),
        bosModule: translate("pricingComparison.plans.enterprise.bosModule"),
        thermalRgb: translate("pricingComparison.plans.enterprise.thermalRgb"),
        workOrders: translate("pricingComparison.plans.enterprise.workOrders"),
        serialNumber: translate("pricingComparison.plans.enterprise.serialNumber"),
        efficiency: translate("pricingComparison.plans.enterprise.efficiency"),
        reporting: translate("pricingComparison.plans.enterprise.reporting"),
        description: translate("pricingComparison.plans.enterprise.description"),
        detectedIssues: translate("pricingComparison.plans.enterprise.detectedIssues")
      }
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-4 gap-4">
        {/* Feature Labels Column */}
        <div className="space-y-4">
          <div className="h-20"></div> {/* Spacer for alignment with plan headers */}
          {features.map((feature) => (
            <div key={feature.key} className="p-4 bg-gray-50 rounded-lg text-gray-800 font-medium">
              {feature.label}
            </div>
          ))}
          <div className="p-4 bg-gray-50 rounded-lg text-gray-800 font-medium">
            {translate("pricingComparison.features.description")}
          </div>
          <div className="p-4 bg-gray-50 rounded-lg text-gray-800 font-medium">
            {translate("pricingComparison.features.detectedIssues")}
          </div>
        </div>

        {/* Plan Columns */}
        {plans.map((plan) => (
          <div key={plan.key} className="space-y-4">
            <div className="h-20 flex items-center justify-center bg-blue-600 text-white rounded-lg text-xl font-bold">
              {plan.name}
            </div>
            {features.map((feature) => (
              <div key={feature.key} className="p-4 bg-white border rounded-lg min-h-[60px] flex items-center text-gray-800">
                {plan.features[feature.key as keyof typeof plan.features]}
              </div>
            ))}
            <div className="p-4 bg-white border rounded-lg text-gray-800">
              {plan.features.description}
            </div>
            <div className="p-4 bg-white border rounded-lg text-gray-800">
              {plan.features.detectedIssues}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingComparison; 