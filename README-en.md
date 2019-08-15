# Wechat Mini Program API Typings

> [中文版本](./README.md)

[![](https://img.shields.io/npm/v/miniprogram-api-typings.svg?style=flat)](https://www.npmjs.com/package/miniprogram-api-typings)
[![](https://img.shields.io/github/license/wechat-miniprogram/api-typings.svg)](https://github.com/wechat-miniprogram/api-typings)

Type definitions for APIs of Wechat Mini Program in TypeScript

## Install

Install by NPM:
```bash
# install definitions for latest base library
npm install miniprogram-api-typings
```

or specify a base library version:

```bash
# install definitions for base library version 2.4.1
npm install miniprogram-api-typings@2.4.1
```

## Versions

Base Library version|npm version|command
-|-|-
[v2.8.0](https://developers.weixin.qq.com/miniprogram/dev/framework/release/#v2-8-0-2019-07-30) | [2.8.0-1](https://www.npmjs.com/package/miniprogram-api-typings/v/2.8.0-1) | `npm install miniprogram-api-typings@2.8.0-1`
[v2.7.7](https://developers.weixin.qq.com/miniprogram/dev/framework/release/) | [2.7.7-2](https://www.npmjs.com/package/miniprogram-api-typings/v/2.7.7-2) | `npm install miniprogram-api-typings@2.7.7-2`
[v2.6.5](https://developers.weixin.qq.com/miniprogram/dev/framework/release/#v2-6-5-2019-04-02) | [2.6.5-2](https://www.npmjs.com/package/miniprogram-api-typings/v/2.6.5-2) | `npm install miniprogram-api-typings@2.6.5-2`
[v2.4.2](https://developers.weixin.qq.com/miniprogram/dev/framework/release/v2.html#v2-4-2-2018-12-04)|[2.4.2-2](https://www.npmjs.com/package/miniprogram-api-typings/v/2.4.2-2)|`npm install miniprogram-api-typings@2.4.2-2`
[v2.4.1](https://developers.weixin.qq.com/miniprogram/dev/framework/release/v2.html#v2-4-1-2018-11-21)|[2.4.1](https://www.npmjs.com/package/miniprogram-api-typings/v/2.4.1)|`npm install miniprogram-api-typings@2.4.1`
[v2.4.0](https://developers.weixin.qq.com/miniprogram/dev/framework/release/v2.html#v2-4-0-2018-11-05)|[2.4.0-1](https://www.npmjs.com/package/miniprogram-api-typings/v/2.4.0-1)|`npm install miniprogram-api-typings@2.4.0-1`

## Contribution

Definitions of Wechat APIs (`lib.wx.api.d.ts`) are auto-generated together with our [documentations](https://developers.weixin.qq.com/miniprogram/dev/index.html), therefore PRs including that file will __not__ be merged. If you found some APIs defined wrongly, create an issue instead.

Both PR and issue are welcomed for definitions of pages (`Page`), custom components (`Component`) and other else, since they are written manually. Help us improve this definition if you have any bug reports or suggestions! Thanks for contributing!

### Automated tests

We use [`dtslint`](https://github.com/Microsoft/dtslint) to check if this definition is working properly. All test cases are under folder `test`.

To perform an automated test, clone this repo, `npm install --save-dev` and `npm test`.

If you have test case that fails the test, an issue or PR will be great. Strong test case that passes are also welcomed.
