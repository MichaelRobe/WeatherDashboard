const DEFAULT_CITY_SUGGESTION_LIMIT = 10

const normalize = (value: string) => value.trim().toLowerCase()

export function parseCityList(content: string): string[] {
  return [...new Set(
    content
      .split(/\r?\n/)
      .map((city) => city.trim())
      .filter((city) => city.length > 0)
  )]
}

export function filterCities(
  cities: string[],
  query: string,
  limit = DEFAULT_CITY_SUGGESTION_LIMIT
): string[] {
  if (cities.length === 0 || limit <= 0) {
    return []
  }

  const normalizedQuery = normalize(query)
  const matchingCities = normalizedQuery
    ? cities.filter((city) => city.toLowerCase().includes(normalizedQuery))
    : cities

  return matchingCities.slice(0, limit)
}
