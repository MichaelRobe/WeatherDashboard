import useSWR from 'swr';
import type {
  GeocodingResponse,
  ForecastResponse,
  ForecastRequestOptions
} from "@/lib/types";
import {
  normalizeDailyWeatherData,
  normalizeHourlyWeatherData,
} from "@/lib/weather-normalize";


const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch');
  }
  return res.json();
};

const OPEN_METEO_BASE_URL = import.meta.env.VITE_OPEN_METEO_BASE_URL || 'https://api.open-meteo.com/v1';

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