# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Stack

- **Next.js 16.2.9** (App Router, RSC) — this is a bleeding-edge version with breaking changes; check `node_modules/next/dist/docs/` before writing new code
- **React 19.2.4**, **TypeScript 5**
- **Tailwind CSS v4** (PostCSS plugin: `@tailwindcss/postcss`) — config lives in `src/app/globals.css`, no `tailwind.config.ts`
- **shadcn/ui** (base-nova style, CSS variables, neutral base color) — add components with `npx shadcn add <component>`
- **Prisma 6** + **PostgreSQL 16**
- **NextAuth v5** (beta) — coming in CDR-005; config lives in `src/bff/v1/auth.ts`

## Commands

```bash
npm run dev          # start dev server on :3000
npm run build        # production build
npm run lint         # eslint (flat config in eslint.config.mjs)

docker compose up db -d     # start local postgres (pulse/pulse/pulse on :5432)
npx prisma db push          # sync schema → DB (no migrations file)
npx prisma studio           # DB browser on :5555
npx prisma db seed          # seed test user (test@pulse.app / pulse123)
```

## Architecture

### BFF pattern
Server-side logic lives in `src/bff/`; route handlers in `src/app/api/` are thin re-exports.

```
src/bff/db/client.ts        # singleton PrismaClient (hot-reload guard via globalThis)
src/bff/v1/auth.ts          # NextAuth config (credentials provider, PrismaAdapter)
src/bff/v1/register.ts      # user creation logic (hash, User+Account transaction)
src/app/api/auth/[...nextauth]/route.ts   # re-exports GET/POST from bff/v1/auth
src/app/api/v1/register/route.ts          # re-exports POST from bff/v1/register
```

### Route structure
- Public: `src/app/page.tsx`, `src/app/sign-in/`, `src/app/sign-up/`
- Protected: `src/app/(protected)/` — guarded by `src/middleware.ts` (redirects to `/sign-in`)

### Components
- `src/components/organisms/` — page-level sections (Navbar, Hero, Features, Footer)
- `src/components/ui/` — shadcn primitives (button, card, badge, separator)
- `src/lib/utils.ts` — `cn()` (clsx + tailwind-merge)

### Schema
Password hash lives in `Account`, not `User` — supports OAuth providers later without nullable columns on every user row. `Profile` uses `userId` as PK (1:1).

## Environment

```
DATABASE_URL=postgresql://pulse:pulse@localhost:5432/pulse
NEXTAUTH_SECRET=<openssl rand -base64 32>
NEXTAUTH_URL=http://localhost:3000
```

Copy `.env.example` to `.env` for local dev.

## Deployment

Vercel scope: **pulse22**. Production DB: Neon. Prisma runs `db push` (no migration files — schema-first on this project).

```bash
VERCEL_TOKEN=$VC_TOKEN vercel deploy --prod --yes --scope pulse22
```
