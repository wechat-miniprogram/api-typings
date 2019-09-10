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
    array: [{ msg: '1' }, { msg: '2' }],
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
    attached() {},
    moved() {},
    detached() {},
    error(err) {
      err // $ExpectType Error
    },
  },

  created() {},

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
      this.triggerEvent(
        'tap',
        { a: 1 },
        {
          bubbles: true,
          composed: true,
          capturePhase: true,
        },
      )
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

interface Config {
  a: number
}

interface ConfigConstructor extends ObjectConstructor {
  new (value?: any): Config
  readonly prototype: Config
}

Component({
  properties: {
    config: {
      type: Object as ConfigConstructor,
    },
  },
  methods: {
    doc() {
      this.data.config // $ExpectType Record<string, any>
    },
  },
  options: {
    addGlobalClass: true,
  },
})

Component({
  properties: {
    n: Number,
    n2: {
      type: Number,
      value: 1,
    },
    s: String,
    a: Array,
    a2: {
      type: Array,
      value: [1, 2],
    },
    b: Boolean,
    o: Object,
  },
  methods: {
    f() {
      this.data.n // $ExpectType number
      this.data.n2 // $ExpectType number
      this.data.s // $ExpectType string
      this.data.a // $ExpectType any[]
      this.data.a2 // $ExpectType any[]
      this.data.b // $ExpectType boolean
      this.data.o // $ExpectType Record<string, any>
      this.data.a[0] // $ExpectType any
      this.data.o.prop // $ExpectType any
    },
  },
})

Component({
  properties: {
    n: Number,
    n2: {
      type: Number,
      value: 1,
    },
    s: String,
    a: Array,
    a2: {
      type: Array,
      value: [1, 2],
    },
    b: Boolean,
    o: Object,
    o2: {
      type: Object,
      value: {} as WechatMiniprogram.UserInfo,
    },
  },
  methods: {
    f() {
      this.data.n // $ExpectType number
      this.data.n2 // $ExpectType number
      this.data.s // $ExpectType string
      this.data.a // $ExpectType any[]
      this.data.a2 // $ExpectType any[]
      this.data.b // $ExpectType boolean
      this.data.o // $ExpectType Record<string, any>
      this.data.o2 // $ExpectType Record<string, any>
      this.data.o2.city // $ExpectType any
      this.data.a[0] // $ExpectType any
      this.data.o.prop // $ExpectType any
    },
  },
})

Component({
  properties: {
    n: {
      type: Number,
      value: 1,
    },
    a: {
      type: Array,
      value: [1, 2],
    },
  },
  methods: {
    f() {
      this.data.n // $ExpectType number
      this.data.a // $ExpectType any[]
    },
  },
})

Component({
  properties: {
    n: Number,
    a: Array,
  },
  methods: {
    f() {
      this.data.n // $ExpectType number
      this.data.a // $ExpectType any[]
    },
  },
})

Component({
  data: {
    a: 1,
  },
  methods: {
    someMethod() {
      this.setData({
        a: '', // $ExpectError
      })
    },
  },
})
