

//补全[文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/reference-sdk-api/constant/constant.html#%E7%A4%BA%E4%BE%8B)中DYNAMIC_CURRENT_ENV类型

const cloud = wx.cloud
const db = cloud.database()
cloud.init({
  env:cloud['DYNAMIC_CURRENT_ENV']
})
cloud.database({
  env:cloud['DYNAMIC_CURRENT_ENV']
})
cloud.callFunction({
  name: 'getInfo',
  config: {
	  env: cloud.DYNAMIC_CURRENT_ENV
  },
})