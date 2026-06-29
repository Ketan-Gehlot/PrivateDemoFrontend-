import { NavLink } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import { navigationItems } from "@/constants/navigation";
import { cn } from "@/lib/utils";

export const Sidebar = () => (
  <aside className="hidden min-h-screen w-64 shrink-0 border-r bg-card/80 px-4 py-5 backdrop-blur lg:block">
    <div className="mb-8 flex items-center gap-3 px-2">
      <div className="grid size-9 place-items-center rounded-md bg-primary text-primary-foreground">
        <ShieldCheck className="size-5" />
      </div>
      <div>
        <p className="font-semibold leading-none">KoinX Harvest</p>
        <p className="mt-1 text-xs text-muted-foreground">Tax intelligence</p>
      </div>
    </div>

    <nav className="space-y-1">
      {navigationItems.map((item) => (
        <NavLink
          to={item.href}
          key={item.href}
          className={({ isActive }) =>
            cn(
              "flex h-10 items-center gap-3 rounded-md px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
              isActive && "bg-muted text-foreground"
            )
          }
        >
          <item.icon className="size-4" />
          {item.title}
        </NavLink>
      ))}
    </nav>
  </aside>
);
