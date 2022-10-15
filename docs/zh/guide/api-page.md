# API 预览页

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

这样 Island.js 会自动为你解析该目录下其它子页面的文档结构，提取出其中的标题(h1、h2)信息，并生成 API 页面，并且，会根据你在配置文件中的 [`sidebar`](/en/api/config-theme#sidebar) 配置来对 API 文档进行分组展示。比如有如下的 `sidebar` 配置:

```ts
{
  '/api/': [
    {
      text: 'Config',
      items: [{ text: '1', link: '/api/1' }, { text: '2', link: '/api/2' }]
    },
    {
      text: 'Runtime',
      items: [{ text: '3', link: '/api/3' }, { text: '4', link: '/api/4' }]
    }
  ];
}
```

那么在 API 页面将会展示 `Config` 和 `Runtime` 两个分组。
