// PathKeys<T> — union of all valid dot-notation path strings for a nested object type.
// Depth is capped at 5 levels using a tuple-counter technique.
// See plan: plans/CDR-002/plan.md

// Prev[D] gives D-1; Prev[0] = never, stopping recursion when cap is reached.
type Prev = [never, 0, 1, 2, 3, 4, ...0[]];

type PathKeysHelper<T, D extends number> = [D] extends [never]
  ? never
  : T extends readonly unknown[]
  ? `${number}` | `${number}.${PathKeysHelper<NonNullable<T[number]>, Prev[D]>}`
  : T extends object
  ? {
      [K in keyof T & string]:
        | K
        | `${K}.${PathKeysHelper<NonNullable<T[K]>, Prev[D]>}`;
    }[keyof T & string]
  : never;

/**
 * Produces a union of all valid dot-notation path strings for a nested object
 * type T, up to 5 levels deep.
 *
 * @example
 *   type P = PathKeys<{ a: { b: string } }>  // "a" | "a.b"
 */
export type PathKeys<T> = PathKeysHelper<T, 5>;