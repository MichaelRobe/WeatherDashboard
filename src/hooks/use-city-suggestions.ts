import { useMemo } from "react"
import useSWR from "swr"

import { filterCities, parseCityList } from "@/lib/cities"
import citiesDataUrl from "@/assets/data/Cities100k.txt?url"

const fetchCities = async (): Promise<string[]> => {
  const response = await fetch(citiesDataUrl)

  if (!response.ok) {
    throw new Error("Failed to load city list")
  }

  const content = await response.text()
  return parseCityList(content)
}

export function useCitySuggestions(query: string) {
  const { data, error, isLoading } = useSWR<string[]>(citiesDataUrl, fetchCities)

  const suggestions = useMemo(() => {
    return filterCities(data ?? [], query)
  }, [data, query])

  return {
    suggestions,
    isLoading,
    isError: !!error,
  }
}
