# 新一代全栈框架 Fresh

大家好，我是三元。今天给大家介绍一个新的框架 Fresh，由 Deno 作者出品，在最近发布了 1.0 的正式版本，宣布支持了生产环境，并且在 Github 上热度也比较高，现在是时候给大家详细地介绍一下这个方案了。接下来会从**框架定位**、**上手体验**、**优劣势评估**和**源码实现**这几个方面来给大家深入解读 Fresh 框架。

## 框架定位

首先，从定位上来看，Fresh 属于 **Web 全栈开发框架**。是不是对于这个词非常眼熟呢？相信你已经想到了，像现在大名鼎鼎的 Next.js 以及新出的 Remix 都是走的这个路线。那么作为 Next.js 和 Remix 的竞品， Fresh 有哪些值得一提的亮点，或者说有哪些差异点呢？主要包括如下的几个方面:

首先，Fresh 基于 Deno 运行时，由 Deno 原班人马开发，享有 Deno 一系列工具链和生态的优势，比如内置的测试工具、支持 http import 等等。

其次是渲染性能方面，Fresh 整体采用 Islands 架构(之前介绍的 Astro 也是类似)，实现了客户端按需 Hydration，有一定的渲染性能优势。

当然，还有一个比较出色的点是构建层做到了 Bundle-less，即应用代码不需要打包即可直接部署上线，后文会介绍这部分的具体实现。

最后，不同于 Next.js 和 Remix，Fresh 的前端渲染层由 Preact 完成，包括 Islands 架构的实现也是基于 Preact，且不支持其它前端框架。

## 上手体验

在使用 Fresh 之前，需要在机器上先安装 Deno:

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1ded1a7d4fdb44429ef0a1bf7a43c636~tplv-k3u1fbpfcp-zoom-1.image)

如何没有安装的话可以先去 Deno 官方安装一下: https://deno.land/。

接下来可以输入如下的命令初始化项目:

```ts
deno run -A -r https://fresh.deno.dev my-project
```

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/182e83f8877340b3ae35030aee6cd776~tplv-k3u1fbpfcp-zoom-1.image)

项目的工程化脚本在 `deno.json` 文件中:

```json
{
  "tasks": {
    // -A 表示允许 Deno 读取环境变量
    "start": "deno run -A --watch=static/,routes/ dev.ts"
  },
  "importMap": "./import_map.json"
}
```

接下来你可以执行`deno task start` 命令启动项目:

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0162891907e2416e900c12d3309dfca5~tplv-k3u1fbpfcp-zoom-1.image)

终端里面显示 Fresh 从文件目录中扫描出了 3 个路由和 1 个 island 组件，我们可以来观察一下项目的目录结构:

```ts
.
├── README.md
├── components
│   └── Button.tsx
├── deno.json
├── dev.ts
├── fresh.gen.ts
├── import_map.json
├── islands
│   └── Counter.tsx
├── main.ts
├── routes
│   ├── [name].tsx
│   ├── api
│   │   └── joke.ts
│   └── index.tsx
├── static
│   ├── favicon.ico
│   └── logo.svg
└── utils
    └── twind.ts
```

你可以关注 `routes` 和 `islands` 两个目录，`[name].tsx`、`api/joke.ts` 和 `index.tsx` 分别对应三个路由，而 islands 目录下的每个文件则对应一个 island 组件。

而开发者并不需要手写路由文件，Fresh 可以自动地生成服务端的路由到文件的映射关系。很明显 Fresh 实现了约定式路由的功能，跟 Next.js 类似。

每个 `island 组件`需要有一个 default 导出，用来将组件暴露出去，使用比较简单，就不展开介绍了。而`路由组件`则更加灵活，既可以作为一个 API 服务，也可以作为一个组件进行渲染。接下来，我们以脚手架项目的几个文件示例来分析一下。

首先是 `api/joke.ts` 文件，这个文件的作用是提供服务端的数据接口，并不承载任何的前端渲染逻辑，你只需要在这个文件里面编写一个 handler 函数即可，如下代码所示:

```ts
// api/joke.ts
import { HandlerContext } from "$fresh/server.ts";

const JOKES = [
  // 省略具体内容
];

export const handler = (_req: Request, _ctx: HandlerContext): Response => {
  // 随机返回一个 joke 字符串
  return new Response(body);
};
```

当你访问`/api/joke` 路由时，可以拿到 handler 返回的数据:

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f41639defbb842218737a1e45b63cf29~tplv-k3u1fbpfcp-zoom-1.image)

接下来是`index.tsx`和`[name].tsx` 两个文件，第一个文件对应根路由即`/`，访问效果如下:

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8c21b54e64a545a684329e2e0fa7a656~tplv-k3u1fbpfcp-zoom-1.image)

后者则为动态路由，可以拿到路由传参进行渲染:

```ts
export default function Greet(props: PageProps) {
  return <div>Hello {props.params.name}</div>;
}
```

访问效果如下:

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/660c0eade8f14e5c96806cbcc81d95a6~tplv-k3u1fbpfcp-zoom-1.image)

同时，你也可以在路由组件同时编写前端组件和 handler 函数，如下代码所示:

```ts
// 修改 [name].tsx 的内容如下
/** @jsx h */
import { h } from "preact";
import { HandlerContext, PageProps } from "$fresh/server.ts";

export function handler(req: Request, ctx: HandlerContext) {
  const title = "一些标题数据";
  return ctx.render({ title });
}

export default function Greet(props: PageProps) {
  return <div>获取数据: {props.data.title}</div>;
}
```

从 handler 的第二个参数(ctx 对象)中，我们可以取出 render 方法，传入组件需要的数据，手动调用完成渲染。效果如下:

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/18e6ffe5b23d4e7cbeb1a2140750dd47~tplv-k3u1fbpfcp-zoom-1.image)

以上我们就体验了 Fresh 的几个核心的功能，包括`项目初始化`、`路由组件开发`、`服务端接口开发`、`组件数据获取`以及`约定式路由`，相信从中你也能体会到 Fresh 的简单与强大了。

## 优劣势分析

那么，就如 Fresh 官网所说，Fresh 能否成为下一代 Web 全栈框架呢？

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/27f3abeffd484428bba392ce5d83f559~tplv-k3u1fbpfcp-zoom-1.image)

我们不妨来盘点一下 Fresh 的优势和不足。

使用 Fresh 的优势可以总结如下:

- 享受 Deno 带来的开发优势，从安装依赖、开发、测试、部署直接使用 Deno 的工具链，降低工程化的成本；

- 基于 Island 架构，带来更小的客户端运行时开销，渲染性能更好；

- 无需打包即可开发、部署应用，带来更少的构建成本，更加轻量；

而劣势也比较明显，包含如下的几个方面:

- 仅支持 Preact 框架，不支持 React，这一点是比较致命的；

- 由于架构的原因，开发阶段没有 HMR 的能力，只能 page reload；

- 对于 Island 组件，必须要放到 islands 目录，对于比较复杂的应用而言，<span data-word-id="53156824" class="abbreviate-word">心智</span>负担会比较重，而 Astro 在这一方面要做的更优雅一些，通过组件指令即可指定 island 组件，如`<Component client:load />`。

一方面 Fresh 能解决的问题，如 Hydration 性能问题，其它的框架也能解决(Astro)，并且比它做的更好，另一方面 Fresh 的部分劣势也比较致命，况且 Deno 如今也很难做到真正地普及，所以我认为 Fresh 并不是一个未来能够大范围流行的 Web 框架，但对于 Deno 和 Preact 的用户而言，我认为 Fresh 足以撼动 Next.js 这类框架原有的地位。

## 源码实现

Fresh 的内部实现并不算特别复杂，虽然说我们并一定用的上 Fresh，但我觉得 Fresh 的代码还是值得一读的，从中可以学习到不少东西。

> Github 地址: https://github.com/denoland/fresh

你可以先去仓库 examples/counter 查看示例项目，通过 `deno task start` 命令启动。入口文件为`dev.ts`，其中会调用 Fresh 进行路由文件和 islands 文件的搜集，生成 Manifest 信息。

接下来进入核心环节——创建 Server，具体逻辑在`server/mod.ts`中:

```ts
export async function start(routes: Manifest, opts: StartOptions = {}) {
  const ctx = await ServerContext.fromManifest(routes, opts);
  await serve(ctx.handler(), opts);
}
```

`fromManifest`为一个工厂方法，目的是根据之前扫描到的 Manifest 信息生成服务端上下文对象(ServerContext)，因此 Server 的实现核心也就在于 ServerContext:

```ts
class ServerContext {
  static async fromManifest(manifest: Manifest, opts: FreshOptions) {
    // 省略中间的处理逻辑
    return new ServerContext();
  }
}
```

fromManifest 实际上就是进一步处理(normalize) manifest 信息，生成 Route 对象和 Island 对象，以供 ServerContext 的实例初始化。

接下来，Fresh 会调用 ServerContext 的 handler 方法，交给标准库 http/server 的 serve 方法进行调用。因此，handler 方法也是整个服务端的核心实现，其中有两大主要的实现部分:

- 中间件机制的实现，也就是实现洋葱模型，具体逻辑在私有方法`#composeMiddlewares`中；

- 页面渲染逻辑的实现，在私有方法`#handlers()`中。

前者不是本文的重点，感兴趣的同学可以在看完文章后继续研究。这里我们主要关注页面渲染的逻辑是如何实现的，`#handlers()`方法中定义了几乎所有路由的处理逻辑，包括`路由组件渲染`、`404 组件渲染`、`Error 组件渲染`、`静态资源加载`等等逻辑，我们可以把目光集中在`路由组件渲染`中，主要是这段逻辑:

```ts
for (const [method, handler] of Object.entries(route.handler)) {
  routes[`${method}@${route.pattern}`] = (req, ctx, params) =>
    handler(req, {
      ...ctx,
      params,
      render: createRender(req, params),
      renderNotFound: createUnknownRender(req, {}),
    });
}
```

而在路由对象`normalize`的过程(即`fromManifest` 方法)中，route.handler 的默认实现为:

```ts
let { handler } = module as RouteModule;
handler ??= {};
if (component && typeof handler === "object" && handler.GET === undefined) {
  // 划重点！
  handler.GET = (_req, { render }) => render();
}
const route: Route = {
  pattern,
  url,
  name,
  component,
  handler,
  csp: Boolean(config?.csp ?? false),
};
```

因此，对于路由组件的处理最后都会进入 render 函数中，我们不妨来看看 render 函数是如何被创建的:

```ts
// 简化后的代码
const genRender = (route, status) => {
  return async (req, params, error) => {
    return async (data) => {
      // 执行渲染逻辑
      const resp = await internalRender();
      const [body] = resp;
      return new Response(body);
    };
  };
};
const createRender = genRender(route, Status.OK);
```

生成 render 函数这块逻辑个人认为比较抽象，需要静下心来理清各个函数的调用顺序，理解难度并不大。我们还是把关注点放到核心的渲染逻辑上，主要是 internalRender 函数的实现:

```ts
import { render as internalRender } from "./render.tsx";
```

你可以去 `render.tsx` 进一步阅读，这个文件主要做了如下的事情:

- 记录项目中声明的所有 Islands 组件。

- 拦截 Preact 中 vnode 的创建逻辑，目的是为了匹配之前记录的 Island 组件，如果能匹配上，则记录 Island 组件的 props 信息，并将组件用 \<!--frsh-id 值:数字--> 的注释标签来包裹，id 值为 Island 的 id，数字为该 Island 的 props 在全局 props 列表中的位置，方便 hydrate 的时候能够找到对应组件的 props。

- 调用 Preact 的 renderToString 方法将组件渲染为 HTML 字符串。

- 向 HTML 中注入客户端 hydrate 的逻辑。

- 拼接完整的 HTML，返回给前端。

值得注意的是客户端 hydrate 方法的实现，传统的 <span data-word-id="44772760" class="abbreviate-word">SSR</span> 一般都是直接对根节点调用 hydrate，而在 Islands 架构中，Fresh 对每个 Island 进行独立渲染，实现如下:

> hydrate 方法名也可以叫 revive

```ts
export function revive(islands: Record<string, ComponentType>, props: any[]) {
  function walk(node: Node | null) {
    // 1. 获取注释节点信息，解析出 Island 的 id
    const tag =
      node!.nodeType === 8 &&
      ((node as Comment).data.match(/^\s*frsh-(.*)\s*$/) || [])[1];
    let endNode: Node | null = null;
    if (tag) {
      const startNode = node!;
      const children = [];
      const parent = node!.parentNode;
      // 拿到当前 Island 节点的所有子节点
      while ((node = node!.nextSibling) && node.nodeType !== 8) {
        children.push(node);
      }
      startNode.parentNode!.removeChild(startNode); // remove start tag node

      const [id, n] = tag.split(":");
      // 2. 单独渲染 Island 组件
      render(h(islands[id], props[Number(n)]), htmlElement);
      endNode = node;
    }
    // 3. 继续遍历 DOM 树，直到找到所有的 Island 节点
    const sib = node!.nextSibling;
    const fc = node!.firstChild;
    if (endNode) {
      endNode.parentNode?.removeChild(endNode); // remove end tag node
    }

    if (sib) walk(sib);
    if (fc) walk(fc);
  }
  walk(document.body);
}
```

至此，服务端和客户端渲染的过程都完成了，回头看整个过程，为什么说 Fresh 的构建过程是 Bundle-less 的呢？

我们不妨关注一下 Islands 组件是如何加载到客户端的。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a689f0f22b574298a9a9bde98a61681e~tplv-k3u1fbpfcp-zoom-1.image)

首先，服务端通过拦截 vnode 实现可以感知到项目中用到了哪些 Island 组件，比如 Counter 组件，那么服务端就会注入对应的 import 代码，并挂在到全局，通过 `<script type="module">` 的方式注入到 HTML 中。

浏览器执行这些代码时，会给服务端发起`/islands/Counter`的请求，服务端接收到请求，对 Counter 组件进行实时编译打包，然后将结果返回给浏览器，这样浏览器就能拿到 Esbuild 的编译产物并执行了。

所以这个过程是**完全发生在运行时**的，也就是说，我们不需要在一开始启动项目的时候就打包完所有的组件，而是在运行时做到按需构建，并且得益于 Esbuild 极快的构建速度，一般能达到毫秒级别的构建速度，对于服务来说运行时的压力并不大。

## 小结

以上就是本文的全部内容，分别从**框架定位**、**上手体验**、**优劣势评估**和**源码实现**来介绍了如今比较火的 Fresh 框架。

最后需要跟大家说明的是，Fresh 中关于 Islands 架构的实现是基于 Preact 的，我本人也借鉴了 Fresh 的思路，通过拦截 React.createElement 方法在 React 当中也实现了 Islands 架构，代码放在了 `react-islands`仓库中(地址: https://github.com/sanyuan0704/react-islands)，代码不多，相当于 Fresh 的简化版，感兴趣的小伙伴可以拉下来看看~
