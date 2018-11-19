/// <reference path="./lib.wx.app.d.ts" />
/// <reference path="./lib.wx.page.d.ts" />
/// <reference path="./lib.wx.api.d.ts" />

declare type IAnyObject = Record<string, any>

declare type KVInfer<T> = {
  [K in keyof T]: T[K]
}

declare type Void<T> = T | undefined | null
type PartialOptional<T, K extends keyof T> = Partial<Pick<T, K>> & Pick<T, Exclude<keyof T, K>>

