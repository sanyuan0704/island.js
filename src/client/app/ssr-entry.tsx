import { renderToString } from 'react-dom/server';
import React from 'react';
import { App, waitForApp } from './app';
import { StaticRouter } from 'react-router-dom/server';
import { DataContext } from './hooks';

let ISLAND_PROPS: any[] = [];
const originalCreateElement = React.createElement;
const islandToPathMap: Record<string, string> = {};

// @ts-expect-error Intercept React.createElement to flag island components
React.createElement = (type: ElementType, props: any, ...children: any[]) => {
  if (props && props.__island) {
    ISLAND_PROPS.push(props || {});
    const id = type.name;
    // The __island prop has been transformed to component path string by babel-plugin-island
    islandToPathMap[id] = props.__island;
    delete props.__island;

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

export const pagesData = [];

// For ssr component render
export async function render(pagePath: string): Promise<{
  appHtml: string;
  propsData: any[];
  islandToPathMap: Record<string, string>;
}> {
  const mod = await waitForApp(pagePath);

  ISLAND_PROPS = [];
  const appHtml = renderToString(
    <DataContext.Provider value={mod}>
      <StaticRouter location={pagePath}>
        <App />
      </StaticRouter>
    </DataContext.Provider>
  );
  return {
    appHtml,
    islandToPathMap,
    propsData: ISLAND_PROPS
  };
}
