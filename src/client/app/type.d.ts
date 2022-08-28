/// <reference types="vite/client" />

declare module '/@island/theme*' {
  import { ComponentType, Component } from 'react';

  export const Layout: ComponentType<any>;
  export const islands: Record<string, ComponentType<any>>;
}
