# 正文页面

你可以配置正文页面的侧边栏、大纲等信息。

## 侧边栏

你可以在正文页面的 frontmatter 中配置侧边栏：

```md
---
sidebar: false
---
```

`sidebar` 的值为一个布尔值，如果为 `false`，则不会显示侧边栏。

## 大纲

### 关闭大纲

大纲信息将会呈现在右边的侧栏，你可以在正文页面的 frontmatter 中配置大纲信息：

```md
---
outline: false
---
```

`outline` 的值为一个布尔值，如果为 `false`，则不会显示大纲信息。

### 配置大纲标题

通过 `themeConfig.outlineTitle` 配置大纲的标题：

```js
import { defineConfig } from 'islandjs';

export default defineConfig({
  themeConfig: {
    outlineTitle: 'ON THIS PAGE'
  }
});
```

## 上一页/下一页

通过 `themeConfig.prevPageText` 或 `themeConfig.nextPageText` 配置上一页/下一页文本：

```js
import { defineConfig } from 'islandjs';

export default defineConfig({
  themeConfig: {
    prevPageText: 'Previous Page',
    nextPageText: 'Next Page'
  }
});
```

## 编辑链接

通过 `themeConfig.editLink` 配置编辑链接：

```js
import { defineConfig } from 'islandjs';

export default defineConfig({
  themeConfig: {
    editLink: {
      text: 'Edit this page on GitHub',
      pattern: 'https://github.com/sanyuan0704/island.js/tree/master/docs/:path'
    }
  }
});
```

## 上次更新

通过 `themeConfig.lastUpdatedText` 配置上次更新的显示文本：

```js
import { defineConfig } from 'islandjs';

export default defineConfig({
  themeConfig: {
    lastUpdatedText: 'Last Updated'
  }
});
```
