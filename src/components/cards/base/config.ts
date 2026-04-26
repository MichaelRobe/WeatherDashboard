export type DashboardCardSize = "md" | "lg" | "wide" | "tall" | "full-width" | "full-height"

export const dashboardCardSizeClasses: Record<DashboardCardSize, string> = {
  md: "md:col-span-full lg:col-span-1 row-span-1",
  lg: "md:col-span-full lg:col-span-2 row-span-2",
  wide: "md:col-span-full lg:col-span-2 row-span-1",
  tall: "md:col-span-full lg:col-span-1 row-span-2",
  "full-width": "col-span-full row-span-1",
  "full-height": "md:col-span-full lg:col-span-1 row-span-full",
}