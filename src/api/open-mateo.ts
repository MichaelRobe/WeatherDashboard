import type { Geocoding, Location } from "@/lib/types.ts";

export async function getGeocoding(location: Location): Promise<Geocoding> {
  const countryCode = location.country;
  const encodedCityName = encodeURIComponent(location.cityName);
  
  const response = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodedCityName}&count=10&language=en&format=json&countryCode=${countryCode}`
  );

  const data = await response.json();

  return data;
}
