import { Field, FieldLabel } from "@/components/ui/field"
import { SidebarMenuButton } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"

import { useGeocoding } from "@/api/open-meteo"
import { useCitySuggestions } from "@/hooks/use-city-suggestions"
import { useLocationContext } from "@/hooks/use-location"
import { useEffect, useState } from "react"

import { IconMapPin } from "@tabler/icons-react"

export function Location() {
  const [inputValue, setInputValue] = useState("")
  const [searchLocation, setSearchLocation] = useState<string | null>(null)
  const { setLocation } = useLocationContext()
  const {
    suggestions,
    isLoading: isSuggestionsLoading,
    isError: isSuggestionsError,
  } = useCitySuggestions(inputValue)

  const { results, isLoading, isError } = useGeocoding(searchLocation)

  useEffect(() => {
    if (!searchLocation || isLoading || isError || results.length === 0) {
      return
    }

    const geocodingResult = results[0]

    setLocation({
      name: geocodingResult.name,
      latitude: geocodingResult.latitude,
      longitude: geocodingResult.longitude,
      timezone: geocodingResult.timezone,
      country: geocodingResult.country,
      countryCode: geocodingResult.country_code,
      state: geocodingResult.admin1,
    })
  }, [results, isError, isLoading, searchLocation, setLocation])

  const handleSearchClick = () => {
    if (inputValue.trim()) {
      setSearchLocation(inputValue)
    }
  }

  return (
    <>
      <Field className="group-data-[collapsible=icon]:hidden">
        <FieldLabel>Location</FieldLabel>
        <ButtonGroup>
          <Combobox
            items={suggestions}
            value={inputValue}
            onInputValueChange={setInputValue}
            onValueChange={(value) => {
              if (!value) {
                return
              }

              setInputValue(value)
              setSearchLocation(value)
            }}
          >
            <ComboboxInput
              placeholder={isSuggestionsLoading ? "Loading cities..." : "Search city"}
              showClear
            />
            <ComboboxContent>
              <ComboboxEmpty>
                {isSuggestionsLoading
                  ? "Loading city list..."
                  : isSuggestionsError
                    ? "Could not load city list"
                    : "No matching city"}
              </ComboboxEmpty>
              <ComboboxList>
                {suggestions.map((city) => (
                  <ComboboxItem key={city} value={city}>
                    {city}
                  </ComboboxItem>
                ))}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
          <Button variant="outline" onClick={handleSearchClick}>
            <IconMapPin />
          </Button>
        </ButtonGroup>
      </Field>

      <SidebarMenuButton className="hidden group-data-[collapsible=icon]:flex">
        <IconMapPin />
        <span className="sr-only">Search location</span>
      </SidebarMenuButton>

    </>
  )
}

export default Location
