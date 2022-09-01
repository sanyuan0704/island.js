import { renderToString } from 'react-dom/server';
import React from 'react';
import { App } from './app';

let ISLAND_PROPS: any[] = [];
const originalCreateElement = React.createElement;

// @ts-expect-error Intercept React.createElement to flag island components
React.createElement = (type: ElementType, props: any, ...children: any[]) => {
  if (props && props.__island) {
    ISLAND_PROPS.push(props);
    delete props.__island;
    const id = type.name;
    return originalCreateElement(
      'div',
      {
        __island: `${id}:${ISLAND_PROPS.length - 1}`
      },
      originalCreateElement(type, props, ...children)
    );
  }
  return originalCreateElement(type, props, ...children);
};

// For ssr component render
export function render(): { appHtml: string; propsData: any[] } {
  ISLAND_PROPS = [];
  const appHtml = renderToString(<App />);
  return {
    appHtml,
    propsData: ISLAND_PROPS
  };
}
