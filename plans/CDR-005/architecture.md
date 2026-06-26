# CDR-005 — Architecture

## FSD Layer Map

Lightweight FSD — three layers. Dependencies flow downward only.

```
src/
  app/                          ← Layer 1: Next.js App Router (thin wrappers)
    layout.tsx
    page.tsx
    sign-in/page.tsx            mounts LoginPage from features/auth
    sign-up/page.tsx            mounts RegisterPage from features/auth
    (protected)/
      layout.tsx                session guard, redirect to /sign-in
      profile/page.tsx          server component: auth() + prisma + card
    api/
      auth/
        [...nextauth]/route.ts  re-exports GET, POST from bff/v1/auth.ts
        login/route.ts          re-exports POST from bff/v1/login.ts
      v1/
        register/route.ts       re-exports POST from bff/v1/register.ts

  features/                    ← Layer 2: Domain feature slices
    auth/
      ui/
        LoginForm.tsx           organism: email+password form, client component
        RegisterForm.tsx        organism: name+email+password form, client component
        LoginPage.tsx           page-level card shell + LoginForm
        RegisterPage.tsx        page-level card shell + RegisterForm
      model/
        useLoginForm.ts         hook: form state, validation, POST /api/auth/login
        useRegisterForm.ts      hook: form state, validation, POST /api/v1/register
      lib/
        validators.ts           Zod schemas: LoginSchema, RegisterSchema
      index.ts                  barrel: exports LoginPage, RegisterPage

  shared/                      ← Layer 3: Domain-agnostic primitives
    ui/
      atoms/
        Input.tsx               wraps <input> with consistent styles
        Button.tsx              re-exports from @/components/ui/button
        index.ts
      molecules/
        FormField.tsx           label + Input + error message
        index.ts
      index.ts

  bff/                         ← MVC Controller layer
    db/client.ts               singleton PrismaClient (existing)
    v1/
      auth.ts                  NextAuth v5 config: CredentialsProvider, PrismaAdapter
      login.ts                 loginUser(): credential check + session
      register.ts              registerUser(): hash + User+Account transaction

  middleware.ts                NextAuth middleware: protects /(protected) routes
```

## BFF Pattern

Route handlers are thin: they call one exported function from `src/bff/v1/` and return its result. No business logic in route handlers.

## NextAuth v5 Wiring

`src/bff/v1/auth.ts` exports: `{ handlers, auth, signIn, signOut }`

- PrismaAdapter(prisma)
- CredentialsProvider authorize():
  1. Find Account WHERE provider="credentials" AND providerAccountId=email
  2. If not found: bcrypt.compare(password, DUMMY_HASH) then return null
  3. If found: bcrypt.compare(password, account.password)
  4. On match: return { id, email, name }
  5. On mismatch: return null
- Session callback: inject user.id into session token

## Anti-enumeration Contract

POST /api/auth/login always returns HTTP 200. On success: `{ ok: true }` + Set-Cookie. On failure: `{ ok: false, error: "Invalid credentials" }`. Dummy bcrypt compare equalises timing for unknown emails.

## Key Invariants

- Password hash NEVER in API responses
- POST /api/auth/login ALWAYS returns HTTP 200
- bcrypt cost factor: 12 everywhere
- Account.provider: always "credentials" for password accounts
- Account.providerAccountId: user's email (lowercase)
