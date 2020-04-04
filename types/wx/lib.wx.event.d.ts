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
    interface TapEvent extends Event {
        changedTouches: Touch[]
        detail: {
            x: number,
            y: number
        }
        mark: {
            [key: string]: string
        }
        mut: boolean
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
    interface TouchStartEvent extends Event {
        changedTouches: Touch[]
        detail: {
            x: number,
            y: number
        }
        mark: {
            [key: string]: string
        }
        mut: boolean
        type: "touchstart"
        _requireActive: boolean
    }
}



