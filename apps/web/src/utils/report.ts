import jsPDF from "jspdf";
import type { CapitalGains, DashboardSummary, Holding } from "@/types/api";
import { formatCurrency } from "@/utils/formatters";

const csvEscape = (value: string | number) => `"${String(value).replaceAll('"', '""')}"`;

export const holdingsToCsv = (holdings: Holding[]) => {
  const headers = [
    "Coin",
    "Coin Name",
    "Holding",
    "Average Buy Price",
    "Current Price",
    "Market Value",
    "Cost Basis",
    "ROI %",
    "STCG",
    "LTCG",
    "Profit/Loss"
  ];

  const rows = holdings.map((holding) => [
    holding.coin,
    holding.coinName,
    holding.totalHolding,
    holding.averageBuyPrice,
    holding.currentPrice,
    holding.marketValue,
    holding.costBasis,
    holding.roi,
    holding.stcg,
    holding.ltcg,
    holding.profitLoss
  ]);

  return [headers, ...rows].map((row) => row.map(csvEscape).join(",")).join("\n");
};

export const downloadCsv = (filename: string, csv: string) => {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
};

export const downloadPdf = (
  dashboard: DashboardSummary,
  holdings: Holding[],
  capitalGains: CapitalGains
) => {
  const doc = new jsPDF();
  const currency = dashboard.currency;
  let y = 18;

  doc.setFontSize(18);
  doc.text("KoinX Tax Loss Harvesting Report", 14, y);
  y += 10;

  doc.setFontSize(10);
  doc.text(`Generated: ${new Date().toLocaleString()}`, 14, y);
  y += 10;

  const summaryRows = [
    ["Portfolio Value", formatCurrency(dashboard.portfolioValue, currency)],
    ["Total Investment", formatCurrency(dashboard.totalInvestment, currency)],
    ["Total Gain", formatCurrency(dashboard.totalGain, currency)],
    ["Total Loss", formatCurrency(dashboard.totalLoss, currency)],
    ["Potential Tax Savings", formatCurrency(dashboard.potentialTaxSavings, currency)],
    ["Realised Capital Gains", formatCurrency(capitalGains.realisedCapitalGains, currency)]
  ];

  doc.setFontSize(12);
  summaryRows.forEach(([label, value]) => {
    doc.text(label, 14, y);
    doc.text(value, 112, y);
    y += 8;
  });

  y += 4;
  doc.setFontSize(13);
  doc.text("Holdings", 14, y);
  y += 8;
  doc.setFontSize(9);

  holdings.slice(0, 18).forEach((holding) => {
    const row = `${holding.coin}  ${formatCurrency(holding.marketValue, currency)}  P/L ${formatCurrency(
      holding.profitLoss,
      currency
    )}`;
    doc.text(row, 14, y);
    y += 6;
  });

  if (holdings.length > 18) {
    doc.text(`+ ${holdings.length - 18} more holdings in CSV export`, 14, y + 2);
  }

  doc.save("koinx-tax-loss-report.pdf");
};
