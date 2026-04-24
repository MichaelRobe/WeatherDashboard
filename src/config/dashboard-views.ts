import { IconChartBar, IconLayoutDashboard } from "@tabler/icons-react"

type DashboardView = {
  id: "dashboard" | "forecast"
  label: string
  path: string
  icon: typeof IconLayoutDashboard
}

export const DASHBOARD_VIEWS: DashboardView[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/dashboard",
    icon: IconLayoutDashboard,
  },
  {
    id: "forecast",
    label: "Forecast",
    path: "/forecast",
    icon: IconChartBar,
  },
]
