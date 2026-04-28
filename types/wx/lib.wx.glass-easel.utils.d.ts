declare namespace WechatMiniprogram.GlassEasel.TypeUtils {
    type Empty = Record<never, never>

    type IsEmpty<T> = Equal<T, Empty>

    type NewField<TObject, TField extends string, TValueType> =
        Extract<keyof TObject, TField> extends never ? TValueType : never

    type NewFieldList<TObject, TNewObject> =
        Extract<keyof TObject, keyof TNewObject> extends never
            ? TNewObject
            : never

    type Equal<X, Y> =
        (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
            ? true
            : false

    /**
     * UnionToIntersection<'foo' | 42 | true> = 'foo' & 42 & true
     * UnionToIntersection<(() => 'foo') | ((i: 42) => true)> = (() => 'foo') & ((i: 42) => true)
     */
    type UnionToIntersection<T> = (
        T extends unknown ? (arg: T) => void : never
    ) extends (args: infer Arg) => void
        ? Arg
        : never

    /**
     * Merge<{ foo: string }, { bar: number }> = { foo: string, bar: number }
     */
    type Merge<U> = U extends infer T ? { [K in keyof T]: T[K] } : never

    /**
     * IsAny<any> = true
     * IsAny<{}> = false
     */
    type IsAny<T> =
        (<S>(S: S) => S extends T ? 1 : 2) extends <R>(
            R: R
        ) => R extends any ? 1 : 2
            ? true
            : false

    /**
     * IsNever<never> = true
     * IsNever<unknown> = false
     * IsNever<any> = false
     */
    type IsNever<T> = [T] extends [never] ? true : false

    type SetDataStringPath<K extends string | number, Prefix extends string> = [
        Prefix
    ] extends [never]
        ? `${K}`
        : K extends number
          ? `${Prefix}[${K}]`
          : `${Prefix}.${K}`

    type Tuple<T, Res extends Array<1> = []> = 0 extends 1
        ? never
        : Res['length'] extends T
          ? Res
          : Tuple<T, [...Res, 1]>

    type Subtract<M extends number, S extends number> =
        Tuple<M> extends [...Tuple<S>, ...infer Rest] ? Rest['length'] : never

    /**
     * SetDataSetter<{ name: string; foo: { bar: number } }> = {
     *   name: string,
     *   foo: { bar: number },
     *   'foo.bar': number,
     * }
     * setDataSetter<{ list: number[], foo: { bar: number }[]}> = {
     *   list: number[],
     *   `list[${number}]`: number,
     *   foo: { bar: number }[],
     *   `foo[${number}]`: { bar: number }[],
     *   `foo[${number}].bar`: number,
     * }
     */
    type SetDataSetter<
        T,
        Prefix extends string = never,
        Count extends number = 4
    > = Count extends 0
        ? Record<SetDataStringPath<any, Prefix>, T>
        : IsAny<T> extends true
          ? Record<SetDataStringPath<any, Prefix>, T>
          : UnionToIntersection<
                T extends any[]
                    ? {
                          [P in keyof T & number]: SetDataSetter<
                              T[P],
                              SetDataStringPath<P, Prefix>,
                              Subtract<Count, 1>
                          > &
                              Record<SetDataStringPath<P, Prefix>, T[P]>
                      }[keyof T & number]
                    : T extends Record<string | number, any>
                      ? {
                            [P in keyof T & (string | number)]: SetDataSetter<
                                T[P],
                                SetDataStringPath<P, Prefix>,
                                Subtract<Count, 1>
                            > &
                                Record<SetDataStringPath<P, Prefix>, T[P]>
                        }[keyof T & (string | number)]
                      : never
            >

    /**
     * DeepReadonly<{ foo: { bar: number } }> = {
     *   readonly foo: {
     *     readonly bar: number
     *   }
     * }
     */
    type DeepReadonly<T, Count extends number = 4> = Count extends 0
        ? T
        : T extends Record<any, any>
          ? T extends (...args: any[]) => any
              ? T
              : {
                    readonly [P in keyof T]: DeepReadonly<
                        T[P],
                        Subtract<Count, 1>
                    >
                }
          : T

    type PublicFields<T> = {
        [K in keyof T as K extends `_$${any}` ? never : K]: T[K]
    }

    /**
     * ObjectDataPathStrings<{ name: string; age: number }> = 'name' | 'age'
     * ObjectDataPathStrings<{
     *   refCount: number;
     *   person: { name: string; age: number };
     * }> = 'refCount' | 'person' | 'person.name' | 'person.age'
     * ObjectDataPathStrings<{ books: [{ name: string; price: number }] }> =
     *   'books' | `books[${number}]` | `books[${number}].name` | `books[${number}].price`
     */
    type ObjectDataPathStrings<
        T,
        Prefix extends string = never,
        Count extends number = 4
    > = Count extends 0
        ? SetDataStringPath<any, Prefix>
        : IsAny<T> extends true
          ? SetDataStringPath<any, Prefix>
          : T extends any[]
            ? {
                  [P in keyof T & number]:
                      | SetDataStringPath<P, Prefix>
                      | ObjectDataPathStrings<
                            T[P],
                            SetDataStringPath<P, Prefix>,
                            Subtract<Count, 1>
                        >
              }[keyof T & number]
            : T extends Record<string | number, any>
              ? {
                    [P in keyof T & (string | number)]:
                        | SetDataStringPath<P, Prefix>
                        | ObjectDataPathStrings<
                              T[P],
                              SetDataStringPath<P, Prefix>,
                              Subtract<Count, 1>
                          >
                }[keyof T & (string | number)]
              : Prefix

    type ObserverDataPathStrings<
        T,
        S extends string = ObjectDataPathStrings<T>
    > = '**' | S | `${S}.**`

    /**
     * GetFromDataPathString<{ name: string; age: number }, 'name'> = string
     * GetFromDataPathString<{ person: { name: string; age: number } }, 'person.name'> = string
     * GetFromDataPathString<{ books: [{ name: string; price: number }] }, 'books[0].name'> = string
     */
    type GetFromDataPathString<T, P extends string> = P extends keyof T
        ? T[P]
        : P extends ''
          ? T
          : P extends `[${infer K extends keyof T & number}].${infer R}`
            ? GetFromDataPathString<T[K], R>
            : P extends `[${infer K extends keyof T & number}]${infer R}`
              ? GetFromDataPathString<T[K], R>
              : P extends `${infer K extends keyof T & string}[${infer R}`
                ? GetFromDataPathString<T[K], `[${R}`>
                : P extends `${infer K extends keyof T & string}.${infer R}`
                  ? GetFromDataPathString<T[K], R>
                  : never

    type GetFromObserverPathString<T, P extends string> = P extends '**'
        ? GetFromDataPathString<T, ''>
        : P extends `${infer K}.**`
          ? GetFromDataPathString<T, K>
          : GetFromDataPathString<T, P>

    /**
     * GetFromDataPath<{ foo: { bar: number } }, ['foo', 'bar']> = number
     * GetFromDataPath<{ list: { bar: number }[] }, ['list', 0, 'bar']> = number
     * GetFromDataPath<{ list: number }, ['nonExists']> = never
     */
    type GetFromDataPath<
        T,
        K extends ReadonlyArray<string | number>
    > = K extends [infer F, ...infer R extends Array<string | number>]
        ? F extends keyof T
            ? GetFromDataPath<T[F], R>
            : never
        : T

    const TaggedSymbol: unique symbol
    type Tagged = typeof TaggedSymbol

    type IfNeverOrAny<T, Replacement> = [T] extends [never]
        ? Replacement
        : 1 extends T & 0
          ? Replacement
          : T

    type GetTags<B> = B extends {
        readonly [Tag in Tagged]: infer Tags extends symbol[]
    }
        ? Tags
        : []

    type GetTagsWithout<B, T extends symbol, Tags = GetTags<B>> = Tags extends [
        infer F,
        ...infer R
    ]
        ? Equal<T, F> extends true
            ? GetTagsWithout<B, T, R>
            : [F, ...GetTagsWithout<B, T, R>]
        : []

    type UnTagAll<B> = Tagged extends keyof IfNeverOrAny<B, unknown>
        ? B extends infer Origin & { readonly [Tag in Tagged]: GetTags<B> }
            ? Origin
            : B
        : B

    type Tag<B, T extends symbol> = [IfNeverOrAny<B, unknown>] extends [
        null | undefined
    ]
        ? B
        : UnTagAll<B> & { readonly [Tag in Tagged]: [...GetTags<B>, T] }

    type UnTag<
        B,
        T extends symbol,
        Tags = GetTagsWithout<B, T>
    > = Tagged extends keyof IfNeverOrAny<B, unknown>
        ? Tags extends []
            ? UnTagAll<B>
            : UnTagAll<B> & { readonly [Tag in Tagged]: Tags }
        : B

    type HasTag<B, T extends symbol> = T extends GetTags<B>[number]
        ? true
        : false

    type DataList = Record<string, unknown>
    type PropertyList = Record<string, PropertyListItem<PropertyType, any>>

    type PropertyType =
        | null
        | StringConstructor
        | NumberConstructor
        | BooleanConstructor
        | ArrayConstructor
        | ObjectConstructor
        | FunctionConstructor

    /**
     * PropertyTypeToValueType<null> = any
     * PropertyTypeToValueType<typeof String> = string
     * PropertyTypeToValueType<typeof Number> = number
     */
    type PropertyTypeToValueType<T extends PropertyType> = T extends null
        ? any
        : T extends StringConstructor
          ? string
          : T extends NumberConstructor
            ? number
            : T extends BooleanConstructor
              ? boolean
              : T extends ArrayConstructor
                ? any[]
                : T extends ObjectConstructor
                  ? Record<string, any> | null
                  : T extends FunctionConstructor
                    ? (...args: any[]) => any
                    : never

    type Satisfy<T, V> = V extends T ? V : T

    /**
     * PropertyTypeToSimpleValueType<typeof String, 'foo'> = 'foo'
     * PropertyTypeToSimpleValueType<typeof String, 123> = string
     */
    type PropertyTypeToSimpleValueType<
        T extends PropertyType,
        V
    > = T extends StringConstructor
        ? Satisfy<string, V>
        : T extends NumberConstructor
          ? Satisfy<number, V>
          : T extends BooleanConstructor
            ? Satisfy<boolean, V>
            : T extends ArrayConstructor
              ? Satisfy<any[], V>
              : T extends ObjectConstructor
                ? Satisfy<Record<string, any> | null, V>
                : T extends FunctionConstructor
                  ? Satisfy<(...args: any[]) => any, V>
                  : never

    /**
     * PropertyValueType<null> = any
     * PropertyValueType<typeof String> = string
     * PropertyValueType<typeof String | typeof Number> = string | number
     * PropertyValueType<{ type: typeof String }> = string
     * PropertyValueType<{ type: typeof String, optionalTypes: [typeof Number] }> = string | number
     * PropertyValueType<{ type: typeof String, value: 'foo' }> = 'foo'
     * PropertyValueType<{ type: typeof String, value: 123 }> = never
     * PropertyValueType<{ type: typeof String, optionalTypes: [typeof Number], value: 123 }> =
     *  string | 123
     */
    type PropertyValueType<P extends PropertyListItem<PropertyType, any>> =
        P extends PropertyListItem<infer T, infer V>
            ? unknown extends V
                ? PropertyTypeToValueType<T>
                : ((a: T) => void) extends (a: PropertyType) => void
                  ? V
                  : V extends PropertyTypeToValueType<T>
                    ? PropertyTypeToSimpleValueType<T, V>
                    : never
            : never

    type PropertyOption<T extends PropertyType, V> = {
        type?: T
        optionalTypes?: T[]
        value?: V
        default?: () => V
        observer?: ((newValue: V, oldValue: V) => void) | string
        comparer?: (newValue: V, oldValue: V) => boolean
        reflectIdPrefix?: boolean
    }

    type PropertyListItem<T extends PropertyType, V> = T | PropertyOption<T, V>

    type PropertyValues<P extends PropertyList> = {
        [key in keyof P]: PropertyValueType<P[key]>
    }

    type DataWithPropertyValues<
        TData extends DataList,
        TProperty extends PropertyList
    > = TData & PropertyValues<TProperty>

    type ComponentMethod = (...args: any[]) => any

    type MethodList = Record<string, ComponentMethod>

    const METHOD_TAG: unique symbol

    type TaggedMethod<Fn extends ComponentMethod> = Tag<Fn, typeof METHOD_TAG>

    type UnTaggedMethod<M extends TaggedMethod<any>> = UnTag<
        M,
        typeof METHOD_TAG
    >

    type RelationParamsWithKey = {
        [name: string]: RelationParams
    }

    type TraitRelationParams<TOut extends Record<string, any>> = {
        target: TraitBehavior.Instance<any, TOut>
        type:
            | 'ancestor'
            | 'descendant'
            | 'parent'
            | 'child'
            | 'parent-common-node'
            | 'child-common-node'
        linked?: (target: Component.TrivialInstance) => void
        linkChanged?: (target: Component.TrivialInstance) => void
        unlinked?: (target: Component.TrivialInstance) => void
        linkFailed?: (target: Component.TrivialInstance) => void
    }

    type ChainingFilterFunc<
        TAddedFields extends { [key: string]: any },
        TRemovedFields extends string = never
    > = (
        chain: Behavior.Builder
    ) => Omit<Behavior.Builder, TRemovedFields> & TAddedFields

    type ChainingFilterType = {
        add: { [key: string]: any }
        remove: string
    }

    type ResolveBehaviorBuilder<B, TChainingFilter extends ChainingFilterType> =
        IsNever<TChainingFilter> extends false
            ? TChainingFilter extends ChainingFilterType
                ? Omit<B, TChainingFilter['remove']> & TChainingFilter['add']
                : B
            : B

    interface RelationHandler<TTarget, TOut> {
        list(): TTarget[]
        listAsTrait: TOut extends never ? undefined : () => TOut[]
    }

    interface RelationHandler<TTarget, TOut> {
        list(): TTarget[]
        listAsTrait: TOut extends never ? undefined : () => TOut[]
    }

    type RelationParams = {
        target?:
            | string
            | Component.TrivialComponentType
            | Behavior.TrivialInstance
            | TraitBehavior.Instance<any>
        type:
            | 'ancestor'
            | 'descendant'
            | 'parent'
            | 'child'
            | 'parent-common-node'
            | 'child-common-node'
        linked?: (target: Component.TrivialInstance) => void
        linkChanged?: (target: Component.TrivialInstance) => void
        unlinked?: (target: Component.TrivialInstance) => void
        linkFailed?: (target: Component.TrivialInstance) => void
    }

    type Lifetimes = {
        created: () => void
        attached: () => void
        moved: () => void
        detached: () => void
        ready: () => void
    }
    interface BuilderContext<
        TPrevData extends DataList,
        TProperty extends PropertyList,
        TMethodCaller
    > extends ThisType<TMethodCaller> {
        self: TMethodCaller
        data: Merge<DataWithPropertyValues<TPrevData, TProperty>>
        setData: (
            this: void,
            newData: Partial<SetDataSetter<TPrevData>>,
            callback?: () => void
        ) => void
        implement: <TIn extends { [x: string]: any }>(
            traitBehavior: TraitBehavior.Instance<TIn, any>,
            impl: TIn
        ) => void
        relation<TOut extends { [key: string]: any }>(
            this: void,
            def: TraitRelationParams<TOut> & ThisType<TMethodCaller>
        ): RelationHandler<any, TOut>
        relation(
            this: void,
            def: RelationParams & ThisType<TMethodCaller>
        ): RelationHandler<any, never>
        observer<
            P extends ObserverDataPathStrings<
                DataWithPropertyValues<TPrevData, TProperty>
            >,
            V = GetFromObserverPathString<
                DataWithPropertyValues<TPrevData, TProperty>,
                P
            >
        >(
            this: void,
            paths: P,
            func: (newValue: V) => void
        ): void
        observer<
            P extends Array<
                ObserverDataPathStrings<
                    DataWithPropertyValues<TPrevData, TProperty>
                >
            >,
            V = {
                [K in keyof P]: GetFromObserverPathString<
                    DataWithPropertyValues<TPrevData, TProperty>,
                    P[K]
                >
            }
        >(
            this: void,
            paths: readonly [...P],
            func: (...newValues: V extends any[] ? V : never) => void
        ): void
        lifetime: <L extends keyof Lifetimes>(
            this: void,
            name: L,
            func: Lifetimes[L]
        ) => void
        pageLifetime: (
            this: void,
            name: string,
            func: (...args: any[]) => void
        ) => void
        method: <Fn extends ComponentMethod>(
            this: void,
            func: Fn
        ) => TaggedMethod<Fn>
        // listener: <T>(func: EventListener<T>) => TaggedMethod<EventListener<T>>
    }
}
