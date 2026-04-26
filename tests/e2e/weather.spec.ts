import { expect, test } from '@playwright/test'

import { chooseCityFromSuggestions } from './helpers/page'
import { mockWeatherApis } from './helpers/weather-api'

test('dashboard renders current weather details and metric cards after location selection', async ({ page }) => {
  await mockWeatherApis(page)
  await page.goto('/')

  await chooseCityFromSuggestions(page, 'London')

  await expect(page.getByText(/London,\s*United Kingdom/)).toBeVisible()
  await expect(page.getByText('Mainly Sunny')).toBeVisible()
  await expect(page.getByText(/18°C/)).toBeVisible()
})

test('forecast route renders daily and hourly forecast sections after location selection', async ({ page }) => {
  await mockWeatherApis(page)
  await page.goto('/forecast')

  await chooseCityFromSuggestions(page, 'London')

  await expect(page).toHaveURL('/forecast')
  await expect(page.getByText('7-Day Forecast')).toBeVisible()
  await expect(page.getByText('14-Day Forecast')).toBeVisible()
  await expect(page.getByText('24-Hour Forecast')).toBeVisible()
  await expect(page.getByText('Mainly Sunny').first()).toBeVisible()
})