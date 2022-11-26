import { ComponentType, createContext, useContext } from 'react';
import { PageData } from '../shared/types';
import { inBrowser, addLeadingSlash, normalizeSlash } from '../shared/utils';
import { routes } from 'virtual:routes';
import { Route } from 'node/plugin-routes';
import baseUrl from 'island:base';

// Type shim for window.ISLANDS
declare global {
  interface Window {
    ISLANDS: Record<string, ComponentType<unknown>>;
    // The state for island.
    ISLAND_PROPS: Record<string, unknown[]>;
    ISLAND_PAGE_DATA: unknown;
  }
}

export const DataContext = createContext({
  data: inBrowser() ? window?.ISLAND_PAGE_DATA : null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  setData: (_data: PageData) => {}
});

export const usePageData = () => {
  return useContext(DataContext).data as PageData;
};

export const useSetPageData = (data: PageData) => {
  try {
    return useContext(DataContext).setData(data);
  } catch (e) {
    console.log(e);
  }
};

export const getAllPages = (
  filter: (route: Route) => boolean = () => true
): Promise<PageData[]> => {
  return Promise.all(
    routes.filter(filter).map(async (route) => {
      const mod = await route.preload();
      return {
        ...mod,
        routePath: route.path
      };
    })
  );
};

export function withBase(url = '/'): string {
  const normalizedBase = normalizeSlash(baseUrl);
  const normalizedUrl = addLeadingSlash(url);
  return `${normalizedBase}${normalizedUrl}`;
}

export function removeBase(url: string): string {
  const normalizedBase = normalizeSlash(baseUrl);
  return url.replace(normalizedBase, '');
}
