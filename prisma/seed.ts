import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  const email = "test@pulse.app"
  const hash = await bcrypt.hash("pulse123", 12)

  const user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: { email, name: "Test User" },
  })

  await prisma.account.upsert({
    where: {
      provider_providerAccountId: {
        provider: "credentials",
        providerAccountId: email,
      },
    },
    update: { password: hash },
    create: {
      userId: user.id,
      provider: "credentials",
      providerAccountId: email,
      password: hash,
    },
  })

  console.log("Seeded test@pulse.app / pulse123")
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())