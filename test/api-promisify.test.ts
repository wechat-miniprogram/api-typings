import { expectType } from 'tsd'

// call with callback
wx.chooseImage({
  success(res) {
    expectType<WechatMiniprogram.ChooseImageSuccessCallbackResult>(res)
  },
})
wx.canvasToTempFilePath({
  canvasId: '',
  success(res) {
    expectType<WechatMiniprogram.CanvasToTempFilePathSuccessCallbackResult>(
      res,
    )
  },
})
wx.stopAccelerometer({
  fail(res) {
    expectType<WechatMiniprogram.GeneralCallbackResult>(res)
  },
})
wx.getClipboardData({
  success(res) {
    expectType<WechatMiniprogram.GetClipboardDataSuccessCallbackOption>(res)
  },
})
wx.stopCompass({
  complete(res) {
    expectType<WechatMiniprogram.GeneralCallbackResult>(res)
  },
})
wx.addPhoneContact({
  firstName: '',
  complete(res) {
    expectType<WechatMiniprogram.GeneralCallbackResult>(res)
  },
})
wx.startLocalServiceDiscovery({
  serviceType: '',
  success(res) {
    expectType<WechatMiniprogram.GeneralCallbackResult>(res)
  },
})
wx.getSystemInfo({
  success(res) {
    expectType<WechatMiniprogram.SystemInfo>(res)
  },
})
wx.chooseLocation({
  success(res) {
    expectType<WechatMiniprogram.ChooseLocationSuccessCallbackResult>(res)
  },
})
wx.previewImage({
  urls: [],
  success(res) {
    expectType<WechatMiniprogram.GeneralCallbackResult>(res)
  },
})
wx.saveVideoToPhotosAlbum({
  filePath: '',
  success(res) {
    expectType<WechatMiniprogram.GeneralCallbackResult>(res)
  },
})

wx.createBLEConnection({
  deviceId: '',
  success(res) {
    expectType<WechatMiniprogram.BluetoothError>(res)
  },
})

wx.startBluetoothDevicesDiscovery({
  success(res) {
    expectType<WechatMiniprogram.BluetoothError>(res)
  },
})
wx.hideShareMenu({
  success(res) {
    expectType<WechatMiniprogram.GeneralCallbackResult>(res)
  },
})

wx.checkIsSupportSoterAuthentication({
  success(res) {
    expectType<
      WechatMiniprogram.CheckIsSupportSoterAuthenticationSuccessCallbackResult
    >(res)
  },
})
wx.navigateBack({
  success(res) {
    expectType<WechatMiniprogram.GeneralCallbackResult>(res)
  },
})

// call with Promise.prototype.then
wx.chooseImage({}).then(res => {
  expectType<WechatMiniprogram.ChooseImageSuccessCallbackResult>(res)
})
wx.canvasToTempFilePath({
  canvasId: '',
}).then(res => {
  expectType<WechatMiniprogram.CanvasToTempFilePathSuccessCallbackResult>(res)
})
wx.stopAccelerometer().then(res => {
  expectType<WechatMiniprogram.GeneralCallbackResult>(res)
})
wx.getClipboardData().then(res => {
  expectType<WechatMiniprogram.GetClipboardDataSuccessCallbackOption>(res)
})
wx.stopCompass().then(res => {
  expectType<WechatMiniprogram.GeneralCallbackResult>(res)
})
wx.addPhoneContact({
  firstName: '',
}).then(res => {
  expectType<WechatMiniprogram.GeneralCallbackResult>(res)
})
wx.startLocalServiceDiscovery({ serviceType: '' }).then(res => {
  expectType<WechatMiniprogram.GeneralCallbackResult>(res)
})
wx.getSystemInfo().then(res => {
  expectType<WechatMiniprogram.SystemInfo>(res)
})
wx.chooseLocation({}).then(res => {
  expectType<WechatMiniprogram.ChooseLocationSuccessCallbackResult>(res)
})
wx.previewImage({ urls: [] }).then(res => {
  expectType<WechatMiniprogram.GeneralCallbackResult>(res)
})
wx.saveVideoToPhotosAlbum({ filePath: '' }).then(res => {
  expectType<WechatMiniprogram.GeneralCallbackResult>(res)
})
wx.createBLEConnection({ deviceId: '' }).then(res => {
  expectType<WechatMiniprogram.BluetoothError>(res)
})
wx.startBluetoothDevicesDiscovery({}).then(res => {
  expectType<WechatMiniprogram.BluetoothError>(res)
})
wx.hideShareMenu().then(res => {
  expectType<WechatMiniprogram.GeneralCallbackResult>(res)
})
wx.checkIsSupportSoterAuthentication().then(res => {
  expectType<
    WechatMiniprogram.CheckIsSupportSoterAuthenticationSuccessCallbackResult
  >(res)
})
wx.navigateBack().then(res => {
  expectType<WechatMiniprogram.GeneralCallbackResult>(res)
})

// call with await
async () => {
  expectType<WechatMiniprogram.ChooseImageSuccessCallbackResult>(
    await wx.chooseImage({}),
  )
  expectType<WechatMiniprogram.CanvasToTempFilePathSuccessCallbackResult>(
    await wx.canvasToTempFilePath({ canvasId: '' }),
  )
  expectType<WechatMiniprogram.GeneralCallbackResult>(
    await wx.stopAccelerometer(),
  )
  expectType<WechatMiniprogram.GetClipboardDataSuccessCallbackOption>(
    await wx.getClipboardData(),
  )
  expectType<WechatMiniprogram.GeneralCallbackResult>(await wx.stopCompass())
  expectType<WechatMiniprogram.GeneralCallbackResult>(
    await wx.addPhoneContact({ firstName: '' }),
  )
  expectType<WechatMiniprogram.GeneralCallbackResult>(
    await wx.startLocalServiceDiscovery({ serviceType: '' }),
  )
  expectType<WechatMiniprogram.SystemInfo>(
    await wx.getSystemInfo(),
  )
  expectType<WechatMiniprogram.ChooseLocationSuccessCallbackResult>(
    await wx.chooseLocation({}),
  )
  expectType<WechatMiniprogram.GeneralCallbackResult>(
    await wx.previewImage({ urls: [] }),
  )
  expectType<WechatMiniprogram.GeneralCallbackResult>(
    await wx.saveVideoToPhotosAlbum({ filePath: '' }),
  )
  expectType<WechatMiniprogram.BluetoothError>(
    await wx.createBLEConnection({ deviceId: '' }),
  )
  expectType<WechatMiniprogram.BluetoothError>(
    await wx.startBluetoothDevicesDiscovery({}),
  )
  expectType<WechatMiniprogram.GeneralCallbackResult>(await wx.hideShareMenu())
  expectType<
    WechatMiniprogram.CheckIsSupportSoterAuthenticationSuccessCallbackResult
  >(await wx.checkIsSupportSoterAuthentication())
  expectType<WechatMiniprogram.GeneralCallbackResult>(await wx.navigateBack())
}
