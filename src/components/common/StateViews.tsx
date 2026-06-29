import { AlertCircle, Loader2, RefreshCw } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const PageSkeleton = () => (
  <div className="space-y-4">
    <div className="dashboard-grid">
      {Array.from({ length: 4 }).map((_, index) => (
        <Skeleton className="h-32" key={index} />
      ))}
    </div>
    <Skeleton className="h-96" />
  </div>
);

export const InlineLoader = ({ label = "Loading" }: { label?: string }) => (
  <div className="flex items-center gap-2 text-sm text-muted-foreground">
    <Loader2 className="size-4 animate-spin" />
    <span>{label}</span>
  </div>
);

export const EmptyState = ({
  title,
  description,
  action
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) => (
  <Card>
    <CardContent className="flex min-h-72 flex-col items-center justify-center gap-3 p-8 text-center">
      <div className="grid size-12 place-items-center rounded-md bg-muted">
        <AlertCircle className="size-5 text-muted-foreground" />
      </div>
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="mt-1 max-w-md text-sm text-muted-foreground">{description}</p>
      </div>
      {action}
    </CardContent>
  </Card>
);

export const ErrorState = ({ message, onRetry }: { message: string; onRetry?: () => void }) => (
  <Card>
    <CardContent className="flex min-h-60 flex-col items-center justify-center gap-4 p-8 text-center">
      <div className="grid size-12 place-items-center rounded-md bg-destructive/12 text-destructive">
        <AlertCircle className="size-5" />
      </div>
      <div>
        <h3 className="font-semibold">Something went wrong</h3>
        <p className="mt-1 max-w-lg text-sm text-muted-foreground">{message}</p>
      </div>
      {onRetry ? (
        <Button variant="outline" onClick={onRetry}>
          <RefreshCw className="size-4" />
          Retry
        </Button>
      ) : null}
    </CardContent>
  </Card>
);
