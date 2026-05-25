import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
  await page.evaluate(() => localStorage.clear())
  await page.reload()
})

test('visar tomt state när listan är tom', async ({ page }) => {
  await expect(page.getByTestId('empty-state')).toBeVisible()
  await expect(page.getByTestId('empty-state')).toHaveText('Inget att göra.')
})

test('lägger till en todo och visar den i listan', async ({ page }) => {
  await page.getByTestId('todo-input').fill('Handla mat')
  await page.keyboard.press('Enter')

  await expect(page.getByTestId('todo-list')).toBeVisible()
  await expect(page.getByText('Handla mat')).toBeVisible()
  await expect(page.getByTestId('empty-state')).not.toBeVisible()
})

test('tomma todos kan inte läggas till', async ({ page }) => {
  await page.getByTestId('todo-input').fill('   ')
  await page.keyboard.press('Enter')

  await expect(page.getByTestId('empty-state')).toBeVisible()
})

test('bockar av en todo och stryker över texten', async ({ page }) => {
  await page.getByTestId('todo-input').fill('Skriv tester')
  await page.keyboard.press('Enter')

  const item = page.locator('.todo-item')
  await expect(item).not.toHaveClass(/done/)

  await page.getByTestId('todo-checkbox').click()
  await expect(item).toHaveClass(/done/)
})

test('tar bort en todo och den försvinner', async ({ page }) => {
  await page.getByTestId('todo-input').fill('Att ta bort')
  await page.keyboard.press('Enter')

  await expect(page.getByText('Att ta bort')).toBeVisible()

  await page.locator('.todo-item').hover()
  await page.getByTestId('delete-btn').click()

  await expect(page.getByText('Att ta bort')).not.toBeVisible()
  await expect(page.getByTestId('empty-state')).toBeVisible()
})

test('todos finns kvar efter reload (localStorage)', async ({ page }) => {
  await page.getByTestId('todo-input').fill('Persistent uppgift')
  await page.keyboard.press('Enter')

  await page.reload()

  await expect(page.getByText('Persistent uppgift')).toBeVisible()
})
