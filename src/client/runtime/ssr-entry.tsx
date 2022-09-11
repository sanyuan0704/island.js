import { renderToString } from 'react-dom/server';
import { App, waitForApp } from './app';
import { StaticRouter } from 'react-router-dom/server';
import { DataContext } from './hooks';

// For ssr component render
export async function render(pagePath: string): Promise<{
  appHtml: string;
  propsData: any[];
  islandToPathMap: Record<string, string>;
}> {
  const pageData = await waitForApp(pagePath);
  const { data } = await import('island/jsx-runtime');
  data.islandProps = [];
  const appHtml = renderToString(
    <DataContext.Provider value={pageData}>
      <StaticRouter location={pagePath}>
        <App />
      </StaticRouter>
    </DataContext.Provider>
  );
  const { islandToPathMap, islandProps } = data;
  return {
    appHtml,
    islandToPathMap,
    propsData: islandProps
  };
}

// For ssr renderer crawler all pages
export { routes } from 'virtual:routes';
