/// <reference types="vite/client" />

declare module '/@island/theme*' {
  import { ComponentType } from 'react';

  const theme: {
    Layout: ComponentType<any>;
  };

  export default theme;
}
