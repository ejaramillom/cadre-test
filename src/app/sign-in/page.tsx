import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function SignInPage() {
  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold tracking-tight text-white">
            Pulse<span className="text-violet-400">.</span>
          </Link>
        </div>
        <Card className="bg-white/5 border-white/10 text-white">
          <CardHeader>
            <CardTitle className="text-xl">Welcome back</CardTitle>
            <CardDescription className="text-white/50">
              Sign in is coming soon. Check back shortly.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              disabled
              className="w-full bg-violet-600 hover:bg-violet-500 text-white"
            >
              Sign in
            </Button>
            <p className="text-center text-white/30 text-xs mt-4">
              <Link href="/" className="hover:text-white/60 transition-colors">
                ← Back to home
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}