import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <header className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/60 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight">
          Pulse<span className="text-violet-400">.</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="/sign-in">
            <Button variant="ghost" size="sm">Sign in</Button>
          </Link>
          <Link href="/sign-in">
            <Button size="sm" className="bg-violet-600 hover:bg-violet-500 text-white">
              Get started
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  )
}