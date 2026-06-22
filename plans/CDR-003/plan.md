# CDR-003 — Pulse: Docker Compose + BFF Foundation

## Goal
Stand up the local dev stack (Next.js app + Postgres via Docker Compose) and scaffold the
BFF folder structure. Confirm the app deploys to Vercel. First live URL.

---

## Architecture

```
Containers (local dev):
  app  — Next.js 16 (frontend + BFF, port 3000)
  db   — Postgres 16-alpine (port 5432)

src/
  app/              ← Next.js App Router (pages, layouts, UI)
  app/api/v1/       ← thin route handlers → delegate to bff/v1/
  bff/
    v1/             ← versioned BFF handlers (db calls, business logic)
    db/             ← Prisma client + connection pooling
    reducers/       ← data shape transformers (no db logic here)
    utils/          ← shared BFF utilities
    middleware/     ← anti-enumeration, rate limiting, request guards
```

Vercel production: same Next.js app deployed natively. API routes → serverless functions.
DATABASE_URL points to Vercel Postgres (Neon) via env var.

---

## Approach (ponytail — minimal)

One commit per step. No abstractions beyond what's needed for this step.

---

## Steps

### Step 1 — Docker Compose + Dockerfile
Files: `Dockerfile`, `docker-compose.yml`, `.env.example`, `.dockerignore`

- `Dockerfile`: multi-stage — deps → builder → runner (node:22-alpine)
- `docker-compose.yml`: two services — `app` (build: .) + `db` (postgres:16-alpine)
- App container mounts `src/` as volume for hot reload in dev
- `.env.example`: `DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`
- Verify: `docker compose up` → app reachable at localhost:3000

Commit: `[CDR-003] chore: add Dockerfile and docker-compose for local dev`

### Step 2 — BFF folder scaffold + Prisma
Files: `src/bff/db/client.ts`, `prisma/schema.prisma`, `src/app/api/v1/.gitkeep`

- Install Prisma (`prisma`, `@prisma/client`)
- `prisma/schema.prisma`: User + Post tables (minimal — id, email, name, content, createdAt)
- `src/bff/db/client.ts`: singleton Prisma client (handles Next.js hot-reload edge case)
- Create folder stubs: `bff/v1/`, `bff/reducers/`, `bff/utils/`, `bff/middleware/`
- Verify: `npx prisma generate` runs clean

Commit: `[CDR-003] feat: scaffold BFF structure and Prisma schema`

### Step 3 — Health check route (BFF v1 smoke test)
Files: `src/bff/v1/health.ts`, `src/app/api/v1/health/route.ts`

- `bff/v1/health.ts`: returns `{ status: "ok", version: "v1", ts: Date.now() }`
- `app/api/v1/health/route.ts`: thin handler → calls `bff/v1/health`
- Verifies: BFF thin-handler pattern works end-to-end before auth/db routes

Commit: `[CDR-003] feat: add /api/v1/health BFF route`

### Step 4 — Vercel deploy
Files: `vercel.json` (if needed)

- `VERCEL_TOKEN=$VC_TOKEN vercel deploy --prod`
- Set `DATABASE_URL` in Vercel env vars (Vercel Postgres or Neon free tier)
- Confirm live URL responds + `/api/v1/health` returns 200

Commit: `[CDR-003] chore: add vercel.json and confirm live deployment`

---

## Harness Config

Approach per step:
```
/fix-harness CDR-003 --budget 2 --steps ponytail coder tester code-reviewer \
  --activity "<step description>"
```

Short budget per step ($2). One commit per step. Tester verifies build + docker compose up.

---

## Out of Scope (CDR-003)

- Auth (NextAuth) → CDR-004
- Landing page UI → CDR-004
- Anti-enumeration middleware → CDR-005
- FSD + Atomic Design folder structure → CDR-004

---

## Open Questions

- DB provider for Vercel prod: Vercel Postgres (Neon) or Supabase?
  Recommendation: Neon — free tier, no account setup, wired via `vercel env`
- Dev DB port: 5432 (default) — confirm no local Postgres conflicts
