import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"

import { AppSidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { LocationCard } from "@/components/cards/location"
import { CurrentWeatherCard } from "@/components/cards/weather"
import type { DashboardCardSize } from "@/components/cards/base/config"

import type { ComponentType, CSSProperties } from "react"



type DashboardCardItem = {
  id: string
  size: DashboardCardSize
  component: ComponentType<{ size: DashboardCardSize }>
}

const cards: DashboardCardItem[] = [
  { id: "location", size: "tall", component: LocationCard },
  { id: "current", size: "sm", component: CurrentWeatherCard },
  { id: "location-two", size: "sm", component: LocationCard },
  { id: "current-two", size: "wide", component: CurrentWeatherCard },
]

export function App() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "20rem",
          "--sidebar-width-mobile": "20rem",
        } as CSSProperties
      }
    >
      <AppSidebar />
      <SidebarInset>
        <Header />
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid auto-rows-[minmax(14rem,auto)] gap-4 md:grid-cols-3">
            {cards.map(({ id, component: CardComponent, size }) => (
              <CardComponent key={id} size={size} />
            ))}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default App
