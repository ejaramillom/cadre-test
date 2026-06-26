import { prisma } from "@/bff/db/client"
import bcrypt from "bcryptjs"
import { Prisma } from "@prisma/client"
import { RegisterSchema } from "@/lib/validators"

export type RegisterResult =
  | { ok: true; userId: string }
  | { ok: false; error: string; fields?: Record<string, string> }

export async function registerUser(input: unknown): Promise<RegisterResult> {
  const parsed = RegisterSchema.safeParse(input)

  if (!parsed.success) {
    const fields: Record<string, string> = {}
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] ? String(issue.path[0]) : "root"
      fields[field] = issue.message
    }
    return { ok: false, error: "Validation failed", fields }
  }

  const { name, email, password } = parsed.data
  const normalizedEmail = email.toLowerCase()

  try {
    const existing = await prisma.account.findFirst({
      where: { provider: "credentials", providerAccountId: normalizedEmail },
      select: { id: true },
    })

    if (existing) {
      return { ok: false, error: "Email already registered" }
    }

    const hash = await bcrypt.hash(password, 12)

    const user = await prisma.$transaction(async (tx) => {
      const newUser = await tx.user.create({
        data: { email: normalizedEmail, name },
        select: { id: true },
      })
      await tx.account.create({
        data: {
          userId: newUser.id,
          provider: "credentials",
          providerAccountId: normalizedEmail,
          password: hash,
        },
      })
      return newUser
    })

    return { ok: true, userId: user.id }
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
      return { ok: false, error: "Email already registered" }
    }
    console.error("registerUser failed", { code: (e as { code?: string })?.code })
    return { ok: false, error: "Registration failed. Please try again." }
  }
}
