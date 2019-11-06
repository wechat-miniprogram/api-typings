import { expectType } from 'tsd'

// https://github.com/wechat-miniprogram/api-typings/issues/11
expectType<string>(wx.env.USER_DATA_PATH)

// https://github.com/wechat-miniprogram/api-typings/issues/13
const ctx = wx.createCanvasContext('myCanvas')
ctx.drawImage('', 1, 1)
ctx.drawImage('', 0, 0, 150, 100)
ctx.drawImage('', 0, 0, 0, 0, 0, 0, 0, 0)

// https://github.com/wechat-miniprogram/api-typings/issues/15
wx.getSetting({
  success(res) {
    expectType<boolean | undefined>(res.authSetting['scope.userInfo'])
  },
})

// https://github.com/wechat-miniprogram/api-typings/issues/25
// https://github.com/wechat-miniprogram/api-typings/issues/32
// https://github.com/wechat-miniprogram/api-typings/issues/42
wx.cloud.callFunction({
  name: 'add',
  data: {
    x: 1,
    y: 2,
  },
  success: res => {
    expectType<string>(res.errMsg)
  },
  fail: err => {
    expectType<string>(err.errMsg)
  },
})

wx.cloud.deleteFile({
  fileList: ['a7xzcb'],
  success: res => {
    expectType<ICloud.DeleteFileResultItem[]>(res.fileList)
  },
})

// https://github.com/wechat-miniprogram/api-typings/issues/33
wx.addCard({
  cardList: [
    {
      cardId: '',
      cardExt: '{"code": "", "openid": "", "timestamp": "", "signature":""}',
    },
    {
      cardId: '',
      cardExt: '{"code": "", "openid": "", "timestamp": "", "signature":""}',
    },
  ],
  success(res) {
    expectType<WechatMiniprogram.AddCardResponseInfo[]>(res.cardList)
  },
})

// https://github.com/wechat-miniprogram/api-typings/issues/35
wx.chooseMessageFile({
  count: 10,
  type: 'image',
  success(res) {
    expectType<WechatMiniprogram.ChooseFile[]>(res.tempFiles)
  },
})

// https://github.com/wechat-miniprogram/api-typings/issues/43
wx.canvasGetImageData({
  canvasId: 'myCanvas',
  x: 0,
  y: 0,
  width: 100,
  height: 100,
  success(res) {
    expectType<number>(res.width)
    expectType<number>(res.height)
    expectType<Uint8ClampedArray>(res.data)
    expectType<number>(res.data.length)
  },
})

// https://github.com/wechat-miniprogram/api-typings/issues/45
wx.onGyroscopeChange(res => {
  expectType<number>(res.x)
  expectType<number>(res.y)
  expectType<number>(res.z)
})

// https://github.com/wechat-miniprogram/api-typings/issues/47
wx.reportAnalytics('purchase', {
  price: 120,
  color: 'red',
})

// https://github.com/wechat-miniprogram/api-typings/issues/48
wx.navigateBack()
wx.navigateBack({})
wx.navigateBack({ delta: 1 })
wx.setTabBarStyle()
wx.setTabBarStyle({})
wx.setTabBarStyle({ color: '#111111' })
wx.setBackgroundColor({ backgroundColor: '#111111' })
wx.setNavigationBarColor({
  frontColor: '#ffffff',
  backgroundColor: '#123456',
})

// https://github.com/wechat-miniprogram/api-typings/issues/59
wx.login({
  success(res) {
    expectType<string>(res.errMsg)
  },
})

// https://github.com/wechat-miniprogram/api-typings/issues/60
wx.loadFontFace({
  source: '',
  family: 'font',
  success(res) {
    expectType<string>(res.status)
  },
  fail(res) {
    expectType<string>(res.status)
  },
  complete(res) {
    expectType<string>(res.status)
  },
})

// https://github.com/wechat-miniprogram/api-typings/issues/65
wx.request({
  url: '',
  success(res) {
    const data: WechatMiniprogram.IAnyObject = { res }
    expectType<any>(data.customData)
  },
})
interface IResponse {
  customData: string
}
wx.request({
  url: '',
  success(res) {
    const data = res.data as IResponse
    expectType<string>(data.customData)
  },
})

// https://github.com/wechat-miniprogram/api-typings/issues/73
{
  const task = wx.connectSocket({ url: '' })
  task.onClose(res => {
    expectType<number>(res.code)
    expectType<string>(res.reason)
  })
}

// https://github.com/wechat-miniprogram/api-typings/issues/75
{
  wx.onBluetoothDeviceFound(res => {
    res.devices.forEach(device => {
      expectType<string>(device.name)
      expectType<string>(device.deviceId)
    })
  })
}

// https://github.com/wechat-miniprogram/api-typings/issues/82
{
  interface IDialogMethod
    extends Partial<WechatMiniprogram.Component.MethodOption> {
    f?: () => string
    g: () => void
  }
  type Dialog = WechatMiniprogram.Component.Instance<{}, {}, IDialogMethod>
  Page({
    f() {
      const comp = this.selectComponent('#comp') as Dialog
      expectType<(() => string) | undefined>(comp.f)
      if (comp.f) expectType<string>(comp.f())
      comp.g()
    },
  })
}
