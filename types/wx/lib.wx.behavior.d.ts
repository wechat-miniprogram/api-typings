/*! *****************************************************************************
Copyright (c) 2019 Tencent, Inc. All rights reserved.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
***************************************************************************** */

declare namespace WechatMiniprogram {
  namespace Behavior {
    type Instance<
      TProperty extends Partial<PropertyOption>,
      TData,
      TMethod extends MethodOption
    > = WechatMiniprogram.Component.Instance<TProperty, TData, TMethod>;
    type TrivialInstance = Instance<IAnyObject, IAnyObject, IAnyObject>;
    type TrivialOption = Options<IAnyObject, IAnyObject, IAnyObject>;
    type Options<
      TData,
      TProperty extends Partial<PropertyOption>,
      TMethod extends MethodOption
    > = Data<TData> &
      Partial<OtherOption> &
      Partial<Lifetimes> &
      TProperty &
      Partial<Methods<TMethod>> &
      ThisType<Instance<TProperty, TData, TMethod>>;
    interface Constructor {
      <
        TData,
        TProperty extends Partial<PropertyOption>,
        TMethod extends MethodOption
      >(
        options: Options<TData, TProperty, TMethod>,
      ): string;
    }

    type Data<DataType> = WechatMiniprogram.Component.Data<DataType>;
    type PropertyOption = WechatMiniprogram.Component.PropertyOption;
    type MethodOption = WechatMiniprogram.Component.MethodOption;
    type Methods<M extends MethodOption> = WechatMiniprogram.Component.Methods<
      M
    >;
    type DefinitionFilter = WechatMiniprogram.Component.DefinitionFilter;
    type Lifetimes = WechatMiniprogram.Component.Lifetimes;

    interface OtherOption {
      /** 类似于mixins和traits的组件间代码复用机制，参见 [behaviors](behaviors.md) */
      behaviors: string[];
      /** 定义段过滤器，用于自定义组件扩展，参见 [自定义组件扩展](extend.md)
       *
       * 最低基础库： `2.2.3` */
      definitionFilter?: DefinitionFilter;
    }
  }
}
/** 注册一个 `behavior`，接受一个 `Object` 类型的参数。*/
declare const Behavior: WechatMiniprogram.Behavior.Constructor;
