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
type ComputedComponent = WechatMiniprogram.Component.ComputedConstructor
type IAnyObject = WechatMiniprogram.IAnyObject
type ComputedOptions = WechatMiniprogram.Component.ComputedOptions<
  IAnyObject,
  IAnyObject,
  IAnyObject,
  IAnyObject
>

(Component as ComputedComponent)({
  properties: {
    a: String,
  },
  data: {
    b: {
      c: 'test',
    },
  },
  computed: {
    d() {
      return 'test'
    },
  },
  methods: {
    f() {
      this.data.d // $ExpectType string
    },
  },
})

Behavior({
  lifetimes: {
    created() {
      this._originalSetData = this.setData
      this.setData = this._setData
    },
  },
  definitionFilter(defFields: ComputedOptions) {
    const computed = defFields.computed || {}
    const computedKeys = Object.keys(computed)
    const computedCache: Record<string, any> = {}

    const calcComputed = (scope: typeof defFields, insertToData?: boolean) => {
      const needUpdate: Record<string, any> = {}
      const data = (defFields.data = defFields.data || {})

      for (const key of computedKeys) {
        const value = computed[key].call(scope)
        if (computedCache[key] !== value) {
          needUpdate[key] = computedCache[key] = value
        }
        if (insertToData) data[key] = needUpdate[key]
      }

      return needUpdate
    }

    defFields.methods = defFields.methods || {}
    defFields.methods._setData = function(
      data: Record<string, any>,
      callback?: () => void,
    ) {
      const originalSetData = this._originalSetData
      originalSetData.call(this, data, callback)
      const needUpdate = calcComputed(this)
      originalSetData.call(this, needUpdate)
    }

    calcComputed(defFields, true)
  },
})
