import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus, Search } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAddHolding, useCoinSearch } from "@/hooks/usePortfolioQueries";
import type { CoinSearchResult } from "@/types/api";

const holdingSchema = z.object({
  quantity: z.coerce.number().positive(),
  averageBuyPrice: z.coerce.number().positive(),
  acquisitionDate: z.string().min(1),
  fee: z.coerce.number().min(0).optional()
});

type HoldingValues = z.infer<typeof holdingSchema>;

export const HoldingForm = () => {
  const [query, setQuery] = useState("");
  const [coin, setCoin] = useState<CoinSearchResult | null>(null);
  const search = useCoinSearch(query);
  const addHolding = useAddHolding();
  const searchResults = search.data ?? [];
  const form = useForm<HoldingValues>({
    resolver: zodResolver(holdingSchema),
    defaultValues: {
      quantity: 0,
      averageBuyPrice: 0,
      acquisitionDate: new Date().toISOString().slice(0, 10),
      fee: 0
    }
  });

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Import Holding</CardTitle>
        <CardDescription>Add an owned asset. Market metadata and live prices come from CoinGecko.</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="space-y-4"
          onSubmit={form.handleSubmit((values) => {
            if (!coin) {
              form.setError("root", { message: "Choose an asset from CoinGecko search" });
              return;
            }

            addHolding.mutate(
              {
                coinGeckoId: coin.id,
                ...values
              },
              {
                onSuccess: () => {
                  form.reset();
                  setCoin(null);
                  setQuery("");
                }
              }
            );
          })}
        >
          <div className="space-y-2">
            <Label htmlFor="asset-search">Asset Search</Label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="asset-search"
                className="pl-9"
                placeholder="Search bitcoin, ethereum, solana"
                value={coin ? `${coin.name} (${coin.symbol.toUpperCase()})` : query}
                onChange={(event) => {
                  setCoin(null);
                  setQuery(event.target.value);
                }}
              />
            </div>
            {searchResults.length > 0 && !coin ? (
              <div className="max-h-56 overflow-auto rounded-md border bg-card p-1">
                {searchResults.map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => setCoin(item)}
                    className="flex w-full items-center gap-3 rounded-sm px-3 py-2 text-left text-sm hover:bg-muted"
                  >
                    <img src={item.thumb} alt="" className="size-6 rounded-full" />
                    <span className="font-medium">{item.name}</span>
                    <span className="text-muted-foreground">{item.symbol.toUpperCase()}</span>
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="quantity">Holding</Label>
              <Input id="quantity" type="number" step="any" {...form.register("quantity")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="averageBuyPrice">Average Buy Price</Label>
              <Input id="averageBuyPrice" type="number" step="any" {...form.register("averageBuyPrice")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="acquisitionDate">Acquisition Date</Label>
              <Input id="acquisitionDate" type="date" {...form.register("acquisitionDate")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fee">Fee</Label>
              <Input id="fee" type="number" step="any" {...form.register("fee")} />
            </div>
          </div>

          {form.formState.errors.root ? (
            <p className="text-sm text-destructive">{form.formState.errors.root.message}</p>
          ) : null}

          <Button className="w-full" type="submit" disabled={addHolding.isPending}>
            {addHolding.isPending ? <Loader2 className="size-4 animate-spin" /> : <Plus className="size-4" />}
            Add Holding
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
