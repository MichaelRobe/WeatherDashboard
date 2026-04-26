import { expect, test } from '@playwright/test'

import {
  getLocationSearchInput,
  searchCityWithButton,
} from './helpers/page'
import {
  mockWeatherApis,
  parisGeocodingResponse,
} from './helpers/weather-api'

test('typing a partial query shows matching city suggestions', async ({ page }) => {
  await page.goto('/')

  await getLocationSearchInput(page).fill('Lon')

  await expect(page.getByRole('listbox')).toBeVisible()
  await expect(page.getByRole('option', { name: 'London', exact: true })).toBeVisible()
})

test('search button geocodes the typed city without choosing a suggestion first', async ({ page }) => {
  await mockWeatherApis(page, {
    geocodingResponse: parisGeocodingResponse,
  })
  await page.goto('/')

  await searchCityWithButton(page, 'Paris')

  await expect(page).toHaveURL('/dashboard')
  await expect(page.getByText(/Paris,\s*France/)).toBeVisible()
})

test('unknown city queries show the empty combobox state and keep the app in place', async ({ page }) => {
  await page.goto('/')

  await getLocationSearchInput(page).fill('zzzz')

  await expect(page.getByText('No matching city')).toBeVisible()
  await expect(page.getByText('No location selected')).toBeVisible()
  await expect(page).toHaveURL('/')
})