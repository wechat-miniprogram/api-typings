import { expectType, expectNotType } from 'tsd'

wx.request({
  url: 'https://www.baidu.com',
  success(res) {
    expectType<string>(res.errMsg)
    expectType<WechatMiniprogram.RequestSuccessCallbackResult>(res)
  },
})
wx.startBluetoothDevicesDiscovery({
  services: ['FEE7'],
  fail(res) {
    expectType<number>(res.errCode)
  },
})
wx.authorize({
  scope: 'scope.record',
})
wx.navigateTo({
  url: '/pages/index/index',
})

{
  const ctx = wx.createCanvasContext('myCanvas')
  expectType<WechatMiniprogram.CanvasContext>(ctx)
  ctx.setFillStyle('red')
  ctx.fillRect(10, 10, 150, 75)
  ctx.draw()
}

getCurrentPages().map(p => p.options)

const query = wx.createSelectorQuery()
expectType<WechatMiniprogram.SelectorQuery>(query)
query.select('#a').boundingClientRect(res => {
  expectType<number>(res.bottom)
})
query.selectViewport().scrollOffset(res => {
  expectType<number>(res.scrollTop)
})
query.exec(res => {
  expectType<any>(res)
})

Page({
  f() {
    wx.createSelectorQuery().in(this)
  },
})
Component({
  methods: {
    f() {
      wx.createSelectorQuery().in(this)
    },
  },
})

console.group('test')
console.debug('console', 'debug')
console.log('console', 'log')
console.info('console', 'info')
console.warn('console', 'warn')
console.error('console', 'error')
console.groupEnd()

expectType<string>(wx.env.USER_DATA_PATH)

wx.getStorage<string>({
  key: 'key',
  success(res) {
    expectType<string>(res.data)
  }
})
wx.getStorage<string>({ key: 'key' }).then((res) => {
  expectType<string>(res.data)
})
wx.getStorage({
  key: 'key',
  success(res) {
    expectType<any>(res.data)
    expectNotType<string>(res.data)
  }
})

wx.request<ArrayBuffer>({
  url: 'https://developer.weixin.qq.com',
  success(res) {
    expectType<ArrayBuffer>(res.data)
  }
})

{
  const thisShouldBeAny = wx.getStorageSync('test')
  expectType<any>(thisShouldBeAny)
  expectNotType<number>(thisShouldBeAny)
  const thisShouldBeNumber = wx.getStorageSync<number>('test')
  expectNotType<any>(thisShouldBeNumber)
  expectType<number>(thisShouldBeNumber)
}

wx.createSelectorQuery()
  .select('#canvas')
  .node(({ node }) => {
    const canvas = node as WechatMiniprogram.Canvas
    const ctx = canvas.getContext('2d')

    expectNotType<any>(ctx)
    expectType<string>(ctx.font)
    expectType<() => void>(ctx.save)
  })
  .exec()
