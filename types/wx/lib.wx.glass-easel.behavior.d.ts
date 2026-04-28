declare namespace WechatMiniprogram.GlassEasel.Behavior {
    type DefinitionFilter = (
        target: Component.TrivialDefinition,
        childFilters: Array<
            ((target: Component.TrivialDefinition) => void) | null
        >
    ) => void

    type ResolveBehaviorBuilder<
        B,
        TChainingFilter extends TypeUtils.ChainingFilterType
    > =
        TypeUtils.IsNever<TChainingFilter> extends false
            ? TChainingFilter extends TypeUtils.ChainingFilterType
                ? Omit<B, TChainingFilter['remove']> & TChainingFilter['add']
                : B
            : B

    type Definition<
        TData extends TypeUtils.DataList,
        TProperty extends TypeUtils.PropertyList,
        TMethod extends TypeUtils.MethodList,
        TComponentExport
    > = {
        behaviors?: Array<TrivialInstance | string>
        properties?: TProperty
        data?: TData | (() => TData)
        observers?:
            | Array<{
                  fields?: string
                  observer: TypeUtils.ComponentMethod
              }>
            | { [fields: string]: TypeUtils.ComponentMethod }
        methods?: TMethod
        created?: TypeUtils.ComponentMethod
        attached?: TypeUtils.ComponentMethod
        ready?: TypeUtils.ComponentMethod
        moved?: TypeUtils.ComponentMethod
        detached?: TypeUtils.ComponentMethod
        lifetimes?: { [name: string]: TypeUtils.ComponentMethod }
        pageLifetimes?: { [name: string]: TypeUtils.ComponentMethod }
        relations?: TypeUtils.RelationParamsWithKey
        externalClasses?: string[]
        definitionFilter?: DefinitionFilter
        export?: (source: Component.TrivialInstance | null) => TComponentExport
    }

    interface BaseBuilder<
        TPrevData extends TypeUtils.DataList = TypeUtils.Empty,
        TData extends TypeUtils.DataList = TypeUtils.Empty,
        TProperty extends TypeUtils.PropertyList = TypeUtils.Empty,
        TMethod extends TypeUtils.MethodList = TypeUtils.Empty,
        TChainingFilter extends TypeUtils.ChainingFilterType = never,
        TPendingChainingFilter extends TypeUtils.ChainingFilterType = never,
        TComponentExport = never,
        TExtraThisFields extends TypeUtils.DataList = TypeUtils.Empty
    > {
        /** Implement a trait behavior */
        implement<
            TIn extends {
                [key: string]: any
            }
        >(
            traitBehavior: TraitBehavior.Instance<TIn, any>,
            impl: TIn
        ): ResolveBehaviorBuilder<this, TChainingFilter>
        /** Add external classes */
        externalClasses(list: string[]): this
        /**
         * Add a data observer
         */
        observer<
            P extends TypeUtils.ObserverDataPathStrings<
                TypeUtils.DataWithPropertyValues<TPrevData, TProperty>
            >,
            V = TypeUtils.GetFromObserverPathString<
                TypeUtils.DataWithPropertyValues<TPrevData, TProperty>,
                P
            >
        >(
            paths: P,
            func: (
                this: Component.Instance<TData, TProperty, TMethod, any, TExtraThisFields>,
                newValue: V
            ) => void,
            once?: boolean
        ): ResolveBehaviorBuilder<this, TChainingFilter>
        observer<
            P extends Array<
                TypeUtils.ObserverDataPathStrings<
                    TypeUtils.DataWithPropertyValues<TPrevData, TProperty>
                >
            >,
            V = {
                [K in keyof P]: TypeUtils.GetFromObserverPathString<
                    TypeUtils.DataWithPropertyValues<TPrevData, TProperty>,
                    P[K]
                >
            }
        >(
            paths: readonly [...P],
            func: (
                this: Component.Instance<TData, TProperty, TMethod, any, TExtraThisFields>,
                ...newValues: V extends any[] ? V : never
            ) => void,
            once?: boolean
        ): ResolveBehaviorBuilder<this, TChainingFilter>
        /**
         * Add a lifetime callback
         */
        lifetime<L extends keyof TypeUtils.Lifetimes>(
            name: L,
            func: (
                this: Component.Instance<TData, TProperty, TMethod, any, TExtraThisFields>,
                ...args: Parameters<TypeUtils.Lifetimes[L]>
            ) => ReturnType<TypeUtils.Lifetimes[L]>,
            once?: boolean
        ): ResolveBehaviorBuilder<this, TChainingFilter>
        /**
         * Add a page-lifetime callback
         */
        pageLifetime(
            name: string,
            func: (
                this: Component.Instance<TData, TProperty, TMethod, any, TExtraThisFields>,
                ...args: any[]
            ) => any,
            once?: boolean
        ): ResolveBehaviorBuilder<this, TChainingFilter>
        /**
         * Add a relation
         */
        relation(
            name: string,
            rel: TypeUtils.RelationParams &
                ThisType<
                    Component.Instance<
                        TData,
                        TProperty,
                        TMethod,
                        TComponentExport,
                        TExtraThisFields
                    >
                >
        ): ResolveBehaviorBuilder<this, TChainingFilter>
    }

    type Instance<
        TData extends TypeUtils.DataList,
        TProperty extends TypeUtils.PropertyList,
        TMethod extends TypeUtils.MethodList,
        TChainingFilter extends TypeUtils.ChainingFilterType,
        TComponentExport,
        TExtraThisFields extends TypeUtils.DataList = TypeUtils.Empty
    > = {}

    type TrivialInstance = Instance<
        /* TData */ IAnyObject,
        /* TProperty */ IAnyObject,
        /* TMethod */ IAnyObject,
        /* TChainingFilter */ any,
        /* TComponentExport */ any,
        /* TExtraThisFields */ IAnyObject
    >

    interface Builder<
        TPrevData extends TypeUtils.DataList = TypeUtils.Empty,
        TData extends TypeUtils.DataList = TypeUtils.Empty,
        TProperty extends TypeUtils.PropertyList = TypeUtils.Empty,
        TMethod extends TypeUtils.MethodList = TypeUtils.Empty,
        TChainingFilter extends TypeUtils.ChainingFilterType = never,
        TPendingChainingFilter extends TypeUtils.ChainingFilterType = never,
        TComponentExport = never,
        TExtraThisFields extends TypeUtils.DataList = TypeUtils.Empty
    > extends BaseBuilder<
            TPrevData,
            TData,
            TProperty,
            TMethod,
            TChainingFilter,
            TPendingChainingFilter,
            TComponentExport,
            TExtraThisFields
        > {
        /** Define a chaining filter */
        chainingFilter<
            TAddedFields extends {
                [key: string]: any
            },
            TRemovedFields extends string = never
        >(
            func: TypeUtils.ChainingFilterFunc<TAddedFields, TRemovedFields>
        ): ResolveBehaviorBuilder<
            Builder<
                TPrevData,
                TData,
                TProperty,
                TMethod,
                TChainingFilter,
                {
                    add: TAddedFields
                    remove: TRemovedFields
                },
                TComponentExport,
                TExtraThisFields
            >,
            TChainingFilter
        >
        /** Use another behavior */
        behavior<
            UData extends TypeUtils.DataList,
            UProperty extends TypeUtils.PropertyList,
            UMethod extends TypeUtils.MethodList,
            UChainingFilter extends TypeUtils.ChainingFilterType,
            UComponentExport,
            UExtraThisFields extends TypeUtils.DataList = TypeUtils.Empty
        >(
            behavior:
                | Instance<
                      UData,
                      UProperty,
                      UMethod,
                      UChainingFilter,
                      UComponentExport,
                      UExtraThisFields
                  >
                | string
        ): ResolveBehaviorBuilder<
            Builder<
                TPrevData,
                TData & UData,
                TProperty & UProperty,
                TMethod & UMethod,
                UChainingFilter,
                TPendingChainingFilter,
                UComponentExport,
                TExtraThisFields & UExtraThisFields
            >,
            UChainingFilter
        >
        /** Set the export value when the component is being selected */
        export<TNewComponentExport>(
            f: (
                this: Component.TrivialInstance,
                source: Component.TrivialInstance | null
            ) => TNewComponentExport
        ): ResolveBehaviorBuilder<
            Builder<
                TPrevData,
                TData,
                TProperty,
                TMethod,
                TChainingFilter,
                TPendingChainingFilter,
                TNewComponentExport,
                TExtraThisFields
            >,
            TChainingFilter
        >
        /**
         * Add some template data fields
         *
         * It does not support raw data, but a `gen` function which returns the new data fields.
         * The `gen` function executes once during component instance creation.
         */
        data<T extends TypeUtils.DataList>(
            gen: () => TypeUtils.NewFieldList<
                TypeUtils.DataWithPropertyValues<TData, TProperty>,
                T
            >
        ): ResolveBehaviorBuilder<
            Builder<
                T,
                TData & T,
                TProperty,
                TMethod,
                TChainingFilter,
                TPendingChainingFilter,
                TComponentExport,
                TExtraThisFields
            >,
            TChainingFilter
        >
        /**
         * Add some template data fields
         *
         * The data should be JSON-compatible, and will be cloned during component creation.
         */
        staticData<T extends TypeUtils.DataList>(
            data: TypeUtils.NewFieldList<
                TypeUtils.DataWithPropertyValues<TData, TProperty>,
                T
            >
        ): ResolveBehaviorBuilder<
            Builder<
                T,
                TData & T,
                TProperty,
                TMethod,
                TChainingFilter,
                TPendingChainingFilter,
                TComponentExport,
                TExtraThisFields
            >,
            TChainingFilter
        >
        /**
         * Add a single property
         *
         * The property name should be different from other properties.
         */
        property<
            N extends string,
            T extends TypeUtils.PropertyType,
            V extends TypeUtils.PropertyTypeToValueType<T>
        >(
            name: N,
            def: N extends keyof (TData & TProperty)
                ? never
                : TypeUtils.PropertyListItem<T, V>
        ): ResolveBehaviorBuilder<
            Builder<
                TPrevData,
                TData,
                TProperty &
                    Record<
                        N,
                        unknown extends V ? T : TypeUtils.PropertyOption<T, V>
                    >,
                TMethod,
                TChainingFilter,
                TPendingChainingFilter,
                TComponentExport,
                TExtraThisFields
            >,
            TChainingFilter
        >
        /**
         * Add some public methods
         *
         * The public method can be used as an event handler, and can be visited in component instance.
         */
        methods<T extends TypeUtils.MethodList>(
            funcs: T &
                ThisType<
                    Component.Instance<TData, TProperty, TMethod & T, TComponentExport, TExtraThisFields>
                >
        ): ResolveBehaviorBuilder<
            Builder<
                TPrevData,
                TData,
                TProperty,
                TMethod & T,
                TChainingFilter,
                TPendingChainingFilter,
                TComponentExport,
                TExtraThisFields
            >,
            TChainingFilter
        >
        /**
         * Execute a function while component instance creation
         *
         * A `BuilderContext` is provided to tweak the component creation progress.
         * The return value is used as the "export" value of the behavior.
         */
        init<
            TExport extends Record<
                string,
                TypeUtils.TaggedMethod<(...args: any[]) => any>
            > | void
        >(
            func: (
                this: Component.Instance<
                    TData,
                    TProperty,
                    TMethod,
                    TComponentExport,
                    TExtraThisFields
                >,
                builderContext: TypeUtils.BuilderContext<
                    TPrevData,
                    TProperty,
                    Component.Instance<
                        TData,
                        TProperty,
                        TMethod,
                        TComponentExport,
                        TExtraThisFields
                    >
                >
            ) => TExport
        ): ResolveBehaviorBuilder<
            Builder<
                TPrevData,
                TData,
                TProperty,
                TMethod &
                    (TExport extends void
                        ? TypeUtils.Empty
                        : {
                            [K in keyof TExport]: TypeUtils.UnTaggedMethod<TExport[K]>
                        }),
                TChainingFilter,
                TPendingChainingFilter,
                TComponentExport,
                TExtraThisFields
            >,
            TChainingFilter
        >
        /** Apply a classic definition object */
        definition<
            TNewData extends TypeUtils.DataList = TypeUtils.Empty,
            TNewProperty extends TypeUtils.PropertyList = TypeUtils.Empty,
            TNewMethod extends TypeUtils.MethodList = TypeUtils.Empty,
            TNewComponentExport = never
        >(
            def: Definition<
                TNewData,
                TNewProperty,
                TNewMethod,
                TNewComponentExport
            > &
                ThisType<
                    Component.Instance<
                        TData & TNewData,
                        TProperty & TNewProperty,
                        TMethod & TNewMethod,
                        TNewComponentExport,
                        TExtraThisFields
                    >
                >
        ): ResolveBehaviorBuilder<
            Builder<
                TPrevData,
                TData & TNewData,
                TProperty & TNewProperty,
                TMethod & TNewMethod,
                TChainingFilter,
                TPendingChainingFilter,
                TNewComponentExport,
                TExtraThisFields
            >,
            TChainingFilter
        >
        /**
         * Finish the behavior definition process
         */
        register(): Instance<
            TData,
            TProperty,
            TMethod,
            TPendingChainingFilter,
            TComponentExport,
            TExtraThisFields
        >
        /**
         * Add extra this fields type
         */
        extraThisFieldsType<T extends TypeUtils.DataList>(): ResolveBehaviorBuilder<
            Builder<
                TPrevData,
                TData,
                TProperty,
                TMethod,
                TChainingFilter,
                TPendingChainingFilter,
                TComponentExport,
                TExtraThisFields & T
            >,
            TChainingFilter
        >
    }
}
