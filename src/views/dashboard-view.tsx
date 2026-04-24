import WeatherChartCard from "@/components/cards/weather/chart"
import { CurrentWeatherCard } from "@/components/cards/weather/current"
import { WeatherMapCard } from "@/components/cards/weather/map"

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

export function DashboardView() {
  return (
    <div className="grid auto-rows-[minmax(14rem,auto)] gap-4 md:grid-cols-3">
      <CurrentWeatherCard size="md" />
      <WeatherMapCard size="lg" layer="precipitation_new" />
      <WeatherChartCard size="md" metric={CHART_METRICS.temperature} />
      <WeatherChartCard size="md" metric={CHART_METRICS.apparentTemperature} />
      <WeatherChartCard size="md" metric={CHART_METRICS.rain} />
      <WeatherChartCard size="md" metric={CHART_METRICS.windSpeed} />
    </div>
  )
}
