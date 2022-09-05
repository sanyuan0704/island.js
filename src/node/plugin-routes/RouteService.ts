import fastGlob from 'fast-glob';
import path from 'path';
import { isProduction, ROUTE_PATH, TEMP_PATH } from '../constants';
import { writeFile, ensureDir } from 'fs-extra';
export interface RouteMeta {
  routePath: string;
  basePath: string;
  absolutePath: string;
}

export const addLeadingSlash = (str: string) => {
  return str.startsWith('/') ? str : `/${str}`;
};

export const normalizeRoutePath = (routePath: string) => {
  routePath = routePath.replace(/\.(.*)?$/, '').replace(/index$/, '');
  return addLeadingSlash(routePath);
};

export class RouteService {
  #routeData: RouteMeta[] = [];
  constructor(
    private scanDir: string,
    private extensions: string[],
    private root: string
  ) {}

  async init() {
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
    const routeCode = this.generateRoutesCode();
    try {
      await ensureDir(path.join(this.root, TEMP_PATH));
      await writeFile(path.join(this.root, ROUTE_PATH), routeCode);
    } catch (e) {
      console.log(e);
    }
  }

  generateRoutesCode() {
    return `
${isProduction() ? '' : `import loadable from '@loadable/component';`}
import React from 'react';
${this.#routeData
  .map((route, index) => {
    return isProduction()
      ? `import Route${index} from '${route.absolutePath}';`
      : `const Route${index} = loadable(() => import('${route.absolutePath}'))`;
  })
  .join('\n')}
export const routes = [
${this.#routeData
  .map((route, index) => {
    return `{ path: '${route.routePath}', element: React.createElement(Route${index}) },`;
  })
  .join('\n')}
];
`;
  }
}
