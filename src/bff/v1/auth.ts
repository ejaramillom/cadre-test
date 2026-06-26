import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/bff/db/client"
import bcrypt from "bcryptjs"

const DUMMY_HASH = "$2b$12$j87FywqVRco0vLRzeiMcjO8Ee0eHv67rnKRUivFxR1knbLk.TywK6"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/sign-in",
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const email = String(credentials.email).toLowerCase()
        const password = String(credentials.password)

        const account = await prisma.account.findFirst({
          where: { provider: "credentials", providerAccountId: email },
          select: { userId: true, password: true },
        })

        const hash = account?.password ?? DUMMY_HASH
        const valid = await bcrypt.compare(password, hash)

        if (!valid || !account) return null

        const user = await prisma.user.findUnique({
          where: { id: account.userId },
          select: { id: true, email: true, name: true },
        })

        return user
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.id = user.id
      return token
    },
    session({ session, token }) {
      if (token.id) session.user.id = String(token.id)
      return session
    },
  },
})