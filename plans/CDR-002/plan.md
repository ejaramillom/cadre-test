## Goal

Implement a `PathKeys<T>` TypeScript utility type that produces a union of all valid dot-notation path strings for a nested object type, with a depth limit and array index support.

## Task Type

CODE — purely mechanical implementation of a known TypeScript type-level programming pattern.

## Approach

Use a depth-counter tuple technique to cap recursion at 5 levels. The helper type recurses over `keyof T`, emitting each key as a string and then, if the value type is itself an object or array, recursing with a shorter depth tuple. Arrays/tuples are handled by treating numeric indices as path segments. No new dependencies required. Type tests use a helper `type Assert<T extends true>` pattern alongside `extends` checks.

## Files to Change

- `example/path-keys.ts` — create; exports `PathKeys<T>`
- `example/path-keys.test.ts` — create; compile-time type assertions

## Steps

1. Create `example/path-keys.ts` with depth-counter tuple, `PathKeysHelper<T,D>`, and exported `PathKeys<T>`
2. Create `example/path-keys.test.ts` with `Equals<A,B>`, `Assert<T>`, and test assertions
3. Run `npx tsc --noEmit` to verify both files type-check cleanly

## Edge Cases / Risks

- Circular/recursive types: not guarded beyond depth counter
- `noUncheckedIndexedAccess`: must use `NonNullable<T[K]>` before recursing into arrays
- `exactOptionalPropertyTypes`: optional props must still appear as path segments
- Symbol/number keys: constrain to `keyof T & string`
- Existing stub in `path-variant.ts`: new implementation in separate file

TASK_TYPE: CODE
