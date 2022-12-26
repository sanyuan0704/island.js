import { ComponentType } from 'react';
import { UserConfig as ViteConfiguration } from 'vite';
import { DefaultTheme } from './default-theme';
import type { PluggableList } from 'unified';
import { IslandPlugin } from './Plugin';
import { BabelOptions } from '@vitejs/plugin-react';

export { DefaultTheme } from './default-theme';

export { IslandPlugin };

export interface Header {
  id: string;
  text: string;
  depth: number;
}
export interface SiteSiteData {
  title: string;
  description: string;
  frontmatter: Record<string, unknown>;
  lastUpdated?: number;
  headers: Header[];
}

export type HeadConfig =
  | [string, Record<string, string>]
  | [string, Record<string, string>, string];

export interface UserConfig<ThemeConfig = unknown> {
  /**
   * Base path of the site.
   */
  base?: string;
  /**
   * Path to html icon file.
   */
  icon?: string;
  /**
   * Source directory of the site.
   */
  srcDir?: string;
  /**
   * Language of the site.
   */
  lang?: string;
  /**
   * Title of the site.
   */
  title?: string;
  /**
   * Description of the site.
   */
  description?: string;
  /**
   * Custom head config.
   */
  head?: HeadConfig[];
  /**
   * Theme config.
   */
  themeConfig?: ThemeConfig;
  /**
   * Output directory of the site.
   */
  outDir?: string;
  /**
   * Temporary directory of the site.
   */
  tempDir?: string;
  /**
   * Vite Configuration
   */
  vite?: ViteConfiguration;
  /**
   * Enable single page application in production.
   */
  enableSpa?: boolean;
  /**
   * Whether to fail builds when there are dead links.
   */
  allowDeadLinks?: boolean;
  /**
   * Whether dark mode/light mode toggle button is displayed.
   */
  appearance?: boolean;
  /**
   * The custom config of vite-plugin-route
   */
  route?: RouteOptions;
  /**
   * The custom config of markdown compile
   */
  markdown?: MarkdownOptions;
  /**
   * Island plugins
   */
  plugins?: IslandPlugin[];
  /**
   * Babel plugins which will be applied to @vitejs/plugin-react
   */
  babel?: BabelOptions;
}

export interface SiteData<ThemeConfig = unknown> {
  root: string;
  base: string;
  lang: string;
  title: string;
  description: string;
  icon: string;
  head: HeadConfig[];
  themeConfig: ThemeConfig;
  appearance: boolean;
}

export interface Hero {
  name: string;
  text: string;
  tagline: string;
  image?: {
    src: string;
    alt: string;
  };
  actions: {
    text: string;
    link: string;
    theme: 'brand' | 'alt';
  }[];
}

export interface Feature {
  icon: string;
  title: string;
  details: string;
}

export interface SiteConfig<ThemeConfig = unknown>
  extends Omit<UserConfig, 'themeConfig'> {
  root: string;
  srcDir: string;
  configPath?: string;
  configDeps?: string[];
  themeDir?: string;
  outDir?: string;
  // Current page data
  siteData?: SiteData<ThemeConfig>;
  plugins?: IslandPlugin[];
}

export type ComponentPropsWithIsland<T = unknown> = T & { __island?: boolean };

export interface PageModule<T extends ComponentType<unknown>> {
  default: T;
  frontmatter?: FrontMatterMeta;
  content?: string;
  [key: string]: unknown;
}

export type PageType = 'home' | 'doc' | 'api' | 'custom' | '404';

export interface FrontMatterMeta {
  title: string;
  description: string;
  api: boolean;
  pageType: PageType;
  features?: Feature[];
  hero?: Hero;
  sidebar?: boolean;
  outline?: boolean;
  lineNumbers?: boolean;
}

export interface PageData {
  siteData: SiteData<DefaultTheme.Config>;
  pagePath: string;
  relativePagePath: string;
  lastUpdatedTime?: string;
  title?: string;
  frontmatter?: FrontMatterMeta;
  description?: string;
  pageType: PageType;
  toc?: Header[];
  routePath: string;
  content?: string;
  subModules?: PageModule<ComponentType<unknown>>[];
}

export interface RouteOptions {
  /**
   * The directory to search for pages
   */
  root?: string;
  /**
   * The basename of the site
   */
  prefix?: string;
  /**
   * The extension name of the filepath that will be converted to a route
   * @default ['js','jsx','ts','tsx','md','mdx']
   */
  extensions?: string[];
  /**
   * Include extra files from being converted to routes
   */
  include?: string[];
  /**
   * Exclude files from being converted to routes
   */
  exclude?: string[];
}

export interface MarkdownOptions {
  remarkPlugins?: PluggableList;
  rehypePlugins?: PluggableList;
  lineNumbers?: boolean;
  targetBlankWhiteList?: (string | RegExp)[];
}
