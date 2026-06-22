import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-16">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-900/40 via-black to-black" />

      <Badge variant="outline" className="mb-6 border-violet-500/50 text-violet-300 text-xs tracking-widest uppercase">
        Social Network 1.0
      </Badge>

      <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-white max-w-3xl leading-tight">
        Share your{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
          pulse
        </span>{" "}
        with the world
      </h1>

      <p className="mt-6 text-lg text-white/60 max-w-xl leading-relaxed">
        Connect with people who matter. Share moments, follow friends, and stay in sync — all in one place.
      </p>

      <div className="mt-10 flex flex-wrap gap-4 justify-center">
        <Link href="/sign-in">
          <Button size="lg" className="bg-violet-600 hover:bg-violet-500 text-white px-8">
            Get started — it&apos;s free
          </Button>
        </Link>
        <Link href="/sign-in">
          <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 px-8">
            Sign in
          </Button>
        </Link>
      </div>

      <p className="mt-6 text-sm text-white/30">No credit card required.</p>
    </section>
  )
}