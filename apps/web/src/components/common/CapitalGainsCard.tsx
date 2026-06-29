import { motion } from "framer-motion";
import type { CapitalGains } from "@/types/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/utils/formatters";

type CapitalGainsCardProps = {
  title: string;
  gains: CapitalGains;
  currency: string;
  saving?: number;
};

const Row = ({ label, value, currency }: { label: string; value: number; currency: string }) => (
  <div className="flex items-center justify-between gap-3 text-sm">
    <span className="text-muted-foreground">{label}</span>
    <motion.span
      key={`${label}-${value}`}
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      className={value < 0 ? "font-medium text-destructive" : "font-medium"}
    >
      {formatCurrency(value, currency)}
    </motion.span>
  </div>
);

export const CapitalGainsCard = ({ title, gains, currency, saving = 0 }: CapitalGainsCardProps) => (
  <Card className="glass-card hover:-translate-y-1 hover:shadow-glow transition-all duration-300">
    <CardHeader className="flex-row items-center justify-between">
      <CardTitle>{title}</CardTitle>
      {saving > 0 ? <Badge variant="success">You are saving {formatCurrency(saving, currency)}</Badge> : null}
    </CardHeader>
    <CardContent className="space-y-5">
      <div className="rounded-md border p-4">
        <div className="mb-3 flex items-center justify-between">
          <p className="font-medium">Short Term</p>
          <Badge variant={gains.stcgNetGain >= 0 ? "info" : "destructive"}>Net</Badge>
        </div>
        <div className="space-y-2">
          <Row label="Profits" value={gains.stcgProfits} currency={currency} />
          <Row label="Losses" value={gains.stcgLosses} currency={currency} />
          <Row label="Net Gain" value={gains.stcgNetGain} currency={currency} />
        </div>
      </div>

      <div className="rounded-md border p-4">
        <div className="mb-3 flex items-center justify-between">
          <p className="font-medium">Long Term</p>
          <Badge variant={gains.ltcgNetGain >= 0 ? "success" : "destructive"}>Net</Badge>
        </div>
        <div className="space-y-2">
          <Row label="Profits" value={gains.ltcgProfits} currency={currency} />
          <Row label="Losses" value={gains.ltcgLosses} currency={currency} />
          <Row label="Net Gain" value={gains.ltcgNetGain} currency={currency} />
        </div>
      </div>

      <div className="flex items-center justify-between rounded-md bg-muted px-4 py-3">
        <span className="text-sm text-muted-foreground">Realised Capital Gains</span>
        <motion.span
          key={gains.realisedCapitalGains}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-semibold"
        >
          {formatCurrency(gains.realisedCapitalGains, currency)}
        </motion.span>
      </div>
    </CardContent>
  </Card>
);
