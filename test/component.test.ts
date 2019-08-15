Component({}) // $ExpectType string

Component({
  behaviors: [''],

  properties: {
    myProperty: {
      type: String,
      value: '',
    },
    freeType: {
      type: null,
      value: 'd',
    },
    myProperty2: String,
    min: {
      type: Number,
      value: 0,
    },
    test: {
      type: String,
      value: '',
      observer(n: string, o: string) {
        n.concat(o)
      },
    },
    max: {
      type: Number,
      value: 0,
      observer(newVal, oldVal) {
        newVal // $ExpectType number
        oldVal // $ExpectType number
        this.onMyButtonTap() // $ExpectType void
        this.data.max // $ExpectType number
      },
    },
    lastLeaf: {
      type: Number,
      optionalTypes: [String, Object],
      value: 0,
    },
  },

  data: {
    text: 'init data',
    array: [{msg: '1'}, {msg: '2'}],
    logs: [] as string[],
  },

  observers: {
    'numberA, numberB'(numberA, numberB) {
      this.setData({
        sum: numberA + numberB,
      })
    },
  },

  lifetimes: {
    attached() { },
    moved() { },
    detached() { },
    error(err) {
      err // $ExpectType Error
    },
  },

  created() {
  },

  pageLifetimes: {
    show() {
      // $ExpectType string
      this.is // is current component but not the page
    },
  },

  methods: {
    onMyButtonTap() {
      this.data.text // $ExpectType string
      this.data.min.toFixed() // $ExpectType string
      this.triggerEvent('tap', { a: 1 }, {
        bubbles: true,
        composed: true,
        capturePhase: true,
      })
    },
    _myPrivateMethod() {
      this.setData({
        'A[0].B': 'myPrivateData',
      })
    },
    _propertyChange(newVal: number, oldVal: number) {
      newVal // $ExpectType number
      oldVal // $ExpectType number
    },
  },
})

Component({
  custom: 1, // $ExpectError
  methods: {
    f() {
      this.custom // $ExpectError
    },
  },
})
