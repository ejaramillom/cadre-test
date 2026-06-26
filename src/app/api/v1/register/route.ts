import { NextRequest, NextResponse } from "next/server"
import { registerUser } from "@/bff/v1/register"

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body" }, { status: 400 })
  }

  const result = await registerUser(body)

  if (result.ok) return NextResponse.json(result, { status: 201 })
  if (result.error === "Email already registered") return NextResponse.json(result, { status: 409 })
  if (result.error === "Validation failed") return NextResponse.json(result, { status: 422 })
  return NextResponse.json(result, { status: 500 })
}
