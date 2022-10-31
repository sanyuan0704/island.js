import { renderToString } from 'react-dom/server';
import { App, waitForApp } from './app';
import { StaticRouter } from 'react-router-dom/server';
import { DataContext } from './hooks';
import { PageData } from 'shared/types';

// For ssr component render
export async function render(
  pagePath: string,
  helmetContext: object,
  enableSpa: boolean
): Promise<{
  appHtml: string;
  propsData: unknown[];
  islandToPathMap: Record<string, string>;
  pageData: PageData | null;
}> {
  const pageData = (await waitForApp(pagePath)) as PageData;
  const { data } = await import('island/jsx-runtime');
  // ----------------Start if ssr rendering -------------
  data.islandProps = [];
  data.islandToPathMap = {};
  const appHtml = renderToString(
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    <DataContext.Provider value={{ data: pageData, setData: () => {} }}>
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
    propsData: islandProps as unknown[],
    // Only spa need the data on window
    pageData: enableSpa ? pageData : null
  };
}

// For ssr renderer crawler all pages
export { routes } from 'virtual:routes';
