# CDR-002 Scaffold — Simplification Review

Scope: `example/path-keys.ts`, `example/path-keys.test.ts` (HEAD commit).

## D4 Structure — CLEAN
Two files, flat. No premature layering. Appropriate for a single type utility.

## D9 Repetition — CLEAN
No duplication. TODO status is tracked in three places (code comments, test
comments, coder-output.md) but that is scaffold bookkeeping, not code.

---

[Severity: Warning] D2 — Comments
File: example/path-keys.ts:6-9, 14-16
Evidence: `// Depth counter: each recursive call pops one element off the front.`
Issue: The helper is still `never` — these comments describe behavior that does
not exist yet. They are descriptive (WHAT/HOW), not WHY, and will drift from the
real implementation.
Fix: Defer the mechanism comment until the recursion is written; keep only the
WHY ("depth cap avoids infinite TS recursion") next to the cap value.

[Severity: Nit] D2 — Comments
File: example/path-keys.test.ts:18-22, 35-37
Evidence: `// --- Fixtures ---` banner separators.
Issue: ASCII banner dividers are structural decoration in a 67-line file; the
type names already self-document the sections.
Fix: Drop the banner rules; a single blank line suffices.

[Severity: Nit] D10 — Readability
File: example/path-keys.ts:11
Evidence: `type PathKeysHelper<T, D extends number> = never; // TODO: implement`
Issue: `D` is accepted but unused, and `Prev` is declared but never consumed —
a reader cannot tell intended wiring from dead scaffolding.
Fix: Acceptable as a stub, but a one-line WHY ("`D` indexes `Prev` to decrement
depth") makes the intended contract navigable.
