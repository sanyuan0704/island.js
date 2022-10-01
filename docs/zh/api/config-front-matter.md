# Front Matter 配置

## title

- Type: `string`

页面的标题。默认情况下，页面的 h1 标题将用作 HTML 文档的标题。但是如果你想使用不同的标题，你可以使用 Front Matter 来指定页面的标题。例如：

```md
---
title: 我的主页
---
```

## description

- Type: `string`

页面的自定义描述。例如：

```md
---
description: 这是我的主页
---
```

## pageType

- Type: `'home' | 'doc' | 'api' | 'custom' | '404'`
- Default: `'doc'`

页面的类型。默认情况下，页面类型为`doc`。但是如果你想使用不同的页面类型，你可以使用`pageType`前面的东西来指定页面类型。例如：

```md
---
pageType: home
---
```

## api

- Type: `boolean`
- Default: `false`

表示当前页为 api 页面。相当于`pageType: 'api'`：

```md
---
api: true
---
```

## hero

- Type: `Object`

`home` 页面的 hero 配置。它有以下类型：

```ts
export interface Hero {
  name: string;
  text: string;
  tagline: string;
  image?: {
    src: string;
    alt: string;
  };
  actions: {
    text: string;
    link: string;
    theme: 'brand' | 'alt';
  }[];
}
```

例如，你可以使用以下 Front Matter 来指定页面的 hero config：

```md
---
pageType: home

hero:
  name: Island
  text: Vite & Islands Arch Static Site Generator
  tagline: Simple, powerful, and performant. Meet the modern SSG framework you've always wanted.
  image:
    src: /island.png
    alt: Island
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: View on GitHub
      link: https://github.com/sanyuan0704/island
---
```

## features

- Type: `Array`
- Default: `[]`

`home` 页面的功能配置。它有以下类型：

```ts
export interface Feature {
  title: string;
  details: string;
  icon: string;
}

export type Features = Feature[];
```

例如，你可以使用以下前端内容来指定 `home` 页面的 features 配置：

```md
---
pageType: home

features:
  - title: "Vite: The DX that can't be beat"
    details: With Markdown-centered content, it's built to help you focus on writing and deployed with minimum configuration.
    icon: 🚀
  - title: 'MDX: The flexible way to write content'
    details: MDX is a powerful way to write content. You can use React components in Markdown.
    icon: 📦
---
```
