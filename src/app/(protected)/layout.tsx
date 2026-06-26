import { redirect } from "next/navigation"
import { auth } from "@/bff/v1/auth"

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session) redirect("/sign-in")
  return <>{children}</>
}