# CDR-002 Implementation Notes

## Key Decisions

### Depth counter
`Prev = [never, 0, 1, 2, 3, 4, ...0[]]` — indexed by current depth D to yield D-1.
Guard `[D] extends [never]` fires when `Prev[0] = never` propagates as the next D, halting recursion.
The spread `...0[]` ensures out-of-bounds indices return `0` rather than `undefined`, keeping the type well-formed for any depth value.

### Array handling
`T extends readonly unknown[]` matches both mutable and readonly arrays before the `object` branch.
Index paths use `${number}` template literal (not literal `"0"`) per plan decision — this correctly represents any valid array index.
`NonNullable<T[number]>` strips `undefined` that `noUncheckedIndexedAccess` adds to array element types.

### Optional properties
`NonNullable<T[K]>` before recursing strips the `| undefined` that `exactOptionalPropertyTypes` adds,
so optional props still appear as path segments (the key K itself is yielded unconditionally).

### Template literal distribution
`${K}.${PathKeysHelper<..., Prev[D]>}` distributes over the recursive union naturally.
When the recursive result is `never`, the template becomes `never` and drops out of the union —
so leaf nodes only contribute their key `K`, not a trailing-dot path.

### path-variant.ts
Pre-existing file had an incomplete conditional type body (syntax error). Fixed with a minimal stub
so the compiler could proceed — the file was never part of CDR-002's scope.

## Surprises

- `[D] extends [never]` (tuple-wrapped) is required because bare `D extends never` distributes over the never union and evaluates to `never` without checking — the tuple wrapper forces a non-distributive check.
- `T extends readonly unknown[]` must come BEFORE `T extends object` since arrays are objects; wrong branch order would lose the `${number}` index paths.
- `noUncheckedIndexedAccess` + `exactOptionalPropertyTypes` both widen value types with `| undefined`; a single `NonNullable<>` wrapper handles both cases consistently.