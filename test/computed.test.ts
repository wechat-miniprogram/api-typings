import { expectType } from 'tsd'

/// <reference path="./computed.test.d.ts" />

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
      expectType<string>(this.data.d)
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
