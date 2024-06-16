import {test, expect} from "@playwright/test"

test("Search Request and KnowledgeEvents Display", async ({page}) => {
  await page.goto("http://localhost:3000")
  await page.locator('input[name="search"]').click()
  await page.locator('input[name="search"]').fill("SAML")
  await page.getByRole("button", {name: "Search"}).click()
  await expect(page.getByRole("img").nth(1)).toBeVisible()
  await expect(page.getByText("Skipped Summary").nth(1)).toBeVisible()
  await page.getByRole("button", {name: "Show Knowledge Events"}).nth(1).click()
  await expect(page.getByRole("heading", {name: "Knowledge Events:"})).toBeVisible()
})
