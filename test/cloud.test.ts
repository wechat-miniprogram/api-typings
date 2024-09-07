


const cloud = wx.cloud
const db = cloud.database()
const _ = db.command
// https://developers.weixin.qq.com/miniprogram/dev/wxcloud/reference-sdk-api/constant/constant.html#%E7%A4%BA%E4%BE%8B
cloud.init({
  env:cloud.DYNAMIC_CURRENT_ENV
})
cloud.callFunction({
  name: 'getInfo',
  config: {
	  env: cloud.DYNAMIC_CURRENT_ENV
  },
})

//  https://developers.weixin.qq.com/miniprogram/dev/wxcloud/reference-sdk-api/Cloud.database.html
cloud.database({
  throwOnNotFound:true
})


//  https://developers.weixin.qq.com/miniprogram/dev/wxcloud/reference-sdk-api/database/Database.runTransaction.html

db.runTransaction(async transaction => {transaction})

// https://developers.weixin.qq.com/miniprogram/dev/wxcloud/reference-sdk-api/database/aggregate/Aggregate.html
db.collection('')
  .aggregate()
  .match({})
  .lookup({})
  .end()
