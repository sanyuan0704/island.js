import { Layout } from 'island/theme';
import { routes } from 'virtual:routes';
import { matchRoutes, useLocation } from 'react-router-dom';
import siteData from 'island:site-data';
import { Route } from '../../node/plugin-routes';
import { omit } from './utils';
import { PageData } from '../../shared/types';
import { HelmetProvider } from 'react-helmet-async';
import { useEffect } from 'react';

export async function waitForApp(path: string): Promise<PageData> {
  const matched = matchRoutes(routes, path)!;
  if (matched) {
    // Preload route component
    const mod = await (matched[0].route as Route).preload();
    console.log(mod);
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

export function App({
  helmetContext,
  setPageData
}: {
  helmetContext?: object;
  setPageData?: React.Dispatch<React.SetStateAction<PageData>>;
}) {
  const { pathname } = useLocation();
  useEffect(() => {
    async function refetchData() {
      setPageData && setPageData(await waitForApp(pathname));
    }
    refetchData();
  }, [pathname]);

  return (
    <HelmetProvider context={helmetContext}>
      <Layout />
    </HelmetProvider>
  );
}
