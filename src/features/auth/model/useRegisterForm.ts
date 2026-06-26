"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { RegisterSchema } from "@/features/auth/lib/validators"

interface RegisterErrors {
  name?: string
  email?: string
  password?: string
  root?: string
}

export function useRegisterForm() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState<RegisterErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  function handleNameChange(value: string) {
    setName(value)
    if (errors.name) setErrors((e) => ({ ...e, name: undefined }))
  }

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

    const parsed = RegisterSchema.safeParse({ name, email, password })
    if (!parsed.success) {
      const fieldErrors: RegisterErrors = {}
      for (const issue of parsed.error.issues) {
        const field = issue.path[0] as keyof RegisterErrors
        fieldErrors[field] = issue.message
      }
      setErrors(fieldErrors)
      return
    }

    setIsSubmitting(true)
    try {
      const registerRes = await fetch("/api/v1/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      })
      const registerData = await registerRes.json()

      if (!registerData.ok) {
        if (registerData.fields) {
          setErrors(registerData.fields)
        } else {
          setErrors({ root: registerData.error ?? "Registration failed" })
        }
        return
      }

      const loginRes = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: parsed.data.email, password: parsed.data.password }),
      })
      const loginData = await loginRes.json()

      if (loginData.ok) {
        router.push("/profile")
        router.refresh()
      } else {
        setErrors({ root: "Account created. Please sign in." })
        router.push("/sign-in")
      }
    } catch {
      setErrors({ root: "Something went wrong. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  return { name, email, password, errors, isSubmitting, handleNameChange, handleEmailChange, handlePasswordChange, handleSubmit }
}