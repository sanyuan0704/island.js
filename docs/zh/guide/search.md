# 全文搜索

Island.js 默认主题内置了全文搜索功能，拥有如下特性：

- 👌 开箱即用，无需额外配置；
- 🔥 支持多语言搜索，如中文、英文、日文、韩文等；
- ✅ 支持标题、内容的全文搜索；
- ⬆️ 支持按键盘上下键选择搜索结果，按回车键跳转到对应页面；
- 🚀 高性能，基于 [`FlexSearch`](https://github.com/nextapps-de/flexsearch) 的纯客户端实现，零网络 IO 开销。

当然，你也可以通过配置关闭全文搜索功能:

```js
import { defineConfig } from 'islandjs';

export default defineConfig({
  themeConfig: {
    search: false
  }
});
```
