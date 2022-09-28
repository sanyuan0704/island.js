# SPA Mode

## What is SPA Mode?

By default, Island.js will generate a static site for every page and inject partial component javascript to make the site interactive. That's called `MPA` mode, in winch every page is a separate HTML file and when you click to another page, the browser will request a new HTML file.

On the other hand, you can use `SPA` mode to build a single page application. In SPA mode, Island.js will generate a single HTML file and inject all the javascript to make the site interactive. When you click to another page, the browser will not request a new HTML file, but only request a new javascript file to load the new page.

As well as we analyzed before([MPA vs SPA](/en/guide/spa-vs-mpa)), SPA mode will have better performance and experience in subsequent pages, but with complete hydration and client script in the first page, the first page load performance will be worse than MPA mode.

## How to use?

You can use `enableSpa` option to enable SPA mode:

```js
import { defineConfig } from 'islandjs';

export default defineConfig({
  enableSpa: true
});
```

It's so easy to use SPA mode, but MPA mode is still the default mode because Island.js do the best optimize in MPA mode which is most different from other SSG frameworks.
