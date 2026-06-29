import type {
  AuthResponse,
  CapitalGains,
  ChartsPayload,
  CoinSearchResult,
  DashboardSummary,
  HarvestCalculation,
  HarvestSelection,
  Holding,
  User
} from "@/types/api";
import {
  mockUser,
  mockHoldings,
  mockCapitalGains,
  mockDashboardSummary,
  mockChartsPayload,
  mockCoinSearchResults
} from "./mockData";

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const authApi = {
  register: async (input: { name: string; email: string; password: string }) => {
    await delay(500);
    return { user: { ...mockUser, name: input.name, email: input.email }, token: "mock-token" } as AuthResponse;
  },
  login: async (input: { email: string; password: string }) => {
    await delay(500);
    return { user: { ...mockUser, email: input.email }, token: "mock-token" } as AuthResponse;
  },
  me: async () => {
    await delay(300);
    return { user: mockUser };
  }
};

let localHoldings = [...mockHoldings];

export const portfolioApi = {
  holdings: async () => {
    await delay(500);
    return localHoldings;
  },
  addHolding: async (input: {
    coinGeckoId: string;
    quantity: number;
    averageBuyPrice: number;
    acquisitionDate: string;
    fee?: number;
  }) => {
    await delay(800);
    const newHolding: Holding = {
      id: `h${Date.now()}`,
      coin: input.coinGeckoId.substring(0, 3).toUpperCase(),
      coinGeckoId: input.coinGeckoId,
      coinName: input.coinGeckoId.charAt(0).toUpperCase() + input.coinGeckoId.slice(1),
      logo: `https://assets.coingecko.com/coins/images/1/large/${input.coinGeckoId}.png`, // Mock logo
      currentPrice: input.averageBuyPrice,
      averageBuyPrice: input.averageBuyPrice,
      totalHolding: input.quantity,
      stcg: 0,
      ltcg: 0,
      marketValue: input.quantity * input.averageBuyPrice,
      costBasis: input.quantity * input.averageBuyPrice,
      profitLoss: 0,
      roi: 0,
      todayGain: 0,
      currency: "INR"
    };
    localHoldings.push(newHolding);
    return { holding: newHolding };
  },
  capitalGains: async () => {
    await delay(400);
    return mockCapitalGains;
  },
  dashboard: async (selected: string[] = []) => {
    await delay(600);
    let selectedHoldingsCount = mockDashboardSummary.selectedHoldings;
    let potentialTaxSavings = mockDashboardSummary.potentialTaxSavings;
    
    if (selected.length > 0) {
      selectedHoldingsCount = selected.length;
      const selectedLosses = localHoldings
        .filter(h => selected.includes(h.id))
        .reduce((sum, h) => sum + (h.profitLoss < 0 ? Math.abs(h.profitLoss) : 0), 0);
      potentialTaxSavings = selectedLosses * 0.3; // 30% tax assumption
    }

    return {
      ...mockDashboardSummary,
      selectedHoldings: selectedHoldingsCount,
      potentialTaxSavings
    };
  },
  calculateHarvest: async (selectedAssets: HarvestSelection[]) => {
    await delay(1000);
    
    let totalRealisedLoss = 0;
    const harvestSummary = selectedAssets.map(asset => {
      const holding = localHoldings.find(h => h.id === asset.holdingId);
      if (!holding) return null;
      
      // Calculate proportional gain/loss for the quantity sold
      const realisedGain = (holding.currentPrice - holding.averageBuyPrice) * asset.sellQuantity;
      if (realisedGain < 0) {
        totalRealisedLoss += Math.abs(realisedGain);
      }
      
      return {
        holdingId: asset.holdingId,
        coin: holding.coin,
        coinName: holding.coinName,
        sellQuantity: asset.sellQuantity,
        currentPrice: holding.currentPrice,
        realisedGain,
        holdingPeriod: holding.stcg !== 0 ? "STCG" : "LTCG" // Rough approximation
      };
    }).filter(Boolean);

    const taxSaved = totalRealisedLoss * 0.3;

    return {
      preHarvest: mockCapitalGains,
      updatedCapitalGains: {
        ...mockCapitalGains,
        stcgLosses: mockCapitalGains.stcgLosses + totalRealisedLoss,
        stcgNetGain: mockCapitalGains.stcgNetGain - totalRealisedLoss
      },
      updatedRealisedGains: mockCapitalGains.realisedCapitalGains,
      taxSaved,
      harvestSummary
    } as HarvestCalculation;
  },
  charts: async () => {
    await delay(700);
    return mockChartsPayload;
  },
  searchCoins: async (query: string) => {
    await delay(300);
    if (!query) return [];
    return mockCoinSearchResults.filter(c => 
      c.name.toLowerCase().includes(query.toLowerCase()) || 
      c.symbol.toLowerCase().includes(query.toLowerCase())
    );
  },
  updateSettings: async (input: { preferredCurrency?: string; decimalPrecision?: number }) => {
    await delay(500);
    return { user: { ...mockUser, ...input } };
  }
};
