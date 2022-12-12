# Extension Config

The extension config means that how to configure the build tool(Vite), the conventional route, the markdown parser and so on.

## vite

- Type: `Object`
- Default: `{}`

The custom config for [Vite](https://vitejs.dev/config/).And the config you passed in will be merged deeply with the default config of Vite. For example:

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

The conventional route custom config.The ability is implemented by a vite plugin.You can pass in the following options to customize the plugin behavior:

### route.include

- Type: `string[]`
- Default: `[]`

Add some extra files to the routing. By default, only the files in the root directory and all subdirectories will be included in the routing. If you want to add some extra files to the routing, you can use this option. For example:

```js
import { defineConfig } from 'islandjs';

export default defineConfig({
  route: {
    include: ['other-dir/**/*']
  }
});
```

> Notice: the string in the array supports glob pattern.

### route.exclude

- Type: `string[]`
- Default: `[]`

Exclude some files from the routing. For example:

```js
import { defineConfig } from 'islandjs';

export default defineConfig({
  route: {
    exclude: ['custom.tsx', 'component/**/*']
  }
});
```

> Notice: the string in the array supports glob pattern.

### route.extensions

- Type: `string[]`
- Default: `[]`

The extensions of the files that will be included in the routing. By default, Island.js will include all the `'js','jsx','ts','tsx','md','mdx'` files in the routing. If you want to add some extra extensions, you can use this option. For example:

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

The prefix of the filepath that will be converted to a route. For example:

```js
import { defineConfig } from 'islandjs';

export default defineConfig({
  route: {
    prefix: 'pages'
  }
});
```

Then the filepath `pages/foo/bar.md` in root dir will be converted to the route `/foo/bar`.

### route.root

- Type: `string`

The root dir of the routing. By default, the root dir is the param you specify in island cli command. If you want to change the root dir, you can use this option. For example:

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

The options for remark and rehype plugins.

### markdown.remarkPlugins

- Type: `Array`
- Default: `[]`

The remark plugins that will be used to parse markdown files. There are following plugins that will be used by default:

- [remark-gfm](https://www.npmjs.com/package/remark-gfm): Parse common markdown syntaxes `GFM` (GitHub Flavored Markdown).
- [remark-frontmatter](https://www.npmjs.com/package/remark-frontmatter): Parse front matter info in markdown files.
- [remark-mdx-frontmatter](https://www.npmjs.com/package/remark-mdx-frontmatter): Parse front matter info in mdx files.
- [remark-gemoji](https://www.npmjs.com/package/remark-gemoji): Turn gemoji shortcodes `(:+1:)` into emoji (:+1:).

You can also use this option to add some extra remark plugins. For example:

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

The rehype plugins that will be used to parse HTML. There are following plugins that will be used by default:

- [rehype-autolink-headings](https://www.npmjs.com/package/rehype-autolink-headings): Add anchor to headings.
- [rehype-slug](https://www.npmjs.com/package/rehype-slug): Add id to headings.
- [rehype-external-links](https://www.npmjs.com/package/rehype-external-links): Add `target="_blank"` to external links.

You can also use this option to add some extra rehype plugins. For example:

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
- Default: false

You can enable line numbers for each code blocks via config:

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

Configure the dead link check behavior of the document.

When a link in the documentation is not accessible properly, an error is thrown and the build is terminated.

:::danger
This configuration is off by default. When manually turned on, the build will be blocked under poor network conditions.
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
      // will enable the dead link check
      enable: true
    }
  }
});
```

### markdown.targetBlankWhiteList

- Type: `Array`
- Default: `['https://island-tutorial.sanyuan0704.top', 'https://island.sanyuan0704.top']`

External links within this configuration will be loaded on the current page.

By default, click on an external url and it will open in a new tab. Under the hood, `Island.js` converts an external url(starts with `http://` or `https://`) in md(x) to a `<a>` tag in html with setting `target="_blank"`. For links within this configuration, the `target` attribute will be assigned the value `_self` instead, so it will load on the current page.

The type of links could be `string` or `RegExp`, e.g.

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

You can use this option to add some babel options, such as babel plugins. For example:

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

The config will be merged into the default babel config in [`@vitejs/plugin-react`](https://github.com/vitejs/vite-plugin-react/tree/main/packages/plugin-react), which is internally used by `Island.js`.
