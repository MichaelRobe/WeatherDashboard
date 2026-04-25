import { describe, expect, test } from "vitest"

import {
  normalizeDailyWeatherData,
  normalizeHourlyWeatherData,
} from "../../src/lib/weather-normalize"

describe("normalizeDailyWeatherData", () => {
  test("returns empty array when no time series is available", () => {
    expect(normalizeDailyWeatherData()).toEqual([])
    expect(
      normalizeDailyWeatherData({
        time: [],
        weather_code: null,
        temperature_2m_max: null,
        temperature_2m_min: null,
        precipitation_sum: null,
        precipitation_probability_max: null,
        wind_speed_10m_max: null,
        sunrise: null,
        sunset: null,
      })
    ).toEqual([])
  })

  test("normalizes daily records with date parsing and null fallbacks", () => {
    const result = normalizeDailyWeatherData({
      time: ["2026-04-25", "2026-04-26"],
      weather_code: [0],
      temperature_2m_max: [20, 18],
      temperature_2m_min: [10],
      precipitation_sum: null,
      precipitation_probability_max: [40],
      wind_speed_10m_max: [12],
      sunrise: ["2026-04-25T05:30"],
      sunset: null,
    })

    expect(result).toHaveLength(2)
    expect(result[0]).toEqual({
      time: new Date("2026-04-25"),
      weather_code: 0,
      temperature_2m_max: 20,
      temperature_2m_min: 10,
      precipitation_sum: null,
      precipitation_probability_max: 40,
      wind_speed_10m_max: 12,
      sunrise: "2026-04-25T05:30",
      sunset: null,
    })
    expect(result[1]).toEqual({
      time: new Date("2026-04-26"),
      weather_code: null,
      temperature_2m_max: 18,
      temperature_2m_min: null,
      precipitation_sum: null,
      precipitation_probability_max: null,
      wind_speed_10m_max: null,
      sunrise: null,
      sunset: null,
    })
  })
})

describe("normalizeHourlyWeatherData", () => {
  test("returns empty array when no time series is available", () => {
    expect(normalizeHourlyWeatherData()).toEqual([])
    expect(
      normalizeHourlyWeatherData({
        time: [],
        weather_code: null,
        temperature_2m: null,
        apparent_temperature: null,
        relative_humidity_2m: null,
        precipitation_probability: null,
        precipitation: null,
        wind_speed_10m: null,
      })
    ).toEqual([])
  })

  test("normalizes hourly records with date parsing and null fallbacks", () => {
    const result = normalizeHourlyWeatherData({
      time: ["2026-04-25T09:00", "2026-04-25T10:00"],
      weather_code: [3],
      temperature_2m: [12],
      apparent_temperature: [10],
      relative_humidity_2m: null,
      precipitation_probability: [25],
      precipitation: null,
      wind_speed_10m: [15],
    })

    expect(result).toHaveLength(2)
    expect(result[0]).toEqual({
      time: new Date("2026-04-25T09:00"),
      weather_code: 3,
      temperature_2m: 12,
      apparent_temperature: 10,
      relative_humidity_2m: null,
      precipitation_probability: 25,
      precipitation: null,
      wind_speed_10m: 15,
    })
    expect(result[1]).toEqual({
      time: new Date("2026-04-25T10:00"),
      weather_code: null,
      temperature_2m: null,
      apparent_temperature: null,
      relative_humidity_2m: null,
      precipitation_probability: null,
      precipitation: null,
      wind_speed_10m: null,
    })
  })
})
