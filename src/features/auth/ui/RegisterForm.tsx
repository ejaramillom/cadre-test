"use client"

import Link from "next/link"
import { FormField } from "@/shared/ui/molecules"
import { Button } from "@/shared/ui/atoms"
import { useRegisterForm } from "@/features/auth/model/useRegisterForm"

export function RegisterForm() {
  const { name, email, password, errors, isSubmitting, handleNameChange, handleEmailChange, handlePasswordChange, handleSubmit } = useRegisterForm()

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormField id="name" label="Name" type="text" placeholder="Your name" value={name} onChange={handleNameChange} disabled={isSubmitting} error={errors.name} />
      <FormField id="email" label="Email" type="email" placeholder="you@example.com" value={email} onChange={handleEmailChange} disabled={isSubmitting} error={errors.email} />
      <FormField id="password" label="Password" type="password" placeholder="Min. 8 chars, 1 letter + 1 number" value={password} onChange={handlePasswordChange} disabled={isSubmitting} error={errors.password} />
      {errors.root && (
        <p role="alert" className="text-sm text-red-400 text-center">{errors.root}</p>
      )}
      <Button type="submit" disabled={isSubmitting} className="w-full bg-violet-600 hover:bg-violet-500 text-white">
        {isSubmitting ? "Creating account…" : "Create account"}
      </Button>
      <p className="text-center text-white/40 text-sm">
        Already have an account?{" "}
        <Link href="/sign-in" className="text-violet-400 hover:text-violet-300 transition-colors">Sign in</Link>
      </p>
    </form>
  )
}