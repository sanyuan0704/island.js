import { renderToString } from 'react-dom/server';
import { App, waitForApp } from './app';
import { StaticRouter } from 'react-router-dom/server';
import { DataContext } from './hooks';

// For ssr component render
export async function render(
  pagePath: string,
  helmetContext: object,
  enableSpa: boolean
): Promise<{
  appHtml: string;
  propsData: any[];
  islandToPathMap: Record<string, string>;
  pageData: any;
}> {
  const pageData = await waitForApp(pagePath);
  const { data } = await import('island/jsx-runtime');
  // ----------------Start if ssr rendering -------------
  data.islandProps = [];
  data.islandToPathMap = {};
  const appHtml = renderToString(
    <DataContext.Provider value={pageData}>
      <StaticRouter location={pagePath}>
        <App helmetContext={helmetContext} />
      </StaticRouter>
    </DataContext.Provider>
  );
  const { islandToPathMap, islandProps } = data;
  // ----------------End if ssr rendering -------------
  // Above process is strictly synchronous, so there is no concurrency race problem about island.
  return {
    appHtml,
    islandToPathMap,
    propsData: islandProps,
    // Only spa need the hydrate data on window
    pageData: enableSpa ? pageData : null
  };
}

// For ssr renderer crawler all pages
export { routes } from 'virtual:routes';
