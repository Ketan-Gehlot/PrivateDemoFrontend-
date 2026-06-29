import { lazy, Suspense } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import { AppLayout } from "@/components/layout/AppLayout";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { PageSkeleton } from "@/components/common/StateViews";
import { usePreferencesStore } from "@/store/preferences-store";
const DashboardPage = lazy(() => import("@/pages/DashboardPage"));
const PortfolioPage = lazy(() => import("@/pages/PortfolioPage"));
const TaxHarvestingPage = lazy(() => import("@/pages/TaxHarvestingPage"));
const AnalyticsPage = lazy(() => import("@/pages/AnalyticsPage"));
const ReportsPage = lazy(() => import("@/pages/ReportsPage"));
const SettingsPage = lazy(() => import("@/pages/SettingsPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

const RootRedirect = () => {
  const lastViewedPage = usePreferencesStore((state) => state.lastViewedPage);
  return <Navigate to={lastViewedPage || "/dashboard"} replace />;
};

export const App = () => (
  <ErrorBoundary>
    <Suspense fallback={<main className="p-6"><PageSkeleton /></main>}>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<RootRedirect />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/tax-harvesting" element={<TaxHarvestingPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
    <Toaster richColors position="top-right" />
  </ErrorBoundary>
);
