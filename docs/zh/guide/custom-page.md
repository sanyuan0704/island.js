# 自定义页面

## 为什么支持自定义页面？

某些情况下你可能希望将自定义页面添加到你的站点。例如，你可能想要添加一个页面来介绍团队，或者可能想要添加一个页面来展示 Sponsors。

因此除了用 md/mdx 文件来书写页面外， Island.js 也提供了一种向站点添加自定义页面的方法。

## 使用方法

你可以在根目录中创建一个新文件，例如 `custom.tsx`，然后可以添加以下代码：

```tsx
export const pageType = 'custom';

export default function CustomPage() {
  return <div>Custom Page</div>;
}
```

然后你可以访问 `/custom` 路由来查看自定义页面。其中有一些注意事项：

- 1. 自定义页面默认导出一个 React 组件。
- 2. 自定义页面应该有一个 `pageType = 'custom'` 的导出。
