# CDR-005 — API Contracts

## POST /api/auth/login

Always returns HTTP 200 (anti-enumeration).

Request:
```json
{ "email": "string", "password": "string" }
```

Success (200 + Set-Cookie):
```json
{ "ok": true }
```

Failure - invalid credentials (200, no cookie):
```json
{ "ok": false, "error": "Invalid credentials" }
```

Validation error (400):
```json
{ "ok": false, "error": "Invalid request body" }
```

## POST /api/v1/register

Request:
```json
{ "name": "string (min 2)", "email": "string (email)", "password": "string (min 8, 1 letter + 1 digit)" }
```

Success (201):
```json
{ "ok": true, "userId": "string" }
```

Duplicate email (409):
```json
{ "ok": false, "error": "Email already registered" }
```

Validation failure (422):
```json
{ "ok": false, "error": "Validation failed", "fields": { "name": "string?", "email": "string?", "password": "string?" } }
```

Server error (500):
```json
{ "ok": false, "error": "Registration failed. Please try again." }
```

Side effects: creates User + Account in a single Prisma transaction. No session cookie set.

## GET /api/auth/session

NextAuth built-in. Returns `{ user: { id, name, email }, expires }` or `{}`.
