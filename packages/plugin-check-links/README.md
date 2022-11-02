# @islandjs/plugin-check-links

[![npm version](https://badge.fury.io/js/%40islandjs%2Fplugin-check-links.svg)](https://badge.fury.io/js/%40islandjs%2Fplugin-check-links)

A plugin for [Island.js](https://github.com/sanyuan0704/island.js) to check links in markdown files.

## Install

```bash
# npm
npm install @islandjs/plugin-check-links
# yarn
yarn add @islandjs/plugin-check-links
# pnpm
pnpm install @islandjs/plugin-check-links
```

## Usage

```js
// .island/config.ts
import { pluginCheckLinks } from '@islandjs/plugin-check-links';
import { defineConfig } from 'islandjs';

export default defineConfig({
  plugins: [pluginCheckLinks()]
});
```

## Options

```ts
interface DeadLinkCheckOptions {
  /**
   * Exclude links
   */
  exclude?: (string | RegExp)[];
  /**
   * External link request timeout time
   */
  timeout?: number;
}
```
