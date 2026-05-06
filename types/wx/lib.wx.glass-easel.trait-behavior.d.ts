declare namespace WechatMiniprogram.GlassEasel.TraitBehavior {
    type Instance<
        TIn extends { [key: string]: any },
        TOut extends { [key: string]: any } = TIn
    > = {}

    interface Constructor {
        <TIn extends Record<string, any>>(): Instance<TIn, TIn>
        <TIn extends Record<string, any>, TOut extends Record<string, any>>(
            trans: (impl: TIn) => TOut
        ): Instance<TIn, TOut>
    }
}
