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

- [remark-gfm](https://www.npmjs.com/package/remark-gfm): Parse common markdown syntaxes `GFM`(GitHub Flavored Markdown).
- [remark-frontmatter](https://www.npmjs.com/package/remark-frontmatter): Parse front matter info in markdown files.
- [remark-mdx-frontmatter](https://www.npmjs.com/package/remark-mdx-frontmatter): Parse front matter info in mdx files.

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
