import { normalizePath } from 'vite';
import fastGlob from 'fast-glob';
import fs from 'fs-extra';
import { RUNTIME_BUNDLE_OUTDIR } from '../constants';
import path from 'path';
import { DEFAULT_EXCLUDE, DEFAULT_PAGE_EXTENSIONS } from '.';
import { RouteOptions } from 'shared/types';
import { withBase } from '../../shared/utils';

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

const lazyWithPreloadRuntimeCode = fs.readFileSync(
  path.join(RUNTIME_BUNDLE_OUTDIR, 'lazyWithPreload.js'),
  'utf-8'
);

export class RouteService {
  #routeData: RouteMeta[] = [];
  #extensions: string[] = [];
  #include: string[] = [];
  #exclude: string[] = [];
  #base = '';

  constructor(private scanDir: string, options: RouteOptions) {
    this.#extensions = options.extensions || DEFAULT_PAGE_EXTENSIONS;
    this.#include = options.include || [];
    this.#exclude = options.exclude || [];
    this.#base = options.prefix || '';
  }

  async init() {
    const files = fastGlob
      .sync([`**/*.{${this.#extensions.join(',')}}`, ...this.#include], {
        cwd: this.scanDir,
        absolute: true,
        ignore: [...DEFAULT_EXCLUDE, ...this.#exclude]
      })
      .sort();
    files.forEach((file) => this.addRoute(file));
  }

  static getRoutePathFromFile(
    filePath: string,
    root: string,
    base: string
  ): string | undefined {
    const fileRelativePath = path.relative(root, filePath);
    const routePath = normalizeRoutePath(fileRelativePath);
    return withBase(routePath, base);
  }

  addRoute(filePath: string) {
    const fileRelativePath = normalizePath(
      path.relative(this.scanDir, filePath)
    );
    const routePath = normalizeRoutePath(fileRelativePath);
    const absolutePath = path.join(this.scanDir, fileRelativePath);

    this.#routeData.push({
      routePath,
      basePath: this.scanDir,
      absolutePath: normalizePath(absolutePath)
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

  isExistRoute(routePath: string) {
    return this.#routeData.find((route) => route.routePath === routePath);
  }

  generateRoutesCode(ssr?: boolean) {
    return `
${lazyWithPreloadRuntimeCode.toString()};
import React from 'react';
${this.#routeData
  .map((route, index) => {
    return ssr
      ? `import * as Route${index} from '${route.absolutePath}';`
      : `const Route${index} = lazyWithPreload(() => import('${route.absolutePath}'))`;
  })
  .join('\n')}
export const routes = [
${this.#routeData
  .map((route, index) => {
    // In ssr, we don't need to import component dynamically.
    const preload = ssr ? `() => Route${index}` : `Route${index}.preload`;
    const component = ssr ? `Route${index}.default` : `Route${index}`;
    /**
     * For SSR, example:
     * {
     *   route: '/',
     *   element: jsx(Route0),
     *   preload: Route0.preload,
     *   filePath: '/Users/xxx/xxx/index.md'
     * }
     *
     * For client render, example:
     * {
     *   route: '/',
     *   element: jsx(Route0.default),
     *   preload: Route0.preload,
     *   filePath: '/Users/xxx/xxx/index.md'
     * }
     */
    return `{ path: '${withBase(
      route.routePath,
      this.#base
    )}', element: React.createElement(${component}), filePath: '${
      route.absolutePath
    }', preload: ${preload} }`;
  })
  .join(',\n')}
];
`;
  }
}
