# 主题配置

主题配置位于根配置中的 `themeConfig` 下。例如：

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

站点的标题。与根配置中的 `title` 不同，此标题将用于导航栏中。比如：

```js
import { defineConfig } from 'islandjs';

export default defineConfig({
  themeConfig: {
    siteTitle: '我的主页'
  }
});
```

## nav

- Type: `Array`
- Default: `[]`

网站的导航栏。 `nav` 配置是 `NavItem` 的数组，具有以下类型：

```ts
interface NavItem {
  // 导航栏文本
  text: string;
  // 导航栏链接
  link: '/';
  // 导航栏链接的激活规则
  activeMatch: '^/$|^/';
}
```

`activeMatch` 用于匹配当前路由，当路由匹配 `activeMatch` 规则时，nav 项会高亮显示。默认情况下，`activeMatch` 是 nav 项的 `link`。

比如:

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

网站的侧边栏。配置是 `SidebarGroup` 的映射类型，具有以下类型：

```ts
type Sidebar = Record<string, SidebarGroup[]>;

interface SidebarGroup {
  text: string;
  items: SidebarItem[];
}

type SidebarItem = {
  text: string;
  link: string;
};
```

比如:

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

站点的编辑链接。如果未定义，编辑链接功能将被禁用。

`editLink` 配置是 `EditLink` 的一个对象，它具有以下类型：

```ts
export interface EditLink {
  pattern: string;
  text?: string;
}
```

比如：

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

`:path` 将被当前页面路径替换。

## lastUpdatedText

- Type: `string`
- Default: `"Last Updated"`

上次更新时间的文本。比如：

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

主页的页脚。

`footer` 配置是 `Footer` 的一个对象，它具有以下类型：

```ts
export interface Footer {
  message?: string;
  copyright?: string;
}
```

比如：

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

网站的社交链接。

`socialLinks` 配置是 `SocialLink` 的数组，具有以下类型：

```ts
export interface SocialLink {
  icon: SocialLinkIcon;
  link: string;
}
```

比如：

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

> 在当前版本中，`icon` 只支持 `github`

## outlineTitle

- Type: `string`
- Default: 'ON THIS PAGE'

在右侧边栏中配置大纲的标题。

比如:

```js
import { defineConfig } from 'islandjs';

export default defineConfig({
  themeConfig: {
    outlineTitle: 'ON THIS PAGE'
  }
});
```
