# 默认主题 API

默认主题包含一系列的组件，你可以通过覆盖或者扩展这些组件来实现自定义主题。

## Layout

`Layout` 组件是主题的入口组件，它会被 Island.js 用来渲染整个文档站点的布局。

```tsx
// theme/index.tsx
import { Layout } from 'islandjs';
```

它通过 Props 提供了一系列的插槽来实现拓展，类型定义如下：

```tsx
interface LayoutProps {
  /* Home 页 Hero 部分之前 */
  beforeHero?: React.ReactNode;
  /* Home 页 Hero 部分之后 */
  afterHero?: React.ReactNode;
  /* Home 页 Features 部分之前 */
  beforeFeatures?: React.ReactNode;
  /* Home 页 Features 部分之后 */
  afterFeatures?: React.ReactNode;
  /* 正文页 Footer 部分之前 */
  beforeDocFooter?: React.ReactNode;
  /* 正文页最前面 */
  beforeDoc?: React.ReactNode;
  /* 正文页最后面 */
  afterDoc?: React.ReactNode;
  /* 左上角导航栏标题之前 */
  beforeNavTitle?: React.ReactNode;
  /* 左上角导航栏标题之后 */
  afterNavTitle?: React.ReactNode;
  /* 右侧大纲栏上面 */
  beforeOutline?: React.ReactNode;
  /* 右侧大纲栏下面 */
  afterOutline?: React.ReactNode;
  /* 整个页面最顶部 */
  top?: React.ReactNode;
  /* 整个页面最底部 */
  bottom?: React.ReactNode;
}
```

## HomeLayout

`HomeLayout` 组件是主题的 Home 页布局组件，它会被 Island.js 用来渲染 Home 页的布局。

```tsx
// theme/index.tsx
import { HomeLayout } from 'islandjs';
```

## NotFoundLayout

`NotFoundLayout` 组件是主题的 404 页面布局组件，它会被 Island.js 用来渲染 404 页面的布局。

## setup

`setup` 用来添加一个初始化的逻辑，比如全局事件绑定。

```tsx
// theme/index.tsx
import { setup } from 'islandjs';
```
