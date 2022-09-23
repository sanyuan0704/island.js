# Theme Config

The theme config is under the `themeConfig` in root config. For example:

```js
import { defineConfig } from 'islandjs';

export default defineConfig({
  themeConfig: {
    // ...
  }
});
```

## siteTitle

- Type: `string`
- Default: `"Island"`

The title of the site.Different from `title` in root config, this title will be used in the navbar. For example:

```js
import { defineConfig } from 'islandjs';

export default defineConfig({
  themeConfig: {
    siteTitle: 'my-site'
  }
});
```

## nav

- Type: `Array`
- Default: `[]`

The navigation bar of the site. The `nav` config is an array of `NavItem`, which has following type:

```ts
interface NavItem {
  // The text of the nav item
  text: string;
  // The link href will be entered when click the nav item
  link: '/';
  // The active match rule of the nav item, optional
  activeMatch: '^/$|^/';
}
```

The `activeMatch` is used to match the current route, and the nav item will be highlighted when the route matches the `activeMatch` rule.By default, the `activeMatch` is the `link` of the nav item.

For example:

```js
import { defineConfig } from 'islandjs';

export default defineConfig({
  themeConfig: {
    nav: [
      {
        text: 'Home',
        link: '/',
        activeMatch: '^/$|^/'
      }
    ]
  }
});
```

## sidebar

- Type: `Array` | `Object`

The sidebar of the site.

`sidebar` config has two form: `array` and `object`.

The `array` config is a list of `SidebarGroup`, which has following type:

```ts
interface SidebarGroup {
  // The text of the sidebar group
  text: string;
  // The child items of the sidebar group
  items: SidebarItem[];
}

type SidebarItem = {
  // The text of item
  text: string;
  // The link href of item
  link: string;
};
```

For example:

```js
import { defineConfig } from 'islandjs';

export default defineConfig({
  themeConfig: {
    sidebar: [
      {
        text: 'Guide',
        items: [
          {
            text: 'Getting Started',
            link: '/guide/getting-started'
          }
        ]
      }
    ]
  }
});
```

The `object` config is a map for `SidebarGroup`, which has following type:

```ts
Record<string, SidebarGroup[]>;
```

For example:

```js
import { defineConfig } from 'islandjs';

export default defineConfig({
  themeConfig: {
    sidebar: {
      '/guide/': [
        {
          text: 'Guide',
          items: [
            {
              text: 'Getting Started',
              link: '/guide/getting-started'
            }
          ]
        }
      ]
    }
  }
});
```

## editLink

- Type: `Object` | `undefined`
- Default: `undefined`

The edit link of the site.If it's undefined, the edit link feature will be disabled.

The `editLink` config is an object of `EditLink`, which has following type:

```ts
export interface EditLink {
  // Pattern for edit link.
  pattern: string;
  // Custom text for edit link.
  text?: string;
}
```

For example:

```js
import { defineConfig } from 'islandjs';

export default defineConfig({
  themeConfig: {
    editLink: {
      pattern:
        'https://github.com/sanyuan0704/island.js/tree/master/docs/:path',
      text: '📝 Edit this page on GitHub'
    }
  }
});
```

`:path` will be replaced by the current page path.

## lastUpdatedText

- Type: `string`
- Default: `"Last Updated"`

The text of last updated time.

For example:

```js
import { defineConfig } from 'islandjs';

export default defineConfig({
  themeConfig: {
    lastUpdatedText: 'Last Updated'
  }
});
```

## footer

- Type: `Object`
- Default: `{}`

The footer of the home site.

The `footer` config is an object of `Footer`, which has following type:

```ts
export interface Footer {
  message?: string;
  copyright?: string;
}
```

For example:

```js
import { defineConfig } from 'islandjs';

export default defineConfig({
  themeConfig: {
    footer: {
      message: 'Powered by Island.js',
      copyright: `© ${new Date().getFullYear()} Island.js`
    }
  }
});
```

## socialLinks

- Type: `Array`
- Default: `[]`

The social links of the site.

The `socialLinks` config is an array of `SocialLink`, which has following type:

```ts
export interface SocialLink {
  icon: SocialLinkIcon;
  link: string;
}
```

For example:

```js
import { defineConfig } from 'islandjs';

export default defineConfig({
  themeConfig: {
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/sanyuan0704/island'
      }
    ]
  }
});
```

> In current version(v0.1.5), the `icon` only supports `github`.

## outlineTitle

- Type: `string`
- Default: 'ON THIS PAGE'

Configure the title of the outline in the right sidebar.

For example:

```js
import { defineConfig } from 'islandjs';

export default defineConfig({
  themeConfig: {
    outlineTitle: 'ON THIS PAGE'
  }
});
```
