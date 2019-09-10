App({}) // $ExpectType void

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
    this.f(1) // $ExpectType string
  },
  onPageNotFound(e) {
    e.isEntryPage // $ExpectType boolean
  },
})

// $ExpectType Instance<Record<string, any>>
getApp()
