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
  routePath = routePath.replace(/\.(.*)?$/, '').replace(/index$/, '');
  return addLeadingSlash(routePath);
};

export class RouteService {
  #routeData: RouteMeta[] = [];
  constructor(
    private scanDir: string,
    private extensions: string[] // private root: string
  ) {}

  async init() {
    const files = fastGlob
      .sync(`**/*.{${this.extensions.join(',')}}`, {
        cwd: this.scanDir,
        absolute: true,
        ignore: ['**/node_modules/**', '**/.*', '**/dist/**']
      })
      .sort();
    files.forEach((file) => this.addRoute(file));
  }

  addRoute(filePath: string) {
    const fileRelativePath = path.relative(this.scanDir, filePath);
    const routePath = normalizeRoutePath(fileRelativePath);
    this.#routeData.push({
      routePath,
      basePath: this.scanDir,
      absolutePath: path.join(this.scanDir, fileRelativePath)
    });
  }

  removeRoute(filePath: string) {
    const fileRelativePath = path.relative(this.scanDir, filePath);
    const routePath = normalizeRoutePath(fileRelativePath);
    this.#routeData = this.#routeData.filter(
      (route) => route.routePath !== routePath
    );
  }

  getRoutes() {
    return this.#routeData;
  }

  generateRoutesCode(ssr?: boolean) {
    return `
${ssr ? '' : `import loadable from '@loadable/component'`};
import React from 'react';
${this.#routeData
  .map((route, index) => {
    return ssr
      ? `import Route${index} from '${route.absolutePath}';`
      : `const Route${index} = loadable(() => import('${route.absolutePath}'))`;
  })
  .join('\n')}
export const routes = [
${this.#routeData
  .map((route, index) => {
    return `{ path: '${route.routePath}', element: React.createElement(Route${index}), preload: () => import('${route.absolutePath}') },`;
  })
  .join('\n')}
];
`;
  }
}
