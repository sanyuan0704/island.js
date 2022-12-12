# 扩展配置

扩展配置是指如何配置构建工具（Vite）、常规路由、markdown 解析器等。

## vite

- Type: `Object`
- Default: `{}`

[Vite](https://vitejs.dev/config/) 的自定义配置。你传入的配置将与 Vite 的默认配置深度合并。例如：

```js
import { defineConfig } from 'islandjs';

export default defineConfig({
  vite: {
    // Then your vite plugins will be merged with the default plugins
    plugins: [
      // ...
    ]
  }
});
```

当然你也可以通过命令行选项来添加 vite 配置，但是仅限于`island build docs`与`island dev docs`命令（我们的构建预览并没有使用 vite），目前支持的命令行选项可以通过`--help`命令来获取：

```js
island build --help
island dev --help
```

## route

- Type: `Object`

自定义路由自定义配置。该能力是通过一个 Vite 插件实现的。你可以传入以下选项来自定义插件的行为：

### route.include

- Type: `string[]`
- Default: `[]`

在路由中添加一些额外的文件。默认情况下，只有根目录和所有子目录中的文件才会包含在路由中。如果你想在路由中添加一些额外的文件，你可以使用这个选项。例如：

```js
import { defineConfig } from 'islandjs';

export default defineConfig({
  route: {
    include: ['other-dir/**/*']
  }
});
```

> 注意：数组中的字符串支持 glob 模式。

### route.exclude

- Type: `string[]`
- Default: `[]`

从路由中排除一些文件。例如：

```js
import { defineConfig } from 'islandjs';

export default defineConfig({
  route: {
    exclude: ['custom.tsx', 'component/**/*']
  }
});
```

> 注意：数组中的字符串支持 glob 模式。

### route.extensions

- Type: `string[]`
- Default: `[]`

将包含在路由中的文件的扩展名。默认情况下，Island.js 会在路由中包含所有 `'js'、'jsx'、'ts'、'tsx'、'md'、'mdx' 文件。如果你想添加一些额外的扩展，你可以使用这个选项。例如：

```js
import { defineConfig } from 'islandjs';

export default defineConfig({
  route: {
    extensions: ['vue']
  }
});
```

### route.prefix

- Type: `string`
- Default: ``

将被转换为路由的文件路径的前缀。例如：

```js
import { defineConfig } from 'islandjs';

export default defineConfig({
  route: {
    prefix: 'pages'
  }
});
```

比如根目录中的文件路径 `pages/foo/bar.md` 将被转换为路由 `/foo/bar`。

### route.root

- Type: `string`

路由的根目录。默认情况下，根目录是你在 island cli 命令中指定的参数。如果要更改根目录，可以使用此选项。例如：

```js
import { defineConfig } from 'islandjs';

export default defineConfig({
  route: {
    root: 'docs'
  }
});
```

## markdown

- Type: `Object`

remark 和 rehype 插件的选项。

### markdown.remarkPlugins

- Type: `Array`
- Default: `[]`

用于解析 markdown 文件的备注插件。默认情况下将使用以下插件：

- [remark-gfm](https://www.npmjs.com/package/remark-gfm): 解析常用 markdown 语法 `GFM` (GitHub Flavored Markdown)。
- [remark-frontmatter](https://www.npmjs.com/package/remark-frontmatter): 解析 Markdown 文件中的 Front Matter 信息。
- [remark-mdx-frontmatter](https://www.npmjs.com/package/remark-mdx-frontmatter): 解析 MDX 文件中的 Front Matter 信息。
- [remark-gemoji](https://www.npmjs.com/package/remark-gemoji): 将 gemoji 缩写 `(:+1:)` 转换为 emoji (:+1:)。

你还可以使用此选项添加一些额外的 remark 插件。例如：

```js
import { defineConfig } from 'islandjs';

export default defineConfig({
  markdown: {
    remarkPlugins: [
      // ...
    ]
  }
});
```

### markdown.rehypePlugins

- Type: `Array`
- Default: `[]`

将用于解析 HTML 的 rehype 插件。默认情况下将使用以下插件：

- [rehype-autolink-headings](https://www.npmjs.com/package/rehype-autolink-headings): 向标题添加锚点(a 标签)。
- [rehype-slug](https://www.npmjs.com/package/rehype-slug): 在标题中添加 id。
- [rehype-external-links](https://www.npmjs.com/package/rehype-external-links): 将 `target="_blank"` 添加到外部链接。

你还可以使用此选项添加一些额外的 rehype 插件。例如：

```js
import { defineConfig } from 'islandjs';

export default defineConfig({
  markdown: {
    rehypePlugins: [
      // ...
    ]
  }
});
```

### markdown.lineNumbers

- Type: `Boolean`,
- Default: `false`

是否给代码块加上行号，默认是不展示。

```js
import { defineConfig } from 'islandjs';

export default defineConfig({
  markdown: {
    lineNumbers: true
  }
});
```

### markdown.checkLink

- Type: `Object`
- Default: `null`

配置文档的链接检查功能。

当文档中的链接无法正常访问时，会抛出错误并终止构建。

:::danger
该配置默认关闭。当手动开启后，在网络状况不好的情况下会阻塞构建
:::

```js
import { defineConfig } from 'islandjs';

export default defineConfig({
  markdown: {
    checkLink: {
      exclude: ['github.com'],
      timeout: 30000
    },
    checkLink: {
      // 将会开启死链检查功能
      enable: true
    }
  }
});
```

### markdown.targetBlankWhiteList

- Type: `Array`
- Default: `['https://island-tutorial.sanyuan0704.top', 'https://island.sanyuan0704.top']`

这个配置内的外部链接将在当前页面加载。

默认情况下，点击一个外部链接，其会在新标签页打开，然而在某些情况下，我们可能并不希望这么做。`Island.js` 会在内部将 md(x) 文件中的外部 urls（以 `http://` 或 `https://` 开头）转化为 html 中的 `<a>` 标签，并为其设置 `target="_blank"`。对于此配置内的链接，其 `target` 属性会被赋值为 `_self`，因此其会在当前页面加载。

链接的类型即可以是 `string`，也可以是 `RegExp`，例如：

```js
import { defineConfig } from 'islandjs';

export default defineConfig({
  markdown: {
    targetBlankWhiteList: [
      'https://github.com/sanyuan0704/island.js/',
      /^(http|https):\/\/.*vite.*/i
    ]
  }
});
```

## babel

你可以通过 `babel` 字段配置 babel 相关的选项，控制 JS(X)/TS(X) 的编译行为。比如：

```js
import { defineConfig } from 'islandjs';

export default defineConfig({
  babel: {
    plugins: [
      // ...
    ]
  }
});
```

你传入的 babel 配置会被合并到默认的 [`@vitejs/plugin-react`](https://github.com/vitejs/vite-plugin-react/tree/main/packages/plugin-react) 的 babel 配置中
