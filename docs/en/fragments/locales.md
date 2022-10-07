```ts
export interface LocaleConfig {
  // language name
  lang?: string;
  // HTML title
  title?: string;
  // HTML description
  description?: string;
  // Display text in corresponding language
  label: string;
  // Navbar config, of the same type as `themeConfig.nav`
  nav?: NavItem[];
  // Sidebar config, of the same type as `themeConfig.sidebar`
  sidebar?: Sidebar;
  // Outline title
  outlineTitle?: string;
  // The text of the last updated time
  lastUpdatedText?: string;
  // The text of the edit link
  editLink?: EditLink;
  // The text of the prev page
  prevPageText?: string;
  // The text of the next page
  nextPageText?: string;
}
```

As you see, there are many fields in `themeConfig` that can be also configured in `LocaleConfig`, including:

- [nav](/en/api/config-theme#nav)
- [sidebar](/en/api/config-theme#sidebar)
- [editLink](/en/api/config-theme#editlink)
- [lastUpdatedText](/en/api/config-theme#lastupdatedtext)
- [outlineTitle](/en/api/config-theme#outlinetitle)
- [prevPageText](/en/api/config-theme#prevpagetext)
- [nextPageText](/en/api/config-theme#nextpagetext)

But the `LocaleConfig` has higher priority.So it will override the corresponding field in `themeConfig`.
