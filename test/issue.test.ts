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

// https://github.com/wechat-miniprogram/api-typings/issues/85
{
  Behavior({
    observers: {
      value(v) {
        expectType<any>(v)
      },
    },
  })
}

// https://github.com/wechat-miniprogram/api-typings/issues/87
import WX = WechatMiniprogram
{
  type ILoginResult = WX.LoginSuccessCallbackResult
  const t: ILoginResult = { code: '', errMsg: '' }
  expectType<WechatMiniprogram.LoginSuccessCallbackResult>(t)
}

// https://github.com/wechat-miniprogram/api-typings/issues/88
{
  wx.createSelectorQuery()
    .select('#canvas')
    .fields({ node: true })
    .exec(res => {
      wx.canvasToTempFilePath({ canvas: res[0].node })
      wx.canvasToTempFilePath({ canvas: res[0].node, quality: 0.5 })
    })
  wx.canvasToTempFilePath({ canvasId: '' })
}

// https://github.com/wechat-miniprogram/api-typings/issues/89
{
  const udp = wx.createUDPSocket()
  const port = udp.bind()
  expectType<number>(port)
}

// https://github.com/wechat-miniprogram/api-typings/issues/91
{
  expectType<Record<string, any>>(wx.getExtConfigSync())
  wx.getExtConfig({
    success(res) {
      expectType<Record<string, any>>(res.extConfig)
    },
  })
}

// https://github.com/wechat-miniprogram/api-typings/issues/95
{
  Page({
    ctx: {} as WechatMiniprogram.CameraContext,
    onLoad() {
      this.ctx = wx.createCameraContext()
    },
    takePhoto() {
      this.ctx.takePhoto({
        quality: 'high',
        success: res => {
          expectType<string>(res.tempImagePath)
          this.setData({
            src: res.tempImagePath,
          })
        },
      })
    },
    startRecord() {
      this.ctx.startRecord({
        success: res => {
          expectType<string>(res.errMsg)
          console.log('startRecord')
        },
      })
    },
    stopRecord() {
      this.ctx.stopRecord({
        success: res => {
          expectType<string>(res.tempThumbPath)
          expectType<string>(res.tempVideoPath)
          this.setData({
            src: res.tempThumbPath,
            videoSrc: res.tempVideoPath,
          })
        },
      })
    },
  })
}

// https://github.com/wechat-miniprogram/api-typings/issues/133
{
  type IData = {
    name: string
  }
  type IProperty = {
    id: typeof Number
  }
  type IMethod = {
    setJob(job: string): void
  }
  type ICustomInstanceProperty = {
    job: string
  }
  Component<IData, IProperty, IMethod, ICustomInstanceProperty>({
    properties: {
      id: Number,
    },

    data: {
      name: '',
    },

    methods: {
      setJob(job) {
        this.job = job
        expectType<string>(this.job)
      },
    },
  })
}

// https://github.com/wechat-miniprogram/api-typings/issues/134
{
  const ctx = wx.createMapContext('map')
  ctx.getRegion({
    success(res) {
      expectType<number>(res.southwest.longitude)
      expectType<number>(res.southwest.latitude)
      expectType<number>(res.northeast.longitude)
      expectType<number>(res.northeast.latitude)
    },
  })
}

// https://github.com/wechat-miniprogram/api-typings/issues/135
{
  App({
    onThemeChange(res) {
      expectType<'light' | 'dark'>(res.theme)
    },
  })
}

// https://github.com/wechat-miniprogram/api-typings/issues/136
{
  Page({
    onAddToFavorites(res) {
      if (res.webviewUrl) {
        // webview 页面返回 webviewUrl
        expectType<string>(res.webviewUrl)
      }
      return {
        title: '自定义标题',
        imageUrl: 'http://demo.png',
        query: 'name=xxx&age=xxx',
      }
    },
  })
}

// https://github.com/wechat-miniprogram/api-typings/issues/154
{
  wx.requestPayment({
    timeStamp: '',
    nonceStr: '',
    package: '',
    signType: 'MD5',
    paySign: '',
  })
  wx.requestPayment({
    timeStamp: '',
    nonceStr: '',
    package: '',
    signType: 'RSA',
    paySign: '',
  })
}

// https://github.com/wechat-miniprogram/api-typings/issues/157
// Test case for #157 is removed since `wx.saveFile` is no longer supported

// https://github.com/wechat-miniprogram/api-typings/issues/159
{
  Page({
    onShareTimeline() {
      return {
        title: '',
        query: '',
        imageUrl: '',
      }
    },
  })
}

// https://github.com/wechat-miniprogram/api-typings/issues/161
{
  Component({
    properties: {
      bar: {
        type: Object,
        value: { skuNum: 0 },
        observer () {}
      }
    },
    data: {
      foo: 123,
    },
    methods: {
      getDataOrPoperty() {
        return this.data.foo
      },
      test() {
        expectType<Record<string, any>>(this.data.bar)
        expectType<number>(this.getDataOrPoperty())
      },
    }
  })
}

// https://github.com/wechat-miniprogram/api-typings/issues/164
{
  requirePlugin('myPlugin')
  requireMiniProgram()
}

// https://github.com/wechat-miniprogram/api-typings/issues/175
{
  wx.requestSubscribeMessage({
    tmplIds: ['1', '2'],
    success: (res) => {
      expectType<string>(res.errMsg)
      expectType<string>(res.whatever)
      expectType<string>(res.randomTemplateId)
    },
  })
}

// https://github.com/wechat-miniprogram/api-typings/issues/204
{
  Page({
    test() {
      const observer = wx.createIntersectionObserver(this)
      observer.observe('', e => {
        expectType<string>(e.id)
        expectType<Record<string, any>>(e.dataset)
      })
    }
  })
}

// https://github.com/wechat-miniprogram/api-typings/issues/189
{
  const offscreenCanvas = wx.createOffscreenCanvas(800, 600)
  expectType<number>(offscreenCanvas.height)
  expectType<number>(offscreenCanvas.width)
}
