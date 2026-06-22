// ponytail: incomplete stub — completed minimally to satisfy compiler
type PathKeys<T> =
  T extends (infer Item)
    ? Item extends object ? PathKeys<Item> : never
    : never;