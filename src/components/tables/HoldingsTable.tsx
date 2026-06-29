import { ArrowDownUp, CheckSquare, Eraser, Leaf, MinusCircle, SlidersHorizontal } from "lucide-react";
import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { holdingFilters } from "@/constants/navigation";
import { cn } from "@/lib/utils";
import { selectedArray, useHarvestStore } from "@/store/harvest-store";
import type { Holding } from "@/types/api";
import { formatCurrency, formatNumber, formatPercent, signedClass } from "@/utils/formatters";

type SortKey =
  | "coin"
  | "marketValue"
  | "costBasis"
  | "roi"
  | "stcg"
  | "ltcg"
  | "profitLoss"
  | "currentPrice";

type HoldingsTableProps = {
  holdings: Holding[];
  compact?: boolean;
};

const PAGE_SIZE = 8;

export const HoldingsTable = ({ holdings, compact = false }: HoldingsTableProps) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortKey, setSortKey] = useState<SortKey>("marketValue");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);
  const selected = useHarvestStore((state) => state.selected);
  const toggleHolding = useHarvestStore((state) => state.toggleHolding);
  const setSellQuantity = useHarvestStore((state) => state.setSellQuantity);
  const setSelections = useHarvestStore((state) => state.setSelections);
  const clearSelection = useHarvestStore((state) => state.clearSelection);

  const filtered = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    return holdings
      .filter((holding) => {
        const matchesSearch =
          !normalizedSearch ||
          holding.coin.toLowerCase().includes(normalizedSearch) ||
          holding.coinName.toLowerCase().includes(normalizedSearch);

        if (!matchesSearch) {
          return false;
        }

        switch (filter) {
          case "profit":
          case "positive":
            return holding.profitLoss > 0;
          case "loss":
          case "negative":
            return holding.profitLoss < 0;
          case "stcg":
            return Math.abs(holding.stcg) > 0;
          case "ltcg":
            return Math.abs(holding.ltcg) > 0;
          default:
            return true;
        }
      })
      .sort((a, b) => {
        const aValue = sortKey === "coin" ? a.coin : a[sortKey];
        const bValue = sortKey === "coin" ? b.coin : b[sortKey];
        const result = typeof aValue === "string" ? aValue.localeCompare(String(bValue)) : aValue - Number(bValue);
        return sortDirection === "asc" ? result : -result;
      });
  }, [filter, holdings, search, sortDirection, sortKey]);

  const totalPages = Math.max(Math.ceil(filtered.length / PAGE_SIZE), 1);
  const visible = compact ? filtered.slice(0, 5) : filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const selectedCount = selectedArray(selected).length;
  const selectedOnPage = visible.every((holding) => selected[holding.id]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection((direction) => (direction === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDirection("desc");
    }
  };

  const losses = holdings.filter((holding) => holding.profitLoss < 0);
  const eligible = holdings.filter((holding) => holding.stcg < 0 || holding.ltcg < 0 || holding.profitLoss < 0);

  const SortButton = ({ label, column }: { label: string; column: SortKey }) => (
    <button className="inline-flex items-center gap-1" type="button" onClick={() => toggleSort(column)}>
      {label}
      <ArrowDownUp className="size-3" />
    </button>
  );

  const AmountInput = ({ holding }: { holding: Holding }) => (
    <Input
      className="h-8 w-28"
      type="number"
      step="any"
      min={0}
      max={holding.totalHolding}
      value={selected[holding.id]?.sellQuantity ?? ""}
      placeholder="0"
      onChange={(event) => {
        const value = Math.min(Number(event.target.value), holding.totalHolding);
        setSellQuantity(holding.id, Number.isFinite(value) ? value : 0);
      }}
    />
  );

  return (
    <div className="space-y-4">
      {!compact ? (
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-1 flex-col gap-3 sm:flex-row">
            <Input
              className="max-w-md"
              placeholder="Search assets"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
            />
            <Select
              value={filter}
              onValueChange={(value) => {
                setFilter(value);
                setPage(1);
              }}
            >
              <SelectTrigger className="w-full sm:w-48">
                <SlidersHorizontal className="mr-2 size-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {holdingFilters.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={() => setSelections(losses)} disabled={!losses.length}>
              <MinusCircle className="size-4" />
              Harvest Loss Assets
            </Button>
            <Button variant="outline" size="sm" onClick={() => setSelections(eligible)} disabled={!eligible.length}>
              <Leaf className="size-4" />
              Harvest Eligible
            </Button>
            <Button variant="ghost" size="sm" onClick={clearSelection} disabled={!selectedCount}>
              <Eraser className="size-4" />
              Clear Selection
            </Button>
          </div>
        </div>
      ) : null}

      {selectedCount ? (
        <div className="flex items-center gap-2 rounded-md border bg-card px-3 py-2 text-sm">
          <CheckSquare className="size-4 text-success" />
          <span>{selectedCount} selected for harvest calculation</span>
        </div>
      ) : null}

      <div className="hidden overflow-hidden rounded-lg border glass-card md:block">
        <Table>
          <TableHeader className="sticky top-0 z-10 bg-card">
            <TableRow>
              <TableHead className="w-10">
                <Checkbox
                  checked={visible.length > 0 && selectedOnPage}
                  onCheckedChange={(checked) => {
                    visible.forEach((holding) => toggleHolding(holding, Boolean(checked)));
                  }}
                  aria-label="Select visible holdings"
                />
              </TableHead>
              <TableHead>Logo</TableHead>
              <TableHead>
                <SortButton label="Coin" column="coin" />
              </TableHead>
              <TableHead>Coin Name</TableHead>
              <TableHead>Holding</TableHead>
              <TableHead>Average Buy Price</TableHead>
              <TableHead>
                <SortButton label="Current Price" column="currentPrice" />
              </TableHead>
              <TableHead>
                <SortButton label="Market Value" column="marketValue" />
              </TableHead>
              <TableHead>
                <SortButton label="Cost Basis" column="costBasis" />
              </TableHead>
              <TableHead>
                <SortButton label="ROI" column="roi" />
              </TableHead>
              <TableHead>
                <SortButton label="ST Gain" column="stcg" />
              </TableHead>
              <TableHead>
                <SortButton label="LT Gain" column="ltcg" />
              </TableHead>
              <TableHead>
                <SortButton label="P/L" column="profitLoss" />
              </TableHead>
              <TableHead>Amount To Sell</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visible.map((holding) => (
              <TableRow key={holding.id} data-state={selected[holding.id] ? "selected" : undefined}>
                <TableCell>
                  <Checkbox
                    checked={Boolean(selected[holding.id])}
                    onCheckedChange={(checked) => toggleHolding(holding, Boolean(checked))}
                    aria-label={`Select ${holding.coin}`}
                  />
                </TableCell>
                <TableCell>
                  {holding.logo ? <img src={holding.logo} alt="" className="size-7 rounded-full" /> : null}
                </TableCell>
                <TableCell className="font-semibold">{holding.coin}</TableCell>
                <TableCell className="min-w-36">{holding.coinName}</TableCell>
                <TableCell>{formatNumber(holding.totalHolding, 6)}</TableCell>
                <TableCell>{formatCurrency(holding.averageBuyPrice, holding.currency)}</TableCell>
                <TableCell>{formatCurrency(holding.currentPrice, holding.currency)}</TableCell>
                <TableCell>{formatCurrency(holding.marketValue, holding.currency)}</TableCell>
                <TableCell>{formatCurrency(holding.costBasis, holding.currency)}</TableCell>
                <TableCell className={signedClass(holding.roi)}>{formatPercent(holding.roi)}</TableCell>
                <TableCell className={signedClass(holding.stcg)}>
                  {formatCurrency(holding.stcg, holding.currency)}
                </TableCell>
                <TableCell className={signedClass(holding.ltcg)}>
                  {formatCurrency(holding.ltcg, holding.currency)}
                </TableCell>
                <TableCell className={cn("font-medium", signedClass(holding.profitLoss))}>
                  {formatCurrency(holding.profitLoss, holding.currency)}
                </TableCell>
                <TableCell>
                  <AmountInput holding={holding} />
                </TableCell>
                <TableCell>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" onClick={() => toggleHolding(holding, true)}>
                        <Leaf className="size-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Select for harvest</TooltipContent>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="grid gap-3 md:hidden">
        {visible.map((holding) => (
          <div className="rounded-lg border glass-card p-4" key={holding.id}>
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <Checkbox
                  checked={Boolean(selected[holding.id])}
                  onCheckedChange={(checked) => toggleHolding(holding, Boolean(checked))}
                />
                {holding.logo ? <img src={holding.logo} alt="" className="size-9 rounded-full" /> : null}
                <div>
                  <p className="font-semibold">{holding.coin}</p>
                  <p className="text-sm text-muted-foreground">{holding.coinName}</p>
                </div>
              </div>
              <Badge variant={holding.profitLoss >= 0 ? "success" : "destructive"}>
                {formatPercent(holding.roi)}
              </Badge>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-muted-foreground">Market Value</p>
                <p className="font-medium">{formatCurrency(holding.marketValue, holding.currency)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Profit/Loss</p>
                <p className={cn("font-medium", signedClass(holding.profitLoss))}>
                  {formatCurrency(holding.profitLoss, holding.currency)}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">STCG</p>
                <p className={signedClass(holding.stcg)}>{formatCurrency(holding.stcg, holding.currency)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">LTCG</p>
                <p className={signedClass(holding.ltcg)}>{formatCurrency(holding.ltcg, holding.currency)}</p>
              </div>
            </div>
            <div className="mt-4">
              <LabelText>Amount To Sell</LabelText>
              <AmountInput holding={holding} />
            </div>
          </div>
        ))}
      </div>

      {!compact ? (
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            Showing {visible.length} of {filtered.length} assets
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage((value) => value - 1)}>
              Previous
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {page} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={page === totalPages}
              onClick={() => setPage((value) => value + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

const LabelText = ({ children }: { children: ReactNode }) => (
  <p className="mb-2 text-xs font-medium uppercase text-muted-foreground">{children}</p>
);
