# API Page

The Island.js default theme has an built-in API page.

Suppose your project has the following directory structure:

```bash
api
├── config-basic.md
├── config-extension.md
└── index.md
```

Then you just need to add the following to `index.md` in the `api` directory:

```md
---
pageType: api
---
```

In this way, Island.js will automatically parse the document structure of other subpages in the directory for you, extract the title (h1, h2) information, and generate the API page.What's more, Island.js will group the API documentation according to your [`sidebar`](/en/api/config-theme#sidebar) config in the config file. For example, the following `sidebar` config:

```ts
{
  '/api/': [
    {
      text: 'Config',
      items: [{ text: '1', link: '/api/1' }, { text: '2', link: '/api/2' }]
    },
    {
      text: 'Runtime',
      items: [{ text: '3', link: '/api/3' }, { text: '4', link: '/api/4' }]
    }
  ];
}
```

Then the API page will display two groups of `Config` and `Runtime`.
