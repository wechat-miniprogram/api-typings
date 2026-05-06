declare namespace WechatMiniprogram.Skyline {
    interface WorkletFunction<T> {
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

    type AnimatedStyle = Record<string, any>

    type FlushOption = 'async' | 'sync'

    interface AnimatedStyleConfig {
        immediate: boolean
        flush: FlushOption
    }
}
