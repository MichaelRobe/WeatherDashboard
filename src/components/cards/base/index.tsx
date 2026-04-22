import type { ReactNode } from "react"

import {
  Card
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import {
  dashboardCardSizeClasses,
  type DashboardCardSize,
} from "./config"
import { cn } from "@/lib/utils"

type DashboardCardProps = {
  size?: DashboardCardSize
  loading?: boolean
  empty?: boolean
  className?: string
  children?: ReactNode
}

export function BaseCard({
  size = "md",
  loading,
  empty,
  className,
  children,
}: DashboardCardProps) {

  if (loading) {
    return (
      <Skeleton
        className={cn(
          dashboardCardSizeClasses[size],
          className
        )}
      />
    )
  }

  if (empty) return null

  return (
    <Card
      className={cn(
        "p-4",
        dashboardCardSizeClasses[size],
        className
      )}
    >
      {children}
    </Card>
  )
}

export default BaseCard