/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly ENABLE_SPA: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '@theme*' {
  import { ComponentType, Component, HtmlHTMLAttributes } from 'react';

  export const Layout: ComponentType<unknown>;
  export const HomeLayout: ComponentType<unknown>;
  export const NotFoundLayout: ComponentType<unknown>;
  export const setup: () => void;
}

declare module 'island:site-data' {
  import { DefaultTheme, SiteData } from 'shared/types';
  const siteData: SiteData<DefaultTheme.Config>;
  export default siteData;
}

declare module 'island:base' {
  const baseUrl: string;
  export default baseUrl;
}

declare module 'island/jsx-runtime' {
  export const data : {
    islandToPathMap: MediaRecord<string, string>,
    islandProps: unknown
  };
}

declare module 'virtual:routes' {
  import { Route } from 'react-router-dom';
  import { SiteData, ComponentPropsWithIsland } from './index';

  export const routes: Route[];
}

declare module 'virtual:ui-components' {
  const components: React.FC<unknown>[];
  export default components;
}

declare module '*.svg' {
  import type { AttributifyAttributes } from '@unocss/preset-attributify';

  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & AttributifyAttributes
  >;
  export = ReactComponent;
}

declare module '@search-box' {
  import type { ComponentType } from 'react';
  export const Search: ComponentType<ComponentPropsWithIsland>;
  export default Search;
}

declare module '@back-top' {
  import type { ComponentType } from 'react';
  export const BackTopDemo: ComponentType<unknown>;
  export const BackTop: ComponentType<ComponentPropsWithIsland>;
  export default BackTop;
}