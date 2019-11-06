/// <reference path="./api-extend.test.d.ts" />

import { expectType } from 'tsd'

{
  expectType<string>(wx.customMethod(1))
  const ctx = wx.createCanvasContext('test')
  expectType<void>(ctx.customMethod())
  const task = wx.connectSocket({ url: '' })
  task.readyState = 1
}
