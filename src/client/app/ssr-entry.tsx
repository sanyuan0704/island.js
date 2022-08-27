import { renderToString } from 'react-dom/server';
import { App } from './app';
import React from 'react';

const ISLAND_PROPS = [];
const originalCreateElement = React.createElement;
// @ts-ignore
React.createElement = (type: ElementType, props: any, ...children: any[]) => {
  if (props && props.__islandId) {
    const id = props.__islandId;
    ISLAND_PROPS.push(props);
    delete props.__islandId;
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
export function render() {
  return renderToString(<App />);
}
