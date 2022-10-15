# 自定义全局样式

某些场景下，你可能需要在主题 UI 的基础上添加一些全局样式，Island.js 提供了一个约定式目录让你能够在不修改主题的情况下添加全局样式。

## 使用方法

你可以在 `.island` 目录中创建一个 `styles` 文件夹，比如：

```bash
.island
├── config.ts
└── styles
    └── index.css
```

然后可以添加以下代码：

```css
/* styles/index.css */
:root {
  --island-c-brand: #f00;
}
```

这样 Island.js 会自动收集你在 `styles/index.css` 中定义的全局样式。
