# 导航栏模块

导航栏对一个网站来说非常重要，它可以让用户快速的在网站的不同页面之间进行跳转，也可以让用户快速的找到网站的一些重要信息。

Island.js 默认主题内置了导航栏模块，你可以在 `themeConfig.navbar` 中进行配置：

```js
import { defineConfig } from 'islandjs';

export default defineConfig({
  themeConfig: {
    navbar: []
  }
});
```

导航栏配置为一个数组，数组中的每一项都是一个 `NavItem` 对象，它具有以下类型：

```ts
export type NavItem = NavItemWithLink | NavItemWithChildren;
```

也就是说，每个导航栏元素( `NavItem` )可以是一个链接( `NavItemWithLink` )，也可以是一个包含子元素的导航栏组( `NavItemWithChildren` )。

## NavItemWithLink

```ts
export interface NavItemWithLink {
  text: string;
  link: string;
  activeMatch?: string;
}
```

其中各项属性的含义如下:

- `text` - 导航栏文本
- `link` - 导航栏链接
- `activeMatch` - 导航栏链接的激活规则

`activeMatch` 用于匹配当前路由，当路由匹配 `activeMatch` 规则时，nav 项会高亮显示。

> 默认情况下，`activeMatch` 是 NavItem 的 `link` 属性。

## NavItemWithChildren

```ts
export interface NavItemWithChildren {
  text: string;
  children: NavItem[];
}
```

其中各项属性的含义如下:

- `text` - 导航栏文本
- `children` - 子导航栏元素

## 示例

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
        text: '更多链接',
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
