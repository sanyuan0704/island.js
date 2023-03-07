# Configure your site

## Create config file

If you use `create-island` to create a project, you will get the following template directory structure:

```bash
.
├── docs
│   ├── .island
│   │   └── config.ts
│   ├── article
│   │   ├── astro.md
│   │   └── fresh.md
│   ├── public
│   │   └── logo.png
│   └── index.md
├── package.json
├── pnpm-lock.yaml
└── README.md
```

The template already contains the config file, which is `.island/config.ts`. Therefore, you don't need to create a config file manually. You can skip the rest of this section.

But if you initialize the project manually, the page is very simple without any config. You can config and customize the site by adding a config file `.island/config.ts`.

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

For the above config options, the `create-island` template already has some default config, you can use it directly. But at the same time, you can also modify it according to your needs to meet your needs.

You can get more config details about the sidebar config in [API Page](/en/api/index).
