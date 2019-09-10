Behavior({}) // $ExpectType string

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
        newVal // $ExpectType number
        oldVal.toExponential() // $ExpectType string
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
      this.created() // $ExpectError
      this.data.text // $ExpectType string
      this.properties.text // $ExpectType string
      this.data.max // $ExpectType number
      this.properties.myProperty2 // $ExpectType string
    },
  },
})
