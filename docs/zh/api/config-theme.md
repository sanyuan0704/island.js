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

- Type: `Object`

网站的侧边栏。配置为一个对象，类型如下：

```ts
// key 为 SidebarGroup 的路径
// value 为 SidebarGroup 的数组
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

## prevPageText

- Type: `string`
- Default: `Previous Page`

上一页的文本。比如:

```js
import { defineConfig } from 'islandjs';

export default defineConfig({
  themeConfig: {
    prevPageText: 'Previous Page'
  }
});
```

## nextPageText

- Type: `string`
- Default: `Next Page`

下一页的文本。比如:

```js
import { defineConfig } from 'islandjs';

export default defineConfig({
  themeConfig: {
    nextPageText: 'Next Page'
  }
});
```

## locales

- Type: `Object`
- Default: `undefined`

国际化配置。此配置为一个对象，key 为对应语言的路由前缀(如`/en`)，value 为`LocaleConfig`，类型如下:

```ts
export interface LocaleConfig {
  // 语言名称
  lang?: string;
  // HTML 标题，优先于 `themeConfig.title`
  title?: string;
  // HTML 描述，优先于 `themeConfig.description`
  description?: string;
  // 对应语言的显示文本
  label: string;
  // 导航栏配置
  nav?: NavItem[];
  // 侧边栏配置
  sidebar?: Sidebar;
  // 右侧大纲标题
  outlineTitle?: string;
  lastUpdatedText?: string;
  editLink?: EditLink;
  prevPageText?: string;
  nextPageText?: string;
}
```

因此你能看到，`LocaleConfig` 中包含许多与 `ThemeConfig` 中相同的配置项，包括:

- [nav](/zh/api/config-theme#nav)
- [sidebar](/zh/api/config-theme#sidebar)
- [editLink](/zh/api/config-theme#editlink)
- [lastUpdatedText](/zh/api/config-theme#lastupdatedtext)
- [outlineTitle](/zh/api/config-theme#outlinetitle)
- [prevPageText](/zh/api/config-theme#prevpagetext)
- [nextPageText](/zh/api/config-theme#nextpagetext)

但是 `LocaleConfig` 的优先级更高。所以它会覆盖 `themeConfig` 中的相应字段。
