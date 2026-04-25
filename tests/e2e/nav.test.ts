import { expect, test } from '@playwright/test'

test('page loads with initial "No location selected" state', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByText('No location selected')).toBeVisible()
})

test('sidebar can be opened and closed', async ({ page }) => {
  await page.goto('/')

  const sidebar = page.locator('div[data-slot="sidebar"]')
  const trigger = page.locator('button[data-slot="sidebar-trigger"]')

  // Sidebar starts expanded
  await expect(sidebar).toHaveAttribute('data-state', 'expanded')

  // Collapse it
  await trigger.click()
  await expect(sidebar).toHaveAttribute('data-state', 'collapsed')

  // Expand it again
  await trigger.click()
  await expect(sidebar).toHaveAttribute('data-state', 'expanded')
})

test('switching between Dashboard and Forecast updates the breadcrumb', async ({ page }) => {
  await page.goto('/')

  const breadcrumb = page.getByLabel('breadcrumb')

  // Navigate to Forecast
  await page.getByRole('link', { name: 'Forecast' }).click()
  await expect(page).toHaveURL('/forecast')
  await expect(breadcrumb.getByText('Forecast', { exact: true })).toBeVisible()

  // Navigate back to Dashboard
  await page.getByRole('link', { name: 'Dashboard' }).click()
  await expect(page).toHaveURL('/dashboard')
  await expect(breadcrumb.getByText('Dashboard', { exact: true })).toBeVisible()
})
