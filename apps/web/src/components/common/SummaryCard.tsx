import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type SummaryCardProps = {
  title: string;
  value: string;
  icon: LucideIcon;
  tone?: "default" | "success" | "danger" | "warning" | "info";
  helper?: string;
};

const toneStyles = {
  default: "bg-muted text-muted-foreground",
  success: "bg-success/12 text-success",
  danger: "bg-destructive/12 text-destructive",
  warning: "bg-warning/15 text-amber-700 dark:text-warning",
  info: "bg-info/12 text-info"
};

export const SummaryCard = ({ title, value, icon: Icon, tone = "default", helper }: SummaryCardProps) => (
  <Card className="overflow-hidden glass-card hover:-translate-y-1 hover:shadow-glow transition-all duration-300">
    <CardContent className="flex min-h-32 flex-col justify-between p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <span className={cn("grid size-9 place-items-center rounded-md", toneStyles[tone])}>
          <Icon className="size-4" />
        </span>
      </div>
      <div className="mt-6">
        <motion.p
          key={value}
          initial={{ y: 8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-2xl font-semibold leading-tight"
        >
          {value}
        </motion.p>
        {helper ? <p className="mt-1 text-xs text-muted-foreground">{helper}</p> : null}
      </div>
    </CardContent>
  </Card>
);
