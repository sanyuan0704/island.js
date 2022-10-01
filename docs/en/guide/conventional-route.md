# Conventional Route

## What is Conventional Route

Island.js uses a file system routing, and the file path of the page will be simply mapped as a routing path, which will make the routing of the entire project very intuitive.

For example, if you have a file named `foo.md` in the `docs` directory, then the routing path of this file will be `/foo`.

## Mapping Rules

Island.js will automatically scan the root directory and all subdirectories, and map the file path to the routing path. For example, if you have following file structure:

```bash
docs
├── foo
│   └── bar.md
└── foo.md
```

> In previous getting-started project, the start script is `island dev docs`, so the root directory is `docs`.

Then the routing path of `bar.md` will be `/foo/bar`, and the routing path of `foo.md` will be `/foo`.

The specific mapping rules are as follows:

| File path       | Routing path |
| --------------- | ------------ |
| `index.md`      | `/`          |
| `/foo.md`       | `/foo`       |
| `/foo/bar.md`   | `/foo/bar`   |
| `/zoo/index.md` | `/zoo`       |

## Custom Behavior

If you want to customize the routing behavior, you can use the `route` field in the root config. For example:

```ts
import { defineConfig } from 'islandjs';

export default defineConfig({
  route: {
    // These files will be excluded from the routing (support glob pattern)
    exclude: ['custom.tsx', 'component/**/*']
    // These files will be included in the routing (support glob pattern)
    include: ['other-dir/**/*'],
  }
});
```

You can see more details in [Config Extension](/en/api/config-extension).
