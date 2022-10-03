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

- [remark-gfm](https://www.npmjs.com/package/remark-gfm): 解析常用 markdown 语法 `GFM`(GitHub Flavored Markdown)。
- [remark-frontmatter](https://www.npmjs.com/package/remark-frontmatter): 解析 Markdown 文件中的 Front Matter 信息。
- [remark-mdx-frontmatter](https://www.npmjs.com/package/remark-mdx-frontmatter): 解析 MDX 文件中的 Front Matter 信息。

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
