import { Leaf, PiggyBank } from "lucide-react";
import { CapitalGainsCard } from "@/components/common/CapitalGainsCard";
import { ErrorState, InlineLoader, PageSkeleton } from "@/components/common/StateViews";
import { SummaryCard } from "@/components/common/SummaryCard";
import { HoldingsTable } from "@/components/tables/HoldingsTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCapitalGains, useHarvestPreview, useHoldings } from "@/hooks/usePortfolioQueries";
import { selectedArray, useHarvestStore } from "@/store/harvest-store";
import { formatCurrency } from "@/utils/formatters";

const TaxHarvestingPage = () => {
  const selected = selectedArray(useHarvestStore((state) => state.selected));
  const holdings = useHoldings();
  const capitalGains = useCapitalGains();
  const harvestPreview = useHarvestPreview(selected);

  if (holdings.isLoading || capitalGains.isLoading) {
    return <PageSkeleton />;
  }

  if (holdings.isError || capitalGains.isError) {
    return (
      <ErrorState
        message={(holdings.error ?? capitalGains.error)?.message ?? "Unable to load harvesting data."}
        onRetry={() => {
          holdings.refetch();
          capitalGains.refetch();
        }}
      />
    );
  }

  const currency = holdings.data?.[0]?.currency ?? "inr";
  const preHarvest = capitalGains.data!;
  const afterHarvest = harvestPreview.data?.updatedCapitalGains ?? preHarvest;
  const taxSaved = harvestPreview.data?.taxSaved ?? 0;

  return (
    <div className="space-y-6">
      <section className="dashboard-grid">
        <SummaryCard
          title="Selected Holdings"
          value={String(selected.length)}
          icon={Leaf}
          helper="Selections update the after-harvest card"
        />
        <SummaryCard
          title="Tax Saved"
          value={formatCurrency(taxSaved, currency)}
          icon={PiggyBank}
          tone={taxSaved > 0 ? "success" : "default"}
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <CapitalGainsCard title="Pre Harvest" gains={preHarvest} currency={currency} />
        <CapitalGainsCard title="After Harvest" gains={afterHarvest} currency={currency} saving={taxSaved} />
      </section>

      {harvestPreview.isFetching ? <InlineLoader label="Recalculating harvest impact" /> : null}

      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Holdings</CardTitle>
        </CardHeader>
        <CardContent>
          <HoldingsTable holdings={holdings.data ?? []} />
        </CardContent>
      </Card>
    </div>
  );
};

export default TaxHarvestingPage;
