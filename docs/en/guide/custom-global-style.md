# Add Global Styles

In some cases, you may need to add some global styles based on the theme UI. Island.js provides a convention directory that allows you to add global styles without modifying the theme.

## Usage

You can create a `styles` folder in the `.island` directory, for example:

```bash
.island
├── config.ts
└── styles
    └── index.css
```

Then add the following code:

```css
/* styles/index.css */
:root {
  --island-c-brand: #f00;
}
```

Island.js will automatically collect the global styles you defined in `styles/index.css`.
