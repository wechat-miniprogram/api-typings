declare namespace WechatMiniprogram {
  interface Wx {
    customMethod(a: number): string
  }
  interface CanvasContext {
    customMethod(): void
  }
  interface SocketTask {
    readyState: number
  }
}

{
  wx.customMethod(1) // $ExpectType string
  const ctx = wx.createCanvasContext('test')
  ctx.customMethod() // $ExpectType void
  const task = wx.connectSocket({ url: '' })
  task.readyState = 1
}
