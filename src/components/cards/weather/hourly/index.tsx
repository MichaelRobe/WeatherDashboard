import { BaseCard } from "@/components/cards/base"
import type { DashboardCardSize } from "@/components/cards/base/config"
import { useLocationContext } from "@/hooks/use-location"
import { useWeatherForecast } from "@/api/open-mateo"
import { getWeatherCodeInfo } from "@/lib/weather-code"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import dayjs from "dayjs"

type HourlyWeatherCardProps = {
    size?: DashboardCardSize
    hours?: number
}

export function HourlyWeatherCard({ size = "md", hours = 24 }: HourlyWeatherCardProps) {
    const { location } = useLocationContext()

    const weatherOptions = {
        hourly: [
            "weather_code",
            "temperature_2m",
            "apparent_temperature",
            "precipitation_probability"
        ],
        forecastDays: Math.ceil(hours / 24),
    }

    const { weatherData, hourlyWeatherData, isLoading } = useWeatherForecast(
        location?.latitude ?? null,
        location?.longitude ?? null,
        weatherOptions
    )

    return (
        <BaseCard size={size} loading={isLoading} empty={!weatherData}>
            <CardHeader>
                <CardTitle>{hours}-Hour Forecast</CardTitle>
            </CardHeader>
            <CardContent>
                <Carousel orientation="horizontal" >
                    <CarouselContent className="gap-4" >
                        {hourlyWeatherData?.map((hour, index) => {
                            const weatherInfo = getWeatherCodeInfo(hour.weather_code, true)

                            return (
                                <CarouselItem className="md:basis-1/7 lg:basis-1/7 flex flex-col items-center" key={index}>
                                    <span className="text-xs font-medium">{dayjs(hour.time).format("hh")}</span>
                                    <span className="mb-auto text-xs text-muted-foreground text-center">{weatherInfo.description}</span>
                                    <img
                                        src={weatherInfo?.iconUrl}
                                        alt={weatherInfo?.description}
                                    />
                                    <span className="text-sm">{hour.temperature_2m}</span>
                                    <span className="text-xs text-muted-foreground">{hour.apparent_temperature}</span>
                                </CarouselItem>
                            )
                        })}
                    </CarouselContent>
                </Carousel>
            </CardContent>
        </BaseCard>
    )
}

export default HourlyWeatherCard
