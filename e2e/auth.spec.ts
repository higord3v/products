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

  await page.fill('input[name="email"]', "dinamica");
  await page.fill('input[name="password"]', "123");

  await page.click('button[type="submit"]');

  await expect(page).toHaveURL("http://localhost:3000/products");
  await expect(page.getByText("Produtos em Destaque")).toBeVisible();
  await expect(page.locator(".grid > div").first()).toBeVisible();
});

test("should search for a product", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.fill('input[name="email"]', "dinamica");
  await page.fill('input[name="password"]', "123");
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL("http://localhost:3000/products");

  await page.fill('input[placeholder*="Buscar"]', "Copo");
  await page.click("text=Buscar");

  await expect(page.locator(".grid > div").first()).toBeVisible();
});
