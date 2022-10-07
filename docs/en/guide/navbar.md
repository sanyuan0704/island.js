# NavBar

The nav bar is very important for a website. It allows users to quickly jump between different pages of the website, and also allows users to quickly find some important information on the website.

## Custom NavBar

You can add custom navbar in `themeConfig.navbar`:

```js
import { defineConfig } from 'islandjs';

export default defineConfig({
  themeConfig: {
    navbar: []
  }
});
```

The nav bar is configured as an array, each item in the array is a `NavItem` object, which has the following types:

```ts
export type NavItem = NavItemWithLink | NavItemWithChildren;
```

That is, each navbar element ( `NavItem` ) can be either a link ( `NavItemWithLink` ) or a navbar group with child elements ( `NavItemWithChildren` ).

### NavItemWithLink

```ts
export interface NavItemWithLink {
  text: string;
  link: string;
  activeMatch?: string;
}
```

The meaning of each attribute is as follows:

- `text` - nav item text
- `link` - nav item link
- `activeMatch` - activation rules for navbar links

`activeMatch` is used to match the current route. When the route matches the `activeMatch` rule, the nav item will be highlighted.

> By default, `activeMatch` is the NavItem's `link` property.

### NavItemWithChildren

```ts
export interface NavItemWithChildren {
  text: string;
  children: NavItem[];
}
```

The meaning of each attribute is as follows:

- `text` - navbar item text
- `children` - child nav items

### Example

```js
import { defineConfig } from 'islandjs';

export default defineConfig({
  themeConfig: {
    navbar: [
      {
        text: 'Home',
        link: '/',
        activeMatch: '^/$|^/'
      },
      {
        text: 'More Pages',
        children: [
          {
            text: 'Github',
            link: 'http://github.com/sanyuan0704/island.js',
          },
          {
            text: 'Twitter',
            link: 'http://twitter.com/sanyuan0704',
          },
      }
    ]
  }
});
```

## Appearance

The button that toggle the dark/light mode is automatically added to the navbar.But you can also close it manually:

```js
import { defineConfig } from 'islandjs';

export default defineConfig({
  appearance: false
});
```

## Social Links

You can add social links to the navbar:

```js
import { defineConfig } from 'islandjs';

export default defineConfig({
  themeConfig: {
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/sanyuan0704/island.js'
      }
    ]
  }
});
```

## Translations

When you set `themeConfig.locales`, the navbar will be automatically add menu group about translations. See details in [I18n](/en/guide/i18n).
