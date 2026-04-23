import { useLocationContext } from "@/hooks/use-location"
import BaseCard from "@/components/cards/base"
import { CardContent, CardHeader } from "@/components/ui/card"
import { useWeatherForecast } from "@/api/open-mateo"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart"
import { useMemo } from "react"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
import dayjs from "dayjs"
import type { DashboardCardSize } from "@/components/cards/base/config"

export type WeatherChartMetricConfig = {
    key: string
    label: string
    title?: string
    color?: string
}

type CurrentWeatherCardProps = {
    size?: DashboardCardSize
    metric: WeatherChartMetricConfig
}

export function WeatherChartCard({
    size,
    metric,
}: CurrentWeatherCardProps) {
    
    const weatherOptions = useMemo(() => ({
        hourly: [metric.key]
    }), [metric.key])

    const config: ChartConfig = {
        metric: {
            label: metric.label,
            color: metric.color,
        }
    }

    const { location } = useLocationContext()
    const { weatherData, isLoading } = useWeatherForecast(
        location?.latitude ?? null,
        location?.longitude ?? null,
        weatherOptions
    )

    const chartData = useMemo(() => {
        const hourly = weatherData?.hourly
        const times = weatherData?.hourly?.time ?? []
        const values = (hourly?.[metric.key as keyof typeof hourly] ?? []) as number[]

        return times.map((time, index) => ({
            time,
            metric: values[index] ?? null,
        }))

    }, [metric.key, weatherData?.hourly])

    return (
        <BaseCard size={size} loading={isLoading} empty={!weatherData}>
            <CardHeader>
                {metric.label}
            </CardHeader>
            <CardContent>
                <ChartContainer config={config} >
                    <LineChart data={chartData}>
                        <CartesianGrid />
                        <XAxis
                            dataKey="time"
                            tickLine={false}
                            axisLine={false}
                            minTickGap={24}
                            tickFormatter={(value) => dayjs(value).format("HH:mm")}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                        />
                        <ChartTooltip
                            content={(
                                <ChartTooltipContent 
                                    labelFormatter={(value) => dayjs(value).format("HH:mm")}
                                />
                            )}
                        />
                        <Line
                            dataKey="metric"
                            type="monotone"
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </BaseCard>
    )
}

export default WeatherChartCard