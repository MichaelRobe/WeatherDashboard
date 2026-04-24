import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"

import { AppSidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { DashboardView } from "@/views/dashboard-view"
import { ForecastView } from "@/views/forecast-view"
import { useLocationContext } from "@/hooks/use-location"
import { Navigate, Route, Routes } from "react-router-dom"

import type { CSSProperties } from "react"
import { IconMapPin } from "@tabler/icons-react"

export function App() {
  const { location } = useLocationContext()

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
          {!location ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
              <IconMapPin className="size-10" />
              <p className="text-base">
                No location selected
              </p>
              <p className="text-sm text-muted-foreground max-w-xs">
                Search for a city in the sidebar to start loading weather data.
              </p>
            </div>
          ) : (
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<DashboardView />} />
              <Route path="/forecast" element={<ForecastView />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default App
