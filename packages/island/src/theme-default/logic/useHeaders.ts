import { useEffect, useState } from 'react';
import { Header } from 'shared/types/index';

export function useHeaders(initHeaders: Header[], pagePath: string) {
  const [headers, setHeaders] = useState(initHeaders || []);
  useEffect(() => {
    // Handle aside hmr:
    // When mdx file changed, server will send a custom event to client.
    // Then we listen the event and pull the latest page module so we can get and render the new headers.
    if (import.meta.env.DEV) {
      import.meta.hot?.on('md(x)-changed', ({ filePath }) => {
        if (filePath !== pagePath) {
          return;
        }
        import(/* @vite-ignore */ `${filePath}?import&t=${Date.now()}`).then(
          (mod) => {
            setHeaders(mod.toc);
          }
        );
      });
    }
  }, [pagePath]);

  return [headers, setHeaders] as [Header[], typeof setHeaders];
}
