declare namespace WechatMiniprogram {
    interface Touch {
        clientX: number
        clientY: number
        force: number
        identifier: number
        pageX: number
        pageY: number
    }
    interface Target {
        id: string,
        offsetLeft: number,
        offsetTop: number,
        dataset: {
            [key: string]: string
        }
    }
    interface Event {
        currentTarget: Target
        target: Target
        timeStamp: number
        type: string
    }
    interface TouchEvent {
        changedTouches: Touch[]
        detail: {
            x: number,
            y: number
        }
        mark: {
            [key: string]: string
        }
        mut: boolean
        touches: Touch[]
        type: string
    }
    interface TapEvent extends TouchEvent {
        type: "tap"
    }
    interface InputEvent extends Event {
        detail: {
            cursor: number
            keyCode: number
            value: string
        }
        type: "input"
    }
    interface TouchStartEvent extends TouchEvent {
        type: "touchstart"
        _requireActive: boolean
    }
    interface TouchMoveEvent extends TouchEvent {
        type: "touchmove"
        _requireActive: boolean
    }
    interface TouchEndEvent extends TouchEvent {
        type: "touchend"
        _requireActive: boolean
    }
    interface LongPressEvent extends TouchEvent {
        type: "longpress"
    }
    interface LongTapEvent extends TouchEvent {
        type: "longtap"
    }

    interface AnimationEvent extends Event {
        mark: {
            [key: string]: string
        }
        mut: boolean
        type: string
    }
    interface TransitionEndEvent extends AnimationEvent {
        detail: {
            elapsedTime: number
        }
        type: "transitionend"
    }
    interface AnimationStartEvent extends AnimationEvent {
        detail: {
            animationName: string,
            elapsedTime: number
        }
        type: "animationstart"
    }
    interface AnimationIterationEvent extends AnimationEvent {
        detail: {
            animationName: string,
            elapsedTime: number
        }
        type: "animationiteration"
    }
    interface AnimationEndEvent extends AnimationEvent {
        detail: {
            animationName: string, elapsedTime: number
        }
        type: "animationend"
    }
    interface SumbmitEvent extends Event {
        detail: {
            value: {
                [key: string]: any
            },
            target: Target
        }
        mark: {
            [key: string]: string
        }
        mut: boolean
        type: "submit"
    }
    interface ResetEvent extends Event {
        detail: {
            target: Target
        }
        mark: {
            [key: string]: string
        }
        mut: false
        type: "reset"
    }

}



