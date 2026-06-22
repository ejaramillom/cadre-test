// Compile-time type tests for PathKeys<T>.
// These produce type errors (never assignable) if assertions fail — no runtime needed.

import type { PathKeys } from "./path-keys.js";

// Zero-runtime test helpers.

/** True when A and B are mutually assignable (i.e. identical types). */
type Equals<A, B> = [A] extends [B] ? ([B] extends [A] ? true : false) : false;

/** Causes a compile error if T is not `true`. */
type Assert<T extends true> = T;

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

// Flat object
type _FlatKeys = PathKeys<Flat>;
type _AssertFlat = Assert<Equals<_FlatKeys, "id" | "name">>;

// Nested object
type _NestedKeys = PathKeys<Nested>;
type _AssertNested = Assert<
  Equals<
    _NestedKeys,
    | "user"
    | "user.id"
    | "user.address"
    | "user.address.city"
    | "user.address.zip"
    | "active"
  >
>;

// Arrays — indices use `${number}` template segments, not literal 0
type _ArrayKeys = PathKeys<WithArray>;
type _AssertArray = Assert<
  Equals<
    _ArrayKeys,
    | "tags"
    | `tags.${number}`
    | "items"
    | `items.${number}`
    | `items.${number}.value`
  >
>;

// Optional props still appear as path segments
type _OptionalKeys = PathKeys<WithOptional>;
type _AssertOptional = Assert<Equals<_OptionalKeys, "required" | "maybe">>;

// Empty object yields never
type _EmptyKeys = PathKeys<Record<never, never>>;
type _AssertEmpty = Assert<Equals<_EmptyKeys, never>>;