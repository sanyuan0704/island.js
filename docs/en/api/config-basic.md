# Basic Config

## base

- Type: `string`
- Default: `/`

The base URL the site will be deployed at. You can set this to a subdirectory if you plan to deploy your site to a subdirectory of your domain.

For example, if you plan to deploy your site to `https://foo.github.io/bar/`, then you should set `base` to `"/bar/"`:

```js
import { defineConfig } from 'islandjs';

export default defineConfig({
  base: '/bar/'
});
```

## title

- Type: `string`
- Default: `"Island"`

The title of site. This will be used as the title of the home page and the title of the HTML document. For example:

```js
import { defineConfig } from 'islandjs';

export default defineConfig({
  title: 'my-site'
});
```

## description

- Type: `string`
- Default: `""`

The description of site. This will be used as the description of the home page and the description of the HTML document. For example:

```js
import { defineConfig } from 'islandjs';

export default defineConfig({
  description: 'This is my site.'
});
```

## icon

- Type: `string`
- Default: `""`

The icon of the site. This will be used as the icon of the home page and the icon of the HTML document. For example:

```js
import { defineConfig } from 'islandjs';

export default defineConfig({
  icon: '/icon.png'
});
```

Then Island.js will find your icon in the `public` directory.

## appearance

- Type: `boolean`
- Default: `true`

Whether to appear the dark mode/light mode toggle button. For example:

```js
import { defineConfig } from 'islandjs';

export default defineConfig({
  appearance: false
});
```

## outDir

- Type: `string`
- Default: `.island/dist`

The output directory for the built site. For example:

```js
import { defineConfig } from 'islandjs';

export default defineConfig({
  outDir: 'dist'
});
```
