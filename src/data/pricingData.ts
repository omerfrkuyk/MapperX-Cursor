export type PanelType = 'standard' | 'halfcut';
export type BosType = 'withBos' | 'withoutBos';
export type GSD = '3cm' | '5cm' | '10cm';

export interface PriceTier {
  limit: number;
  price: number;
}

export type PricingTiers = PriceTier[];

export interface GsdPricingData {
  [panelType in PanelType]: {
    [bosType in BosType]: PricingTiers;
  };
}

export const pricingData: Record<GSD, GsdPricingData> = {
  '3cm': {
    standard: {
      withoutBos: [
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
        { limit: Infinity, price: 0.0300 }
      ],
      withBos: []
    },
    halfcut: {
      withoutBos: [
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
        { limit: Infinity, price: 0.0300 }
      ],
      withBos: []
    }
  },
  '5cm': {
    standard: {
      withoutBos: [],
      withBos: []
    },
    halfcut: {
      withoutBos: [],
      withBos: []
    }
  },
  '10cm': {
    standard: {
      withoutBos: [],
      withBos: []
    },
    halfcut: {
      withoutBos: [],
      withBos: []
    }
  }
};