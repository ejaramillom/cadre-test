"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { LoginSchema } from "@/features/auth/lib/validators"

interface LoginErrors {
  email?: string
  password?: string
  root?: string
}

export function useLoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState<LoginErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  function handleEmailChange(value: string) {
    setEmail(value)
    if (errors.email) setErrors((e) => ({ ...e, email: undefined }))
  }

  function handlePasswordChange(value: string) {
    setPassword(value)
    if (errors.password) setErrors((e) => ({ ...e, password: undefined }))
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    setErrors({})

    const parsed = LoginSchema.safeParse({ email, password })
    if (!parsed.success) {
      const fieldErrors: LoginErrors = {}
      for (const issue of parsed.error.issues) {
        const field = issue.path[0] as keyof LoginErrors
        fieldErrors[field] = issue.message
      }
      setErrors(fieldErrors)
      return
    }

    setIsSubmitting(true)
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: parsed.data.email, password: parsed.data.password }),
      })
      const data = await res.json()

      if (data.ok) {
        router.push("/profile")
        router.refresh()
      } else {
        setErrors({ root: data.error ?? "Invalid credentials" })
      }
    } catch {
      setErrors({ root: "Something went wrong. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  return { email, password, errors, isSubmitting, handleEmailChange, handlePasswordChange, handleSubmit }
}