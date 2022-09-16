import { Layout } from 'island/theme';
import { routes } from 'virtual:routes';
import { matchRoutes } from 'react-router-dom';
import siteData from 'island:site-data';
import { Route } from '../../node/plugin-routes';
import { omit } from './utils';
import { PageData } from '../../shared/types';
import { HelmetProvider } from 'react-helmet-async';

export async function waitForApp(path: string): Promise<PageData> {
  const matched = matchRoutes(routes, path)!;
  if (matched) {
    // Preload route component
    const mod = await (matched[0].route as Route).preload();
    return {
      siteData,
      pagePath: (matched[0].route as Route).filePath,
      ...omit(mod, ['default'])
    } as PageData;
  } else {
    return {
      siteData,
      pagePath: '',
      pageType: '404'
    };
  }
}

export function App({ helmetContext }: { helmetContext?: object }) {
  return (
    <HelmetProvider context={helmetContext}>
      <Layout />
    </HelmetProvider>
  );
}
