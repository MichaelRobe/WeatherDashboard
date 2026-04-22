export type GeocodingResult = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  timezone: string;
  country: string;
  country_code: string;
  admin1?: string;
};

export type GeocodingResponse = {
  results?: GeocodingResult[];
};

export type CurrentWeatherResponse = {
  timezone: string
  current_units: {
    time: string
    interval: string
    temperature_2m: string
    apparent_temperature: string
    weather_code: string
    is_day: string
    rain: string
    wind_speed_10m: string
  }
  current: {
    time: string
    interval: number
    temperature_2m: number
    apparent_temperature: number
    weather_code: number
    is_day: number
    rain: number
    wind_speed_10m: number
  }
}

export type Location = {
  name: string;
  latitude: number;
  longitude: number;
  timezone: string;
  country: string;
  countryCode: string;
  state?: string;
};