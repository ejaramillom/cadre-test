import { cn } from "@/lib/utils"
import type { ComponentProps } from "react"

export function Input({ className, ...props }: ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30",
        "focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-red-500 aria-[invalid=true]:border-transparent",
        className
      )}
      {...props}
    />
  )
}