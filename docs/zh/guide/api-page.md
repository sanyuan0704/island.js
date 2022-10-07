# API 页面

Island.js 默认主题内置了 API 页面。

假如你的项目中有如下的目录结构:

```bash
api
├── config-basic.md
├── config-extension.md
└── index.md
```

那么你只需要在 `api` 目录中的 `index.md` 中添加如下的内容即可:

```md
---
pageType: api
---
```

这样 Island.js 会自动为你解析该目录下其它子页面的文档结构，提取出其中的标题(h1、h2)信息，并生成 API 页面。
