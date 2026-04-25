import { describe, expect, test } from "vitest"

import { buildForecastUrl } from "../../src/api/open-meteo"

describe("buildForecastUrl", () => {
  test("includes required coordinates and default timezone", () => {
    const url = buildForecastUrl(51.5072, -0.1276)
    const parsed = new URL(url)

    expect(parsed.pathname).toBe("/v1/forecast")
    expect(parsed.searchParams.get("latitude")).toBe("51.5072")
    expect(parsed.searchParams.get("longitude")).toBe("-0.1276")
    expect(parsed.searchParams.get("timezone")).toBe("auto")
  })

  test("serializes optional weather arrays and numeric day options", () => {
    const url = buildForecastUrl(10, 20, {
      current: ["temperature_2m", "weather_code"],
      hourly: ["temperature_2m"],
      daily: ["temperature_2m_max", "temperature_2m_min"],
      timezone: "Europe/London",
      forecastDays: 7,
      pastDays: 2,
    })
    const parsed = new URL(url)

    expect(parsed.searchParams.get("current")).toBe("temperature_2m,weather_code")
    expect(parsed.searchParams.get("hourly")).toBe("temperature_2m")
    expect(parsed.searchParams.get("daily")).toBe("temperature_2m_max,temperature_2m_min")
    expect(parsed.searchParams.get("timezone")).toBe("Europe/London")
    expect(parsed.searchParams.get("forecast_days")).toBe("7")
    expect(parsed.searchParams.get("past_days")).toBe("2")
  })

  test("does not include optional params when arrays are empty or undefined", () => {
    const url = buildForecastUrl(40, 50, {
      current: [],
      hourly: undefined,
      daily: [],
    })
    const parsed = new URL(url)

    expect(parsed.searchParams.has("current")).toBe(false)
    expect(parsed.searchParams.has("hourly")).toBe(false)
    expect(parsed.searchParams.has("daily")).toBe(false)
    expect(parsed.searchParams.has("forecast_days")).toBe(false)
    expect(parsed.searchParams.has("past_days")).toBe(false)
  })
})
