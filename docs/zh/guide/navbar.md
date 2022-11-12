# 导航栏模块

导航栏对一个网站来说非常重要，它可以让用户快速的在网站的不同页面之间进行跳转，也可以让用户快速的找到网站的一些重要信息。

## 自定义导航菜单

你可以在 `themeConfig.navbar` 中添加自定义的导航菜单，配置为一个数组，如下：

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

### NavItemWithLink

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

### NavItemWithChildren

```ts
export interface NavItemWithChildren {
  text: string;
  items: NavItem[];
}
```

其中各项属性的含义如下:

- `text` - 导航栏文本
- `items` - 子导航栏元素

### 示例

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
        items: [
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

## 白天/夜间模式

默认情况下导航栏会带上 `白天/夜间` 模式的切换按钮，你可以通过如下的配置禁用：

```js
import { defineConfig } from 'islandjs';

export default defineConfig({
  appearance: false
});
```

## 相关链接

你可以通过如下的配置添加相关链接，比如 `github` 链接、`twitter` 链接等。
相关链接支持三种模式：`链接模式link` `文本模式text` `图片模式img`，相关例子如下：

```js
import { defineConfig } from 'islandjs';

export default defineConfig({
  themeConfig: {
    socialLinks: [
      {
        icon: 'github',
        mode: 'link',
        content: 'https://github.com/sanyuan0704/island.js'
      },
      {
        icon: 'wechat',
        mode: 'text',
        content: '微信号xxx'
      },
      {
        icon: 'qq',
        mode: 'img',
        content: '/qrcode.png'
      }
    ]
  }
});
```

- 当`link`模式时，点击icon即可跳转链接
- 当`text`模式时，鼠标移到icon上会显示弹框，弹框内容是输入的文本
- 当`img`模式时，鼠标移到icon上会显示弹框，弹框内容是指定的图片，需要注意的是，图片需要放在`public`目录下

相关链接支持以下几种图片，通过icon属性来选择：

```ts
export type SocialLinkIcon =
  | 'discord'
  | 'facebook'
  | 'github'
  | 'instagram'
  | 'linkedin'
  | 'slack'
  | 'twitter'
  | 'youtube'
  | 'weixin'
  | 'qq'
  | 'juejin'
  | 'zhihu'
  | 'bilibili'
  | 'weibo'
  | { svg: string };
```

如果需要自定义icon，可以通过传入一个带有`svg属性`的对象，svg的值为自定义图标内容即可，比如：

```js
import { defineConfig } from 'islandjs';

export default defineConfig({
  themeConfig: {
    socialLinks: [
      {
        icon: {
          svg: 'svg图标内容'
        },
        mode: 'link',
        content: 'https://github.com/sanyuan0704/island.js'
      },
    ]
  }
});
```

## 国际化

当你配置了 `themeConfig.locales` 之后，导航栏会自动带上语言切换的菜单，你可以通过查看 [i18n](/zh/guide/i18n) 文档了解更多。
