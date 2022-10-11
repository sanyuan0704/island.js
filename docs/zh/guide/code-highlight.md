# 指定代码行高亮

Island.js 支持指定代码行的高亮显示。你可以用以下任意方式指定代码行高亮。

**输入：**

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

**输出：**

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

除了单行之外，你还可以同时指定多行代码高亮。

- 指定一个范围：{1-10}
- 指定多个单行：{1,3,5}
- 多行和单行结合：{3,5-13,20}

**输入：**

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

**输出：**

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