export type User = {
  id: string;
  email: string;
  name: string;
  preferredCurrency: string;
  decimalPrecision: number;
};

export type AuthResponse = {
  user: User;
  token: string;
};

export type Holding = {
  id: string;
  coin: string;
  coinGeckoId: string;
  coinName: string;
  logo: string | null;
  currentPrice: number;
  averageBuyPrice: number;
  totalHolding: number;
  stcg: number;
  ltcg: number;
  marketValue: number;
  costBasis: number;
  profitLoss: number;
  roi: number;
  todayGain: number;
  currency: string;
};

export type CapitalGains = {
  stcgProfits: number;
  stcgLosses: number;
  stcgNetGain: number;
  ltcgProfits: number;
  ltcgLosses: number;
  ltcgNetGain: number;
  realisedCapitalGains: number;
};

export type DashboardSummary = {
  portfolioValue: number;
  totalInvestment: number;
  todayGain: number;
  totalGain: number;
  totalLoss: number;
  potentialTaxSavings: number;
  harvestOpportunities: number;
  selectedHoldings: number;
  realisedCapitalGains: number;
  currency: string;
  capitalGains: CapitalGains;
};

export type HarvestSelection = {
  holdingId: string;
  sellQuantity: number;
};

export type HarvestSummaryItem = {
  holdingId: string;
  coin: string;
  coinName: string;
  sellQuantity: number;
  currentPrice: number;
  realisedGain: number;
  holdingPeriod: "STCG" | "LTCG" | "Mixed";
};

export type HarvestCalculation = {
  preHarvest: CapitalGains;
  updatedCapitalGains: CapitalGains;
  updatedRealisedGains: number;
  taxSaved: number;
  harvestSummary: HarvestSummaryItem[];
};

export type CoinSearchResult = {
  id: string;
  name: string;
  symbol: string;
  market_cap_rank: number | null;
  thumb: string;
  large: string;
};

export type ChartPoint = {
  name: string;
  value: number;
  [key: string]: string | number;
};

export type ChartsPayload = {
  portfolioAllocation: ChartPoint[];
  assetDistribution: Array<{ name: string; holding: number; marketValue: number }>;
  profitLossDistribution: ChartPoint[];
  sectorAllocation: ChartPoint[];
  stcgVsLtcg: Array<{ name: string; profits: number; losses: number; net: number }>;
  topGainers: Array<{ coin: string; coinName: string; value: number; roi: number }>;
  topLosers: Array<{ coin: string; coinName: string; value: number; roi: number }>;
  portfolioTrend: Array<{ date: string; value: number }>;
  taxSavingsGauge: ChartPoint[];
};

export type ApiErrorPayload = {
  message: string;
  details?: unknown;
};
