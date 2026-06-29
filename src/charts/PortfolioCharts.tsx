import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ChartsPayload } from "@/types/api";
import { formatCurrency } from "@/utils/formatters";

const palette = ["#14b8a6", "#0ea5e9", "#f59e0b", "#ef4444", "#8b5cf6", "#22c55e", "#f97316"];

const CurrencyTooltip = ({ active, payload, currency }: any) => {
  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div className="rounded-md border bg-card px-3 py-2 text-sm shadow-soft">
      <p className="font-medium">{payload[0].name}</p>
      <p className="text-muted-foreground">{formatCurrency(Number(payload[0].value), currency)}</p>
    </div>
  );
};

export const PortfolioCharts = ({ charts, currency }: { charts: ChartsPayload; currency: string }) => (
  <div className="grid gap-4 xl:grid-cols-2">
    <Card>
      <CardHeader>
        <CardTitle>Portfolio Allocation</CardTitle>
      </CardHeader>
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={charts.portfolioAllocation}
              dataKey="value"
              nameKey="name"
              innerRadius={62}
              outerRadius={110}
              paddingAngle={3}
            >
              {charts.portfolioAllocation.map((_, index) => (
                <Cell key={index} fill={palette[index % palette.length]} />
              ))}
            </Pie>
            <Tooltip content={<CurrencyTooltip currency={currency} />} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>STCG vs LTCG</CardTitle>
      </CardHeader>
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={charts.stcgVsLtcg}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={(value) => formatCurrency(Number(value), currency, 0)} />
            <Tooltip content={<CurrencyTooltip currency={currency} />} />
            <Bar dataKey="profits" fill="#14b8a6" radius={[6, 6, 0, 0]} />
            <Bar dataKey="losses" fill="#ef4444" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>Portfolio Trend</CardTitle>
      </CardHeader>
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={charts.portfolioTrend}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="date" hide />
            <YAxis tickFormatter={(value) => formatCurrency(Number(value), currency, 0)} />
            <Tooltip content={<CurrencyTooltip currency={currency} />} />
            <Line type="monotone" dataKey="value" stroke="#0ea5e9" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>Profit Loss Distribution</CardTitle>
      </CardHeader>
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={charts.profitLossDistribution}
              dataKey="value"
              nameKey="name"
              innerRadius={70}
              outerRadius={112}
            >
              <Cell fill="#14b8a6" />
              <Cell fill="#ef4444" />
            </Pie>
            <Tooltip content={<CurrencyTooltip currency={currency} />} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  </div>
);

export const AnalyticsLists = ({ charts, currency }: { charts: ChartsPayload; currency: string }) => (
  <div className="grid gap-4 lg:grid-cols-3">
    <Card>
      <CardHeader>
        <CardTitle>Top Gainers</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {charts.topGainers.map((item) => (
          <div className="flex items-center justify-between gap-3" key={item.coin}>
            <div>
              <p className="font-medium">{item.coin}</p>
              <p className="text-xs text-muted-foreground">{item.coinName}</p>
            </div>
            <p className="text-sm font-semibold text-success">{formatCurrency(item.value, currency)}</p>
          </div>
        ))}
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>Top Losers</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {charts.topLosers.map((item) => (
          <div className="flex items-center justify-between gap-3" key={item.coin}>
            <div>
              <p className="font-medium">{item.coin}</p>
              <p className="text-xs text-muted-foreground">{item.coinName}</p>
            </div>
            <p className="text-sm font-semibold text-destructive">{formatCurrency(item.value, currency)}</p>
          </div>
        ))}
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>Sector Allocation</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {charts.sectorAllocation.slice(0, 6).map((item) => (
          <div className="flex items-center justify-between gap-3" key={item.name}>
            <p className="truncate text-sm">{item.name}</p>
            <p className="text-sm font-medium">{formatCurrency(item.value, currency)}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  </div>
);
