wx.request({
  url: 'https://www.baidu.com',
  success(res) {
    res.errMsg // $ExpectType string
    res // $ExpectType RequestSuccessCallbackResult
  },
})
wx.startBluetoothDevicesDiscovery({
  services: ['FEE7'],
  fail(res) {
    res.errCode // $ExpectType number
  },
})
wx.authorize({
  scope: 'scope.record',
})
wx.navigateTo({
  url: '/pages/index/index',
})

{
  // $ExpectType CanvasContext
  const ctx = wx.createCanvasContext('myCanvas')
  ctx.setFillStyle('red')
  ctx.fillRect(10, 10, 150, 75)
  ctx.draw()
}

getCurrentPages().map(p => p.options)

// $ExpectType SelectorQuery
const query = wx.createSelectorQuery()
query.select('#a').boundingClientRect(res => {
  res.bottom // $ExpectType number
})
query.selectViewport().scrollOffset(res => {
  res.scrollTop // $ExpectType number
})
query.exec(res => {
  res // $ExpectType any
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

wx.env.USER_DATA_PATH // $ExpectType string
