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

export type Location = {
  name: string;
  latitude: number;
  longitude: number;
  timezone: string;
  country: string;
  countryCode: string;
  state?: string;
};

export type ForecastRequestOptions = {
  current?: string[];
  hourly?: string[];
  daily?: string[];
  timezone?: string;
  forecastDays?: number;
  pastDays?: number;
};

export type ForecastResponse = {
  timezone: string
  current_units?: Record<string, string>
  current?: CurrentWeatherResponse
  hourly_units?: Record<string, string>
  hourly?: HourlyWeatherResponse
  daily_units?: Record<string, string>
  daily?: DailyWeatherResponse
}

export type CurrentWeatherResponse = {
  temperature_2m: number
  apparent_temperature: number
  weather_code: number
  is_day: number
  rain: number
  wind_speed_10m: number
  time: string
}

export type HourlyWeatherResponse = {
  temperature_2m: number[] | null
  apparent_temperature: number[] | null
  relative_humidity_2m: number[] | null
  precipitation_probability: number[] | null
  precipitation: number[] | null
  weather_code: number[] | null
  wind_speed_10m: number[] | null
  time: string[]
}

export type DailyWeatherResponse = {
  weather_code: number[] | null | undefined
  temperature_2m_max: number[] | null | undefined
  temperature_2m_min: number[] | null | undefined
  precipitation_sum: number[] | null | undefined
  precipitation_probability_max: number[] | null | undefined
  wind_speed_10m_max: number[] | null | undefined
  sunrise: string[] | null | undefined
  sunset: string[] | null | undefined
  time: string[]
}

export type DailyWeatherItem = {
  time: Date
  weather_code: number | null
  temperature_2m_max: number | null
  temperature_2m_min: number | null
  precipitation_sum: number | null
  precipitation_probability_max: number | null
  wind_speed_10m_max: number | null
  sunrise: string | null
  sunset: string | null
}