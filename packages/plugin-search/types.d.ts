declare module '*.svg' {
  import type { AttributifyAttributes } from '@unocss/preset-attributify';

  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & AttributifyAttributes
  >;
  export = ReactComponent;
}

declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}