import {
  BadgeIndianRupee,
  CircleDollarSign,
  Leaf,
  LineChart,
  TrendingDown,
  TrendingUp,
  Wallet,
  WalletCards
} from "lucide-react";
import { PortfolioCharts } from "@/charts/PortfolioCharts";
import { SummaryCard } from "@/components/common/SummaryCard";
import { EmptyState, ErrorState, PageSkeleton } from "@/components/common/StateViews";
import { HoldingForm } from "@/components/forms/HoldingForm";
import { HoldingsTable } from "@/components/tables/HoldingsTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCharts, useDashboard, useHoldings } from "@/hooks/usePortfolioQueries";
import { selectedArray, useHarvestStore } from "@/store/harvest-store";
import { formatCurrency } from "@/utils/formatters";

const DashboardPage = () => {
  const selected = selectedArray(useHarvestStore((state) => state.selected));
  const dashboard = useDashboard(selected.map((item) => item.holdingId));
  const holdings = useHoldings();
  const charts = useCharts();

  if (dashboard.isLoading || holdings.isLoading) {
    return <PageSkeleton />;
  }

  if (dashboard.isError || holdings.isError) {
    return (
      <ErrorState
        message={(dashboard.error ?? holdings.error)?.message ?? "Unable to load the dashboard."}
        onRetry={() => {
          dashboard.refetch();
          holdings.refetch();
        }}
      />
    );
  }

  const data = dashboard.data;
  const currency = data?.currency ?? "inr";

  if (!holdings.data?.length) {
    return (
      <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
        <EmptyState
          title="No holdings yet"
          description="Import your first crypto holding to calculate gains, losses, harvest opportunities and chart analytics."
        />
        <HoldingForm />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <section className="dashboard-grid">
        <SummaryCard title="Portfolio Value" value={formatCurrency(data!.portfolioValue, currency)} icon={Wallet} />
        <SummaryCard
          title="Today's Gain"
          value={formatCurrency(data!.todayGain, currency)}
          icon={LineChart}
          tone={data!.todayGain >= 0 ? "success" : "danger"}
        />
        <SummaryCard
          title="Total Gain"
          value={formatCurrency(data!.totalGain, currency)}
          icon={TrendingUp}
          tone="success"
        />
        <SummaryCard
          title="Total Loss"
          value={formatCurrency(data!.totalLoss, currency)}
          icon={TrendingDown}
          tone="danger"
        />
        <SummaryCard
          title="Potential Tax Savings"
          value={formatCurrency(data!.potentialTaxSavings, currency)}
          icon={BadgeIndianRupee}
          tone="warning"
        />
        <SummaryCard
          title="Harvest Opportunities"
          value={String(data!.harvestOpportunities)}
          icon={Leaf}
          tone="info"
        />
        <SummaryCard
          title="Selected Holdings"
          value={String(data!.selectedHoldings)}
          icon={WalletCards}
          helper="Persisted locally"
        />
        <SummaryCard
          title="Realised Capital Gains"
          value={formatCurrency(data!.realisedCapitalGains, currency)}
          icon={CircleDollarSign}
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_420px]">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Harvest Watchlist</CardTitle>
          </CardHeader>
          <CardContent>
            <HoldingsTable holdings={holdings.data} compact />
          </CardContent>
        </Card>
        <HoldingForm />
      </section>

      {charts.data ? <PortfolioCharts charts={charts.data} currency={currency} /> : null}
    </div>
  );
};

export default DashboardPage;
