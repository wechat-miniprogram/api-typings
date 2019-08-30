# 微信小程序定义文件

> [English version](./README-en.md)

[![已在 NPM 发布](https://img.shields.io/npm/v/miniprogram-api-typings.svg?style=flat)](https://www.npmjs.com/package/miniprogram-api-typings)
[![MIT 协议](https://img.shields.io/github/license/wechat-miniprogram/api-typings.svg)](https://github.com/wechat-miniprogram/api-typings)
[![Travis CI 测试状况](https://travis-ci.org/wechat-miniprogram/api-typings.svg?branch=master)](https://travis-ci.org/wechat-miniprogram/api-typings)

微信小程序 API 的 TypeScript 类型定义文件

## 安装

通过 npm 安装：
```bash
# 安装对应最新基础库的定义文件
npm install miniprogram-api-typings
```

或者通过版本号指定一个基础库版本：
```bash
# 安装对应基础库版本 2.4.1 的定义文件
npm install miniprogram-api-typings@2.4.1
```

## 版本

基础库版本|npm 版本|命令
-|-|-
[v2.8.1](https://developers.weixin.qq.com/miniprogram/dev/framework/release/#v2-8-1-2019-08-22) | [2.8.1](https://www.npmjs.com/package/miniprogram-api-typings/v/2.8.1) | `npm install miniprogram-api-typings@2.8.1`
[v2.8.0](https://developers.weixin.qq.com/miniprogram/dev/framework/release/#v2-8-0-2019-07-30) | [2.8.0-2](https://www.npmjs.com/package/miniprogram-api-typings/v/2.8.0-2) | `npm install miniprogram-api-typings@2.8.0-2`
[v2.7.7](https://developers.weixin.qq.com/miniprogram/dev/framework/release/) | [2.7.7-2](https://www.npmjs.com/package/miniprogram-api-typings/v/2.7.7-2) | `npm install miniprogram-api-typings@2.7.7-2`
[v2.6.5](https://developers.weixin.qq.com/miniprogram/dev/framework/release/#v2-6-5-2019-04-02) | [2.6.5-2](https://www.npmjs.com/package/miniprogram-api-typings/v/2.6.5-2) | `npm install miniprogram-api-typings@2.6.5-2`
[v2.4.2](https://developers.weixin.qq.com/miniprogram/dev/framework/release/v2.html#v2-4-2-2018-12-04)|[2.4.2-2](https://www.npmjs.com/package/miniprogram-api-typings/v/2.4.2-2)|`npm install miniprogram-api-typings@2.4.2-2`
[v2.4.1](https://developers.weixin.qq.com/miniprogram/dev/framework/release/v2.html#v2-4-1-2018-11-21)|[2.4.1](https://www.npmjs.com/package/miniprogram-api-typings/v/2.4.1)|`npm install miniprogram-api-typings@2.4.1`
[v2.4.0](https://developers.weixin.qq.com/miniprogram/dev/framework/release/v2.html#v2-4-0-2018-11-05)|[2.4.0-1](https://www.npmjs.com/package/miniprogram-api-typings/v/2.4.0-1)|`npm install miniprogram-api-typings@2.4.0-1`

## 贡献

API 的定义文件（`lib.wx.api.d.ts`）是随 [文档](https://developers.weixin.qq.com/miniprogram/dev/index.html) 一起自动生成的，如果发现了 API 接口的定义错误，请提一个 issue 给我们，关于 API 的 PR 将 __不会__ 被接受。

如果有针对页面（`Page`）、自定义组件（`Component`）等接口的 bug 和建议，欢迎 PR 或提一个 issue 给我们。非常感谢！

### 测试

本定义文件使用 [`dtslint`](https://github.com/Microsoft/dtslint) 进行测试，所有的测试样例放在 `test` 目录下。

想执行测试的话，克隆本项目并完成 `npm install --save-dev` 后执行 `npm test` 即可。

如果您发现了不能通过自动化测试的测试样例，可以提交 PR 或者提一个 issue。当然，能通过自动化测试的强有力的测试样例也是欢迎的。
