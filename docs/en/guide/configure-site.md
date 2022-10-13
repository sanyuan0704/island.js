# Configure your site

## Create config file

Without any configuration, the page is pretty minimal, which has no navigation and no sidebar. However, you can configure the site by `.island/config.ts` file and custom your own site.

For example, in the initial project created by previous guide, you can add the config file and the project structure will be like this:

```bash
.
├─ docs
│  ├─ .island
│  │  └─ config.ts
│  └─ index.md
└─ package.json
```

You can try to add the following config code in `config.ts`:

```ts
import { defineConfig } from 'islandjs';

export default defineConfig({
  title: 'my-site'
});
```

There are some tips for the config file:

- 1. Island.js support `.js`、`.ts`、`.mjs`、`.cjs` file as config file. However, it is recommended to use TypeScript config because you can use `defineConfig` to get type hint.

- 2. config file should has a default export, which is a `SiteConfig` object.

In above example, we set the `title` of the site to `my-site`, then you can start the dev server by `yarn dev`.You will see the title of the site has been changed to `my-site`. This means you have awake your first site config, wonderful!

In next section, we will introduce nav and sidebar config, which is very important for a doc site.

## Nav config

The nav config is used to config the navigation of the site, which has following structure:

```ts
import { defineConfig } from 'islandjs';

export default defineConfig({
  themeConfig: {
    nav: [
      {
        text: 'Home',
        link: '/',
        activeMatch: '^/$|^/'
      }
    ]
  }
});
```

The `activeMatch` is used to match the current route, and the nav item will be highlighted when the route matches the `activeMatch` rule.

## Sidebar config

The sidebar config is used to config the sidebar of the site, which has following structure:

```ts
import { defineConfig } from 'islandjs';
export default defineConfig({
  themeConfig: {
    sidebar: {
      '/guide/': [
        {
          text: 'Guide',
          items: [
            {
              text: 'Getting Started',
              link: '/guide/getting-started'
            }
          ]
        }
      ]
    }
  }
});
```

You can get more config details about the sidebar config in [API Page](/en/api/index).
