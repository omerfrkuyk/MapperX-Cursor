"use client";

import React, { useState, useEffect } from 'react';
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { cn } from "@/lib/utils";

// Panel tipi ve GSD tipi
export type PanelType = "standard" | "halfcut";
export type GSD = "3cm" | "5cm" | "10cm";

// Fiyat yapısı
interface PricingEntry {
  withBos: number;
  withoutBos: number;
  descriptionKey: string;
  titleKey: string;
  subtitleKey: string;
}

const pricingMap: Record<GSD, Record<PanelType, PricingEntry>> = {
  "3cm": {
    standard: {
      withBos: 0, // BOS yok
      withoutBos: 950,
      descriptionKey: "pricing.3cm.standard.description",
      titleKey: "pricing.3cm.title",
      subtitleKey: "pricing.3cm.subtitle"
    },
    halfcut: {
      withBos: 0,
      withoutBos: 1025,
      descriptionKey: "pricing.3cm.halfcut.description",
      titleKey: "pricing.3cm.title",
      subtitleKey: "pricing.3cm.subtitle"
    }
  },
  "5cm": {
    standard: {
      withBos: 1025,
      withoutBos: 950,
      descriptionKey: "pricing.5cm.standard.description",
      titleKey: "pricing.5cm.title",
      subtitleKey: "pricing.5cm.subtitle"
    },
    halfcut: {
      withBos: 1100,
      withoutBos: 1025,
      descriptionKey: "pricing.5cm.halfcut.description",
      titleKey: "pricing.5cm.title",
      subtitleKey: "pricing.5cm.subtitle"
    }
  },
  "10cm": {
    standard: {
      withBos: 1200,
      withoutBos: 1125,
      descriptionKey: "pricing.10cm.standard.description",
      titleKey: "pricing.10cm.title",
      subtitleKey: "pricing.10cm.subtitle"
    },
    halfcut: {
      withBos: 1275,
      withoutBos: 1200,
      descriptionKey: "pricing.10cm.halfcut.description",
      titleKey: "pricing.10cm.title",
      subtitleKey: "pricing.10cm.subtitle"
    }
  }
};

interface PricingTier {
  limit: number;
  price: number;
}

const pricingTiers: PricingTier[] = [
  { limit: 100, price: 0.5 },
  { limit: 200, price: 0.0500 },
  { limit: 300, price: 0.0495 },
  { limit: 400, price: 0.0490 },
  { limit: 500, price: 0.0485 },
  { limit: 600, price: 0.0480 },
  { limit: 700, price: 0.0475 },
  { limit: 800, price: 0.0470 },
  { limit: 900, price: 0.0465 },
  { limit: 1000, price: 0.0460 },
  { limit: 1100, price: 0.0455 },
  { limit: 1200, price: 0.0450 },
  { limit: 1300, price: 0.0445 },
  { limit: 1400, price: 0.0440 },
  { limit: 1500, price: 0.0435 },
  { limit: 1600, price: 0.0430 },
  { limit: 1700, price: 0.0425 },
  { limit: 1800, price: 0.0420 },
  { limit: 1900, price: 0.0415 },
  { limit: 2000, price: 0.0410 },
  { limit: 2100, price: 0.0405 },
  { limit: 2200, price: 0.0400 },
  { limit: 2300, price: 0.0395 },
  { limit: 2400, price: 0.0390 },
  { limit: 2500, price: 0.0385 },
  { limit: 2600, price: 0.0380 },
  { limit: 2700, price: 0.0375 },
  { limit: 2800, price: 0.0370 },
  { limit: 2900, price: 0.0365 },
  { limit: 3000, price: 0.0360 },
  { limit: 3200, price: 0.0355 },
  { limit: 3400, price: 0.0350 },
  { limit: 3600, price: 0.0345 },
  { limit: 3800, price: 0.0340 },
  { limit: 4000, price: 0.0335 },
  { limit: 4400, price: 0.0330 },
  { limit: 4800, price: 0.0325 },
  { limit: 5200, price: 0.0320 },
  { limit: 5600, price: 0.0315 },
  { limit: 6000, price: 0.0310 },
  { limit: 7000, price: 0.0305 },
  { limit: Infinity, price: 0.03 }
];

type GSDType = '3cm' | '5cm' | '10cm';

interface PriceCalculatorProps {
  gsdType: GSDType;
  title: string;
  description: string;
}

const PriceCalculator: React.FC<PriceCalculatorProps> = ({ gsdType, title, description }) => {
  const { translate } = useLanguage();
  const [panelCount, setPanelCount] = useState<number>(0);
  const [isHalfCut, setIsHalfCut] = useState<boolean>(true);
  const [includeBos, setIncludeBos] = useState<boolean>(false);

  const calculatePrice = () => {
    let remainingPanels = panelCount;
    let totalPrice = 0;

    // Kademeli fiyatlandırma hesaplaması
    for (const tier of pricingTiers) {
      if (remainingPanels <= tier.limit) {
        totalPrice += remainingPanels * tier.price;
        break;
      } else {
        totalPrice += tier.limit * tier.price;
        remainingPanels -= tier.limit;
      }
    }

    // Panel tipine göre indirim
    if (!isHalfCut) {
      totalPrice *= 0.8; // Standart panel %20 indirim
    }

    // GSD tipine göre çarpanlar ve BOS eklentisi
    switch (gsdType) {
      case '3cm':
        totalPrice *= 1.5;
        break;
      case '5cm':
        if (includeBos) {
          totalPrice += panelCount * 0.012;
        }
        break;
      case '10cm':
        if (includeBos) {
          totalPrice += panelCount * 0.04;
        }
        totalPrice *= 0.66;
        break;
    }

    return totalPrice.toFixed(2);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-blue-600 mb-2">{title}</h2>
        <h3 className="text-lg text-blue-600">GSD: {gsdType}</h3>
        <p className="text-gray-800 mt-4">{description}</p>
        <hr className="my-4 border-gray-200" />
      </div>

      <div className="mb-6">
        <p className="mb-3 text-gray-800">{translate('pricing.selectPanelType')}</p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => setIsHalfCut(true)}
            className={`px-4 py-2 rounded border ${
              isHalfCut ? 'bg-blue-600 text-white' : 'border-blue-600 text-gray-800'
            }`}
          >
            {translate('pricing.halfcut')}
          </button>
          <button
            onClick={() => setIsHalfCut(false)}
            className={`px-4 py-2 rounded border ${
              !isHalfCut ? 'bg-blue-600 text-white' : 'border-blue-600 text-gray-800'
            }`}
          >
            {translate('pricing.standard')}
          </button>
        </div>
      </div>

      <div className="mb-6">
        <label className="block mb-2 text-gray-800">{translate('pricing.panelCount')}</label>
        <input
          type="number"
          value={panelCount}
          onChange={(e) => setPanelCount(Number(e.target.value))}
          className="w-full p-2 border rounded mb-2 text-gray-800"
          min="0"
          max="95000"
        />
        <input
          type="range"
          value={panelCount}
          onChange={(e) => setPanelCount(Number(e.target.value))}
          className="w-full"
          min="0"
          max="95000"
        />
      </div>

      {gsdType !== '3cm' && (
        <div className="mb-6">
          <label className="flex items-center gap-2 text-gray-800">
            <input
              type="checkbox"
              checked={includeBos}
              onChange={(e) => setIncludeBos(e.target.checked)}
              className="form-checkbox"
            />
            {translate('pricing.includeBos')}
          </label>
        </div>
      )}

      <div className="text-center">
        <p className="text-xl font-bold">
          {translate('pricing.totalPrice')}: <span className="text-blue-600">${calculatePrice()}</span>
        </p>
      </div>
    </div>
  );
};

const PricingSection = () => {
  const { translate } = useLanguage();
  
  const [panelCounts, setPanelCounts] = useState<{ [key in GSD]: number }>({
    "3cm": 0,
    "5cm": 0,
    "10cm": 0
  });

  const [selectedTypes, setSelectedTypes] = useState<{ [key in GSD]: PanelType }>({
    "3cm": "standard",
    "5cm": "standard",
    "10cm": "standard"
  });

  const [bosModules, setBosModules] = useState<{ [key in GSD]: boolean }>({
    "3cm": false,
    "5cm": false,
    "10cm": false
  });

  const handleCountChange = (gsd: GSD, value: string) => {
    const parsed = parseInt(value);
    if (!isNaN(parsed) && parsed >= 0) {
      setPanelCounts((prev) => ({ ...prev, [gsd]: parsed }));
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900">{translate('pricing.title')}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <PriceCalculator
          gsdType="10cm"
          title={translate('pricing.10cm.title')}
          description={translate('pricing.10cm.standard.description')}
        />
        <PriceCalculator
          gsdType="5cm"
          title={translate('pricing.5cm.title')}
          description={translate('pricing.5cm.standard.description')}
        />
        <PriceCalculator
          gsdType="3cm"
          title={translate('pricing.3cm.title')}
          description={translate('pricing.3cm.standard.description')}
        />
      </div>
    </div>
  );
};

export default PricingSection;