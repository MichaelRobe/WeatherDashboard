import { BaseCard } from "@/components/cards/base"
import type { DashboardCardSize } from "@/components/cards/base/config"
import { useLocationContext } from "@/hooks/use-location"
import { useWeatherForecast } from "@/api/open-meteo"
import { getWeatherCodeInfo } from "@/lib/weather-code"
import { Badge } from "@/components/ui/badge"
import { IconMapPin } from "@tabler/icons-react"
import { CardContent, CardHeader } from "@/components/ui/card"

type CurrentWeatherCardProps = {
  size?: DashboardCardSize
}

export function CurrentWeatherCard({ size = "md" }: CurrentWeatherCardProps) {
  const { location } = useLocationContext()

  const weatherOptions = {
    current: [
      "temperature_2m",
      "apparent_temperature",
      "weather_code",
      "is_day",
      "rain",
      "wind_speed_10m",
    ]
  }

  const { weatherData, isLoading } = useWeatherForecast(
    location?.latitude ?? null,
    location?.longitude ?? null,
    weatherOptions
  )

  const weatherCodeInfo = getWeatherCodeInfo(
    weatherData?.current?.weather_code,
    weatherData?.current?.is_day === 1
  )

  const currentDateTime = weatherData?.current?.time
    ? new Date(weatherData.current.time)
    : null

  return (
    <BaseCard size={size} loading={isLoading} empty={!weatherData}>
      <CardHeader>
        <div className="flex justify-between">
          <div className="flex flex-col gap-1">
            <p className="text-sm">
              {currentDateTime?.toLocaleDateString("en-gb", {
                weekday: "long",
                day: "2-digit",
                month: "long",
                year: "2-digit",
              })}
            </p>
            <Badge>
              <span className="text-md">
                {location?.name}, {location?.country}
              </span>
              <IconMapPin data-icon="inline-end" />
            </Badge>
          </div>
          <div className="flex flex-col gap-1 items-end">
            <span className="text-xs text-muted-foreground">
              Local time:
            </span>
            <p className="text-sm">
              
              {currentDateTime?.toLocaleTimeString([], {
                hour: "numeric",
                minute: "numeric",
              })}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center gap-5">
          <div className="flex flex-col justify-center">
            <p className="text-center text-sm text-muted-foreground">
              {weatherCodeInfo?.description}
            </p>
            <p className="text-4xl text-muted-foreground">
              {weatherData?.current?.temperature_2m.toFixed(0)}
              {weatherData?.current_units?.temperature_2m}
            </p>
            <p className="text-xs text-muted-foreground">
              Feels like {weatherData?.current?.apparent_temperature.toFixed(0)}
              {weatherData?.current_units?.apparent_temperature}
            </p>
          </div>
          <div className="align-items-center flex flex-col justify-center">
            <img
              src={weatherCodeInfo?.iconUrl}
              alt={weatherCodeInfo?.description}
            />
          </div>
        </div>
      </CardContent>
    </BaseCard>
  )
}

export default CurrentWeatherCard
