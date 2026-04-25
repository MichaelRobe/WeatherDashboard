import { describe, expect, test } from "vitest"

import { filterCities, parseCityList } from "../../src/lib/cities"

describe("parseCityList", () => {
  test("trims lines, removes empty rows, and deduplicates cities", () => {
    const content = " London\n\nParis\nLondon\r\n  Rome  \n"

    expect(parseCityList(content)).toEqual(["London", "Paris", "Rome"])
  })
})

describe("filterCities", () => {
  const cities = ["London", "Paris", "Rome", "Londonderry"]

  test("returns case-insensitive matches preserving original order", () => {
    expect(filterCities(cities, "LoN")).toEqual(["London", "Londonderry"])
  })

  test("returns the first N entries when query is empty", () => {
    expect(filterCities(cities, "", 2)).toEqual(["London", "Paris"])
  })

  test("respects the limit and returns empty arrays for invalid input constraints", () => {
    expect(filterCities(cities, "o", 1)).toEqual(["London"])
    expect(filterCities(cities, "o", 0)).toEqual([])
    expect(filterCities([], "o", 10)).toEqual([])
  })
})
