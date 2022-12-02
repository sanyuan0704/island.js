# 能力扩展

Island.js 使用很简单，同时它也是灵活和可扩展的，因为它公开了很多接口来帮助你自定义框架的行为。

## Vite

作为 Island.js 的构建工具，Vite 也是可扩展的。你可以使用根配置中的 `vite` 字段来自定义 Vite 的行为。例如：

```ts
import { defineConfig } from 'islandjs';

export default defineConfig({
  vite: {
    // 然后你自定义的 vite 插件将与默认插件合并
    plugins: [
      // ...
    ]
  }
});
```

## 约定式路由

Island.js 通过 Vite 插件来约定式路由。你可以通过根配置中的 `route` 字段来自定义约定式路由的行为。例如：

```ts
import { defineConfig } from 'islandjs';

export default defineConfig({
  route: {
    // 这些文件将从路由中排除（支持 glob 模式）
    exclude: ['custom.tsx', 'component/**/*']
  }
});
```

你可以在 [扩展配置](/zh/api/config-extension#route) 中查看更多细节。

## Markdown

你可以使用根配置中的 `markdown` 字段自定义 Markdown 编译的行为。例如：

```ts
import { defineConfig } from 'islandjs';

export default defineConfig({
  markdown: {
    remarkPlugins: [],
    rehypePlugins: []
  }
});
```

你可以在[扩展配置](/zh/api/config-extension#markdown)中查看更多细节。
