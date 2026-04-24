import { BaseCard } from "@/components/cards/base"
import type { DashboardCardSize } from "@/components/cards/base/config"
import { useLocationContext } from "@/hooks/use-location"
import { useWeatherForecast } from "@/api/open-mateo"
import { getWeatherCodeInfo } from "@/lib/weather-code"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import dayjs from "dayjs"

type DailyWeatherCardProps = {
  size?: DashboardCardSize
  days?: number
}

export function DailyWeatherCard({ size = "md", days = 7 }: DailyWeatherCardProps) {
  const { location } = useLocationContext()

  const weatherOptions = {
    daily: [
      "weather_code",
      "temperature_2m_max",
      "temperature_2m_min",
      "precipitation_sum",
      "precipitation_probability_max",
      "wind_speed_10m_max",
    ],
    forecastDays: days,
  }

  const { weatherData, dailyWeatherData, isLoading } = useWeatherForecast(
    location?.latitude ?? null,
    location?.longitude ?? null,
    weatherOptions
  )

  return (
    <BaseCard size={size} loading={isLoading} empty={!weatherData}>
      <CardHeader>
        <CardTitle>{days}-Day Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <Carousel 
          orientation="horizontal" 
          opts={{ dragFree: true }}
        >
          <CarouselContent className="gap-4" >
            {dailyWeatherData?.map((day, index) => {
              const weatherInfo = getWeatherCodeInfo(day.weather_code, true)

              return (
                <CarouselItem className="md:basis-1/7 lg:basis-1/7 flex flex-col items-center" key={index}>
                  <span className="text-xs font-medium">{dayjs(day.time).format("ddd D")}</span>
                  <span className="mb-auto text-xs text-muted-foreground text-center">{weatherInfo.description}</span>
                  <img
                    src={weatherInfo?.iconUrl}
                    alt={weatherInfo?.description}
                  />
                  <span className="text-sm">{day.temperature_2m_max}</span>
                  <span className="text-xs text-muted-foreground">{day.temperature_2m_min}</span>
                </CarouselItem>
              )
            })}
          </CarouselContent>
        </Carousel>
      </CardContent>
    </BaseCard>
  )
}

export default DailyWeatherCard
