import { expectType, expectError } from 'tsd'

expectType<string>(Behavior({}))

Behavior({
  behaviors: [],
  properties: {
    myProperty: {
      type: String,
      value: '',
    },
    myProperty2: String,
    min: {
      type: Number,
      value: 0,
    },
    max: {
      type: Number,
      value: 0,
      observer(newVal, oldVal) {
        expectType<number>(newVal)
        expectType<string>(oldVal.toExponential())
      },
    },
  },
  data: {
    text: 'init data',
    array: [{ msg: '1' }, { msg: '2' }],
    logs: [] as string[],
  },
  attached() {},
  methods: {
    myBehaviorMethod() {
      expectError(this.created())
      expectType<string>(this.data.text)
      expectType<string>(this.properties.text)
      expectType<number>(this.data.max)
      expectType<string>(this.properties.myProperty2)
    },
  },
})

Behavior({
  attached() {},
  pageLifetimes: {
    show() {},
  },
})
