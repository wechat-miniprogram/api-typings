declare namespace WechatMiniprogram.Skyline {
    interface WorkletFunction {}

    interface BasicWorkletFunction<T> extends WorkletFunction {
      (): T
    }

    type Timestamp = number

    type AnimationCallback = (
      finished?: boolean,
      current?: AnimatableValue
    ) => void

    type AnimatableValue = number | string | number[]

    interface AnimationObject {
      callback?: AnimationCallback
      current?: AnimatableValue
      toValue?: AnimationObject['current']
      startValue?: AnimationObject['current']
      finished?: boolean
      strippedCurrent?: number
      cancelled?: boolean

      __prefix?: string
      __suffix?: string
      onFrame: (animation: any, timestamp: Timestamp) => boolean
      onStart: (
        nextAnimation: any,
        current: any,
        timestamp: Timestamp,
        previousAnimation: any
      ) => void
    }

    interface SharedValue<T> {
        value: T
    }

    type DerivedValue<T> = Readonly<SharedValue<T>>

    interface NumericAnimation {
      current?: number
    }

    interface Animation<T extends AnimationObject> extends AnimationObject {
      onFrame: (animation: T, timestamp: Timestamp) => boolean
      onStart: (
        nextAnimation: T,
        current: T extends NumericAnimation ? number : AnimatableValue,
        timestamp: Timestamp,
        previousAnimation: T
      ) => void
    }

    interface AnimatedStyle extends Record<string, Animation<AnimationObject>> {
        [key: string]: any
    }

    type FlushOption = 'async' | 'sync'

    interface AnimatedStyleConfig {
        immediate: boolean
        flush: FlushOption
    }
}
