/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly ENABLE_SPA: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module 'island/theme*' {
  import { ComponentType, Component } from 'react';

  export const Layout: ComponentType<any>;
  export const NotFoundLayout: ComponentType<any>;
}

declare module 'island:site-data' {
  export default any;
}


declare module 'island/client' {
  import { ComponentType } from 'react';
  import { PageData } from 'shared/types';

  export const Content: ComponentType<any>;
  export const usePageData: () => PageData;
}

declare module 'island/jsx-runtime' {
  export const data = {
    islandToPathMap: MediaRecord<string, string>,
    islandProps: unknown
  };
}

declare module 'virtual:routes' {
  import { Route } from 'react-router-dom';

  export const routes: Route[];
}

declare module '*.svg' {
  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement>
  >;
  export = ReactComponent;
}
