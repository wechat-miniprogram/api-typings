import { expectType } from 'tsd'

expectType<void>(App({}))

App({
  globalData: {
    userInfo: {} as WechatMiniprogram.UserInfo,
  },
  userInfoReadyCallback(userInfo: WechatMiniprogram.UserInfo) {
    userInfo.gender
  },
  onLaunch() {
    const logs: number[] = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              this.globalData.userInfo = res.userInfo
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res.userInfo)
              }
            },
          })
        }
      },
    })
  },
  f(a: number) {
    return a.toFixed()
  },
  onError() {},
  onHide() {
    expectType<string>(this.f(1))
  },
  onPageNotFound(e) {
    expectType<boolean>(e.isEntryPage)
  },
  onUnhandledRejection({ reason, promise }) {
    expectType<string>(reason)
    expectType<Promise<any>>(promise)
  },
  onThemeChange(res) {
    expectType<'dark' | 'light'>(res.theme)
  },
})

expectType<WechatMiniprogram.App.Instance<Record<string, any>>>(getApp())
