# CDR-005 — Login / Auth Feature Overview

## What We Are Building

A complete credential-based authentication system for Pulse. Users can register a new
account, sign in, and access protected pages. The system wires NextAuth v5 beta
(CredentialsProvider + PrismaAdapter) against the existing Prisma schema
(User, Account, Session, VerificationToken, Profile).

The feature is split across three architectural layers:

- **Backend (BFF)**: business logic in `src/bff/v1/` — password hashing, credential
  validation, anti-enumeration guard, session management.
- **Frontend (FSD)**: auth feature slice in `src/features/auth/` — form state, client
  validation, API calls. Shared atoms/molecules in `src/shared/ui/`.
- **Pages (App Router)**: thin server-component wrappers in `src/app/` that mount feature
  UI or server-render protected content.

## Scope

In scope for CDR-005:
- POST /api/auth/login with anti-enumeration guard (always HTTP 200)
- POST /api/v1/register (create User + Account in a transaction)
- GET /api/auth/session (NextAuth built-in endpoint, no custom code)
- Sign-in page at /sign-in (replaces existing stub)
- Sign-up page at /sign-up (new)
- Protected profile page at /profile (server component, session-gated)
- NextAuth middleware protecting the /(protected) route group
- Prisma seed with one test user (test@pulse.app / pulse123)
- Playwright E2E: factory user via register API → UI sign-in → screenshot

Out of scope:
- OAuth providers (Google, GitHub) — CDR-006
- Email verification flow
- Password reset flow
- Role-based authorization
- Post / follow / feed — CDR-007

## Success Criteria

1. `POST /api/v1/register` creates a User row + Account row (provider="credentials")
   with bcrypt-hashed password in a single transaction.
2. `POST /api/auth/login` returns HTTP 200 in all branches; `ok: true` + session cookie
   on valid credentials, `ok: false` + error message on invalid.
3. Response time for unknown email vs. known email differs by no more than 10 ms (dummy
   bcrypt compare equalises timing).
4. Visiting `/profile` without a session redirects to `/sign-in`.
5. Visiting `/profile` with a valid session renders the authenticated user's name and email.
6. Playwright test: factory user registered via API, signs in through the UI, screenshot
   captured, test asserts redirect to /profile.
7. `npm run build` passes with zero TypeScript errors.
8. `npm run lint` passes with zero ESLint errors.
