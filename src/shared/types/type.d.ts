/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly ENABLE_SPA: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module 'island/theme*' {
  import { ComponentType, Component, HtmlHTMLAttributes } from 'react';

  export const Layout: ComponentType<unknown>;
  export const NotFoundLayout: ComponentType<unknown>;
  export const setupEffects: () => void;
}

declare module 'island:site-data' {
  import { DefaultTheme, SiteData } from 'shared/types';
  const siteData: SiteData<DefaultTheme.Config>;
  export default siteData;
}


declare module 'island/client' {
  import { ComponentType, ReactElement } from 'react';
  import { PageData, SiteData } from 'shared/types';

  export const Content: ComponentType<{ fallback?: ReactElement }>;
  export const usePageData: () => PageData;
  export const DataContext: React.Context<{
    data: PageData;
    setData: React.Dispatch<React.SetStateAction<PageData>>;
  }>;
}

declare module 'island/jsx-runtime' {
  export const data : {
    islandToPathMap: MediaRecord<string, string>,
    islandProps: unknown
  };
}

declare module 'virtual:routes' {
  import { Route } from 'react-router-dom';
  import { SiteData } from './index';

  export const routes: Route[];
}

declare module '*.svg' {
  import type { AttributifyAttributes } from '@unocss/preset-attributify';

  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & AttributifyAttributes
  >;
  export = ReactComponent;
}
