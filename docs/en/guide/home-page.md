# Home 页面

Island.js default theme has a built-in Home page, you can configure it by writing markdown Front Matter. Take a simple example:

```md
---
pageType: home

hero:
  name: Island
  text: Vite & MDX Powered Static Site Generator
---
```

First you need to set `pageType` to `home` so that Island.js will automatically generate the Home page for you. In addition to `pageType`, you can also configure the `hero` and `features` sections.

## hero

The `hero` part is the logo, introduction and jump button parts of the Home page, and its configuration is an object with the following types:

```ts
export interface Hero {
  // Logo name
  name?: string;
  // Logo introduction text
  text?: string;
  // Tagline text (optional to display below Logo)
  tagline?: string;
  // Logo image
  image?: HeroImage;
  // Jump button
  actions?: HeroAction[];
}

export interface HeroImage {
  // image address
  src: string;
  // alt text
  alt?: string;
}

export interface HeroAction {
  // Button, optional brand color or gray
  theme?: 'brand' | 'alt';
  text: string;
  link: string;
}
```

For example:

```md
---
pageType: home

hero:
  name: Island
  text: Vite & Mdx Powered Static Site Generator
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

The `features` section is the feature introduction section of the Home page, its configuration is an array, each element has the following types:

```ts
export interface Feature {
  // Feature title
  title: string;
  // Feature details
  details: string;
  // Feature icon, usually emoji
  icon: string;
}
```

For example:

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

## Footer

You can customize the footer of the Home page via `themeConfig.footer`. Its configuration is an object with the following types:

```ts
export interface Footer {
  // Copyright information (displayed at the very bottom)
  copyright?: string;
  // Footer text
  message?: string;
}
```

For example:

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
