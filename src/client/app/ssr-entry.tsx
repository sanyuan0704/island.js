import { renderToString } from 'react-dom/server';
import { App, waitForApp } from './app';
import { StaticRouter } from 'react-router-dom/server';
import { DataContext } from './hooks';
import {
  ISLAND_JSX_RUNTIME_PATH,
  PACKAGE_ROOT_PATH
} from '../../node/constants';

// For ssr component render
export async function render(pagePath: string): Promise<{
  appHtml: string;
  propsData: any[];
  islandToPathMap: Record<string, string>;
}> {
  const mod = await waitForApp(pagePath);
  const { data } = await import('island/jsx-runtime');
  data.ISLAND_PROPS = [];
  const appHtml = renderToString(
    <DataContext.Provider value={mod}>
      <StaticRouter location={pagePath}>
        <App />
      </StaticRouter>
    </DataContext.Provider>
  );
  const { islandToPathMap, ISLAND_PROPS } = data;
  return {
    appHtml,
    islandToPathMap,
    propsData: ISLAND_PROPS
  };
}

// For ssr renderer crawler all pages
export { routes } from 'virtual:routes';
