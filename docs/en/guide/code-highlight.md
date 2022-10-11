# Code Line Highlighting

Island.js supports highlighting of specified code lines. You can specify line highlighting in any of the following ways.

**Input:**

````bash
```js{4}
import { defineConfig } from 'islandjs';

export default defineConfig({
  themeConfig: {
    navbar: [
      {
        text: 'Home',
        link: '/',
        activeMatch: '^/$|^/'
      }
    ]
  }
});
```
````

**Output:**

```js{3}
import { defineConfig } from 'islandjs';

export default defineConfig({
  themeConfig: {
    navbar: [
      {
        text: 'Home',
        link: '/',
        activeMatch: '^/$|^/'
      }
    ]
  }
});
```

In addition to highlight the single line, you can also specify multiple lines to highlight at a time.

- A Line Range: {1-10}
- Multiple single lines: {1,3,5}
- Combine Line Range and Single Lines：{3,5-13,20}

**Input:**

````bash
```js{4-7,10}
import { defineConfig } from 'islandjs';

export default defineConfig({
  themeConfig: {
    navbar: [
      {
        text: 'Home',
        link: '/',
        activeMatch: '^/$|^/'
      }
    ]
  }
});
```
````

**Output:**

```js{4-7,10}
import { defineConfig } from 'islandjs';

export default defineConfig({
  themeConfig: {
    navbar: [
      {
        text: 'Home',
        link: '/',
        activeMatch: '^/$|^/'
      }
    ]
  }
});
```