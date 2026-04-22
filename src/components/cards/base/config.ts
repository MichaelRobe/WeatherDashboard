export type DashboardCardSize = "sm" | "md" | "lg" | "wide" | "tall"

export const dashboardCardSizeClasses: Record<DashboardCardSize, string> = {
  sm: "col-span-1 row-span-1",
  md: "col-span-1 row-span-1 md:col-span-1",
  lg: "col-span-1 row-span-1 md:col-span-2",
  wide: "col-span-1 row-span-1 md:col-span-2",
  tall: "col-span-1 row-span-2",
}