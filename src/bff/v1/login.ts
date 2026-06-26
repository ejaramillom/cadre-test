import { prisma } from "@/bff/db/client"
import { encode } from "@auth/core/jwt"
import bcrypt from "bcryptjs"
import { cookies } from "next/headers"

const DUMMY_HASH = "$2b$12$j87FywqVRco0vLRzeiMcjO8Ee0eHv67rnKRUivFxR1knbLk.TywK6"
const SESSION_MAX_AGE = 30 * 24 * 60 * 60
const COOKIE_NAME = "authjs.session-token"

export type LoginResult = { ok: true } | { ok: false; error: string }

export async function loginUser(email: string, password: string): Promise<LoginResult> {
  try {
    const normalizedEmail = email.toLowerCase()

    const account = await prisma.account.findFirst({
      where: { provider: "credentials", providerAccountId: normalizedEmail },
      select: { userId: true, password: true },
    })

    const hash = account?.password ?? DUMMY_HASH
    const valid = await bcrypt.compare(password, hash)

    if (!valid || !account) {
      return { ok: false, error: "Invalid credentials" }
    }

    const user = await prisma.user.findUnique({
      where: { id: account.userId },
      select: { id: true, email: true, name: true },
    })

    if (!user) {
      return { ok: false, error: "Invalid credentials" }
    }

    const secret = process.env.NEXTAUTH_SECRET!
    const now = Math.floor(Date.now() / 1000)

    const token = await encode({
      token: {
        sub: user.id,
        name: user.name,
        email: user.email,
        id: user.id,
        iat: now,
        exp: now + SESSION_MAX_AGE,
      },
      secret,
      salt: COOKIE_NAME,
    })

    const cookieStore = await cookies()
    const expires = new Date(Date.now() + SESSION_MAX_AGE * 1000)

    cookieStore.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      expires,
    })

    return { ok: true }
  } catch {
    return { ok: false, error: "Invalid credentials" }
  }
}