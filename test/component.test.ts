import { expectType, expectError } from 'tsd';

expectType<string>(Component({}));

Component({
    behaviors: [''],

    properties: {
        myProperty: {
            type: String,
            value: '',
        },
        freeType: {
            type: null,
            value: 'd',
        },
        myProperty2: String,
        min: {
            type: Number,
            value: 0,
        },
        test: {
            type: String,
            value: '',
            observer(n: string, o: string) {
                n.concat(o);
            },
        },
        max: {
            type: Number,
            value: 0,
            observer(newVal, oldVal) {
                expectType<number>(newVal);
                expectType<number>(oldVal);
                expectType<void>(this.onMyButtonTap());
                expectType<number>(this.data.max);
            },
        },
        lastLeaf: {
            type: Number,
            optionalTypes: [String, Object],
            value: 0,
        },
    },

    data: {
        text: 'init data',
        array: [{ msg: '1' }, { msg: '2' }],
        logs: [] as string[],
    },

    observers: {
        'numberA, numberB'(numberA: number, numberB: number) {
            this.setData({
                sum: numberA + numberB,
            });
        },
    },

    lifetimes: {
        attached() {},
        moved() {},
        detached() {},
        error(err) {
            expectType<Error>(err);
        },
    },

    created() {},

    pageLifetimes: {
        show() {
            // is current component but not the page
            expectType<string>(this.is);
        },
    },

    methods: {
        onMyButtonTap() {
            expectType<string>(this.data.text);
            expectType<string>(this.data.min.toFixed());
            this.triggerEvent(
                'tap',
                { a: 1 },
                {
                    bubbles: true,
                    composed: true,
                    capturePhase: true,
                },
            );
        },
        _myPrivateMethod() {
            this.setData({
                'A[0].B': 'myPrivateData',
            });
        },
        _propertyChange(newVal: number, oldVal: number) {
            expectType<number>(newVal);
            expectType<number>(oldVal);
        },
    },
});

Component({
    methods: {
        f() {
            this.triggerEvent('someEvent', {
                a: 'test',
                b: 123,
                c: {
                    t: 'test',
                },
            });
        },
    },
});

expectError(
    Component({
        custom: 1,
    }),
);

interface Config {
    a: number;
}

interface ConfigConstructor extends ObjectConstructor {
    new (value?: any): Config;
    readonly prototype: Config;
}

Component({
    properties: {
        config: {
            type: Object as ConfigConstructor,
        },
    },
    methods: {
        doc() {
            expectType<Record<string, any>>(this.data.config);
        },
    },
    options: {
        addGlobalClass: true,
    },
});

Component({
    properties: {
        n: Number,
        n2: {
            type: Number,
            value: 1,
        },
        s: String,
        a: Array,
        a2: {
            type: Array,
            value: [1, 2],
        },
        b: Boolean,
        o: Object,
    },
    methods: {
        f() {
            expectType<number>(this.data.n);
            expectType<number>(this.data.n2);
            expectType<string>(this.data.s);
            expectType<any[]>(this.data.a);
            expectType<any[]>(this.data.a2);
            expectType<boolean>(this.data.b);
            expectType<Record<string, any>>(this.data.o);
            expectType<any>(this.data.a[0]);
            expectType<any>(this.data.o.prop);
        },
    },
});

Component({
    properties: {
        n: Number,
        n2: {
            type: Number,
            value: 1,
        },
        s: String,
        a: Array,
        a2: {
            type: Array,
            value: [1, 2],
        },
        b: Boolean,
        o: Object,
        o2: {
            type: Object,
            value: {} as Record<string, any>,
        },
    },
    methods: {
        g() {
            const str = (1).toFixed(0);
            return str;
        },
        f() {
            expectType<string>(this.g());
            expectType<number>(this.data.n);
            expectType<number>(this.data.n2);
            expectType<string>(this.data.s);
            expectType<any[]>(this.data.a);
            expectType<any[]>(this.data.a2);
            expectType<boolean>(this.data.b);
            expectType<Record<string, any>>(this.data.o);
            expectType<Record<string, any>>(this.data.o2);
            expectType<any>(this.data.o2.city);
            expectType<any>(this.data.a[0]);
            expectType<any>(this.data.o.prop);
        },
    },
});

Component({
    properties: {
        n: {
            type: Number,
            value: 1,
        },
        a: {
            type: Array,
            value: [1, 2],
        },
    },
    methods: {
        f() {
            expectType<number>(this.data.n);
            expectType<any[]>(this.data.a);
        },
    },
});

Component({
    properties: {
        n: Number,
        a: Array,
    },
    methods: {
        f() {
            expectType<number>(this.data.n);
            expectType<any[]>(this.data.a);
        },
    },
});

expectError(
    Component({
        data: {
            a: 1,
        },
        methods: {
            someMethod() {
                this.setData({
                    a: '',
                });
            },
        },
    }),
);

Component({
    options: {
        pureDataPattern: /^_/,
    },
    data: {
        a: true, // 普通数据字段
        _b: true, // 纯数据字段
    },
    methods: {
        myMethod() {
            this.data._b; // 纯数据字段可以在 this.data 中获取
            this.setData({
                c: true, // 普通数据字段
                _d: true, // 纯数据字段
            });
        },
    },
});

Component({
    properties: {
        a: {
            type: Number,
            observer: 'onAChange',
            value: 1,
        },
    },
    methods: {
        onAChange() {},
    },
});

Component({
    methods: {
        animate() {
            this.animate(
                '#container',
                [
                    { opacity: 1.0, rotate: 0, backgroundColor: '#FF0000' },
                    { opacity: 0.5, rotate: 45, backgroundColor: '#00FF00' },
                    { opacity: 0.0, rotate: 90, backgroundColor: '#FF0000' },
                ],
                5000,
                () => {
                    this.clearAnimation('#container', { opacity: true, rotate: true }, function () {
                        console.log('清除了#container上的opacity和rotate属性');
                    });
                },
            );

            this.animate(
                '.block',
                [
                    { scale: [1, 1], rotate: 0, ease: 'ease-out' },
                    { scale: [1.5, 1.5], rotate: 45, ease: 'ease-in', offset: 0.9 },
                    { scale: [2, 2], rotate: 90 },
                ],
                5000,
                () => {
                    this.clearAnimation('.block', function () {
                        console.log('清除了.block上的所有动画属性');
                    });
                },
            );
        },
    },
});

Component({
    methods: {
        animate() {
            this.animate(
                '.avatar',
                [
                    {
                        borderRadius: '0',
                        borderColor: 'red',
                        transform: 'scale(1) translateY(-20px)',
                        offset: 0,
                    },
                    {
                        borderRadius: '25%',
                        borderColor: 'blue',
                        transform: 'scale(.65) translateY(-20px)',
                        offset: 0.5,
                    },
                    {
                        borderRadius: '50%',
                        borderColor: 'blue',
                        transform: `scale(.3) translateY(-20px)`,
                        offset: 1,
                    },
                ],
                2000,
                {
                    scrollSource: '#scroller',
                    timeRange: 2000,
                    startScrollOffset: 0,
                    endScrollOffset: 85,
                },
            );

            this.animate(
                '.search_input',
                [
                    {
                        opacity: '0',
                        width: '0%',
                    },
                    {
                        opacity: '1',
                        width: '100%',
                    },
                ],
                1000,
                {
                    scrollSource: '#scroller',
                    timeRange: 1000,
                    startScrollOffset: 120,
                    endScrollOffset: 252,
                },
            );
        },
    },
});

Component({
    methods: {
        test() {
            const channel = this.getOpenerEventChannel();
            expectType<WechatMiniprogram.EventChannel>(channel);
            channel.emit('test', {});
            channel.on('xxx', () => {});

            expectError(channel.emit(1, 2));
        },
    },
});

Component<{}, {}, { fn(): void }>({
    methods: {
        fn() {
            expectError(this.notExists);
        },
    },
});

{
    const data = {
        a: 1,
        b: '',
    };
    const properties = {
        c: String,
        d: {
            type: Number,
            value: 4,
        },
    };
    Component<
        typeof data,
        typeof properties,
        /* methods= */ { fn(): string },
        /* customProperties= */ {},
        /* isPage= */ true
    >({
        data,
        properties,
        methods: {
            onLoad(q) {
                expectType<string[]>(Object.keys(q));
            },
            fn() {
                expectType<() => void | Promise<void>>(this.onShow);

                expectError(this.notExists);
                return 'test';
            },
        },
    });
}
