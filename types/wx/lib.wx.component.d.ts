/*! *****************************************************************************
Copyright (c) 2019 Tencent, Inc. All rights reserved.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
***************************************************************************** */

declare namespace WechatMiniprogram {
    namespace Component {
        type Instance<
            TData extends DataOption,
            TProperty extends PropertyOption,
            TMethod extends Partial<MethodOption>
        > = InstanceProperties &
            InstanceMethods<TData> &
            TMethod & {
                /** 组件数据，**包括内部数据和属性值** */
                data: TData & PropertyOptionToData<TProperty>
                /** 组件数据，**包括内部数据和属性值**（与 `data` 一致） */
                properties: TData & PropertyOptionToData<TProperty>,
            }
        type TrivialInstance = Instance<IAnyObject, IAnyObject, IAnyObject>
        type TrivialOption = Options<IAnyObject, IAnyObject, IAnyObject>
        type Options<
            TData extends DataOption,
            TProperty extends PropertyOption,
            TMethod extends MethodOption
        > = Partial<Data<TData>> &
            Partial<Property<TProperty>> &
            Partial<Method<TMethod>> &
            Partial<OtherOption> &
            Partial<Lifetimes> &
            ThisType<Instance<TData, TProperty, TMethod>>
        interface Constructor {
            <
                TData extends DataOption,
                TProperty extends PropertyOption,
                TMethod extends MethodOption
            >(
                options: Options<TData, TProperty, TMethod>,
            ): string
        }
        type DataOption = Record<string, any>
        type PropertyOption = Record<string, AllProperty>
        type MethodOption = Record<string, (...args: any[]) => any>

        interface Data<D extends DataOption> {
            /** 组件的内部数据，和 `properties` 一同用于组件的模板渲染 */
            data?: D
        }
        interface Property<P extends PropertyOption> {
            /** 组件的对外属性，是属性名到属性设置的映射表 */
            properties: P
        }
        interface Method<M extends MethodOption> {
            /** object组件的方法，包括事件响应函数和任意的自定义方法，关于事件响应函数的使用，参见 [组件事件](events.md) */

            methods: M
        }
        type PropertyType =
            | StringConstructor
            | NumberConstructor
            | BooleanConstructor
            | ArrayConstructor
            | ObjectConstructor
            | null
        type ValueType<T extends PropertyType> = T extends StringConstructor
            ? string
            : T extends NumberConstructor
                ? number
                : T extends BooleanConstructor
                    ? boolean
                    : T extends ArrayConstructor
                        ? any[]
                        : T extends ObjectConstructor ? IAnyObject : any
        interface FullProperty<T extends PropertyType> {
            /** 属性类型 */
            type: T
            /** 属性初始值 */
            value?: ValueType<T>
            /** 属性值被更改时的响应函数 */
            observer?(
                newVal: ValueType<T>,
                oldVal: ValueType<T>,
                changedPath: Array<string | number>,
            ): void
            /** 属性的类型（可以指定多个） */
            optionalTypes?: ShortProperty[]
        }
        type AllFullProperty =
            | FullProperty<StringConstructor>
            | FullProperty<NumberConstructor>
            | FullProperty<BooleanConstructor>
            | FullProperty<ArrayConstructor>
            | FullProperty<ObjectConstructor>
            | FullProperty<null>
        type ShortProperty =
            | StringConstructor
            | NumberConstructor
            | BooleanConstructor
            | ArrayConstructor
            | ObjectConstructor
            | null
        type AllProperty = AllFullProperty | ShortProperty
        type PropertyToData<T extends AllProperty> = T extends ShortProperty
            ? ValueType<T>
            : FullPropertyToData<Exclude<T, ShortProperty>>
        type FullPropertyToData<T extends AllFullProperty> = ValueType<
            T['type']
        >
        type PropertyOptionToData<P extends PropertyOption> = {
            [name in keyof P]: PropertyToData<P[name]>
        }

        interface InstanceProperties {
            /** 组件的文件路径 */
            is: string
            /** 节点id */
            id: string
            /** 节点dataset */
            dataset: Record<string, string>
        }

        interface InstanceMethods<D extends DataOption> {
            /** `setData` 函数用于将数据从逻辑层发送到视图层
             *（异步），同时改变对应的 `this.data` 的值（同步）。
             *
             * **注意：**
             *
             * 1. **直接修改 this.data 而不调用 this.setData 是无法改变页面的状态的，还会造成数据不一致**。
             * 1. 仅支持设置可 JSON 化的数据。
             * 1. 单次设置的数据不能超过1024kB，请尽量避免一次设置过多的数据。
             * 1. 请不要把 data 中任何一项的 value 设为 `undefined` ，否则这一项将不被设置并可能遗留一些潜在问题。
             */
            setData(
                /** 这次要改变的数据
                 *
                 * 以 `key: value` 的形式表示，将 `this.data` 中的 `key` 对应的值改变成 `value`。
                 *
                 * 其中 `key` 可以以数据路径的形式给出，支持改变数组中的某一项或对象的某个属性，如 `array[2].message`，`a.b.c.d`，并且不需要在 this.data 中预先定义。
                 */
                data: Partial<D> & IAnyObject,
                /** setData引起的界面更新渲染完毕后的回调函数，最低基础库： `1.5.0` */
                callback?: () => void,
            ): void

            /** 检查组件是否具有 `behavior` （检查时会递归检查被直接或间接引入的所有behavior） */
            hasBehavior(behavior: object): void
            /** 触发事件，参见组件事件 */
            triggerEvent(
                name: string,
                detail?: object,
                options?: TriggerEventOption,
            ): void
            /** 创建一个 SelectorQuery 对象，选择器选取范围为这个组件实例内 */
            createSelectorQuery(): SelectorQuery
            /** 创建一个 IntersectionObserver 对象，选择器选取范围为这个组件实例内 */
            createIntersectionObserver(
                options: CreateIntersectionObserverOption,
            ): IntersectionObserver
            /** 使用选择器选择组件实例节点，返回匹配到的第一个组件实例对象（会被 `wx://component-export` 影响） */
            selectComponent(selector: string): TrivialInstance
            /** 使用选择器选择组件实例节点，返回匹配到的全部组件实例对象组成的数组 */
            selectAllComponents(selector: string): TrivialInstance[]
            /** 获取这个关系所对应的所有关联节点，参见 组件间关系 */
            getRelationNodes(relationKey: string): TrivialInstance[]
            /** 立刻执行 callback ，其中的多个 setData 之间不会触发界面绘制（只有某些特殊场景中需要，如用于在不同组件同时 setData 时进行界面绘制同步）*/
            groupSetData(callback?: () => void): void
            /** 返回当前页面的 custom-tab-bar 的组件实例 */
            getTabBar(): TrivialInstance
            /** 返回页面标识符（一个字符串），可以用来判断几个自定义组件实例是不是在同一个页面内 */
            getPageId(): string
        }

        interface ComponentOptions {
            /**
             * [启用多slot支持](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/wxml-wxss.html#组件wxml的slot)
             */
            multipleSlots?: boolean
            /**
             * [组件样式隔离](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/wxml-wxss.html#组件样式隔离)
             */
            addGlobalClass?: boolean
            /**
             * [组件样式隔离](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/wxml-wxss.html#组件样式隔离)
             */
            styleIsolation?:
                | 'isolated'
                | 'apply-shared'
                | 'shared'
                | 'page-isolated'
                | 'page-apply-shared'
                | 'page-shared'
        }

        interface TriggerEventOption {
            /** 事件是否冒泡
             *
             * 默认值： `false`
             */
            bubbles?: boolean
            /** 事件是否可以穿越组件边界，为false时，事件将只能在引用组件的节点树上触发，不进入其他任何组件内部
             *
             * 默认值： `false`
             */
            composed?: boolean
            /** 事件是否拥有捕获阶段
             *
             * 默认值： `false`
             */
            capturePhase?: boolean
        }

        interface RelationOption {
            /** 目标组件的相对关系 */
            type: 'parent' | 'child' | 'ancestor' | 'descendant'
            /** 关系生命周期函数，当关系被建立在页面节点树中时触发，触发时机在组件attached生命周期之后 */
            linked?(target: TrivialInstance): void
            /** 关系生命周期函数，当关系在页面节点树中发生改变时触发，触发时机在组件moved生命周期之后 */
            linkChanged?(target: TrivialInstance): void
            /** 关系生命周期函数，当关系脱离页面节点树时触发，触发时机在组件detached生命周期之后 */
            unlinked?(target: TrivialInstance): void
            /** 如果这一项被设置，则它表示关联的目标节点所应具有的behavior，所有拥有这一behavior的组件节点都会被关联 */
            target?: string
        }

        interface PageLifetimes {
            /** 页面生命周期回调—监听页面显示
             *
             * 页面显示/切入前台时触发。
             */
            show(): void
            /** 页面生命周期回调—监听页面隐藏
             *
             * 页面隐藏/切入后台时触发。 如 `navigateTo` 或底部 `tab` 切换到其他页面，小程序切入后台等。
             */
            hide(): void
            /** 页面生命周期回调—监听页面尺寸变化
             *
             * 所在页面尺寸变化时执行
             */
            resize(size: Page.IResizeOption): void
        }

        type DefinitionFilter = <T extends TrivialOption>(
            /** 使用该 behavior 的 component/behavior 的定义对象 */
            defFields: T,
            /** 该 behavior 所使用的 behavior 的 definitionFilter 函数列表 */
            definitionFilterArr?: DefinitionFilter[],
        ) => void

        interface Lifetimes {
            /** 组件生命周期声明对象，组件的生命周期：`created`、`attached`、`ready`、`moved`、`detached` 将收归到 `lifetimes` 字段内进行声明，原有声明方式仍旧有效，如同时存在两种声明方式，则 `lifetimes` 字段内声明方式优先级最高
             *
             * 最低基础库： `2.2.3` */
            lifetimes: Partial<{
                /**
                 * 在组件实例刚刚被创建时执行
                 *
                 * 最低基础库版本：[`1.6.3`](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
                 */
                created(): void
                /**
                 * 在组件实例进入页面节点树时执行
                 *
                 * 最低基础库版本：[`1.6.3`](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
                 */
                attached(): void
                /**
                 * 在组件在视图层布局完成后执行
                 *
                 * 最低基础库版本：[`1.6.3`](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
                 */
                ready(): void
                /**
                 * 在组件实例被移动到节点树另一个位置时执行
                 *
                 * 最低基础库版本：[`1.6.3`](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
                 */
                moved(): void
                /**
                 * 在组件实例被从页面节点树移除时执行
                 *
                 * 最低基础库版本：[`1.6.3`](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
                 */
                detached(): void
                /**
                 * 每当组件方法抛出错误时执行
                 *
                 * 最低基础库版本：[`2.4.1`](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
                 */
                error(err: Error): void,
            }>
            /**
             * @deprecated 旧式的定义方式，基础库 `2.2.3` 起请在 lifetimes 中定义
             *
             * 在组件实例刚刚被创建时执行
             *
             * 最低基础库版本：[`1.6.3`](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
             */
            created(): void
            /**
             * @deprecated 旧式的定义方式，基础库 `2.2.3` 起请在 lifetimes 中定义
             *
             * 在组件实例进入页面节点树时执行
             *
             * 最低基础库版本：[`1.6.3`](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
             */
            attached(): void
            /**
             * @deprecated 旧式的定义方式，基础库 `2.2.3` 起请在 lifetimes 中定义
             *
             * 在组件在视图层布局完成后执行
             *
             * 最低基础库版本：[`1.6.3`](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
             */
            ready(): void
            /**
             * @deprecated 旧式的定义方式，基础库 `2.2.3` 起请在 lifetimes 中定义
             *
             * 在组件实例被移动到节点树另一个位置时执行
             *
             * 最低基础库版本：[`1.6.3`](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
             */
            moved(): void
            /**
             * @deprecated 旧式的定义方式，基础库 `2.2.3` 起请在 lifetimes 中定义
             *
             * 在组件实例被从页面节点树移除时执行
             *
             * 最低基础库版本：[`1.6.3`](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
             */
            detached(): void
            /**
             * @deprecated 旧式的定义方式，基础库 `2.2.3` 起请在 lifetimes 中定义
             *
             * 每当组件方法抛出错误时执行
             *
             * 最低基础库版本：[`2.4.1`](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
             */
            error(err: Error): void
        }

        interface OtherOption {
            /** 类似于mixins和traits的组件间代码复用机制，参见 [behaviors](behaviors.md) */
            behaviors: string[]
            /** 组件数据字段监听器，用于监听 properties 和 data 的变化 */
            observers: Record<string, (...args: any[]) => any>
            /** 组件间关系定义，参见 [组件间关系](relations.md) */
            relations: {
                [componentName: string]: RelationOption,
            }
            /** 组件接受的外部样式类，参见 [外部样式类](wxml-wxss.md) */
            externalClasses?: string[]
            /** 组件所在页面的生命周期声明对象，目前仅支持页面的 `show` 和 `hide` 两个生命周期
             *
             * 最低基础库： `2.2.3` */
            pageLifetimes?: Partial<PageLifetimes>
            /** 一些选项（文档中介绍相关特性时会涉及具体的选项设置，这里暂不列举） */
            options: ComponentOptions

            /** 定义段过滤器，用于自定义组件扩展，参见 [自定义组件扩展](extend.md)
             *
             * 最低基础库： `2.2.3` */
            definitionFilter?: DefinitionFilter
        }
    }
}
/** Component构造器可用于定义组件，调用Component构造器时可以指定组件的属性、数据、方法等。
 *
 * * 使用 `this.data` 可以获取内部数据和属性值，但不要直接修改它们，应使用 `setData` 修改。
 * * 生命周期函数无法在组件方法中通过 `this` 访问到。
 * * 属性名应避免以 data 开头，即不要命名成 `dataXyz` 这样的形式，因为在 WXML 中， `data-xyz=""` 会被作为节点 dataset 来处理，而不是组件属性。
 * * 在一个组件的定义和使用时，组件的属性名和 data 字段相互间都不能冲突（尽管它们位于不同的定义段中）。
 * * 从基础库 `2.0.9` 开始，对象类型的属性和 data 字段中可以包含函数类型的子字段，即可以通过对象类型的属性字段来传递函数。低于这一版本的基础库不支持这一特性。
 * * `bug` : 对于 type 为 Object 或 Array 的属性，如果通过该组件自身的 `this.setData` 来改变属性值的一个子字段，则依旧会触发属性 observer ，且 observer 接收到的 `newVal` 是变化的那个子字段的值， `oldVal` 为空， `changedPath` 包含子字段的字段名相关信息。
 */
declare const Component: WechatMiniprogram.Component.Constructor
