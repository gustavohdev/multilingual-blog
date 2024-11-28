import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Gustavo Avide - Software Engineer/);
});

test("has cta card", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByAltText(/CTA Card Image/)).toBeVisible();
  await expect(page.getByPlaceholder(/Write your email/)).toContainText("");
  await page.getByPlaceholder(/Write your email/).click();
  await page.getByPlaceholder(/Write your email/).fill("teste@teste.com.br");
  await expect(page.getByPlaceholder(/Write your email/)).toHaveValue(/teste@/);
});

// test("has footer", async ({ page }) => {
//   // await page.goto(process.env.NEXT_PUBLIC_SITE_URL as string);
//   // // Expect a title "to contain" a substring.
//   // await expect(page).toHaveTitle(/Gustavo Avide - Software Engineer/);
// });

// test("has personal links working", async ({ page }) => {
//   // await page.goto(process.env.NEXT_PUBLIC_SITE_URL as string);
//   // // Expect a title "to contain" a substring.
//   // await expect(page).toHaveTitle(/Gustavo Avide - Software Engineer/);
// });
