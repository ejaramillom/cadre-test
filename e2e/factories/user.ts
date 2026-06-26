interface CreateUserResult {
  userId: string
  email: string
  password: string
  name: string
}

export async function createUser(suffix?: string): Promise<CreateUserResult> {
  const ts = suffix ?? Date.now().toString()
  const name = `Test User ${ts}`
  const email = `testuser${ts}@playwright.test`
  const password = "PlaywrightTest1"

  const res = await fetch("http://localhost:3000/api/v1/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  })

  if (!res.ok && res.status !== 201) {
    const body = await res.text()
    throw new Error(`createUser failed: ${res.status} ${body}`)
  }

  const data = await res.json()
  if (!data.ok) {
    throw new Error(`createUser failed: ${JSON.stringify(data)}`)
  }

  return { userId: data.userId, email, password, name }
}
