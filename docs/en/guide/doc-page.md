# Doc Page

The Island.js default theme has an built-in doc page.You can configure the its components by the following ways:

## Sidebar

Refer to the left sidebar.You can configure the sidebar in the front matter of the body page:

```md
---
sidebar: false
---
```

The value of `sidebar` is a boolean value, if `false`, the sidebar will not be shown.

## Outline

### Disable Outline

Outline information will be presented in the right sidebar, you can configure the outline information in the front matter of the body page:

```md
---
outline: false
---
```

The value of `outline` is a boolean value, if `false`, outline information won't be displayed.

### Outline Title Config

You can configure the title of the outline by `themeConfig.outlineTitle`:

```js
import { defineConfig } from 'islandjs';

export default defineConfig({
  themeConfig: {
    outlineTitle: 'ON THIS PAGE'
  }
});
```

## Prev/Next Page

You can configure the previous page text by `themeConfig.prevPageText` or `themeConfig.nextPageText`:

```js
import { defineConfig } from 'islandjs';

export default defineConfig({
  themeConfig: {
    prevPageText: 'Previous Page',
    nextPageText: 'Next Page'
  }
});
```

## Edit Link

You can configure the edit link by `themeConfig.editLink`:

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

## Last Updated Text

You can configure the last updated text by `themeConfig.lastUpdatedText`:

```js
import { defineConfig } from 'islandjs';

export default defineConfig({
  themeConfig: {
    lastUpdatedText: 'Last Updated'
  }
});
```
