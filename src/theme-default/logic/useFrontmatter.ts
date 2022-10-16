import { useState, useEffect } from 'react';
import { usePageData } from '@client';

export const useFrontmatter = () => {
  const pageData = usePageData();
  const [frontmatter, setFrontmatter] = useState(pageData.frontmatter);

  // #65
  // The frontmatter data changes require us to manually trigger the react rerender
  useEffect(() => {
    if (import.meta.env.DEV) {
      import.meta.hot?.on('md(x)-changed', ({ filePath }) => {
        import(/* @vite-ignore */ `${filePath}?import&t=${Date.now()}`).then(
          (mod) => {
            setFrontmatter(mod.frontmatter);
          }
        );
      });
    }
  }, []);

  return frontmatter;
};
