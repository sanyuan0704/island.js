# Front Matter Config

## title

- Type: `string`

The title of the page. By default, the h1 title of the page will be used as the title of the HTML document. But if you want to use a different title, you can use the `title` front matter to specify the title of the page. For example:

```md
---
title: My Page
---
```

## description

- Type: `string`

The custom description of the page. For example:

```md
---
description: This is my page.
---
```

## pageType

- Type: `'home' | 'doc' | 'api' | 'custom' | '404'`
- Default: `'doc'`

The type of the page. By default, the page type is `'doc'`. But if you want to use a different page type, you can use the `pageType` front matter to specify the page type. For example:

```md
---
pageType: home
---
```

## api

- Type: `boolean`
- Default: `false`

Enable api page.It's equal to `pageType: 'api'`:

```md
---
api: true
---
```

## hero

- Type: `Object`

The hero config of `home` page. It has following type:

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

For example, you can use the following front matter to specify the hero config of the page:

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

The features config of `home` page. It has following type:

```ts
export interface Feature {
  title: string;
  details: string;
  icon: string;
}

export type Features = Feature[];
```

For example, you can use the following front matter to specify the features config of `home` page:

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
