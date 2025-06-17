"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

// Panel tipi ve GSD tipi
export type PanelType = "standard" | "halfcut";
export type GSD = "3cm" | "5cm" | "10cm";

// Fiyat yapısı
interface PricingEntry {
  withBos: number;
  withoutBos: number;
  description: string;
}

const pricingMap: Record<GSD, Record<PanelType, PricingEntry>> = {
  "3cm": {
    standard: {
      withBos: 0, // BOS yok
      withoutBos: 950,
      description: "3cm GSD – Standard Panel için BOS desteksiz fiyattır."
    },
    halfcut: {
      withBos: 0,
      withoutBos: 1025,
      description: "3cm GSD – Half-Cut Panel için BOS desteksiz fiyattır."
    }
  },
  "5cm": {
    standard: {
      withBos: 1025,
      withoutBos: 950,
      description: "5cm GSD – BOS modülü desteklidir."
    },
    halfcut: {
      withBos: 1100,
      withoutBos: 1025,
      description: "5cm GSD – BOS modülü desteklidir."
    }
  },
  "10cm": {
    standard: {
      withBos: 1200,
      withoutBos: 1125,
      description: "10cm GSD – BOS modülü desteklidir."
    },
    halfcut: {
      withBos: 1275,
      withoutBos: 1200,
      description: "10cm GSD – BOS modülü desteklidir."
    }
  }
};

const PricingSection = () => {
  const [panelCounts, setPanelCounts] = useState<{ [key in GSD]: number }>({
    "3cm": 1,
    "5cm": 1,
    "10cm": 1
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
    if (!isNaN(parsed)) {
      setPanelCounts((prev) => ({ ...prev, [gsd]: parsed }));
    }
  };

  return (
    <section className="bg-gray-50 py-20 px-4 md:px-12">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
          Fiyat Hesaplama
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {(["3cm", "5cm", "10cm"] as GSD[]).map((gsd) => {
            const type = selectedTypes[gsd];
            const isBosAvailable = pricingMap[gsd][type].withBos !== 0;
            const unitPrice = bosModules[gsd] && isBosAvailable
              ? pricingMap[gsd][type].withBos
              : pricingMap[gsd][type].withoutBos;
            const totalPrice = unitPrice * panelCounts[gsd];

            return (
              <div
                key={gsd}
                className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4"
              >
                <h3 className="text-xl font-bold text-gray-900">{gsd} GSD Panel</h3>

                <div className="flex gap-4">
                  <button
                    onClick={() => setSelectedTypes((prev) => ({ ...prev, [gsd]: "standard" }))}
                    className={cn(
                      "px-4 py-2 rounded-lg border text-sm",
                      selectedTypes[gsd] === "standard"
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                    )}
                  >
                    Standard
                  </button>
                  <button
                    onClick={() => setSelectedTypes((prev) => ({ ...prev, [gsd]: "halfcut" }))}
                    className={cn(
                      "px-4 py-2 rounded-lg border text-sm",
                      selectedTypes[gsd] === "halfcut"
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                    )}
                  >
                    Half-Cut
                  </button>
                </div>

                <input
                  type="number"
                  min={1}
                  value={panelCounts[gsd]}
                  onChange={(e) => handleCountChange(gsd, e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-2 text-gray-800 bg-white w-full"
                  placeholder="Panel adedi"
                />

                {isBosAvailable && (
                  <label className="inline-flex items-center text-sm gap-2">
                    <input
                      type="checkbox"
                      checked={bosModules[gsd]}
                      onChange={() =>
                        setBosModules((prev) => ({ ...prev, [gsd]: !prev[gsd] }))
                      }
                      className="accent-blue-600"
                    />
                    BOS Modülü Dahil
                  </label>
                )}

                <p className="text-sm text-gray-600">
                  {pricingMap[gsd][type].description}
                </p>

                <p className="text-2xl font-semibold text-gray-900 mt-auto">
                  ${totalPrice.toFixed(2)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;