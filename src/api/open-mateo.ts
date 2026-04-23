import useSWR from 'swr';
import type {
  GeocodingResponse,
  ForecastResponse,
  ForecastRequestOptions,
  DailyWeatherResponse,
  DailyWeatherItem,
  HourlyWeatherResponse,
  HourlyWeatherItem
} from "@/lib/types";


const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch');
  }
  return res.json();
};

const OPEN_METEO_BASE_URL = import.meta.env.VITE_OPEN_METEO_BASE_URL || 'https://api.open-meteo.com/v1';

const normalizeDailyWeatherData = (daily?: DailyWeatherResponse): DailyWeatherItem[] => {
  if (!daily?.time?.length) return [];

  return daily.time.map((time, index) => ({
    time: new Date(time),
    weather_code: daily?.weather_code?.[index] ?? null,
    temperature_2m_max: daily?.temperature_2m_max?.[index] ?? null,
    temperature_2m_min: daily?.temperature_2m_min?.[index] ?? null,
    precipitation_sum: daily?.precipitation_sum?.[index] ?? null,
    precipitation_probability_max: daily?.precipitation_probability_max?.[index] ?? null,
    wind_speed_10m_max: daily?.wind_speed_10m_max?.[index] ?? null,
    sunrise: daily?.sunrise?.[index] ?? null,
    sunset: daily?.sunset?.[index] ?? null,
  }));
}

const normalizeHourlyWeatherData = (hourly?: HourlyWeatherResponse): HourlyWeatherItem[] => {
  if (!hourly?.time?.length) return [];

  return hourly.time.map((time, index) => ({
    time: new Date(time),
    weather_code: hourly?.weather_code?.[index] ?? null,
    temperature_2m: hourly?.temperature_2m?.[index] ?? null,
    apparent_temperature: hourly?.apparent_temperature?.[index] ?? null,
    relative_humidity_2m: hourly?.relative_humidity_2m?.[index] ?? null,
    precipitation_probability: hourly?.precipitation_probability?.[index] ?? null,
    precipitation: hourly?.precipitation?.[index] ?? null,
    wind_speed_10m: hourly?.wind_speed_10m?.[index] ?? null,
  }));
}

export function buildForecastUrl(
  latitude: number,
  longitude: number,
  {
    current,
    hourly,
    daily,
    timezone = "auto",
    forecastDays,
    pastDays
  }: ForecastRequestOptions = {}
) {

  const searchParams = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    timezone
  });

  if (current?.length) searchParams.set("current", current.join(","));
  if (hourly?.length) searchParams.set("hourly", hourly.join(","));
  if (daily?.length) searchParams.set("daily", daily.join(","));
  if (forecastDays !== undefined) searchParams.set("forecast_days", String(forecastDays));
  if (pastDays !== undefined) searchParams.set("past_days", String(pastDays));

  return `${OPEN_METEO_BASE_URL}/forecast?${searchParams.toString()}`;
}

export function useGeocoding(location: string | null) {
  const url = location
    ? `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(location)}&count=1&language=en&format=json`
    : null;

  const { data, error, isLoading } = useSWR<GeocodingResponse>(url, fetcher);

  return {
    results: data?.results ?? [],
    isLoading,
    isError: !!error
  };
}

export function useWeatherForecast(
  latitude: number | null,
  longitude: number | null,
  options: ForecastRequestOptions = {}
) {
  const url = (latitude !== null && longitude !== null)
    ? buildForecastUrl(latitude, longitude, options)
    : null;

  const { data, error, isLoading } = useSWR<ForecastResponse>(url, fetcher);
  const normalizedDailyWeatherData = normalizeDailyWeatherData(data?.daily);
  const normalizedHourlyWeatherData = normalizeHourlyWeatherData(data?.hourly);

  return {
    weatherData: data,
    dailyWeatherData: normalizedDailyWeatherData,
    hourlyWeatherData: normalizedHourlyWeatherData,
    isLoading,
    isError: !!error
  };
}