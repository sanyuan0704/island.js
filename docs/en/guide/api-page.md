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

In this way, Island.js will automatically parse the document structure of other subpages in the directory for you, extract the title (h1, h2) information, and generate the API page.
