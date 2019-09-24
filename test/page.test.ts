Page({}) // $ExpectType void

// $ExpectType Record<string, any>
getCurrentPages()[0].data

const app = getApp<{
  globalData: {
    userInfo: WechatMiniprogram.UserInfo;
  };
  userInfoReadyCallback(userInfo: WechatMiniprogram.UserInfo): void;
}>()

Page({
  data: {
    motto: '点击 “编译” 以构建',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs',
    })
  },
  onLoad() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
      })
    } else if (this.data.canIUse) {
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res,
          hasUserInfo: true,
        })
      }
    } else {
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true,
          })
        },
      })
    }
  },

  getUserInfo(e: any) {
    this.selectComponent('test')
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
    })
  },
})

Page({
  data: {
    text: 'init data',
    array: [{ msg: '1' }, { msg: '2' }],
    logs: [] as string[],
  },
  onLoad(options) {
    options.from // $ExpectType string | undefined
    const app = getApp<{
      globalData: { userInfo: WechatMiniprogram.UserInfo };
    }>()
    app.globalData.userInfo.nickName // $ExpectType string
  },
  onReady() {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map((log: number) => {
        return new Date(log).toString()
      }),
    })
  },
  onShow() {},
  onUnload() {},
  onPullDownRefresh() {},
  onShareAppMessage(res) {
    res.from // $ExpectType string
    if (res.from === 'button') {
      res.webViewUrl // $ExpectType string | undefined
    }
    return {
      title: '自定义转发标题',
      path: '/page/user?id=123',
    }
  },
  onPageScroll() {},
  onResize() {},
  onTabItemTap(item) {
    item.index // $ExpectType string
    item.pagePath // $ExpectType string
    item.text // $ExpectType string
  },
  viewTap() {
    this.setData(
      {
        text: 'Set some data for updating view.',
        'array[0].text': 'changed data',
        'object.text': 'changed data',
        'newField.text': 'new data',
      },
      function() {},
    )
    this.route // $ExpectType string
    this.data.text // $ExpectType string
    this.viewTap()

    const p = getCurrentPages()[1] as WechatMiniprogram.Page.Instance<
      { a: number },
      { customData: { b: number } }
    >
    p.customData.b = p.data.a
  },
  customData: {
    hi: 'MINA',
  },
})

Page({
  data: {
    a: 1,
  },
  onLoad(q) {
    q // $ExpectType Record<string, string | undefined>
    this.data.a // $ExpectType number
    this.a // $ExpectError
  },
  jump() {
    const query = wx.createSelectorQuery()
    query.select('#a').boundingClientRect(res => {
      res // $ExpectType BoundingClientRectCallbackResult
    })
    query.selectViewport().scrollOffset(res => {
      res // $ExpectType ScrollOffsetCallbackResult
    })
    query.exec(res => {
      res // $ExpectType any
    })
  },
  jumpBack() {
    wx.navigateBack({})
  },
})

Page({
  f() {
    this.data // $ExpectType Record<string, any>
  },
})

Page({
  data: {},
  f() {
    this.data // $ExpectType {}
    this.setData({
      a: 1,
    })
  },
})

Page({
  onLoad(q) {
    q
  },
  f() {
    this.onLoad()
  },
})

interface DataType {
  logs: string[]
}
interface CustomOption {
  getLogs(): string[]
}

Page<DataType, CustomOption>({
  data: {
    logs: [],
  },
  getLogs() {
    return (wx.getStorageSync('logs') || []).map((log: number) => {
      return new Date(log).toString()
    })
  },
  onLoad() {
    const logs = this.getLogs() // $ExpectType string[]
    this.setData({ logs })
    this.logs // $ExpectError
    this.data.logs // $ExpectType string[]
  },
})

Page.a = () => {}
