// Compile-time type tests for PathKeys<T>.
// These produce type errors (never assignable) if assertions fail — no runtime needed.

import type { PathKeys } from "./path-keys.js";

// ---------------------------------------------------------------------------
// Test helpers (zero-runtime)
// ---------------------------------------------------------------------------

/** True when A and B are mutually assignable (i.e. identical types). */
type Equals<A, B> = [A] extends [B] ? ([B] extends [A] ? true : false) : false;

/** Causes a compile error if T is not `true`. */
type Assert<T extends true> = T;

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

type Flat = { id: number; name: string };

type Nested = {
  user: {
    id: number;
    address: {
      city: string;
      zip: string;
    };
  };
  active: boolean;
};

type WithArray = {
  tags: string[];
  items: { value: number }[];
};

type WithOptional = {
  required: string;
  maybe?: number;
};

// ---------------------------------------------------------------------------
// Test cases — each line is a compile-time assertion.
// Uncomment the Assert<…> calls and replace `never` with expected unions once
// PathKeysHelper is implemented.
// ---------------------------------------------------------------------------

// TODO: flat object — expect "id" | "name"
type _FlatKeys = PathKeys<Flat>;
// type _AssertFlat = Assert<Equals<_FlatKeys, "id" | "name">>;

// TODO: nested object — expect "user" | "user.id" | "user.address" | "user.address.city" | "user.address.zip" | "active"
type _NestedKeys = PathKeys<Nested>;
// type _AssertNested = Assert<Equals<_NestedKeys, "user" | "user.id" | "user.address" | "user.address.city" | "user.address.zip" | "active">>;

// TODO: arrays — numeric indices become path segments ("tags.0", "items.0", "items.0.value")
type _ArrayKeys = PathKeys<WithArray>;
// type _AssertArray = Assert<Equals<_ArrayKeys, /* TODO */ never>>;

// TODO: optional props still appear as path segments
type _OptionalKeys = PathKeys<WithOptional>;
// type _AssertOptional = Assert<Equals<_OptionalKeys, "required" | "maybe">>;

// Smoke check: PathKeys<{}> should be `never`
type _EmptyKeys = PathKeys<Record<never, never>>;
// type _AssertEmpty = Assert<Equals<_EmptyKeys, never>>;