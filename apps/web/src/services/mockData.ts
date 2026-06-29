import type {
  CapitalGains,
  ChartsPayload,
  CoinSearchResult,
  DashboardSummary,
  Holding,
  User,
  HarvestSummaryItem
} from "@/types/api";

export const mockUser: User = {
  id: "mock-user-1",
  email: "demo@koinx.com",
  name: "Demo User",
  preferredCurrency: "INR",
  decimalPrecision: 2
};

export const mockHoldings: Holding[] = [
  {
    id: "h1",
    coin: "BTC",
    coinGeckoId: "bitcoin",
    coinName: "Bitcoin",
    logo: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
    currentPrice: 5500000,
    averageBuyPrice: 4000000,
    totalHolding: 1.5,
    stcg: 500000,
    ltcg: 1750000,
    marketValue: 8250000,
    costBasis: 6000000,
    profitLoss: 2250000,
    roi: 37.5,
    todayGain: 150000,
    currency: "INR"
  },
  {
    id: "h2",
    coin: "ETH",
    coinGeckoId: "ethereum",
    coinName: "Ethereum",
    logo: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
    currentPrice: 250000,
    averageBuyPrice: 300000,
    totalHolding: 10,
    stcg: -500000,
    ltcg: 0,
    marketValue: 2500000,
    costBasis: 3000000,
    profitLoss: -500000,
    roi: -16.67,
    todayGain: -20000,
    currency: "INR"
  },
  {
    id: "h3",
    coin: "SOL",
    coinGeckoId: "solana",
    coinName: "Solana",
    logo: "https://assets.coingecko.com/coins/images/4128/large/solana.png",
    currentPrice: 12000,
    averageBuyPrice: 5000,
    totalHolding: 50,
    stcg: 350000,
    ltcg: 0,
    marketValue: 600000,
    costBasis: 250000,
    profitLoss: 350000,
    roi: 140,
    todayGain: 50000,
    currency: "INR"
  },
  {
    id: "h4",
    coin: "ADA",
    coinGeckoId: "cardano",
    coinName: "Cardano",
    logo: "https://assets.coingecko.com/coins/images/975/large/cardano.png",
    currentPrice: 45,
    averageBuyPrice: 90,
    totalHolding: 5000,
    stcg: -225000,
    ltcg: 0,
    marketValue: 225000,
    costBasis: 450000,
    profitLoss: -225000,
    roi: -50,
    todayGain: -5000,
    currency: "INR"
  },
  {
    id: "h5",
    coin: "XRP",
    coinGeckoId: "ripple",
    coinName: "XRP",
    logo: "https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png",
    currentPrice: 42,
    averageBuyPrice: 35,
    totalHolding: 10000,
    stcg: 70000,
    ltcg: 0,
    marketValue: 420000,
    costBasis: 350000,
    profitLoss: 70000,
    roi: 20,
    todayGain: 10000,
    currency: "INR"
  },
  {
    id: "h6",
    coin: "DOT",
    coinGeckoId: "polkadot",
    coinName: "Polkadot",
    logo: "https://assets.coingecko.com/coins/images/12171/large/polkadot.png",
    currentPrice: 600,
    averageBuyPrice: 1200,
    totalHolding: 200,
    stcg: -120000,
    ltcg: 0,
    marketValue: 120000,
    costBasis: 240000,
    profitLoss: -120000,
    roi: -50,
    todayGain: -2000,
    currency: "INR"
  },
  {
    id: "h7",
    coin: "AVAX",
    coinGeckoId: "avalanche-2",
    coinName: "Avalanche",
    logo: "https://assets.coingecko.com/coins/images/12559/large/Avalanche_Circle_RedWhite_Trans.png",
    currentPrice: 2800,
    averageBuyPrice: 1500,
    totalHolding: 150,
    stcg: 195000,
    ltcg: 0,
    marketValue: 420000,
    costBasis: 225000,
    profitLoss: 195000,
    roi: 86.67,
    todayGain: 15000,
    currency: "INR"
  },
  {
    id: "h8",
    coin: "LINK",
    coinGeckoId: "chainlink",
    coinName: "Chainlink",
    logo: "https://assets.coingecko.com/coins/images/877/large/chainlink-new-logo.png",
    currentPrice: 1200,
    averageBuyPrice: 1800,
    totalHolding: 300,
    stcg: -180000,
    ltcg: 0,
    marketValue: 360000,
    costBasis: 540000,
    profitLoss: -180000,
    roi: -33.33,
    todayGain: -8000,
    currency: "INR"
  }
];

export const mockCapitalGains: CapitalGains = {
  stcgProfits: 850000,
  stcgLosses: 500000,
  stcgNetGain: 350000,
  ltcgProfits: 1750000,
  ltcgLosses: 0,
  ltcgNetGain: 1750000,
  realisedCapitalGains: 150000
};

export const mockDashboardSummary: DashboardSummary = {
  portfolioValue: 11350000,
  totalInvestment: 9250000,
  todayGain: 180000,
  totalGain: 2600000,
  totalLoss: 500000,
  potentialTaxSavings: 150000, // 30% of 500000 stcg loss
  harvestOpportunities: 1,
  selectedHoldings: 3,
  realisedCapitalGains: 150000,
  currency: "INR",
  capitalGains: mockCapitalGains
};

export const mockChartsPayload: ChartsPayload = {
  portfolioAllocation: [
    { name: "BTC", value: 8250000, fill: "var(--color-bitcoin)" },
    { name: "ETH", value: 2500000, fill: "var(--color-ethereum)" },
    { name: "SOL", value: 600000, fill: "var(--color-solana)" },
    { name: "Others", value: 1545000, fill: "var(--color-other)" }
  ],
  assetDistribution: [
    { name: "Bitcoin", holding: 1.5, marketValue: 8250000 },
    { name: "Ethereum", holding: 10, marketValue: 2500000 },
    { name: "Solana", holding: 50, marketValue: 600000 },
    { name: "Cardano", holding: 5000, marketValue: 225000 },
    { name: "XRP", holding: 10000, marketValue: 420000 },
    { name: "Polkadot", holding: 200, marketValue: 120000 },
    { name: "Avalanche", holding: 150, marketValue: 420000 },
    { name: "Chainlink", holding: 300, marketValue: 360000 }
  ],
  profitLossDistribution: [
    { name: "Profit", value: 2600000, fill: "var(--color-profit)" },
    { name: "Loss", value: 500000, fill: "var(--color-loss)" }
  ],
  sectorAllocation: [
    { name: "Layer 1", value: 11350000, fill: "var(--color-layer1)" }
  ],
  stcgVsLtcg: [
    { name: "STCG", profits: 850000, losses: 500000, net: 350000 },
    { name: "LTCG", profits: 1750000, losses: 0, net: 1750000 }
  ],
  topGainers: [
    { coin: "SOL", coinName: "Solana", value: 350000, roi: 140 },
    { coin: "BTC", coinName: "Bitcoin", value: 2250000, roi: 37.5 }
  ],
  topLosers: [
    { coin: "ETH", coinName: "Ethereum", value: -500000, roi: -16.67 }
  ],
  portfolioTrend: Array.from({ length: 30 }).map((_, i) => ({
    date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    value: 10000000 + Math.random() * 1500000
  })),
  taxSavingsGauge: [
    { name: "Realized", value: 150000, fill: "var(--color-realized)" },
    { name: "Potential", value: 350000, fill: "var(--color-potential)" }
  ]
};

export const mockCoinSearchResults: CoinSearchResult[] = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "btc",
    market_cap_rank: 1,
    thumb: "https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png",
    large: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png"
  },
  {
    id: "ethereum",
    name: "Ethereum",
    symbol: "eth",
    market_cap_rank: 2,
    thumb: "https://assets.coingecko.com/coins/images/279/thumb/ethereum.png",
    large: "https://assets.coingecko.com/coins/images/279/large/ethereum.png"
  }
];
