declare namespace WechatMiniprogram {
  interface Wx {
    customMethod(a: number): string
  }
  interface CanvasContext {
    customMethod(): void
  }
}

{
  wx.customMethod(1) // $ExpectType string
  const ctx = wx.createCanvasContext('test')
  ctx.customMethod() // $ExpectType void
}
