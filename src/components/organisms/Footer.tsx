import { Separator } from "@/components/ui/separator"

export function Footer() {
  return (
    <footer className="px-6 pb-10">
      <div className="max-w-6xl mx-auto">
        <Separator className="bg-white/10 mb-8" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/30">
          <span>
            <strong className="text-white/60">Pulse</strong> — Where moments become connections.
          </span>
          <span>© 2024 Pulse. All rights reserved.</span>
        </div>
      </div>
    </footer>
  )
}