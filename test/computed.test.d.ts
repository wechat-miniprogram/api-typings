declare namespace WechatMiniprogram {
  namespace Component {
    type ComputedOption = Record<string, () => any>
    interface Computed<C extends ComputedOption> {
      computed: C
    }
    type ComputedOptionToData<C extends ComputedOption> = {
      [K in keyof C]: C[K] extends () => infer R ? R : any
    }

    type ComputedInstance<
      D extends DataOption,
      P extends PropertyOption,
      M extends MethodOption,
      C extends ComputedOption
    > = Instance<D, P, M> & { data: ComputedOptionToData<C> }
    type ComputedOptions<
      D extends DataOption,
      P extends PropertyOption,
      M extends MethodOption,
      C extends ComputedOption
    > = Partial<Computed<C>> &
      ThisType<ComputedInstance<D, P, M, C>> &
      Options<D, P, M>
    interface ComputedConstructor {
      <
        D extends DataOption,
        P extends PropertyOption,
        M extends MethodOption,
        C extends ComputedOption
      >(
        options: ComputedOptions<D, P, M, C>,
      ): string
    }
  }
}
declare type ComputedComponent = WechatMiniprogram.Component.ComputedConstructor
declare type IAnyObject = WechatMiniprogram.IAnyObject
declare type ComputedOptions = WechatMiniprogram.Component.ComputedOptions<
  IAnyObject,
  IAnyObject,
  IAnyObject,
  IAnyObject
>
