# Search

The default theme of Island.js has a built-in full-text search function, which has the following features:

- 👌 Out of the box, no extra configuration is required.
- 🔥 Support i18n, such as Chinese, English, Japanese, Korean, etc.
- ✅ Support full-text search of title and content.
- ⬆️ Support pressing the up and down keys on the keyboard to select the search result, and pressing the Enter key to jump to the corresponding page.
- 🚀 High performance, based on [`FlexSearch`](https://github.com/nextapps-de/flexsearch) which means the search speed is very fast, and pure client-side search, no network request.

Of course, you can also turn off the full-text search function by following config:

```js
import { defineConfig } from 'islandjs';

export default defineConfig({
  themeConfig: {
    search: false
  }
});
```
