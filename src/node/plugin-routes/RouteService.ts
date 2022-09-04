import fastGlob from 'fast-glob';
import path from 'path';

export interface RouteMeta {
  routePath: string;
  basePath: string;
  absolutePath: string;
}

export const addLeadingSlash = (str: string) => {
  return str.startsWith('/') ? str : `/${str}`;
};

export const normalizeRoutePath = (routePath: string) => {
  console.log(routePath);
  routePath = routePath.replace(/\.(.*)?$/, '').replace(/index$/, '');
  return addLeadingSlash(routePath);
};

export class RouteService {
  #routeData: RouteMeta[] = [];
  constructor(private scanDir: string, private extensions: string[]) {}

  init() {
    const files = fastGlob.sync(`**/*.{${this.extensions.join(',')}}`, {
      cwd: this.scanDir,
      absolute: false,
      ignore: ['**/node_modules/**', '**/.*', '**/dist/**']
    });
    this.#routeData = files.map((fileRelativePath) => {
      const routePath = normalizeRoutePath(fileRelativePath);
      return {
        routePath,
        basePath: this.scanDir,
        absolutePath: path.join(this.scanDir, fileRelativePath)
      };
    });
  }

  generateRoutesCode() {
    return `
import loadable from '@loadable/component';
import React from 'react';
${this.#routeData
  .map(
    (route, index) =>
      `const Route${index} = loadable(() => import('${route.absolutePath}'))`
  )
  .join('\n')}
export const routes = [
${this.#routeData
  .map((route, index) => {
    return `{ path: '${route.routePath}', element: React.createElement(Route${index}) },`;
  })
  .join('\n')}
];`;
  }
}
