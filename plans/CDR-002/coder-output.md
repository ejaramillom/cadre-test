# CDR-002 Scaffold — Coder Output

## Files Created

### `example/path-keys.ts`
- Exports `PathKeys<T>` (public API type alias)
- Defines `Prev` tuple-counter type (structure correct, values stubbed)
- Defines `PathKeysHelper<T, D>` as `never` — **TODO: full depth-limited recursion**
- `PathKeys<T>` wired to call `PathKeysHelper<T, 5>` — **TODO: hook up Prev counter**

### `example/path-keys.test.ts`
- Imports `PathKeys` from `./path-keys.js` (ESM/nodenext compatible)
- Defines `Equals<A,B>` and `Assert<T>` helpers (zero-runtime)
- Fixture types: `Flat`, `Nested`, `WithArray`, `WithOptional`
- Five test cases (flat, nested, arrays, optional, empty) — **all Assert lines commented out pending implementation**

## Stubbed / TODO

| Symbol | File | Status |
|--------|------|--------|
| `PathKeysHelper` | `path-keys.ts` | Returns `never`; full recursive body not yet written |
| `Prev` depth counter | `path-keys.ts` | Type declared; not yet consumed by helper |
| All `Assert<…>` lines | `path-keys.test.ts` | Commented out; uncomment + fill expected union once helper is implemented |
| Array index handling | `path-keys.ts` | Noted in plan (`noUncheckedIndexedAccess` → `NonNullable`); not yet implemented |

## Type-check Status

`npx tsc --noEmit` — zero errors from new files. Pre-existing error in `example/path-variant.ts` (incomplete stub, not introduced here).