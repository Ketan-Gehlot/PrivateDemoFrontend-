import { Download, FileText, Printer } from "lucide-react";
import { toast } from "sonner";
import { CapitalGainsCard } from "@/components/common/CapitalGainsCard";
import { ErrorState, PageSkeleton } from "@/components/common/StateViews";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCapitalGains, useDashboard, useHoldings } from "@/hooks/usePortfolioQueries";
import { downloadCsv, downloadPdf, holdingsToCsv } from "@/utils/report";
import { formatCurrency } from "@/utils/formatters";

const ReportsPage = () => {
  const dashboard = useDashboard();
  const holdings = useHoldings();
  const capitalGains = useCapitalGains();

  if (dashboard.isLoading || holdings.isLoading || capitalGains.isLoading) {
    return <PageSkeleton />;
  }

  if (dashboard.isError || holdings.isError || capitalGains.isError) {
    return (
      <ErrorState
        message={(dashboard.error ?? holdings.error ?? capitalGains.error)?.message ?? "Unable to load reports."}
      />
    );
  }

  const summary = dashboard.data!;
  const gains = capitalGains.data!;
  const portfolio = holdings.data ?? [];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>Reports</CardTitle>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              onClick={() => {
                downloadPdf(summary, portfolio, gains);
                toast.success("PDF report generated");
              }}
            >
              <FileText className="size-4" />
              Download PDF
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                downloadCsv("koinx-holdings.csv", holdingsToCsv(portfolio));
                toast.success("CSV export generated");
              }}
            >
              <Download className="size-4" />
              Export CSV
            </Button>
            <Button variant="outline" onClick={() => window.print()}>
              <Printer className="size-4" />
              Print
            </Button>
          </div>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          <ReportTile label="Portfolio Summary" value={formatCurrency(summary.portfolioValue, summary.currency)} />
          <ReportTile label="Harvest Summary" value={formatCurrency(summary.potentialTaxSavings, summary.currency)} />
          <ReportTile label="Tax Summary" value={formatCurrency(gains.realisedCapitalGains, summary.currency)} />
        </CardContent>
      </Card>

      <CapitalGainsCard title="Tax Summary" gains={gains} currency={summary.currency} />
    </div>
  );
};

const ReportTile = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-md border bg-background p-4">
    <p className="text-sm text-muted-foreground">{label}</p>
    <p className="mt-2 text-xl font-semibold">{value}</p>
  </div>
);

export default ReportsPage;
