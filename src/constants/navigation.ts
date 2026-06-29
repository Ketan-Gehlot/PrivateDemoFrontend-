import {
  BarChart3,
  FileText,
  LayoutDashboard,
  PieChart,
  Settings,
  Sprout
} from "lucide-react";

export const navigationItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard
  },
  {
    title: "Portfolio",
    href: "/portfolio",
    icon: PieChart
  },
  {
    title: "Tax Harvesting",
    href: "/tax-harvesting",
    icon: Sprout
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: BarChart3
  },
  {
    title: "Reports",
    href: "/reports",
    icon: FileText
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings
  }
];

export const holdingFilters = [
  { label: "All", value: "all" },
  { label: "Profit", value: "profit" },
  { label: "Loss", value: "loss" },
  { label: "STCG", value: "stcg" },
  { label: "LTCG", value: "ltcg" },
  { label: "Positive", value: "positive" },
  { label: "Negative", value: "negative" }
];
