import { expectType } from 'tsd'

import type * as XrFrame from 'XrFrame'

const xrFrameSystem = wx.getXrFrameSystem()

expectType<XrFrame.Element>(new xrFrameSystem.Element('test', () => {}))

const AutoRotateTouchableGLTFDefaultComponents: XrFrame.IEntityComponents = Object.assign({
  'mesh-shape': {},
  'auto-rotate': {}
}, xrFrameSystem.GLTFDefaultComponents)

const AutoRotateTouchableGLTFDataMapping: {[key: string]: string[]} = Object.assign({
  speed: ['auto-rotate', 'speed']
}, xrFrameSystem.GLTFDataMapping)

const Element = xrFrameSystem.Element

class XRAutoRotateTouchableGLTF extends Element {
  public readonly defaultComponents: XrFrame.IEntityComponents = AutoRotateTouchableGLTFDefaultComponents
  public readonly dataMapping: {[key: string]: string[]} = AutoRotateTouchableGLTFDataMapping
}

xrFrameSystem.registerElement('auto-rotate-touchable-gltf', XRAutoRotateTouchableGLTF)

xrFrameSystem.registerMaterial('shining', scene => {
  return scene.createMaterial(scene.assets.getAsset<XrFrame.Effect>('effect', 'shining'))
})

const ShiningStarDefaultComponents: XrFrame.IEntityComponents = Object.assign({
  mesh: {
    geometry: 'star',
    material: 'shining'
  }
}, xrFrameSystem.NodeDefaultComponents)

const ShiningStarDataMapping: {[key: string]: string[]} = Object.assign({
  uniforms: ['mesh', 'uniforms']
}, xrFrameSystem.NodeDataMapping)

xrFrameSystem.registerElement('shining-star', class XRShiningStar extends Element {
  public readonly defaultComponents: XrFrame.IEntityComponents = ShiningStarDefaultComponents
  public readonly dataMapping: {[key: string]: string[]} = ShiningStarDataMapping
})
