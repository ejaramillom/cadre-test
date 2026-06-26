# CDR-005 — Pulse: Database Schema + Auth Foundation

**Status: ✅ COMPLETE** — 2026-06-26
PR: https://github.com/ejaramillom/cadre-test/pull/4
Tests: 4/4 Playwright passing · Screenshots: e2e/screenshots/


## Goal
Initialize Postgres with a minimal, extensible schema. Wire NextAuth v5 credentials
provider. Users can sign up and log in. Live on Vercel with Neon DB.

---

## Schema Design

### Decision: password outside User table
Password hash lives in `Account`, not `User`. When OAuth providers (Google, GitHub) are
added later, those users have no password — a nullable `passwordHash` on every User row
is a design smell. NextAuth v5 Prisma adapter expects this separation natively.

### Tables

```prisma
// Identity — minimal, no credentials here
model User {
  id        String   @id @default(cuid())
  email     String   @unique          // unique constraint blocks duplicate signup
  name      String?
  image     String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  accounts Account[]
  sessions Session[]
  profile  Profile?

  // Future FK targets (no columns here, just relations):
  // posts     Post[]
  // follows   Follow[]    (userId as follower)
  // following Follow[]    (userId as following)
  // likes     Like[]
}

// Credentials + future OAuth providers
model Account {
  id                String  @id @default(cuid())
  userId            String
  provider          String  // "credentials" | "google" | "github"
  providerAccountId String  // email for credentials, OAuth ID for providers
  password          String? // bcrypt hash — only set for provider="credentials"

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
  @@index([userId])
}

// NextAuth session store
model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
}

// Email verification (NextAuth requirement)
model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}

// Separate profile — as little as possible, extensible
model Profile {
  id        String   @id @default(cuid())
  userId    String   @unique
  bio       String?
  location  String?  // city, country — free text for now
  avatarUrl String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

### Future tables (stubs — not in this commit)
```
Post    { id, authorId(User), content, createdAt }
Follow  { followerId(User), followingId(User), createdAt }  ← one table, two FKs
Like    { userId(User), postId(Post), createdAt }
Comment { id, userId(User), postId(Post), content, createdAt }
```

---

## Commits

### Commit 1 — Prisma setup + schema
Files: `prisma/schema.prisma`, `src/bff/db/client.ts`, `.env.example` (updated)

- Install: `prisma`, `@prisma/client`
- Write schema (User, Account, Session, VerificationToken, Profile)
- `bff/db/client.ts`: singleton Prisma client (hot-reload guard)
- `.env.example`: add `DATABASE_URL=postgresql://pulse:pulse@localhost:5432/pulse`
- Local: `docker compose up db -d` → `npx prisma db push` → `npx prisma studio`
- Verify: all tables created, unique constraint on User.email visible

Commit: `[CDR-005] feat: Prisma schema (User, Account, Session, Profile)`

### Commit 2 — NextAuth v5 wiring
Files: `src/bff/v1/auth.ts`, `src/app/api/auth/[...nextauth]/route.ts`, `src/middleware.ts`

- Install: `next-auth@beta`, `@auth/prisma-adapter`, `bcryptjs`, `@types/bcryptjs`
- `bff/v1/auth.ts`: NextAuth config
  - Provider: Credentials (email + password)
  - Adapter: PrismaAdapter(prisma)
  - Callbacks: session includes user.id
  - authorize(): find Account by email+provider="credentials", bcrypt.compare()
- `app/api/auth/[...nextauth]/route.ts`: thin — `export { GET, POST } from "@/bff/v1/auth"`
- `middleware.ts`: protect `/(protected)/*` → redirect to `/sign-in`
- `.env.example`: add `NEXTAUTH_SECRET=` (generate: `openssl rand -base64 32`)

Commit: `[CDR-005] feat: NextAuth v5 credentials provider + middleware`

### Commit 3 — Sign-up + Sign-in pages + seed
Files: `src/app/sign-in/page.tsx` (replace stub), `src/app/sign-up/page.tsx`, `prisma/seed.ts`

- Sign-in: email + password form → `signIn("credentials")` → redirect to `/profile`
- Sign-up: email + name + password → POST `/api/auth/register` → auto sign-in
- Register BFF route: `src/bff/v1/register.ts` + `src/app/api/v1/register/route.ts`
  - Check unique email (409 if exists)
  - bcrypt hash password (rounds: 12)
  - Create User + Account in a transaction
  - Anti-enumeration: same response time/message whether email exists or not
- `prisma/seed.ts`: test user (test@pulse.app / pulse123)

Commit: `[CDR-005] feat: sign-up/sign-in flows + seed user`

### Commit 4 — Profile page (protected)
Files: `src/app/(protected)/profile/page.tsx`

- Server component — fetch session via `auth()`
- shadcn Card: avatar initial, name, email
- Redirect to `/sign-in` if no session (middleware handles, page is belt+suspenders)

Commit: `[CDR-005] feat: protected profile card`

---

## Local dev flow
```bash
docker compose up db -d
npx prisma db push
npx prisma db seed
npm run dev
# → sign up at /sign-up or sign in at /sign-in with test@pulse.app / pulse123
# → /profile shows the card
```

## Vercel deploy (after all commits pass locally)
```bash
# Create Neon DB at console.neon.tech → copy connection string
VERCEL_TOKEN=$VC_TOKEN vercel env add DATABASE_URL production --scope pulse22
VERCEL_TOKEN=$VC_TOKEN vercel env add NEXTAUTH_SECRET production --scope pulse22
DATABASE_URL=<neon-url> npx prisma db push
VERCEL_TOKEN=$VC_TOKEN vercel deploy --prod --yes --scope pulse22
```

---

## Anti-enumeration note
Sign-up and sign-in must return identical error messages and response times
regardless of whether an email exists. Implementation: always bcrypt.compare()
even when user not found (compare against a dummy hash to burn the same time).

---

## Out of scope (CDR-005)
- OAuth providers (Google/GitHub) → CDR-006
- Post creation + feed → CDR-006
- Follow/like/comment → CDR-007
- FSD full restructure → ongoing

bff/v1/login
bff/v1/posts
bff/v1/users
