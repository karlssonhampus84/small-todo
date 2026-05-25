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

test('togglar prioritet och visar ! i accent-färg', async ({ page }) => {
  await page.getByTestId('todo-input').fill('Brådskande uppgift')
  await page.keyboard.press('Enter')

  const btn = page.getByTestId('priority-btn')
  await expect(btn).toHaveText('·')
  await expect(btn).not.toHaveClass(/active/)

  await btn.click()

  await expect(btn).toHaveText('!')
  await expect(btn).toHaveClass(/active/)
})

test('brådskande todo sorteras före normal todo', async ({ page }) => {
  await page.getByTestId('todo-input').fill('Normal')
  await page.keyboard.press('Enter')

  await page.getByTestId('todo-input').fill('Brådskande')
  await page.keyboard.press('Enter')

  // Markera den nyast tillagda (Brådskande) som prioritet
  await page.getByTestId('priority-btn').first().click()

  const items = page.locator('.todo-item')
  await expect(items.first()).toContainText('Brådskande')
})

test('lägger till todo med deadline och visar chip', async ({ page }) => {
  await page.getByTestId('calendar-btn').click()
  await page.getByTestId('deadline-input').fill('2030-12-31')
  await page.getByTestId('todo-input').fill('Framtida uppgift')
  await page.keyboard.press('Enter')

  await expect(page.getByTestId('deadline-chip')).toBeVisible()
  await expect(page.getByTestId('deadline-chip')).toContainText('31 dec')
})

test('tar bort deadline via × i chip', async ({ page }) => {
  await page.getByTestId('calendar-btn').click()
  await page.getByTestId('deadline-input').fill('2030-12-31')
  await page.getByTestId('todo-input').fill('Uppgift med datum')
  await page.keyboard.press('Enter')

  await expect(page.getByTestId('deadline-chip')).toBeVisible()

  await page.getByTestId('deadline-chip').hover()
  await page.locator('.deadline-remove').click()

  await expect(page.getByTestId('deadline-chip')).not.toBeVisible()
})

test('priority och deadline finns kvar efter reload', async ({ page }) => {
  await page.getByTestId('calendar-btn').click()
  await page.getByTestId('deadline-input').fill('2030-06-15')
  await page.getByTestId('todo-input').fill('Persistent med extras')
  await page.keyboard.press('Enter')
  await page.getByTestId('priority-btn').click()

  await page.reload()

  await expect(page.getByTestId('priority-btn')).toHaveClass(/active/)
  await expect(page.getByTestId('deadline-chip')).toBeVisible()
})
