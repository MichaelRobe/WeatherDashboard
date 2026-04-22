import useSWR from 'swr';
import type { CurrentWeatherResponse, GeocodingResponse } from "@/lib/types.ts";


const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch');
  }
  return res.json();
};

const OPEN_METEO_BASE_URL = import.meta.env.VITE_OPEN_METEO_BASE_URL || 'https://api.open-meteo.com/v1';

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

export function useCurrentWeather(latitude: number | null, longitude: number | null) {

  const url = (latitude !== null && longitude !== null)
    ? `${OPEN_METEO_BASE_URL}/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,weather_code,is_day,rain,wind_speed_10m&timezone=auto`
    : null;

  const { data, error, isLoading } = useSWR<CurrentWeatherResponse>(url, fetcher);

  return {
    weatherData: data,
    isLoading,
    isError: !!error
  };
}