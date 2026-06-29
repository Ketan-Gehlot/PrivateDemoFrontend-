export const currencySymbols: Record<string, string> = {
  inr: "₹",
  usd: "$",
  eur: "€",
  gbp: "£"
};

export const formatCurrency = (value: number, currency = "inr", precision = 2) =>
  new Intl.NumberFormat(currency === "inr" ? "en-IN" : "en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
    maximumFractionDigits: precision
  }).format(Number.isFinite(value) ? value : 0);

export const formatNumber = (value: number, precision = 2) =>
  new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: precision
  }).format(Number.isFinite(value) ? value : 0);

export const formatPercent = (value: number) =>
  `${new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 2
  }).format(Number.isFinite(value) ? value : 0)}%`;

export const signedClass = (value: number) =>
  value > 0 ? "text-success" : value < 0 ? "text-destructive" : "text-muted-foreground";
