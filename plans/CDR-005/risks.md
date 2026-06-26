# CDR-005 — Risks

## Risk 1 — Timing attack / anti-enumeration bypass
**Severity**: High
**Mitigation**: DUMMY_HASH constant at module scope. bcrypt.compare() called even when email not found.
**Verification**: Response time difference < 10 ms over 10 samples.

## Risk 2 — bcrypt cost factor
**Severity**: Medium
**Mitigation**: Cost factor 12 everywhere (register, seed, DUMMY_HASH generation).

## Risk 3 — Session fixation
**Severity**: High
**Mitigation**: NextAuth v5 generates new session token on every sign-in (PrismaAdapter default).

## Risk 4 — CSRF on custom login endpoint
**Severity**: Medium
**Mitigation**: SameSite=Lax cookie + JSON-only content-type (rejects form-encoded CSRF attempts).

## Risk 5 — Password hash in logs/responses
**Severity**: Critical
**Mitigation**: Explicit Prisma select (only fetch needed fields). All catch blocks return generic strings.

## Risk 6 — NextAuth v5 beta instability
**Severity**: Medium
**Mitigation**: Pin exact version 5.0.0-beta.31 in package.json.

## Risk summary

| Risk | Severity | Mitigated |
|------|----------|-----------|
| Timing attack | High | Yes — DUMMY_HASH |
| bcrypt cost | Medium | Yes — cost=12 convention |
| Session fixation | High | Yes — NextAuth default |
| CSRF | Medium | Yes — SameSite=Lax + JSON |
| Hash in response | Critical | Yes — explicit select + catch |
| NextAuth beta | Medium | Yes — pinned version |
