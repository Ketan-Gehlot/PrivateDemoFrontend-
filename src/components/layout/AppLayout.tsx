import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopNav } from "@/components/layout/TopNav";
import { TooltipProvider } from "@/components/ui/tooltip";
import { usePreferencesStore } from "@/store/preferences-store";

export const AppLayout = () => {
  const location = useLocation();
  const setLastViewedPage = usePreferencesStore((state) => state.setLastViewedPage);

  useEffect(() => {
    setLastViewedPage(location.pathname);
  }, [location.pathname, setLastViewedPage]);

  return (
    <TooltipProvider delayDuration={150}>
      <div className="min-h-screen bg-transparent">
        <div className="flex">
          <Sidebar />
          <div className="min-w-0 flex-1">
            <TopNav />
            <main className="mx-auto w-full max-w-[1480px] px-4 py-6 lg:px-6">
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};
