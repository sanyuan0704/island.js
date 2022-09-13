import { Layout } from 'island/theme';
import { routes } from 'virtual:routes';
import { matchRoutes } from 'react-router-dom';
import siteData from 'island:site-data';
import { Route } from '../../node/plugin-routes';
import { omit } from './utils';
import { PageData } from '../../shared/types';

export async function waitForApp(path: string): Promise<PageData> {
  const matched = matchRoutes(routes, path)!;
  if (matched) {
    const mod = await (matched[0].route as Route).preload();

    return {
      siteData,
      ...omit(mod, ['default'])
    } as PageData;
  } else {
    return {
      siteData,
      pageType: '404'
    };
  }
}

export function App() {
  return <Layout />;
}
