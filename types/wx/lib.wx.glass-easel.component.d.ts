// this rule seems buggy, unable to distinguish WechatMiniprogram.GlassEasel.Component and WechatMiniprogram.Component
/* eslint-disable @typescript-eslint/no-unnecessary-qualifier */

declare namespace WechatMiniprogram.GlassEasel.Component {
    type ExportType<
        UData extends TypeUtils.DataList,
        UProperty extends TypeUtils.PropertyList,
        UMethod extends TypeUtils.MethodList,
        UComponentExport,
        UExtraThisFields extends TypeUtils.DataList
    > = [UComponentExport] extends [never]
        ? Instance<UData, UProperty, UMethod, UComponentExport, UExtraThisFields>
        : UComponentExport

    type DefinitionOptions = {
        multipleSlots?: boolean
        dynamicSlots?: boolean
        pureDataPattern?: RegExp
        virtualHost?: boolean
        dataDeepCopy?: 'none' | 'simple' | 'simple-recursion'
        propertyPassingDeepCopy?: 'none' | 'simple' | 'simple-recursion'
        propertyEarlyInit?: boolean
        /** @deprecated prefer static config */
        addGlobalClass?: boolean
        /** @deprecated prefer static config */
        styleIsolation?:
            | 'isolated'
            | 'apply-shared'
            | 'shared'
            | 'page-isolated'
            | 'page-apply-shared'
            | 'page-shared'
    }

    type Definition<
        TData extends TypeUtils.DataList,
        TProperty extends TypeUtils.PropertyList,
        TMethod extends TypeUtils.MethodList,
        TComponentExport
    > = {
        options?: DefinitionOptions
    } & Behavior.Definition<TData, TProperty, TMethod, TComponentExport>

    type TrivialDefinition = Definition<
        IAnyObject,
        IAnyObject,
        IAnyObject,
        IAnyObject
    >

    type PageDefinition<
        TData extends TypeUtils.DataList,
        TExtraFields extends { [k: PropertyKey]: any }
    > = TExtraFields & {
        options?: DefinitionOptions
        behaviors?: Behavior.TrivialInstance[]
        data?: TData
    }

    type Instance<
        TData extends TypeUtils.DataList,
        TProperty extends TypeUtils.PropertyList,
        TMethod extends TypeUtils.MethodList,
        TComponentExport,
        TExtraThisFields extends TypeUtils.DataList = TypeUtils.Empty
    > = TMethod & TExtraThisFields & {
        /** The component path in the code space */
        is: string
        /** The `id` field in the template */
        id: string
        getPageId(): string
        router: Router
        pageRouter: Router
        renderer: 'webview' | 'skyline'
        /** The `data-*` field in the template */
        dataset: {
            [key: string]: any
        }
        /** The component data and property values */
        data: TypeUtils.Merge<
            TypeUtils.DataWithPropertyValues<TData, TProperty>
        >

        /** The component data and property values (same as `data` ) */
        properties: TypeUtils.Merge<
            TypeUtils.DataWithPropertyValues<TData, TProperty>
        >

        /**
         * Group several data update calls
         *
         * This method is designed for hinting the backend that some updates should be handled together.
         * However, this is done automatically now,
         * so this method is just for backward compatibilities.
         */
        groupSetData(callback: () => void): void
        /**
         * Do a classic data update
         *
         * The `callback` is called after the update applies in the backend.
         * In most cases, you SHOULD NOT wait the backend update (that might be very slow),
         * and most calls, including read calls such as `selectComponent` , simply works immediately.
         * However, when called inside observers,
         * the data update will not be applied to templates immediately
         * (it is recommanded to use `updateData` instead in observers).
         */
        setData(
            newData: Partial<
                TypeUtils.SetDataSetter<
                    TypeUtils.DataWithPropertyValues<TData, TProperty>
                >
            >,
            callback?: () => void
        ): void
        setData(data: Record<string, any>, callback?: () => void): void
        /**
         * Schedule a classic data updates
         *
         * The data update will not be applied until next `setData` or `applyDataUpdates` call.
         * When called inside observers, the data update will be applied when observer ends.
         * All data observers will not be triggered immediately before applied.
         * Reads of the data will get the unchanged value before applied.
         */
        updateData(
            newData: Partial<
                TypeUtils.SetDataSetter<
                    TypeUtils.DataWithPropertyValues<TData, TProperty>
                >
            >
        ): void
        updateData(newData: Record<string, any>): void
        /**
         * Schedule a data update on a single specified path
         *
         * The data update will not be applied until next `setData` or `applyDataUpdates` call.
         * All data observers will not be triggered immediately before applied.
         * Reads of the data will get the unchanged value before applied.
         */
        replaceDataOnPath<T extends Array<string | number>>(
            path: readonly [...T],
            data: TypeUtils.GetFromDataPath<
                TypeUtils.DataWithPropertyValues<TData, TProperty>,
                T
            >
        ): void
        replaceDataOnPath(path: any, data: any): void
        /**
         * Schedule an array update
         *
         * The behavior is like `Array.prototype.slice` .
         * Break the array before the `index`-th item, delete `del` items, and insert some items here.
         * If `index` is undefined, negative, or larger than the length of the array,
         * no items will be deleted and new items will be appended to the end of the array.
         * The data update will not be applied until next `setData` or `applyDataUpdates` call.
         * All data observers will not be triggered immediately before applied.
         * Reads of the data will get the unchanged value before applied.
         */
        spliceArrayDataOnPath<T extends Array<string | number>>(
            path: readonly [...T],
            index: TypeUtils.GetFromDataPath<
                TypeUtils.DataWithPropertyValues<TData, TProperty>,
                T
            > extends any[]
                ? number | undefined
                : never,
            del: TypeUtils.GetFromDataPath<
                TypeUtils.DataWithPropertyValues<TData, TProperty>,
                T
            > extends any[]
                ? number | undefined
                : never,
            inserts: TypeUtils.GetFromDataPath<
                TypeUtils.DataWithPropertyValues<TData, TProperty>,
                T
            > extends Array<infer I>
                ? I[]
                : never
        ): void
        spliceArrayDataOnPath(
            path: Array<string | number>,
            index: number | undefined,
            del: number | undefined,
            inserts: unknown[]
        ): void
        /**
         * Apply all scheduled updates immediately
         *
         * Inside observers, it is generally not .
         */
        applyDataUpdates(): void
        /**
         * Pending all data updates in the callback, and apply updates after callback returns
         *
         * This function helps grouping several `replaceDataOnPath` or `spliceArrayDataOnPath` calls,
         * and then apply them at the end of the callback.
         * `setData` and `applyDataUpdates` calls inside the callback still apply updates immediately.
         */
        groupUpdates<T>(callback: () => T): T | undefined
        /**
         * Check whether the `other` behavior is a dependent behavior or a implemented trait behavior
         */
        hasBehavior(
            behavior:
                | Behavior.TrivialInstance
                | TraitBehavior.Instance<any, any>
        ): boolean
        /**
         * Get the trait behavior implementation of the component
         *
         * Returns `undefined` if the specified trait behavior is not implemented.
         */
        traitBehavior<TOut extends Record<string, any>>(
            traitBehavior: TraitBehavior.Instance<any, TOut>
        ): TOut | undefined
        /** Trigger an event */
        triggerEvent(
            name: string,
            detail: any,
            options: {
                bubbles?: boolean
                composed?: boolean
                capturePhase?: boolean
            }
        ): void
        /** Create a selector query for searching element inside the component */
        createSelectorQuery(): SelectorQuery
        applyAnimatedStyle(
            selector: string,
            updater: Skyline.WorkletFunction<Skyline.AnimatedStyle>,
            userConfig?: Skyline.AnimatedStyleConfig,
            callback?: (styleId: number) => void
        ): void
        clearAnimatedStyle(
            selector: string,
            styleIds: number[],
            callback?: () => void
        ): void
        /** Create an intersection observer */
        createIntersectionObserver(options?: {
            thresholds?: number[]
            initialRatio?: number
            observeAll?: boolean
        }): IntersectionObserver
        /** Create an media query observer */
        createMediaQueryObserver(): MediaQueryObserver
        getOpenerEventChannel(): EventChannel
        /**
         * Query an element inside the component
         *
         * If `componentType` is provided, this method will check the selected component type.
         * If the component type does not match, `null` is returned.
         */
        selectComponent(selector: string): any
        selectComponent<
            UData extends TypeUtils.DataList,
            UProperty extends TypeUtils.PropertyList,
            UMethod extends TypeUtils.MethodList,
            UComponentExport,
            UExtraThisFields extends TypeUtils.DataList = TypeUtils.Empty
        >(
            selector: string,
            componentType: ComponentType<
                UData,
                UProperty,
                UMethod,
                UComponentExport,
                UExtraThisFields
            >
        ): ExportType<UData, UProperty, UMethod, UComponentExport, UExtraThisFields> | null
        /**
         * Query all elements inside the component
         *
         * If `componentType` is provided, this method will check the selected component type.
         * If a component type does not match, it is not returned.
         */
        selectAllComponents(selector: string): TrivialInstance[]
        selectAllComponents<
            UData extends TypeUtils.DataList,
            UProperty extends TypeUtils.PropertyList,
            UMethod extends TypeUtils.MethodList,
            UComponentExport,
            UExtraThisFields extends TypeUtils.DataList = TypeUtils.Empty
        >(
            selector: string,
            componentType: ComponentType<
                UData,
                UProperty,
                UMethod,
                UComponentExport,
                UExtraThisFields
            >
        ): Array<ExportType<UData, UProperty, UMethod, UComponentExport, UExtraThisFields>>
        /**
         * Get the owner component
         *
         * If `componentType` is provided, this method will check the selected component type.
         * If a component type does not match, `null` is returned.
         */
        selectOwnerComponent(): any
        selectOwnerComponent<
            UData extends TypeUtils.DataList,
            UProperty extends TypeUtils.PropertyList,
            UMethod extends TypeUtils.MethodList,
            UComponentExport,
            UExtraThisFields extends TypeUtils.DataList = TypeUtils.Empty
        >(
            componentType: ComponentType<
                UData,
                UProperty,
                UMethod,
                UComponentExport,
                UExtraThisFields
            >
        ): ExportType<UData, UProperty, UMethod, UComponentExport, UExtraThisFields> | null
        getRelationNodes(relationKey: string): TrivialInstance[]
        applyAnimation(
            selector: string,
            options: WechatMiniprogram.Component.KeyFrame,
            _animeJS: boolean,
            callback?: () => void
        ): void
        clearAnimation(
            selector: string,
            options:
                | {
                      [K in keyof WechatMiniprogram.Component.KeyFrame]?: boolean
                  }
                | undefined
                | null,
            callback?: () => void
        ): void
        animate(
            selector: string,
            keyframes: WechatMiniprogram.Component.KeyFrame[],
            duration: number,
            callback?: () => void
        ): void
        animate(
            selector: string,
            keyframes: WechatMiniprogram.Component.KeyFrame[],
            duration: number,
            scrollTimeline: WechatMiniprogram.Component.ScrollTimelineOption
        ): void
        getTabBar(cb?: (tabBar: TrivialInstance) => void): TrivialInstance
        getAppBar(): TrivialInstance
        /** The `id` field in the template */
        get exitState(): any
        set exitState(value: any)
        setInitialRenderingCache(): void
        setUpdatePerformanceListener<WithDataPath extends boolean = false>(
            config: WechatMiniprogram.Component.SetUpdatePerformanceListenerOption<WithDataPath>,
            listener: WechatMiniprogram.Component.UpdatePerformanceListener<WithDataPath>
        ): void
        getPassiveEvent(cb: any): void
        setPassiveEvent(config: any): void
        /**
         * Cast the component into the specified type
         *
         * Returns `null` if the component node is not the instance of the specified component.
         */
        asInstanceOf<
            UData extends TypeUtils.DataList,
            UProperty extends TypeUtils.PropertyList,
            UMethod extends TypeUtils.MethodList,
            UComponentExport,
            UExtraThisFields extends TypeUtils.DataList = TypeUtils.Empty
        >(
            componentType: ComponentType<
                UData,
                UProperty,
                UMethod,
                UComponentExport,
                UExtraThisFields
            >
        ): Instance<UData, UProperty, UMethod, UComponentExport, UExtraThisFields> | null
    }

    interface TrivialInstance
        extends Instance<
            IAnyObject,
            IAnyObject,
            IAnyObject,
            IAnyObject,
            IAnyObject
        > {}

    type ComponentType<
        TData extends TypeUtils.DataList,
        TProperty extends TypeUtils.PropertyList,
        TMethod extends TypeUtils.MethodList,
        TComponentExport,
        TExtraThisFields extends TypeUtils.DataList = TypeUtils.Empty
    > = {}

    type TrivialComponentType = ComponentType<
        TypeUtils.DataList,
        TypeUtils.PropertyList,
        TypeUtils.MethodList,
        any,
        TypeUtils.DataList
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
    > extends Behavior.BaseBuilder<
            TPrevData,
            TData,
            TProperty,
            TMethod,
            TChainingFilter,
            TPendingChainingFilter,
            TComponentExport,
            TExtraThisFields
        > {
        /**
         * Set the component options
         *
         * If called multiple times, only the latest call is valid.
         */
        options(
            options: DefinitionOptions
        ): Behavior.ResolveBehaviorBuilder<this, TChainingFilter>
        /** Use another behavior */
        behavior<
            UData extends TypeUtils.DataList,
            UProperty extends TypeUtils.PropertyList,
            UMethod extends TypeUtils.MethodList,
            UChainingFilter extends TypeUtils.ChainingFilterType,
            UComponentExport,
            UExtraThisFields extends TypeUtils.DataList = TypeUtils.Empty
        >(
            behavior: Behavior.Instance<
                UData,
                UProperty,
                UMethod,
                UChainingFilter,
                UComponentExport,
                UExtraThisFields
            >
        ): Behavior.ResolveBehaviorBuilder<
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
                this: TrivialInstance,
                source: TrivialInstance | null
            ) => TNewComponentExport
        ): Behavior.ResolveBehaviorBuilder<
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
        ): Behavior.ResolveBehaviorBuilder<
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
        ): Behavior.ResolveBehaviorBuilder<
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
        ): Behavior.ResolveBehaviorBuilder<
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
            funcs: T & ThisType<Instance<TData, TProperty, TMethod & T, TComponentExport, TExtraThisFields>>
        ): Behavior.ResolveBehaviorBuilder<
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
         * The return value is used as the "export" value of the behavior,
         * which can be imported by other behaviors.
         */
        init<
            TExport extends Record<
                string,
                TypeUtils.TaggedMethod<(...args: any[]) => any>
            > | void
        >(
            func: (
                this: Instance<TData, TProperty, TMethod, TComponentExport, TExtraThisFields>,
                builderContext: TypeUtils.BuilderContext<
                    TPrevData,
                    TProperty,
                    Instance<TData, TProperty, TMethod, TComponentExport, TExtraThisFields>
                >
            ) => TExport
        ): Behavior.ResolveBehaviorBuilder<
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
                    Instance<
                        TData & TNewData,
                        TProperty & TNewProperty,
                        TMethod & TNewMethod,
                        TNewComponentExport,
                        TExtraThisFields
                    >
                >
        ): Behavior.ResolveBehaviorBuilder<
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
        pageDefinition<
            TNewData extends TypeUtils.DataList,
            TNewExtraFields extends {
                [k: PropertyKey]: any
            }
        >(
            def: PageDefinition<TNewData, TNewExtraFields> &
                ThisType<
                    Instance<
                        TData & TNewData,
                        TProperty,
                        TMethod & TNewExtraFields,
                        undefined,
                        TExtraThisFields
                    >
                >
        ): Behavior.ResolveBehaviorBuilder<
            Builder<
                TPrevData,
                TData & TNewData,
                TProperty,
                TMethod & TNewExtraFields,
                TChainingFilter,
                TPendingChainingFilter,
                TComponentExport,
                TExtraThisFields
            >,
            TChainingFilter
        >
        /**
         * Finish the component definition process
         */
        register(): ComponentType<TData, TProperty, TMethod, TComponentExport, TExtraThisFields>
        /**
         * Add extra this fields type
         */
        extraThisFieldsType<T extends TypeUtils.DataList>(): Behavior.ResolveBehaviorBuilder<
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
