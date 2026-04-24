
import { DailyWeatherCard } from "@/components/cards/weather/daily"
import { HourlyWeatherCard } from "@/components/cards/weather/hourly"

export function ForecastView() {
  return (
    <div className="grid auto-rows-[minmax(14rem,auto)] gap-4 md:grid-cols-3">
      <DailyWeatherCard size="full-width" days={7} />
      <DailyWeatherCard size="full-width" days={14} />
      <HourlyWeatherCard size="full-width" hours={24} />
    </div>
  )
}
