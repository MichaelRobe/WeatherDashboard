import type { Page } from '@playwright/test'

import type { ForecastResponse, GeocodingResponse } from '../../../src/lib/types'

type MockWeatherApiOptions = {
  geocodingResponse?: GeocodingResponse
  forecastResponse?: ForecastResponse
}

export const londonGeocodingResponse: GeocodingResponse = {
  results: [
    {
      id: 2643743,
      name: 'London',
      latitude: 51.5072,
      longitude: -0.1276,
      timezone: 'Europe/London',
      country: 'United Kingdom',
      country_code: 'GB',
      admin1: 'England',
    },
  ],
}

export const parisGeocodingResponse: GeocodingResponse = {
  results: [
    {
      id: 2988507,
      name: 'Paris',
      latitude: 48.8566,
      longitude: 2.3522,
      timezone: 'Europe/Paris',
      country: 'France',
      country_code: 'FR',
      admin1: 'Ile-de-France',
    },
  ],
}

const HOURLY_TIMES = [
  '2026-04-26T00:00',
  '2026-04-26T01:00',
  '2026-04-26T02:00',
  '2026-04-26T03:00',
  '2026-04-26T04:00',
  '2026-04-26T05:00',
  '2026-04-26T06:00',
  '2026-04-26T07:00',
  '2026-04-26T08:00',
  '2026-04-26T09:00',
  '2026-04-26T10:00',
  '2026-04-26T11:00',
  '2026-04-26T12:00',
  '2026-04-26T13:00',
  '2026-04-26T14:00',
  '2026-04-26T15:00',
  '2026-04-26T16:00',
  '2026-04-26T17:00',
  '2026-04-26T18:00',
  '2026-04-26T19:00',
  '2026-04-26T20:00',
  '2026-04-26T21:00',
  '2026-04-26T22:00',
  '2026-04-26T23:00',
]

const DAILY_TIMES = [
  '2026-04-26',
  '2026-04-27',
  '2026-04-28',
  '2026-04-29',
  '2026-04-30',
  '2026-05-01',
  '2026-05-02',
  '2026-05-03',
  '2026-05-04',
  '2026-05-05',
  '2026-05-06',
  '2026-05-07',
  '2026-05-08',
  '2026-05-09',
]

const HOURLY_WEATHER = {
  time: HOURLY_TIMES,
  temperature_2m: [12, 12.5, 13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17, 17.5, 18, 18.5, 19, 19.5, 20, 20.5, 21, 21.5, 22, 22.5, 23, 23.5],
  apparent_temperature: [11, 11.5, 12, 12.5, 13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17, 17.5, 18, 18.5, 19, 19.5, 20, 20.5, 21, 21.5, 22, 22.5],
  relative_humidity_2m: [55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78],
  precipitation_probability: [5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 37, 39, 41, 43, 45, 47, 49, 51],
  precipitation: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2, 2.1, 2.2, 2.3],
  weather_code: [0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3],
  wind_speed_10m: [10, 10.4, 10.8, 11.2, 11.6, 12, 12.4, 12.8, 13.2, 13.6, 14, 14.4, 14.8, 15.2, 15.6, 16, 16.4, 16.8, 17.2, 17.6, 18, 18.4, 18.8, 19.2],
}

const DAILY_WEATHER = {
  time: DAILY_TIMES,
  weather_code: [0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3, 0, 1],
  temperature_2m_max: [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29],
  temperature_2m_min: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
  precipitation_sum: [0, 0.2, 0.4, 0.6, 0.8, 1, 1.2, 1.4, 1.6, 1.8, 2, 2.2, 2.4, 2.6],
  precipitation_probability_max: [10, 13, 16, 19, 22, 25, 28, 31, 34, 37, 40, 43, 46, 49],
  wind_speed_10m_max: [12, 12.7, 13.4, 14.1, 14.8, 15.5, 16.2, 16.9, 17.6, 18.3, 19, 19.7, 20.4, 21.1],
  sunrise: Array.from({ length: 14 }, () => '2026-04-26T05:45'),
  sunset: Array.from({ length: 14 }, () => '2026-04-26T20:10'),
}

export const defaultForecastResponse: ForecastResponse = {
  timezone: 'Europe/London',
  current_units: {
    temperature_2m: '°C',
    apparent_temperature: '°C',
  },
  current: {
    temperature_2m: 18.2,
    apparent_temperature: 16.8,
    weather_code: 1,
    is_day: 1,
    rain: 0,
    wind_speed_10m: 12.4,
    time: '2026-04-26T09:00',
  },
  hourly: HOURLY_WEATHER,
  daily: DAILY_WEATHER,
}

export async function mockWeatherApis(page: Page, options: MockWeatherApiOptions = {}) {
  const {
    geocodingResponse = londonGeocodingResponse,
    forecastResponse = defaultForecastResponse,
  } = options

  await page.route('https://geocoding-api.open-meteo.com/v1/search**', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(geocodingResponse),
    })
  })

  await page.route('https://api.open-meteo.com/v1/forecast**', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(forecastResponse),
    })
  })
}