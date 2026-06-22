// PathKeys<T> — union of all valid dot-notation path strings for a nested object type.
// Depth is capped at 5 levels using a tuple-counter technique.
// See plan: plans/CDR-002/plan.md

// ---------------------------------------------------------------------------
// Depth counter: each recursive call pops one element off the front.
// When D extends never[] the cap is reached and recursion stops.
// ---------------------------------------------------------------------------
type Prev = [never, 0, 1, 2, 3, 4, ...0[]];

// TODO: replace stub with real depth-limited recursion
type PathKeysHelper<T, D extends number> = never; // TODO: implement

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Produces a union of all valid dot-notation path strings for a nested object
 * type T, up to 5 levels deep.
 *
 * @example
 *   type P = PathKeys<{ a: { b: string } }>  // "a" | "a.b"
 */
export type PathKeys<T> = PathKeysHelper<T, 5>; // TODO: wire up Prev depth counter