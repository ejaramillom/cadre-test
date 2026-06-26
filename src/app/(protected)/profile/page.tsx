import { auth } from "@/bff/v1/auth"
import { prisma } from "@/bff/db/client"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default async function ProfilePage() {
  const session = await auth()
  if (!session?.user?.id) redirect("/sign-in")

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { name: true, email: true, createdAt: true },
  })

  if (!user) redirect("/sign-in")

  const initial = (user.name ?? user.email ?? "?").charAt(0).toUpperCase()

  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <Card className="bg-white/5 border-white/10 text-white">
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-violet-600 flex items-center justify-center text-lg font-bold text-white flex-shrink-0">
              {initial}
            </div>
            <div>
              <CardTitle className="text-xl">{user.name ?? "User"}</CardTitle>
              <p className="text-sm text-white/50">{user.email}</p>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-white/30">
              Member since {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}