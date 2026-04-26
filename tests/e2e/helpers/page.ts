import { expect, type Locator, type Page } from '@playwright/test'

export function getBreadcrumb(page: Page): Locator {
  return page.getByRole('navigation', { name: /breadcrumb/i })
}

export function getSidebar(page: Page): Locator {
  return page.locator('[data-slot="sidebar"]').first()
}

export function getSidebarToggleButton(page: Page): Locator {
  return page.locator('[data-slot="sidebar-trigger"]')
}

export function getLocationSearchInput(page: Page): Locator {
  return page.getByRole('combobox', { name: 'Search city' })
}

export function getLocationSearchButton(page: Page): Locator {
  return page.locator('button[aria-label="Search location"]')
}

export async function chooseCityFromSuggestions(page: Page, city: string) {
  const searchInput = getLocationSearchInput(page)
  await expect(searchInput).toBeVisible()

  await searchInput.fill(city)
    
  const option = page.getByRole('option', { name: city }).first()
  await expect(option).toBeVisible()
  await option.click()
}

export async function searchCityWithButton(page: Page, city: string) {
  const searchInput = getLocationSearchInput(page)
  const searchButton = getLocationSearchButton(page)

  await expect(searchInput).toBeVisible()
  await expect(searchButton).toBeVisible()

  await searchInput.fill(city)
  await searchButton.click()
}