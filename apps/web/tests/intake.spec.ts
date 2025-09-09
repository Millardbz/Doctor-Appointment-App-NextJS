import { test, expect } from "@playwright/test";

test("can submit intake form successfully", async ({ page }) => {
  await page.goto("/");

  await page.getByLabel("Full name").fill("Jane Doe");
  await page.getByLabel("Email").fill("jane@example.com");
  await page.getByLabel("Date of birth").fill("2000-01-01");
  await page.getByLabel("Symptoms").fill("Headache and mild fever for 2 days.");
  await page.getByLabel("I consent to the processing of my information for the purpose of this intake.").check();

  const dialogPromise = page.waitForEvent("dialog"); // because your app uses alert()
  await page.getByRole("button", { name: /submit/i }).click();

  const dialog = await dialogPromise;
  expect(dialog.message()).toMatch(/Thank you/i);
  await dialog.dismiss(); // close alert
});
