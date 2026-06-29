import { EmptyState, ErrorState, PageSkeleton } from "@/components/common/StateViews";
import { HoldingForm } from "@/components/forms/HoldingForm";
import { HoldingsTable } from "@/components/tables/HoldingsTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useHoldings } from "@/hooks/usePortfolioQueries";

const PortfolioPage = () => {
  const holdings = useHoldings();

  if (holdings.isLoading) {
    return <PageSkeleton />;
  }

  if (holdings.isError) {
    return <ErrorState message={holdings.error.message} onRetry={() => holdings.refetch()} />;
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
      <Card>
        <CardHeader>
          <CardTitle>Portfolio</CardTitle>
        </CardHeader>
        <CardContent>
          {holdings.data?.length ? (
            <HoldingsTable holdings={holdings.data} />
          ) : (
            <EmptyState
              title="No assets imported"
              description="Use the import form to add holdings from CoinGecko and start calculating tax opportunities."
            />
          )}
        </CardContent>
      </Card>
      <HoldingForm />
    </div>
  );
};

export default PortfolioPage;
