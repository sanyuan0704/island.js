# Search

The default theme of Island.js has a built-in full-text search function, which has the following features:

- 🔥 Support i18n, such as Chinese, English, Japanese, Korean, etc.
- ✅ Support full-text search of title and content.
- ⬆️ Support pressing the up and down keys on the keyboard to select the search result, and pressing the Enter key to jump to the corresponding page.
- 👌 No extra config and no server dependencies.

Of course, you can also turn off the full-text search function by following config:

```js
import { defineConfig } from 'islandjs';

export default defineConfig({
  themeConfig: {
    search: false
  }
});
```
