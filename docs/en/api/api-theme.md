# Default Theme API

The default theme contains a series of components, you can implement custom themes by overriding or extending these components.

## Layout

The `Layout` component is the entry point component of the theme, which is used by Island.js to render the layout of the entire documentation site.

```tsx
// theme/index.tsx
import { Layout } from 'islandjs';
```

It provides a series of slots through Props to achieve expansion, and the types are defined as follows:

```tsx
interface LayoutProps {
  /* Before home hero */
  beforeHero?: React.ReactNode;
  /* After home hero */
  afterHero?: React.ReactNode;
  /* Before home features */
  beforeFeatures?: React.ReactNode;
  /* After home features */
  afterFeatures?: React.ReactNode;
  /* Before doc footer */
  beforeDocFooter?: React.ReactNode;
  /* Doc page front */
  beforeDoc?: React.ReactNode;
  /* Doc page end */
  afterDoc?: React.ReactNode;
  /* Before the title of the navigation bar in the upper left corner */
  beforeNavTitle?: React.ReactNode;
  /* After the title of the navigation bar in the upper left corner
   */
  afterNavTitle?: React.ReactNode;
  /* Above the right outline column */
  beforeOutline?: React.ReactNode;
  /* Below the outline column on the right */
  afterOutline?: React.ReactNode;
  /* Top of the entire page */
  top?: React.ReactNode;
  /* Bottom of the entire page */
  bottom?: React.ReactNode;
}
```

## HomeLayout

The `HomeLayout` component is the theme's home page layout component, which is used by Island.js to render the home page layout.

```tsx
// theme/index.tsx
import { HomeLayout } from 'islandjs';
```

## NotFoundLayout

The `NotFoundLayout` component is the theme's 404 page layout component, which is used by Island.js to render the 404 page layout.

## setup

`setup` is used to add an initialization logic, such as global event binding.

```tsx
// theme/index.tsx
import { setup } from 'islandjs';
```
