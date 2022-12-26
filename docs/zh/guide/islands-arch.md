# Islands architecture

`孤岛架构`的概念最初在 2019 年被 [Katie Sylor-Miller](https://twitter.com/ksylor) 提出，然后在 2021 年被 Preact 作者 `Jason Miller` 在 [一篇文章](https://jasonformat.com/islands-architecture/) 中得到推广。

这种架构是为了解决 MPA 应用的 hydration 问题，在上篇文章中已经分析过了。本小节主要侧重介绍孤岛架构的概念以及 Island.js 是如何实现这种架构的。

## 概念

顾名思义，我们可以把整个页面想象成一片静态的海洋，将交互部分想象成孤岛。如下图所示：

![./assets/islands-arch.png](https://res.cloudinary.com/wedding-website/image/upload/v1596766231/islands-architecture-1.png)

然后在 hydration 的过程中，我们只需要对于这些局部的孤岛组件执行 hydration 即可，这样就可以避免整个页面的 hydration，从而提升首屏性能。

## Island.js 的实现

孤岛架构在 Island.js 中的实现包括三个部分：`server runtime`、`build time` 和 `client runtime`。

### 孤岛组件的使用

在介绍架构的实现之前，我认为有必要先介绍一下孤岛组件的使用。在 Island.js 中，使用方式非常简单，如下面的代码所示：

```js
import { Aside } from './Aside.tsx';

export function Layout() {
  return <Aside __island />;
}
```

使用时只需要在组件中添加一个 `__island` prop，然后组件就会自动被识别为孤岛组件。Island.js 只会在孤岛组件的客户端脚本和它们的 props 注入在客户端中。

### 内部实现细节

**1. Server runtime**。服务器运行时负责服务端渲染，也就是组件到 HTML 的转换过程(renderToString)。这个阶段的主要任务是在 `renderToString` 过程中收集孤岛组件信息。

在 Island.js 中，我们使用 `react/jsx-runtime` 来实现 jsx 的转换，所以我们需要在 `react/jsx-runtime` 中劫持 jsx 函数，当发现组件中有 `__island` prop 时，就会收集孤岛组件的信息。

**2. Build time**。构建时负责生成孤岛组件的客户端脚本并注入到 HTML 中。在构建时 Island.js 会生成三个 bundle：

- `Server bundle`，用于服务端渲染。
- `Client hydration bundle`，用于客户端 hydration。
- `Islands bundle`，用于注册孤岛组件的客户端脚本，所有孤岛组件将会挂载在 `window` 对象上。

在 Island.js 中，收集完所有的孤岛组件后，会构造一个虚拟模块，作用是将所有的孤岛组件注册到 window 对象上，因此在客户端 hydration bundle 中，我们可以从 window 对象上获取到所有的孤岛组件，然后对其进行 hydration。

**3. Client runtime**。客户端运行时主要是负责孤岛组件的 hydration，也就是将孤岛组件变得可以交互。

下面是一些相关的实现代码:

[island-jsx-runtime.js](https://github.com/sanyuan0704/island.js/blob/master/packages/island/src/runtime/island-jsx-runtime.js): 拦截 jsx 运行时，收集孤岛组件信息。

[babel-plugin-island](https://github.com/sanyuan0704/island.js/blob/master/packages/island/src/node/babel-plugin-island.ts): 注册孤岛组件文件路径的 babel 插件。

[SSGBuilder](https://github.com/sanyuan0704/island.js/blob/master/packages/island/src/node/build.ts): 完整的构建时实现。

[client-entry](https://github.com/sanyuan0704/island.js/blob/master/packages/island/src/runtime/client-entry.tsx#L50): 客户端运行时代码，主要是负责孤岛组件的 hydration。
