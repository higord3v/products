import { test, expect } from "@playwright/test";

test("should navigate to login", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await expect(page).toHaveURL("http://localhost:3000/");
  await expect(
    page.getByRole("heading", { name: /bem-vindo a innovation brindes/i }),
  ).toBeVisible();
});

test("should login and redirect to products", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  // Fill login form
  await page.fill('input[name="email"]', "dinamica");
  await page.fill('input[name="password"]', "123");

  // Click login
  await page.click('button[type="submit"]');

  // Should redirect to products
  await expect(page).toHaveURL("http://localhost:3000/products");

  // Should see product header
  await expect(page.getByText("Produtos em Destaque")).toBeVisible();

  // Should see products (wait for load)
  await expect(page.locator(".grid > div").first()).toBeVisible();
});

test("should search for a product", async ({ page }) => {
  // Assuming logged in state or re-login (Playwright can save state but let's keep it simple for now or use global setup)
  // For simplicity in this demo, we re-login. In prod we'd use storageState.
  await page.goto("http://localhost:3000/");
  await page.fill('input[name="email"]', "dinamica");
  await page.fill('input[name="password"]', "123");
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL("http://localhost:3000/products");

  // Search
  await page.fill('input[placeholder*="Buscar"]', "Copo");
  // Wait for debounce or click button
  await page.click("text=Buscar");

  // Expect results to filter
  // This depends on live API data but we expect at least the filtering UI to react or results to appear
  await expect(page.locator(".grid > div").first()).toBeVisible();
});
