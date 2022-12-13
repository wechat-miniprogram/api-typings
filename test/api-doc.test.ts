import { expectType } from 'tsd'
// Test case from `Animation`
{
  Page({
    animation: {} as WechatMiniprogram.Animation,
    data: {
      animationData: {},
    },
    onShow() {
      const animation = wx.createAnimation({
        duration: 1000,
        timingFunction: 'ease',
      })

      this.animation = animation

      animation
        .scale(2, 2)
        .rotate(45)
        .step()

      this.setData({
        animationData: animation.export(),
      })

      setTimeout(() => {
        animation.translate(30).step()
        this.setData({
          animationData: animation.export(),
        })
      }, 1000)
    },
    rotateAndScale() {
      // 旋转同时放大
      this.animation
        .rotate(45)
        .scale(2, 2)
        .step()
      this.setData({
        animationData: this.animation.export(),
      })
    },
    rotateThenScale() {
      // 先旋转后放大
      this.animation.rotate(45).step()
      this.animation.scale(2, 2).step()
      this.setData({
        animationData: this.animation.export(),
      })
    },
    rotateAndScaleThenTranslate() {
      // 先旋转同时放大，然后平移
      this.animation
        .rotate(45)
        .scale(2, 2)
        .step()
      this.animation.translate(100, 100).step({ duration: 1000 })
      this.setData({
        animationData: this.animation.export(),
      })
    },
  })
}

// Test case from `AudioContext`
{
  // audio.js
  Page({
    audioCtx: {} as WechatMiniprogram.AudioContext,
    onReady() {
      // 使用 wx.createAudioContext 获取 audio 上下文 context
      this.audioCtx = wx.createAudioContext('myAudio')
      this.audioCtx.setSrc(
        'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46',
      )
      this.audioCtx.play()
    },
    data: {
      src: '',
    },
    audioPlay() {
      this.audioCtx.play()
    },
    audioPause() {
      this.audioCtx.pause()
    },
    audio14() {
      this.audioCtx.seek(14)
    },
    audioStart() {
      this.audioCtx.seek(0)
    },
  })
}

// Test case from `BackgroundAudioManager`
{
  const backgroundAudioManager = wx.getBackgroundAudioManager()

  backgroundAudioManager.title = '此时此刻'
  backgroundAudioManager.epname = '此时此刻'
  backgroundAudioManager.singer = '许巍'
  backgroundAudioManager.coverImgUrl =
    'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000'
  // 设置了 src 之后会自动播放
  backgroundAudioManager.src =
    'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46'
}

// Test case from `CameraContext.onCameraFrame`
{
  const context = wx.createCameraContext()
  const listener = context.onCameraFrame(frame => {
    expectType<ArrayBuffer>(frame.data)
    expectType<number>(frame.width)
    expectType<number>(frame.height)
  })
  listener.start()
}

// Test case from `CanvasGradient.addColorStop`
{
  const ctx = wx.createCanvasContext('myCanvas')

  // Create circular gradient
  const grd = ctx.createLinearGradient(30, 10, 120, 10)
  grd.addColorStop(0, 'red')
  grd.addColorStop(0.16, 'orange')
  grd.addColorStop(0.33, 'yellow')
  grd.addColorStop(0.5, 'green')
  grd.addColorStop(0.66, 'cyan')
  grd.addColorStop(0.83, 'blue')
  grd.addColorStop(1, 'purple')

  // Fill with gradient
  ctx.setFillStyle(grd)
  ctx.fillRect(10, 10, 150, 80)
  ctx.draw()
}

// Test case from `DownloadTask`
{
  const downloadTask = wx.downloadFile({
    url: 'http://example.com/audio/123', // 仅为示例，并非真实的资源
    success(res) {
      wx.playVoice({
        filePath: res.tempFilePath,
      })
    },
  })

  downloadTask.onProgressUpdate(res => {
    // 下载进度
    expectType<number>(res.progress)
    // 已经下载的数据长度
    expectType<number>(res.totalBytesWritten)
    // 预期需要下载的数据总长度
    expectType<number>(res.totalBytesExpectedToWrite)
  })

  downloadTask.abort() // 取消下载任务
}

// Test case from `InnerAudioContext`
{
  const innerAudioContext = wx.createInnerAudioContext()
  innerAudioContext.autoplay = true
  innerAudioContext.src =
    'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46'
  innerAudioContext.onPlay(() => {
    console.log('开始播放')
  })
  innerAudioContext.onError(res => {
    expectType<string>(res.errMsg)
    res.errCode
  })
}

// Test case from `NodesRef.boundingClientRect`
{
  Page({
    getRect() {
      wx.createSelectorQuery()
        .select('#the-id')
        .boundingClientRect(function(rect) {
          rect.id // 节点的ID
          rect.dataset // 节点的dataset
          rect.left // 节点的左边界坐标
          rect.right // 节点的右边界坐标
          rect.top // 节点的上边界坐标
          rect.bottom // 节点的下边界坐标
          rect.width // 节点的宽度
          rect.height // 节点的高度
        })
        .exec()
    },
    getAllRects() {
      // FIXME:
      // wx.createSelectorQuery().selectAll('.a-class').boundingClientRect(function(rects) {
      //   rects.forEach(function(rect) {
      //     rect.id      // 节点的ID
      //     rect.dataset // 节点的dataset
      //     rect.left    // 节点的左边界坐标
      //     rect.right   // 节点的右边界坐标
      //     rect.top     // 节点的上边界坐标
      //     rect.bottom  // 节点的下边界坐标
      //     rect.width   // 节点的宽度
      //     rect.height  // 节点的高度
      //   })
      // }).exec()
    },
  })
}

// Test case from `NodesRef.context`
{
  Page({
    getContext() {
      wx.createSelectorQuery()
        .select('.the-video-class')
        .context(function(res) {
          const context = res.context as WechatMiniprogram.VideoContext
          context.seek(0)
        })
        .exec()
    },
  })
}

// Test case from `NodesRef.fields`
{
  Page({
    getFields() {
      wx.createSelectorQuery()
        .select('#the-id')
        .fields(
          {
            dataset: true,
            size: true,
            scrollOffset: true,
            properties: ['scrollX', 'scrollY'],
            computedStyle: ['margin', 'backgroundColor'],
            context: true,
          },
          function(res) {
            res.dataset // 节点的dataset
            res.width // 节点的宽度
            res.height // 节点的高度
            res.scrollLeft // 节点的水平滚动位置
            res.scrollTop // 节点的竖直滚动位置
            res.scrollX // 节点 scroll-x 属性的当前值
            res.scrollY // 节点 scroll-y 属性的当前值
            // 此处返回指定要返回的样式名
            res.margin
            res.backgroundColor
            res.context // 节点对应的 Context 对象
          },
        )
        .exec()
    },
  })
}

// Test case from `NodesRef.node`
{
  Page({
    getNode() {
      wx.createSelectorQuery()
        .select('.canvas')
        .node(function(res) {
          const canvas = res.node as WechatMiniprogram.Canvas
          canvas
        })
        .exec()
    },
  })
}

// Test case from `NodesRef.scrollOffset`
{
  Page({
    getScrollOffset() {
      wx.createSelectorQuery()
        .selectViewport()
        .scrollOffset(function(res) {
          res.id // 节点的ID
          res.dataset // 节点的dataset
          res.scrollLeft // 节点的水平滚动位置
          res.scrollTop // 节点的竖直滚动位置
        })
        .exec()
    },
  })
}

// Test case from `RecorderManager`
{
  const recorderManager = wx.getRecorderManager()

  recorderManager.onStart(() => {
    console.log('recorder start')
  })
  recorderManager.onPause(() => {
    console.log('recorder pause')
  })
  recorderManager.onStop(res => {
    console.log('recorder stop', res)
    const { tempFilePath } = res
    expectType<string>(tempFilePath)
  })
  recorderManager.onFrameRecorded(res => {
    const { frameBuffer } = res
    expectType<number>(frameBuffer.byteLength)
    console.log('frameBuffer.byteLength', frameBuffer.byteLength)
  })

  recorderManager.start({
    duration: 10000,
    sampleRate: 44100,
    numberOfChannels: 1,
    encodeBitRate: 192000,
    format: 'aac',
    frameSize: 50,
  })
}

// Test case from `RequestTask`
{
  const requestTask = wx.request({
    url: 'test.php', // 仅为示例，并非真实的接口地址
    data: {
      x: '',
      y: '',
    },
    header: {
      'content-type': 'application/json',
    },
    success(res) {
      console.log(res.data)
    },
  })
  requestTask.abort() // 取消请求任务
}

// Test case from `SelectorQuery.in`
{
  Component({
    methods: {
      queryMultipleNodes() {
        const query = wx.createSelectorQuery().in(this)
        query
          .select('#the-id')
          .boundingClientRect(function(res) {
            res.top // 这个组件内 #the-id 节点的上边界坐标
          })
          .exec()
      },
    },
  })
}

// Test case from `UpdateManager`
{
  const updateManager = wx.getUpdateManager()

  updateManager.onCheckForUpdate(function(res) {
    // 请求完新版本信息的回调
    expectType<boolean>(res.hasUpdate)
  })

  updateManager.onUpdateReady(function() {
    wx.showModal({
      title: '更新提示',
      content: '新版本已经准备好，是否重启应用？',
      success(res) {
        if (res.confirm) {
          // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
          updateManager.applyUpdate()
        }
      },
    })
  })

  updateManager.onUpdateFailed(function() {
    // 新版本下载失败
  })
}

// Test case from `UploadTask`
{
  const uploadTask = wx.uploadFile({
    url: 'http://example.weixin.qq.com/upload', // 仅为示例，非真实的接口地址
    filePath: '',
    name: 'file',
    formData: {
      user: 'test',
    },
    success(res) {
      expectType<string>(res.data)
    },
  })

  uploadTask.onProgressUpdate(res => {
    // 上传进度
    expectType<number>(res.progress)
    // 已经上传的数据长度
    expectType<number>(res.totalBytesSent)
    // 预期需要上传的数据总长度
    expectType<number>(res.totalBytesExpectedToSend)
  })

  uploadTask.abort() // 取消上传任务
}

// Test case from `VideoContext`
{
  const getRandomColor = () => {
    const rgb = []
    for (let i = 0; i < 3; ++i) {
      let color = Math.floor(Math.random() * 256).toString(16)
      color = color.length === 1 ? '0' + color : color
      rgb.push(color)
    }
    return '#' + rgb.join('')
  }

  Page({
    videoContext: {} as WechatMiniprogram.VideoContext,
    onReady() {
      this.videoContext = wx.createVideoContext('myVideo')
    },
    inputValue: '',
    bindInputBlur(e: any) {
      this.inputValue = e.detail.value
    },
    bindSendDanmu() {
      this.videoContext.sendDanmu({
        text: this.inputValue,
        color: getRandomColor(),
      })
    },
  })
}

// Test case from `Worker.postMessage`
{
  const worker = wx.createWorker('')
  worker.postMessage({
    msg: 'hello from worker',
  })
}

// Test case from `Worker`
{
  const worker = wx.createWorker('workers/request/index.js') // 文件名指定 worker 的入口文件路径，绝对路径

  worker.onMessage(function (res) {
    expectType<WechatMiniprogram.WorkerOnMessageListenerResult>(res)
  })
  // 监听worker被系统回收事件
  worker.onProcessKilled(function () {
    console.log('worker has been killed')
  })

  worker.postMessage({
    msg: 'hello worker',
  })

  worker.terminate()
}

// Test case from `wx.addCard`
{
  wx.addCard({
    cardList: [
      {
        cardId: '',
        cardExt: '{"code": "", "openid": "", "timestamp": "", "signature":""}',
      },
      {
        cardId: '',
        cardExt: '{"code": "", "openid": "", "timestamp": "", "signature":""}',
      },
    ],
    success(res) {
      res.cardList.forEach(card => {
        expectType<string>(card.cardExt)
        expectType<string>(card.cardId)
      }) // 卡券添加结果
    },
  })
}

// Test case from `wx.authorize`
{
  // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
  wx.getSetting({
    success(res) {
      if (!res.authSetting['scope.record']) {
        wx.authorize({
          scope: 'scope.record',
          success() {
            // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
            wx.startRecord({
              success() {},
            })
          },
        })
      }
    },
  })
}

// Test case from `wx.authorizeForMiniProgram`
{
  wx.authorizeForMiniProgram({
    scope: 'scope.record',
    success() {
      // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
      wx.startRecord()
    },
  })
}

// Test case from `wx.canIUse`
{
  // 对象的属性或方法
  wx.canIUse('console.log')
  wx.canIUse('CameraContext.onCameraFrame')
  wx.canIUse('CameraFrameListener.start')
  wx.canIUse('Image.src')

  // wx接口参数、回调或者返回值
  wx.canIUse('openBluetoothAdapter')
  wx.canIUse('getSystemInfoSync.return.safeArea.left')
  wx.canIUse('getSystemInfo.success.screenWidth')
  wx.canIUse('showToast.object.image')
  wx.canIUse('onCompassChange.callback.direction')
  wx.canIUse('request.object.method.GET')

  // 组件的属性
  wx.canIUse('live-player')
  wx.canIUse('text.selectable')
  wx.canIUse('button.open-type.contact')
}

// Test case from `wx.canvasGetImageData`
{
  wx.canvasGetImageData({
    canvasId: 'myCanvas',
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    success(res) {
      expectType<number>(res.width)
      expectType<number>(res.height)
      expectType<Uint8ClampedArray>(res.data)
      expectType<number>(res.data.length)
    },
  })
}

// Test case from `wx.checkIsSoterEnrolledInDevice`
{
  wx.checkIsSoterEnrolledInDevice({
    checkAuthMode: 'fingerPrint',
    success(res) {
      expectType<boolean>(res.isEnrolled)
    },
  })
}

// Test case from `wx.checkIsSupportSoterAuthentication`
{
  wx.checkIsSupportSoterAuthentication({
    success(res) {
      res.supportMode = [] // 不具备任何被SOTER支持的生物识别方式
      res.supportMode = ['fingerPrint'] // 只支持指纹识别
      res.supportMode = ['fingerPrint', 'facial'] // 支持指纹识别和人脸识别
    },
  })
}

// Test case from `wx.checkSession`
{
  wx.checkSession({
    success() {
      // session_key 未过期，并且在本生命周期一直有效
    },
    fail() {
      // session_key 已经失效，需要重新执行登录流程
      wx.login() // 重新登录
    },
  })
}

// Test case from `wx.chooseAddress`
{
  wx.chooseAddress({
    success(res) {
      expectType<string>(res.userName)
      expectType<string>(res.postalCode)
      expectType<string>(res.provinceName)
      expectType<string>(res.cityName)
      expectType<string>(res.countyName)
      expectType<string>(res.detailInfo)
      expectType<string>(res.nationalCode)
      expectType<string>(res.telNumber)
    },
  })
}

// Test case from `wx.chooseInvoiceTitle`
{
  wx.chooseInvoiceTitle({
    success() {},
  })
}

// Test case from `wx.chooseVideo`
{
  wx.chooseVideo({
    sourceType: ['album', 'camera'],
    maxDuration: 60,
    camera: 'back',
    success(res) {
      expectType<string>(res.tempFilePath)
    },
  })
}

// Test case from `wx.clearStorageSync`
{
  wx.clearStorage()
}

// Test case from `wx.clearStorage`
{
  wx.clearStorage()
}

// Test case from `wx.closeBLEConnection`
{
  wx.closeBLEConnection({
    deviceId: '',
    success(res) {
      console.log(res)
    },
  })
}

// Test case from `wx.closeBluetoothAdapter`
{
  wx.closeBluetoothAdapter({
    success(res) {
      console.log(res)
    },
  })
}

// Test case from `wx.closeSocket`
{
  wx.connectSocket({
    url: 'test.php',
  })

  // 注意这里有时序问题，
  // 如果 wx.connectSocket 还没回调 wx.onSocketOpen，而先调用 wx.closeSocket，那么就做不到关闭 WebSocket 的目的。
  // 必须在 WebSocket 打开期间调用 wx.closeSocket 才能关闭。
  wx.onSocketOpen(function() {
    wx.closeSocket()
  })

  wx.onSocketClose(function(res) {
    expectType<number>(res.code)
    expectType<string>(res.reason)
    console.log('WebSocket 已关闭！')
  })
}

// Test case from `wx.compressImage`
{
  wx.compressImage({
    src: '', // 图片路径
    quality: 80, // 压缩质量
  })
}

// Test case from `wx.connectSocket`
{
  wx.connectSocket({
    url: 'wss://example.qq.com',
    header: {
      'content-type': 'application/json',
    },
    protocols: ['protocol1'],
  })
}

// Test case from `wx.connectWifi`
{
  wx.connectWifi({
    SSID: '',
    password: '',
    success(res) {
      expectType<string>(res.errMsg)
    },
  })
}

// Test case from `wx.createBLEConnection`
{
  wx.createBLEConnection({
    // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
    deviceId: '',
    success(res) {
      console.log(res)
    },
  })
}

// Test case from `wx.createSelectorQuery`
{
  const query = wx.createSelectorQuery()
  query.select('#the-id').boundingClientRect()
  query.selectViewport().scrollOffset()
  query.exec(function(res) {
    res[0].top // #the-id节点的上边界坐标
    res[1].scrollTop // 显示区域的竖直滚动位置
  })
}

// Test case from `wx.downloadFile`
{
  wx.downloadFile({
    url: 'https://example.com/audio/123', // 仅为示例，并非真实的资源
    success(res) {
      // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
      if (res.statusCode === 200) {
        wx.playVoice({
          filePath: res.tempFilePath,
        })
      }
    },
  })
}

// Test case from `wx.getAccountInfoSync`
{
  const accountInfo = wx.getAccountInfoSync()
  // 小程序 appId
  expectType<string>(accountInfo.miniProgram.appId)
  // 插件 appId
  expectType<string>(accountInfo.plugin.appId)
  // 插件版本号， 'a.b.c' 这样的形式
  expectType<string>(accountInfo.plugin.version)
}

// Test case from `wx.getBLEDeviceCharacteristics`
{
  wx.getBLEDeviceCharacteristics({
    // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
    deviceId: '',
    // 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
    serviceId: '',
    success(res) {
      res.characteristics.forEach(characteristic => {
        expectType<boolean>(characteristic.properties.indicate)
        expectType<boolean>(characteristic.properties.notify)
        expectType<boolean>(characteristic.properties.read)
        expectType<boolean>(characteristic.properties.write)
        expectType<string>(characteristic.uuid)
      })
    },
  })
}

// Test case from `wx.getBLEDeviceServices`
{
  wx.getBLEDeviceServices({
    // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
    deviceId: '',
    success(res) {
      res.services.forEach(service => {
        expectType<string>(service.uuid)
        expectType<boolean>(service.isPrimary)
      })
    },
  })
}

// Test case from `wx.getBackgroundAudioPlayerState`
{
  wx.getBackgroundAudioPlayerState({
    success(res) {
      expectType<0 | 1 | 2>(res.status)

      expectType<string>(res.dataUrl)
      expectType<number>(res.currentPosition)
      expectType<number>(res.duration)
      expectType<number>(res.downloadPercent)
    },
  })
}

// Test case from `wx.getBluetoothAdapterState`
{
  wx.getBluetoothAdapterState({
    success(res) {
      console.log(res)
    },
  })
}

// Test case from `wx.getBluetoothDevices`
{
  wx.getBluetoothDevices({
    success(res) {
      res.devices.forEach(device => {
        expectType<ArrayBuffer>(device.advertisData)
      })
    },
  })
}

// Test case from `wx.getClipboardData`
{
  wx.getClipboardData({
    success(res) {
      expectType<string>(res.data)
    },
  })
}

// Test case from `wx.getConnectedBluetoothDevices`
{
  wx.getConnectedBluetoothDevices({
    services: ['FEE7'],
    success(res) {
      res.devices.forEach(device => {
        expectType<string>(device.deviceId)
        expectType<string>(device.name)
      })
    },
  })
}

// Test case from `wx.getHCEState`
{
  wx.getHCEState({
    success(res) {
      expectType<string>(res.errMsg)
    },
  })
}

// Test case from `wx.getImageInfo`
{
  wx.getImageInfo({
    src: 'images/a.jpg',
    success(res) {
      expectType<number>(res.width)
      expectType<number>(res.height)
    },
  })

  wx.chooseImage({
    success(res) {
      wx.getImageInfo({
        src: res.tempFilePaths[0],
        success(res) {
          expectType<number>(res.width)
          expectType<number>(res.height)
        },
      })
    },
  })
}

// Test case from `wx.getLogManager`
{
  const logger = wx.getLogManager({ level: 1 })
  logger.log({ str: 'hello world' }, 'basic log', 100, [1, 2, 3])
  logger.info({ str: 'hello world' }, 'info log', 100, [1, 2, 3])
  logger.debug({ str: 'hello world' }, 'debug log', 100, [1, 2, 3])
  logger.warn({ str: 'hello world' }, 'warn log', 100, [1, 2, 3])
}

// Test case from `wx.getNetworkType`
{
  wx.getNetworkType({
    success(res) {
      res.networkType
    },
  })
}

// Test case from `wx.getRealtimeLogManager`
{
  // 小程序端
  {
    const logger = wx.getRealtimeLogManager()
    logger.info({ str: 'hello world' }, 'info log', 100, [1, 2, 3])
    logger.error({ str: 'hello world' }, 'error log', 100, [1, 2, 3])
    logger.warn({ str: 'hello world' }, 'warn log', 100, [1, 2, 3])
  }

  // 插件端，基础库 2.16.0 版本后支持，只允许采用 key-value 的新格式上报
  {
    const logManager = wx.getRealtimeLogManager()
    const logger = logManager.tag('plugin-log1')
    logger.info('key1', 'value1')
    logger.error('key2', { str: 'value2' })
    logger.warn('key3', 'value3')
  }
}

// Test case from `wx.getSelectedTextRange`
{
  wx.getSelectedTextRange({
    success(res) {
      expectType<number>(res.start)
      expectType<number>(res.end)
    },
  })
}

// Test case from `wx.getSetting`
{
  wx.getSetting({
    success(res) {
      expectType<boolean | undefined>(res.authSetting['scope.address'])
      expectType<boolean>(res.subscriptionsSetting.mainSwitch)
      expectType<Record<string, any> | undefined>(res.subscriptionsSetting.itemSettings)
    },
  })
}

// Test case from `SubscriptionsSetting`
{
  wx.getSetting({
    withSubscriptions: true,
    success(res) {
      expectType<undefined | boolean>(res.authSetting['scope.userInfo'])
      expectType<undefined | boolean>(res.authSetting['scope.userLocation'])
      expectType<boolean>(res.subscriptionsSetting.mainSwitch)
      if (res.subscriptionsSetting.itemSettings !== undefined) {
        expectType<any>(res.subscriptionsSetting.itemSettings.SYS_MSG_TYPE_INTERACTIVE)
      }
    },
  })
}

// Test case from `wx.getStorageInfoSync`
{
  wx.getStorageInfo({
    success(res) {
      expectType<string[]>(res.keys)
      expectType<number>(res.currentSize)
      expectType<number>(res.limitSize)
    },
  })
}

// Test case from `wx.getStorageInfo`
{
  wx.getStorageInfo({
    success(res) {
      expectType<string[]>(res.keys)
      expectType<number>(res.currentSize)
      expectType<number>(res.limitSize)
    },
  })
}

// Test case from `wx.getStorageSync`
{
  wx.getStorage({
    key: 'key',
    success(res) {
      expectType<any>(res.data)
    },
  })
}

// Test case from `wx.getStorage`
{
  wx.getStorage({
    key: 'key',
    success(res) {
      expectType<any>(res.data)
    },
  })
}

type TPlatform = 'ios' | 'android' | 'windows' | 'mac' | 'devtools'

// Test case from `wx.getSystemInfoSync`
{
  wx.getSystemInfo({
    success(res) {
      expectType<string>(res.model)
      expectType<number>(res.pixelRatio)
      expectType<number>(res.windowWidth)
      expectType<number>(res.windowHeight)
      expectType<string>(res.language)
      expectType<string>(res.version)
      expectType<TPlatform>(res.platform)
    },
  })
}

// Test case from `wx.getSystemInfo`
{
  wx.getSystemInfo({
    success(res) {
      expectType<string>(res.model)
      expectType<number>(res.pixelRatio)
      expectType<number>(res.windowWidth)
      expectType<number>(res.windowHeight)
      expectType<string>(res.language)
      expectType<string>(res.version)
      expectType<TPlatform>(res.platform)
    },
  })
}

// Test case from `wx.getSystemInfoAsync`
{
  wx.getSystemInfoAsync({
    success (res) {
      expectType<string>(res.model)
      expectType<number>(res.pixelRatio)
      expectType<number>(res.windowWidth)
      expectType<number>(res.windowHeight)
      expectType<string>(res.language)
      expectType<string>(res.version)
      expectType<TPlatform>(res.platform)
    }
  })
}

// Test case from `wx.getUserInfo`
{
  // 必须是在用户已经授权的情况下调用
  wx.getUserInfo({
    success(res) {
      const userInfo = res.userInfo
      expectType<string>(userInfo.nickName)
      expectType<string>(userInfo.avatarUrl)
      expectType<0 | 1 | 2>(userInfo.gender) // 性别 0：未知、1：男、2：女
      expectType<string>(userInfo.province)
      expectType<string>(userInfo.city)
      expectType<string>(userInfo.country)
    },
  })
}

// Test case from `wx.getWeRunData`
{
  wx.getWeRunData({
    success(res) {
      // 拿 encryptedData 到开发者后台解密开放数据
      expectType<string>(res.encryptedData)
      // 或拿 cloudID 通过云调用直接获取开放数据
      expectType<string>(res.cloudID)
    },
  })
}

// Test case from `wx.hideKeyboard`
{
  wx.hideKeyboard({
    complete: res => {
      console.log('hideKeyboard res', res)
    },
  })
}

// Test case from `wx.hideShareMenu`
{
  wx.hideShareMenu()
}

// Test case from `wx.hideShareMenu`
{
  wx.hideShareMenu({
    menus: ['shareAppMessage', 'shareTimeline'],
  })
}

// Test case from `wx.loadFontFace`
{
  wx.loadFontFace({
    family: 'Bitstream Vera Serif Bold',
    source: 'url("https://sungd.github.io/Pacifico.ttf")',
    success: console.log,
  })
}

// Test case from `wx.login`
{
  wx.login({
    success(res) {
      if (res.code) {
        // 发起网络请求
        wx.request({
          url: 'https://example.com/onLogin',
          data: {
            code: res.code,
          },
        })
      } else {
        console.log('登录失败！' + res.errMsg)
      }
    },
  })
}

// Test case from `wx.makePhoneCall`
{
  wx.makePhoneCall({
    phoneNumber: '1340000', // 仅为示例，并非真实的电话号码
  })
}

// Test case from `wx.navigateBackMiniProgram`
{
  wx.navigateBackMiniProgram({
    extraData: {
      foo: 'bar',
    },
    success() {
      // 返回成功
    },
  })
}

// Test case from `wx.navigateToMiniProgram`
{
  wx.navigateToMiniProgram({
    appId: '',
    path: 'page/index/index?id=123',
    extraData: {
      foo: 'bar',
    },
    envVersion: 'develop',
    success() {
      // 打开成功
    },
  })
}

// Test case from `wx.navigateTo`
{
  wx.navigateTo({
    url: 'test?id=1',
    events: {
      // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
      acceptDataFromOpenedPage(data: any) {
        console.log(data)
      },
      someEvent(data: any) {
        console.log(data)
      },
    },
    success(res) {
      // 通过eventChannel向被打开页面传送数据
      res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'test' })
    },
  })
}

// Test case from `wx.nextTick`
{
  Component({
    methods: {
      doSth() {
        this.setData({ number: 1 }) // 直接在当前同步流程中执行

        wx.nextTick(() => {
          this.setData({ number: 3 }) // 在当前同步流程结束后，下一个时间片执行
        })

        this.setData({ number: 2 }) // 直接在当前同步流程中执行
      },
    },
  })
}

// Test case from `wx.notifyBLECharacteristicValueChange`
{
  wx.notifyBLECharacteristicValueChange({
    state: true, // 启用 notify 功能
    // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
    deviceId: '',
    // 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
    serviceId: '',
    // 这里的 characteristicId 需要在 getBLEDeviceCharacteristics 接口中获取
    characteristicId: '',
    success(res) {
      console.log('notifyBLECharacteristicValueChange success', res.errMsg)
    },
  })
}

// Test case from `wx.onAccelerometerChange`
{
  wx.onAccelerometerChange(function(res) {
    expectType<number>(res.x)
    expectType<number>(res.y)
    expectType<number>(res.z)
  })
}

// Test case from `wx.onBLECharacteristicValueChange`
{
  wx.onBLECharacteristicValueChange(function(res) {
    expectType<string>(res.characteristicId)
    expectType<ArrayBuffer>(res.value)
    console.log(
      `characteristic ${res.characteristicId} has changed, now is ${res.value}`,
    )
    expectType<ArrayBuffer>(res.value)
  })
}

// Test case from `wx.onBLEConnectionStateChange`
{
  wx.onBLEConnectionStateChange(function(res) {
    // 该方法回调中可以用于处理连接意外断开等异常情况
    console.log(
      `device ${res.deviceId} state has changed, connected: ${res.connected}`,
    )
  })
}

// Test case from `wx.onBluetoothAdapterStateChange`
{
  wx.onBluetoothAdapterStateChange(function(res) {
    console.log('adapterState changed, now is', res)
  })
}

// Test case from `wx.onBluetoothDeviceFound`
{
  wx.onBluetoothDeviceFound(function(res) {
    const { devices } = res
    console.log('new device list has founded')
    devices.forEach(device => {
      expectType<number>(device.RSSI)
      expectType<ArrayBuffer>(device.advertisData)
      expectType<string[]>(device.advertisServiceUUIDs)
      expectType<string>(device.deviceId)
      expectType<string>(device.localName)
      expectType<string>(device.name)
      expectType<Record<string, any>>(device.serviceData)
    })
  })
}

// Test case from `wx.onKeyboardHeightChange`
{
  wx.onKeyboardHeightChange(res => {
    expectType<number>(res.height)
  })
}

// Test case from `wx.onLocationChange`
{
  const _locationChangeFn = function(res: any) {
    console.log('location change', res)
  }
  wx.onLocationChange(_locationChangeFn)
  wx.offLocationChange(_locationChangeFn)
}

// Test case from `wx.onNetworkStatusChange`
{
  wx.onNetworkStatusChange(function(res) {
    expectType<boolean>(res.isConnected)
    res.networkType
  })
}

// Test case from `wx.onUserCaptureScreen`
{
  wx.onUserCaptureScreen(function() {
    console.log('用户截屏了')
  })
}

// Test case from `wx.openBluetoothAdapter`
{
  wx.openBluetoothAdapter({
    success(res) {
      console.log(res)
    },
  })
}

// Test case from `wx.openCard`
{
  wx.openCard({
    cardList: [
      {
        cardId: '',
        code: '',
      },
      {
        cardId: '',
        code: '',
      },
    ],
    success() {},
  })
}

// Test case from `wx.openSetting`
{
  wx.openSetting({
    success(res) {
      expectType<WechatMiniprogram.AuthSetting>(res.authSetting)
      res.authSetting = {
        'scope.userInfo': true,
        'scope.userLocation': true,
      }
    },
  })
}

// Test case from `wx.pageScrollTo`
{
  wx.pageScrollTo({
    scrollTop: 0,
    duration: 300,
  })
}

// Test case from `wx.pauseBackgroundAudio`
{
  wx.pauseBackgroundAudio()
}

// Test case from `wx.pauseVoice`
{
  wx.startRecord({
    success(res) {
      const tempFilePath = res.tempFilePath
      wx.playVoice({
        filePath: tempFilePath,
      })

      setTimeout(() => {
        wx.pauseVoice()
      }, 5000)
    },
  })
}

// Test case from `wx.playBackgroundAudio`
{
  wx.playBackgroundAudio({
    dataUrl: '',
    title: '',
    coverImgUrl: '',
  })
}

// Test case from `wx.playVoice`
{
  wx.startRecord({
    success(res) {
      const tempFilePath = res.tempFilePath
      wx.playVoice({
        filePath: tempFilePath,
        complete() {},
      })
    },
  })
}

// Test case from `wx.previewImage`
{
  wx.previewImage({
    current: '', // 当前显示图片的http链接
    urls: [], // 需要预览的图片http链接列表
  })
}

// Test case from `wx.reLaunch`
{
  wx.reLaunch({
    url: 'test?id=1',
  })
}

// Test case from `wx.readBLECharacteristicValue`
{
  // 必须在这里的回调才能获取
  wx.onBLECharacteristicValueChange(function(characteristic) {
    console.log('characteristic value comed:', characteristic)
  })

  wx.readBLECharacteristicValue({
    // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
    deviceId: '',
    // 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
    serviceId: '',
    // 这里的 characteristicId 需要在 getBLEDeviceCharacteristics 接口中获取
    characteristicId: '',
    success(res) {
      console.log('readBLECharacteristicValue:', res.errCode)
    },
  })
}

// Test case from `wx.redirectTo`
{
  wx.redirectTo({
    url: 'test?id=1',
  })
}

// Test case from `wx.removeStorageSync`
{
  wx.removeStorage({
    key: 'key',
    success(res) {
      console.log(res)
    },
  })
}

// Test case from `wx.removeStorage`
{
  wx.removeStorage({
    key: 'key',
    success(res) {
      console.log(res)
    },
  })
}

// Test case from `wx.reportAnalytics`
{
  wx.reportAnalytics('purchase', {
    price: 120,
    color: 'red',
  })
}

// Test case from `wx.reportMonitor`
{
  wx.reportMonitor('1', 1)
}

// Test case from `wx.requestPayment`
{
  wx.requestPayment({
    timeStamp: '',
    nonceStr: '',
    package: '',
    signType: 'MD5',
    paySign: '',
    success() {},
    fail() {},
  })
}

// Test case from `wx.requestSubscribeMessage`
{
  wx.requestSubscribeMessage({
    tmplIds: [''],
    success(res) {
      expectType<string>(res.errMsg)
      expectType<string>(res.anyTemplateId)
    }
  })
}

// Test case from `wx.request`
{
  wx.request({
    url: 'example.php', //仅为示例，并非真实的接口地址
    data: {
      x: '',
      y: '',
    },
    header: {
      'content-type': 'application/json', // 默认值
    },
    success(res) {
      console.log(res.data)
    },
  })
}

// Test case from `wx.saveImageToPhotosAlbum`
{
  wx.saveImageToPhotosAlbum({
    filePath: '',
    success() {},
  })
}

// Test case from `wx.saveVideoToPhotosAlbum`
{
  wx.saveVideoToPhotosAlbum({
    filePath: 'wxfile://xxx',
    success(res) {
      console.log(res.errMsg)
    },
  })
}

// Test case from `wx.scanCode`
{
  // 允许从相机和相册扫码
  wx.scanCode({
    success(res) {
      console.log(res)
    },
  })

  // 只允许从相机扫码
  wx.scanCode({
    onlyFromCamera: true,
    success(res) {
      console.log(res)
    },
  })
}

// Test case from `wx.seekBackgroundAudio`
{
  wx.seekBackgroundAudio({
    position: 30,
  })
}

// Test case from `wx.sendHCEMessage`
{
  const buffer = new ArrayBuffer(1)
  const dataView = new DataView(buffer)
  dataView.setUint8(0, 0)

  wx.startHCE({
    aid_list: [''],
    success() {
      wx.onHCEMessage(function(res) {
        if (res.messageType === 1) {
          wx.sendHCEMessage({ data: buffer })
        }
      })
    },
  })
}

// Test case from `wx.sendSocketMessage`
{
  let socketOpen = false
  let socketMsgQueue: string[] = []
  wx.connectSocket({
    url: 'test.php',
  })

  wx.onSocketOpen(function() {
    socketOpen = true
    socketMsgQueue.forEach(socketMsg => {
      sendSocketMessage(socketMsg)
    })
    socketMsgQueue = []
  })

  const sendSocketMessage = (msg: string) => {
    if (socketOpen) {
      wx.sendSocketMessage({
        data: msg,
      })
    } else {
      socketMsgQueue.push(msg)
    }
  }
}

// Test case from `wx.setBackgroundColor`
{
  wx.setBackgroundColor({
    backgroundColor: '#ffffff', // 窗口的背景色为白色
  })

  wx.setBackgroundColor({
    backgroundColorTop: '#ffffff', // 顶部窗口的背景色为白色
    backgroundColorBottom: '#ffffff', // 底部窗口的背景色为白色
  })
}

// Test case from `wx.setBackgroundTextStyle`
{
  wx.setBackgroundTextStyle({
    textStyle: 'dark', // 下拉背景字体、loading 图的样式为dark
  })
}

// Test case from `wx.setClipboardData`
{
  wx.setClipboardData({
    data: 'data',
    success() {
      wx.getClipboardData({
        success(res) {
          console.log(res.data) // data
        },
      })
    },
  })
}

// Test case from `wx.setKeepScreenOn`
{
  wx.setKeepScreenOn({
    keepScreenOn: true,
  })
}

// Test case from `wx.setNavigationBarTitle`
{
  wx.setNavigationBarTitle({
    title: '当前页面',
  })
}

// Test case from `wx.setStorageSync`
{
  wx.setStorage({
    key: 'key',
    data: 'value',
  })
}

// Test case from `wx.setStorage`
{
  wx.setStorage({
    key: 'key',
    data: 'value',
  })
}

// Test case from `wx.setTabBarBadge`
{
  wx.setTabBarBadge({
    index: 0,
    text: '1',
  })
}

// Test case from `wx.setTabBarItem`
{
  wx.setTabBarItem({
    index: 0,
    text: 'text',
    iconPath: '/path/to/iconPath',
    selectedIconPath: '/path/to/selectedIconPath',
  })
}

// Test case from `wx.setTabBarStyle`
{
  wx.setTabBarStyle({
    color: '#FF0000',
    selectedColor: '#00FF00',
    backgroundColor: '#0000FF',
    borderStyle: 'white',
  })
}

// Test case from `wx.setTopBarText`
{
  wx.setTopBarText({
    text: 'hello, world!',
  })
}

// Test case from `wx.setWifiList`
{
  wx.onGetWifiList(function(res) {
    if (res.wifiList.length) {
      wx.setWifiList({
        wifiList: [
          {
            SSID: res.wifiList[0].SSID,
            BSSID: res.wifiList[0].BSSID,
            password: '123456',
          },
        ],
      })
    } else {
      wx.setWifiList({
        wifiList: [],
      })
    }
  })
  wx.getWifiList()
}

// Test case from `wx.showActionSheet`
{
  wx.showActionSheet({
    itemList: ['A', 'B', 'C'],
    success(res) {
      console.log(res.tapIndex)
    },
    fail(res) {
      console.log(res.errMsg)
    },
  })
}

// Test case from `wx.showLoading`
{
  wx.showLoading({
    title: '加载中',
  })

  setTimeout(function() {
    wx.hideLoading()
  }, 2000)
}

// Test case from `wx.showModal`
{
  wx.showModal({
    title: '提示',
    content: '这是一个模态弹窗',
    success(res) {
      if (res.confirm) {
        console.log('用户点击确定')
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    },
  })
}

// Test case from `wx.showShareMenu`
{
  wx.showShareMenu({
    withShareTicket: true,
  })
}

// Test case from `wx.showShareMenu`
{
  wx.showShareMenu({
    withShareTicket: true,
    menus: ['shareAppMessage', 'shareTimeline'],
  })
}

// Test case from `wx.showToast`
{
  wx.showToast({
    title: '成功',
    icon: 'success',
    duration: 2000,
  })
}

// Test case from `wx.startAccelerometer`
{
  wx.startAccelerometer({
    interval: 'game',
  })
}

// Test case from `wx.startBeaconDiscovery`
{
  wx.startBeaconDiscovery({
    uuids: [],
    success(res) {
      res.errMsg
    },
  })
}

// Test case from `wx.startBluetoothDevicesDiscovery`
{
  // 以微信硬件平台的蓝牙智能灯为例，主服务的 UUID 是 FEE7。传入这个参数，只搜索主服务 UUID 为 FEE7 的设备
  wx.startBluetoothDevicesDiscovery({
    services: ['FEE7'],
    success(res) {
      console.log(res)
    },
  })
}

// Test case from `wx.startCompass`
{
  wx.startCompass()
}

// Test case from `wx.startHCE`
{
  wx.startHCE({
    aid_list: ['F222222222'],
    success(res) {
      console.log(res.errMsg)
    },
  })
}

// Test case from `wx.startPullDownRefresh`
{
  wx.startPullDownRefresh()
}

// Test case from `wx.startRecord`
{
  wx.startRecord({
    success(res) {
      res.tempFilePath
    },
  })
  setTimeout(function() {
    wx.stopRecord() // 结束录音
  }, 10000)
}

// Test case from `wx.startSoterAuthentication`
{
  wx.startSoterAuthentication({
    requestAuthModes: ['fingerPrint'],
    challenge: '123456',
    authContent: '请用指纹解锁',
    success() {},
  })
}

// Test case from `wx.startWifi`
{
  wx.startWifi({
    success(res) {
      console.log(res.errMsg)
    },
  })
}

// Test case from `wx.stopAccelerometer`
{
  wx.stopAccelerometer()
}

// Test case from `wx.stopBackgroundAudio`
{
  wx.stopBackgroundAudio()
}

// Test case from `wx.stopBluetoothDevicesDiscovery`
{
  wx.stopBluetoothDevicesDiscovery({
    success(res) {
      console.log(res)
    },
  })
}

// Test case from `wx.stopCompass`
{
  wx.stopCompass()
}

// Test case from `wx.stopHCE`
{
  wx.stopHCE({
    success(res) {
      console.log(res.errMsg)
    },
  })
}

// Test case from `wx.stopPullDownRefresh`
{
  Page({
    onPullDownRefresh() {
      wx.stopPullDownRefresh()
    },
  })
}

// Test case from `wx.stopRecord`
{
  wx.startRecord({
    success(res) {
      res.tempFilePath
    },
  })
  setTimeout(function() {
    wx.stopRecord() // 结束录音
  }, 10000)
}

// Test case from `wx.stopVoice`
{
  wx.startRecord({
    success(res) {
      const tempFilePath = res.tempFilePath
      wx.playVoice({
        filePath: tempFilePath,
      })

      setTimeout(() => {
        wx.stopVoice()
      }, 5000)
    },
  })
}

// Test case from `wx.stopWifi`
{
  wx.stopWifi({
    success(res) {
      console.log(res.errMsg)
    },
  })
}

// Test case from `wx.switchTab`
{
  wx.switchTab({
    url: '/index',
  })
}

// Test case from `wx.updateShareMenu`
{
  wx.updateShareMenu({
    withShareTicket: true,
    success() {},
  })
}

// Test case from `wx.updateShareMenu`
{
  // 转发私密消息
  wx.updateShareMenu({
    isPrivateMessage: true,
    activityId: 'xxx',
    templateInfo: {
      parameterList: [{
        name: '',
        value: '',
      }]
    },
    success() {},
    fail() {},
  })
}

// Test case from `wx.uploadFile`
{
  wx.chooseImage({
    success(res) {
      const tempFilePaths = res.tempFilePaths
      wx.uploadFile({
        url: 'https://example.weixin.qq.com/upload', // 仅为示例，非真实的接口地址
        filePath: tempFilePaths[0],
        name: 'file',
        formData: {
          user: 'test',
        },
        success(res) {
          res.data
          // do something
        },
      })
    },
  })
}

// Test case from `wx.writeBLECharacteristicValue`
{
  // 向蓝牙设备发送一个0x00的16进制数据
  const buffer = new ArrayBuffer(1)
  const dataView = new DataView(buffer)
  dataView.setUint8(0, 0)

  wx.writeBLECharacteristicValue({
    // 这里的 deviceId 需要在 getBluetoothDevices 或 onBluetoothDeviceFound 接口中获取
    deviceId: '',
    // 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
    serviceId: '',
    // 这里的 characteristicId 需要在 getBLEDeviceCharacteristics 接口中获取
    characteristicId: '',
    // 这里的value是ArrayBuffer类型
    value: buffer,
    success(res) {
      console.log('writeBLECharacteristicValue success', res.errMsg)
    },
  })
}

// Test case from `Worker.postMessage`
{
  const worker = wx.createWorker('workers/request/index.js')

  worker.postMessage({
    msg: 'hello from main',
  })
}

// Test case from `wx.createWorker`
{
  // 创建普通worker
  wx.createWorker('workers/index.js')
}

// Test case from `wx.createWorker`
{
  // 创建实验worker
  const worker = wx.createWorker('workers/index.js', {
    useExperimentalWorker: true,
  })

  // 监听worker被系统回收事件
  worker.onProcessKilled(() => {
    // 重新创建一个worker
    wx.createWorker('workers/index.js', {
      useExperimentalWorker: true,
    })
  })
}

// Test case from `wx.clearStorageSync`
{
  try {
    wx.clearStorageSync()
  } catch (e) {
    // Do something when catch error
  }
}

// Test case from `wx.clearStorage`
{
  try {
    wx.clearStorageSync()
  } catch (e) {
    // Do something when catch error
  }
}

// Test case from `wx.getStorageInfoSync`
{
  try {
    const res = wx.getStorageInfoSync()
    expectType<string[]>(res.keys)
    expectType<number>(res.currentSize)
    expectType<number>(res.limitSize)
  } catch (e) {
    // Do something when catch error
  }
}

// Test case from `wx.getStorageInfo`
{
  try {
    const res = wx.getStorageInfoSync()
    expectType<string[]>(res.keys)
    expectType<number>(res.currentSize)
    expectType<number>(res.limitSize)
  } catch (e) {
    // Do something when catch error
  }
}

// Test case from `wx.getStorageSync`
{
  try {
    const value = wx.getStorageSync('key')
    if (value) {
      // Do something with return value
    }
  } catch (e) {
    // Do something when catch error
  }
}

// Test case from `wx.getStorage`
{
  try {
    const value = wx.getStorageSync('key')
    if (value) {
      // Do something with return value
    }
  } catch (e) {
    // Do something when catch error
  }
}

// Test case from `wx.getSystemInfoSync`
{
  try {
    const res = wx.getSystemInfoSync()
    expectType<string>(res.model)
    expectType<number>(res.pixelRatio)
    expectType<number>(res.windowWidth)
    expectType<number>(res.windowHeight)
    expectType<string>(res.language)
    expectType<string>(res.version)
    expectType<TPlatform>(res.platform)
  } catch (e) {
    // Do something when catch error
  }
}

// Test case from `wx.getSystemInfo`
{
  try {
    const res = wx.getSystemInfoSync()
    expectType<string>(res.model)
    expectType<number>(res.pixelRatio)
    expectType<number>(res.windowWidth)
    expectType<number>(res.windowHeight)
    expectType<string>(res.language)
    expectType<string>(res.version)
    expectType<TPlatform>(res.platform)
  } catch (e) {
    // Do something when catch error
  }
}

// Test case from `wx.removeStorageSync`
{
  try {
    wx.removeStorageSync('key')
  } catch (e) {
    // Do something when catch error
  }
}

// Test case from `wx.removeStorage`
{
  try {
    wx.removeStorageSync('key')
  } catch (e) {
    // Do something when catch error
  }
}

// Test case from `wx.setStorageSync`
{
  try {
    wx.setStorageSync('key', 'value')
  } catch (e) {}
}

// Test case from `wx.setStorage`
{
  try {
    wx.setStorageSync('key', 'value')
  } catch (e) {}
}

// Test case from `CanvasContext.draw`
{
  const ctx = wx.createCanvasContext('myCanvas')

  ctx.setFillStyle('red')
  ctx.fillRect(10, 10, 150, 100)
  ctx.draw()
  ctx.fillRect(50, 50, 150, 100)
  ctx.draw(true)
}

// Test case from `CanvasContext.createLinearGradient`
{
  const ctx = wx.createCanvasContext('myCanvas')

  // Create linear gradient
  const grd = ctx.createLinearGradient(0, 0, 200, 0)
  grd.addColorStop(0, 'red')
  grd.addColorStop(1, 'white')

  // Fill with gradient
  ctx.setFillStyle(grd)
  ctx.fillRect(10, 10, 150, 80)
  ctx.draw()
}

// Test case from `CanvasContext.createCircularGradient`
{
  const ctx = wx.createCanvasContext('myCanvas')

  // Create circular gradient
  const grd = ctx.createCircularGradient(75, 50, 50)
  grd.addColorStop(0, 'red')
  grd.addColorStop(1, 'white')

  // Fill with gradient
  ctx.setFillStyle(grd)
  ctx.fillRect(10, 10, 150, 80)
  ctx.draw()
}

// Test case from `CanvasContext.save`
{
  const ctx = wx.createCanvasContext('myCanvas')

  // save the default fill style
  ctx.save()
  ctx.setFillStyle('red')
  ctx.fillRect(10, 10, 150, 100)

  // restore to the previous saved state
  ctx.restore()
  ctx.fillRect(50, 50, 150, 100)

  ctx.draw()
}

// Test case from `CanvasContext.restore`
{
  const ctx = wx.createCanvasContext('myCanvas')

  // save the default fill style
  ctx.save()
  ctx.setFillStyle('red')
  ctx.fillRect(10, 10, 150, 100)

  // restore to the previous saved state
  ctx.restore()
  ctx.fillRect(50, 50, 150, 100)

  ctx.draw()
}

// Test case from `CanvasContext.beginPath`
{
  const ctx = wx.createCanvasContext('myCanvas')
  // begin path
  ctx.rect(10, 10, 100, 30)
  ctx.setFillStyle('yellow')
  ctx.fill()

  // begin another path
  ctx.beginPath()
  ctx.rect(10, 40, 100, 30)

  // only fill this rect, not in current path
  ctx.setFillStyle('blue')
  ctx.fillRect(10, 70, 100, 30)

  ctx.rect(10, 100, 100, 30)

  // it will fill current path
  ctx.setFillStyle('red')
  ctx.fill()
  ctx.draw()
}

// Test case from `CanvasContext.moveTo`
{
  const ctx = wx.createCanvasContext('myCanvas')
  ctx.moveTo(10, 10)
  ctx.lineTo(100, 10)

  ctx.moveTo(10, 50)
  ctx.lineTo(100, 50)
  ctx.stroke()
  ctx.draw()
}

// Test case from `CanvasContext.lineTo`
{
  const ctx = wx.createCanvasContext('myCanvas')
  ctx.moveTo(10, 10)
  ctx.rect(10, 10, 100, 50)
  ctx.lineTo(110, 60)
  ctx.stroke()
  ctx.draw()
}

// Test case from `CanvasContext.quadraticCurveTo`
{
  const ctx = wx.createCanvasContext('myCanvas')

  // Draw points
  ctx.beginPath()
  ctx.arc(20, 20, 2, 0, 2 * Math.PI)
  ctx.setFillStyle('red')
  ctx.fill()

  ctx.beginPath()
  ctx.arc(200, 20, 2, 0, 2 * Math.PI)
  ctx.setFillStyle('lightgreen')
  ctx.fill()

  ctx.beginPath()
  ctx.arc(20, 100, 2, 0, 2 * Math.PI)
  ctx.setFillStyle('blue')
  ctx.fill()

  ctx.setFillStyle('black')
  ctx.setFontSize(12)

  // Draw guides
  ctx.beginPath()
  ctx.moveTo(20, 20)
  ctx.lineTo(20, 100)
  ctx.lineTo(200, 20)
  ctx.setStrokeStyle('#AAAAAA')
  ctx.stroke()

  // Draw quadratic curve
  ctx.beginPath()
  ctx.moveTo(20, 20)
  ctx.quadraticCurveTo(20, 100, 200, 20)
  ctx.setStrokeStyle('black')
  ctx.stroke()

  ctx.draw()
}

// Test case from `CanvasContext.bezierCurveTo`
{
  const ctx = wx.createCanvasContext('myCanvas')

  // Draw points
  ctx.beginPath()
  ctx.arc(20, 20, 2, 0, 2 * Math.PI)
  ctx.setFillStyle('red')
  ctx.fill()

  ctx.beginPath()
  ctx.arc(200, 20, 2, 0, 2 * Math.PI)
  ctx.setFillStyle('lightgreen')
  ctx.fill()

  ctx.beginPath()
  ctx.arc(20, 100, 2, 0, 2 * Math.PI)
  ctx.arc(200, 100, 2, 0, 2 * Math.PI)
  ctx.setFillStyle('blue')
  ctx.fill()

  ctx.setFillStyle('black')
  ctx.setFontSize(12)

  // Draw guides
  ctx.beginPath()
  ctx.moveTo(20, 20)
  ctx.lineTo(20, 100)
  ctx.lineTo(150, 75)

  ctx.moveTo(200, 20)
  ctx.lineTo(200, 100)
  ctx.lineTo(70, 75)
  ctx.setStrokeStyle('#AAAAAA')
  ctx.stroke()

  // Draw quadratic curve
  ctx.beginPath()
  ctx.moveTo(20, 20)
  ctx.bezierCurveTo(20, 100, 200, 100, 200, 20)
  ctx.setStrokeStyle('black')
  ctx.stroke()

  ctx.draw()
}

// Test case from `CanvasContext.arc`
{
  const ctx = wx.createCanvasContext('myCanvas')

  // Draw coordinates
  ctx.arc(100, 75, 50, 0, 2 * Math.PI)
  ctx.setFillStyle('#EEEEEE')
  ctx.fill()

  ctx.beginPath()
  ctx.moveTo(40, 75)
  ctx.lineTo(160, 75)
  ctx.moveTo(100, 15)
  ctx.lineTo(100, 135)
  ctx.setStrokeStyle('#AAAAAA')
  ctx.stroke()

  ctx.setFontSize(12)
  ctx.setFillStyle('black')
  ctx.fillText('0', 165, 78)
  ctx.fillText('0.5*PI', 83, 145)
  ctx.fillText('1*PI', 15, 78)
  ctx.fillText('1.5*PI', 83, 10)

  // Draw points
  ctx.beginPath()
  ctx.arc(100, 75, 2, 0, 2 * Math.PI)
  ctx.setFillStyle('lightgreen')
  ctx.fill()

  ctx.beginPath()
  ctx.arc(100, 25, 2, 0, 2 * Math.PI)
  ctx.setFillStyle('blue')
  ctx.fill()

  ctx.beginPath()
  ctx.arc(150, 75, 2, 0, 2 * Math.PI)
  ctx.setFillStyle('red')
  ctx.fill()

  // Draw arc
  ctx.beginPath()
  ctx.arc(100, 75, 50, 0, 1.5 * Math.PI)
  ctx.setStrokeStyle('#333333')
  ctx.stroke()

  ctx.draw()
}

// Test case from `CanvasContext.rect`
{
  const ctx = wx.createCanvasContext('myCanvas')
  ctx.rect(10, 10, 150, 75)
  ctx.setFillStyle('red')
  ctx.fill()
  ctx.draw()
}

// Test case from `CanvasContext.clip`
{
  const ctx = wx.createCanvasContext('myCanvas')

  wx.downloadFile({
    url:
      'http://is5.mzstatic.com/image/thumb/Purple128/v4/75/3b/90/753b907c-b7fb-5877-215a-759bd73691a4/source/50x50bb.jpg',
    success(res) {
      ctx.save()
      ctx.beginPath()
      ctx.arc(50, 50, 25, 0, 2 * Math.PI)
      ctx.clip()
      ctx.drawImage(res.tempFilePath, 25, 25)
      ctx.restore()
      ctx.draw()
    },
  })
}

// Test case from `CanvasContext.fillRect`
{
  const ctx = wx.createCanvasContext('myCanvas')
  ctx.setFillStyle('red')
  ctx.fillRect(10, 10, 150, 75)
  ctx.draw()
}

// Test case from `CanvasContext.strokeRect`
{
  const ctx = wx.createCanvasContext('myCanvas')
  ctx.setStrokeStyle('red')
  ctx.strokeRect(10, 10, 150, 75)
  ctx.draw()
}

// Test case from `CanvasContext.clearRect`
{
  const ctx = wx.createCanvasContext('myCanvas')
  ctx.setFillStyle('red')
  ctx.fillRect(0, 0, 150, 200)
  ctx.setFillStyle('blue')
  ctx.fillRect(150, 0, 150, 200)
  ctx.clearRect(10, 10, 150, 75)
  ctx.draw()
}

// Test case from `CanvasContext.fill`
{
  const ctx = wx.createCanvasContext('myCanvas')
  ctx.moveTo(10, 10)
  ctx.lineTo(100, 10)
  ctx.lineTo(100, 100)
  ctx.fill()
  ctx.draw()
}

// Test case from `CanvasContext.fill`
{
  const ctx = wx.createCanvasContext('myCanvas')
  // begin path
  ctx.rect(10, 10, 100, 30)
  ctx.setFillStyle('yellow')
  ctx.fill()

  // begin another path
  ctx.beginPath()
  ctx.rect(10, 40, 100, 30)

  // only fill this rect, not in current path
  ctx.setFillStyle('blue')
  ctx.fillRect(10, 70, 100, 30)

  ctx.rect(10, 100, 100, 30)

  // it will fill current path
  ctx.setFillStyle('red')
  ctx.fill()
  ctx.draw()
}

// Test case from `CanvasContext.stroke`
{
  const ctx = wx.createCanvasContext('myCanvas')
  ctx.moveTo(10, 10)
  ctx.lineTo(100, 10)
  ctx.lineTo(100, 100)
  ctx.stroke()
  ctx.draw()
}

// Test case from `CanvasContext.stroke`
{
  const ctx = wx.createCanvasContext('myCanvas')
  // begin path
  ctx.rect(10, 10, 100, 30)
  ctx.setStrokeStyle('yellow')
  ctx.stroke()

  // begin another path
  ctx.beginPath()
  ctx.rect(10, 40, 100, 30)

  // only stoke this rect, not in current path
  ctx.setStrokeStyle('blue')
  ctx.strokeRect(10, 70, 100, 30)

  ctx.rect(10, 100, 100, 30)

  // it will stroke current path
  ctx.setStrokeStyle('red')
  ctx.stroke()
  ctx.draw()
}

// Test case from `CanvasContext.closePath`
{
  const ctx = wx.createCanvasContext('myCanvas')
  ctx.moveTo(10, 10)
  ctx.lineTo(100, 10)
  ctx.lineTo(100, 100)
  ctx.closePath()
  ctx.stroke()
  ctx.draw()
}

// Test case from `CanvasContext.closePath`
{
  const ctx = wx.createCanvasContext('myCanvas')
  // begin path
  ctx.rect(10, 10, 100, 30)
  ctx.closePath()

  // begin another path
  ctx.beginPath()
  ctx.rect(10, 40, 100, 30)

  // only fill this rect, not in current path
  ctx.setFillStyle('blue')
  ctx.fillRect(10, 70, 100, 30)

  ctx.rect(10, 100, 100, 30)

  // it will fill current path
  ctx.setFillStyle('red')
  ctx.fill()
  ctx.draw()
}

// Test case from `CanvasContext.scale`
{
  const ctx = wx.createCanvasContext('myCanvas')

  ctx.strokeRect(10, 10, 25, 15)
  ctx.scale(2, 2)
  ctx.strokeRect(10, 10, 25, 15)
  ctx.scale(2, 2)
  ctx.strokeRect(10, 10, 25, 15)

  ctx.draw()
}

// Test case from `CanvasContext.rotate`
{
  const ctx = wx.createCanvasContext('myCanvas')

  ctx.strokeRect(100, 10, 150, 100)
  ctx.rotate((20 * Math.PI) / 180)
  ctx.strokeRect(100, 10, 150, 100)
  ctx.rotate((20 * Math.PI) / 180)
  ctx.strokeRect(100, 10, 150, 100)

  ctx.draw()
}

// Test case from `CanvasContext.translate`
{
  const ctx = wx.createCanvasContext('myCanvas')

  ctx.strokeRect(10, 10, 150, 100)
  ctx.translate(20, 20)
  ctx.strokeRect(10, 10, 150, 100)
  ctx.translate(20, 20)
  ctx.strokeRect(10, 10, 150, 100)

  ctx.draw()
}

// Test case from `CanvasContext.drawImage`
{
  const ctx = wx.createCanvasContext('myCanvas')

  wx.chooseImage({
    success(res) {
      ctx.drawImage(res.tempFilePaths[0], 0, 0, 150, 100)
      ctx.draw()
    },
  })
}

// Test case from `CanvasContext.setShadow`
{
  const ctx = wx.createCanvasContext('myCanvas')
  ctx.setFillStyle('red')
  ctx.setShadow(10, 50, 50, 'blue')
  ctx.fillRect(10, 10, 150, 75)
  ctx.draw()
}

// Test case from `CanvasContext.setGlobalAlpha`
{
  const ctx = wx.createCanvasContext('myCanvas')

  ctx.setFillStyle('red')
  ctx.fillRect(10, 10, 150, 100)
  ctx.setGlobalAlpha(0.2)
  ctx.setFillStyle('blue')
  ctx.fillRect(50, 50, 150, 100)
  ctx.setFillStyle('yellow')
  ctx.fillRect(100, 100, 150, 100)

  ctx.draw()
}

// Test case from `CanvasContext.setLineWidth`
{
  const ctx = wx.createCanvasContext('myCanvas')
  ctx.beginPath()
  ctx.moveTo(10, 10)
  ctx.lineTo(150, 10)
  ctx.stroke()

  ctx.beginPath()
  ctx.setLineWidth(5)
  ctx.moveTo(10, 30)
  ctx.lineTo(150, 30)
  ctx.stroke()

  ctx.beginPath()
  ctx.setLineWidth(10)
  ctx.moveTo(10, 50)
  ctx.lineTo(150, 50)
  ctx.stroke()

  ctx.beginPath()
  ctx.setLineWidth(15)
  ctx.moveTo(10, 70)
  ctx.lineTo(150, 70)
  ctx.stroke()

  ctx.draw()
}

// Test case from `CanvasContext.setLineJoin`
{
  const ctx = wx.createCanvasContext('myCanvas')
  ctx.beginPath()
  ctx.moveTo(10, 10)
  ctx.lineTo(100, 50)
  ctx.lineTo(10, 90)
  ctx.stroke()

  ctx.beginPath()
  ctx.setLineJoin('bevel')
  ctx.setLineWidth(10)
  ctx.moveTo(50, 10)
  ctx.lineTo(140, 50)
  ctx.lineTo(50, 90)
  ctx.stroke()

  ctx.beginPath()
  ctx.setLineJoin('round')
  ctx.setLineWidth(10)
  ctx.moveTo(90, 10)
  ctx.lineTo(180, 50)
  ctx.lineTo(90, 90)
  ctx.stroke()

  ctx.beginPath()
  ctx.setLineJoin('miter')
  ctx.setLineWidth(10)
  ctx.moveTo(130, 10)
  ctx.lineTo(220, 50)
  ctx.lineTo(130, 90)
  ctx.stroke()

  ctx.draw()
}

// Test case from `CanvasContext.setLineCap`
{
  const ctx = wx.createCanvasContext('myCanvas')
  ctx.beginPath()
  ctx.moveTo(10, 10)
  ctx.lineTo(150, 10)
  ctx.stroke()

  ctx.beginPath()
  ctx.setLineCap('butt')
  ctx.setLineWidth(10)
  ctx.moveTo(10, 30)
  ctx.lineTo(150, 30)
  ctx.stroke()

  ctx.beginPath()
  ctx.setLineCap('round')
  ctx.setLineWidth(10)
  ctx.moveTo(10, 50)
  ctx.lineTo(150, 50)
  ctx.stroke()

  ctx.beginPath()
  ctx.setLineCap('square')
  ctx.setLineWidth(10)
  ctx.moveTo(10, 70)
  ctx.lineTo(150, 70)
  ctx.stroke()

  ctx.draw()
}

// Test case from `CanvasContext.setLineDash`
{
  const ctx = wx.createCanvasContext('myCanvas')

  ctx.setLineDash([10, 20], 5)

  ctx.beginPath()
  ctx.moveTo(0, 100)
  ctx.lineTo(400, 100)
  ctx.stroke()

  ctx.draw()
}

// Test case from `CanvasContext.setMiterLimit`
{
  const ctx = wx.createCanvasContext('myCanvas')
  ctx.beginPath()
  ctx.setLineWidth(10)
  ctx.setLineJoin('miter')
  ctx.setMiterLimit(1)
  ctx.moveTo(10, 10)
  ctx.lineTo(100, 50)
  ctx.lineTo(10, 90)
  ctx.stroke()

  ctx.beginPath()
  ctx.setLineWidth(10)
  ctx.setLineJoin('miter')
  ctx.setMiterLimit(2)
  ctx.moveTo(50, 10)
  ctx.lineTo(140, 50)
  ctx.lineTo(50, 90)
  ctx.stroke()

  ctx.beginPath()
  ctx.setLineWidth(10)
  ctx.setLineJoin('miter')
  ctx.setMiterLimit(3)
  ctx.moveTo(90, 10)
  ctx.lineTo(180, 50)
  ctx.lineTo(90, 90)
  ctx.stroke()

  ctx.beginPath()
  ctx.setLineWidth(10)
  ctx.setLineJoin('miter')
  ctx.setMiterLimit(4)
  ctx.moveTo(130, 10)
  ctx.lineTo(220, 50)
  ctx.lineTo(130, 90)
  ctx.stroke()

  ctx.draw()
}

// Test case from `CanvasContext.fillText`
{
  const ctx = wx.createCanvasContext('myCanvas')

  ctx.setFontSize(20)
  ctx.fillText('Hello', 20, 20)
  ctx.fillText('MINA', 100, 100)

  ctx.draw()
}

// Test case from `CanvasContext.setFontSize`
{
  const ctx = wx.createCanvasContext('myCanvas')

  ctx.setFontSize(20)
  ctx.fillText('20', 20, 20)
  ctx.setFontSize(30)
  ctx.fillText('30', 40, 40)
  ctx.setFontSize(40)
  ctx.fillText('40', 60, 60)
  ctx.setFontSize(50)
  ctx.fillText('50', 90, 90)

  ctx.draw()
}

// Test case from `CanvasContext.setTextAlign`
{
  const ctx = wx.createCanvasContext('myCanvas')

  ctx.setStrokeStyle('red')
  ctx.moveTo(150, 20)
  ctx.lineTo(150, 170)
  ctx.stroke()

  ctx.setFontSize(15)
  ctx.setTextAlign('left')
  ctx.fillText('textAlign=left', 150, 60)

  ctx.setTextAlign('center')
  ctx.fillText('textAlign=center', 150, 80)

  ctx.setTextAlign('right')
  ctx.fillText('textAlign=right', 150, 100)

  ctx.draw()
}

// Test case from `CanvasContext.setTextBaseline`
{
  const ctx = wx.createCanvasContext('myCanvas')

  ctx.setStrokeStyle('red')
  ctx.moveTo(5, 75)
  ctx.lineTo(295, 75)
  ctx.stroke()

  ctx.setFontSize(20)

  ctx.setTextBaseline('top')
  ctx.fillText('top', 5, 75)

  ctx.setTextBaseline('middle')
  ctx.fillText('middle', 50, 75)

  ctx.setTextBaseline('bottom')
  ctx.fillText('bottom', 120, 75)

  ctx.setTextBaseline('normal')
  ctx.fillText('normal', 200, 75)

  ctx.draw()
}

// Test case from `CanvasContext.setFillStyle`
{
  const ctx = wx.createCanvasContext('myCanvas')
  ctx.setFillStyle('red')
  ctx.fillRect(10, 10, 150, 75)
  ctx.draw()
}

// Test case from `CanvasContext.setStrokeStyle`
{
  const ctx = wx.createCanvasContext('myCanvas')
  ctx.setStrokeStyle('red')
  ctx.strokeRect(10, 10, 150, 75)
  ctx.draw()
}

// Test case from `wx.getExtConfig`
{
  if (wx.getExtConfig) {
    wx.getExtConfig({
      success(res) {
        console.log(res.extConfig)
      },
    })
  }
}

// Test case from `wx.getExtConfigSync`
{
  const extConfig = wx.getExtConfigSync ? wx.getExtConfigSync() : {}
  console.log(extConfig)
}

// Test case from `wx.chooseMessageFile`
{
  wx.chooseMessageFile({
    count: 10,
    type: 'image',
    success(res) {
      // tempFilePath可以作为img标签的src属性显示图片
      res.tempFiles.forEach(tempFile => {
        expectType<string>(tempFile.name)
        expectType<string>(tempFile.path)
        expectType<number>(tempFile.size)
        expectType<number>(tempFile.time)
      })
    },
  })
}

// Test case from `wx.chooseImage`
{
  wx.chooseImage({
    count: 1,
    sizeType: ['original', 'compressed'],
    sourceType: ['album', 'camera'],
    success(res) {
      // tempFilePath可以作为img标签的src属性显示图片
      expectType<string[]>(res.tempFilePaths)
    },
  })
}

// Test case from `wx.getUserInfo`
{
  Page({
    data: {
      canIUse: wx.canIUse('button.open-type.getUserInfo'),
    },
    onLoad() {
      // 查看是否授权
      wx.getSetting({
        success(res) {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            wx.getUserInfo({
              success(res) {
                console.log(res.userInfo)
              },
            })
          }
        },
      })
    },
    bindGetUserInfo(e: any) {
      console.log(e.detail.userInfo)
    },
  })
}

// Test case from `IntersectionObserver.relativeToViewport`
{
  Page({
    onLoad() {
      wx.createIntersectionObserver(this)
        .relativeToViewport({ bottom: 100 })
        .observe('.target-class', res => {
          res.intersectionRatio // 相交区域占目标节点的布局区域的比例
          res.intersectionRect // 相交区域
          res.intersectionRect.left // 相交区域的左边界坐标
          res.intersectionRect.top // 相交区域的上边界坐标
          res.intersectionRect.width // 相交区域的宽度
          res.intersectionRect.height // 相交区域的高度
        })
    },
  })
}

// Test case from `EditorContext.insertImage`
{
  wx.createSelectorQuery()
    .select('#editor')
    .context(res => {
      const editorCtx = res.context as WechatMiniprogram.EditorContext
      editorCtx.insertImage({
        src: 'xx',
        width: '100px',
        height: '50px',
        extClass: 'className',
      })
    })
}

// Test case from `MapContext`
{
  // map.js
  Page({
    mapCtx: {} as WechatMiniprogram.MapContext,
    onReady() {
      // 使用 wx.createMapContext 获取 map 上下文
      this.mapCtx = wx.createMapContext('myMap')
    },
    getCenterLocation() {
      this.mapCtx.getCenterLocation({
        success(res) {
          expectType<number>(res.longitude)
          expectType<number>(res.latitude)
        },
      })
    },
    moveToLocation() {
      this.mapCtx.moveToLocation({
        latitude: 0,
        longitude: 0,
      })
    },
    translateMarker() {
      this.mapCtx.translateMarker({
        rotate: 0,
        markerId: 0,
        autoRotate: true,
        duration: 1000,
        destination: {
          latitude: 23.10229,
          longitude: 113.3345211,
        },
        animationEnd() {
          console.log('animation end')
        },
      })
    },
    includePoints() {
      this.mapCtx.includePoints({
        padding: [10],
        points: [
          {
            latitude: 23.10229,
            longitude: 113.3345211,
          },
          {
            latitude: 23.00229,
            longitude: 113.3345211,
          },
        ],
      })
    },
  })
}

// Test case from `MapContext.on`
{
  Page({
    mapCtx: {} as WechatMiniprogram.MapContext,
    onReady() {
      // 使用 wx.createMapContext 获取 map 上下文
      this.mapCtx = wx.createMapContext('myMap')
    },
    method() {
      this.mapCtx.on('markerClusterCreate', (res) => {
        expectType<any>(res)
      })
      this.mapCtx.on('markerClusterClick', (res) => {
        expectType<any>(res)
      })
    }
  })
}

// Test case from `wx.setEnableDebug`
{
  // 打开调试
  wx.setEnableDebug({
    enableDebug: true,
  })

  // 关闭调试
  wx.setEnableDebug({
    enableDebug: false,
  })
}

// Test case from `wx.navigateTo`
{
  // test.js
  Page({
    onLoad(option) {
      console.log(option.query)
      const eventChannel = this.getOpenerEventChannel()
      eventChannel.emit('acceptDataFromOpenedPage', { data: 'test' })
      eventChannel.emit('someEvent', { data: 'test' })
      // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
      eventChannel.on('acceptDataFromOpenerPage', function(data: any) {
        console.log(data)
      })
    },
  })
}

// Test case from `wx.requestSubscribeMessage`
{
  wx.requestSubscribeMessage({
    tmplIds: [''],
    success(res) {
      expectType<string>(res.TEMPLATE_ID)
    },
  })
}

// Test case from `wx.chooseMedia`
{
  wx.chooseMedia({
    count: 9,
    mediaType: ['image', 'video'],
    sourceType: ['album', 'camera'],
    maxDuration: 30,
    camera: 'back',
    success(res) {
      expectType<string>(res.tempFiles[0].tempFilePath)
      expectType<string>(res.tempFiles[0].thumbTempFilePath)
      expectType<number>(res.tempFiles[0].width)
      expectType<number>(res.tempFiles[0].height)
      expectType<number>(res.tempFiles[0].size)
      expectType<number>(res.tempFiles[0].duration)
    },
  })
}

// Test case from `wx.reportPerformance`
{
  wx.reportPerformance(1101, 680)
  wx.reportPerformance(1101, 680, 'custom')
}

// Test case from `wx.getRandomValues`
{
  wx.getRandomValues({
    length: 6, // 生成 6 个字节长度的随机数
    success: res => {
      expectType<ArrayBuffer>(res.randomValues) // 转换为 base64 字符串后打印
    }
  })
}

// Test case from `wx.getGroupEnterInfo`
{
  wx.getGroupEnterInfo({
    success(res) {
      expectType<string>(res.errMsg)
      expectType<string>(res.encryptedData)
      expectType<string>(res.iv)
    }
  })
}

// Test case from `wx.getPerformance`
{
  const performance = wx.getPerformance()
  const observer = performance.createObserver(entryList => {
    console.log(entryList.getEntries())
  })
  // FIXME
  // @ts-ignore
  observer.observe({ entryTypes: ['render', 'script', 'navigation'] })
}

// Test case from `wx.authPrivateMessage`
{
  wx.authPrivateMessage({
    shareTicket: 'xxxxxx',
    success(res) {
      expectType<boolean>(res.valid)
      expectType<string>(res.iv)
      expectType<string>(res.encryptedData)
    },
    fail(res) {
      expectType<string>(res.errMsg)
    },
  })
}

// Test case from `wx.createMediaAudioPlayer`
{
  // 创建视频解码器，具体参数见 createVideoDecoder 文档
  const videoDecoder = wx.createVideoDecoder()
  // 创建媒体音频播放器
  const mediaAudioPlayer = wx.createMediaAudioPlayer()
  // 启动视频解码器
  videoDecoder.start({
    source: ''
  })
  // 启动播放器
  mediaAudioPlayer.start().then(() => {
    // 添加播放器音频来源
    mediaAudioPlayer.addAudioSource(videoDecoder).then(res => {
      videoDecoder.getFrameData() // 建议在 requestAnimationFrame 里获取每一帧视频数据
      console.log(res)
    })

    // 移除播放器音频来源
    mediaAudioPlayer.removeAudioSource(videoDecoder).then()
    // 停止播放器
    mediaAudioPlayer.stop().then()
    // 销毁播放器
    mediaAudioPlayer.destroy().then()
    // 设置播放器音量
    mediaAudioPlayer.volume = 0.5
  })
}

// Test case from `ScrollViewContext`
{
  wx.createSelectorQuery()
    .select('#scrollview')
    .node()
    .exec(res => {
      const scrollView = res[0].node
      scrollView.scrollEnabled = false
    })
}

// Test case from `wx.getUserProfile`
{
  Page({
    data: {
      userInfo: {},
      hasUserInfo: false,
      canIUseGetUserProfile: false,
    },
    onLoad() {
      if (wx.getUserProfile !== undefined) {
        this.setData({
          canIUseGetUserProfile: true,
        })
      }
    },
    getUserProfile() {
      // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
      // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
      wx.getUserProfile({
        desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: res => {
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true,
          })
        },
      })
    },
    getUserInfo(e: WechatMiniprogram.CustomEvent<{ userInfo: WechatMiniprogram.UserInfo }>) {
      // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true,
      })
    },
  })
}

// Test case from `FileSystemManager.close`
{
  const fs = wx.getFileSystemManager()
  // 打开文件
  fs.open({
    filePath: `${wx.env.USER_DATA_PATH}/hello.txt`,
    flag: 'a+',
    success(res) {
      // 关闭文件
      fs.close({
        fd: res.fd,
      })
    },
  })
}

// Test case from `FileSystemManager.closeSync`
{
  const fs = wx.getFileSystemManager()
  const fd = fs.openSync({
    filePath: `${wx.env.USER_DATA_PATH}/hello.txt`,
    flag: 'a+',
  })

  // 关闭文件
  fs.closeSync({ fd: fd })
}

// Test case from `FileSystemManager.fstat`
{
  const fs = wx.getFileSystemManager()
  // 打开文件
  fs.open({
    filePath: `${wx.env.USER_DATA_PATH}/hello.txt`,
    flag: 'a+',
    success(res) {
      // 获取文件的状态信息
      fs.fstat({
        fd: res.fd,
        success(res) {
          expectType<WechatMiniprogram.Stats>(res.stats)
        },
      })
    },
  })
}

// Test case from `FileSystemManager.fstatSync`
{
  const fs = wx.getFileSystemManager()
  const fd = fs.openSync({
    filePath: `${wx.env.USER_DATA_PATH}/hello.txt`,
    flag: 'a+',
  })
  const stats = fs.fstatSync({ fd: fd })
  expectType<WechatMiniprogram.Stats>(stats)
}

// Test case from `FileSystemManager.ftruncate`
{
  const fs = wx.getFileSystemManager()
  // 打开文件
  fs.open({
    filePath: `${wx.env.USER_DATA_PATH}/hello.txt`,
    flag: 'a+',
    success(res) {
      // 对文件内容进行截断操作
      fs.ftruncate({
        fd: res.fd,
        length: 10, // 从第10个字节开始截断文件
        success(res) {
          console.log(res)
        },
      })
    },
  })
}

// Test case from `FileSystemManager.ftruncateSync`
{
  const fs = wx.getFileSystemManager()
  const fd = fs.openSync({
    filePath: `${wx.env.USER_DATA_PATH}/hello.txt`,
    flag: 'a+',
  })
  fs.ftruncateSync({
    fd: fd,
    length: 10, // 从第10个字节开始截断文件
  })
}

// Test case from `FileSystemManager.open`
{
  const fs = wx.getFileSystemManager()
  fs.open({
    filePath: `${wx.env.USER_DATA_PATH}/hello.txt`,
    flag: 'a+',
    success(res) {
      expectType<string>(res.fd)
    },
  })
}

// Test case from `FileSystemManager.openSync`
{
  const fs = wx.getFileSystemManager()
  const fd = fs.openSync({
    filePath: `${wx.env.USER_DATA_PATH}/hello.txt`,
    flag: 'a+',
  })
  expectType<string>(fd)
}

// Test case from `FileSystemManager.read`
{
  const fs = wx.getFileSystemManager()
  const ab = new ArrayBuffer(1024)
  // 打开文件
  fs.open({
    filePath: `${wx.env.USER_DATA_PATH}/hello.txt`,
    flag: 'a+',
    success(res) {
      // 读取文件到 ArrayBuffer 中
      fs.read({
        fd: res.fd,
        arrayBuffer: ab,
        length: 10,
        success(res) {
          console.log(res)
        },
      })
    },
  })
}

// Test case from `FileSystemManager.readSync`
{
  const fs = wx.getFileSystemManager()
  const ab = new ArrayBuffer(1024)
  const fd = fs.openSync({
    filePath: `${wx.env.USER_DATA_PATH}/hello.txt`,
    flag: 'a+',
  })
  const res = fs.readSync({
    fd: fd,
    arrayBuffer: ab,
    length: 10,
  })
  console.log(res)
}

// Test case from `FileSystemManager.truncate`
{
  const fs = wx.getFileSystemManager()
  fs.truncate({
    filePath: `${wx.env.USER_DATA_PATH}/hello.txt`,
    length: 10, // 从第10个字节开始截断
    success(res) {
      console.log(res)
    },
  })
}

// Test case from `FileSystemManager.truncateSync`
{
  const fs = wx.getFileSystemManager()
  fs.truncateSync({
    filePath: `${wx.env.USER_DATA_PATH}/hello.txt`,
    length: 10, // 从第10个字节开始截断
  })
}

// Test case from `FileSystemManager.write`
{
  const fs = wx.getFileSystemManager()
  // 打开文件
  fs.open({
    filePath: `${wx.env.USER_DATA_PATH}/hello.txt`,
    flag: 'a+',
    success(res) {
      // 写入文件
      fs.write({
        fd: res.fd,
        data: 'some text',
        success(res) {
          expectType<number>(res.bytesWritten)
        },
      })
    },
  })
}

// Test case from `FileSystemManager.writeSync`
{
  const fs = wx.getFileSystemManager()
  const fd = fs.openSync({
    filePath: `${wx.env.USER_DATA_PATH}/hello.txt`,
    flag: 'a+',
  })
  const res = fs.writeSync({
    fd: fd,
    data: 'some text',
  })
  expectType<number>(res.bytesWritten)
}

// Test case from `FileSystemManager.access`
{
  const fs = wx.getFileSystemManager()
  // 判断文件/目录是否存在
  fs.access({
    path: `${wx.env.USER_DATA_PATH}/hello.txt`,
    success(res) {
      // 文件存在
      console.log(res)
    },
    fail(res) {
      // 文件不存在或其他错误
      console.error(res)
    }
  })

  // 同步接口
  try {
    fs.accessSync(`${wx.env.USER_DATA_PATH}/hello.txt`)
  } catch(e) {
    console.error(e)
  }
}

// Test case from `FileSystemManager.accessSync`
{
  const fs = wx.getFileSystemManager()
  // 判断文件/目录是否存在
  fs.access({
    path: `${wx.env.USER_DATA_PATH}/hello.txt`,
    success(res) {
      // 文件存在
      console.log(res)
    },
    fail(res) {
      // 文件不存在或其他错误
      console.error(res)
    }
  })

  // 同步接口
  try {
    fs.accessSync(`${wx.env.USER_DATA_PATH}/hello.txt`)
  } catch(e) {
    console.error(e)
  }
}

// Test case from `FileSystemManager.appendFile`
{
  const fs = wx.getFileSystemManager()

  fs.appendFile({
    filePath: `${wx.env.USER_DATA_PATH}/hello.txt`,
    data: 'some text',
    encoding: 'utf8',
    success(res) {
      console.log(res)
    },
    fail(res) {
      console.error(res)
    }
  })

  // 同步接口
  try {
    fs.appendFileSync(`${wx.env.USER_DATA_PATH}/hello.txt`, 'some text', 'utf8')
  } catch(e) {
    console.error(e)
  }
}

// Test case from `FileSystemManager.appendFileSync`
{
  const fs = wx.getFileSystemManager()

  fs.appendFile({
    filePath: `${wx.env.USER_DATA_PATH}/hello.txt`,
    data: 'some text',
    encoding: 'utf8',
    success(res) {
      console.log(res)
    },
    fail(res) {
      console.error(res)
    }
  })

  // 同步接口
  try {
    fs.appendFileSync(`${wx.env.USER_DATA_PATH}/hello.txt`, 'some text', 'utf8')
  } catch(e) {
    console.error(e)
  }
}

// Test case from `FileSystemManager.copyFile`
{
  const fs = wx.getFileSystemManager()
  fs.copyFile({
    srcPath: `${wx.env.USER_DATA_PATH}/hello.txt`,
    destPath: `${wx.env.USER_DATA_PATH}/hello_copy.txt`,
    success(res) {
      console.log(res)
    },
    fail(res) {
      console.error(res)
    }
  })

  // 同步接口
  try {
    fs.copyFileSync(
      `${wx.env.USER_DATA_PATH}/hello.txt`,
      `${wx.env.USER_DATA_PATH}/hello_copy.txt`
    )
  } catch(e) {
    console.error(e)
  }
}

// Test case from `FileSystemManager.copyFileSync`
{
  const fs = wx.getFileSystemManager()
  fs.copyFile({
    srcPath: `${wx.env.USER_DATA_PATH}/hello.txt`,
    destPath: `${wx.env.USER_DATA_PATH}/hello_copy.txt`,
    success(res) {
      console.log(res)
    },
    fail(res) {
      console.error(res)
    }
  })

  // 同步接口
  try {
    fs.copyFileSync(
      `${wx.env.USER_DATA_PATH}/hello.txt`,
      `${wx.env.USER_DATA_PATH}/hello_copy.txt`
    )
  } catch(e) {
    console.error(e)
  }
}

// Test case from `FileSystemManager.mkdir`
{
  const fs = wx.getFileSystemManager()
  fs.mkdir({
    dirPath: `${wx.env.USER_DATA_PATH}/example`,
    recursive: false,
    success(res) {
      console.log(res)
    },
    fail(res) {
      console.error(res)
    }
  })

  // 同步接口
  try {
    fs.mkdirSync(`${wx.env.USER_DATA_PATH}/example`, false)
  } catch(e) {
    console.error(e)
  }
}

// Test case from `FileSystemManager.mkdirSync`
{
  const fs = wx.getFileSystemManager()
  fs.mkdir({
    dirPath: `${wx.env.USER_DATA_PATH}/example`,
    recursive: false,
    success(res) {
      console.log(res)
    },
    fail(res) {
      console.error(res)
    }
  })

  // 同步接口
  try {
    fs.mkdirSync(`${wx.env.USER_DATA_PATH}/example`, false)
  } catch(e) {
    console.error(e)
  }
}

// Test case from `FileSystemManager.readFile`
{
  const fs = wx.getFileSystemManager()
  fs.readFile({
    filePath: `${wx.env.USER_DATA_PATH}/hello.txt`,
    encoding: 'utf8',
    position: 0,
    success(res) {
      console.log(res.data)
    },
    fail(res) {
      console.error(res)
    }
  })

  // 同步接口
  try {
    const res = fs.readFileSync(`${wx.env.USER_DATA_PATH}/hello.txt`, 'utf8', 0)
    expectType<string | ArrayBuffer>(res)
  } catch(e) {
    console.error(e)
  }
}

// Test case from `FileSystemManager.readFileSync`
{
  const fs = wx.getFileSystemManager()
  fs.readFile({
    filePath: `${wx.env.USER_DATA_PATH}/hello.txt`,
    encoding: 'utf8',
    position: 0,
    success(res) {
      console.log(res.data)
    },
    fail(res) {
      console.error(res)
    }
  })

  // 同步接口
  try {
    const res = fs.readFileSync(`${wx.env.USER_DATA_PATH}/hello.txt`, 'utf8', 0)
    expectType<string | ArrayBuffer>(res)
  } catch(e) {
    console.error(e)
  }
}

// Test case from `FileSystemManager.readZipEntry`
{
  const fs = wx.getFileSystemManager()
  // 读取zip内某个或多个文件
  fs.readZipEntry({
    filePath: 'wxfile://from/to.zip',
    entries: [{
      path: 'some_folder/my_file.txt', // zip内文件路径
      encoding: 'utf-8', // 指定读取文件的字符编码，如果不传 encoding，则以 ArrayBuffer 格式读取文件的二进制内容
      position: 0, // 从文件指定位置开始读，如果不指定，则从文件头开始读。读取的范围应该是左闭右开区间 [position, position+length)。有效范围：[0, fileLength - 1]。单位：byte
      length: 10000, // 指定文件的长度，如果不指定，则读到文件末尾。有效范围：[1, fileLength]。单位：byte
    }, {
      path: 'other_folder/orther_file.txt', // zip内文件路径
    }],
    success(res) {
      console.log(res.entries)
      // res.entries === {
      //     'some_folder/my_file.txt': {
      //         errMsg: 'readZipEntry:ok',
      //         data: 'xxxxxx'
      //     },
      //     'other_folder/orther_file.txt': {
      //         data: (ArrayBuffer)
      //     }
      // }
    },
    fail(res) {
      console.log(res.errMsg)
    },
  })

  // 读取zip内所有文件。允许指定统一的encoding。position、length则不再允许指定，分别默认为0和文件长度
  fs.readZipEntry({
    filePath: 'wxfile://from/to.zip',
    entries: 'all',
    encoding: 'utf-8', // 统一指定读取文件的字符编码，如果不传 encoding，则以 ArrayBuffer 格式读取文件的二进制内容
    success(res) {
      console.log(res.entries)
      // res.entries === {
      //     'some_folder/my_file.txt': {
      //         errMsg: 'readZipEntry:ok',
      //         data: 'xxxxxx'
      //     },
      //     'other_folder/orther_file.txt': {
      //         errMsg: 'readZipEntry:ok',
      //         data: 'xxxxxx'
      //     }
      //  }
    },
    fail(res) {
      console.log(res.errMsg)
    },
  })
}

// Test case from `FileSystemManager.readdir`
{
  const fs = wx.getFileSystemManager()
  fs.readdir({
    dirPath: `${wx.env.USER_DATA_PATH}/example`,
    success(res) {
      console.log(res.files)
    },
    fail(res) {
      console.error(res)
    }
  })

  // 同步接口
  try {
    const res = fs.readdirSync(`${wx.env.USER_DATA_PATH}/example`)
    expectType<string[]>(res)
  } catch(e) {
    console.error(e)
  }
}

// Test case from `FileSystemManager.readdirSync`
{
  const fs = wx.getFileSystemManager()
  fs.readdir({
    dirPath: `${wx.env.USER_DATA_PATH}/example`,
    success(res) {
      console.log(res.files)
    },
    fail(res) {
      console.error(res)
    }
  })

  // 同步接口
  try {
    const res = fs.readdirSync(`${wx.env.USER_DATA_PATH}/example`)
    expectType<string[]>(res)
  } catch(e) {
    console.error(e)
  }
}

// Test case from `FileSystemManager.rename`
{
  const fs = wx.getFileSystemManager()
  fs.rename({
    oldPath: `${wx.env.USER_DATA_PATH}/hello.txt`,
    newPath: `${wx.env.USER_DATA_PATH}/hello_new.txt`,
    success(res) {
      console.log(res)
    },
    fail(res) {
      console.error(res)
    }
  })

  // 同步接口
  try {
    const res = fs.renameSync(
      `${wx.env.USER_DATA_PATH}/hello.txt`,
      `${wx.env.USER_DATA_PATH}/hello_new.txt`
    )
    console.log(res)
  } catch(e) {
    console.error(e)
  }
}

// Test case from `FileSystemManager.renameSync`
{
  const fs = wx.getFileSystemManager()
  fs.rename({
    oldPath: `${wx.env.USER_DATA_PATH}/hello.txt`,
    newPath: `${wx.env.USER_DATA_PATH}/hello_new.txt`,
    success(res) {
      console.log(res)
    },
    fail(res) {
      console.error(res)
    }
  })

  // 同步接口
  try {
    const res = fs.renameSync(
      `${wx.env.USER_DATA_PATH}/hello.txt`,
      `${wx.env.USER_DATA_PATH}/hello_new.txt`
    )
    console.log(res)
  } catch(e) {
    console.error(e)
  }
}

// Test case from `FileSystemManager.rmdir`
{
  const fs = wx.getFileSystemManager()
  fs.rmdir({
    dirPath: `${wx.env.USER_DATA_PATH}/example`,
    recursive: false,
    success(res) {
      console.log(res)
    },
    fail(res) {
      console.error(res)
    }
  })

  // 同步接口
  try {
    const res = fs.rmdirSync(`${wx.env.USER_DATA_PATH}/example`, false)
    console.log(res)
  } catch(e) {
    console.error(e)
  }
}

// Test case from `FileSystemManager.rmdirSync`
{
  const fs = wx.getFileSystemManager()
  fs.rmdir({
    dirPath: `${wx.env.USER_DATA_PATH}/example`,
    recursive: false,
    success(res) {
      console.log(res)
    },
    fail(res) {
      console.error(res)
    }
  })

  // 同步接口
  try {
    const res = fs.rmdirSync(`${wx.env.USER_DATA_PATH}/example`, false)
    console.log(res)
  } catch(e) {
    console.error(e)
  }
}

// Test case from `wx.saveFileToDisk`
{
  wx.saveFileToDisk({
    filePath: `${wx.env.USER_DATA_PATH}/hello.txt`,
    success(res) {
      console.log(res)
    },
    fail(res) {
      console.error(res)
    }
  })
}

// Test case from `FileSystemManager.unlink`
{
  const fs = wx.getFileSystemManager()
  fs.unlink({
    filePath: `${wx.env.USER_DATA_PATH}/hello.txt`,
    success(res) {
      console.log(res)
    },
    fail(res) {
      console.error(res)
    }
  })

  // 同步接口
  try {
    const res = fs.unlinkSync(`${wx.env.USER_DATA_PATH}/hello.txt`)
    console.log(res)
  } catch(e) {
    console.error(e)
  }
}

// Test case from `FileSystemManager.unlinkSync`
{
  const fs = wx.getFileSystemManager()
  fs.unlink({
    filePath: `${wx.env.USER_DATA_PATH}/hello.txt`,
    success(res) {
      console.log(res)
    },
    fail(res) {
      console.error(res)
    }
  })

  // 同步接口
  try {
    const res = fs.unlinkSync(`${wx.env.USER_DATA_PATH}/hello.txt`)
    console.log(res)
  } catch(e) {
    console.error(e)
  }
}

// Test case from `FileSystemManager.unzip`
{
  const fs = wx.getFileSystemManager()
  fs.unzip({
    zipFilePath: `${wx.env.USER_DATA_PATH}/example.zip`,
    targetPath: '${wx.env.USER_DATA_PATH}/example',
    success(res) {
      console.log(res)
    },
    fail(res) {
      console.error(res)
    }
  })
}

// Test case from `FileSystemManager.writeFile`
{
  const fs = wx.getFileSystemManager()
  fs.writeFile({
    filePath: `${wx.env.USER_DATA_PATH}/hello.txt`,
    data: 'some text or arrayBuffer',
    encoding: 'utf8',
    success(res) {
      console.log(res)
    },
    fail(res) {
      console.error(res)
    }
  })

  // 同步接口
  try {
    const res = fs.writeFileSync(
      `${wx.env.USER_DATA_PATH}/hello.txt`,
      'some text or arrayBuffer',
      'utf8'
    )
    console.log(res)
  } catch(e) {
    console.error(e)
  }
}

// Test case from `FileSystemManager.writeFileSync`
{
  const fs = wx.getFileSystemManager()
  fs.writeFile({
    filePath: `${wx.env.USER_DATA_PATH}/hello.txt`,
    data: 'some text or arrayBuffer',
    encoding: 'utf8',
    success(res) {
      console.log(res)
    },
    fail(res) {
      console.error(res)
    }
  })

  // 同步接口
  try {
    const res = fs.writeFileSync(
      `${wx.env.USER_DATA_PATH}/hello.txt`,
      'some text or arrayBuffer',
      'utf8'
    )
    console.log(res)
  } catch(e) {
    console.error(e)
  }
}

// Test case from `UserCryptoManager.getLatestUserKey`
{
  const userCryptoManager = wx.getUserCryptoManager()
  userCryptoManager.getLatestUserKey({
    success: res => {
      const {encryptKey, iv, version, expireTime} = res
      console.log(encryptKey, iv, version, expireTime)
    }
  })
}

// Test case from `UserCryptoManager.getRandomValues`
{
  wx.getRandomValues({
    length: 6, // 生成 6 个字节长度的随机数
    success: res => {
      console.log(wx.arrayBufferToBase64(res.randomValues)) // 转换为 base64 字符串后打印
    }
  })
}

// Test case from `wx.createVKSession`
{
  // 创建 session 对象
  const session = wx.createVKSession({
    track: {
      plane: { mode: 1 },
    },
  })
  expectType<WechatMiniprogram.VKSession>(session)

  // 逐帧分析
  const onFrame = () => {
    const canvasWidth = 0
    const canvasHeight = 0
    // 开发者可以自己控制帧率
    const frame = session.getVKFrame(canvasWidth, canvasHeight)
    if (frame) {
      // 分析完毕，可以拿到帧对象
      expectType<WechatMiniprogram.VKFrame>(frame)
    }

    session.requestAnimationFrame(onFrame)
  }
  session.start(err => {
    if (!err) session.requestAnimationFrame(onFrame)
  })
}

// Test case from `wx.createVKSession`
{
  const gl: WechatMiniprogram.WebGLRenderingContext = {}
  const canvasWidth = 300
  const canvasHeight = 300
  // 以下 demo 以 v2 为例
  // 创建 session 对象
  const session = wx.createVKSession({
    track: {
      plane: {mode: 3},
    },
    version: 'v2',
    gl,
  })
  // 逐帧分析
  const onFrame = (timestamp: number) => {
  // 开发者可以自己控制帧率
    const frame = session.getVKFrame(canvasWidth, canvasHeight)
    if (frame) {
      // 分析完毕，可以拿到帧对象
      doRender(frame)
    }

    expectType<number>(timestamp)

    session.requestAnimationFrame(onFrame)
  }
  session.start(err => {
    if (!err) session.requestAnimationFrame(onFrame)
  })

  // 渲染函数
  const doRender = (frame: WechatMiniprogram.VKFrame) => {
    expectType<WechatMiniprogram.VKFrame>(frame)
  }
}

// Test case from `wx.isVKSupport`
{
  const isSupportV2 = wx.isVKSupport('v2')
  expectType<boolean>(isSupportV2)
}

// Test case from `FileSystemManager.readCompressedFile`
{
  const fs = wx.getFileSystemManager()

  // 异步接口
  fs.readCompressedFile({
    filePath: '${wx.env.USER_DATA_PATH}/hello.br',
    compressionAlgorithm: 'br',
    success(res) {
      expectType<ArrayBuffer>(res.data)
    },
    fail(res) {
      console.log('readCompressedFile fail', res)
    },
  })

  // 同步接口
  const data = fs.readCompressedFileSync({
    filePath: '${wx.env.USER_DATA_PATH}/hello.br',
    compressionAlgorithm: 'br',
  })
  expectType<ArrayBuffer>(data)
}

// Test case from `FileSystemManager.readCompressedFileSync`
{
  const fs = wx.getFileSystemManager()

  // 异步接口
  fs.readCompressedFile({
    filePath: '${wx.env.USER_DATA_PATH}/hello.br',
    compressionAlgorithm: 'br',
    success(res) {
      expectType<ArrayBuffer>(res.data)
    },
    fail(res) {
      console.log('readCompressedFile fail', res)
    },
  })

  // 同步接口
  try {
    const data = fs.readCompressedFileSync({
      filePath: '${wx.env.USER_DATA_PATH}/hello.br',
      compressionAlgorithm: 'br',
    })
    expectType<ArrayBuffer>(data)
  } catch (err) {
    console.log(err)
  }
}

// Test case from `wx.getStorage`
{
  // 开启加密存储
  wx.setStorage({
    key: 'key',
    data: 'value',
    encrypt: true, // 若开启加密存储，setStorage 和 getStorage 需要同时声明 encrypt 的值为 true
    success() {
      wx.getStorage({
        key: 'key',
        encrypt: true, // 若开启加密存储，setStorage 和 getStorage 需要同时声明 encrypt 的值为 true
        success(res) {
          console.log(res.data)
        },
      })
    },
  })
}

// Test case from `wx.getStorageSync`
{
  // 开启加密存储
  wx.setStorage({
    key: 'key',
    data: 'value',
    encrypt: true, // 若开启加密存储，setStorage 和 getStorage 需要同时声明 encrypt 的值为 true
    success() {
      wx.getStorage({
        key: 'key',
        encrypt: true, // 若开启加密存储，setStorage 和 getStorage 需要同时声明 encrypt 的值为 true
        success(res) {
          console.log(res.data)
        },
      })
    },
  })
}

// Test case from `wx.setStorage`
{
  // 开启加密存储
  wx.setStorage({
    key: 'key',
    data: 'value',
    encrypt: true, // 若开启加密存储，setStorage 和 getStorage 需要同时声明 encrypt 的值为 true
    success() {
      wx.getStorage({
        key: 'key',
        encrypt: true, // 若开启加密存储，setStorage 和 getStorage 需要同时声明 encrypt 的值为 true
        success(res) {
          console.log(res.data)
        },
      })
    },
  })
}

// Test case from `wx.setStorageSync`
{
  // 开启加密存储
  wx.setStorage({
    key: 'key',
    data: 'value',
    encrypt: true, // 若开启加密存储，setStorage 和 getStorage 需要同时声明 encrypt 的值为 true
    success() {
      wx.getStorage({
        key: 'key',
        encrypt: true, // 若开启加密存储，setStorage 和 getStorage 需要同时声明 encrypt 的值为 true
        success(res) {
          console.log(res.data)
        },
      })
    },
  })
}

// Test case from `wx.getLocalIPAddress`
{
  wx.getLocalIPAddress({
    success(res) {
      const localip = res.localip
      expectType<string>(localip)
    },
  })
}

// Test case from `wx.onNetworkWeakChange`
{
  wx.onNetworkWeakChange(function (res) {
    console.log(res.weakNet)
    console.log(res.networkType)
  })
  // 取消监听
  wx.offNetworkWeakChange()
}

// Test case from `VideoDecoder`
(async function () {
  const decoder = wx.createVideoDecoder()
  // 启动 videoDecoder
  await new Promise(resolve => {
    decoder.on('start', resolve)
    decoder.start({
      source: 'http://...',
      abortAudio: true, // 不需要音频
    })
  })
})

// Test case from `wx.openCustomerServiceChat`
{
  wx.openCustomerServiceChat({
    extInfo: { url: '' },
    corpId: '',
    success(res) {
      expectType<WechatMiniprogram.GeneralCallbackResult>(res)
    },
  })
}

// Test case from `wx.requestSubscribeDeviceMessage`
{
  wx.requestSubscribeDeviceMessage({
    tmplIds: ['xxxxx'],
    sn: 'xxxx',
    snTicket: 'xxxxx',
    modelId: 'xxx',
    success(res) {
      console.log(res)
    },
    fail(res) {
      console.log(res)
    },
  })
}

// Test case from `wx.getMenuButtonBoundingClientRect`
{
  const res = wx.getMenuButtonBoundingClientRect()

  console.log(res.width)
  console.log(res.height)
  console.log(res.top)
  console.log(res.right)
  console.log(res.bottom)
  console.log(res.left)
}

// Test case from `wx.createWorker`
{
  const createNewWorker = function () {
    const worker = wx.createWorker('workers/index.js', {
      useExperimentalWorker: true,
    })
    // 监听worker被系统回收事件
    worker.onProcessKilled(() => {
      // 重新创建一个worker
      createNewWorker()
    })
  }
  // 创建实验worker
  createNewWorker()
}

// Test case from `wx.createBLEConnection`
{
  wx.createBLEConnection({
    deviceId: '',
    success(res) {
      console.log(res)
    },
  })
}

// Test case from `wx.getBLEMTU`
{
  wx.getBLEMTU({
    deviceId: '',
    writeType: 'write',
    success(res) {
      console.log(res)
    },
  })
}

// Test case from `wx.onBLEMTUChange`
{
  wx.onBLEMTUChange(function (res) {
    console.log('bluetooth mtu is', res.mtu)
  })
}

// Test case from `wx.getAppAuthorizeSetting`
{
  const appAuthorizeSetting = wx.getAppAuthorizeSetting()

  console.log(appAuthorizeSetting.albumAuthorized)
  console.log(appAuthorizeSetting.bluetoothAuthorized)
  console.log(appAuthorizeSetting.cameraAuthorized)
  console.log(appAuthorizeSetting.locationAuthorized)
  console.log(appAuthorizeSetting.locationReducedAccuracy)
  console.log(appAuthorizeSetting.microphoneAuthorized)
  console.log(appAuthorizeSetting.notificationAlertAuthorized)
  console.log(appAuthorizeSetting.notificationAuthorized)
  console.log(appAuthorizeSetting.notificationBadgeAuthorized)
  console.log(appAuthorizeSetting.notificationSoundAuthorized)
  console.log(appAuthorizeSetting.phoneCalendarAuthorized)
}

// Test case from `wx.getAppBaseInfo`
{
  const appBaseInfo = wx.getAppBaseInfo()

  console.log(appBaseInfo.SDKVersion)
  console.log(appBaseInfo.enableDebug)
  console.log(appBaseInfo.host)
  console.log(appBaseInfo.language)
  console.log(appBaseInfo.version)
  console.log(appBaseInfo.theme)
}

// Test case from `wx.getDeviceInfo`
{
  const deviceInfo = wx.getDeviceInfo()

  console.log(deviceInfo.abi)
  console.log(deviceInfo.benchmarkLevel)
  console.log(deviceInfo.brand)
  console.log(deviceInfo.model)
  console.log(deviceInfo.platform)
  console.log(deviceInfo.system)
}

// Test case from `wx.getSystemSetting`
{
  const systemSetting = wx.getSystemSetting()

  console.log(systemSetting.bluetoothEnabled)
  console.log(systemSetting.deviceOrientation)
  console.log(systemSetting.locationEnabled)
  console.log(systemSetting.wifiEnabled)
}

// Test case from `wx.getWindowInfo`
{
  const windowInfo = wx.getWindowInfo()

  console.log(windowInfo.pixelRatio)
  console.log(windowInfo.screenWidth)
  console.log(windowInfo.screenHeight)
  console.log(windowInfo.windowWidth)
  console.log(windowInfo.windowHeight)
  console.log(windowInfo.statusBarHeight)
  console.log(windowInfo.safeArea)
  console.log(windowInfo.screenTop)
}

// Test case from `wx.openAppAuthorizeSetting`
{
  wx.openAppAuthorizeSetting({
    success(res) {
      console.log(res)
    },
  })
}

// Test case from `wx.openSystemBluetoothSetting`
{
  wx.openSystemBluetoothSetting({
    success(res) {
      console.log(res)
    },
  })
}

// Test case from `WebAudioContext`
{
  // 监听状态
  const audioCtx = wx.createWebAudioContext()
  audioCtx.onstatechange = () => {
    expectType<string>(audioCtx.state)
  }
  setTimeout(audioCtx.suspend, 1000)
  setTimeout(audioCtx.resume, 2000)
}

// Test case from `WebAudioContext.close`
{
  const audioCtx = wx.createWebAudioContext()
  audioCtx.close().then(() => {
    console.log(audioCtx.state) // bad case：不应该在close后再访问state
  })
}

// Test case from `WebAudioContext.createPeriodicWave`
{
  const audioCtx = wx.createWebAudioContext()

  const real = new Float32Array(2)
  const imag = new Float32Array(2)
  real[0] = 0
  imag[0] = 0
  real[1] = 1
  imag[1] = 0

  audioCtx.createPeriodicWave(real, imag, {
    disableNormalization: true,
  })
}

// Test case from `wx.preloadAssets`
{
  let imgUrl = ''
  wx.preloadAssets({
    data: [
      {
        type: 'image',
        src: imgUrl,
      },
    ],
    success(resp) {
      console.log('preloadAssets success', resp)
    },
    fail(err) {
      console.log('preloadAssets fail', err)
    },
  })
}

// Test case from `wx.editImage`
{
  wx.editImage({
    src: '', // 图片路径
  })
}

// Test case from `wx.createCacheManager`
{
  const cacheManager = wx.createCacheManager({})
  cacheManager.addRule(/https:\/\/(?:.*)/ig) // 表示所有 https 请求都匹配

  cacheManager.on('request', evt => {
    // 在弱网时接收到 wx.request 请求
    return new Promise((resolve, reject) => {
      const matchRes = cacheManager.match(evt)
      if (matchRes && matchRes.data) {
        // 有缓存，返回
        resolve(matchRes.data)
      } else {
        // 没缓存，抛错
        reject({ errMsg: 'no cache' })
      }
    })
  })
}

// Test case from `CacheManager.addRule`
{
  const cacheManager = wx.createCacheManager({})
  const ruleId = cacheManager.addRule({
    id: 'haha-rule',
    method: 'GET',
    url: '/haha',
    maxAge: 123455,
    dataSchema: [
    // data 字段的匹配，默认为空，表示不匹配
    // 类型可以是：string、number、boolean、null、object、any（表示任意类型均可），以及这些类型的数组表示方式
      {name: 'aaa', schema: {type: 'string'}}, // 类型为 string
      {name: 'bbb', schema: [{type: 'number'}, {type: 'string'}]}, // 类型为 number, string
      {name: 'ccc', schema: {type: 'string', value: 'abc'}}, // 值为 abc
      {name: 'ddd', schema: {type: 'string', value: /(abc|cba)/ig}}, // 值符合该正则匹配，如果该值不是字符串类型，则会被尝试转成字符串后再进行比较
      {name: 'ddd', schema: {type: 'string', value: (val: string) => val === '123'}}, // 传入函数来校验值
      {name: 'eee', schema: {type: 'object', value: [{ // 类型为对象，则通过嵌套的方式来逐层校验
        name: 'aaa', schema: {type: 'string'},
      // ...
      // 嵌套 dataSchema，同上面的方式一样来匹配嵌套的对象
      }]}},
      {name: 'fff', schema: {type: 'string[]'}}, // 类型为 string 数组
      {name: 'ggg', schema: {type: 'any'}}, // 类型为任意类型
      {name: 'hhh', schema: {type: 'any[]'}}, // 类型为任意类型的数组
    ],
  })
  expectType<string>(ruleId)
}

// Test case from `CacheManager.on`
{
  const cacheManager = wx.createCacheManager({})
  cacheManager.on('request', async function () {
    // evt.url - 请求 url
    // evt.data - 请求参数
    // evt.method - 请求方法
    // evt.request - 原始 request 方法，返回一个 promise

    // if (evt.url === '/xxx') {
    //   // 如果有些请求仍然希望走到网络，则可以如下处理
    //   const res = await evt.request()
    //   // res 即为网络请求返回
    // }

    return new Promise((resolve, reject) => {
      // do sth
      let data = {}
      if (data) {
        // 这里 resolve 的 data 就会作为 wx.request 的 success 回调结果返回
        resolve(data)
      } else {
        // 这里 reject 的错误信息就会作为 wx.request 的 fail 回调结果返回
        reject('no data')
      }
    })
  })
}

// Test case from `CacheManager.match`
{
  const cacheManager = wx.createCacheManager({})
  cacheManager.on('request', (evt) => {
    const cache = cacheManager.match(evt)
    // 若有重复监听，则取第一个 handler 返回的 promise
    return new Promise((resolve, reject) => {
      if (cache.data) {
        resolve(cache.data)
      } else {
        reject('no cache')
      }
    })
  })
}

// Test case from `wx.requestPluginPayment`
{
  wx.requestPluginPayment({
    version: 'release',
    fee: 1,
    paymentArgs: {},
    currencyType: 'CNY',
    success (res) {
      expectType<string>(res.errMsg)
    },
    fail (res) {
      expectType<string>(res.errMsg)
    }
  })
}
