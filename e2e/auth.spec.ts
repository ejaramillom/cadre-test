import { test, expect } from "@playwright/test"
import { createUser } from "./factories/user"

test.describe("Auth", () => {
  test("sign in via UI and reach profile", async ({ page }) => {
    const user = await createUser()

    await page.goto("/sign-in")
    await expect(page).toHaveURL(/sign-in/)

    // Screenshot of sign-in page before submitting
    await page.screenshot({ path: "e2e/screenshots/sign-in-page.png", fullPage: true })

    await page.getByLabel("Email").fill(user.email)
    await page.getByLabel("Password").fill(user.password)
    await page.getByRole("button", { name: /sign in/i }).click()

    // Wait for redirect to /profile
    await page.waitForURL(/\/profile/, { timeout: 10000 })
    await expect(page).toHaveURL(/\/profile/)

    // Assert user name is visible
    await expect(page.getByText(user.name)).toBeVisible()

    // Screenshot of profile page after login
    await page.screenshot({ path: "e2e/screenshots/profile-after-login.png", fullPage: true })
  })

  test("redirect unauthenticated user from /profile to /sign-in", async ({ page }) => {
    await page.goto("/profile")
    await page.waitForURL(/sign-in/, { timeout: 5000 })
    await expect(page).toHaveURL(/sign-in/)
  })

  test("login returns 200 for unknown email (anti-enumeration)", async ({ request }) => {
    const res = await request.post("/api/auth/login", {
      data: { email: "nobody@doesnotexist.test", password: "anyPassword1" },
    })
    expect(res.status()).toBe(200)
    const body = await res.json()
    expect(body.ok).toBe(false)
    expect(body.error).toBe("Invalid credentials")
  })

  test("login returns 200 for wrong password (anti-enumeration)", async ({ request }) => {
    const user = await createUser()
    const res = await request.post("/api/auth/login", {
      data: { email: user.email, password: "WrongPassword9" },
    })
    expect(res.status()).toBe(200)
    const body = await res.json()
    expect(body.ok).toBe(false)
    expect(body.error).toBe("Invalid credentials")
  })
})
