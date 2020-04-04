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
        touches: Touch[]
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
    
}



