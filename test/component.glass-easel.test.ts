import { expectType } from 'tsd'

// wechat-miniprogram/glass-easel: glass-easel-miniprogram-adapter: data_update.test.ts
{
  Component()
    .data(() => ({
      arr: [1, 2, 3],
      obj: {
        sub: false,
      },
    }))
    .lifetime('attached', function () {
      this.groupUpdates(() => {
        this.spliceArrayDataOnPath(['arr'], 1, 1, [4, 5])
        this.replaceDataOnPath(['obj', 'sub'], true)
      })
      this.groupSetData(() => {
        this.updateData({
          arr: [123],
        })
      })
      this.applyDataUpdates()
    })
    .register()
}

// wechat-miniprogram/glass-easel: glass-easel-miniprogram-adapter: data_update.test.ts
{
  Component()
    .data(() => ({
      a: 123,
    }))
    .init(function ({ setData, lifetime }) {
      lifetime('attached', () => {
        setData({ a: 789 }, () => {
          this.setData({ a: 456 }, () => {})
        })
      })
    })
    .register()
}

// wechat-miniprogram/glass-easel: glass-easel-miniprogram-adapter: env.test.ts
{
  Component().register()
}

// wechat-miniprogram/glass-easel: glass-easel-miniprogram-adapter: env.test.ts
{
  const beh = Behavior({ data: { num: 123 } })
  Component().behavior(beh).register()
}

// wechat-miniprogram/glass-easel: glass-easel-miniprogram-adapter: selector.test.ts
{
  const childDef= Component()
    .lifetime('attached', function () {
    // eslint-disable-next-line no-use-before-define
      const owner = this.selectOwnerComponent(selfDef)!
      owner.update()
    })
    .data(() => ({
      a: 123,
    }))
    .register()


  const selfDef = Component()
    .methods({
      update() {
        // eslint-disable-next-line
          this.selectComponent('#c1').setData({ a: 456 })
        const c2 = this.selectComponent('#c2', childDef)!
        c2.setData({ a: 789 })
      },
    })
    .register()
}

// wechat-miniprogram/glass-easel: glass-easel-miniprogram-adapter: selector.test.ts
{
  const child1Def = Component()
    .data(() => ({
      a: 123,
    }))
    .export(function () {
      return {
        id: 1,
        set: (d: { a: number }) => {
          this.setData(d)
        },
      }
    })
    .register()

  const child2Def = Component()
    .definition({
      data: () => ({
        a: 123,
      }),
      export() {
        return {
          id: 2,
          set: (d: { a: number }) => {
            this.setData(d)
          },
        }
      },
    })
    .register()

  Component()
    .lifetime('attached', function () {
      const c1any = this.selectComponent('#c1') as { id: number }
      const c1 = this.selectComponent('#c1', child1Def)!
      const c2any = this.selectComponent('#c2') as { id: number }
      const c2 = this.selectComponent('#c2', child2Def)!

      expectType<number>(c1any.id)
      expectType<number>(c1.id)
      expectType<number>(c2any.id)
      expectType<number>(c2.id)

      c1.set({ a: 456 })
      c2.set({ a: 789 })
    })
    .register()
}

// wechat-miniprogram/glass-easel: glass-easel-miniprogram-adapter: selector.test.ts
{
  const childDef = Component()
    .data(() => ({
      a: 123,
    }))
    .register()

  Component()
    .lifetime('attached', function () {
      this.selectAllComponents('.c').forEach((item, i) => item.setData({ a: i }))
      this.selectAllComponents('.c', childDef).forEach((item, i) => item.setData({ a: i }))
    })
    .register()
}

// wechat-miniprogram/glass-easel: glass-easel-miniprogram-adapter: selector.test.ts
{
  Component().property('p', String).register()
  Component()
    .lifetime('attached', function () {
      this.createSelectorQuery()
        .select('.invalid')
        .fields({})
        .select('.s')
        .boundingClientRect((res) => {
          expectType<string>(res.id)
          expectType<WechatMiniprogram.IAnyObject>(res.dataset)
          expectType<number>(res.left)
          expectType<number>(res.top)
          expectType<number>(res.right)
          expectType<number>(res.bottom)
          expectType<number>(res.width)
          expectType<number>(res.height)
        })
        .select('#bb')
        .scrollOffset((res) => {
          expectType<string>(res.id)
          expectType<WechatMiniprogram.IAnyObject>(res.dataset)
          expectType<number>(res.scrollLeft)
          expectType<number>(res.scrollTop)
          // expectType<number>(res.scrollWidth)
          // expectType<number>(res.scrollHeight)
        })
        .select('#cc')
        .fields(
          {
            mark: true,
            rect: true,
            size: true,
            scrollOffset: true,
            properties: ['p'],
          },
          (res) => {
            // FIXME: fields typing
            expectType<WechatMiniprogram.IAnyObject>(res)
            // expectType<undefined>(res.id)
            // expectType<undefined>(res.dataset)
            // expectType<WechatMiniprogram.IAnyObject>(res.mark)
            // expectType<number>(res.left)
            // expectType<number>(res.top)
            // expectType<number>(res.right)
            // expectType<number>(res.bottom)
            // expectType<number>(res.width)
            // expectType<number>(res.height)
            // expectType<number>(res.scrollLeft)
            // expectType<number>(res.scrollTop)
            // expectType<number>(res.scrollWidth)
            // expectType<number>(res.scrollHeight)
            // expectType<string>(res.p)
          },
        )
        .in(this.selectComponent('#cc'))
        .select('#cc')
        .boundingClientRect((res) => {
          expectType<WechatMiniprogram.BoundingClientRectCallbackResult>(res)
        })
        .exec((r) => {
          r.shift()
          r.pop()
          this.createSelectorQuery().exec(() => {
          })
        })
    })
    .register()
}

// wechat-miniprogram/glass-easel: glass-easel-miniprogram-adapter: selector.test.ts
{
  Component()
    .lifetime('attached', function () {
      this.createSelectorQuery()
        .selectViewport()
        .fields(
          {
            id: true,
            dataset: true,
            mark: true,
            rect: true,
            size: true,
            scrollOffset: true,
            properties: ['p'],
          },
          (res) => {
            // FIXME: fields typing
            expectType<WechatMiniprogram.IAnyObject>(res)
            // expectType<string>(res.id)
            // expectType<WechatMiniprogram.IAnyObject>(res.dataset)
            // expectType<WechatMiniprogram.IAnyObject>(res.mark)
            // expectType<number>(res.left)
            // expectType<number>(res.top)
            // expectType<number>(res.right)
            // expectType<number>(res.bottom)
            // expectType<number>(res.width)
            // expectType<number>(res.height)
            // expectType<number>(res.scrollLeft)
            // expectType<number>(res.scrollTop)
            // expectType<number>(res.scrollWidth)
            // expectType<number>(res.scrollHeight)
            // expectType<undefined>(res.p)
          },
        )
        .exec()
    })
    .register()
}

// wechat-miniprogram/glass-easel: glass-easel-miniprogram-adapter: selector.test.ts
{
  Component()
    .lifetime('attached', function () {
      this.createSelectorQuery()
        .selectViewport()
        .context((res) => {
          expectType<WechatMiniprogram.IAnyObject>(res.context)
        })
        .exec()
    })
    .register()
}

// wechat-miniprogram/glass-easel: glass-easel-miniprogram-adapter: selector.test.ts
{
  Component()
    .lifetime('attached', function () {
      const o1 = this.createIntersectionObserver().relativeToViewport()
      o1.observe('#a', () => {
        /* empty */
      })
      const o2 = this.createIntersectionObserver({
        thresholds: [1],
        initialRatio: 0,
        observeAll: true,
      }).relativeTo('#a')
      o2.observe('#b', () => {
        /* empty */
      })
      o1.disconnect()
      o2.disconnect()
    })
    .register()
}

// wechat-miniprogram/glass-easel: glass-easel-miniprogram-adapter: selector.test.ts
{
  Component()
    .lifetime('attached', function () {
      const o = this.createMediaQueryObserver()
      o.observe({ orientation: 'landscape' }, () => {
        /* empty */
      })
      o.disconnect()
    })
    .register()
}

// wechat-miniprogram/glass-easel: glass-easel-miniprogram-adapter: space.test.ts
{
  const beh = Behavior({
    data: {
      a: 123,
    },
    observers: {
      a() {
        /* empty */
      },
    },
  })

  const traitBeh = Behavior.trait<{ a: () => void }>()

  Component()
    .definition({
      options: {
        propertyEarlyInit: true,
      },
      behaviors: [beh],
      properties: {
        b: Number,
      },
      data: () => ({
        c: 789,
      }),
      observers: [
        {
          fields: 'b',
          observer() {
            /* empty */
          },
        },
      ],
      created() {
        /* empty */
      },
      attached() {
        this.setData({
          a: 321,
          b: 654,
        } as { b: number })
        /* empty */
      },
      detached() {
        /* empty */
      },
      moved() {
        /* empty */
      },
      ready() {
        /* empty */
      },
      lifetimes: {
        invalid() {
        /* empty */
        },
      },
      pageLifetimes: {
        invalid() {
        /* empty */
        },
      },
      relations: {
        invalid: {
          type: 'parent',
          target: traitBeh,
        },
      },
      externalClasses: [],
    })
    .register()
}

// wechat-miniprogram/glass-easel: glass-easel-miniprogram-adapter: space.test.ts
{
  Component()
    .options({
      pureDataPattern: /^_/,
    })
    .data(() => ({
      _a: 123,
      b: 456,
    }))
    .register()
}

// wechat-miniprogram/glass-easel: glass-easel-miniprogram-adapter: space.test.ts
{
  Component()
    .options({
      virtualHost: true,
    })
    .register()
}

// wechat-miniprogram/glass-easel: glass-easel-miniprogram-adapter: space.test.ts
{
  Component().definition({
    options: {
      dataDeepCopy: 'none',
    },
    data: {
      a: [1, 2, 3],
    },
  }).register()
}

// wechat-miniprogram/glass-easel: glass-easel-miniprogram-adapter: space.test.ts
{
  const childDef = Component()
    .options({
      virtualHost: true,
      dataDeepCopy: 'none',
      propertyPassingDeepCopy: 'none'
    })
    .property('p', Object)
    .register()

  Component()
    .options({
      dataDeepCopy: 'none',
      propertyPassingDeepCopy: 'none',
    })
    .data(() => ({
      a: Object.create(Object.prototype, {
        f: { enumerable: true, value: 123 },
        __test: { enumerable: false, value: 456 },
      }),
    }))
    .lifetime('attached', function () {
      const child = this.selectComponent('#c', childDef)!
      expectType<WechatMiniprogram.IAnyObject | null>(child.data.p)
    })
    .register()
}


// wechat-miniprogram/glass-easel: glass-easel-miniprogram-adapter: space.test.ts
{
  const childType = Component()
    .methods({
      childFn() {
        return 123
      },
    })
    .lifetime('attached', function () {
      expectType<number>(this.selectOwnerComponent(parentType)!.parentFn())
    })
    .register()

  const parentType = Component()
    .lifetime('attached', function () {
      expectType<number>(this.selectComponent('#c', childType)!.childFn())
    })
    .init(({ method }) => {
      const parentFn = method(() => 456)
      return { parentFn }
    })
    .register()
}

// wechat-miniprogram/glass-easel: glass-easel-miniprogram-adapter: space.test.ts
{
  Component()
    .staticData({
      text: 'abc',
    })
    .register()
}

// wechat-miniprogram/glass-easel: glass-easel-miniprogram-adapter: space.test.ts
{
  Component()
    .options({
      virtualHost: true,
    })
    .property('a', Number)
    .data(() => ({
      aa: 10,
    }))
    .observer('a', function () {
      this.setData({
        aa: this.data.a * 10,
      })
    })
    .register()
}

// wechat-miniprogram/glass-easel: glass-easel-miniprogram-adapter: space.test.ts
{
  Component()
    .data(() => ({
      b: 1,
      bb: 10,
    }))
    .observer('b', function () {
      this.setData({
        bb: this.data.b * 10,
      })
    })
    .lifetime('attached', function () {
      this.setData({ b: 2 })
    })
    .register()
}

// wechat-miniprogram/glass-easel: glass-easel-miniprogram-adapter: space.test.ts
{
  Component()
    .options({
      virtualHost: true,
    })
    .property('a', Number)
    .data(() => ({
      b: 0,
    }))
    .pageLifetime('show', function () {
      this.setData({
        b: 456,
      })
    })
    .register()
}

// wechat-miniprogram/glass-easel: glass-easel-miniprogram-adapter: space.test.ts
{
  Component()
    .data(() => ({
      a: 0,
    }))
    .pageLifetime('show', function (a: number) {
      this.setData({ a })
    })
    .register()
}

// wechat-miniprogram/glass-easel: glass-easel-miniprogram-adapter: space.test.ts
{
  const listDef = Component()
    .data(() => ({
      listCount: 0,
    }))
    .relation('item', {
      type: 'child',
      linked(target) {
        expectType<number>(target.asInstanceOf(itemDef)!.data.itemCount)
        this.setData({
          listCount: this.getRelationNodes('item').length,
        })
      },
    })
    .register()

  const itemDef = Component()
    .data(() => ({
      itemCount: 0,
    }))
    .init(({ relation }) => {
      relation({
        type: 'parent',
        target: listDef,
      })
    })
    .register()
}
