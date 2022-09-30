# SPA 模式

## 什么是 SPA 模式？

默认情况下，Island.js 将为每个页面生成一个静态站点，并注入部分组件 JavaScript 以使站点具有交互性。这就是所谓的`MPA`模式，在 MPA 中，每个页面都是一个单独的 HTML 文件，当你点击跳转到另一个页面时，浏览器会请求一个新的 HTML 文件。

另一方面，你也可以使用 `SPA` 模式来构建单页应用程序。在 SPA 模式下，Island.js 将生成单个 HTML 文件并注入所有 JavaScript 以使站点具有交互性。当你点击另一个页面时，浏览器不会请求新的 HTML 文件，而只会请求新的 javascript 文件来加载新页面。

## 如何使用？

在 Island.js 中，你可以通过配置文件来开启 SPA 模式：

```js
import { defineConfig } from 'islandjs';

export default defineConfig({
  enableSpa: true
});
```

使用 SPA 模式非常简单，但是 MPA 模式仍然是默认模式，也是我们推荐的模式，因为在 MPA 下 Island.js 采用 Islands 架构进行优化，拥有非常好的首屏性能。
