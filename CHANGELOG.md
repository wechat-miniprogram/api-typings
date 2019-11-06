## 2019-11-06 v2.9.1
- 同步 API 定义到基础库 2.9.1

## 2019-10-23 v2.9.0
- 同步 API 定义到基础库 2.9.0

## 2019-10-10 v2.8.3-1
- 修复注释文档中不可用的链接
- 组件实例类型支持 `Partial` 的自定义方法（[用例](https://github.com/wechat-miniprogram/api-typings/blob/master/test/issue.test.ts#L170-L185)）

## 2019-09-19 v2.8.3
- 同步 API 定义到基础库 2.8.3
- `getApp` 支持范型（#77）
- 修正一些接口错误（#73, #75, #79）
- 补齐 `require`, `exports`, `module.exports` 定义，以支持在没有 `@types/node` 下编译

## 2019-09-10 v2.8.2
- 同步 API 定义到基础库 2.8.2
- 加强了参数为可选值的方法参数类型定义和注释（如 `FileSystemManager.appendFileSync` 的 `encoding`）

## 2019-08-30 v2.8.1
- 同步 API 定义到基础库 2.8.1
- 修复了部分最低基础库显示为 `[object Object]` 的问题

## 2019-08-20 v2.8.0-2

- 将 `object` 改为 `Record<string, any>`，以允许任意属性和方法
- 自定义组件属性构造器为 `ObjectConstructor` 时，类型推导为 `Record<string, any>` 而不是 `object`
- 修正 `component` 参数的类型为页面或自定义组件实例
- 补齐 `console: WechatMiniprogram.Console` 全局变量
- 修正一些其他的接口类型错误

## 2019-08-14 v2.8.0-1

- 补齐 `styleIsolation` 到 `ComponentOption`

## 2019-08-14 v2.8.0

- 同步 API 定义到基础库 2.8.0
- 不再向全局暴露 `IAnyObject`，收回到命名空间 `WechatMiniprogram` 内
- 对齐代码规范，使用 4 空格缩进，不再使用分号等
- 小幅改动 behavior, component 和 page 的定义，使其对 data 和 properties 等的类型推断更准确
- 修复了一些其他问题（#60, #59, #48, #47, #45, #33, #13）

## 2019-08-08 v2.7.7-2

- 补齐了部分接口 fail 回调的错误码（#51）

## 2019-08-06 v2.7.7-1

- 重写了 page, component 和 behavior 的定义，替换原来不完整的定义，使其更全面，更准确（#46, #40, #30, #28, #27）

## 2019-07-31 v2.7.7

- 同步 API 定义到基础库 2.7.7
- 将命名空间从 `Wx` 更改为更正式的 `WechatMiniprogram`，这是一个 **破坏性改动**，原本字面上引用了 `Wx` 命名空间的代码可能失效
- 修复了云开发的定义无法使用的问题（#25, #32, #42）
- 修复了一些其它问题（#11, #35, #43)