# Extension

Island.js is simple but it is also flexible and extensible because it exposes a lot of ways to help you customize the behavior of the framework.

## Vite

As the build tool of Island.js, Vite is also extensible. You can use the `vite` field in the root config to customize the behavior of Vite. For example:

```ts
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

## Conventional Route

The conventional route is implemented by a vite plugin. You can pass in the options to customize the plugin behavior. For example:

```ts
import { defineConfig } from 'islandjs';

export default defineConfig({
  route: {
    // These files will be excluded from the routing (support glob pattern)
    exclude: ['custom.tsx', 'component/**/*']
  }
});
```

You can see more details in [Config Extension](/en/api/config-extension#route).

## Markdown

You can customize the behavior of markdown compilation by using the `markdown` field in the root config. For example:

```ts
import { defineConfig } from 'islandjs';

export default defineConfig({
  markdown: {
    remarkPlugins: [],
    rehypePlugins: []
  }
});
```

See more details in [Config Extension](/en/api/config-extension#markdown).
