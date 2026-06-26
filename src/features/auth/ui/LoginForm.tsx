"use client"

import Link from "next/link"
import { FormField } from "@/shared/ui/molecules"
import { Button } from "@/shared/ui/atoms"
import { useLoginForm } from "@/features/auth/model/useLoginForm"

export function LoginForm() {
  const { email, password, errors, isSubmitting, handleEmailChange, handlePasswordChange, handleSubmit } = useLoginForm()

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormField id="email" label="Email" type="email" placeholder="you@example.com" value={email} onChange={handleEmailChange} disabled={isSubmitting} error={errors.email} />
      <FormField id="password" label="Password" type="password" placeholder="••••••••" value={password} onChange={handlePasswordChange} disabled={isSubmitting} error={errors.password} />
      {errors.root && (
        <p role="alert" className="text-sm text-red-400 text-center">{errors.root}</p>
      )}
      <Button type="submit" disabled={isSubmitting} className="w-full bg-violet-600 hover:bg-violet-500 text-white">
        {isSubmitting ? "Signing in…" : "Sign in"}
      </Button>
      <p className="text-center text-white/40 text-sm">
        No account?{" "}
        <Link href="/sign-up" className="text-violet-400 hover:text-violet-300 transition-colors">Sign up</Link>
      </p>
    </form>
  )
}