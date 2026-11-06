declare namespace WechatMiniprogram.GlassEasel.TraitBehavior {
    type Instance<
        TIn extends { [key: string]: any },
        TOut extends { [key: string]: any } = TIn
    > = {}

    /** trait behaviors 用于向其他组件暴露 JS 接口，参见 [trait behaviors](https://developers.weixin.qq.com/miniprogram/dev/framework/component-framework/trait-behaviors.html) */
    interface Constructor {
        <TIn extends Record<string, any>>(): Instance<TIn, TIn>
        <TIn extends Record<string, any>, TOut extends Record<string, any>>(
            trans: (impl: TIn) => TOut
        ): Instance<TIn, TOut>
    }
}
