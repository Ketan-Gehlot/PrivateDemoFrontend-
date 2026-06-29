import { Percent, Scale, Target, TrendingDown, TrendingUp, Wallet } from "lucide-react";
import { AnalyticsLists, PortfolioCharts } from "@/charts/PortfolioCharts";
import { SummaryCard } from "@/components/common/SummaryCard";
import { ErrorState, PageSkeleton } from "@/components/common/StateViews";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCapitalGains, useCharts, useDashboard, useHoldings } from "@/hooks/usePortfolioQueries";
import { formatCurrency, formatPercent } from "@/utils/formatters";

const shortTermRate = Number(import.meta.env.VITE_SHORT_TERM_TAX_RATE ?? 0.3);
const longTermRate = Number(import.meta.env.VITE_LONG_TERM_TAX_RATE ?? 0.125);

const AnalyticsPage = () => {
  const holdings = useHoldings();
  const dashboard = useDashboard();
  const charts = useCharts();
  const capitalGains = useCapitalGains();

  if (holdings.isLoading || dashboard.isLoading || charts.isLoading || capitalGains.isLoading) {
    return <PageSkeleton />;
  }

  if (holdings.isError || dashboard.isError || charts.isError || capitalGains.isError) {
    return (
      <ErrorState
        message={
          (holdings.error ?? dashboard.error ?? charts.error ?? capitalGains.error)?.message ??
          "Unable to load analytics."
        }
      />
    );
  }

  const summary = dashboard.data!;
  const gains = capitalGains.data!;
  const data = holdings.data ?? [];
  const currency = summary.currency;
  const netReturn = summary.portfolioValue - summary.totalInvestment;
  const roi = summary.totalInvestment > 0 ? (netReturn / summary.totalInvestment) * 100 : 0;
  const winningAssets = data.filter((holding) => holding.profitLoss > 0).length;
  const losingAssets = data.filter((holding) => holding.profitLoss < 0).length;
  const largestPosition = data.length
    ? data.reduce((largest, holding) => (holding.marketValue > largest.marketValue ? holding : largest), data[0])
    : undefined;
  const shortTermTax = Math.max(gains.stcgNetGain, 0) * shortTermRate;
  const longTermTax = Math.max(gains.ltcgNetGain, 0) * longTermRate;
  const estimatedTax = shortTermTax + longTermTax;
  const opportunityScore =
    summary.totalGain > 0 ? Math.min((summary.potentialTaxSavings / (summary.totalGain * shortTermRate)) * 100, 100) : 0;

  return (
    <div className="space-y-6">
      <section className="dashboard-grid">
        <SummaryCard title="Total Investment" value={formatCurrency(summary.totalInvestment, currency)} icon={Wallet} />
        <SummaryCard title="Current Value" value={formatCurrency(summary.portfolioValue, currency)} icon={Scale} />
        <SummaryCard
          title="Net Return"
          value={formatCurrency(netReturn, currency)}
          icon={netReturn >= 0 ? TrendingUp : TrendingDown}
          tone={netReturn >= 0 ? "success" : "danger"}
        />
        <SummaryCard title="ROI" value={formatPercent(roi)} icon={Percent} tone={roi >= 0 ? "success" : "danger"} />
        <SummaryCard title="Total Profit" value={formatCurrency(summary.totalGain, currency)} icon={TrendingUp} tone="success" />
        <SummaryCard title="Total Loss" value={formatCurrency(summary.totalLoss, currency)} icon={TrendingDown} tone="danger" />
        <SummaryCard title="Winning Assets" value={String(winningAssets)} icon={Target} tone="success" />
        <SummaryCard title="Losing Assets" value={String(losingAssets)} icon={Target} tone="danger" />
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Portfolio Analytics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Metric label="Largest Position" value={largestPosition?.coin ?? "None"} />
            <Metric label="Largest Position Value" value={formatCurrency(largestPosition?.marketValue ?? 0, currency)} />
            <Metric label="Net Return" value={formatCurrency(netReturn, currency)} />
            <Metric label="ROI" value={formatPercent(roi)} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tax Analytics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Metric label="Short Term Tax" value={formatCurrency(shortTermTax, currency)} />
            <Metric label="Long Term Tax" value={formatCurrency(longTermTax, currency)} />
            <Metric label="Harvested Loss" value={formatCurrency(gains.stcgLosses + gains.ltcgLosses, currency)} />
            <Metric label="Remaining Gain" value={formatCurrency(Math.max(gains.realisedCapitalGains, 0), currency)} />
            <Metric label="Tax Saved" value={formatCurrency(summary.potentialTaxSavings, currency)} />
            <Metric label="Estimated Tax" value={formatCurrency(estimatedTax, currency)} />
            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Harvest Opportunity Score</span>
                <span className="font-medium">{formatPercent(opportunityScore)}</span>
              </div>
              <Progress value={opportunityScore} />
            </div>
          </CardContent>
        </Card>
      </section>

      <PortfolioCharts charts={charts.data!} currency={currency} />
      <AnalyticsLists charts={charts.data!} currency={currency} />
    </div>
  );
};

const Metric = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center justify-between gap-3 rounded-md border px-3 py-2 text-sm">
    <span className="text-muted-foreground">{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);

export default AnalyticsPage;
