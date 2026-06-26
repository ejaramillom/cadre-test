import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-16 overflow-hidden">
      {/* Animated orbs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="animate-float-slow absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-violet-600/20 blur-[120px]" />
        <div className="animate-float-medium absolute -bottom-20 -right-20 w-[400px] h-[400px] rounded-full bg-fuchsia-600/15 blur-[100px]" style={{ animationDelay: "4s" }} />
        <div className="animate-float-slow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-violet-500/10 blur-[80px]" style={{ animationDelay: "9s" }} />
      </div>

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