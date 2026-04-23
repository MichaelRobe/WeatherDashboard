export type DashboardCardSize = "sm" | "md" | "lg" | "wide" | "tall" | "full-width" | "full-height"

export const dashboardCardSizeClasses: Record<DashboardCardSize, string> = {
  sm: "col-span-1 row-span-1",
  md: "col-span-1 row-span-1",
  lg: "col-span-2 row-span-2",
  wide: "col-span-2 row-span-1",
  tall: "col-span-1 row-span-2",
  "full-width": "col-span-full row-span-1",
  "full-height": "col-span-1 row-span-full",
}