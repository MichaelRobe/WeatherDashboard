import { describe, expect, test } from "vitest"

import { getWeatherCodeInfo } from "../../src/lib/weather-code"

describe("getWeatherCodeInfo", () => {
  test("returns mapped day weather info for a known code", () => {
    const result = getWeatherCodeInfo(0, true)

    expect(result).toEqual({
      description: "Sunny",
      iconUrl: "https://openweathermap.org/img/wn/01d@2x.png",
    })
  })

  test("returns fallback for unknown or missing weather code", () => {
    expect(getWeatherCodeInfo(999, true)).toEqual({
      description: "Unknown weather",
      iconUrl: "https://openweathermap.org/img/wn/03d@2x.png",
    })

    expect(getWeatherCodeInfo(null, false)).toEqual({
      description: "Unknown weather",
      iconUrl: "https://openweathermap.org/img/wn/03d@2x.png",
    })
  })
})
