import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"

import { AppSidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { CurrentWeatherCard } from "@/components/cards/weather/current"
import { WeatherChartCard } from "@/components/cards/weather/chart"
import { WeatherMapCard } from "@/components/cards/weather/map"
import { DailyWeatherCard } from "@/components/cards/weather/daily"
import { HourlyWeatherCard } from "@/components/cards/weather/hourly"

import type { CSSProperties } from "react"

const CHART_METRICS = {
  temperature: {
    key: "temperature_2m",
    label: "Temperature",
    color: "var(--chart-1)",
  },
  apparentTemperature: {
    key: "apparent_temperature",
    label: "Apparent Temperature",
    color: "var(--chart-2)",
  },
  rain: {
    key: "precipitation",
    label: "Rain",
    color: "var(--chart-3)",
  },
  windSpeed: {
    key: "wind_speed_10m",
    label: "Wind Speed",
    color: "var(--chart-4)",
  },
}

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
            <CurrentWeatherCard size="md" />
            <WeatherMapCard size="lg" layer="precipitation_new" />
            <DailyWeatherCard size="md" days={7} />
            <HourlyWeatherCard size="md" hours={24} />
            <WeatherChartCard size="md" metric={CHART_METRICS.temperature} />
            <WeatherChartCard size="md" metric={CHART_METRICS.apparentTemperature} />
            <WeatherChartCard size="md" metric={CHART_METRICS.rain} />
            <WeatherChartCard size="md" metric={CHART_METRICS.windSpeed} />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default App
