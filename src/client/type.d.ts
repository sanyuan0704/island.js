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

declare module 'island:client*' {
  import { ComponentType } from 'react';

  export const Content: ComponentType<any>;
  export const usePageData: () => any;
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
