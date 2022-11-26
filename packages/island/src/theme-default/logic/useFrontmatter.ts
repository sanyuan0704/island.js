import { useState, useEffect } from 'react';
import { usePageData } from '@runtime';

export const useFrontmatter = () => {
  const pageData = usePageData();
  const [frontmatter, setFrontmatter] = useState(pageData.frontmatter);

  // #65
  // The frontmatter data changes require us to manually trigger the react rerender
  useEffect(() => {
    if (import.meta.env.DEV) {
      import.meta.hot?.on('md(x)-changed', ({ filePath, routePath }) => {
        console.log(pageData.routePath, routePath);
        import(/* @vite-ignore */ `${filePath}?import&t=${Date.now()}`).then(
          (mod) => {
            // fix: updates to non-Home md documents will trigger this event,resulting in loss of Home data
            pageData.routePath === routePath && setFrontmatter(mod.frontmatter);
          }
        );
      });
    }
  }, [pageData.routePath]);

  return frontmatter;
};
