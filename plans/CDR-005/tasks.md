# CDR-005 — Tasks

Branch: `emmanuel/CDR-005`
Commit format: `[CDR-005] <type>: <description>`
**Status: ✅ COMPLETE**

## Task 1 — Install dependencies ✅
Commit: `[CDR-005] chore: install next-auth v5 beta, bcryptjs, zod, playwright`
Packages: next-auth@5.0.0-beta.31, @auth/prisma-adapter, bcryptjs, zod, @types/bcryptjs (dev), @playwright/test (dev)

## Task 2 — NextAuth v5 config ✅
Commit: `[CDR-005] feat: NextAuth v5 CredentialsProvider with PrismaAdapter`
Files: src/bff/v1/auth.ts, src/app/api/auth/[...nextauth]/route.ts

## Task 3 — Custom login endpoint ✅
Commit: `[CDR-005] feat: POST /api/auth/login with anti-enumeration guard`
Files: src/bff/v1/login.ts, src/app/api/auth/login/route.ts

## Task 4 — Register endpoint ✅
Commit: `[CDR-005] feat: POST /api/v1/register with bcrypt hash + transaction`
Files: src/bff/v1/register.ts, src/app/api/v1/register/route.ts

## Task 5 — Proxy (Next.js 16 breaking change) ✅
Commit: `[CDR-005] fix: rename middleware.ts → proxy.ts (Next.js 16 breaking change)`
Files: src/proxy.ts
Note: Next.js 16 deprecated `middleware.ts` → renamed to `proxy.ts` per docs in node_modules/next/dist/docs/

## Task 6 — Prisma seed ✅
Commit: `[CDR-005] chore: Prisma seed with test user (test@pulse.app / pulse123)`
Files: prisma/seed.ts, package.json (prisma.seed script)

## Task 7 — Zod validators ✅
Commit: `[CDR-005] feat: auth Zod schemas LoginSchema + RegisterSchema`
Files: src/features/auth/lib/validators.ts

## Task 8 — Shared UI atoms ✅
Commit: `[CDR-005] feat: shared UI atoms Input + Button`
Files: src/shared/ui/atoms/Input.tsx, Button.tsx, index.ts

## Task 9 — FormField molecule ✅
Commit: `[CDR-005] feat: shared UI molecule FormField`
Files: src/shared/ui/molecules/FormField.tsx, index.ts, src/shared/ui/index.ts

## Task 10 — Auth hooks ✅
Commit: `[CDR-005] feat: auth feature model useLoginForm + useRegisterForm`
Files: src/features/auth/model/useLoginForm.ts, useRegisterForm.ts

## Task 11 — Auth organisms ✅
Commit: `[CDR-005] feat: LoginForm, RegisterForm, LoginPage, RegisterPage organisms`
Files: src/features/auth/ui/*.tsx, src/features/auth/index.ts

## Task 12 — App pages ✅
Commit: `[CDR-005] feat: sign-in, sign-up, protected profile pages`
Files: src/app/sign-in/page.tsx (replaced stub), src/app/sign-up/page.tsx, src/app/(protected)/layout.tsx, src/app/(protected)/profile/page.tsx

## Task 13 — Playwright E2E ✅
Commit: `[CDR-005] test: Playwright E2E — register factory + sign-in UI + anti-enumeration + screenshots`
Files: playwright.config.ts, e2e/auth.spec.ts, e2e/factories/user.ts
Results: 4/4 tests passing

## Task 14 — Docs ✅
Commit: `[CDR-005] docs: architecture plan files + CLAUDE.md`
Files: plans/CDR-005/*.md, CLAUDE.md

## PR ✅
Title: `[CDR-005] feat: credentials auth — login, register, session, Playwright E2E`
Branch: emmanuel/CDR-005 → main
URL: https://github.com/ejaramillom/cadre-test/pull/4
