import { Link, NavLink, useNavigate } from "react-router-dom";
import { Bell, Moon, Search, ShieldCheck, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { navigationItems } from "@/constants/navigation";
import { useAuthStore } from "@/store/auth-store";
import { usePreferencesStore } from "@/store/preferences-store";
import { cn } from "@/lib/utils";

export const TopNav = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const theme = usePreferencesStore((state) => state.theme);
  const setTheme = usePreferencesStore((state) => state.setTheme);

  const cycleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="sticky top-0 z-40 border-b bg-background/88 backdrop-blur">
      <div className="flex h-16 items-center gap-3 px-4 lg:px-6">
        <Link to="/dashboard" className="flex items-center gap-2 lg:hidden">
          <span className="grid size-9 place-items-center rounded-md bg-primary text-primary-foreground">
            <ShieldCheck className="size-5" />
          </span>
        </Link>

        <div className="relative hidden w-full max-w-md md:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input className="pl-9" placeholder="Search assets, reports, pages" />
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={cycleTheme} aria-label="Toggle theme">
                {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>Toggle theme</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Notifications">
                <Bell className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Notifications</TooltipContent>
          </Tooltip>

          <div className="hidden items-center gap-3 rounded-md border glass-card px-3 py-2 sm:flex">
            <div className="grid size-7 place-items-center rounded-full bg-secondary text-xs font-semibold">
              {user?.name?.slice(0, 1).toUpperCase() ?? "U"}
            </div>
            <div className="max-w-36">
              <p className="truncate text-sm font-medium">{user?.name ?? "Investor"}</p>
              <p className="truncate text-xs text-muted-foreground">{user?.email}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-1 overflow-x-auto border-t px-3 py-2 lg:hidden">
        {navigationItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) =>
              cn(
                "flex shrink-0 items-center gap-2 rounded-md px-3 py-2 text-xs font-medium text-muted-foreground",
                isActive && "bg-muted text-foreground"
              )
            }
          >
            <item.icon className="size-4" />
            {item.title}
          </NavLink>
        ))}
      </div>
    </header>
  );
};
