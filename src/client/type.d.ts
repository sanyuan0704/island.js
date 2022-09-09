/// <reference types="vite/client" />

declare module 'island:theme*' {
  import { ComponentType, Component } from 'react';

  export const Layout: ComponentType<any>;
}

declare module 'island:islands' {
  export default Record<string, ComponentType<any>>;
}

declare module 'island:page-data' {
  export default any;
}

declare module 'island:client' {
  import { ComponentType } from 'react';
  import { DefaultTheme } from '../shared/types/default-theme';
  import { PageData } from '../shared/types/index';

  export const Content: ComponentType<any>;
  export const usePageData: <T = DefaultTheme.Config>() => PageData<T>;
  export const useDataContext: () => any;
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
