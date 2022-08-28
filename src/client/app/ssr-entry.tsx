import { renderToString } from 'react-dom/server';
import { App } from './app';
import React from 'react';

let ISLAND_PROPS: any[] = [];
const originalCreateElement = React.createElement;
// @ts-ignore
React.createElement = (type: ElementType, props: any, ...children: any[]) => {
  if (props && props.__island) {
    ISLAND_PROPS.push(props);
    delete props.__island;
    const id = type.name;
    return originalCreateElement(
      `div`,
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
