import type {
  DailyWeatherResponse,
  DailyWeatherItem,
  HourlyWeatherResponse,
  HourlyWeatherItem,
} from "@/lib/types"

export function normalizeDailyWeatherData(
  daily?: DailyWeatherResponse
): DailyWeatherItem[] {
  if (!daily?.time?.length) return []

  return daily.time.map((time, index) => ({
    time: new Date(time),
    weather_code: daily.weather_code?.[index] ?? null,
    temperature_2m_max: daily.temperature_2m_max?.[index] ?? null,
    temperature_2m_min: daily.temperature_2m_min?.[index] ?? null,
    precipitation_sum: daily.precipitation_sum?.[index] ?? null,
    precipitation_probability_max: daily.precipitation_probability_max?.[index] ?? null,
    wind_speed_10m_max: daily.wind_speed_10m_max?.[index] ?? null,
    sunrise: daily.sunrise?.[index] ?? null,
    sunset: daily.sunset?.[index] ?? null,
  }))
}

export function normalizeHourlyWeatherData(
  hourly?: HourlyWeatherResponse
): HourlyWeatherItem[] {
  if (!hourly?.time?.length) return []

  return hourly.time.map((time, index) => ({
    time: new Date(time),
    weather_code: hourly.weather_code?.[index] ?? null,
    temperature_2m: hourly.temperature_2m?.[index] ?? null,
    apparent_temperature: hourly.apparent_temperature?.[index] ?? null,
    relative_humidity_2m: hourly.relative_humidity_2m?.[index] ?? null,
    precipitation_probability: hourly.precipitation_probability?.[index] ?? null,
    precipitation: hourly.precipitation?.[index] ?? null,
    wind_speed_10m: hourly.wind_speed_10m?.[index] ?? null,
  }))
}