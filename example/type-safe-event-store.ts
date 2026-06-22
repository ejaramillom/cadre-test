// The recursion is the whole point. If T is string[], then Item is string. If T is { name: string }[],
// then Item is { name: string } — and you can call DeepReadonly on it again, going one level deeper.
// Without infer you'd have no way to express "make each element deeply readonly" because you'd have no name to refer
// to the element type.

// T extends Promise<infer Result>        // Result — what the promise resolves to
// T extends (...args: any[]) => infer R  // R — return type (very common abbreviation)
// T extends Map<infer K, infer V>        // K, V — key and value (from standard generics)
// T extends (infer Head)[]               // Head — tuple head element

type DeepReadOnly<T> =
    T extends (string | number | bigint | boolean | symbol | null | undefined)
        ? T
        : T extends readonly (infer Item)[]
            ? readonly DeepReadOnly<Item>[]
        : T extends Map<infer K, infer V>
            ? ReadonlyMap<DeepReadOnly<K>, DeepReadOnly<V>>
        : T extends Set<infer Item>
            ? ReadonlySet<DeepReadOnly<Item>>
        : { readonly [K in keyof T]: DeepReadOnly<T[K]> }

type Pair = [number, { uuid: string }]
type CheckingThis = DeepReadOnly<Pair>
