# Custom Page

## Motivation

Sometimes you may want to add a custom page to your site. For example, you may want to add a page to introduce your team, or you may want to add a page to show your sponsors.

So Island.js provides a way to add a custom page to your site.

## Usage

You can create a new file such as `custom.tsx` in the root dir, then you can add the following code:

```tsx
export const pageType = 'custom';

export default function CustomPage() {
  return <div>Custom Page</div>;
}
```

Then you can visit `/custom` route to see the custom page. So there are some tips for the custom page:

- 1. The custom page should be a React component, which should be the default export of the file.
- 2. The custom page should has a `pageType` export, which should be `custom`.
