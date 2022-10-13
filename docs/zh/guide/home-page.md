# Home 主页

Island.js 默认主题内置了 Home 页面，你可以通过书写 markdown 的 Front Matter 来配置它。举个简单的例子：

```md
---
pageType: home

hero:
  name: Island
  text: Vite & MDX Powered Static Site Generator
---
```

首先你需要将 `pageType` 设为 `home`，这样 Island.js 会自动为你生成 Home 页面。除了 `pageType`，你还可以配置 `hero` 和 `features` 两个部分。

## hero

`hero` 部分是 Home 页面的 Logo、简介及跳转按钮部分，它的配置是一个对象，有以下类型：

```ts
export interface Hero {
  // Logo 名字
  name?: string;
  // Logo 简介文本
  text?: string;
  // 标语文本 (显示在 Logo 下方可选)
  tagline?: string;
  // Logo 图片
  image?: HeroImage;
  // 跳转按钮
  actions?: HeroAction[];
}

export interface HeroImage {
  // 图片地址
  src: string;
  // 图片 alt 文本
  alt?: string;
}

export interface HeroAction {
  // 按钮，可选为主题(brand)色或者灰色
  theme?: 'brand' | 'alt';
  text: string;
  link: string;
}
```

举个例子:

```md
---
pageType: home

hero:
  name: Island
  text: Vite & MDX Powered Static Site Generator
  tagline: Simple, powerful, and performant. Meet the modern SSG framework you've always wanted.
  image:
    src: /island.png
    alt: Island
  actions:
    - theme: brand
      text: Get Started
      link: /en/guide/getting-started
    - theme: alt
      text: View on GitHub
      link: https://github.com/sanyuan0704/island
---
```

## features

`features` 部分是 Home 页面的特性介绍部分，它的配置是一个数组，每个元素有以下类型：

```ts
export interface Feature {
  // Feature 标题
  title: string;
  // Feature 详细介绍
  details: string;
  // Feature 图标，一般为 emoji
  icon: string;
}
```

举个例子:

```md
features:

- title: "Vite: The DX that can't be beat"
  details: With Markdown-centered content, it's built to help you focus on writing and deployed with minimum configuration.
  icon: 🚀
- title: 'MDX: The flexible way to write content'
  details: MDX is a powerful way to write content. You can use React components in Markdown.
  icon: 📦
- title: 'Islands Arch: The higher performance in production'
  details: Designed to be islands architecture, means less javascript bundle, partial hydration and better performance about FCP, TTI.
  icon: ✨
```

## 页脚

你可以通过 `themeConfig.footer` 来自定义 Home 页面的页脚。它的配置是一个对象，有以下类型：

```ts
export interface Footer {
  // 版权信息(显示在最底部)
  copyright?: string;
  // 页脚文本
  message?: string;
}
```

举个例子:

```js
import { defineConfig } from 'islandjs';

export default defineConfig({
  themeConfig: {
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2022-present Xingyuan Yang'
    }
  }
});
```
