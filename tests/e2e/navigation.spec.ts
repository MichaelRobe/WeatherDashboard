import { expect, test } from '@playwright/test'

import {
  chooseCityFromSuggestions,
  getBreadcrumb,
  getSidebar,
  getSidebarToggleButton,
} from './helpers/page'
import { mockWeatherApis } from './helpers/weather-api'

test('page loads with initial "No location selected" state', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByText('No location selected')).toBeVisible()
  await expect(page).toHaveURL('/')
})

test('direct dashboard route keeps the empty state until a location is selected', async ({ page }) => {
  await page.goto('/dashboard')

  await expect(page.getByText('No location selected')).toBeVisible()
  await expect(page).toHaveURL('/dashboard')
})

test('sidebar can be opened and closed', async ({ page }) => {
  await page.goto('/')

  const sidebar = getSidebar(page)
  const trigger = getSidebarToggleButton(page)

  await expect(sidebar).toHaveAttribute('data-state', 'expanded')

  await trigger.click()
  await expect(sidebar).toHaveAttribute('data-state', 'collapsed')

  await trigger.click()
  await expect(sidebar).toHaveAttribute('data-state', 'expanded')
})

test('selecting a city from root redirects to dashboard and updates the breadcrumb', async ({ page }) => {
  await mockWeatherApis(page)
  await page.goto('/')

  await chooseCityFromSuggestions(page, 'London')

  await expect(page).toHaveURL('/dashboard')
  await expect(getBreadcrumb(page).getByText('Dashboard', { exact: true })).toBeVisible()
  await expect(page.getByText(/London,\s*United Kingdom/)).toBeVisible()
})

test('unknown routes fall back to dashboard after a location is selected', async ({ page }) => {
  await mockWeatherApis(page)
  await page.goto('/not-a-route')

  await chooseCityFromSuggestions(page, 'London')

  await expect(page).toHaveURL('/dashboard')
  await expect(getBreadcrumb(page).getByText('Dashboard', { exact: true })).toBeVisible()
})

test('switching between dashboard and forecast updates the breadcrumb and visible content', async ({ page }) => {
  await mockWeatherApis(page)
  await page.goto('/')

  await chooseCityFromSuggestions(page, 'London')
  await expect(page).toHaveURL('/dashboard')

  await page.getByRole('link', { name: 'Forecast' }).click()
  await expect(page).toHaveURL('/forecast')
  await expect(getBreadcrumb(page).getByText('Forecast', { exact: true })).toBeVisible()
  await expect(page.getByText('7-Day Forecast')).toBeVisible()

  await page.getByRole('link', { name: 'Dashboard' }).click()
  await expect(page).toHaveURL('/dashboard')
  await expect(getBreadcrumb(page).getByText('Dashboard', { exact: true })).toBeVisible()
})