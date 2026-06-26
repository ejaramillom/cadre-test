import { NextRequest, NextResponse } from "next/server"
import { loginUser } from "@/bff/v1/login"
import { z } from "zod"

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body" }, { status: 400 })
  }

  const parsed = LoginSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid request body" }, { status: 400 })
  }

  const result = await loginUser(parsed.data.email, parsed.data.password)
  return NextResponse.json(result, { status: 200 })
}
